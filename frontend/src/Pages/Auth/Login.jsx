import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../../hooks/useLogin';

const Login = () => {
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });

    const { loading, login } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(inputs);
    }

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-2xl font-semibold text-center text-gray-300'>
                    Login <span className='text-blue-600'>ChatApp</span>
                </h1>

                <form onSubmit={handleSubmit}>
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
                    <Link to='/signup' className='text-sm text-white hover:underline hover:text-blue-600 mt-2 inline-block'>
                        Don't have an account?
                    </Link>
                    <button className='btn btn-block btn-sm mt-2 bg-blue-600 text-white hover:bg-blue-600 border-0' disabled={loading}>
                        Login {loading && <span className='loading loading-spinner'></span>}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login