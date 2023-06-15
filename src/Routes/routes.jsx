import Index from "../Pages/Client/Index";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import ArticlesClient from "../Pages/Client/Articles/ArticlesClient";
import Shop from "../Pages/Client/Shop/Shop";
import NotFound from "../Pages/Client/NotFound/NotFound"
import CategoryInfo from "../Pages/Client/Category/CategoryInfo";
import ProductDetail from "../Pages/Client/ProductDetail/ProductDetail"

import AdminPanel from "../Pages/Admin-panel/AdminPanel";
import DashBoard from "../Pages/Admin-panel/Dashboard/Dashboard";
import Users from "../Pages/Admin-panel/Users/Users";
import Products from "../Pages/Admin-panel/Products/Products";
import Menus from "../Pages/Admin-panel/Menus/Menus";
import Articles from "../Pages/Admin-panel/Articles/Articles";
import ArticlesInfo from "../Pages/Client/Articles/ArticlesInfo";
import Setting from "../Pages/Admin-panel/Setting/Setting";
import Categories from "../Pages/Admin-panel/Categories/Categories";
import Offs from "../Pages/Admin-panel/Offs/Offs"
import Comments from "../Pages/Admin-panel/Comments/Comments";

const routes = [
    { path: "/", element: <Index /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/articles", element: <ArticlesClient /> },
    { path: "/articles/:articleName", element: <ArticlesInfo /> },
    { path: "/category/:categoryName", element: <CategoryInfo /> },
    { path: "/courses/:shortName", element: <ProductDetail /> },
    { path: "/shop", element: <Shop /> },
    { path: "*", element: <NotFound /> },
    {
        path: "/p-admin/*",
        element: <AdminPanel />,
        children : [
            {path : "dashboard" , element : <DashBoard/>},
            {path : "users" , element : <Users/>},
            {path : "products" , element : <Products/>},
            {path : "menus" , element : <Menus/>},
            {path : "articles" , element : <Articles/>},
            {path : "categories" , element : <Categories/>},
            {path : "setting" , element : <Setting/>},
            {path : "comments" , element : <Comments/>},
            {path : "offs" , element : <Offs/>},
        ]
    }
]

export default routes;