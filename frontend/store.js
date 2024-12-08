import { create } from 'zustand'

export const useStore = create((set) => ({
  userName: null,
  openModel:false,
  socket:null,
  messageBox:[],
  message:null,
  roomName:null
}))