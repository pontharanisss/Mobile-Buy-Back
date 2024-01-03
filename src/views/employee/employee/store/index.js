// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' 
// ** Axios Imports
import axios from 'axios'
import { api } from '../../../../utility/constants' 

//  GET Common LIST
export const commonData = createAsyncThunk('EmployeeDetails/commonData', async (params) => {
  const response = await axios.post(`${api.api_url}/common/fetchcommonDataJwt`, params)
  if (response && response.data && response.data.body && response.data.body.token) {
    // params = {...params, ...{jwtToken:response.data.body.token}}
   const response1 = await axios.post(`${api.api_url}/common/fetchcommonData`, response.data.body.token)
   if (response1 && response1.data && response1.data.body) {
       console.log(response1.data.body)
    return {
      params,
      data: response1.data.body
    }
   } else {
   } 
}
})

export const EmployeeDetails = createSlice({
    name: 'EmployeeDetails',
    initialState: {
      data: [],
      message:'',
      statuslist:[],
      params: {},
      statusFlag:0
    },     
    reducers: {
      handleStatusFlag: (state, action) => {
        state.statusFlag = action.payload.statusFlag
      }
    },
    extraReducers: builder => {
      builder.addCase(commonData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
      })
    }
  })

  export const {
    handleStatusFlag
  } = EmployeeDetails.actions
  
export default EmployeeDetails.reducer

