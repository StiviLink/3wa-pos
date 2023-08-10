//service
import {addressService, userService} from "src/services"
//type
import {User, Address} from "src/types"
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
export const getAllUsers = async () => {
    try {
        const results = [] ,userData = (await userService.getAll()).data
        for(const user of userData){
            const address = await getAddressById(user.addressIds[0])
            results.push({...address, ...user})
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
        const user = (await userService.get(id)).data,
            address = await getAddressById(user.addressIds[0])
        return {...address, ...user}
    }
    catch (e) {
        console.error('Error getUserById', e)
        return e
    }
}
export const getUserByEmail = async (email:string) => {
    try {
        const user = (await userService.getByEmail(email)).data[0]
        if(user) {
            const address = await getAddressById(user.addressIds[0])
            return {...address, ...user}
        }
    }
    catch (e) {
        console.error('Error getUserByEmail', e)
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