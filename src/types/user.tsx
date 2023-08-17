export default interface User {
    idUser?: string,
    name: string,
    email: string,
    phone?: string,
    description?: string,
    image?: string,
    role?: string,
    status?: string,
    isVerified?: boolean,
    addressIds?: string[],
    ordersIds?: string[],
    password?: string,
    idConnexion?: string
}