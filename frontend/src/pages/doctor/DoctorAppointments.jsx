import Layout from "../../components/Layout"
import { useEffect, useState } from "react"
import axios from 'axios'
import moment from 'moment'
import { Table, message } from "antd"


const DoctorAppointments  = () => {

    const [appointments, setAppointments] = useState()

    const getAppointments = async() =>{
        try {
            const res = await axios.get('api/doc/doctor/doctor-appointments', {
               
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                
            })
            if(res.data.success){
                setAppointments(res.data.data)
            }
        } catch (error) {
            console.log(error)
        } 
    }

    useEffect(()=>{
        getAppointments()
    },[]) 

    const handleStatus = async(record, status) => {
        try {
            console.log(record._id)
           const res = await axios.post('api/doc/doctor/update-status', {appointmentsId: 
            record._id, status},
           {headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }},
           ) 
          
           if(res.data.success){
            message.success('res.data.message')
            window.location.reload()
            getAppointments()
           }
        } catch (error) {
            console.log(error)
            message.error('something went wrong')
        }
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id'
        },
        // {
        //     title: 'Name',
        //     dataIndex: 'name',
        //     render: (text, record) => (
        //         <span>
        //             {record.doctorInfo.firstName}  {record.doctorInfo.lastName}
        //         </span>
        //     )
        // },
        // {
        //     title: 'Phone',
        //     dataIndex: 'Phone',
        //     render: (text, record) => (
        //         <span>
        //             {record.doctorInfo.phone}  
        //         </span>
        //     )
        // },
        {
            title: 'Date and Time',
            dataIndex: 'date',
            render: (text, record) => (
                <span>
                    {moment(record.date).format('DD-MM-YYYY')}  &nbsp;
                    {moment(record.time).format('HH:mm')}  
                    
                </span>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
           
        }, 
        {
            title: 'Actions',
            dataIndex: 'actions',
            render : (text, record) => (
                <div className="d-flex">
                    {record.status === 'pending' && (
                        <div className="d-flex">
                            <button className="btn btn-success" onClick={() => handleStatus(record, 'Approved')}>Approve</button>
                            <button className="btn btn-danger ms-3" onClick={() => handleStatus(record, 'Rejected')}>Reject</button>
                        </div>
                    )}
                </div>
            )
           
        }, 
    ]

    return (
        <Layout>
             <h1 className=""> Appointments</h1>
            <Table columns={columns} dataSource={appointments}/>
        </Layout>
    )
}

export default DoctorAppointments