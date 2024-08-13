import { create } from "zustand";
import { isExit } from "../Utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useLikeSongs = create((set)=>({
  likedSongs :[],
  addToLiked :async(newSong)=>{
    set((state)=>{
      let isAlreadyExit = isExit(state.likedSongs,newSong)
      const updatedSongs = isAlreadyExit
        ? state.likedSongs?.filter(item => item.url !== newSong.url)
        : [newSong, ...state.likedSongs];

        AsyncStorage.setItem('likedsongs',JSON.stringify(updatedSongs))
      return{
        likedSongs:updatedSongs
      }
    })
  },
  loadLikedSongs :async()=>{
    try {
      const likedSong = await AsyncStorage.getItem('likedsongs');
     console.log('likedSong', likedSong);
      
      if (likedSong) {
        set({likedSongs:JSON.parse(likedSong)})
        
      }
      
    } catch (error) {
      
    }
  }
})) 