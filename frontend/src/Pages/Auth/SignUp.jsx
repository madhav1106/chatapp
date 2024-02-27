import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup';

const SignUp = () => {
    const [inputs, setInputs] = useState({
        fullname: '',
        username: '',
        password: '',
        confirmPassword: '',
        gender: ''
    });

    const {loading, signup } = useSignup();

    const handleCheckbox = (gender) => {
        setInputs({...inputs, gender})
    } 

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(inputs);
    }

    return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            <h1 className='text-2xl font-semibold text-center text-gray-300'>
                Sign Up <span className='text-blue-600'>ChatApp</span>
            </h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="fullname" className='label p-2'>
                        <span className='text-base label-text text-white'>Full Name</span>
                    </label>
                    <input type='text' name='fullname' className='w-full input input-bordered h-10' value={inputs.fullname}
                        onChange={(e) => setInputs({...inputs, fullname: e.target.value})}
                    />
                </div>
                <div>
                    <label htmlFor="username" className='label p-2'>
                        <span className='text-base label-text text-white'>Username</span>
                    </label>
                    <input type='text' name='username' className='w-full input input-bordered h-10' value={inputs.username}
                        onChange={(e) => setInputs({...inputs, username: e.target.value})}
                    />
                </div>
                <div>
                    <label htmlFor="password" className='label p-2'>
                        <span className='text-base label-text text-white'>Password</span>
                    </label>
                    <input type='password' name='password' className='w-full input input-bordered h-10' value={inputs.password}
                        onChange={(e) => setInputs({...inputs, password: e.target.value})}
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword" className='label p-2'>
                        <span className='text-base label-text text-white'>Confirm Password</span>
                    </label>
                    <input type='password' name='confirmPassword' className='w-full input input-bordered h-10' value={inputs.confirmPassword}
                        onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})}
                    />
                </div>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text text-white'>Gender</span>
                    </label>
                    <div className='flex'>
                        <div className='form-control'>
                            <label className={`label gap-2 cursor-pointer ${inputs.gender === "male" ? 'selected' : ''}`}>
                                <span className='label-text text-white'>Male</span>
                                <input type='checkbox' className='checkbox border-slate-900' checked={inputs.gender === "male"}
                                    onChange={() => handleCheckbox("male")}
                                />
                            </label>
                        </div>
                        <div className='form-control'>
                            <label className={`label gap-2 cursor-pointer ${inputs.gender === "female" ? 'selected' : ''}`}>
                                <span className='label-text text-white'>Female</span>
                                <input type='checkbox' className='checkbox border-slate-900' checked={inputs.gender === "female"}
                                    onChange={() => handleCheckbox("female")}
                                />
                            </label>
                        </div>
                    </div>
                </div>
                <Link to='/login' className='text-sm text-white hover:underline hover:text-blue-600 mt-2 inline-block'>
                    Already have an account?
                </Link>

                <button className='btn btn-block btn-sm mt-2 bg-blue-600 text-white hover:bg-blue-600 border-0' disabled={loading}>
                    Sign Up {loading && <span className='loading loading-spinner'></span>}
                </button>
            </form>
        </div>
    </div>
  )
}

export default SignUp