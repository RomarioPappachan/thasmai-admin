"use client";
import { create } from "zustand";

export const useExpenseFilterStore = create((set) => ({

    FieldValues :["Name", "Expense Type","Amount","Expense Date"],

    dateOperator: ["equal to", "between"],
    stringOperator: ["starts with", "equal to"],
    integerOperator: ["greater than","less than","equal to","not equal to"],

    expenseTypeValues : ["Electricity bill", "Water bill", "Stationery items", "Food and beverages"],
  



  // appointmentData:[],
  //    setAppointmentData: (data) => set(state => {//console.log(data);
  //     return ({appointmentData:[...data]}) }),
  

    // cartToggle: false,
    // setCartToggle: (tog) => set(state => {return ({cartToggle:tog})}),

      
  
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
    
    

      filtersForExport : [],
      setFiltersForExport : (filters)  => set(state =>  { 
        return ({
          filtersForExport: [...filters]
        }) 
      }),


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