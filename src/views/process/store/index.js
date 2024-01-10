// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' 
// ** Axios Imports
import axios from 'axios'
import { api } from '../../../utility/constants' 
import { getUserData } from '@utils'

// importProduct Api
export const importProduct = createAsyncThunk('Process/importProduct', async params => {
  const user = getUserData()
  const config = { headers: { authorization: 'Bearer '.concat(user.accessToken) }}  
  const response1 = await axios.post(`${api.api_url}/product/importProduct`, params, config)
  if (response1 && response1.data && response1.data.body) { 
    return { 
      statusFlag:response1.data.body.statusFlag, 
      message:response1.data.body.message
    }
  } 
})

// gettransitList Api
export const gettransitList = createAsyncThunk('Process/gettransitList', async params => {
  const user = getUserData()
  const config = { headers: { authorization: 'Bearer '.concat(user.accessToken) }}  
  const response1 = await axios.post(`${api.api_url}/product/gettransitList`, params, config)
  if (response1 && response1.data && response1.data.body) { 
    return { 
      statusFlag:response1.data.body.statusFlag, 
      transitList:response1.data.body.transitList
    }
  } 
})

export const Process = createSlice({
    name: 'Process',
    initialState: {
      message:'',
      params: {},
      statusFlag:0,
      transitList: []
    },     
    reducers: {
      handleStatusFlag: (state, action) => {
        state.statusFlag = action.payload.statusFlag
      }
    },
    extraReducers: builder => {     
      builder.addCase(importProduct.fulfilled, (state, action) => {
        state.statusFlag = action.payload.statusFlag
        state.message = action.payload.message
      })
      builder.addCase(gettransitList.fulfilled, (state, action) => {
        state.statusFlag = action.payload.statusFlag
        state.transitList = action.payload.transitList
      })
    }
  })

  export const {
    handleStatusFlag
  } = Process.actions
  
export default Process.reducer

