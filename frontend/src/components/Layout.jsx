import { Link, useLocation, useNavigate } from "react-router-dom";
import { adminMenu, userMenu } from "../Data/data";
import "../styles/LayoutStyles.css";
import { useSelector } from "react-redux";
import { IoMdNotifications } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { Badge, message } from "antd";
import { BsFillHouseFill, BsCardChecklist } from "react-icons/bs";

import { BiSolidUserDetail } from "react-icons/bi";

//eslint-disable-next-line
const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfull");
    navigate("/login");
  };

  // =====doctor Menue ========

  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: <BsFillHouseFill />,
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: <BsCardChecklist />,
    },

    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: <BiSolidUserDetail />,
    },
  ];

  // =====doctor Menue ========

  //rendering different list
  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    // : userMenu?.isDoctor
    ? doctorMenu
    : userMenu;
  console.log(user);
  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6>DOCS</h6>
            </div>
            <hr />
            <div className="menu">
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <>
                    <div className={`menu-item ${isActive && "active"} flex`}>
                      <i className={menu.icon}>{menu.icon}</i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}
              <div className={`menu-item `} onClick={handleLogout}>
                <i className={<BiLogOut />}>
                  <BiLogOut />
                </i>
                <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content" style={{ cursor: "pointer" }}>
                <Badge
                  count={user && user.notification.length}
                  onClick={() => {
                    navigate("/notification");
                  }}
                >
                  <IoMdNotifications className="i" />
                </Badge>
                <Link to="/profile">{user?.name}</Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
