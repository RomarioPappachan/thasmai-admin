"use client"
import React from "react";
import { useNavbarTextStore } from "../state/navbar-state";



export default function Logging(){

    const setNavbarText = useNavbarTextStore((state) => state.setNavbarText);
	setNavbarText("Logging / Error handling");
    

    return (
        <div className='w-10 h-10 bg-emerald-100'>
           
           <h1 className='text-bold text-white text-2xl'>Users </h1>
        </div>
    )
}