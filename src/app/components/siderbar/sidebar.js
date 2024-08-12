
// "use client"

// import { useLoginStore } from "@/app/loginstate/loginState";
// import Link from "next/link";
// import { usePathname,useRouter } from 'next/navigation';
// import { useEffect, useState } from "react";

// function SideBar() {
//   const [role, setRole] = useState('');
//   const pathname = usePathname();
//   const router = useRouter()
//   useEffect(() => {
//     setRole('')
//     let role_text = localStorage.getItem('userdata');
//     console.log("Role from local storage:", role_text); // Log the role_text to check if it's retrieved correctly
//     if (role_text) {
//       const parsedRole = JSON.parse(role_text).role; // Parse the role from the stored userdata
//       console.log("Parsed role:", parsedRole); // Log the parsed role to check its value
//       setRole(parsedRole); // Set the role state
//     }
//   }, []); 

//   // console.log("Current role:", role); // Log the current role state

//   return (
//     <div>
//       <div className="bg-white h-screen flex flex-col items-center md:py-8 p-0">
//         <div className="logo md:px-5 p-0  sticky top-1 bg-white">
//           <img src="/admin/logo.png" className="h-16" />
//         </div>
//         <div className="navitems w-full overflow-y-auto">

//           <ul className="sidebar ">
//             {role === 'admin' && (
//               <>
//                 <Link href="/overview">
//                   <li className={`${pathname.startsWith('/overview') ? ' bg-[#005DB8] text-white py-2 px-5 ' : 'py-2 px-5 text-black hover:bg-[#dbeafe]'}`}>Overview</li>
//                 </Link>
//                 <Link href="/users/meditatorlist">
//                   <li className={`${pathname.startsWith('/users') ? ' bg-[#005DB8] text-white py-2 px-5' : 'py-2 px-5 text-black  hover:bg-[#dbeafe]'}`}>Users</li>
//                 </Link>
//                 <Link href="/financial/distribution">
//                   <li className={`${pathname.startsWith('/financial') ? ' bg-[#005DB8] text-white py-2 px-5' : 'py-2 px-5 text-black hover:bg-[#dbeafe]'}`}>Financial</li>
//                 </Link>
//                 <Link href="/appointments/appointments">
//                   <li className={`${pathname.startsWith('/appointments') ? ' bg-[#005DB8] text-white py-2 px-5' : 'py-2 px-5 text-black hover:bg-[#dbeafe]'}`}>Appointments</li>
//                 </Link>
//                 <Link href="/feedback/appointmentFeedback">
//                   <li className={`${pathname.startsWith('/feedback') ? ' bg-[#005DB8] text-white py-2 px-5' : 'py-2 px-5 text-black hover:bg-[#dbeafe]'}`}>Feedback Views</li>
//                 </Link>
//                 <Link href="/message/globalMessage">
//                   <li className={`${pathname.startsWith('/message') ? ' bg-[#005DB8] text-white py-2 px-5' : 'py-2 px-5 text-black hover:bg-[#dbeafe]'}`}>Message</li>
//                 </Link>
//                 <Link href="/notifications/notifications">
//                   <li className={`${pathname.startsWith('/notifications') ? ' bg-[#005DB8] text-white py-2 px-5' : 'py-2 px-5 text-black hover:bg-[#dbeafe]'}`}>Notifications / Broadcast</li>
//                 </Link>
                
//                 <Link href="/events/events">
//                   <li className={`${pathname.startsWith('/events') ? ' bg-[#005DB8] text-white py-2 px-5' : 'py-2 px-5 text-black hover:bg-[#dbeafe]'}`}>Events / Blogs</li>
//                 </Link>

//                 <Link href="/videos">
//                   <li className={`${pathname.startsWith('/videos') ? ' bg-[#005DB8] text-white py-2 px-5' : 'py-2 px-5 text-black hover:bg-[#dbeafe]'}`}>Videos</li>
//                 </Link>
//                 {/* <Link href="/analytics">
//                   <li className={`${pathname.startsWith('/analytics') ? ' bg-[#005DB8] text-white py-3 px-5' : 'py-3 px-5 text-black hover:bg-[#dbeafe]'}`}>Analytics / Insights</li>
//                 </Link> */}
//                 <Link href="/expenses/add-expense">
//                   <li className={`${pathname.startsWith('/expenses') ? ' bg-[#005DB8] text-white py-2 px-5' : 'py-2 px-5 text-black hover:bg-[#dbeafe]'}`}>Financial / Expense</li>
//                 </Link>
//                 <Link href="/operator/operator-creation">
//                   <li className={`${pathname.startsWith('/operator') ? ' bg-[#005DB8] text-white py-2 px-5' : 'py-2 px-5 text-black hover:bg-[#dbeafe]'}`}>Operator Management</li>
//                 </Link>
//                 <Link href="/configuration/financial">
//                   <li className={`${pathname.startsWith('/configuration') ? ' bg-[#005DB8] text-white py-2 px-5' : 'py-2 px-5 text-black hover:bg-[#dbeafe]'}`}>Configuration Parameters</li>
//                 </Link>
//                 {/* <Link href="/logging">
//                   <li className={`${pathname.startsWith('/logging') ? ' bg-[#005DB8] text-white py-2 px-5' : 'py-2 px-5 text-black hover:bg-[#dbeafe]'}`}>Logging / Error Handling</li>
//                 </Link> */}
//                 <Link href="/support">
//                   <li className={`${pathname.startsWith('/support') ? ' bg-[#005DB8] text-white py-2 px-5' : 'py-2 px-5 text-black hover:bg-[#dbeafe]'}`}>Support & Contact</li>
//                 </Link>
                
//               </>
//             ) }

//                 {
//                 (role === 'operator' || role === "Operator") && (
            
//               <>
//               <Link href="/overview">
//                   <li className={`${pathname.startsWith('/overview') ? ' bg-[#005DB8] text-white py-3 px-5 ' : 'py-3 px-5 text-black hover:bg-[#dbeafe]'}`}>Overview</li>
//                 </Link>
//               <Link href="/appointments/appointments">
//                   <li className={`${pathname.startsWith('/appointments') ? ' bg-[#005DB8] text-white py-3 px-5' : 'py-3 px-5 text-black hover:bg-[#dbeafe]'}`}>Appointments</li>
//               </Link>
//               <Link href="/feedback/appointmentFeedback">
//                 <li className={`${pathname.startsWith('/feedback') ? ' bg-[#005DB8] text-white py-3 px-5' : 'py-3 px-5 text-black hover:bg-[#dbeafe]'}`}>Feedback Views</li>
//               </Link>
//               <Link href="/notifications/notifications">
//                   <li className={`${pathname.startsWith('/notifications') ? ' bg-[#005DB8] text-white py-3 px-5' : 'py-3 px-5 text-black hover:bg-[#dbeafe]'}`}>Notifications / Broadcast</li>
//                 </Link>
//               <Link href="/events/events">
//                   <li className={`${pathname.startsWith('/events') ? ' bg-[#005DB8] text-white py-3 px-5' : 'py-3 px-5 text-black hover:bg-[#dbeafe]'}`}>Events</li>
//               </Link>
//               <Link href="/expenses/add-expense">
//                   <li className={`${pathname.startsWith('/expenses') ? ' bg-[#005DB8] text-white py-3 px-5' : 'py-3 px-5 text-black hover:bg-[#dbeafe]'}`}>Financial / Expense</li>
//               </Link>
//               <Link href="/support">
//                   <li className={`${pathname.startsWith('/support') ? ' bg-[#005DB8] text-white py-3 px-5' : 'py-3 px-5 text-black hover:bg-[#dbeafe]'}`}>Support & Contact</li>
//               </Link>
              
              
//               {/* <Link href="/message/test-global">
//                   <li className={`${pathname.startsWith('/message') ? ' bg-[#005DB8] text-white py-3 px-5' : 'py-3 px-5 text-black hover:bg-[#dbeafe]'}`}>Message</li>
//               </Link> */}
              
               
              
//             </>
//             )}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SideBar;






"use client"

import { useLoginStore } from "@/app/loginstate/loginState";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

function SideBar() {
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true); // State for loading
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setRole('');
    let role_text = localStorage.getItem('userdata');
    console.log("Role from local storage:", role_text); // Log the role_text to check if it's retrieved correctly
    if (role_text) {
      const parsedRole = JSON.parse(role_text).role; // Parse the role from the stored userdata
      console.log("Parsed role:", parsedRole); // Log the parsed role to check its value
      setRole(parsedRole); // Set the role state
    }
    setLoading(false); // Set loading to false after fetching the role
  }, []);

  // console.log("Current role:", role); // Log the current role state

  return (
    <div>
      <div className="bg-white h-screen flex flex-col items-center md:py-8 p-0">
        <div className="logo md:px-5 p-0 sticky top-1 bg-white">
          <img src="/admin/logo.png" className="h-16" />
        </div>
        <div className="navitems w-full overflow-y-auto">
          {loading ? (
            <ul className="sidebar animate-pulse px-6 pt-5">
              {Array.from({ length: 10 }).map((_, index) => (
                <li key={index} className="h-10 py-2 px-5 bg-gray-200 mb-2"></li>
              ))}
            </ul>
          ) : (
            <ul className="sidebar">
              {role === 'admin' && (
                <>
                  <Link href="/overview">
                    <li className={`${pathname.startsWith('/overview') ? ' bg-[#005DB8] text-white py-2 px-5 ' : 'py-2 px-5 text-black hover:bg-[#dbeafe]'}`}>Overview</li>
                  </Link>
                  <Link href="/users/meditatorlist">
                    <li className={`${pathname.startsWith('/users') ? ' bg-[#005DB8] text-white py-2 px-5' : 'py-2 px-5 text-black hover:bg-[#dbeafe]'}`}>Users</li>
                  </Link>
                  <Link href="/financial/distribution">
                    <li className={`${pathname.startsWith('/financial') ? ' bg-[#005DB8] text-white py-2 px-5' : 'py-2 px-5 text-black hover:bg-[#dbeafe]'}`}>Financial</li>
                  </Link>
                  <Link href="/appointments/appointments">
                    <li className={`${pathname.startsWith('/appointments') ? ' bg-[#005DB8] text-white py-2 px-5' : 'py-2 px-5 text-black hover:bg-[#dbeafe]'}`}>Appointments</li>
                  </Link>
                  <Link href="/feedback/appointmentFeedback">
                    <li className={`${pathname.startsWith('/feedback') ? ' bg-[#005DB8] text-white py-2 px-5' : 'py-2 px-5 text-black hover:bg-[#dbeafe]'}`}>Feedback Views</li>
                  </Link>
                  <Link href="/message/globalMessage">
                    <li className={`${pathname.startsWith('/message') ? ' bg-[#005DB8] text-white py-2 px-5' : 'py-2 px-5 text-black hover:bg-[#dbeafe]'}`}>Message</li>
                  </Link>
                  <Link href="/notifications/notifications">
                    <li className={`${pathname.startsWith('/notifications') ? ' bg-[#005DB8] text-white py-2 px-5' : 'py-2 px-5 text-black hover:bg-[#dbeafe]'}`}>Notifications / Broadcast</li>
                  </Link>
                  <Link href="/events/events">
                    <li className={`${pathname.startsWith('/events') ? ' bg-[#005DB8] text-white py-2 px-5' : 'py-2 px-5 text-black hover:bg-[#dbeafe]'}`}>Events / Blogs</li>
                  </Link>
                  <Link href="/videos">
                    <li className={`${pathname.startsWith('/videos') ? ' bg-[#005DB8] text-white py-2 px-5' : 'py-2 px-5 text-black hover:bg-[#dbeafe]'}`}>Videos</li>
                  </Link>
                  <Link href="/expenses/add-expense">
                    <li className={`${pathname.startsWith('/expenses') ? ' bg-[#005DB8] text-white py-2 px-5' : 'py-2 px-5 text-black hover:bg-[#dbeafe]'}`}>Financial / Expense</li>
                  </Link>
                  <Link href="/operator/operator-creation">
                    <li className={`${pathname.startsWith('/operator') ? ' bg-[#005DB8] text-white py-2 px-5' : 'py-2 px-5 text-black hover:bg-[#dbeafe]'}`}>Operator Management</li>
                  </Link>
                  <Link href="/configuration/financial">
                    <li className={`${pathname.startsWith('/configuration') ? ' bg-[#005DB8] text-white py-2 px-5' : 'py-2 px-5 text-black hover:bg-[#dbeafe]'}`}>Configuration Parameters</li>
                  </Link>
                  <Link href="/support">
                    <li className={`${pathname.startsWith('/support') ? ' bg-[#005DB8] text-white py-2 px-5' : 'py-2 px-5 text-black hover:bg-[#dbeafe]'}`}>Support & Contact</li>
                  </Link>
                </>
              )}
              {(role === 'operator' || role === "Operator") && (
                <>
                  <Link href="/overview">
                    <li className={`${pathname.startsWith('/overview') ? ' bg-[#005DB8] text-white py-3 px-5 ' : 'py-3 px-5 text-black hover:bg-[#dbeafe]'}`}>Overview</li>
                  </Link>
                  <Link href="/appointments/appointments">
                    <li className={`${pathname.startsWith('/appointments') ? ' bg-[#005DB8] text-white py-3 px-5' : 'py-3 px-5 text-black hover:bg-[#dbeafe]'}`}>Appointments</li>
                  </Link>
                  <Link href="/feedback/appointmentFeedback">
                    <li className={`${pathname.startsWith('/feedback') ? ' bg-[#005DB8] text-white py-3 px-5' : 'py-3 px-5 text-black hover:bg-[#dbeafe]'}`}>Feedback Views</li>
                  </Link>
                  <Link href="/notifications/notifications">
                    <li className={`${pathname.startsWith('/notifications') ? ' bg-[#005DB8] text-white py-3 px-5' : 'py-3 px-5 text-black hover:bg-[#dbeafe]'}`}>Notifications / Broadcast</li>
                  </Link>
                  <Link href="/events/events">
                    <li className={`${pathname.startsWith('/events') ? ' bg-[#005DB8] text-white py-3 px-5' : 'py-3 px-5 text-black hover:bg-[#dbeafe]'}`}>Events</li>
                  </Link>
                  <Link href="/expenses/add-expense">
                    <li className={`${pathname.startsWith('/expenses') ? ' bg-[#005DB8] text-white py-3 px-5' : 'py-3 px-5 text-black hover:bg-[#dbeafe]'}`}>Financial / Expense</li>
                  </Link>
                  <Link href="/support">
                    <li className={`${pathname.startsWith('/support') ? ' bg-[#005DB8] text-white py-3 px-5' : 'py-3 px-5 text-black hover:bg-[#dbeafe]'}`}>Support & Contact</li>
                  </Link>
                </>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
