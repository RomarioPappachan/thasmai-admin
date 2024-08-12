"use client";

import { create } from "zustand";

export const useNotificationStore = create((set) => ({


    searchedData : [],
    setSearchedData : (data) => set(state => {
        return ({ 
            searchedData : data 
        })
    }),


    // set users to display User chips
    selectedUsers : [],
    setSelectedUsers : (user)  => set(state =>  { 
        return ({ 
            selectedUsers : [...state.selectedUsers, user]
        }) 
    }),
    deleteSelectedUsers : (index) => set(state => { 
        const fil = [...state.selectedUsers];
        fil.splice(index, 1); 
        return ({
            selectedUsers : [...fil]
        })
    }),
    clearEntireUsers : () => set(state => {
        // to clear entire users after sending notification
        return ({
            selectedUsers : []
        })
    }),
    deleteSelectedUserByRemoveButton : (userId) => set(state => { 
        // to remove user using remove button from table
        const newArray = state.selectedUsers.filter((user) => {
            return user.UId !== userId;
        });
        return ({
            selectedUsers : [...newArray]
        })
    }),

    
    // for sending userIds for api
    selectedUsersIds : [],
    setSelectedUsersIds : (newId) => set((state) => {
        return ({ 
            selectedUsersIds : [...state.selectedUsersIds, newId]
        })
    }),
    deleteSelectedUsersIds : (index) => set(state => {
        const fil = [...state.selectedUsersIds];
        fil.splice(index, 1); 
        return ({
            selectedUsersIds : [...fil]
        })
    }),
    clearEntireUserIds : () => set(state => {
        // to empty entire userId after sending notification
        return ({
            selectedUsersIds : []
        })
    }),
    deleteUserIdByRemoveButton : (userId) => set(state => {
        // to remove userID using remove button from table
        const newArray = state.selectedUsersIds.filter(id => id !== userId);
        return ({
            selectedUsersIds : [...newArray]
        })
    }),



    id: "",
    setId : (newId) => set((state) => {
        return ({ 
            id : newId 
        })
    }),

    userViewToggle: false,
    setUserViewToggle : (toggle, userId) => set((state) => { 
        let view_id = "";
        if(appointment) {
            view_id = userId
        } else {
            view_id = state.id
        } 
        return ({  
            userViewToggle : toggle, 
            id : view_id
        })
    }),



    // feedbackViewToggle: false,
    // setFeedbackViewToggle : (toggle, feedback) => set((state) => { 
    //   let feedback_id = "";
    //   if(feedback) {
    //     feedback_id = feedback
    //   } else {
    //     feedback_id = state.id
    //   } 
    //   return ({  feedbackViewToggle : toggle, id : feedback_id})}),

   
}))