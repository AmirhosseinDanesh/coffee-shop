import Private from "../Components/Private/Private";

import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";

import ProductDetail from "../Pages/Client/ProductDetail/ProductDetail"
import ArticlesClient from "../Pages/Client/Articles/ArticlesClient";
import CategoryInfo from "../Pages/Client/Category/CategoryInfo";
import ArticlesInfo from "../Pages/Client/Articles/ArticlesInfo";
import ContactUs from "../Pages/Client/ContactUs/ContactUs";
import NotFound from "../Pages/Client/NotFound/NotFound"
import AboutUs from "../Pages/Client/AboutUs/AboutUs";
import Cart from "../Pages/Client/Cart/Cart";
import Shop from "../Pages/Client/Shop/Shop";
import Index from "../Pages/Client/Index";

import Categories from "../Pages/Admin-panel/Categories/Categories";
import DashBoard from "../Pages/Admin-panel/Dashboard/Dashboard";
import Articles from "../Pages/Admin-panel/Articles/Articles";
import Products from "../Pages/Admin-panel/Products/Products";
import Contacts from "../Pages/Admin-panel/Contacts/Contacts";
import Comments from "../Pages/Admin-panel/Comments/Comments";
import Setting from "../Pages/Admin-panel/Setting/Setting";
import Tickets from "../Pages/Admin-panel/Tickets/Tickets";
import AdminPanel from "../Pages/Admin-panel/AdminPanel";
import Users from "../Pages/Admin-panel/Users/Users";
import Menus from "../Pages/Admin-panel/Menus/Menus";
import Offs from "../Pages/Admin-panel/Offs/Offs"

import UserPanel from "../Pages/User-panel/UserPanel"
import UserOrder from "../Pages/User-panel/UserOrder/UserOrder";
import UserDetails from "../Pages/User-panel/UserDetails/UserDetails"
import UserDashboard from "../Pages/User-panel/UserDashboard/UserDashboard"
import UserAllTickets from "../Pages/User-panel/UserAllTickets/UserAllTickets"
import UserSendTickets from "../Pages/User-panel/UserSendTickets/UserSendTickets";
import UserSingleTickets from "../Pages/User-panel/UserAllTickets/UserSingleTickets";

const routes = [
    { path: "/", element: <Index /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/articles", element: <ArticlesClient /> },
    { path: "/articles/:articleName", element: <ArticlesInfo /> },
    { path: "/category/:categoryName", element: <CategoryInfo /> },
    { path: "/products/:shortName", element: <ProductDetail /> },
    { path: "/shop", element: <Shop /> },
    { path: "/contact-us", element: <ContactUs /> },
    { path: "/About-us", element: <AboutUs /> },
    { path: "/cart", element: <Cart /> },
    { path: "*", element: <NotFound /> },
    {
        path: "/p-admin/*",
        element: <Private>
                    <AdminPanel />
                </Private>,
        children: [
            { path: "dashboard", element: <DashBoard /> },
            { path: "users", element: <Users /> },
            { path: "products", element: <Products /> },
            { path: "menus", element: <Menus /> },
            { path: "articles", element: <Articles /> },
            { path: "categories", element: <Categories /> },
            { path: "setting", element: <Setting /> },
            { path: "comments", element: <Comments /> },
            { path: "contacts", element: <Contacts /> },
            { path: "offs", element: <Offs /> },
            { path: "tickets", element: <Tickets /> },
        ]
    },
    {
        path: "/my-account/*",
        element: <UserPanel />,
        children: [
            { path: "dashboard", element: <UserDashboard /> },
            { path: "details", element: <UserDetails /> },
            { path: "orders", element: <UserOrder /> },
            { path: "tickets", element: <UserAllTickets /> },
            { path: "tickets/send-tickets", element: <UserSendTickets /> },
            { path: "tickets/answer/:id", element: <UserSingleTickets /> },
        ]
    }
]

export default routes;