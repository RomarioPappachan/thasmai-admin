"use client"
import React , {useState, useEffect} from 'react'
import axios from 'axios';

function BroadcastMessageTable(props) {

    const [broadcastMessages, setBroadcastMessages] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
    	const fetchData = async () => {
      		try {
          		const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/payment/get-notification`, {
                    page : pageNo 
                });
                    console.log(response);
                    setBroadcastMessages(response.data.notifications);
					setTotalPages(response.data.totalpages);
					
      		} catch (error) {
        		console.error('Error fetching data:', error);
      		}
    	};

    	fetchData();
  	}, [pageNo, props.sendMessageToggle]);


    function handlePreviousPage() {
    	if(pageNo <= 1) {
        	return;
    	} else {
        	setPageNo(prevValue => prevValue - 1);
    	}
	};

	function handleNextPage() {
    	if(pageNo >= totalPages ) {
        	return;
    	} else {
        	setPageNo(prevValue => prevValue + 1);
    	}
	};

    return (

        
        <div className='w-full h-[90%]'>
            <div className='w-full h-[90%] overflow-scroll'>
                <table className='w-full text-black'>
                    <thead className='w-full sticky top-0'>
                        <tr className='h-12 text-left text-[14px] md:text-sm bg-[#005DB8] text-white'>
                            <th className='ps-2'>Date</th>
                            <th className='ps-2'>Message</th>
                            <th className='ps-2 text-center'>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            broadcastMessages.map((i, index) => {
                                return (
                                    <tr className='h-12 text-[12px] md:text-xs text-black border-[#E0E2EC] border-b-2' key={index}>
                                        <td className='ps-2'>{i.Date}</td>
                                        <td className='ps-2'>{i.title}</td>
                                        <td className='ps-2 text-center'>
                                            <button
                                                className='py-1 px-4 bg-[#AAC7FF] text-[#002F64] rounded-xl hover:scale-110'
                                                onClick={() => {
                                                    props.setViewBroadcastMessage(true);
                                                    props.setselectedMessageId(i.id);
                                                }}
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>

            <div className="w-full h-[10%] px-2 flex justify-between items-center">
            	<div>
                    <p className="text-sm text-gray-500">Page { pageNo } of { totalPages }</p>
                </div>
            			
            	<div>
            	  <button
            	    className="w-20 md:w-28 h-9 text-sm bg-[#005DB8] text-white rounded-xl"
            	    onClick={ handlePreviousPage }
            	  >Previous</button>
            	  <button
            	    className="w-20 md:w-28 h-9 ms-5 text-sm bg-[#005DB8] text-white rounded-xl"
            	    onClick={ handleNextPage }
            	  >Next</button>
            	</div>
            			 

          	</div>
        </div>


    )
}

export default BroadcastMessageTable