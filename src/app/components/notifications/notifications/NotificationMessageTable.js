"use client"

import React , {useState, useEffect} from 'react'
import axios from 'axios';
import { useNotificationStore } from '@/app/notifications/notifications/searchState'


function NotificationMessageTable() {

    const notificationState = useNotificationStore((state) => {
        return state;
    });
    

    return (
   
        <table className='w-full text-black'>
            <thead className='w-full p-0 sticky top-0'>
                <tr className='h-12 text-left bg-[#005DB8] text-white'>
                    <th className='w-[25%] ps-2'>User ID</th>
                    <th className='w-[50%] ps-2'>Name</th>
                    <th className='w-[25%] ps-2 text-center'>Add</th>
                </tr>
            </thead>
            <tbody className='w-full'>
                {   
                    notificationState.searchedData[0] ? (
                        notificationState.searchedData.map((i, index) => {

                            // for disable already selected user button
                            let isAdded = notificationState.selectedUsersIds.filter((id) => id === i.UId);

                            return (
                                <tr className='h-12 text-sm text-black border-[#E0E2EC] border-b-2' key={index}>
                                    <td className='ps-2'>{i.UId}</td>
                                    <td className='ps-2'>{ i.first_name } { i.last_name }</td>
                                    {
                                        isAdded[0] ? (
                                            <td className='ps-2 text-center'>
                                                <button
                                                    className='w-[100px] py-1 px-4 bg-[#ed95a5] text-[#002F64] rounded-xl hover:scale-110'
                                                    onClick={() => {
                                                        notificationState.deleteSelectedUserByRemoveButton(i.UId);
                                                        notificationState.deleteUserIdByRemoveButton(i.UId);
                                                    }}
                                                >
                                                    -Remove
                                                </button>   
                                            </td>
                                        ) : (
                                            <td className='ps-2 text-center'>
                                                <button
                                                    className='w-[80px] py-1 px-4 bg-[#AAC7FF] text-[#002F64] rounded-xl hover:scale-110'
                                                    onClick={() => {
                                                        notificationState.setSelectedUsers(i);
                                                        notificationState.setSelectedUsersIds(i.UId);
                                                    }}
                                                >
                                                    +ADD
                                                </button>   
                                            </td>
                                        )
                                    }
                                    
                                </tr>
                            )
                        })

                    ) : (
                        <tr className='h-20 p-5 text-sm border-[#E0E2EC] border-b-2'>
                            <td className='ps-3'>Search users......</td>
                            <td></td>
                            <td></td>
                        </tr>
                    )
                    
                }
            </tbody>
        </table>

    )
}

export default NotificationMessageTable