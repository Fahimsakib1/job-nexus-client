import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import toast from 'react-hot-toast';
import useTitle from '../../../Hooks/useTitle';
import { Button, TextField, TextareaAutosize } from '@mui/material';
import { useAddJobMutation } from '../../../API/apiSlice';
import { RotatingLines } from 'react-loader-spinner';







const AddJob = () => {


    const { user } = useContext(AuthContext)
    const [error, setError] = useState('');
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    useTitle('Add Jobs');



    //code for getting the  time and date
    const jobPostDate = new Date();
    const year = jobPostDate.getFullYear();
    const month = jobPostDate.getMonth() + 1;
    const day = jobPostDate.getDate();
    const hour = jobPostDate.getHours();
    const minute = jobPostDate.getMinutes();
    const currentTime = jobPostDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    const MonthDateYear = [month, day, year].join('-');
    const jobPostedTime = MonthDateYear + ' ' + currentTime



    const [addJob, { isLoading, isError, isSuccess }] = useAddJobMutation()






    const handleAddJob = (data) => {
        setError('');
        const jobDetails = {
            jobTitle: data.title,
            companyName: data.companyName,
            jobResponsibilities: data.jobResponsibility,
            jobContext: data.jobContext,
            jobRequirements: data.jobRequirements,
            vacancy: data.vacancy,
            experience: data.experience,
            education: data.education,
            location: data.location,
            jobType: data.jobType,
            salary: data.salary === '' ? 'Negotiable' : data.salary,
            userName: user?.displayName,
            userEmail: user?.email,
            userPhoto: user?.photoURL,
            jobPostedTime: jobPostedTime ? jobPostedTime : 'No Time Found'
        }

        console.log("Job Details: ", jobDetails);
        addJob(jobDetails);

    }


    useEffect(() => {
        if (!isLoading && isSuccess) {
            toast.success("Job Posted Successfully...", { id: "AddJob" });
            reset();
        }
        if (!isLoading && isError) {
            toast.error("Can not Post Job... Something Went wrong", { id: "AddJob" })
        }
    }, [isLoading, isSuccess, isError, error, reset]);





    return (
        <div className='overflow-x-hidden'>

            {
                isLoading ?
                    <>
                        <div className='w-full h-screen mx-auto text-center' style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                            <div className='flex justify-center items-center lg:mt-[300px] md:mt-[450px] mt-[250px]'>
                                <RotatingLines
                                    strokeColor="gray"
                                    strokeWidth="5"
                                    animationDuration="0.5"
                                    width="70"
                                    visible={true}
                                />
                            </div>
                        </div>
                    </>
                    :
                    <div className=' mt-10 mb-10 flex justify-center items-center  '>
                        <div className='bg-white border-2 border-gray-400 md:p-3 sm:p-2 p-1 rounded-md sm:w-[470px] w-[470px] shadow-2xl lg:w-[1000px] md:w-[700px]  mx-4 sm:mx-2 md:mx-2 lg:mx-0'>

                            <form onSubmit={handleSubmit(handleAddJob)}>

                                <div className='lg:px-0 md:px-6 px-0 mt-3 mb-3 flex justify-start items-center md:flex-row flex-col md:gap-x-4 gap-x-0 md:gap-y-0 gap-y-4'>

                                    <div className='w-full'>
                                        <TextField
                                            sx={{
                                                width: { xs: 300, sm: 280, md: 280, lg: 450 },
                                            }}
                                            size="small" id="outlined-basic" label="Job Title" placeholder='Enter Job Title' variant="outlined" {...register("title", { required: "Job Title is Required" })} />
                                        {errors.title && <p className=' px-4 text-start text-red-600'>{errors.title?.message}</p>}
                                    </div>

                                    <div className='w-full'>
                                        <TextField sx={{
                                            width: { xs: 300, sm: 280, md: 280, lg: 450 },
                                        }} size="small" type='text' id="outlined-basic" label="Company Name" placeholder='Enter Company Name' variant="outlined" {...register("companyName", { required: "Company Name Required" })} />
                                        {errors.companyName && <p className=' px-4 text-start text-red-600'>{errors.companyName?.message}</p>}
                                    </div>

                                </div>



                                <div className="mt-2 lg:px-4 md:px-10 px-4 form-control w-full mb-1">
                                    <h1 className='text-start font-semibold mb-1'>Job Responsibilities <span className='text-red-600 font-bold'>*</span></h1>
                                    <textarea type="text" placeholder="Write Job Responsibility" className="textarea textarea-bordered textarea-md  text-gray-900 font-semibold w-full px-3 border-2 border-gray-500 py-2" {...register("jobResponsibility", { required: "Job Responsibility Required" })} ></textarea>
                                    {errors.jobResponsibility && <p className='text-start text-red-600'>{errors.jobResponsibility?.message}</p>}
                                </div>




                                <div className='ml-1 mt-2 lg:px-4 md:px-10 px-4 flex justify-start items-center md:flex-row flex-col md:gap-x-6 md:gap-y-0 gap-y-2'>

                                    <div className="  w-full mb-1">
                                        <h1 className='text-start font-semibold mb-1'>Requirements <span className='text-red-600 font-bold'>*</span></h1>
                                        <textarea type="text" placeholder="Write Job Requirements" className="textarea textarea-bordered textarea-md  text-gray-900 font-semibold w-full px-3 border-2 border-gray-500 py-2" {...register("jobRequirements", { required: "Job Requirements Needed" })} ></textarea>
                                        {errors.jobRequirements && <p className='text-start text-red-600'>{errors.jobRequirements?.message}</p>}
                                    </div>

                                    <div className="w-full mb-1">
                                        <h1 className='text-start font-semibold mb-1'>Job Context</h1>
                                        <textarea type="text" placeholder="Write Job Context" className="textarea textarea-bordered textarea-md  text-gray-900 font-semibold w-full px-3 border-2 border-gray-500 py-2" {...register("jobContext")} ></textarea>
                                    </div>

                                </div>


                                <div className=' lg:px-4 md:px-10 px-4 flex justify-start items-center md:flex-row flex-col md:gap-x-6 md:gap-y-0 gap-y-2'>

                                    <div className=" ml-1 w-full">
                                        <h1 className='text-start font-semibold mb-1'>Vacancy <span className='text-red-600 font-bold'>*</span></h1>
                                        <input type="number" min="1" max="100"  {...register("vacancy", { required: "Vacancy Required" })}
                                            placeholder="Enter Vacancy" className="text-gray-700 font-semibold input input-bordered w-full px-3 border-2 border-gray-500 py-2" />
                                        {errors.vacancy && <p className='mt-1 px-4 text-start text-red-600'>{errors.vacancy?.message}</p>}
                                    </div>


                                    <div className=" w-full">
                                        <h1 className='text-start mb-1 font-semibold'>Experience  <span className='text-red-600 font-bold'>*</span></h1>
                                        <input type="number" min="0" max="10" {...register("experience", { required: "Job Experience Required" })}
                                            placeholder="Enter Year of Experience" className="text-gray-700 font-semibold input input-bordered w-full px-3 border-2 border-gray-500 py-2" />
                                        {errors.experience && <p className='mt-1 px-4 text-start text-red-600'>{errors.experience?.message}</p>}
                                    </div>


                                    <div className=' flex flex-col w-full '>
                                        <h1 className='text-start font-semibold mb-1'>Education <span className='text-red-600 font-bold'>*</span></h1>
                                        <select className='w-full px-3 border-2 border-gray-500 py-2' name='education'
                                            {...register("education", { required: "Education Required" })}>
                                            <option className=''>Bachelor of Computer Science And Engineering</option>
                                            <option className=''>Bachelor in Any Discipline</option>
                                            <option className=''>Bachelor of Civil Engineering</option>
                                            <option className=''>Bachelor of Electrical Engineering</option>
                                            <option className=''>Bachelor of Computer Networking</option>
                                            <option className=''>Bachelor of Mechanical Engineering</option>
                                            <option className=''>Bachelor of Informational Technology</option>
                                            <option className=''>Bachelor of Business Administration</option>
                                            <option className=''>Masters of  Any Discipline</option>
                                            <option className=''>Masters of Computer Science And Engineering</option>
                                            <option className=''>Masters of Civil Engineering</option>
                                            <option className=''>Masters of Electrical Engineering</option>
                                            <option className=''>Masters of Computer Networking</option>
                                            <option className=''>Masters of Mechanical Engineering</option>
                                            <option className=''>Masters of Informational Technology</option>
                                            <option className=''>Masters of Business Administration</option>
                                            <option className=''>Minimum HSC</option>
                                            <option className=''>Minimum SSC</option>
                                        </select>
                                        {errors.education && <p className='mt-1 px-4 text-start text-red-600'>{errors.education?.message}</p>}
                                    </div>

                                </div>


                                <div className='mt-3 lg:px-4 md:px-10 px-4 flex justify-start items-center md:flex-row flex-col md:gap-x-6 md:gap-y-0 gap-y-2'>

                                    <div className='ml-1 flex flex-col w-full '>
                                        <h1 className='text-start font-semibold mb-1'>Job Location <span className='text-red-600 font-bold'>*</span></h1>
                                        <select className='w-full px-3 border-2 border-gray-500 py-2' name='vacancy' id='vacancy'  {...register("location", { required: "Job Location Required" })}>
                                            <option className=''>Dhaka</option>
                                            <option className=''>Chittagong</option>
                                            <option className=''>Rajshahi</option>
                                            <option className=''>Rangpur</option>
                                            <option className=''>Sylhet</option>
                                            <option className=''>Dinajpur</option>
                                            <option className=''>Cumilla</option>
                                            <option className=''>Jossore</option>
                                            <option className=''>Khulna</option>
                                            <option className=''>Barishal</option>
                                            <option className=''>Others</option>
                                        </select>
                                        {errors.location && <p className='mt-1 px-4 text-start text-red-600'>{errors.location?.message}</p>}
                                    </div>

                                    <div className='ml-1 flex flex-col w-full '>
                                        <h1 className='text-start font-semibold mb-1'>Job Type <span className='text-red-600 font-bold'>*</span></h1>
                                        <select className='w-full px-3 border-2 border-gray-500 py-2' name='jobType'  {...register("jobType", { required: "Job Type Required" })}>
                                            <option className=''>Work At Office</option>
                                            <option className=''>Work From Home</option>
                                            <option className=''>Hybrid</option>
                                        </select>
                                        {errors.jobType && <p className='mt-1 px-4 text-start text-red-600'>{errors.jobType?.message}</p>}
                                    </div>

                                    <div className=" ml-1 w-full">
                                        <h1 className='text-start font-semibold mb-1'>Salary</h1>
                                        <input type="text" {...register("salary")}
                                            placeholder="Enter Salary" className="text-gray-800 font-semibold input input-bordered w-full px-3 border-2 border-gray-500 py-2" />
                                        {errors.salary && <p className='mt-1 px-4 text-start text-red-600'>{errors.salary?.message}</p>}
                                    </div>

                                </div>


                                {
                                    error && <p className='text-red-600'>{error}</p>
                                }


                                <div className='mt-12 mb-4'>
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
                                        <p className='text-[16px] md:text-[17px]'>Post Job</p>
                                    </Button>
                                </div>

                            </form>

                        </div>
                    </div>
            }


        </div>
    );
};

export default AddJob;