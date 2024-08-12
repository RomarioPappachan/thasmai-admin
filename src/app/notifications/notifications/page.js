"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import NavLink from '../navlink/navlink'
import { useNavbarTextStore } from '../../state/navbar-state';
import { FaSearch } from "react-icons/fa";
import dummyDATA from "./dummyDATA"
import { useNotificationStore } from "./searchState";
import NotificationMessageTable from '@/app/components/notifications/notifications/NotificationMessageTable';
import SelectedUserChip from './SelectedUserChip';
import { toast } from "react-hot-toast";



function Notifications() {

	const [message, setMessage] = useState({
		title: "",
		body: ""
	});


	const notificationState = useNotificationStore((state) => {
        return state;
    });

	const setNavbarText = useNavbarTextStore((state) => state.setNavbarText);
	setNavbarText("Notifications / Broadcast");

	// useEffect(() => {
    // 	const fetchData = async () => {
    //   		try {
    //       		const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/payment/search_users'`);
    //                 console.log(response);
    //                 setBroadcastMessages(response.data.notifications);
	// 				setTotalPages(response.data.totalpages);
					
    //   		} catch (error) {
    //     		console.error('Error fetching data:', error);
    //   		}
    // 	};

    // 	fetchData();
  	// }, []);
	

	function handleOnChange(event) {
		const { name, value } = event.target
		setMessage((prevValue) => {
		   	return {
				...prevValue, 
				[name]:value
			}
		}) 
	}

	
	async function handleSearchUser(event) {
		event.preventDefault();
		const query = event.target.value;

		if(query) {
			try {
				const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/search_users`, {
					search : query
				});
				// console.log(response);
				notificationState.setSearchedData(response.data);	
			} catch (error) {
				// alert('Failed to send broadcast message');
				toast.error(error.message);
			}
		} else {
			notificationState.setSearchedData([]);	
			return;
		}

	}


	async function handleSendNotificationMessage(event) {
		// event.preventDefault();
		const { title, body } = message;
		const userIds = notificationState.selectedUsersIds;

		// Get today's date
		const today = new Date();
    
		// Format the date in "dd/mm/yyyy" format
		const formattedDate = today.toLocaleDateString('en-GB', {
		  	day: '2-digit',
		  	month: '2-digit',
		  	year: 'numeric'
		});

		if(userIds[0] && title && body) {

			try {
				const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/payment/send-notification`, {
					userIds : userIds,
					title: title,
					message: body,
					// Date: formattedDate
				});
				// console.log(response);
				toast.success(response.data.message);
				setMessage({
					title: "",
					body: ""
				});
				notificationState.clearEntireUserIds();
				notificationState.clearEntireUsers();
			} catch (error) {
				// alert('Failed to send broadcast message');
				toast.error(error.message);
			}

			// toast("connect api for notification message😎😎");


		} else {

			if(userIds.length === 0  && title === "" && body === "") {
				toast("Please enter the required fields");
			} else {
				if(userIds.length === 0) {
					toast("Please select the users you want to send notifications to.");
				} else if(title === "") {
					toast("Please enter message title");
				} else if(body === "") {
					toast("Please write a message");
				} else {
					return;
				}
			}
			
		}

	}


	
  
  	return (
    	<div className="w-full h-[85vh] md:px-7 overflow-y-auto">
    		<div className="w-full h-[6%] mb-2">
    			<NavLink />
    		</div>
    		<div className='w-full min-h-[90vh] md:min-h-0 md:h-[90%] p-4 pb-10 md:pb-10 drop-shadow-xl bg-white flex flex-col md:flex-row overflow-y-auto'>
				<div className='w-full md:w-[50%] h-96 md:h-full order-last md:order-first'>
					{/* <div className='h-[25%] w-full bg-[#005cb81f] rounded'> */}
					<div className="h-[25%] w-full mb-2 py-2 px-2 bg-[#005cb81f] rounded overflow-y-auto shadow  flex flex-wrap snap-mandatory snap-y ">

					   {/* -------User Chip -------*/}
					   	{ 
            				notificationState.selectedUsers[0] ? (
								notificationState.selectedUsers.map((i, index) => {
            				    	return (
            				    	  	<SelectedUserChip 
											key={index}
            				    	  	  	user = {i} 
            				    	  	  	index= {index}
            				    	  	/>
            				    	)
            				  	})
            				) : (
            				  	<p className="ms-3 text-[#94a3b8] font-light">No users selected</p>
            				)
          
          				}
					</div>
					<div className='w-full h-[55%] mt-5 flex flex-col border-[1.5px] border-black rounded'>
						<input 
						   type='text'
						   className='w-full h-[20%] ps-2 bg-white text-black rounded-t outline-none focus:outline-none text-xl'
						   placeholder='Message Title'
						   name="title"
						   value={message.title}
						   onChange={handleOnChange}
						/>   
						<textarea
							placeholder='Write a message...'
							className='w-full h-[80%] mt-2 ps-2 pt-2 bg-white text-black  rounded-b outline-none focus:outline-none'
							name="body"
						    value={message.body}
						    onChange={handleOnChange}
						/>
					</div>
					<div className="w-full h-[15%] py-5">
						<button 
							className= 'w-full h-12 bg-[#005db8] text-white rounded-xl hover:bg-[#005cb8e2] drop-shadow-xl'
							onClick={handleSendNotificationMessage}
						>Send</button>
					</div>
				</div>

				<div className='w-full md:w-[50%] h-full md:px-2 md:ps-4'>
						{/* ---------------Search Tab --------------*/}

					<div className='w-full h-10 md:h-[10%] flex'>
            			<input 
            			 	type='search'
            			 	className='w-[80%] h-full px-2 text-black bg-[#716f6f1f] rounded-l outline-none'
            			 	placeholder='Search by Name or userId'
							onChange={handleSearchUser}
            			/>
            			<button className='w-[20%] h-full bg-[#716f6f1f] rounded-r flex items-center justify-center'>
            			  	<FaSearch className='text-2xl text-[#716f6fdc]'/>
            			</button>
          			</div>

					<div className='w-full h-[90%] mt-2 overflow-scroll'>
						<NotificationMessageTable />
					</div>
        				
				</div>
			
       		</div>

    	</div>
    
  	)
}

export default Notifications