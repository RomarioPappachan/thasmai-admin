"use client"

import { create } from "zustand";

export const useOperationsFilterStore = create((set) => ({

  	fieldValues : ["Expense Date", "Expense Type", "Employee Id", "Amount"],

  	dojOperator : ["equal to", "between"],
  	stringOperator : ["starts with", "equal to"],
  	integerOperator : ["greater than", "less than", "equal to", "not equal to"],

	expenseTypeValues : ["Electricity Bill", "Water Bill", "Stationery Items", "Food and beverages"],




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
  	    }) 
  	}),
  	deleteFilter : (index) => set(state => { 
  	    const fil = [...state.filters]; 
  	    fil.splice(index,1); 
  	    return ({
  	        filters : [...fil]
  	    })
  	}),

  	expenseData : [],
  	setExpenseData : (data) => set(state => {
  	  //console.log(data);
  	    return ({
			expenseData : [...data]
  	  }) 
  	}),

}))






