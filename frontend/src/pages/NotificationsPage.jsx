
import { useDispatch, useSelector } from 'react-redux';
import Layout from './../components/Layout';
import { Tabs, message } from 'antd'
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import axios from "axios"
import { useNavigate } from 'react-router-dom';




const NotificationsPage = () => {
    const dispatch = useDispatch()
    const navigate =  useNavigate()
    const {user} = useSelector(state=> state.user)

    const handleMarkAll = async() =>{
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/doc/user/getAllNotifications', {userId:user._id}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            }  )
            // window.location.reload()
            dispatch(hideLoading())
            if(res.data.success){
                message.success(res.data.message)
                window.location.reload()
            }else{
                message.error(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
            message.error("something went wrong")
        }
    }

    //delete all notifications
    const handleDeleteAll = async() =>{
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/doc/user/deleteAllNotifications', {userId:user._id}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            })
            dispatch(hideLoading())
            if(res.data.success){
                message.success(res.data.message)
                window.location.reload()
            }else{
                message.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            message.error('Something went wrong while deleting')
           
        }
    }

  return (
    <Layout>
    <h1 className='p-3 text-center'>Notifications</h1>
    <Tabs>
        <Tabs.TabPane tab='unRead' key={0}>
            <div className="d-flex justify-content-end">
                <h3 className="p-2 text-primary" style={{cursor: 'pointer'}}  onClick={handleMarkAll}>mark all read</h3>
            </div>
            {
                user?.notification.map(notifMsg =>(
                    //eslint-disable-next-line
                    <div className="card"  style={{cursor: 'pointer'}}>
                        <div className="card-text" onClick={() => navigate(notifMsg.onClickPath)}>
                            {notifMsg.message}
                        </div>
                    </div>
                ))
            }
        </Tabs.TabPane>
        <Tabs.TabPane tab='Read' key={1}>
            <div className="d-flex justify-content-end">
                <h3 className="p-2 text-primary" style={{cursor: 'pointer'}} onClick={handleDeleteAll}>delete all read</h3>
            </div>
            {
                user?.seennotification.map(notifMsg =>(
                    //eslint-disable-next-line
                    <div className="card"  style={{cursor: 'pointer'}}>
                        <div className="card-text" onClick={() => navigate(notifMsg.onClickPath)}>
                            {notifMsg.message}
                        </div>
                    </div>
                ))
            }
        </Tabs.TabPane>
    </Tabs>
    </Layout>
  )
}

export default NotificationsPage