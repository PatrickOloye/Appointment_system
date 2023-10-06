import {  Input, message } from "antd";
import "../styles/registerStyless.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLocation } from 'react-router-dom'



const ResetPassword = () => {

    const token = useLocation().search.slice(0, useLocation().search.length).split("=").pop()

    const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    });
  };

  const validationSchema =Yup.object().shape({
    email:Yup.string().email('Please putin a valid email').required('required *'),
    password:Yup.string().required('required *')
  })


  const handleSubmit = async (e, props) => {
    e.preventDefault();
    // console.log(props);
    setTimeout(() => {
      props.resetForm()
      props.setSubmitting(false)
    }, 2000);
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/doc/user/login",
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        console.log("response status:", res.status);
        localStorage.setItem("token", res.data.token);
        message.success("login successfull");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      // console.log(error.data);
      dispatch(hideLoading());
      console.log(error);
      message.error("something went wrong");
    }
  };
  // const onfinishHandler = async(values) =>{
  //   console.log(values)
  //   try {
  //     dispatch(showLoading())
  //     const res = await axios.post('/api/doc/user/login', values)
  //     window.location.reload()
  //     dispatch(hideLoading())
  //     if(res.data.success){
  //       console.log("response status:",res.status)
  //       localStorage.setItem("token", res.data.token )
  //       message.success('login successfull')
  //       navigate('/')
  //     }else{
  //       message.error(res.data.message)

  //     }
  //   } catch (error) {
  //     // console.log(error.data);
  //     dispatch(hideLoading())
  //     message.error('something went wrong')
  //   }
  // }

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 400,
    margin: "100px auto",
  };
  const avatarStyle = { backgroundColor: "green" };
  const btnstyle = { margin: "10px 0" };
  // const initialValues = {
  //   email: '',
  //   password: '',
  //   remember: false
  // }
    
  return (
    <>
    
     <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <HowToRegOutlinedIcon />
            </Avatar>
            <h1 className="text-2xl font-bold m-0">Reset Password</h1>
            <Typography variant="caption" gutterBottom>
              Reset your password
            </Typography>
            <Grid>
            <Typography variant="caption" gutterBottom >
             <p  className="text-md font-bold italics m-3">Please provide a password with at least 8 characters</p> 
            </Typography>
            </Grid>
        
          </Grid>

          <Formik initialValues={formData} validationSchema={validationSchema}>
            {(props) => (
              <Form onSubmit={handleSubmit}>
                <Grid item>
                  <TextField
                    label="password"
                    name="password"
                    helperText={<ErrorMessage name='password'/>}
                    placeholder="Enter password address"
                    fullWidth
                    required
                    // value={formData.fullName}
                    // onChange={handleChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Confirm Password"
                    name="confirmPassword"
                    helperText={<ErrorMessage name='confirmPassword'/>}
                    placeholder="Enter email address"
                    fullWidth
                    required
                    // value={formData.fullName}
                    // onChange={handleChange}
                  />
                </Grid>
          
              
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  style={btnstyle}
                  fullWidth
                >
                 Reset Password
                </Button>
              </Form>
            )}
          </Formik>

         
        </Paper>
      </Grid>
    </>
   
  )
}

export default ResetPassword