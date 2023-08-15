import React from 'react';
import { Card, Typography } from "@material-tailwind/react";










const Try = () => {

    const a = "We are looking for highly motivated Frontend Engineer with 2+ years of frontend development experience using React, Typescript (preferred) or JavaScript to join our expanding engineering team. As a key member of the engineering team, you will help build, evolve and scale our frontend applications to drive product innovation and success. You will have the ability to own large features from start to finish"

    const b = a.split('.');




    const TABLE_HEAD = ["Name", "Job", "Employed", ""];
    const TABLE_ROWS = [
        {
            name: "John Michael",
            job: "Manager",
            date: "23/04/18",
        },
        {
            name: "Alexa Liras",
            job: "Developer",
            date: "23/04/18",
        },
        {
            name: "Laurent Perrier",
            job: "Executive",
            date: "19/09/17",
        },
        {
            name: "Michael Levi",
            job: "Developer",
            date: "24/12/08",
        },
        {
            name: "Richard Gran",
            job: "Manager",
            date: "04/10/21",
        },
    ];


    return (
        <div className='w-[1000px] mx-auto mt-10'>

            <h1 className='text-xl text-center mt-6'>{b.length}</h1>
            {
                b.map((line, index) =>
                    <ul key={index}>
                        <li className=' mb-2 text-justify w-[500px]'>** {line}</li>
                    </ul>
                )
            }


            <div>
                <Card className="h-full w-full overflow-hidden">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {TABLE_ROWS.map(({ name, job, date }, index) => (
                                <tr key={name} className="even:bg-blue-gray-50/50">
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {name}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {job}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {date}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                                            Edit
                                        </Typography>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            </div>
        </div>
    );
};

export default Try;