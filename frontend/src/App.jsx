import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import DocApply from "./pages/docApply";
import NotificationsPage from "./pages/NotificationsPage";
import User from "./app/admin/User";
import Doctors from "./app/admin/Doctors";
import Profile from "./pages/doctor/Profile";
import BookingPage from "./pages/BookingPage";
import Appointments from "./pages/AppointmentsPage";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/resetPassword"
              element={
                <PublicRoute>
                  <ResetPassword />
                </PublicRoute>
              }
            />
            <Route
              path="/forgetPassword"
              element={
                <PublicRoute>
                  <ForgetPassword />
                </PublicRoute>
              }
            />
            <Route
              path="/landing"
              element={
                  <Landing />
              }
            />
            <Route
              path="/about"
              element={
                  <About />
              }
            />
            <Route
              path="/contact"
              element={
                  <Contact />
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/apply-doctor"
              element={
                <ProtectedRoute>
                  <DocApply />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notification"
              element={
                <ProtectedRoute>
                  <NotificationsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor/book-appointment/:DoctorId"
              element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <User />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/doctors"
              element={
                <ProtectedRoute>
                  <Doctors />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor/profile/:id"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/appointments"
              element={
                <ProtectedRoute>
                  <Appointments/>
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor-appointments"
              element={
                <ProtectedRoute>
                  <DoctorAppointments/>
                </ProtectedRoute>
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
