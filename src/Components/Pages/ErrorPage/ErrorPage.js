import React from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import errorImage from '../../../Images/ErrorPage/error-no-bg.png';
import useTitle from '../../../Hooks/useTitle';




const ErrorPage = () => {
    
    useTitle('Error')
    

    
    return (
        <div className=''>
            <section className=" my-8 flex items-center h-full p-16 text-black">
                <div className="container flex flex-col items-center justify-center md:p-24 p-4 mx-auto mb-56">
                    <div className="max-w-md text-center">
                        <div className='flex justify-center items-center gap-x-10 flex-col md:flex-row md:gap-y-0 gap-y-16'>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.2 }}
                                animate={{ opacity: 1, scale: 1.7 }}
                                transition={{ duration: 0.8 }}
                            >
                                <img className='md:w-full w-36 mx-auto' src={errorImage} alt="" />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.2 }}
                                animate={{ opacity: 1, scale: 1.2 }}
                                transition={{ duration: 0.8 }}

                                className='flex justify-center my-auto'>
                                <p className='md:mb-8 mb-2 font-extrabold md:text-9xl text-6xl text-red-600'>4</p>
                                <div className="md:h-20 md:w-20 w-10 h-10 border-8 border-dashed rounded-full animate-spin border-red-600 md:my-auto mt-[14px] mx-2"></div>
                                <p className='md:mb-8 mb-2 font-extrabold md:text-9xl text-red-600 text-6xl'>4</p>
                            </motion.div>
                        </div>
                        <p className="md:ml-20 ml-0 text-md font-semibold md:text-3xl text-red-600 uppercase">Oops... Page Not Found</p>
                        <p className="md:block hidden mt-4 mb-8 text-black text-semibold text-lg">You are visiting a page which is not available in this website.</p>
                        <div>
                            <Link to='/'><button className='md:mt-0 mt-6 bg-blue-800 text-white md:text-lg text-md py-3 md:px-10 px-6 text-center hover:scale-105 font-semibold'>Home Page</button></Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ErrorPage