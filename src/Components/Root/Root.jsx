import { Outlet, useLoaderData } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Root = () => {
   
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;