// ** Redux Imports
import axios from 'axios'
import { api } from '../../../../utility/constants'
import { getUserData } from '@utils'
import { createAsyncThunk } from '@reduxjs/toolkit'

// fetchIMEIData Api
export const fetchIMEIData = createAsyncThunk('UserMaster/fetchIMEIData', async (userId) => {
  try {
    const user = getUserData()
    console.log(user, 'getUserdata')
    const config = {
      headers: { authorization: 'Bearer '.concat(user.accessToken) }
    }
    const response = await axios.post(`${api.api_url}/master/getIMEIData`, { user_id: userId }, config)
    
    if (response && response.data && response.data.body) {
      console.log(response.data.body, 'IMEI data fetched successfully')

      return {
        imeiList: response.data.body.imei_list,
        statusFlag: 1
      }
    } else {
      return { statusFlag: 1 }
    }
  } catch (error) {
    console.error('Error fetching IMEI data:', error)
    throw error
  }
})

export const getmaster = createAsyncThunk('UserMaster/getmaster', async (params) => {
    try {
      const user = getUserData()
      const config = {
        headers: { authorization: 'Bearer '.concat(user.accessToken) }
      }
      const response1 = await axios.post(`${api.api_url}/master/getMasterData`, params, config)
  
      if (response1 && response1.data && response1.data.body) {
        return {
          userroleList: response1.data.body.userroleList,
          reasonList: response1.data.body.reasonList
        }
      }
    } catch (error) {
      console.error('Error fetching master data:', error)
      throw error
    }
  })

  export const Productcancelled = createAsyncThunk('UserMaster/cancelProduct', async ({ user_id, imei_no, reason_code, remarks, total_amount }) => {
    try {
      const user = getUserData()
      const config = {
        headers: { authorization: 'Bearer '.concat(user.accessToken) }
      }
  
      const requestData = {
        user_id,
        imei_no,
        reason_code,
        remarks,
        total_amount
      }
  
      const response = await axios.post(`${api.api_url}/product/saveCancelledProduct`, requestData, config)
  
      if (response && response.data && response.data.body) {
        console.log(response.data.body, 'Cancelled Product created successfully')
  
        return {
          statusFlag: response.data.body.statusFlag,
          message: response.data.body.message
        }
      } else {
        return { statusFlag: 0, message: 'Failed to create Cancelled Product' }
      }
    } catch (error) {
      console.error('Error creating Cancelled Product:', error)
      throw error
    }
  })

  export const List = createAsyncThunk('UserMaster/List', async (user_id) => {
    try {
      const user = getUserData()
      const config = {
        headers: { authorization: 'Bearer '.concat(user.accessToken) }
      }
  
      const requestData = {
        user_id
      }
  
      const response = await axios.post(`${api.api_url}/product/getCancelledProductList`, requestData, config)
      return {
        imeiList: response.data.body.cancelledProducts,
        statusFlag: 1
      }
    } catch (error) {
      console.error('Error retrieving Another List:', error)
      throw error
    }
  })

  export const deletelist = createAsyncThunk('UserMaster/deletelist', async (requestData) => {
    try {
      const user = getUserData()
      const config = {
        headers: { authorization: 'Bearer '.concat(user.accessToken) }
      }
     const response = await axios.post(`${api.api_url}/product/deleteCancelledProduct`, requestData, config)
      return {
        statusFlag: response.data.body.statusFlag,
        message: response.data.body.message
      }
    } catch (error) {
      console.error('Error retrieving delete List:', error)
      throw error
    }
  })
  