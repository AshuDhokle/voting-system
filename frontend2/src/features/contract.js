import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    contract:"",
    accounts:"",
    owner:"",
    isOwner:"",
}

export const contractSlice = createSlice({
    name:'contract',
    initialState,
    reducers:{
        initContract:(state,action)=>{
            state.contract = action.payload._contract
            state.accounts = action.payload.accounts
            state.owner = action.payload.owner
            if(state.accounts[0].toLowerCase() === state.owner.toLowerCase()){
                state.isOwner = true
            }
        }
    }
})

export const {initContract} = contractSlice.actions;
export const selectContract = (state) => state.contract;
export default contractSlice.reducer;