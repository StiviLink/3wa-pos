//service
import {addressService, userService} from "src/services"
//type
import {User, Address} from "src/types"
import {dataURLtoFile} from "src/sections/hook"
interface UserProp extends User, Address{}

const getAddressById = async (id:string) => {
    try {
        return (await addressService.get(id)).data
    }
    catch (e) {
        console.error('Error getAddressById', e)
        return e
    }
}
const userComplete = async (user:any) => {
    const address = await getAddressById(user.addressIds[0])
    const dataUrl = 'data:image/png;base64,'+user.image
    const file = dataURLtoFile(dataUrl, 'image.png')
    const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
    })
    user.imageUrl = newFile.preview
    return {...address, ...user}
}
export const getAllUsers = async () => {
    try {
        const results = [] ,userData = (await userService.getAll()).data
        for(const user of userData){
            results.push(await userComplete(user))
        }
        return results
    }
    catch (e) {
        console.error('Error getAllUsers', e)
        return e
    }
}
const getUserById = async (id:string) => {
    try {
        const user = (await userService.get(id)).data
        if(user) return await userComplete(user)
    }
    catch (e) {
        console.error('Error getUserById', e)
        return e
    }
}
export const getUserByEmail = async (email:string) => {
    try {
        const user = (await userService.getByEmail(email)).data[0]
        if(user) return await userComplete(user)
    }
    catch (e) {
        console.error('Error getUserByEmail', e)
        return e
    }
}
const getUsersByIdConnexion = async (idConnexion:string) => {
    try {
        return (await userService.getByIdConnexion(idConnexion)).data??[]
    }
    catch (e) {
        console.error('Error getUsersByIdConnexion', e)
        return e
    }
}
const getUsersByStatus = async (status:string) => {
    try {
        return (await userService.getByStatus(status)).data??[]
    }
    catch (e) {
        console.error('Error getUsersByStatus', e)
        return e
    }
}
export const getUserToActivate = async (idConnexion:string) => {
    try {
        const usersWithConnexion = await getUsersByIdConnexion(idConnexion),
            usersPending = await getUsersByStatus('pending')
        if(usersWithConnexion && usersPending){
            const user = usersWithConnexion.find((x:any) => usersPending.find((y:any) => x.id===y.id))
            if(user) return await userComplete(user)
        }
    }
    catch (e) {
        console.error('Error getUserToActivate', e)
        return e
    }
}
const createAddress = async (data:Address) => {
    try {
        return await addressService.create(data)
    }
    catch (e) {
        console.error('Error createAddress', e)
        return e
    }
}
export const createUser = async (data:UserProp) => {
    try {
        const address:Address = {
              country: data.country
            , city: data.city
            , zipCode: data.zipCode
            , state: data.state
            , address: data.address
        }
        // @ts-ignore
        const addressCreated = (await createAddress(address)).data
        const user:User = {
              name: data.name
            , email: data.email
            , phone: data.phone
            , description: data.description
            , image: data.image
            , role: data.role
            , isVerified: data.isVerified
            , addressIds: [addressCreated.id]
            , idConnexion: data.idConnexion
        }
        return (await userService.create(user)).data
    }
    catch (e) {
        console.error('Error createUser', e)
        return e
    }
}
const updateAddress = async (data:Address) => {
    try {
        return await addressService.update(`${data.idAddress}`, data)
    }
    catch (e) {
        console.error('Error updateAddress', e)
        return e
    }
}
export const updateUser = async (data:UserProp) => {
    try {
        if(data.addressIds && data.addressIds[0]){
            const address:Address = {
                idAddress: data.addressIds[0]
                , country: data.country
                , city: data.city
                , zipCode: data.zipCode
                , state: data.state
                , address: data.address
            }
            console.info('updateAddress', await updateAddress(address))
        }

        const user:User = {
              name: data.name
            , email: data.email
            , phone: data.phone
            , description: data.description
            , image: data.image
            , role: data.role
            , status: data.status
            , isVerified: data.isVerified
            , addressIds: data.addressIds
            , ordersIds: data.ordersIds
            , idConnexion: data.idConnexion
            , password: data.password
        }
        return (await userService.update(`${data.idUser}`, user)).data
    }
    catch (e) {
        console.error('Error updateUser', e)
        return e
    }
}
const deleteAddress = async (id:string) => {
    try {
        return (await addressService.deleteOne(id)).data
    }
    catch (e) {
        console.error('Error deleteAddress', e)
        return e
    }
}
export const deleteUser = async (id:string) => {
    try {
        const user = await getUserById(id)
        user.addressIds.map(async (address: string) => await deleteAddress(address))
        return (await userService.deleteOne(id)).data
    }
    catch (e) {
        console.error('Error deleteUser', e)
        return e
    }
}