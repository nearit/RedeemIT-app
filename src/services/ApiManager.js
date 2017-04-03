import axios from 'axios'
import Store from '../Store'
import JsonApiUtils from './serializers/jsonApiUtils'

const baseURL = __DEV__ ? 'https://dev-api.nearit.com' : 'https://api.nearit.com'

const apiManager = axios.create({
  baseURL,
  headers: {
    'Accept': 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json'
  }
})

const setTokenHeader = apiManagerInstance => {
  const {auth} = Store.getState()
  const {token} = auth

  if (token) {
    apiManagerInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
}

export const readResource = (url, {params} = {}) => {
  setTokenHeader(apiManager)
  return apiManager.get(
    url,
    {
      params,
      transformResponse: [function (response) {
        // If data cannot be parsed return original response
        try {
          const {data, included} = JSON.parse(response)
          return JsonApiUtils.toJsonModel(data, {includedData: included})
        } catch (err) {
          return response
        }
      }]
    }
  )
}

export const readListResource = (url, {params} = {}) => {
  setTokenHeader(apiManager)
  return apiManager.get(
    url,
    {
      params,
      transformResponse: [function (response) {
        // Do whatever you want to transform the data
        const {data, included} = JSON.parse(response)
        return JsonApiUtils.toJsonArrayModel(data, {includedData: included})
      }]
    }
  )
}

export const createResource = (url, data) => {
  setTokenHeader(apiManager)
  return apiManager.post(
    url,
    data,
    {
      transformRequest: [function (response) {
        try {
          // Do whatever you want to transform the data
          return JSON.stringify(JsonApiUtils.toJsonApiModel(response))
        } catch (err) {
          return response
        }
      }]
    })
}

export const updateResource = (url, data) => {
  setTokenHeader(apiManager)
  return apiManager.put(
    url,
    data,
    {
      transformRequest: [function (data) {
        // Do whatever you want to transform the data
        return JSON.stringify(JsonApiUtils.toJsonApiModel(data))
      }]
    })
}

export const deleteResource = (url) => {
  return apiManager.delete(`${url}`)
}
