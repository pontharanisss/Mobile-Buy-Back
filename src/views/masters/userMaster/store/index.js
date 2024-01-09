// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { getMyIpAddress } from '../../../../utility/commonfunc'
// ** Axios Imports
import axios from 'axios'
import { api } from '../../../../utility/constants'
import { getUserData } from '@utils'

//getData Api
export const getData = createAsyncThunk('UserMaster/getData', async param => {  
    const user = getUserData()
    const config = { headers: { authorization: 'Bearer '.concat(user.accessToken) }}  
    const response1 = await axios.post(`${api.api_url}/master/getUserList`, param, config)
    if (response1 && response1.data && response1.data.body) { 
        console.log(response1.data.body, 'response1.data.body')
        return {
        data: response1.data.body.userList,
        statusFlag:1        
        }
    } else {
        return { statusFlag:1}
    }   
})
// saveData Api
export const saveData = createAsyncThunk('UserMaster/saveData', async params => {
  const user = getUserData()
  const config = { headers: { authorization: 'Bearer '.concat(user.accessToken) }}  
  const response1 = await axios.post(`${api.api_url}/master/saveUserData`, params, config)
  if (response1 && response1.data && response1.data.body) { 
    return { 
      statusFlag:response1.data.body.statusFlag, 
      message:response1.data.body.message
    }
  } 
})
//delete Api 
export const deleteData = createAsyncThunk('UserMaster/deleteData', async params => { 
  const user = getUserData()
  const config = { headers: { authorization: 'Bearer '.concat(user.accessToken) }}       
   const response1 = await axios.post(`${api.api_url}/master/deleteUserData`, params, config)
   if (response1 && response1.data && response1.data.body) { 
    return {     
      statusFlag:response1.data.body.statusFlag,      
      message:response1.data.body.message
    }   
  } 
})

//getmaster Api  for dropdown
export const getmaster = createAsyncThunk('UserMaster/getmaster', async params => {
  const user = getUserData()
  const config = { headers: { authorization: 'Bearer '.concat(user.accessToken) }}
  const response1 = await axios.post(`${api.api_url}/master/getMasterData`, params, config)  
   if (response1 && response1.data && response1.data.body) {
        return {
            userroleList: response1.data.body.userroleList     
        }
    }
})

//reset api
export const resetData = createAsyncThunk('UserMaster/resetData', async params => {
  const user = getUserData()
  const config = { headers: { authorization: 'Bearer '.concat(user.accessToken) }}
  const response1 = await axios.post(`${api.api_url}/master/resetPassword`, params, config)      
   
   if (response1 && response1.data && response1.data.body) {
    return {
      statusFlag:response1.data.body.statusFlag,
      message:response1.data.body.message
   }   
  }

})
export const UserMasterSlice = createSlice({
  name: 'UserMaster',
  initialState: {
    data: [],
    result:'',
    total: 1,
    params: {},
    allData: [],
    userroleList:[],
    branchlist:[],
    updateresult:[],
    statusFlag:0,
    resetData:[],
    message:'',
    statuslist: [],
    statuscode:0
  },
  reducers: {
    handleStatusFlag: (state, action) => {
      state.statusFlag = action.payload.statusFlag
    }
  },
  extraReducers: builder => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.data = action.payload.data
      state.statusFlag = action.payload.statusFlag
    })
    .addCase(saveData.fulfilled, (state, action) => {
      state.statusFlag = action.payload.statusFlag
      state.message = action.payload.message
    })
    
    .addCase(getmaster.fulfilled, (state, action) => {
      state.userroleList = action.payload.userroleList     
      state.message = action.payload.message
    })
    .addCase(deleteData.fulfilled, (state, action) => {
      state.message = action.payload.message
     state.statusFlag = action.payload.statusFlag
    })
    .addCase(resetData.fulfilled, (state, action) => {
      state.message = action.payload.message
     state.statusFlag = action.payload.statusFlag
    })
  }
})

export const {
  handleStatusFlag
} = UserMasterSlice.actions

export default UserMasterSlice.reducer
