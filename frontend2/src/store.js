import {configureStore} from '@reduxjs/toolkit'
import contractReducer from './features/contract'
const store = configureStore({
    reducer:{
        contract:contractReducer     
    },
})

export default store