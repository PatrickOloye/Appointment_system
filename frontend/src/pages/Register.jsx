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
// import {Avatar, Button, Grid, Paper, TextField, Typography} from '@material-ui/core'

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    termsAndConditions: false 
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Please enter a valid email").required("required*"),
    password:Yup.string().min(8, 'Minimum password is eight characters').required("required*"),
    fullName:Yup.string().min(3, "Name is too short").required("required*"),
    phoneNumber:Yup.number().typeError('enter valid phone number').required('required'),
    confirmPassword:Yup.string().oneOf([Yup.ref('password', null)], 'Passwords do not match').required('required*'),
  });

  // const handleSubmit = async (values, props) => {
  const handleSubmit = async (e, props) => {
    e.preventDefault();
    console.log(e)
    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
    }, 2000);
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/doc/user/register", JSON.stringify(formData),
      {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("registration successfull");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };

  const paperStyle = {
    padding: "30px 20px",
    height: "90vh",
    width: 400,
    margin: "20px auto",
    
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
            <h1 className="text-2xl font-bold m-0">Sign Up</h1>
            <Typography variant="caption" gutterBottom>
              Please fill in all fields
            </Typography>
          </Grid>

          <Formik initialValues={formData} validationSchema={validationSchema}>
            {(props) => (
              <Form onSubmit={handleSubmit}>
                <Grid item>
                  <TextField
                    label="Full Name"
                    name="fullName"
                    helperText={<ErrorMessage name='fullName'/>}
                    placeholder="enter full Name"
                    fullWidth
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item>
                  <Field as={TextField}
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
                    label="Phone number"
                    name="phoneNumber"
                    helperText={<ErrorMessage name='phoneNumber'/>}
                    placeholder="enter phone number"
                    fullWidth
                    required
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item>
                  <Field as={TextField}
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="enter password"
                    helperText={<ErrorMessage name='password'/>}
                    fullWidth
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item>
                  <Field as={TextField}
                    label="Confirm Password"
                    name="ConfirmPassword"
                    type="password"
                    helperText={<ErrorMessage name='confirmPassword'/>}
                    placeholder="enter password"
                    fullWidth
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </Grid>

                <Field as={FormControlLabel}
                  label="I accept all terms and conditions"
                  control={<Checkbox name="checkedB" color="primary" />}
                />
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  style={btnstyle}
                  fullWidth
                >
                  Sign Up
                </Button>
              </Form>
            )}
          </Formik>

          <Typography>
            {" "}
            Already have an account? &nbsp;&nbsp;
            <Link to="/register" href="/register" underline="hover">
              {/* {'underline="hover"'} */}
              SIgn In
            </Link>{" "}
          </Typography>
        </Paper>
      </Grid>
    </>
  );
};

export default Register;
