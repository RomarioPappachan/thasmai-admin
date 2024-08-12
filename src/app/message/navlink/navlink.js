"use client"
import { usePathname } from 'next/navigation'
import Link from "next/link";



function NavLink() {
    const pathname = usePathname()

  	return (
    	<nav className='w-full h-full flex items-center'>

      		<Link href = '/message/globalMessage' className={`${pathname === '/message/globalMessage' ? 'link px-5 py-1 bg-[#005DB8] text-white font-semibold rounded-lg' : 'link rounded-md px-5 py-1 bg-[#e0e2ec] text-black font-semibold hover:scale-105'}`}>Global Messages</Link>
      		<Link href = '/message/gurujiMessage' className={`${pathname === '/message/gurujiMessage' ? 'link ms-3 px-5 py-1  bg-[#005DB8] text-white font-semibold rounded-lg' : 'link rounded-md ms-3 px-5 py-1 bg-[#e0e2ec] text-black font-semibold hover:scale-105'}`}>Guruji Messages</Link>

    
    	</nav>
  	);
}

export default NavLink