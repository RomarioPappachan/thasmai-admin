"use client"
import React from 'react'
import { useNotificationStore } from "./searchState";


function SelectedUserChip({user, index }) {
  
    const notificationState = useNotificationStore((state) => {
        return state;
    });
    
    return (
 
        <div className="h-7 ms-2 my-2 inline-block rounded-full bg-white snap snap-center shrink-0" key={ index }>

            <p className="h-7 px-2 text-sm flex items-center gap-x-1">
                <span className="font-bold text-black">{ user.first_name } { user.last_name }</span>
                {/* <span className="">{ user.UId }</span> */}
                {/* <span className="text-blue-600">" { user.value } "</span> */}
                <span className="w-5 h-5 ms-1 flex justify-center items-center rotate-45 text-xl text-white bg-[#005DB8] rounded-full cursor-pointer"
                    onClick={() => {
                        if(notificationState.selectedUsers.length === 1) {
                            notificationState.deleteSelectedUsers(index);
                            notificationState.deleteSelectedUsersIds(index);
                            // setFilterToggle(!filterToggle);
                        }
                        notificationState.deleteSelectedUsers(index);
                        notificationState.deleteSelectedUsersIds(index);
                    }}
                >+</span>
            </p>

        </div>
    )
}

export default SelectedUserChip