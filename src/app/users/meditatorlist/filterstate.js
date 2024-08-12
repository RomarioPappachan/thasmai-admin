"use client";
import { create } from "zustand";
 
export const useFilterStore = create((set) => ({
 
    // fieldValues : ["DOJ", "firstName", "UId", "coupons", "Phone", "Email", "Status"],
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
 
    // distributedListUserId: new Set(),
    // setDistributedListUserId :  (UserId) => set(state => {
    //     state.distributedList.add(UserId);
    //     return ({
    //         distributedList : state.distributedListUserId
    //     }); 
    // }),

    distributedList : new Set(),
    setDistributedList : (UId) => set(state => {
        state.distributedList.add(UId);
        return ({
            distributedList : state.distributedList
        });
    }),
    setRemoveIdFromDistList : (uid) => set(state => { 
        state.distributedList.delete(uid);
        return ({
            distributedList : state.distributedList
        });
    }),
 
 
    couponCount: {
        available_coupons: "",
        distributed_coupon: ""
    },
    setCouponCount: (ac, dc) => set(state => {
        console.log(ac,dc,"filterstate line118")
        return ({ 
            couponCount: { available_coupons : ac, distributed_coupon : dc }
        });
    }),
 
 
    toastData : {
       toggle : false,
       message : ""
    },
    setToastData : (tog, message) => set(state => {
        return ({
            toastData : {toggle : tog, message : message}
        });
    }),

    validToastData: {
        validToastToggle :false,
        validToastText : ""
    },
    SetValidToastData: (validToggle,validText) => set(state => {
        //console.log(data);
        return ({ validToastData: {
          validToastToggle :validToggle,
          validToastText : validText
        }}) 
    }),
 
 
    selectAll : false,
    setSelectAll : (tog) => set(state => {
        return ({
            selectAll : tog
        });
    }),
 
 
    cartToggle : false,
    setCartToggle : (tog) => set(state => {
        return ({
            cartToggle : tog
        });
    }),
 
 
    fetchData : [],
    setFetchData : (data) => set(state => {
        //console.log(data);
        return ({
            fetchData : [...data]
        });
    }),
 
 
 
 
 
    //closing create store
}))
 