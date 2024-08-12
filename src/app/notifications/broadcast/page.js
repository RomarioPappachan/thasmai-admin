"use client"
import React, { useState, useEffect} from 'react'
import NavLink from '../navlink/navlink'
import { useNavbarTextStore } from '../../state/navbar-state';
import axios from "axios";
import { toast } from "react-hot-toast";
import BroadcastMessageTable from '@/app/components/notifications/broadcast/BroadcastMessageTable';
import ViewBroadcastMessage from '@/app/components/notifications/broadcast/ViewBroadcastMessage';



function Broadcast() {

    const [viewBroadcastMessage, setViewBroadcastMessage] = useState(false);
    const [selectedMessageId, setselectedMessageId] = useState("");
	const [sendMessageToggle, setSendMessageToggle] = useState(false);

	const [message, setMessage] = useState({
		receiver: "",
		title: "",
		body: ""
	});

	const setNavbarText = useNavbarTextStore((state) => state.setNavbarText);
	setNavbarText("Notifications / Broadcast");


	function handleOnChange(event) {
		const { name, value } = event.target
		setMessage((prevValue) => {
		   return {...prevValue, [name]:value}
		}) 
	}

	async function handleSendMessage(event) {
		event.preventDefault();
		const { receiver, title, body } = message;

		// Get today's date
		const today = new Date();
    
		// Format the date in "dd/mm/yyyy" format
		const formattedDate = today.toLocaleDateString('en-GB', {
		  	day: '2-digit',
		  	month: '2-digit',
		  	year: 'numeric'
		});

		if(receiver && title && body) {
			if(receiver === "meditators") {

				try {
					const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/payment/send-broadcast-notification`, {
						title: title,
						message: body,
						Date: formattedDate
					});
					// console.log(response);
					toast.success(response.data.message);
					setMessage({
						receiver: "",
						title: "",
						body: ""
					});
					setSendMessageToggle(!sendMessageToggle);	
				} catch (error) {
					// alert('Failed to send broadcast message');
					toast.error(error.message);
				}

			} else if(receiver === "operators") {
				toast("connect api for operator broadcast message😎😎");
			} else {
				return;
			}

		} else {

			if(receiver === "" && title === "" && body === "") {
				toast("Please enter the required fields");
			} else {
				if(receiver === "") {
					toast("Please select the receiver");
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
    		<div className='w-full min-h-[90vh] md:min-h-0 md:h-[90%] p-4 py-10 drop-shadow-xl bg-white flex flex-col md:flex-row overflow-y-scroll'>
				<div className='w-full md:w-[50%] h-96 md:h-full mb-10 md:mb-0'>
					<div className='h-[10%] w-full'>
					    <select
           			    	className='w-full md:w-[50%] h-12 ps-2 text-sm md:text-md bg-white text-black border-[1.5px] border-black rounded placeholder:text-gray-500'
							name="receiver"
							value={message.receiver}
							onChange={handleOnChange}
						>
             		     	<option value="" disabled selected>Select Receivers</option>
             		     	{/* <option value='operators' >Operators</option> */}
             		     	<option value='meditators'>Meditators</option>
						</select>
					</div>
					<div className='w-full h-[70%] mt-5 flex flex-col border-[1.5px] bg-white text-black border-black rounded'>
						<input 
						   type='text'
						   className='w-full h-[20%] ps-2 text-lg md:text-xl bg-white text-black rounded-t outline-none focus:outline-none placeholder:text-gray-500'
						   placeholder='Message Title'
						   name="title"
						   value={message.title}
						   onChange={handleOnChange}
						/>   
						<textarea
							placeholder='Write a message...'
							className='w-full h-[80%] mt-2 ps-2 pt-2 text-md bg-white text-black rounded-b outline-none focus:outline-none placeholder:text-gray-500'
							name="body"
						    value={message.body}
						    onChange={handleOnChange}
						/>
					</div>
					<div className="w-full h-[20%] pt-5">
						<button 
							className= 'w-full h-10 md:h-12 bg-[#005db8] text-white rounded-xl hover:bg-[#005cb8e2] drop-shadow-xl'
							onClick={handleSendMessage}
						>Send</button>
					</div>
				</div>

				<div className='w-full md:w-[50%] md:h-full md:p-2 md:ps-4'>
					<div className='w-full h-12 p-3 bg-[#005DB8] text-white text-xl font-medium'>Sent items</div>
					<BroadcastMessageTable 
						setselectedMessageId={setselectedMessageId}
						setViewBroadcastMessage={setViewBroadcastMessage}	
						viewBroadcastMessage={viewBroadcastMessage}
						sendMessageToggle={sendMessageToggle}
					/>
				</div>
               
				
       		</div>

			
			{
				viewBroadcastMessage && 
					<ViewBroadcastMessage 
						selectedMessageId={selectedMessageId} 
						setViewBroadcastMessage={setViewBroadcastMessage} 
					/>
			}  
        
    	</div>
    
  	)
}

export default Broadcast