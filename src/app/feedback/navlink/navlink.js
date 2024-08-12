"use client"
import { usePathname } from 'next/navigation'
import Link from "next/link"

function NavLink() {
    const pathname = usePathname()

  return (
    <nav className='w-full p-0 flex items-center overflow-x-auto'>


      {/* <Link href = '/feedback/meditationFeedback' className={`${pathname === '/feedback/meditationFeedback' ? 'link px-5 py-1 bg-[#005DB8] text-white font-semibold rounded-lg' : 'link rounded-md px-5 py-1 bg-[#e0e2ec] text-black font-semibold'}`}>Meditation Testimonials</Link> */}
      <Link href = '/feedback/appointmentFeedback' className={`${pathname === '/feedback/appointmentFeedback' ? 'px-5 py-1 bg-[#005DB8] text-white text-nowrap font-semibold rounded-lg' : 'link rounded-md  px-5 py-1 bg-[#e0e2ec] text-black text-nowrap font-semibold'}`}>Ashram stay Feedback</Link>
      <Link href = '/feedback/applicationFeedback' className={`${pathname === '/feedback/applicationFeedback' ? 'ms-3 px-5 py-1 bg-[#005DB8] text-white text-nowrap font-semibold rounded-lg' : 'link rounded-md ms-3 px-5 py-1 bg-[#e0e2ec] text-black text-nowrap font-semibold'}`}>Application Feedback</Link>
      
     </nav>
  )
}

export default NavLink