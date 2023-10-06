import {BsFillHouseFill, BsCardChecklist} from "react-icons/bs";
import { FaUserMd} from "react-icons/fa";
import { BiSolidUserDetail } from "react-icons/bi";

export const userMenu = [
    {
        name: 'Home',
        path: '/',
        icon: <BsFillHouseFill/>,
    },
    {
        name: 'Appointments',
        path: '/appointments',
        icon: <BsCardChecklist/>,
    },
    {
        name: 'Apply as Doctor',
        path: '/apply-doctor',
        icon: <FaUserMd/>,
    },
    {
        name: 'Profile',
        path: '/profile',
        icon: <BiSolidUserDetail/>,
    },

]


//admin menu
export const adminMenu = [
    {
        name: 'Home',
        path: '/',
        icon: <BsFillHouseFill/>,
    },
    {
        name: 'Doctors',
        path: '/admin/doctors',
        icon: <BsCardChecklist/>,
    },
    {
        name: 'Users',
        path: '/admin/users',
        icon: <FaUserMd/>,
    },
    {
        name: 'Profile',
        path: '/profile',
        icon: <BiSolidUserDetail/>,
    },

]


