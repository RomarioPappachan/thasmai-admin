// "use client"
// import React, { useState, useEffect } from 'react'
// import axios from "axios";


// function ExpenseDetail(props) {

//     const [data, setData] = useState({});

//     useEffect(() => {
//         const fetchData = async () => {
          
//             try {
//                 const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/get-expensebyid/${ props.selectedId }`)
//                 console.log(response);
//                 setData(response.data.user);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };
    
//         fetchData();
//     }, []);


//     return (
//         <div className="w-screen min-h-screen p-5 flex flex-col justify-center items-center absolute top-0 left-0 bg-[#000000d2] backdrop-blur-[1px] overflow-scroll">
//             <button
//                 className="w-8 h-8 m-0 p-0 absolute top-6 right-6 hover:scale-110 text-5xl text-white rotate-45"
//                 onClick={() => {
//                     props.setIsViewDetail(false);
//                 }}
//             >+</button>
            

//             <div className='w-full md:h-[85%] flex justify-center items-center'>
//                 <img 
//                     className="w-full md:max-w-[85%] object-cover border-2 border-white"
//                     src={data.invoiceUrl} alt="Invoice Image" 
//                 />
//             </div>

//             <div className="w-full p-5 flex justify-center items-center text-white">
//                 <p className="w-full h-full text-center font-bold">
//                     { data.Expense_Date }, { data.expenseType }, ₹ { data.amount }, <span className="font-light">{ data.description }</span>
//                 </p>
//             </div>
            
//         </div>
//     )
// }

// export default ExpenseDetail





"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ExpenseDetail({ selectedId, setIsViewDetail }) {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/get-expensebyid/${selectedId}`);
                console.log(response);
                setData(response.data.expense || {}); // Ensure to set data correctly from the response
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [selectedId]);

    return (
        <div className="w-screen min-h-screen p-5 flex flex-col justify-center items-center absolute top-0 left-0 bg-[#000000d2] backdrop-blur-[1px] overflow-scroll">
            <button
                className="w-8 h-8 m-0 p-0 absolute top-6 right-6 hover:scale-110 text-5xl text-white rotate-45"
                onClick={() => {
                    setIsViewDetail(false);
                }}
            >
                +
            </button>

            <div className='w-full md:h-[85%] flex justify-center items-center'>
                {Array.isArray(data.invoiceUrl) && data.invoiceUrl.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                        {data.invoiceUrl.map((url, index) => (
                            <img
                                key={index}
                                className="w-full object-cover border-2 border-white"
                                src={url}
                                alt={`Invoice ${index + 1}`}
                            />
                        ))}
                    </div>
                ) : (
                    <p>No invoice images available</p>
                )}
            </div>

            <div className="w-full p-5 flex justify-center items-center text-white">
                <p className="w-full h-full text-center font-bold">
                    {data.Expense_Date}, {data.expenseType}, ₹ {data.amount}, <span className="font-light">{data.description}</span>
                </p>
            </div>
        </div>
    );
}

export default ExpenseDetail;
