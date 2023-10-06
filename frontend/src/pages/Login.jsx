import {  Input, message } from "antd";

//put Grid and Form back to antd import incase
import "../styles/registerStyless.css";
import { Link, useNavigate } from "react-router-dom";
//add link to router dom
import axios from "axios";
import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
// import Link from '@mui/material/Link';
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { CssBaseline } from "@mui/material";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
// import Navbar from './../components/Navbar/Navbar';
import * as Yup from 'yup'

const Login = () => {
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
    margin: "20px auto",
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
   
      <Grid spacing={20} className="mt-20">
        <Paper elevation={15} style={paperStyle}>
        <Grid align="center">
              <Avatar style={avatarStyle}>
                <LockOutlinedIcon />
              </Avatar>
              <h1 className="text-2xl font-bold">Sign In</h1>
            </Grid>
          <Formik initialValues={formData}  validationSchema={validationSchema}>
            {(props)=>(
              <Form onSubmit={handleSubmit} >
                {/* {console.log(props)} */}
              <Grid item>
                <Field as={TextField}
                  style={{ margin: "10px 0" }}
                  label="Email"
                  name="email"
                  helperText={<ErrorMessage name='email'/>}
                  placeholder="enter email"
                  fullWidth
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item>
                <Field as={TextField}
                  label="Password"
                  name="password"
                  helperText={<ErrorMessage name='password'/>}
                  placeholder="enter password"
                  type="password"
                  fullWidth
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>
              <Field as={FormControlLabel} 
                label="Remember Me"
                name='remember'
                
                control={<Checkbox  color="primary" />}
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={btnstyle}
                fullWidth
                disabled={props.isSubmitting}
              >
                Sign In
              </Button>
            </Form>
  )}
          </Formik>
          <Typography>
            {" "}
            Forgot Password? &nbsp;&nbsp;
            <Link to="/forgetPassword" href="/forgetPassword" underline="hover">
              {/* {'underline="hover"'} */}
              Reset
            </Link>{" "}
          </Typography>
          <Typography>
            {" "}
            Don't have an account? &nbsp;&nbsp;
            <Link to="/register" href="/register" underline="hover">
              {/* {'underline="hover"'} */}
              SIgn Up
            </Link>{" "}
          </Typography>
        </Paper>
      </Grid>
    </>
  );
};

export default Login;
