"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoMdSend } from "react-icons/io";
import NavLink from '../navlink/navlink';
import { toast } from 'react-hot-toast';
import { useNavbarTextStore } from '../../state/navbar-state';

function GurujiMessage() {

    const [messages, setMessages] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [gurujiMessage, setGurujiMessage] = useState("");
    const [renderMessageToggle, setRenderMessageToggle] = useState(false);
    const [isBtnDisabled, setIsBtnDiasabled] = useState(false);

    
    // console.log(pageNo);

    const setNavbarText = useNavbarTextStore((state) => state.setNavbarText);
	setNavbarText("Messages");

    useEffect(() => {
        const fetchData = async () => {
          
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/gurujimessage`, {
                    page: pageNo
                });
                setMessages(response.data.messages);
                setTotalPages(response.data.totalPages)
                console.log(response.data); 
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, [pageNo, renderMessageToggle]);


    function handleNextPage() {
        if(pageNo <= 1) {
            return;
        } else {
            setPageNo(pageNo - 1);
        }
    };
    
    function handlePreviousPage() {
        if(pageNo >= totalPages ) {
            return;
        } else {
            setPageNo(pageNo + 1);
        }
    };

    async function handleGurujiMessage() {

        setIsBtnDiasabled(true);

        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString('en-US', {
            month: 'long',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });

        // console.log(formattedDate);
        if(gurujiMessage) {
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/admin-messages`, {
                    message: gurujiMessage,
                    messageTime: formattedDate,
                    isAdminMessage: true
                });
                console.log(response);
                setGurujiMessage("");
                // alert(response.data.message);
                setPageNo(1);
                setRenderMessageToggle(!renderMessageToggle);
                toast.success("Message send successfully.");

                setTimeout(() => {
                    setIsBtnDiasabled(false);
                }, 1000);

            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error("Error while sending message.");
                setIsBtnDiasabled(false);
            }
        } else {
            toast("Message field is empty!");
            setIsBtnDiasabled(false);
        }    
    };


    return (
        <div className="w-full h-[85vh] px-7 overflow-y-auto">
            <div className="w-full sticky top-0">
                <NavLink />
            </div>
            <div className='w-full h-[90%] mt-2 p-4 bg-white rounded shadow drop-shadow-md'>
            
                <div className='w-full h-[70%] p-2 px-10 flex flex-col-reverse rounded-md overflow-y-scroll bg-gradient-to-r from-[#d5ccc7] to-[#a5e1e2]'>
                    {
                        messages[0] && 
                        messages.map((i, index) => {
                            return (
                                i.isAdminMessage && 
                                    <div className="chat chat-end mb-2" key={index}>
                                        {/* <div className="chat-image avatar">
                                            <div className="w-10 rounded-full">
                                                <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                            </div>
                                        </div> */}
                                        {/* <div className="chat-header">
                                            Thasmai Guruji
                                            <time className="text-xs opacity-50">12:46</time>
                                        </div> */}
                                        <div className="chat-bubble bg-white text-black">{ i.message }</div>
                                        <div className="chat-footer">
                                            <time className="text-xs opacity-75 text-black">{ i.messageTime }</time>
                                        </div>
                                    </div>               
                            );
                        })
                    }
                </div>

                    {/*-------------------- Guruji messsage input field ----------------------*/}

                <div className='w-full h-[30%]  py-4 bg-white'>
                    <div className='flex'>
                        <div className='w-[70%]'></div>
                            <div className=' w-[30%] flex justify-between items-center'>
                                <div>Page {pageNo} of {totalPages}
                            </div>
                            <button 
                                className='w-[110px] h-12 rounded-xl bg-[#AAC7FF] text-black hover:bg-[#aac6ff92]'
                                onClick={handlePreviousPage}
                            >Previous</button>
                            <button 
                                className='w-[110px] h-12 rounded-xl bg-[#AAC7FF] text-black hover:bg-[#aac6ff92]'
                                onClick={handleNextPage}
                            >Next</button>
                        </div>
                    </div>
                    <div className='flex pt-10'>
                        <input 
                            text="text" 
                            className='w-[90%] h-11 me-2 p-2 bg-[#D6E3FF] text-black rounded-xl shadow drop-shadow-md outline-none placeholder:ps-2'
                            placeholder='Message...'
                            value={ gurujiMessage }
                            onChange={(e) => {
                                const val = e.target.value;
                                setGurujiMessage(val);
                            }}
                            onKeyDown={(e) => {
                                if(e.key === "Enter") {
                                    handleGurujiMessage();
                                }
                            }}
                        />
                        <button 
                            className={isBtnDisabled ? 'w-[100px] h-11 bg-[#8e908ede] text-sm text-[#b4b8b4e1] rounded-2xl  flex items-center justify-center': 'w-[100px] h-11 bg-[#005DB8] text-sm rounded-2xl text-white flex items-center justify-center hover:bg-[#005cb8e4]'}
                            onClick={() => {
                                handleGurujiMessage();
                            }}
                            disabled={ isBtnDisabled }
                        >
                            <IoMdSend className='text-2xl me-2'/>
                            Send
                        </button>
 
                    </div>
                
                </div>
            
            </div>
        </div>
    );
}

export default GurujiMessage