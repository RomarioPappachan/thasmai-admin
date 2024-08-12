"use client";
import { create } from "zustand";

export const useAppointFilterStore = create((set) => ({

  FieldValues :["Appointment Id", "Name", "Appointment Date", "Checkin Date", "Checkout Date", "Status"],
  
  dateOperator: [
    "equal to",
    "between",
  ],
  stringOperator: ["starts with", "equal to"],
  
  integerOperator: ["greater than", "less than", "equal to", "not equalto"],

  statusValues: ["Not Arrived", "Checked In", "Checked Out", "Completed"],

  



  // appointmentData:[],
  //    setAppointmentData: (data) => set(state => {//console.log(data);
  //     return ({appointmentData:[...data]}) }),


  distributedList: new Set(),
  setDistributedList: (UId) => set(state => {state.distributedList.add(UId);return ({distributedList:state.distributedList})}),
  setRemoveIdFromDistList: (uid) => set(state => { state.distributedList.delete(uid);return ({distributedList:state.distributedList})}),


  couponCount:"",
  setCouponCount:  (count) => set(state => {return ({couponCount:count}) }),
  

  toastData: {
    toggle: false,
    message: ""
  },
  setToastData:(tog,message) => set(state => {return ({toastData : {toggle : tog ,message: message}})}),


  selectAll: false,
  setSelectAll: (tog) => set(state => {return ({selectAll:tog})}),




  cartToggle: false,
  setCartToggle: (tog) => set(state => {return ({cartToggle:tog})}),

      
  
  fetchData:[],
     setFetchData: (data) => set(state => {//console.log(data);
      return ({fetchData:[...data]})}),


  FieldValue : "",
    setFieldText : (text) => set(state => ({FieldValue:text})),

    operatorValue: "",
    setOperatorValue: (text) => set(state => ({operatorValue: text})),

    filters : [],
    setFilter : (filter)  => set(state =>  { return ({filters:[...state.filters,filter]} ) } ),
    deleteFilter : (index) => set(state => { console.log(index,);const fil = [...state.filters]; fil.splice(index,1); return ({filters:[...fil]})}),
    
    



    appointments : [],
    setAppointments : (data) => {
  
      console.log(data);
      set(state =>{return ({ appointments : data })})
      
  },
  
    paymentToggle: false,
    setPaymentToggle : (toggle, appointment) => set((state) => { 
      let order_id = "";
      if(appointment) {
        order_id = appointment
      } else {
        order_id = state.id
      } 
      return ({paymentToggle : toggle, id : order_id})}),
  
    id: "",
    setId :   (newId) => set((state) =>{ return ({ id:newId })}),
  
    appointmentViewToggle: false,
    setAppointmentViewToggle : (toggle, appointment) => set((state) => { 
      let view_id = "";
      if(appointment) {
        view_id = appointment
      } else {
        view_id = state.id
      } 
      return ({  appointmentViewToggle : toggle, id : view_id})}),
  
  
  
      feedbackViewToggle: false,
      setFeedbackViewToggle : (toggle, feedback) => set((state) => { 
        let feedback_id = "";
        if(feedback) {
          feedback_id = feedback
        } else {
          feedback_id = state.id
        } 
        return ({  feedbackViewToggle : toggle, id : feedback_id})}),

        profileViewToggle: false,
        setprofileViewToggle : (toggle, id) => set((state) => { 
          let feedback_id = "";
          if(id) {
            feedback_id = id
          } else {
            feedback_id = state.id
          } 
          return ({  profileViewToggle : toggle, id : feedback_id})}),
  
}))
