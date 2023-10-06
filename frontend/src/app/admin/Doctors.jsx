import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { Table, message } from "antd";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  const getDoctors = async () => {
    try {
      const res = await axios.get("/api/doc/admin/getalldoctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
        message.success(res.data.success);
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //handle account
  const handleAccountStatus = async(record, status) =>{
    try {
      const res = await axios.post('/api/doc/admin/changeAccountStatus', {doctorId: record._id, userId: record.userId, status:status}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      if(res.data.success){
        // setUsers(res.data.data)
        message.success(res.data.message)
        window.location.reload()
      
      }else{
        message.error(res.data.success)
      }
    } catch (error) {
      message.error("something went wrong")
    }
  }



  useEffect(() => {
    getDoctors();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          
            {record.status === "pending" ? (
              <button className="btn btn-success" onClick={()=>handleAccountStatus(record, 'approved')}>Approve</button>
            ) : (
              <button className="btn btn-danger">Reject</button>
            )}
          
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center m-3">All Doctors</h1>
      <Table columns={columns} dataSource={doctors}></Table>
    </Layout>
  );
};

export default Doctors;
