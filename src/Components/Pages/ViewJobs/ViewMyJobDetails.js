import React, { useEffect } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import { FiEdit } from 'react-icons/fi'
import { Button } from '@mui/material';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import useTitle from '../../../Hooks/useTitle';
import { useDeleteJobMutation } from '../../../API/apiSlice';




const ViewMyJobDetails = () => {




    const job = useLoaderData();
    const navigate = useNavigate();

    const { _id, jobTitle, userName, userEmail, location, education, companyName, salary, jobResponsibilities, jobPostedTime, jobContext, additionalRequirements, vacancy, userPhoto, jobType, experience } = job

    const AllResponsibility = jobResponsibilities.split('.')
    const responsibility = AllResponsibility.slice(0, AllResponsibility.length - 1)


    const Additional = additionalRequirements.split('.')
    const Addition = Additional.slice(0, Additional.length - 1)


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


    useTitle(`${jobTitle}`);





    const [removeJob, { isLoading, isSuccess, isError, error }] = useDeleteJobMutation();

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




    const handleDeleteJob = (id) => {

        console.log("ID", id);

        fetch(`http://localhost:5000/job/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success('Job Deleted', {
                        position: "bottom-center",
                        autoClose: 1000,
                        theme: "colored",
                    });
                    navigate(`/myJobs/${userEmail}`)
                }
                else {
                    toast.error(`Something Went Wrong!! Can Not Delete Job... `, {
                        position: "bottom-right",
                        autoClose: 1500,
                        theme: "colored",
                    });
                }
            })
            .catch(error => {
                toast.error(`${error}`, {
                    position: "bottom-right",
                    autoClose: 1500,
                    theme: "colored",
                });
            })

    }







    return (
        <div className='flex justify-center items-center lg:px-32 md:px-8 px-3'>

            <div className='lg:w-3/4 w-full bg-white border-2 lg:px-4 md:px-6 px-4 py-4 rounded-sm my-12 shadow-2xl'>
                <h1 className='md:text-[20px] text-[18px] font-bold text-blue-700 text-start'>{jobTitle}</h1>

                <div className='flex md:flex-row flex-col justify-between '>
                    <h1 className=' text-green-600 text-lg font-bold text-start'>Company: {companyName}</h1>
                    <p className=' -mt-[2px] text-sm font-semibold text-gray-600 text-start'>Posted Date: {jobPostedTime}</p>
                </div>

                <div className='flex justify-between  md:flex-row flex-col md:gap-x-2 md:gap-y-0 gap-y-3'>
                    <div>
                        <h1 className='mt-3 text-[17px] font-bold text-black text-start'>Vacancy</h1>
                        <p className=' text-md text-gray-700  text-justify'>{vacancy}</p>
                    </div>

                    <div>
                        <h1 className='mt-3 text-[17px] font-bold text-black text-start'>Experience</h1>
                        <p className=' text-md text-gray-700  text-justify'>Minimum {experience} {experience > 1 ? 'Years' : 'Year'}</p>
                    </div>

                    <div className='text-orange-500 '>
                        <h1 className='mt-3 text-[17px] font-bold text-start'>Salary</h1>
                        <p className=' text-md font-bold text-justify'>{salary} {content}</p>
                    </div>
                </div>


                <h1 className='mt-3 text-[17px] font-bold text-black text-start'>Job Context</h1>
                <p className=' text-md  text-gray-700 text-justify'>{jobContext}</p>



                <h1 className='mt-4 text-[17px] font-bold text-black text-start'>Job Responsibilities</h1>
                {
                    responsibility.map((line, index) =>
                        <ul key={index}>
                            <li className=' mt-2 text-gray-700 text-justify '>⦿ {line}</li>
                        </ul>
                    )
                }


                <h1 className='mt-4 text-[17px] font-bold text-black text-start'>Educational Requirements</h1>
                <p className=' text-md text-gray-700  text-justify'>⦿ {education}</p>


                <h1 className='mt-4 text-[17px] font-bold text-black text-start'>Job Type</h1>
                <p className=' text-md text-gray-700  text-justify'> {jobType}</p>


                <h1 className='mt-4 text-[17px] font-bold text-black text-start'>Additional Requirements</h1>
                {
                    Addition.map((line, index) =>
                        <ul key={index}>
                            <li className=' mt-2 text-gray-700 text-justify '>⦿ {line}</li>
                        </ul>
                    )
                }

                <h1 className='mt-4 text-[17px] font-bold text-black text-start'>Job Location</h1>
                <p className=' text-md text-gray-700  text-justify'> {location}</p>



                <div className='mt-6 mb-3 '>
                    <Stack direction={{ xs: 'row', sm: 'row', md: 'row' }} spacing={2}>

                        <Link to={`/myJobs/${userEmail}`}>
                            <button>
                                <div className='px-10 py-2 bg-blue-800 hover:bg-blue-700 text-white rounded-sm flex justify-center items-center gap-x-2'>
                                    <p className='text-md font-semibold'>Back</p>
                                </div>
                            </button>
                        </Link>


                        <Link>
                            <button>
                                <div className='px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-sm flex justify-center items-center gap-x-2'>
                                    <FiEdit></FiEdit>
                                    <p className='text-md font-semibold'>Edit</p>
                                </div>
                            </button>
                        </Link>

                        <Button onClick={() => handleDeleteJob(_id)}
                            sx={{
                                color: 'red',
                                borderColor: 'red',
                                '&:hover': {
                                    backgroundColor: 'red',
                                    color: 'white'
                                },
                            }}
                            variant="outlined" startIcon={<DeleteIcon />}>
                            Delete
                        </Button>

                    </Stack>
                </div>


                <h1 className='mt-6 text-[20px] font-bold text-purple-700 text-end'>Recruiter</h1>
                <div className=' flex justify-end items-center gap-x-2'>
                    <p className=' text-[17px] text-gray-900 font-semibold text-justify'> {userName}</p>
                    <img className='md:w-[44px] md:h-[44px] w-[28px] h-[28px] rounded-full' alt="UserImage" src={userPhoto} />
                </div>
                <p className=' -mt-1 text-[16px] text-gray-800 font-semibold text-end mb-6'>Email: {userEmail}</p>

            </div>

        </div>
    );
};

export default ViewMyJobDetails;