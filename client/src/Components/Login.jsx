import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const Login = () => {

    const navigate = useNavigate();

    const DefaultValues = { emailID: "", password: "" }

    const [visible, setVisible] = useState(false);
    const [userDetails, setUserDetails] = useState(DefaultValues);

    const handleToggoleVisible = () => {
        setVisible(!visible);
    }

    const handleLogin = async () => {

        try {
            const response = await axios.post("http://localhost:5000/login", {
                emailID: userDetails.emailID,
                password: userDetails.password,
            })

            const data = response.data;

            localStorage.setItem("Logined", true);

            if (data.role === "user") {
                navigate("/user");
            } else if (data.role === "mentor") {
                navigate("/mentor");
            } else if (data.role === "instructor") {
                navigate("/instructor");
            } else {
                navigate("/admin");
            }
        }
        catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Login failed");
        }

    }

    return (
        <>
            <div className='bg-gray-900 text-white w-[25%] p-6 flex flex-col items-center justify-center space-y-4'>
                <div className='flex flex-col w-full space-y-4 my-4'>
                    <input
                        className='bg-none border-b-2 outline-none px-2 py-2'
                        placeholder='Email ID'
                        value={userDetails.emailID}
                        onChange={(e) => setUserDetails({ ...userDetails, emailID: e.target.value })}
                    />
                    <input
                        type={visible ? "text" : "password"}
                        className='bg-none border-b-2 outline-none px-2 py-2'
                        placeholder='password'
                        value={userDetails.password}
                        onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                    />
                    <button
                        className='absolute top-28 left-82 cursor-pointer'
                        onClick={handleToggoleVisible}
                    >
                        {
                            visible ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />
                        }
                    </button>
                </div>
                <p >Forgot Password?</p>
                <button onClick={handleLogin}>Login</button>
                <p>or</p>
                <button onClick={() => navigate("create-Account")} >Create Account</button>
            </div>
        </>
    )
}

export default Login