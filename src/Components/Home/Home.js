import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import { Link } from 'react-router-dom';
import useTitle from '../../Hooks/useTitle';







const Home = () => {


    const { user } = useContext(AuthContext)

    useTitle('Home')


    return (
        <div>
            <div>
                {
                    user?.displayName ?
                        <div>
                            <h1 className='mt-16 text-center lg:text-3xl md:text-3xl text-2xl font-bold '>Welcome, <span className='text-blue-700 font-bold'>{user?.displayName}</span></h1>


                            <div className='mt-24 flex justify-center items-center md:flex-row flex-col md:gap-x-10 md:gap-y-0 gap-y-4'>

                                <Link to='/addJob'>
                                    <h1 className='cursor-pointer py-3 px-8 rounded-sm bg-gray-300 hover:bg-gray-800 text-gray-600 hover:text-white font-semibold border-2 border-gray-400 hover:border-gray-700 text-lg'>Create Job Post</h1>
                                </Link>  

                                <Link to={`/myJobs/${user?.email}`}>
                                    <h1 className='cursor-pointer py-3 px-8 rounded-sm bg-gray-300 hover:bg-gray-800 text-gray-600 hover:text-white font-semibold border-2 border-gray-400 hover:border-gray-700 text-lg'>View My Posted Jobs</h1>
                                </Link>

                                <Link to='/viewAllJobs'>
                                    <h1 className='cursor-pointer py-3 px-8 rounded-sm bg-gray-300 hover:bg-gray-800 text-gray-600 hover:text-white font-semibold border-2 border-gray-400 hover:border-gray-700 text-lg'>View All Jobs</h1>
                                </Link>

                            </div>
                        </div>
                        :
                        <div className='mt-52'>
                            <h1 className='text-center lg:text-3xl md:text-3xl text-2xl font-bold text-gray-600 '>Please <Link to='/login'><span className='cursor-pointer text-blue-700 font-bold '>Login</span></Link> To See Job Contents</h1>
                        </div>
                }
            </div>
        </div>
    );
};

export default Home;