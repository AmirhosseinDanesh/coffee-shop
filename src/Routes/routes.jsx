import Index from "../Pages/Client/Index";
import AdminPanel from "../Pages/Admin-panel/AdminPanel"
import DashBoard from "../Pages/Admin-panel/Dashboard/Dashboard"
import Users from "../Pages/Admin-panel/Users/Users"
import Products from "../Pages/Admin-panel/Products/Products"
import Menus from "../Pages/Admin-panel/Menus/Menus"
import Articles from "../Pages/Admin-panel/Articles/Articles"
const routes = [
    { path: "/", element: <Index /> },
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