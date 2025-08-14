import React from 'react'
import SignUp from '../pages/LoginSignUp/SignUp'
import Home from '../pages/Home/Home'
import { createBrowserRouter } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Product from '../pages/Products/Product'
import ProductDetails from '../pages/Products/ProductDetails'
import About from '../pages/About/About'
import Contact from '../pages/Contact/Contact'
import BuyerDashboard from '../pages/Buyer/BuyerDashboard'
import AdminDashboard from '../pages/Admin/AdminDashboard'
import SellerDashboard from '../pages/Seller/SellerDashboard'
import Main from '../layout/Main'
import Cart from '../pages/Buyer/Cart'
import Login from '../pages/LoginSignUp/Login'
import Wishlist from '../pages/Buyer/Wishlist'
import Register from '../pages/LoginSignUp/Register'
import Auth from '../pages/LoginSignUp/Auth'
import AddProduct from '../pages/Seller/AddProduct'
import UpdateProduct from '../pages/Seller/UpdateProduct'
import BuyerHome from '../pages/Buyer/BuyerHome'
import AdminHome from '../pages/Admin/AdminHome'
import UserList from '../pages/Admin/UserList'
import SellerHome from '../pages/Seller/SellerHome'
import MyProduct from '../pages/Seller/MyProduct'
import Products from '../pages/Products/Products'
import Checkout from '../pages/Buyer/Checkout'
import Orders from '../pages/Buyer/Orders'
import UserHome from '../pages/Buyer/UserHome'
import EditProfile from '../pages/Buyer/EditProfile'
import UserProfile from '../pages/Buyer/UserProfile'


export const router = createBrowserRouter([

    {
        path: '/',
        element: <Home></Home>
    },
     {
        path: "/v1",
        element: <Main></Main>,
        children: [

            {
                path: '/v1/login',
                element: <Auth></Auth>
            },
            {
                path: '/v1/products',
                element: <Products />,
               // loader:()=> fetch(`https://mobiverse.vercel.app/products`)
                // loader: ({ request }) => {
                //     const url = new URL(request.url);
                //     const keyword = url.searchParams.get("keyword") || "";
                //     const priceGte = url.searchParams.get("price[gte]") || 0;
                //     const priceLte = url.searchParams.get("price[lte]") || 22500;
                //     const currentPage = url.searchParams.get("page") || 1;

                //     return fetch(`https://mobiverse.vercel.app/products?keyword=${keyword}&page=${currentPage}&price[gte]=${priceGte}&price[lte]=${priceLte}`);
                // }
            },

            {
                path: '/v1/products/:id',
                element: <ProductDetails></ProductDetails>,
                loader: ({ params }) => fetch(`https://mobiverse.vercel.app/products/${params.id}`)
            },
            {
                path: '/v1/about',
                element: <About></About>
            },
            {
                path: '/v1/contact',
                element: <Contact></Contact>
            },
            {
                path: '/v1/product',
                element: <Product></Product>
            },
            {
                path: '/v1/user/dashboard',
                element: <PrivateRoute><BuyerDashboard></BuyerDashboard></PrivateRoute>,
                children: [
                    {
                        path: '/v1/user/dashboard',
                        element: <UserHome></UserHome>
                    },
                    {
                        path: '/v1/user/dashboard/cart',
                        element: <Cart></Cart>
                    },
                    {
                        path: '/v1/user/dashboard/favourites',
                        element: <Wishlist></Wishlist>
                    },
                    {
                        path: '/v1/user/dashboard/checkout',
                        element: <Checkout></Checkout>
                    },
                    {
                        path: '/v1/user/dashboard/orders',
                        element: <Orders></Orders>
                    },
                    {
                        path: '/v1/user/dashboard/edit_profile',
                        element: <EditProfile></EditProfile>
                    },
                    {
                        path: '/v1/user/dashboard/user_profile',
                        element: <UserProfile></UserProfile>
                    },
                ]
            },

            {
                path: '/v1/admin/dashboard',
                element: <PrivateRoute><AdminDashboard></AdminDashboard></PrivateRoute>,
                children: [
                    {
                        path: '/v1/admin/dashboard',
                        element: <AdminHome></AdminHome>,
                    },
                    {
                        path: '/v1/admin/dashboard/users',
                        element: <UserList></UserList>,
                    },
                ]
            },
            {
                path: '/v1/seller/dashboard',
                element: <PrivateRoute><SellerDashboard></SellerDashboard></PrivateRoute>,
                children: [
                    {
                        path: '/v1/seller/dashboard',
                        element: <SellerHome></SellerHome>
                    },
                    {
                        path: '/v1/seller/dashboard/my_products',
                        element: <MyProduct></MyProduct>
                    },
                    {
                        path: '/v1/seller/dashboard/product/new',
                        element: <AddProduct></AddProduct>
                    },
                    {
                        path: '/v1/seller/dashboard/product/update/:id',
                        element: <UpdateProduct></UpdateProduct>,
                        loader: ({ params }) => fetch(`https://mobiverse.vercel.app/products/${params.id}`)
                    },
                ]
            },

        ]
    },
]);