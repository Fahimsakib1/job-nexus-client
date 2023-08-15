import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main/Main";
import Home from "../../Components/Home/Home";
import AddJob from "../../Components/Pages/AddJob/AddJob";
import ViewAllJobs from "../../Components/Pages/ViewJobs/ViewAllJobs";
import Signup from "../../Components/Pages/SignUp/SignUp";
import Login from "../../Components/Pages/Login/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Try from "../../Try";
import ViewJobDetails from "../../Components/Pages/ViewJobs/ViewJobDetails";
import MyPostedJobs from "../../Components/Pages/ViewJobs/MyPostedJobs";
import ViewMyJobDetails from "../../Components/Pages/ViewJobs/ViewMyJobDetails";





const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <PrivateRoute><Home /></PrivateRoute>,
            },
            {
                path: "/addJob",
                element: <PrivateRoute><AddJob /></PrivateRoute>
            },
            {
                path: "/viewAllJobs",
                element: <PrivateRoute><ViewAllJobs /></PrivateRoute>
            },
            {
                path: "/signup",
                element: <Signup />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/try",
                element: <Try />,
            },
            {
                path: '/viewJob/:id',
                element: <PrivateRoute><ViewJobDetails></ViewJobDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/allJobs/${params.id}`)
            },
            {
                path: "/myJobs/:email",
                element: <PrivateRoute><MyPostedJobs></MyPostedJobs></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/jobsByEmail/${params.email}`)
            },
            {
                path: '/viewMyJob/:id',
                element: <PrivateRoute><ViewMyJobDetails></ViewMyJobDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/allJobs/${params.id}`)
            },

        ],
    },
]);

export default Routes;