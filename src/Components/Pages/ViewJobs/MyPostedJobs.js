import React, { useContext } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import useTitle from '../../../Hooks/useTitle';
import ViewMyJobsCard from './ViewMyJobsCard';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';











const MyPostedJobs = () => {


    const { user } = useContext(AuthContext)
    const jobs = useLoaderData();
    useTitle('My Jobs');


    // let jobContent
    // if (jobs?.length) {
    //     jobContent = Array.isArray(jobs)
    //         ?
    //         jobs.map((job, index) => (
    //             <ViewMyJobsCard key={index} job={job}></ViewMyJobsCard>))
    //         :
    //         ''
    // }







    //get the appointment data based on user email
    const { data: myPostedJobs = [], refetch, isLoading } = useQuery({
        queryKey: ['myPostedJobs', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/jobsByEmail/${user?.email}`);
            const data = await res.json();
            return data;
        }
    })






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
                    refetch();
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







    let jobContent
    if (myPostedJobs?.length) {
        jobContent = Array.isArray(myPostedJobs)
            ?
            myPostedJobs.map((job, index) => (
                <ViewMyJobsCard key={index} job={job} handleDeleteJob={handleDeleteJob}></ViewMyJobsCard>))
            :
            ''
    }



    return (
        <div>
            {
                jobs?.length > 0 ?
                    <div className='mb-10 lg:px-24 md:px-12 px-4 mt-10 grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 lg:space-x-8 md:space-x-0 space-x-0 gap-y-8'>
                        {
                            jobContent
                        }
                    </div>
                    :
                    <>
                        <h1 className='text-3xl text-gray-700 font-bold text-center mt-48 mb-2'>{user && user?.displayName} You Have Not Post Any Job Yet</h1>
                        <h1 className='text-xl'>Click
                            <Link to='/addJob'>
                                <span className='px-2 cursor-pointer text-center text-xl text-blue-800 font-bold'>Here</span>
                            </Link>
                            To Post Job
                        </h1>
                    </>
            }
        </div>
    );
};

export default MyPostedJobs;