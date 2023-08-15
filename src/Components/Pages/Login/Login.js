import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FcGoogle } from 'react-icons/fc'
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import toast from 'react-hot-toast';
import useTitle from '../../../Hooks/useTitle';
import { Box, Button, Divider, TextField } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Spinner from '../../LoadingSpinners/Spinner';
import Spinner2 from '../../LoadingSpinners/Spinner2';









const Login = () => {


    const { userLogin, loading, setLoading } = useContext(AuthContext)
    const [LoginError, setLoginError] = useState('');
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    useTitle('Login');
    const [LoginLoader, setLoginLoader] = useState(false);






    const handleLogin = (data) => {
        setLoginError('');
        setLoginLoader(true);
        userLogin(data.email, data.Password)
            .then(result => {
                const user = result.user;
                console.log("User From Login Page: ", user);
                setLoginLoader(false);
                reset();
                navigate(from, { replace: true });
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Login Failed',
                })
                setLoginError(error.message);
                setLoginLoader(false);
            })
    }














    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };






    return (
        <div className='overflow-x-hidden'>

            <div className=' mt-28 flex justify-center items-center  '>
                <div className='bg-white  md:p-3 sm:p-2 p-1 border-2 border-gray-400 rounded-md  sm:w-[470px] w-[470px] shadow-2xl lg:w-[600px] md:w-[540px]  mx-4 sm:mx-2 md:mx-2 lg:mx-0'>
                    <h2 className=' mb-4 text-[20px] text-blue-800 text-center font-bold uppercase'>Login</h2>

                    <form onSubmit={handleSubmit(handleLogin)}>

                        <div className=''>
                            <TextField sx={{
                                mb: 3,
                                width: { xs: 300, sm: 420, md: 500, lg: 540 },
                            }} size="" type='email' id="outlined-basic" label="Email" placeholder='Enter Your Email' variant="outlined" {...register("email", { required: "Enter Your Email to Login" })} />
                            {errors.email && <p className='-mt-4 px-5 mb-2 text-start text-red-600'>{errors.email?.message}</p>}
                        </div>



                        <FormControl sx={{
                            mb: 3,
                            width: { xs: 300, sm: 420, md: 500, lg: 540 },
                        }} size="" variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                {...register("Password", {
                                    required: "Password is Required",
                                    minLength: { value: 8, message: 'Password must be 8 characters or longer' },
                                })}

                                id="outlined-adornment-password"
                                type={!showPassword ? 'password' : 'text'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                            {errors.Password && <p className='mt-2  px-1 mb-2 text-start text-red-600'>{errors.Password?.message}</p>}
                        </FormControl>


                        <div className='mt-3'>
                            <Button
                                sx={{
                                    width: { xs: 300, sm: 420, md: 500, lg: 540 },
                                    backgroundColor: '#050b45',
                                    py: 1,
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#091370',
                                        color: 'white',
                                    },
                                }}
                                type='submit' className='py-1 w-full text-white uppercase' variant="contained">
                                {LoginLoader
                                    ?
                                    <div className='flex justify-center items-center gap-x-2'>
                                        <Spinner></Spinner>
                                        <p className='text-[15px] md:text-[16px]'>Logging In</p>
                                    </div>
                                    :
                                    <p className='text-[16px] md:text-[17px]'>Login</p>
                                }
                            </Button>
                        </div>

                    </form>


                    {
                        LoginError && <p className='mt-2 text-red-600'>{LoginError}</p>
                    }



                    <div className='mt-3 mb-4'>
                        <p className='text-sm text-center font-semibold'>New to Job Nexus ? <Link to='/signup' className='text-blue-600 font-semibold'>Please Sign Up</Link></p>
                    </div>


                </div>
            </div>

        </div>
    );
};

export default Login;





