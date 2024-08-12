
// "use client";
 
// import React from 'react';
// import axios from 'axios';
 
 
 
// function MahadhanamTable({ data, filterState }) {
//     return (
//         <table className="table">
//             <thead className="bg-[#5799FD] text-white sticky top-0 text-[0.9rem]">
//                 <tr>
//                     <th className="text-center">DOJ</th>
//                     <th className="text-center">Name</th>
//                     <th className="text-center">Id</th>
//                     <th className="text-center">Coupons</th>
//                     <th className="text-center">Phone</th>
//                     <th className="text-center">Email</th>
//                     <th className="text-center">Status</th>
//                     <th className="text-center">Ban</th>
//                     <th className="text-center">Submit</th>
//                     <th className="text-center">
//                         <label>
//                             <input
//                                 className="w-4 h-4 checkbox checkbox-md bg-white text-2xl focus:outline-none text-[#34d399] border-none shadow-none px-[0.7rem] py-[0.7rem] focus:ring-0 "
//                                 type="checkbox"
//                                 onChange={ function (e) {
//                                         console.log(e.target.checked)
//                                         if (e.target.checked) {
//                                             const UIds = filterState.meditatorsData.map(function (i) {
//                                                 return i.UId
//                                             })
//                                             filterState.setDistributedList(UIds)
//                                             filterState.setSelectAll(true);
//                                             // console.log(UIds);
//                                         } else {
//                                             filterState.setSelectAll(false)
//                                         }
//                                     }
 
//                                 }
//                             />
//                         </label>
//                     </th>
//                 </tr>
//             </thead>
 
//             <tbody className="">
//                 {
//                     filterState.meditatorsData[0] ? (
//                         filterState.meditatorsData.map((i, index) => {
//                             return (
//                                 <tr
//                                     key={index}
//                                     className="font-medium text-xs bg-white text-black"
//                                 >
     
//                                     <td className="text-center">{ i.DOJ }</td>
//                                     <td 
//                                         className="text-center text-indigo-600 hover:text-indigo-800 hover:scale-105 cursor-pointer"
//                                         onClick={() => {
//                                             filterState.setRefPopData(i.UId, true);
//                                         }}
//                                     >
//                                         { i.firstName } { i.secondName }
//                                     </td>
//                                     <td className="text-center">{ i.UId } </td>
//                                     <td className="text-center">{ i.coupons } </td>
//                                     <td className="text-center">{ i.phone } </td>
//                                     <td className="text-center">{ i.email }</td>
//                                     <td className="text-center">{ i.user_Status }</td>
//                                     <td className="text-center">
//                                         <button 
//                                             className="w-5 h-5" 
//                                             onClick={() => {
//                                                 (async function() {
//                                                     const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/closeuser`, {
//                                                         id: i.UId
//                                                     });
     
//                                                     filterState.setBanToggle(!filterState.banToggle)
//                                                 })()
//                                             }} 
//                                             disabled={ i.ban === true }
//                                         >
//                                             <img src="/admin/ban.png" className={`${i.ban === true ? "mahadhanam-ban" : ""}`}/>
//                                         </button>
//                                     </td>
     
//                                     <td className="text-center">
//                                         <button className="w-20 h-7 px-3 py-1 bg-[#40A2D8] text-white rounded">
//                                             Submit
//                                         </button>
//                                     </td>
     
//                                     <td className="text-center">
//                                         <label>
//                                             <input
//                                                 type="checkbox"
//                                                 className={filterState.selectAll ? `w-4 h-4 checkbox checkbox-md text-2xl outline-none  focus:outline-none text-[#34d399] border-none shadow-none focus:ring-0 bg-gray-800 opacity-20` : `w-4 h-4 checkbox checkbox-md text-2xl outline-none  focus:outline-none text-[#34d399] border-none shadow-none px-[0.7rem] py-[0.7rem] focus:ring-0 bg-gray-500`}
//                                                 disabled={filterState.selectAll}
//                                                 onClick = {(e) => {
//                                                     if(e.target.checked) {
//                                                         filterState.setDistributedList(i.UId)
//                                                         // console.log(filterState.distributedList);
//                                                     } else {
//                                                         filterState.setRemoveIdFromDistList(i.UId)
//                                                     }
//                                                 }}
//                                             />
//                                         </label>
//                                     </td>
//                                 </tr>
//                             );
//                         })
//                     ) : (
//                         <tr>
//                             <td>No results found</td>
//                         </tr>
//                     )
//                 }
//             </tbody>
 
//         </table>
//     )
// }
 
// export default MahadhanamTable


"use client";
 
import React from 'react';
import axios from 'axios';
 
 
 
function MahadhanamTable({ data, filterState }) {
    return (
        <table className="table">
            <thead className="bg-[#5799FD] text-white sticky top-0 z-50 text-[0.9rem]">
                <tr>
                    <th className="text-center">DOJ</th>
                    <th className="text-center">Name</th>
                    <th className="text-center">Id</th>
                    <th className="text-center">Coupons</th>
                    <th className="text-center">Phone</th>
                    <th className="text-center">Email</th>
                    <th className="text-center">Status</th>
                    {/* <th className="text-center">Ban</th> */}
 
                    <th className="text-center">
                        <label>
                            <input
                                className="w-4 h-4 checkbox checkbox-md bg-white text-2xl focus:outline-none text-[#34d399] border-none shadow-none px-[0.7rem] py-[0.7rem] focus:ring-0 checkbox-accent"
                                type="checkbox"
                                onChange={ function (e) {
                                        console.log(e.target.checked)
                                        if (e.target.checked) {
                                            const UIds = filterState.meditatorsData.map(function (i) {
                                                return i.UId
                                            })
                                            filterState.setDistributedList(UIds)
                                            filterState.setSelectAll(true);
                                            // console.log(UIds);
                                        } else {
                                            filterState.setSelectAll(false)
                                        }
                                    }
 
                                }
                            />
                        </label>
                    </th>
                </tr>
            </thead>
 
            <tbody className="">
                {
                    filterState.meditatorsData[0] ? (
                        filterState.meditatorsData.map((i, index) => {
                            return (
                                <tr
                                    key={index}
                                    className="font-medium text-xs bg-white text-black border-b-[1px] border-[#eeeeee]"
                                >
 
                                    <td className="text-center">{ i.DOJ }</td>
                                    <td 
                                        className="text-center text-indigo-600 hover:text-indigo-800 hover:scale-105 cursor-pointer"
                                        onClick={() => {
                                            filterState.setRefPopData(i.UserId, true);
                                        }}
                                    >
                                        { i.firstName } { i.secondName }
                                    </td>
                                    <td className="text-center">{ i.UId } </td>
                                    <td className="text-center">{ i.coupons } </td>
                                    <td className="text-center">{ i.phone } </td>
                                    <td className="text-center">{ i.email }</td>
                                    {/* <td className={i.ban === true || i.ban === 1 ? "text-center text-red-600" : "text-center text-green-600"}>{ i.ban === true  ? "Banned" : "Active" }</td> */}
                                    <td className={(i.user_Status === "BANNED" || i.user_Status === "DELETED") ? "text-center text-red-600" : "text-center text-green-600"}>
                                            {i.user_Status === "BANNED" && "Banned"}
                                            {i.user_Status === "DELETED" && "Deleted"}
                                            {(i.user_Status === "ACTIVE" || i.user_Status === null) && "Active"}
                                    </td>
                                    
                                    {/* <td className="text-center">
                                        <button 
                                            className="w-5 h-5" 
                                            onClick={() => {
                                                (async function() {
                                                    try{
                                                    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/closeuser`, {
                                                        UserId: i.UserId
                                                    });
 
                                                    filterState.setBanToggle(!filterState.banToggle)
                                                }
                                                catch(err){
                                        console.log(err);
                                                    filterState.setToastData(true,err.response.data.message)
                                                }
                                                })()
                                            }} 
                                            disabled={ i.ban === true || i.ban === 1 }
                                        >
                                            <img src="/admin/ban.png" className={`${i.ban === true || i.ban === 1 ? "mahadhanam-ban" : ""}`}/>
                                        </button>
                                    </td> */}
 
                                    <td className="text-center">
                                        <label>
                                            <input
                                                type="checkbox"
                                                className={filterState.selectAll ? `w-4 h-4 checkbox checkbox-md text-2xl outline-none  focus:outline-none text-[#34d399] border-none shadow-none focus:ring-0 bg-gray-800 opacity-20 checkbox-accent` : `w-4 checkbox-accent h-4 checkbox checkbox-md text-2xl outline-none  focus:outline-none text-[#34d399] border-none shadow-none px-[0.7rem] py-[0.7rem] focus:ring-0 bg-gray-500`}
                                                disabled={filterState.selectAll || i.user_Status === "DELETED" || i.user_Status === "BANNED"}
                                                onClick = {(e) => {
                                                    if(e.target.checked) {
                                                        filterState.setDistributedList(i.UId)
                                                        // console.log(filterState.distributedList);
                                                    } else {
                                                        filterState.setRemoveIdFromDistList(i.UId)
                                                    }
                                                }}
                                            />
                                        </label>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td>No results found</td>
                        </tr>
                    )
                }
            </tbody>
 
        </table>
    )
}
 
export default MahadhanamTable