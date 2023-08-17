import Http from "../http-common"
const http = Http()

const getAll = () => http.get(`/product_image`)
const get = (id:string) => http.get(`/product_image/${id}`)
const create = (data:any) => http.post(`/product_image`, data)
const update = (id:string, data:any) => http.put(`/product_image/${id}`, data)
const deleteOne = (id:string) => http.delete(`/product_image/${id}`)
const deleteAll = () => http.delete(`/product_image`)
const getByIdProduct = (idProduct:string) => http.get(`/product_image?idProduct=${idProduct}`)
export const productImageService = {
    getAll, get, create, update, deleteOne, deleteAll, getByIdProduct
}