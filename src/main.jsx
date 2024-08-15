import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from './Components/Root/Root';
import Login from './Components/Login/Login';
import AuthProvaider from './Components/AuthProvaider/AuthProvaider';
import Register from './Components/Register/Register';
import Home from './Components/Home/Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path:"/",
        element:<Home></Home>,
        loader: ()=>fetch(`${import.meta.env.VITE_LINK}/products`),
      },
      {
      path:"/login",
      element:<Login></Login>
      },
      {
        path:"/Register",
        element:<Register></Register>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvaider>
     <RouterProvider router={router} />
     </AuthProvaider>
  </StrictMode>,
)
