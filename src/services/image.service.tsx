import Http from "../http-common"
const http = Http()

const getAll = () => http.get(`/image`)
const get = (id:string) => http.get(`/image/${id}`)
const create = (data:any) => http.post(`/image`, data)
const update = (id:string, data:any) => http.put(`/image/${id}`, data)
const deleteOne = (id:string) => http.delete(`/image/${id}`)
const deleteAll = () => http.delete(`/image`)
export const imageService = {
    getAll, get, create, update, deleteOne, deleteAll
}