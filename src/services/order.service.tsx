import Http from "../http-common"
const http = Http()

const getAll = () => http.get(`/order`)
const get = (id:string) => http.get(`/order/${id}`)
const create = (data:any) => http.post(`/order`, data)
const update = (id:string, data:any) => http.put(`/order/${id}`, data)
const deleteOne = (id:string) => http.delete(`/order/${id}`)
const deleteAll = () => http.delete(`/order`)
const getByNumber = (number:number) => http.get(`/order?number=${number}`)
export const orderService = {
    getAll, get, create, update, deleteOne, deleteAll, getByNumber
}