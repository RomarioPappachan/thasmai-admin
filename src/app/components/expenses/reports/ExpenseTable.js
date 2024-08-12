"use client"

import React from 'react'

function ExpenseTable(props) {
        // console.log(props.expenseData);
  return (
            <table className='min-w-full md:w-full'>
                <thead className="sticky top-0">
                    <tr className='min-w-full h-12 text-[10px] md:text-sm text-left bg-[#005DB8] text-white'>
                        <th className='ps-2'>Date</th>
                        <th className='ps-2'>Operator</th>
                        <th className='ps-2'>Expense Type</th>
                        <th className='ps-2'>Amount</th>
                        <th className='ps-2 text-center'>Invoice</th>
                        <th className='ps-2 text-center'>Description</th>
                        <th className='ps-2 text-center'>View</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        props.expenseData[0] ? (
                            props.expenseData.map((i,index) => { 
                                return (
                                    <tr className='h-12 text-[10px] md:text-xs text-black border-b-[1px] border-[#eeeeee]' key={index}>
                                        <td className='ps-2'>{i.Expense_Date}</td>
                                        <td className='ps-2'>{i.name}</td>
                                        <td className='ps-2'>{i.expenseType}</td>
                                        <td className='ps-2'>₹ {i.amount}</td>
                                        <td className='ps-2 text-center'>
                                            <img 
                                                className="w-8 h-8 mx-auto rounded-md hover:scale-110"
                                                src={i.invoiceUrl} alt="invoice" 
                                                onClick={() => {
                                                    props.setSelectedId(i.id);
                                                    props.setIsViewDetail(true);
                                                }}
                                            />
                                        </td>

                                      { i.description ?   (
                                        
                                        <td className='h-12 ps-2 flex justify-center items-center'>

                                            {
                                                i.description.length > 20 ? (
                                                        i.description.substring(0,20)
                                                    ) : (
                                                        i.description
                                                    ) 
                                            }
                                            <p 
                                                className="ms-1 text-blue-500 text-[10px] md:text-sm hover:scale-110 cursor-pointer"
                                                onClick={() => {
                                                    props.setSelectedId(i.id);
                                                    props.setIsViewDetail(true);
                                                }}
                                            >Read more....</p>

                                        </td>
                                      )  : (
                                        <td className='h-12 ps-2 flex justify-center items-center'>
                                            -
                                        </td>
                                      )  



                                            }

                                        <td className='ps-2 text-center'>
                                            <button
                                                className='py-1 px-4 bg-[#AAC7FF] text-[#002F64] rounded-xl hover:scale-110'
                                                onClick={() => {
                                                    props.setSelectedId(i.id);
                                                    props.setIsViewDetail(true);
                                                }}
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })

                        ) : (

                            <tr className='h-12 text-[10px] md:text-base border-[#E0E2EC] border-b-2'>
                                <td className='w-48 ps-2'>No Data to Display</td>
                                <td className='ps-2'></td>
                                <td className='ps-2'></td>
                                <td className='ps-2 text-center'></td>
                                <td className='ps-2 text-center'></td>
                                <td></td>
                            </tr>
                        )
                    }

                </tbody>
            </table>
    )
}

export default ExpenseTable