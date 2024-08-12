"use client";

import { usePathname } from 'next/navigation'
import Link from "next/link";


function NavLink() {

    const pathname = usePathname();

  

  return (
    <nav className='w-full h-full flex items-center'>

      <Link href = '/waitinglist/waitinglist' className={`${pathname === '/waitinglist/waitinglist' ? 'link px-5 py-1 bg-[#005DB8] text-white font-semibold rounded-lg' : 'link rounded-md px-5 py-1 bg-[#e0e2ec] text-black font-semibold'}`}>Waiting List</Link>
      <Link href = '/waitinglist/paymentlist' className={`${pathname === '/waitinglist/paymentlist' ? 'link ms-3  px-5 py-1 bg-[#005DB8] text-white font-semibold rounded-lg' : 'link rounded-md ms-3  px-5 py-1 bg-[#e0e2ec] text-black font-semibold'}`}>Payment List</Link>
      <Link href = '/waitinglist/newJoinees' className={`${pathname === '/waitinglist/newJoinees' ? 'link ms-3  px-5 py-1 bg-[#005DB8] text-white font-semibold rounded-lg' : 'link rounded-md ms-3  px-5 py-1 bg-[#e0e2ec] text-black font-semibold'}`}>New Joinees</Link>
      <Link href = '/waitinglist/beneficiaries' className={`${pathname === '/waitinglist/beneficiaries' ? 'link ms-3  px-5 py-1 bg-[#005DB8] text-white font-semibold rounded-lg' : 'link rounded-md ms-3  px-5 py-1 bg-[#e0e2ec] text-black font-semibold'}`}>Beneficiaries</Link>

     
      {/* <a href = "/appointments/applications/registration" className={`${pathname.startsWith('/configuration/applications') ? 'link px-5 py-1 bg-[#005DB8] text-white font-semibold rounded-lg' : 'link rounded-md px-5 py-1 text-black font-semibold'}`}>Applications</a> */}
    
    </nav>
  )
}

export default NavLink