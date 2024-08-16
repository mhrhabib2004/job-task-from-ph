import { Link, NavLink } from "react-router-dom";

import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../AuthProvaider/AuthProvaider";


const Navbar = () => {
    
    const { user, logOut } = useContext(AuthContext);
    const handelSingout = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    title: "Welcome",
                    text: "Your Log out successs",
                    icon: "success",
                    dangerMode: true,
                })
            })
            .catch()}

    const Navlinks=<>
    <NavLink to={"/"}><li>HOME</li></NavLink>
    </>
    return (
        <div className="navbar  bg-base-300 mb-2">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        {Navlinks}
       
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">BestElectronics</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    {Navlinks}
    </ul>
  </div>
  <div className="navbar-end gap-3">

                    {
                        user?.email ? <div className="flex gap-2 items-center"><div className="w-10 rounded-full lg:tooltip lg:tooltip-left" data-tip={user?.displayName} >
                            <img className="rounded-full " alt="profile" src={user?.photoURL} />
                        </div> <button onClick={handelSingout} className="btn text-xl font-bold  btn-warning">Sign out</button></div> : <div className="flex gap-1"><Link to={"/login"}> <button className="btn md:text-xl font-bold btn-outline">Login</button></Link> <Link to={"/Register"}><button className="btn md:text-xl font-bold btn-outline">Register</button></Link></div>
                    }
                </div>
</div>
    );
};

export default Navbar;