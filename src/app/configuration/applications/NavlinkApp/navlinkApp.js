"use client"
import { usePathname } from 'next/navigation'
import Link from "next/link"

function NavLinkApp() {
    const pathname = usePathname()

  return (
    <nav className='w-full mt-2 ms-10 flex'>
        <Link href = '/configuration/applications/reference' className={`${pathname === '/configuration/applications/reference' ? 'link ms-3  px-5 py-1 bg-[#005DB8] text-white text-[14px] font-normal rounded-lg' : 'link rounded-md ms-3  px-5 py-1 bg-[#e0e2ec] text-black  text-[14px] font-normal hover:scale-105'}`}>Reference</Link>
        <Link href = '/configuration/applications/meditationTime' className={`${pathname === '/configuration/applications/meditationTime' ? 'link ms-3  px-5 py-1 bg-[#005DB8] text-white text-[14px] font-normal rounded-lg' : 'link rounded-md ms-3  px-5 py-1 bg-[#e0e2ec] text-black  text-[14px] font-normal hover:scale-105'}`}>Meditation Time</Link>
        <Link href = '/configuration/applications/zoomMeet' className={`${pathname === '/configuration/applications/zoomMeet' ? 'link ms-3  px-5 py-1 bg-[#005DB8] text-white text-[14px] font-normal rounded-lg' : 'link rounded-md ms-3  px-5 py-1 bg-[#e0e2ec] text-black  text-[14px] font-normal hover:scale-105'}`}>Zoom Meet</Link>
        
    </nav>
  )
}

export default NavLinkApp