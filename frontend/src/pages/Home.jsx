import { useEffect, useState } from "react";
import axios from "axios";
import Layout from '../components/Layout'
import { Row } from "antd";
import DoctorList from "../components/DoctorList";

const Home = () => {

  const [doctors, setDoctors] = useState([])
  const getUserData = async () => {
    try {
      const res = await axios.get(
        "/api/doc/user/getAllDoctors",
       
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if(res.data.success){
        setDoctors(res.data.data)
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
  <Layout>
    <h1> Home Pages</h1>
    <Row>
      {doctors && doctors.map((doctor)=>
        <DoctorList doctor={doctor} />
      )}
    </Row>
     </Layout>
  );
};

export default Home;
