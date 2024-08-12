"use client"
import React, { useState, useEffect} from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDistributionFilterStore } from "@/app/financial/distribution/filterState"; 

function DistributionTable(props) {

    const filterState = useDistributionFilterStore((state) => {
        return state;
    });

	
    useEffect(() => {

        const fetchData = async () => {
			const pageNo = props.pageNo;
        	const pageRows = props.pageRows;
        
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/list-users?page=${pageNo}&pageSize=${pageRows}`);
                    
                filterState.setUsersData(response.data.users);
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
                  	<th className="text-center">DOJ</th>
                  	<th className="text-center">Name</th>
                  	<th className="text-center">User Id</th>
                  	{/* <th className="text-center">Phone</th>
                  	<th className="text-center">Email</th> */}
                  	<th className="text-center">Dist. Coupons</th>
                  	<th className="text-center">Avail. Coupons</th>
                  	<th className="text-center">Branch</th>
                  	{/* <th className="text-center">Description</th> */}
                </tr>
            </thead>
            <tbody className="my-10">

                {    
					filterState.usersData[0] ? (

                  		filterState.usersData.map((i, index) => {

                    		return (
                    		  	<tr
                    		  	  key={index}
                    		  	  className="font-medium text-xs text-black border-b-[1px] border-[#eeeeee]"
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
                    		    	<td className="text-center">{ i.DOJ ? i.DOJ : "-" }</td>
                    		    	<td 
										className="text-center text-indigo-600 hover:text-indigo-800 hover:scale-105 cursor-pointer"
										onClick={() => {
											props.setUserId(i.UId);
											props.setIsViewProfile(true);
										}}
									>	
										{ i.firstName } { i.secondName }
									</td>
                    		    	<td className="text-center">{ i.UId }</td>
                    		    	{/* <td className="text-center">{i.phone} </td>
                    		    	<td className="text-center">{i.email} </td> */}
                    		    	<td className="text-center">{i.total_distributed_coupons}</td>
                    		    	<td className="text-center">{i.coupons}</td>
                    		    	<td className="text-center flex justify-evenly">
                    		    	  <p className="text-[10px] bg-[#d9d9d9] w-16 h-7  me-1 rounded flex justify-center items-center">
										L - { i.Level }
									  </p>      
                    		    	  <p className="text-[10px] bg-[#d9d9d9] w-16 h-7  rounded flex justify-center items-center">
										N - { i.node_number }
									  </p> 
                    		    	</td>
                    		    	{/* <td className="text-center">
                    		    	  <div className="bg-[#d9d9d9] w-full h-7 p-1 rounded">{ i.description ? i.description : "" } </div>
                    		    	</td> */}

							
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

export default DistributionTable;
