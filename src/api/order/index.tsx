//service
import {orderService} from "src/services"
//type
import {Order} from "src/types"
//
import {getProductByID} from "../product"

export const getAllOrders = async () => {
    try {
        const allOrders = (await orderService.getAll()).data, results = []
        for(const order of allOrders){
            const num = order.number
            order.orderNumber = `#inv-${num<10 ? "00" : num<100 ? "0" : ""}${num}`
            order.quantity = order.products.reduce((acc:any, curr: any) => acc + curr.quantity, 0)
            const result = {...order, items: []}
            let subTotal = 0
            for(const prod of order.products){
                const product = await getProductByID(prod.idProduct)
                result.items.push({id: product.id, coverUrl: product.images[0], price: product.price,
                    name: product.name, sku: product.sku, quantity: prod.quantity})
                subTotal += prod.quantity*product.price
            }
            result.subTotal = subTotal.toFixed(2)
            results.push(result)
        }
        return results
    }
    catch (e) {
        console.error('Error getAllOrders', e)
        return [e]
    }
}
const getOrderById = async (id:string) => {
    try {
        return  (await orderService.get(id)).data
    }
    catch (e) {
        console.error('Error getOrderById', e)
        return e
    }
}
export const getOrderByNumber = async (number:number) => {
    try {
        return (await orderService.getByNumber(number)).data[0]
    }
    catch (e) {
        console.error('Error getOrderByNumber', e)
        return e
    }
}
export const createOrder = async (data:Order) => {
    try {
        return (await orderService.create(data)).data
    }
    catch (e) {
        console.error('Error createUser', e)
        return e
    }
}