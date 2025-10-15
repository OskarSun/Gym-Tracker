import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LoginPage from "./Components/Pages/LoginPage/LoginPage";
import HomePage from "./Components/Pages/HomePage/HomePage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {path: "/", element: <LoginPage />},
            {path: "/homePage", element: <HomePage />}
        ]
    }
])