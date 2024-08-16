import { Link,useLocation,useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FaGoogle, FaEyeSlash } from "react-icons/fa";

import { FaEye } from "react-icons/fa6";
import { AuthContext } from "../AuthProvaider/AuthProvaider";
import { signInWithPopup } from "firebase/auth";
import Swal from "sweetalert2";
import auth from "../../firebase.Config";



const Login = () => {
    const { signIn,provider,loading } = useContext(AuthContext);
    const [showPassword,setshowpassword]=useState(false);

    const location= useLocation();

    const navigate = useNavigate();

    console.log('location here',location)

    

    const handelLogin = e => {
        e.preventDefault();
        console.log(e.currentTarget)
        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');
        console.log(email, password);
        signIn(email, password)
            .then(result=>{
                console.log(result.user)
                Swal.fire({
                    title: "Welcome",
                    text: "You Loged in SuCCessfullY",
                    icon: "success",
                    dangerMode: true,
                  })

                // navigate to login
                navigate(location?.state ? location.state : "/");
            })
            .catch(error =>{
                Swal.fire({
                    title: "opps",
                    text: "Your Email or password worng ",
                    icon: "warning",
                    dangerMode: true,
                  })
                  
            })
    }
    if(loading){
       return <span className="loading loading-spinner text-primary"></span>;
    }

  const handelGooglelogin= ()=>{
    signInWithPopup(auth,provider)
    .then((result)=>{
        // console.log(result);
        Swal.fire({
            title: "Welcome",
            text: "You Loged in SuCCessfullY",
            icon: "success",
            dangerMode: true,
          })

        navigate(location?.state ? location.state : "/");
    })
    .catch(error=>{
        Swal.fire({
            title: "opps",
            text: "Your Email or password worng ",
            icon: "warning",
            dangerMode: true,
          })
    })
  }

    // const handelGitHubLogin =()=>{
    //     signInWithPopup(auth,gitProvider)
    //     .then(result=>{
    //         Swal({
    //             title: "Welcome",
    //             text: "You Loged in SuCCessfullY",
    //             icon: "success",
    //             dangerMode: true,
    //           })

    //         navigate(location?.state ? location.state : "/");

    //     })
    //     .catch(error =>{
    //         Swal({
    //             title: "opps",
    //             text: "Your Email or password worng ",
    //             icon: "warning",
    //             dangerMode: true,
    //           })
    //     })
    // }
    return (
        <div>
     
            
            <div className="hero min-h-screen bg-no-repeat bg-cover bg-center  mt-3 rounded-xl" style={{ backgroundImage: 'url(https://www.tbsnews.net/sites/default/files/styles/infograph/public/images/2020/09/27/ratargul_swamp_forest_in_syalhet._photo_collected.jpg)' }}>
                
                <div className="hero-content flex-col ">
                    
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <h1 className="text-4xl text-center text-red-800 mt-1 font-bold">Login now!</h1>
                    <br />
                    <hr />
                    
                        <form onSubmit={handelLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="relative">
                                <input type={showPassword?"text":"password"}
                                 name="password"
                                  placeholder="password"
                                  
                                  className="input input-bordered w-full"
                                   required />
                                   <span className="absolute top-3 right-2" onClick={()=>setshowpassword(!showPassword)}>{showPassword?<FaEyeSlash/>:<FaEye />}</span>
                                </div>
                                
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                            <p>Dont have an account? <Link to={"/Register"} className="btn btn-link">Register</Link></p>
                            < hr />
                            <div className="text-center">OR</div>
                            <hr />
                            <div className="justify-center flex">
                                <button onClick={handelGooglelogin} className="btn btn-secondary "><FaGoogle/> GOOGLE</button>
                                {/* <button onClick={handelGitHubLogin} className="btn btn-secondary "><FaGithub /> GIT HUB</button> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;