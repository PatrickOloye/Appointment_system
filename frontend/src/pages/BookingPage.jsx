import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DatePicker, TimePicker, message } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";


const BookingPage = () => {
  const params = useParams();
  const { user } = useSelector((state) => state.user);
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState([]);
  const [time, setTime] = useState([]);
  const [isAvailable, setIsAvailable] = useState([]);
  const dispatch = useDispatch();
  
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/doc/doctor/getDoctorById",
        { doctorId: params.DoctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleBooking = async () => {
    try {
      setIsAvailable(true)
      if(!date && !time){
        return alert("Date & time are required")
      }
      dispatch(showLoading());
      const res = await axios.post(
        "/api/doc/user/book-appointment",
        {
          doctorId: params.DoctorId,
          userId: user._id,
          doctorInfo: doctors,
          date: date,
          userInfo: user,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error.message);
    }
  };

  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/doc/user/bookingAvailability",
        { doctorId: params.DoctorId, date, time },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(true);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    //eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <h3>Booking Page</h3>
      <div className="container m-2">
        {/* {doctors && ( */}
        {doctors && doctors.timings && doctors.timings.length === 2 && (
          <div>
            <h4>
              Dr. {doctors.firstName} {doctors.lastName}
            </h4>
            <h4>Fees: {doctors.feesPerConsultation}</h4>
            <h4>
              Timings: {doctors.timings && doctors.timings[0]} -{" "}
              {doctors.timings && doctors.timings[1]}{" "}
            </h4>
            <div className="d-flex flex-column w-50">
              <DatePicker
                className="m-2"
                format="DD-MM-YY"
                onChange={(value) => {
                  setIsAvailable(false);
                  setDate(moment(value).format("DD-MM-YYYY"));
                }}
              />
              <TimePicker
                format="HH:mm"
                className="m-2"
                onChange={(value) => {
                  setIsAvailable(false);
                  setTime(moment(value).format("HH:mm"));
                }}
              />
              <button
                className="btn btn-primary mt-2"
                onClick={handleAvailability}
              >
                check Availability
              </button>
              {/* <button className="btn btn-dark mt-2" onClick={handleBooking}>
                  Book Now
                </button> */}
              {!isAvailable && (
                <button className="btn btn-dark mt-2" onClick={handleBooking}>
                  Book Now
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
