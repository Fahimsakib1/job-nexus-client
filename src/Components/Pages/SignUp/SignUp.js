import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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









const Signup = () => {


    const { createUser, updateUser, googleSignIn, loading, setLoading } = useContext(AuthContext)
    const [error, setError] = useState('');
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const imageHostKey = process.env.REACT_APP_imagebb_key
    useTitle('Signup');
    const [signUpLoader, setSignUpLoader] = useState(false);
    const [googleSignUpLoader, setGoogleSignUpLoader] = useState(false);






    const handleSignup = (data) => {
        console.log(data);
        setError('');

        if (data.Password !== data.ConfirmPassword) {
            return Swal.fire({
                icon: 'error',
                title: 'Password is not matching',
                text: 'Please Confirm Your Password'
            })
        }


        else {

            setSignUpLoader(true);
            const image = data.photo[0];
            const formData = new FormData();
            formData.append('image', image);

            const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
            fetch(url, {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then(imageData => {
                    if (imageData.success) {
                        createUser(data.email, data.Password)
                            .then(result => {
                                const userInfo = {
                                    displayName: data.name,
                                    photoURL: imageData.data.url
                                }
                                updateUser(userInfo)
                                    .then(() => {
                                        addUserToDataBase(data.name, data.email, imageData.data.url)
                                        toast.success("User Created Successfully")
                                        reset();
                                        setSignUpLoader(false);
                                        navigate('/')
                                    })
                                    .catch(error => {
                                        toast.error("User name Update Failed")
                                        setError(error.message);
                                        setSignUpLoader(false);
                                    })

                            })

                            .catch(error => {
                                Swal.fire({
                                    icon: 'error',
                                    title: `${error.message}`,
                                    text: 'Please Sign Up with a new Email'
                                })
                                setError(error.message);
                                setSignUpLoader(false);
                            })
                    }
                })
        }

    }





    const handleSignUpByGoogle = () => {
        setGoogleSignUpLoader(true);
        googleSignIn()
            .then(result => {
                const user = result.user;
                toast.success("Successfully Sign In By Google");
                addUserToDataBase(user.displayName, user.email, user?.photoURL);
                setGoogleSignUpLoader(false);
                navigate('/')
            })

            .catch(error => {
                toast.error("Google Sign In Failed")
                setError(error.message);
                setGoogleSignUpLoader(false);
            })
    }



    const addUserToDataBase = (name, email, photo) => {
        const user = { name: name, email: email, photoURL: photo };

        fetch('http://localhost:5000/addUser', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    console.log(data);
                    //getUserToken(email)
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: `${data.message}`,
                        text: 'Please Sign Up with a new Email'
                    })
                    setSignUpLoader(false);
                    setGoogleSignUpLoader(false);

                }
            })
    }





    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseDownConfirmPassword = (event) => {
        event.preventDefault();
    };





    return (
        <div className='overflow-x-hidden'>

            <div className=' mt-10 flex justify-center items-center  '>
                <div className='bg-white  border-2 border-gray-400 md:p-3 sm:p-2 p-1  rounded-md  sm:w-[470px] w-[470px] shadow-2xl lg:w-[600px] md:w-[540px]  mx-4 sm:mx-2 md:mx-2 lg:mx-0'>
                    <h2 className='text-[20px] text-blue-800 text-center font-bold uppercase'>Sign up</h2>

                    <form onSubmit={handleSubmit(handleSignup)}>

                        <div>
                            <TextField 
                            sx={{
                                mt: 2,
                                mb: 3,
                                width: { xs: 300, sm: 420, md: 500, lg: 540 },
                            }}
                            size="small" id="outlined-basic" label="Full Name" placeholder='Enter Your Full Name' variant="outlined" {...register("name", { required: "Name is Required" })} />
                            {errors.name && <p className=' -mt-4 px-4 text-start text-red-600'>{errors.name?.message}</p>}
                        </div>

                        <div className=''>
                            <TextField sx={{
                                mb: 3,
                                width: { xs: 300, sm: 420, md: 500, lg: 540 },
                            }} size="small" type='email' id="outlined-basic" label="Email" placeholder='Enter Your Email' variant="outlined" {...register("email", { required: "Email is Required" })} />
                            {errors.email && <p className='-mt-4 px-4 text-start text-red-600'>{errors.email?.message}</p>}
                        </div>



                        <FormControl sx={{
                            mb: 3,
                            width: { xs: 300, sm: 420, md: 500, lg: 540 },
                        }} size="small" variant="outlined">
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
                            {errors.Password && <p className='text-start text-red-600'>{errors.Password?.message}</p>}
                        </FormControl>


                        <FormControl sx={{
                            mb: 3,
                            width: { xs: 300, sm: 420, md: 500, lg: 540 },
                        }} size="small" variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                            <OutlinedInput
                                {...register("ConfirmPassword", {
                                    required: "Please Confirm Your Password",
                                    minLength: { value: 8, message: 'Password must be 8 characters or longer' },
                                })}
                                id="outlined-adornment-password"
                                type={!showConfirmPassword ? 'password' : 'text'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowConfirmPassword}
                                            onMouseDown={handleMouseDownConfirmPassword}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="ConfirmPassword"
                            />
                            {errors.ConfirmPassword && <p className='text-start text-red-600'>{errors.ConfirmPassword?.message}</p>}
                        </FormControl>

                        <Box sx={{
                            width: { xs: 300, sm: 420, md: 500, lg: 540 },
                        }} className='-mt-2  md:px-1 px-1 form-control w-full mb-1 mx-auto'>
                            <h1 className=" text-left font-semibold">Upload Photo</h1>
                            <input type="file" className="input  w-full pt-2 text-black"  {...register("photo", { required: "Please Upload Your Image" })} />

                            {
                                errors.photo && <p className='text-start text-red-600'>{errors.photo.message}</p>
                            }
                        </Box>


                        {
                            error && <p className='text-red-600'>{error}</p>
                        }


                        <div className='mt-6'>
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
                                {signUpLoader
                                    ?
                                    <div className='flex justify-center items-center gap-x-2'>
                                        <Spinner></Spinner>
                                        <p className='text-[15px] md:text-[16px]'>Creating User</p>
                                    </div>
                                    :
                                    <p className='text-[16px] md:text-[17px]'>Sign Up</p>
                                }
                            </Button>
                        </div>

                    </form>



                    <div className='mt-3'>
                        <p className='text-sm text-center font-semibold'>Already Have An Account ? <Link to='/login' className='text-blue-600 font-semibold'>Please Login</Link></p>
                    </div>

                    <div className='text-center mx-auto flex justify-center'>
                        <Divider sx={{
                            width: { xs: 300, sm: 420, md: 500, lg: 540 },
                            mt: 1
                        }} >OR</Divider>
                    </div>

                    <div className='mt-2 mb-6'>
                        <Button
                            onClick={handleSignUpByGoogle}
                            sx={{
                                width: { xs: 300, sm: 420, md: 500, lg: 540 },
                                color: 'black',
                                '&:hover': {
                                    backgroundColor: 'black',
                                    color: 'white',
                                },
                            }}
                            className='py-1 w-full text-white uppercase' variant="outlined">

                            {googleSignUpLoader
                                ?
                                <div className='flex justify-center items-center gap-x-2'>
                                    <Spinner2></Spinner2>
                                    <p className='font-medium text-black'>Creating User</p>
                                </div>
                                :
                                <div className='flex justify-center items-center gap-x-2'>
                                    <FcGoogle className='text-2xl mr-2'></FcGoogle>
                                    <p className='font-medium'>Continue with google</p>
                                </div>
                            }
                            {/* <div className='flex justify-center items-center gap-x-2'>
                                <FcGoogle className='text-2xl mr-2'></FcGoogle>
                                <p className='font-medium'>Continue with google</p>
                            </div> */}
                        </Button>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Signup;