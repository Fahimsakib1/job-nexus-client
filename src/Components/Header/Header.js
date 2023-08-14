import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Logo from '../../Images/Logo/Logo.png'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import { FaUserAlt } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import './Header.css'






const Header = () => {


    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = useState(null)
    const [anchorElUser, setAnchorElUser] = useState(null)

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };



    const { user, signOutUser } = useContext(AuthContext);
    console.log("User in Header: ", user);



    const handleLogOut = () => {
        signOutUser()
            .then(() => {
                navigate('/')
            })
            .catch(error => {
                console.error(error.message)
                toast.error("Logout Failed")
            })

    }



    return (

        <div className=''>
            <AppBar sx={{ backgroundColor: '#020636' }} position="static" className='md:px-10 px-0 py-2'>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Link to='/'>
                            <img className='w-12 h-12 rounded-full mr-2 sm:flex md:flex hidden' src={Logo} alt="" />
                        </Link>

                        <Link to='/'>
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                sx={{
                                    mr: 40,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                JOB NEXUS
                            </Typography>
                        </Link>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                <div className='mb-2'>
                                    <Link to='/addJob'>
                                        <h1 className='mb-2 text-[15px] sm:text-[17px] md:text-lg sm:px-6 px-6 md:px-10 py-1'>Add Job</h1>
                                    </Link>
                                    <Link to='/viewJobs'>
                                        <h1 className='mb-3 text-[15px] sm:text-[17px] md:text-lg sm:px-6 px-6 md:px-10 py-1'>View Jobs</h1>
                                    </Link>

                                    {
                                        user?.uid ?
                                            <Link onClick={handleLogOut}>
                                                <h1 className='bg-red-700 text-white text-[15px] sm:text-[17px] md:text-lg sm:px-6 px-6 md:px-10 py-1'>Logout</h1>
                                            </Link>
                                            :
                                            <Link to='/signup' className='' >
                                                <h1 className='bg-orange-500 text-white text-[15px] sm:text-[17px] md:text-lg sm:px-6 px-6 md:px-10 py-1'>Sign Up</h1>
                                            </Link>
                                    }
                                </div>
                            </Menu>
                        </Box>

                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 1,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 500,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            JOB NEXUS
                        </Typography>


                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <div className='flex justify-center items-center gap-x-10'>


                                {/* <NavLink to='/addJob'>
                                    <h1 className='hover:bg-rose-600  px-4 py-1 hover:text-white rounded-sm text-[19px] cursor-pointer'>Add Job</h1>
                                </NavLink>
                                <NavLink to='/viewJobs'>
                                    <h1 className='hover:bg-rose-600 px-4 py-1 hover:text-white rounded-sm  text-[19px] cursor-pointer'>View Jobs</h1>
                                </NavLink> */}


                                <NavLink to='/addJob'>
                                    <h1 className=' px-2 text-[19px] cursor-pointer'>Add Job</h1>
                                </NavLink>
                                <NavLink to='/viewJobs'>
                                    <h1 className='px-2 text-[19px] cursor-pointer'>View Jobs</h1>
                                </NavLink>


                                {
                                    user?.uid ?
                                        <Link onClick={handleLogOut}>
                                            <h1 className='bg-red-600 hover:bg-red-700 px-4 py-1 text-white rounded-sm  text-[19px] cursor-pointer'>Logout</h1>
                                        </Link>
                                        :
                                        <Link to='/signup'>
                                            <h1 className='bg-orange-500 px-5 py-1 text-white rounded-sm  text-[19px] cursor-pointer'>Sign Up</h1>
                                        </Link>
                                }

                            </div>
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    {
                                        user?.uid ?
                                            <>
                                                <img className='md:w-[48px] md:h-[48px] w-[36px] h-[36px] rounded-full' alt="UserImage" src={user?.photoURL} />
                                            </>
                                            :
                                            <>
                                                <FaUserAlt className='text-4xl text-white'></FaUserAlt>
                                            </>
                                    }
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <div className=''>


                                    {
                                        user?.uid &&
                                        <>
                                            {
                                                user?.displayName &&
                                                <h1 className='px-4 text-center text-blue-700 font-bold mb-2 '>Hello, {user?.displayName}</h1>
                                            }
                                        </>
                                    }


                                    <h1 className='py-1 px-12  hover:bg-gray-300 w-full mt-2 text-[17px] cursor-pointer text-center'>Profile</h1>
                                    <h1 className='py-1 px-12  hover:bg-gray-300 w-full mt-2 text-[17px] cursor-pointer text-center'>Account</h1>

                                    {
                                        user?.uid ?
                                            <Link onClick={handleLogOut}>
                                                <h1 className='text-center py-1 px-12 bg-red-600 hover:bg-red-700 w-full mt-3 text-white text-[17px] cursor-pointer mb-4'>Logout</h1>
                                            </Link>
                                            :
                                            <Link to='/signup' >
                                                <h1 className='bg-orange-500  text-white  py-1 px-12  hover:bg-orange-600 w-full mt-2 text-[17px] cursor-pointer mb-4'>Sign Up</h1>
                                            </Link>
                                    }
                                </div>
                            </Menu>
                        </Box>

                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
};

export default Header;