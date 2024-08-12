"use client";
import { create } from "zustand";

export const useAdminAppointmentStore = create((set) => ({

    appointments : [],
    setAppointments : (data) => set(state => {
        return ({appointments : data})
    }),


    selectedAppointmentId : 0,
    setSelectedAppointmentId : (id) => set(state => {
        return ({appointmentId : id})
    }),
 

    viewAppointment : false,
    setViewAppointment : (val) => set(state => {
        return ({viewAppointment : val})
    }),


    appointmentStatus : "",
    
    setAppointmentStatus : (val) => set(state => {
        return ({appointmentStatus : val})
    }),
      
   
}))