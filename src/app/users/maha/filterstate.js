"use client";
 
import { create } from "zustand";
 
export const useMahadhanamFilterStore = create((set) => ({
 
    fieldValues : ["DOJ", "First Name", "Second Name", "User Id", "Available Coupons", "Phone", "Email", "Status"],
 
    dojOperator : ["equal to", "between"],
    stringOperator : ["starts with", "equal to"],
    integerOperator : ["greater than", "less than", "equal to", "not equal to"],
    statusValues : ["Active", "Inactive", "Blocked"],
 
    fieldValue : "",
    setFieldValue : (text) => set(state => ({
        fieldValue : text
    })),
 
    operatorValue : "",
    setOperatorValue : (text) => set(state => ({
        operatorValue : text
    })),
 
    filters : [],
    setFilter : (filter)  => set(state =>  { 
        return ({
            filters : [...state.filters, filter]
        });
    }),
    deleteFilter : (index) => set(state => { 
        console.log(index);
        const fil = [...state.filters];
        fil.splice(index,1);
        return ({
            filters : [...fil]
        });
    }), 
 
 
 
    meditatorsData : [],
    setMeditatorsData : (data) => set(state => {
        //console.log(data);
        return ({
            meditatorsData : [...data]
        });
    }),
 
 
 
 
 
    distributedList: new Set(),
    setDistributedList: (UId) => set(state => {state.distributedList.add(UId);return ({distributedList:state.distributedList})}),
    setRemoveIdFromDistList: (uid) => set(state => { state.distributedList.delete(uid);return ({distributedList:state.distributedList})}),
 
 
    couponCount:"",
    setCouponCount:  (count) => set(state => {return ({couponCount:count}) }),
 
 
 
 
 
 
    sampleList:[],
    setSampleList: (data) => set(state => {//console.log(data);
      return ({sampleList:[...data]}) }),
 
 
    toastData: {
      toggle:false,
      message:""
    },
 
 
 
    setToastData:(tog,message) => set(state => {return ({toastData : {toggle : tog ,message: message}})}),

    validToastData: {
      validToastToggle :false,
        validToastText : ""
    },
    SetValidToastData: (validToggle,validText) => set(state => {
      //console.log(data);
      return ({
        validToastData: {
          validToastToggle :validToggle,
          validToastText : validText
        }
      })
    }),
 
 
    selectAll: false,
    setSelectAll: (tog) => set(state => {return ({selectAll:tog})}),
 
 
 
 
    cartToggle: false,
    setCartToggle: (tog) => set(state => {return ({cartToggle:tog})}),
 
 
 
 
 
 
    fetchData:[],
       setFetchData: (data) => set(state => {//console.log(data);
        return ({fetchData:[...data]})}),
 
 
 
 
      cart_data :[ {
        name:"das",
        coupon:5
      },
      {
      name:"Jeffin",
        coupon:5
      },
      {
      name:"albin",
        coupon:10
      }],
      setCartData: (data) => set(state => {//console.log(data);
        return ({cart_data:[...data]}) }),
 
 
        couponCount:{
          available_coupons:"",
          distributed_coupon:""
        },
        setCouponCount:  (ac,dc) => set(state => {
          console.log(ac,dc,"filterstate line118")
          return ({couponCount:{available_coupons:ac,distributed_coupon:dc}}) }),
 
      RefPopData: {
        refPopupToggle :false,
        refUserId : 0
      },
      setRefPopData: (id,refToggle) => set(state => {
        //console.log(data);
        return ({ RefPopData: {
          refPopupToggle : refToggle,
          refUserId : id
        }}) 
      }),
 
 
 
 
 
 
 
 
 
 
 
 
        banToggle: false,
    setBanToggle: (tog) => set(state => {return ({banToggle:tog})}),
 
 
    validToastData: {
    validToastToggle :false,
      validToastText : ""
    },
    SetValidToastData: (validToggle,validText) => set(state => {//console.log(data);
      return ({validToastData:{
        validToastToggle :validToggle,
        validToastText : validText
 
 
 
 
      }}) }),
 
 
}))
 