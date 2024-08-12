"use client";
 
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
 
 
function MahadhanamCouponLabel({ coupons, fetchToggle }) {
    const [totalCoupons,setTotalCoupons] = useState('')
    useEffect(()=>{
        (async ()=>{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/mahadhanam-total-coupons`);
        console.log(response.data.totalCoupons,"count");
        setTotalCoupons(response.data.totalCoupons);
                
        })()
    },[fetchToggle])

    return (
 
        <div className="flex h-full">
            <div className="bg-[#5799FD] w-16 h-8 rounded-l-xl flex justify-center items-center border-r-4">
                <Image src = '/admin/coupon-count.png' className="" width={24} height={24} alt="coupon"/>
            </div>
            <div className="bg-[#5799FD] w-24 h-8 rounded-r-xl font-bold text-white flex justify-center items-center ">
                {totalCoupons } 
            </div>
        </div>
    );
}
 
export default MahadhanamCouponLabel;