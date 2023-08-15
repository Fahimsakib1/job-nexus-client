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






const ViewMyJobsCard = ({ job, handleDeleteJob }) => {

    const { _id, jobTitle, companyName, salary, jobResponsibilities, jobPostedTime } = job


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












    return (
        <div>
            <div className='border-2 border-gray-400 md:px-6 px-3 py-3 rounded-md'>
                <h1 className='text-lg font-bold text-blue-700 text-start'>{jobTitle}</h1>
                <h1 className=' text-green-600 text-md font-bold text-start'>Company: {companyName}</h1>
                <p className=' -mt-[2px] text-sm font-semibold text-gray-600 text-start'>Posted Date: {jobPostedTime}</p>
                <h1 className='mt-2 text-md font-semibold text-black text-start'>Job Responsibilities</h1>
                <p className='text-gray-600 text-start text-sm'>
                    {
                        jobResponsibilities.length > 150
                            ? <>{jobResponsibilities.slice(0, 140)}<span className='text-blue-700 font-semibold'> See Details...</span></>
                            :
                            jobResponsibilities
                    }
                </p>
                <h1 className='text-start mt-2 text-sm text-orange-600 font-semibold'>Salary: {salary}</h1>

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

                        <Link>
                            <button>
                                <div className='px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-sm flex justify-center items-center gap-x-2'>
                                    <FiEdit></FiEdit>
                                    <p className='text-md font-semibold'>Edit</p>
                                </div>
                            </button>
                        </Link>

                        <Button
                            onClick={ () => handleDeleteJob(_id) }
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
            </div>
        </div>
    );
};

export default ViewMyJobsCard;