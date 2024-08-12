"use client";
import { create } from "zustand";

export const useLoginStore = create((set) => ({


   

    isloggedin : false,
    setIsloggedin : (toggle) => set((state) => ( { 
  
      isloggedin : toggle 

    }) ), //setisloggedin
   
    role : "",
    setRole : (role) => set((state) => ( { 
  
      role : role 

    }) ),

    // set emploee Id for use in expense creation ...

    emp_Id : "",
    setEmployeeId : (id) => set((state) => ( { 
  
        emp_Id : id 
  
    }) ),



  }) ) //end
  

  


