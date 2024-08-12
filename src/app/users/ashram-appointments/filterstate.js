"use client";
import { create } from "zustand";

export const useAppointmentFilterStore = create((set) => ({

  	FieldValues :["Appointment Id", "Name", "Appointment Date", "Checkin Date", "Checkout Date", "Status"],

  	dateOperator: ["equal to", "between"],
  	stringOperator: ["starts with", "equal to"],
  	integerOperator: ["greater than", "less than", "equal to", "not equal to"],
    
  	statusValues: ["Not Arrived", "Checked In", "Checked Out", "Completed"],




  	// appointmentData:[],
  	//    setAppointmentData: (data) => set(state => {//console.log(data);
  	//     return ({appointmentData:[...data]}) }),
        
  
    fetchData:[],
    setFetchData: (data) => set(state => {//console.log(data);
    return ({fetchData:[...data]})}),


    FieldValue : "",
    setFieldText : (text) => set(state => ({ FieldValue:text })),

    operatorValue: "",
    setOperatorValue: (text) => set(state => ({operatorValue: text})),

    filters : [],
    setFilter : (filter)  => set(state =>  { return ({filters:[...state.filters, filter]} ) } ),
    deleteFilter : (index) => set(state => { console.log(index,);const fil = [...state.filters]; fil.splice(index,1); return ({filters:[...fil]})}),
    
    



    // expenseData : [],
    // setExpenseData : (data) => {
    //     console.log(data);
    //     set((state) => {
    //         return ({ 
    //             expenseData : data 
    //         })
    //     })
    // },
  
    
    // isViewDetail: false,
    // setIsViewDetail : (toggle, expense) => set((state) => { 
    //     let view_id = "";
    //     if(expense) {
    //       	view_id = expense
    //     } else {
    //       	view_id = state.id
    //     } 
    //     return ({  
    //         isViewDetail : toggle, 
    //         id : view_id
    //     })
    // }),
  
      
  
}))