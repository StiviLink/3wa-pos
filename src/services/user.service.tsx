import Http from "../http-common"
const http = Http()

const getAll = () => http.get(`/user`)
const get = (id:string) => http.get(`/user/${id}`)
const create = (data:any) => http.post(`/user`, data)
const update = (id:string, data:any) => http.put(`/user/${id}`, data)
const deleteOne = (id:string) => http.delete(`/user/${id}`)
const deleteAll = () => http.delete(`/user`)
const getByName = (name:string) => http.get(`/user?name=${name}`)
const getByEmail = (email:string) => http.get(`/user?email=${email}`)
const getByRole = (role:string) => http.get(`/user?role=${role}`)
export const userService = {
    getAll, get, create, update, deleteOne, deleteAll, getByName, getByEmail, getByRole
}