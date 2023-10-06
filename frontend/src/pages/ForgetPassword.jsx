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

const ForgetPassword = () => {


    const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Please enter a valid email").required("required*"),
     });

  // const handleSubmit = async (values, props) => {
  const handleSubmit = async (e, props) => {
    e.preventDefault();

    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
    }, 2000);
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/doc/user/forgotPassword", JSON.stringify(formData),
      {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("A message as been sent to your email");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("There was an issue with resetting password");
    }
  };

  const paperStyle = {
    padding: "30px 20px",
    height: "60vh",
    width: 400,
    margin: "100px auto",

    
  };
  const avatarStyle = { backgroundColor: "green" };
  const btnstyle = { margin: "10px 0" };
  return (
    <>
     <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <HowToRegOutlinedIcon />
            </Avatar>
            <h1 className="text-2xl font-bold m-0">Forgot Password?
            </h1>
            <Typography variant="caption" gutterBottom>
              Please provide your valid email address
            </Typography>
            <Grid>
            <Typography variant="caption" gutterBottom >
             <p  className="text-md font-bold italics m-3">If your email address is in the system, an email will be sent to you to reset your password.</p> 
            </Typography>
            </Grid>
        
          </Grid>

          <Formik initialValues={formData} validationSchema={validationSchema}>
            {(props) => (
              <Form onSubmit={handleSubmit}>
                <Grid item>
                  <TextField
                    label="email"
                    name="email"
                    helperText={<ErrorMessage name='email'/>}
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
                Get Token
                </Button>
              </Form>
            )}
          </Formik>

         
        </Paper>
      </Grid>
    </>
  )
}

export default ForgetPassword