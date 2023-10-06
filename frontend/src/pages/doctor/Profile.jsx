import { useDispatch, useSelector } from "react-redux"
import Layout from "../../components/Layout"
import { useEffect, useState } from "react"
import axios from "axios";
import { useParams } from "react-router-dom";

import { Form,Row,Col, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import {showLoading, hideLoading} from '../../redux/features/alertSlice'



const Profile = () => {

  const {user} = useSelector(state => state.user)
  const [doctor, setDoctor] = useState(null)
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleFinish = async(values) =>{ 
    // console.log(values);
    try {
      dispatch(showLoading())
      const res = await axios.post('/api/doc/doctor/updateProfile', {...values, userId:user._id}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      dispatch(hideLoading())
      if(res.data.success){
        message.success(res.data.message)
        navigate('/')
      }else{
        message.error(res.data.message)
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error)
      message.error('Something went wrong')
    }
  }

  const  getDoctorInfo = async() =>{
    try {
      const res = await axios.post('/api/doc/doctor/getDoctorInfo', {userId:params.id}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      if(res.data.success){
        setDoctor(res.data.data)
        // message.success(res.data.success)
       
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getDoctorInfo()
    //eslint-disable-next-line
  }, [])
  return (
    <Layout>
    <h1>Manage Profile</h1> 
    {doctor && (
      <Form layout="vertical" onFinish={handleFinish} className="m-3" initialValues={doctor}>
      <h4 className="">Personal Details :</h4>
    <Row gutter={40}>
      <Col xs={24} md={24} lg={8}>
        <Form.Item label='First Name' name='firstName'required rules={[{required: true}]}>
          <Input type="text" placeholder="Your name"/>
        </Form.Item>
      </Col>
      <Col xs={24} md={24} lg={8}>
        <Form.Item label='Last Name' name='lastName'required rules={[{required: true}]}>
          <Input type="text" placeholder="Your last name"/>
        </Form.Item>
      </Col>
      <Col xs={24} md={24} lg={8}>
        <Form.Item label='Phone' name='phone'required rules={[{required: true}]}>
          <Input type="text" placeholder="Your name"/>
        </Form.Item>
      </Col>
      <Col xs={24} md={24} lg={8}>
        <Form.Item label='Email' name='email'required rules={[{required: true}]}>
          <Input type="text" placeholder="Your email"/>
        </Form.Item>
      </Col>
      <Col xs={24} md={24} lg={8}>
        <Form.Item label='website' name='website'required rules={[{required: true}]}>
          <Input type="text" placeholder="Your website"/>
        </Form.Item>
      </Col>
      <Col xs={24} md={24} lg={8}>
        <Form.Item label='address' name='address' required rules={[{required: true}]}>
          <Input type="text" placeholder="Your website"/>
        </Form.Item>
      </Col>
    </Row>

    <h4 className="">Professional Details :</h4>
    <Row gutter={40}>
      <Col xs={24} md={24} lg={8}>
        <Form.Item label='Specialization' name='specialization'required rules={[{required: true}]}>
          <Input type="text" placeholder="Your Specialization"/>
        </Form.Item>
      </Col>
      <Col xs={24} md={24} lg={8}>
        <Form.Item label='experience' name='experience'required rules={[{required: true}]}>
          <Input type="text" placeholder="Your experience"/>
        </Form.Item>
      </Col>
      <Col xs={24} md={24} lg={8}>
        <Form.Item label='Phone' name='phone'required rules={[{required: true}]}>
          <Input type="text" placeholder="Your name"/>
        </Form.Item>
      </Col>
      <Col xs={24} md={24} lg={8}>
        <Form.Item label='fees Per Consultation' name='feesPerConsultation'required rules={[{required: true}]}>
          <Input type="text" placeholder="Your fees Per Consultation"/>
        </Form.Item>
      </Col>
      {/* <Col xs={24} md={24} lg={8}>
        <Form.Item label='timings' name='timings'required >
          <TimePicker.RangePicker format="HH:mm" />
        </Form.Item>
      </Col> */}
      <Col xs={24} md={24} lg={8}></Col>
      <Col xs={24} md={24} lg={8}>
      <button className="btn btn-primary form-btn" type="submit">update</button>
      </Col>

      
    </Row>

  </Form>
    )}
    </Layout>
  )
}

export default Profile