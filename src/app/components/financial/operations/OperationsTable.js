"use client"

import React, { useEffect } from "react";
import axios from 'axios';
import { toast } from "react-hot-toast";
import { useOperationsFilterStore } from "@/app/financial/operations/filterState";

function OperationsTable(props) {


    const filterState = useOperationsFilterStore((state) => {
  	  return state;
  	});

    useEffect(() => {

        const fetchData = async () => {

            const pageNo = props.pageNo;
        	const pageRows = props.pageRows;
        
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/list-admin?page=${pageNo}&pageSize=${pageRows}`);
                // console.log(response);
                // const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/list-operation?page=${pageNo}&pageSize=${pageRows}`);
                    
                filterState.setExpenseData(response.data);
                // props.setTotalPages(response.data.totalPages);
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
    
        <table className="table rounded-3xl">
            <thead
              className="bg-[#5799FD] text-white sticky top-0 gap-x-20 text-[0.9rem]"
              style={{ borderRadius: "11px" }}
            >
                <tr className="rounded-3xl">
		        	<th className="text-center">Sl. No</th>
                    <th className="text-center">Date of Joining</th>
                    <th className="text-center">Emp. Name</th>
                    <th className="text-center">Emp. Id</th>
                    <th className="text-center">User name</th>
                    <th className="text-center">Location</th>
                    <th className="text-center">Balance amount</th>
                    {/* <th className="text-center">Remarks</th> */}
                    <th className="text-center">Invoice list</th>
                    {/* <th className="text-center">Saturation Limit</th> */}
                    <th className="text-center">Status</th>
                </tr>
                </thead>
            
                <tbody className="">

                    {
                        filterState.expenseData[0] ? (
                            filterState.expenseData.map((i, index) => {
								const expenseId = i.id;
                                return (
                                    <tr
                                      key={index}
                                      className="font-medium text-xs text-black border-b-[1px] border-[#eeeeee]"
                                    >
                                        <td className="text-center">
                                            { 	
										    	!props.isFilteredData ? (
                                                
										    		(index + 1) + ((props.pageNo - 1) * 10 )
                                                
										    	) : (
                                                
										    		(index + 1) + ((props.filteredPageNo - 1) * 10 )
                                                
										    	)
										    }
                                        </td>
                                        <td className="text-center">{i.dateOfJoining}</td>
                                        <td className="text-center text-indigo-600">{i.name} </td>
                                        <td className="text-center text-indigo-600">{i.emp_Id} </td>
                                        <td className="text-center">{i.username} </td>
                                        <td className="text-center">{i.location} </td>
                                        <td className="text-center">{i.balance_amount}</td>
                                        <td className="text-center  hover:scale-105">
											<span 
												className="text-purple-500 underline cursor-pointer"
												onClick={() => {
													// props.setExpenseId(expenseId);
													// props.setIsViewBill(true);
                                                    props.setEmployeeId(i.emp_Id);
                                                    props.setIsViewInvoiceList(true);                                                    
												}}
											>View</span>
										</td>
										{/* saturation limit is a configurable parameter  */}
                                        {/* <td className="text-center">{i.saturationLimit}5000</td>   */}
                                        
                                        {
                                            (i.balance_amount  <= 1000) ? (
                                                <td className="text-center">
                                                    <p 
                                                        className="bg-[#55ee9b] w-full h-7 p-1 text-white rounded cursor-pointer hover:bg-[#48c982]"
                                                        onClick={() => {
                                                            props.setEmployeeId(i.emp_Id);
                                                            props.setIsPaymentPopUp(true);
                                                            props.setSelectedOperatorData(i);
                                                            console.log(i);
                                                        }}
                                                    >Pay</p>
                                                </td>
                                            ) : (
                                                <td className="text-center">
                                                    <p 
                                                        className="bg-[#b1b3b2] w-full h-7 p-1 text-white rounded"
                                                        onClick={() => {
                                                            return;
                                                        }}
                                                    >Pay</p>
                                                </td>
                                            )
                                        }
                                    
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                			    <td>No data to display</td>
              			    </tr>
                        )
            
                    }

                {/* <tr
                  className="font-medium text-xs text-black"
                >
                    <td className="text-center">1</td>
                    <td className="text-center">2024-03-05</td>
                    <td className="text-center text-indigo-600">John Doe</td>
                    <td className="text-center">Electricity Bill</td>
                    <td className="text-center">2000</td>
                    <td className="text-center">Bill Link</td>
                    <td className="text-center">Advance payment</td>
                    <td className="text-center">400</td>
                    <td className="text-center">5000</td>
                    <td className="text-center">
                      <div className="bg-[#55ee9b] w-full h-7 p-1 text-white rounded">Pay</div>
                    </td>
                
                </tr> */}

        </tbody>
      </table>
   
  );
}

export default OperationsTable;