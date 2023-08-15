import React, { useEffect, useState } from 'react';
import { useGetAllJobsQuery } from '../../../API/apiSlice';
import useTitle from '../../../Hooks/useTitle';
import ViewAllJobsCard from './ViewAllJobsCard';
import { RotatingLines } from 'react-loader-spinner';








const ViewAllJobs = () => {


    const { data, isLoading } = useGetAllJobsQuery(null, { refetchOnMountOrArgChange: true })
    useTitle('All Jobs')
    const jobs = data


    let jobContent

    if (jobs?.length) {
        jobContent = Array.isArray(jobs)
            ?
            jobs.map((job, index) => (
                <ViewAllJobsCard key={index} job={job}></ViewAllJobsCard>))
            :
            ''
    }


    const [preLoader, setPreLoader] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setPreLoader(false)
        }, 200)
    })




    return (
        <div>


            {
                preLoader ?
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
                        {
                            jobs?.length > 0 ?
                                <div className='mb-10 lg:px-24 md:px-12 px-4 mt-10 grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 lg:gap-x-8 md:space-x-0 space-x-0 gap-y-8'>
                                    {
                                        jobContent
                                    }
                                </div>
                                :
                                <>
                                    <h1 className='text-3xl text-gray-700 font-bold text-center my-48'>No Job Posted Yet</h1>
                                </>
                        }
                    </>
            }




        </div>
    );
};

export default ViewAllJobs;