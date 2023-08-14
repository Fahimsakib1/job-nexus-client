import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main/Main";
import Home from "../../Components/Home/Home";
import AddJob from "../../Components/Pages/AddJob/AddJob";
import ViewJobs from "../../Components/Pages/ViewJobs/ViewJobs";
import Signup from "../../Components/Pages/SignUp/SignUp";
import Login from "../../Components/Pages/Login/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";





const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/addJob",
                element: <PrivateRoute><AddJob /></PrivateRoute>
            },
            {
                path: "/viewJobs",
                element: <PrivateRoute><ViewJobs /></PrivateRoute>
            },
            {
                path: "/signup",
                element: <Signup />,
            },
            {
                path: "/login",
                element: <Login />,
            }
        ],
    },
]);

export default Routes;