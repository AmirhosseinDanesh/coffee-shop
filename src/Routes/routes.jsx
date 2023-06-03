import Index from "../Pages/Client/Index";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import ArticlesClient from "../Pages/Client/Articles/ArticlesClient";
import Shop from "../Pages/Client/Shop/Shop";

import AdminPanel from "../Pages/Admin-panel/AdminPanel";
import DashBoard from "../Pages/Admin-panel/Dashboard/Dashboard";
import Users from "../Pages/Admin-panel/Users/Users";
import Products from "../Pages/Admin-panel/Products/Products";
import Menus from "../Pages/Admin-panel/Menus/Menus";
import Articles from "../Pages/Admin-panel/Articles/Articles";


const routes = [
    { path: "/", element: <Index /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/articles", element: <ArticlesClient /> },
    { path: "/shop", element: <Shop /> },
    {
        path: "/p-admin/*",
        element: <AdminPanel />,
        children : [
            {path : "dashboard" , element : <DashBoard/>},
            {path : "users" , element : <Users/>},
            {path : "products" , element : <Products/>},
            {path : "menus" , element : <Menus/>},
            {path : "articles" , element : <Articles/>},
        ]
    }
]

export default routes;