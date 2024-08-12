"use client"
import { usePathname } from 'next/navigation'
import Link from "next/link"

function NavLink() {
    const pathname = usePathname()

  return (
    <nav className='w-full h-full flex items-center'>

      <Link href = '/operator/operator-creation' className={`${pathname === '/operator/operator-creation' ? 'link px-5 py-1 bg-[#005DB8] text-white font-semibold rounded-lg' : 'link rounded-md px-5 py-1 bg-[#e0e2ec] text-black font-semibold'}`}>Operator Creation</Link>
      {/* <Link href = '/operator/appointments' className={`${pathname === '/operator/appointments' ? 'link px-5 py-1 bg-[#005DB8] text-white font-semibold rounded-lg' : 'link rounded-md px-5 py-1 bg-[#e0e2ec] text-black font-semibold'}`}>Appointments</Link> */}
      {/* <Link href = '/operator/gurujiAvailability' className={`${pathname === '/operator/gurujiAvailability' ? 'link px-5 py-1 bg-[#005DB8] text-white font-semibold rounded-lg' : 'link rounded-md px-5 py-1 bg-[#e0e2ec] text-black font-semibold'}`}>Add Guruji's Availability</Link> */}
       
    </nav>
  )
}

export default NavLink