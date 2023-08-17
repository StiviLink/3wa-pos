import Http from "../http-common"
const http = Http()

const getAll = () => http.get(`/product`)
const get = (id:string) => http.get(`/product/${id}`)
const create = (data:any) => http.post(`/product`, data)
const update = (id:string, data:any) => http.put(`/product/${id}`, data)
const deleteOne = (id:string) => http.delete(`/product/${id}`)
const deleteAll = () => http.delete(`/product`)
const getBySku = (sku:string) => http.get(`/product?sku=${sku}`)
const getByName = (name:string) => http.get(`/product?name=${name}`)
const getByGender = (gender:string) => http.get(`/product?gender=${gender}`)
export const productService = {
    getAll, get, create, update, deleteOne, deleteAll, getBySku, getByName, getByGender
}