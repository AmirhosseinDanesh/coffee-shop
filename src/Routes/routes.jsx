import Index from "../Pages/Client/Index";
import AdminPanel from "../Pages/Admin-panel/AdminPanel"
import DashBoard from "../Pages/Admin-panel/Dashboard/Dashboard"
import Users from "../Pages/Admin-panel/Users/Users"
const routes = [
    { path: "/", element: <Index /> },
    {
        path: "/p-admin/*",
        element: <AdminPanel />,
        
        children : [
            {path : "dashboard" , element : <DashBoard/>},
            {path : "users" , element : <Users/>}
        ]
    }
]

export default routes;