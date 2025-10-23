import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../Components/Pages/LoginPage/LoginPage";
import HomePage from "../Components/Pages/HomePage/HomePage";
import RegisterPage from "../Components/Pages/RegisterPage/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import WorkoutDetailsPage from "../Components/Pages/WorkoutDetailsPage/WorkoutDetailsPage";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {path: "/", element: <LoginPage />},
            {path: "/homePage", element: <ProtectedRoute><HomePage /></ProtectedRoute>},
            {path: "/register", element: <RegisterPage />},
            {path: "/workout/:id", element: <ProtectedRoute><WorkoutDetailsPage /></ProtectedRoute> }
        ]
    }
])