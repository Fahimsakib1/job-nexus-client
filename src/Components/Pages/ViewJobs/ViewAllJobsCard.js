import { Button } from '@mui/material';
import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';






const ViewAllJobsCard = ({ job }) => {

    const { _id, jobTitle, companyName, salary, jobResponsibilities, jobPostedTime, vacancy, userName, userPhoto } = job


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
                            ? <>{jobResponsibilities.slice(0, 140)}<Link to={`/viewJob/${_id}`}><span className='text-blue-700 font-semibold cursor-pointer'> See Details...</span></Link></>
                            :
                            jobResponsibilities
                    }
                </p>
                <h1 className='text-start mt-2 text-sm text-orange-600 font-semibold'>Salary: {salary} {content}</h1>

                <div className='mt-4 mb-3 '>
                    <Stack direction={{ xs: 'column', sm: 'row', md: 'row' }} spacing={2}>

                        <Link to={`/viewJob/${_id}`}>
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

                    </Stack>
                </div>
            </div>
        </div>
    );
};

export default ViewAllJobsCard;