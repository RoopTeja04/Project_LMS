import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const Login = () => {

    const [ visible, setVisible ] = useState(false);

    const handleToggoleVisible = () => {
        setVisible(!visible);
    }

    return (
        <>
            <div className='bg-gray-900 text-white w-[25%] p-6 flex flex-col items-center justify-center space-y-4'>
                <div className='flex flex-col w-full space-y-4 my-4'>
                    <input
                        className='bg-none border-b-2 outline-none px-2 py-2'
                        placeholder='Email ID'
                    />
                    <input
                        type={ visible ? "text" : "password" }
                        className='bg-none border-b-2 outline-none px-2 py-2'
                        placeholder='password'
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
                <p>Forgot Password?</p>
                <button>Login</button>
                <p>or</p>
                <button>Create Account</button>
            </div>
        </>
    )
}

export default Login