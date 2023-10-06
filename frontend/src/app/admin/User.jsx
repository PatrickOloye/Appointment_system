import { useEffect, useState } from "react"
import Layout from "../../components/Layout"
import axios from 'axios'
import { Table, message } from "antd"
// import { useNavigate } from "react-router-dom"
// import { useDispatch, useSelector } from "react-redux"




const User = () => {
    const [users, setUsers] = useState([])

    //get Users
    const getUsers = async() => {
        try {
            const res = await axios.get('/api/doc/admin/getAllUsers', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                  },
            })
            if(res.data.success){
                setUsers(res.data.data)
                message.success(res.data.success)
              
              }else{
                message.error(res.data.success)
              }
        } catch (error) {
            console.log(error)

        }
    }

    useEffect(() => {
        getUsers();
    },[])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Doctor',
            dataIndex: 'isDoctor',
            render: (text, record) => (
                <span>{record.isDoctor ? "YES" : "NO"}</span>
            )
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            //eslint-disable-next-line
            render: (text, record) => (
                <div className="d-flex">
                    <button className="btn btn-danger">Block</button>
                </div>
            )
        },
    ]


  return (
    <Layout>
    <h1>All Users</h1>
    <Table columns={columns} dataSource={users}>

    </Table>
    </Layout>
  )
}

export default User