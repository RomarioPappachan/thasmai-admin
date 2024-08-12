"use client"

import React, { useState, useEffect} from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAppointmentsFilterStore } from "@/app/financial/appointments/filterState";

function AppointmentsTable(props) {

    const filterState = useAppointmentsFilterStore((state) => {
        return state;
    });


    useEffect(() => {

        const fetchData = async () => {
            const pageNo = props.pageNo;
        	const pageRows = props.pageRows;
        
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/list-ashram-appointments?page=${pageNo}&pageSize=${pageRows}`);
                    
                filterState.setUsersData(response.data.events);
                props.setTotalPages(response.data.totalPages);
                props.setIsFilteredData(false);
                props.setIsSearchedData(false);
                props.setFilteredPageNo(1);
                props.setSearchedPageNo(1);

                console.log(response);
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error("Error fetching data.");
            }
        };
    
        fetchData();
    }, [props.pageNo, props.filterToggle, props.tableRowToggle]);
  
    return (
    
        <table className="table">
            <thead
              className="bg-[#5799FD] text-white sticky top-0 gap-x-20 text-[0.9rem]"
              style={{ borderRadius: "11px" }}
            >
                <tr className="">
					{/* <th className="text-center">Sl. No</th> */}
                    <th className="text-center">Date</th>
                    <th className="text-center">Name</th>
                    <th className="text-center">User Id</th>
                    {/* <th className="text-center">Email</th>
                    <th className="text-center">Phone</th> */}
                    <th className="text-center">No. of Days</th>
                    <th className="text-center">No. of members</th>
                    <th className="text-center">Fees paid</th>
                    <th className="text-center">Avail.Coupons</th>
                    <th className="text-center">C.Redeemed</th>
                </tr>
            </thead>
            <tbody className="my-10">

                {    
					filterState.usersData[0] ? (

                  		filterState.usersData.map((i, index) => {

                    		return (

                                <tr
                                    key={index}
                                    className="font-medium text-xs text-black my-10 border-b-[1px] border-[#eeeeee]"
                                >
								    {/* <td className="text-center">
                                        { 	
											!props.isFilteredData ? (

												(index + 1) + ((props.pageNo - 1) * 10 )

											) : (

												(index + 1) + ((props.filteredPageNo - 1) * 10 )

											)
										}
                                    </td> */}
                                    <td className="text-center">{ i.appointmentDate ? i.appointmentDate : "-" }</td>
                                    <td 
                                        className="text-center text-indigo-600 hover:text-indigo-800 hover:scale-105 cursor-pointer"
                                        onClick={() => {
                                            props.setUserId(i.UId);
                                            props.setIsViewProfile(true);
                                        }}
                                    >
                                        { i.user_name }
                                    </td>
                                    <td className="text-center">{ i.UId }</td>
                                    <td className="text-center">{ i.days }</td>
                                    <td className="text-center">{ i.num_of_people }</td> 
                                    <td className="text-center">{ i.payment }</td>
                                    <td className="text-center">{ i.coupons } </td>
                                    <td className="text-center">{ i.discount } </td>              
                                </tr>
                    		);
                    	})

                	) : (
                  		<tr>
                			<td>No data to display</td>
              			</tr>
                	)
                    
                }


            </tbody>
        </table>
    
    );
}

export default AppointmentsTable;
