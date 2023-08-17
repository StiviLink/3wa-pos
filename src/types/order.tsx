export default interface Order {
    number: number,
    createdAt?: string,
    user?: {idUser: string, email: string, name: string, image?: string},
    products?: {idProduct: string, quantity: number}[]
}