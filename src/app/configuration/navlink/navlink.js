"use client"
import { usePathname } from 'next/navigation'
import Link from "next/link"

function NavLink() {
    const pathname = usePathname()

  return (
    <nav className='w-full h-full flex items-center'>

    <Link href = '/configuration/financial' className={`${pathname === '/configuration/financial' ? 'link px-5 py-1 bg-[#005DB8] text-white font-semibold rounded-lg' : 'link rounded-md px-5 py-1 bg-[#e0e2ec] text-black font-semibold hover:scale-105'}`}>Financial</Link>
    <Link href = '/configuration/registration'className={`${pathname === '/configuration/registration' ? 'link ms-3 px-5 py-1  bg-[#005DB8] text-white font-semibold rounded-lg' : 'link rounded-md ms-3 px-5 py-1 bg-[#e0e2ec] text-black font-semibold hover:scale-105'}`}>Registration</Link>
    <Link href = '/configuration/applications/reference' className={`${pathname.startsWith('/configuration/applications') ? 'link ms-3 px-5 py-1  bg-[#005DB8] text-white font-semibold rounded-lg' : 'link rounded-md ms-3 px-5 py-1 bg-[#e0e2ec] text-black font-semibold hover:scale-105'}`}>Applications</Link>
    {/* <Link href = '/configuration/operations'className={`${pathname === '/configuration/operations' ? 'link ms-3 px-5 py-1  bg-[#005DB8] text-white font-semibold rounded-lg' : 'link rounded-md ms-3 px-5 py-1 bg-[#e0e2ec] text-black font-semibold hover:scale-105'}`}>Operations</Link> */}
    <Link href = '/configuration/support-contact'className={`${pathname === '/configuration/support-contact' ? 'link ms-3 px-5 py-1  bg-[#005DB8] text-white font-semibold rounded-lg' : 'link rounded-md ms-3 px-5 py-1 bg-[#e0e2ec] text-black font-semibold hover:scale-105'}`}>Support & Contact</Link>

    

    </nav>
  )
}

export default NavLink