"use client"; 

import React, { useEffect, useState } from 'react';
// import { FaEdit } from "react-icons/fa";
import { TbEyeEdit } from "react-icons/tb";
import axios from 'axios';

function OperatorCreationTable(props) {


    useEffect(() => {
        const fetchData = async () => {
            const page = props.pageNo || 1;
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/operatorList?page=${page}`);
                console.log(response);
                props.setOperatorData(response.data.list);
                props.setTotalPages(response.data.totalPages)
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        fetchData();
    }, [props.pageNo, props.renderTableToggle]); 

    return (
        <table className='w-full text-sm'>
            <thead className="sticky top-0 border-none">
                <tr className='h-12 text-left bg-[#005DB8] text-white border-none'>
                    <th className='w-[10%] ps-2'>Emp Id</th>
                    <th className='w-[15%] ps-2'>DOJ</th>
                    <th className='w-[20%] ps-2'>Name</th>
                    <th className='w-[25%] ps-2'>Username</th>
                    <th className='w-[15%] ps-2 text-center'>Location</th>
                    <th className='w-[10%] ps-2 text-center'>Role</th>
                    <th className='w-[5%] ps-2 text-center'></th>
                </tr>
            </thead>
            <tbody className='text-black'>
                {   props.operatorData[0] ? (
                    props.operatorData.map((operator, index) => (
                        <tr key={index} className='h-12 text-black border-b-[1px] border-[#eeeeee]'>
                            <td className='w-[10%] ps-2'>{operator.emp_Id}</td>
                            <td className='w-[15%] ps-2'>{operator.dateOfJoining}</td>
                            <td className='w-[20%] ps-2'>
                                <div className='w-full h-full text-nowrap'>{operator.name}</div>
                            </td>
                            <td className='w-[25%] ps-2'>
                                <div className='w-full h-full text-nowrap'>{operator.username}</div>
                            </td>
                            <td className='w-[15%]ps-2 text-center'>{operator.location}</td>
                            <td className='w-[10%] ps-2 text-center'>{operator.role}</td>
                            {/* <td className='ps-2 text-center'>{operator.email}</td> */}
                            {/* <td className='ps-2 text-center'>{operator.supervisor}</td> */}
                            <td className='w-[5%] ps-2 text-center'>
                                <button 
                                    onClick={() => {
                                        props.setUpdateEmployee(true);
                                        props.setEmployeeId(operator.emp_Id);
                                    }}
                                >
                                    <TbEyeEdit className='text-2xl text-[#444b91] hover:text-red-700 hover:bg-slate-200 hover:scale-110' />
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr className='h-12 text-black border-[#E0E2EC] border-b-2'>
                        <td className='w-[10%]'></td>
                        <td className='w-[10%]'></td>
                        <td className='w-[10%]'></td>
                        <td>
                            No data to display
                        </td>
                        <td className='w-[10%]'></td>
                        <td className='w-[10%]'></td>
                        <td className='w-[10%]'></td>
                    </tr>
                )
                    
                }
            </tbody>
        </table>
    
    );
}

export default OperatorCreationTable;
