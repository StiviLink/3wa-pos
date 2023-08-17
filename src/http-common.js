import axios from "axios"
export default function Http(){
    return axios.create({
        baseURL: "http://localhost:3060/api",
        headers: {
            "Content-type": "application/json"
        }
    })
}