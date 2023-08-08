import Http from "../http-common"
const http = Http()

const getAll = () => http.get(`/address`)
const get = (id:string) => http.get(`/address/${id}`)
const create = (data:any) => http.post(`/address`, data)
const update = (id:string, data:any) => http.put(`/address/${id}`, data)
const deleteOne = (id:string) => http.delete(`/address/${id}`)
const deleteAll = () => http.delete(`/address`)
const getByCountry = (country:string) => http.get(`/address?country=${country}`)
const getByCity = (city:string) => http.get(`/address?city=${city}`)
const getByZipCode = (zipCode:number) => http.get(`/address?zipCode=${zipCode}`)

export const addressService = {
    getAll, get, create, update, deleteOne, deleteAll, getByCountry, getByCity, getByZipCode
}