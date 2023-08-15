import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { FiEdit } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import { useDeleteJobMutation } from '../../../API/apiSlice';
import { RotatingLines } from 'react-loader-spinner';






const ViewMyJobsCard = ({ job, handleDeleteJob }) => {

    const { _id, jobTitle, companyName, salary, jobResponsibilities, jobPostedTime, vacancy, userName, userEmail, userPhoto } = job


    const [removeJob, { isLoading, isSuccess, isError, error }] = useDeleteJobMutation()


    useEffect(() => {
        if (!isLoading && isSuccess) {
            toast.success("Job Deleted Successfully...", { id: "DeleteJob" });
        }
        if (!isLoading && isError) {
            Swal.fire({
                icon: 'error',
                title: `${error}`,
                text: 'Please Try Again...'
            })
        }
    }, [isLoading, isSuccess, isError, error]);


    let content;
    if (salary === 'Negotiable') {
        content = ''
    }

    else if (salary === 'negotiable') {
        content = ''
    }

    else {
        content = "Taka"
    }













    return (
        <div>
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
                    <>
                        <div className='border-2 border-gray-400 md:px-6 px-3 pt-2 pb-3 rounded-md'>

                            <div className='flex justify-between md:flex-row flex-col md:gap-x-2 gap-x-0 md:gap-y-0 gap-y-0'>
                                <div className=' -mt-1 flex justify-start items-center gap-x-2'>
                                    <p className=' text-[14px] text-gray-800 font-bold text-justify'>Posted By: {userName}</p>
                                    <img className='md:w-[30px] md:h-[30px] w-[20px] h-[30px] rounded-full' alt="UserImage" src={userPhoto} />
                                </div>
                                <p className=' -mt-[3px] text-sm font-bold text-gray-800 md:text-end text-start'>Posted Date: {jobPostedTime}</p>
                            </div>


                            <div className='mt-1 flex md:items-center justify-between md:flex-row flex-col'>
                                <h1 className='text-[19px]  font-bold text-blue-700 text-start'>{jobTitle}</h1>
                                <div className='text-end'>
                                    <p className='text-md text-green-600 font-bold'>Vacancy <span className='ml-1 text-white font-semibold bg-blue-900 h-8 w-8 px-3 py-1  rounded-full'>{vacancy}</span></p>
                                </div>
                            </div>


                            <h1 className=' mt-0 text-green-600 text-[18px] font-bold text-start'>Company: {companyName}</h1>

                            <h1 className='mt-1 text-md font-semibold text-black text-start'>Job Responsibilities</h1>
                            <p className='text-gray-600 text-start text-sm'>
                                {
                                    jobResponsibilities.length > 150
                                        ? <>{jobResponsibilities.slice(0, 140)}<Link to={`/viewMyJob/${_id}`}><span className='text-blue-700 font-semibold cursor-pointer'> See Details...</span></Link></>
                                        :
                                        jobResponsibilities
                                }
                            </p>
                            <h1 className='text-start mt-2 text-sm text-orange-600 font-semibold'>Salary: {salary} {content}</h1>

                            <div className='mt-4 mb-3 '>
                                <Stack direction={{ xs: 'column', sm: 'row', md: 'row' }} spacing={2}>

                                    <Link to={`/viewMyJob/${_id}`}>
                                        <Button
                                            sx={{
                                                backgroundColor: '#07075d',
                                                py: 1,
                                                '&:hover': {
                                                    backgroundColor: '#070783',
                                                },
                                            }} variant="contained" endIcon={<SendIcon />}>
                                            View Job
                                        </Button>
                                    </Link>

                                    <Link to={`/editJob/${_id}`}>
                                        <button>
                                            <div className='md:px-8 px-[36px] py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-sm flex justify-center items-center gap-x-2'>
                                                <FiEdit></FiEdit>
                                                <p className='text-md font-semibold'>Edit</p>
                                            </div>
                                        </button>
                                    </Link>

                                    <div className='flex justify-center items-center'>
                                        <Button
                                            onClick={() => handleDeleteJob(_id)}
                                            sx={{
                                                color: 'red',
                                                borderColor: 'red',
                                                '&:hover': {
                                                    backgroundColor: 'red',
                                                    color: 'white'
                                                },
                                                width: { xs: 100, sm: 100, md: 100, lg: 105 },
                                                paddingX: { xs: 7, sm: 7, md: 0 },
                                            }}
                                            variant="outlined" startIcon={<DeleteIcon />}>
                                            Delete
                                        </Button>
                                    </div>
                                </Stack>
                            </div>

                        </div>
                    </>
            }
        </div>
    );
};

export default ViewMyJobsCard;