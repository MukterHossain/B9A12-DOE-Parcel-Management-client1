
import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../components/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Dashboard/Dashboard";
import AdminHome from "../Dashboard/AdminHome";
import BookParcel from "../Dashboard/BookParcel";
import UserHome from "../Dashboard/UserHome";
import AllUsers from "../Dashboard/AllUsers";
import AllParcels from "../Dashboard/AllParcels";
import AdminRoute from "./AdminRoute";
import Contact from "../pages/Contact";
import DeliveryHome from "../Dashboard/DeliveryHome";
import DeliveryList from "../Dashboard/DeliveryList";
import Reviews from "../Dashboard/Reviews";
import MyParcel from "../Dashboard/MyParcel";
import MyProfile from "../Dashboard/MyProfile";
import AllDeliveryMen from "../Dashboard/AllDeliveryMen";
import Statistics from "../Dashboard/Statistics";
import UpdateBook from "../Dashboard/UpdateBook";
import Payment from "../Payment/Payment";

export const router = createBrowserRouter([
  {
    path: "/",
    element:<MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
        {
            index:true,
            element: <Home></Home>
        },
        {
          path: 'login',
          element: <Login></Login>
        },
        {
          path: 'signup',
          element: <SignUp></SignUp>
        },
        {
          path: 'contact',
          element:<Contact></Contact>
        }
    ]
  },
  {
    path:'dashboard',
    element:<PrivateRoute>
      <Dashboard></Dashboard>
      </PrivateRoute>,
    children: [     
      {
        path:'userHome',
        element: <UserHome></UserHome>
      },
      {
        path:'bookParcel',
        element: <BookParcel></BookParcel>
      },
      {
        path:'myParcel',
        element: <MyParcel></MyParcel>
      },
      {
        path:'profile',
        element: <MyProfile></MyProfile>
      },
      {
        path:'update/:id',
        element: <UpdateBook></UpdateBook>,
        // loader: ({params}) => fetch(`${import.meta.env.VITE_API_URL}/updateBook/${params.id}`)
      },
      {
        path:'payment',
        element: <Payment></Payment>,
      },


      // Admin Route     
      {
        path:'adminHome',
        element:<AdminRoute><AdminHome></AdminHome></AdminRoute>
      },
      {
        path: 'users',
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
      },
      {
        path: 'allParcels',
        element: <AdminRoute><AllParcels></AllParcels></AdminRoute>
      },
      {
        path: 'deliveryMen',
        element: <AdminRoute><AllDeliveryMen></AllDeliveryMen></AdminRoute>
      },
      {
        path: 'statistics',
        element: <AdminRoute><Statistics></Statistics></AdminRoute>
      },

      // delivery Route     
      {
        path:'deliveryHome',
        element: <DeliveryHome></DeliveryHome>
      },
      {
        path: 'deliveryList',
        element: <DeliveryList></DeliveryList>
      },
      {
        path: 'reviews',
        element: <Reviews></Reviews>
      }

    ]
  }
]);