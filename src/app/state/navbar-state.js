"use client"
import {create} from 'zustand'

export const useNavbarTextStore = create((set)=>({

  navbar_text : "",
  setNavbarText : (text) => set(state => ({
      navbar_text : text
    }
  )),

}))


