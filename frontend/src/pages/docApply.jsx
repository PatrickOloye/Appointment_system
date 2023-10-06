
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import { Form,Row,Col, Input,TimePicker, message } from "antd";
import { useNavigate } from "react-router-dom";
import {showLoading, hideLoading} from '../redux/features/alertSlice'
import axios from 'axios'


const DocApply = () => {


    const {user} = useSelector(state => state.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleFinish = async(values) =>{ 
    console.log(values);
    try {
      dispatch(showLoading())
      const res = await axios.post('api/doc/user/apply-doctor', {...values, userId:user._id}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      dispatch(hideLoading())
      if(res.data.success){
        message.success(res.data.success)
        navigate('/')
      }else{
        message.error(res.data.success)
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error)
      message.error('Something went wrong')
    }
  }
  return (
    <Layout>
      <h1 className="text-center">Apply Doctor</h1>
      <Form layout="vertical" onFinish={handleFinish} className="m-3">
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
          <Col xs={24} md={24} lg={8}>
            <Form.Item label='timings' name='timings'required >
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}></Col>
          <Col xs={24} md={24} lg={8}>
          <button className="btn btn-primary form-btn" type="submit">Submit</button>
          </Col>

          
        </Row>

      </Form>
    </Layout> 
  );
};

export default DocApply;
