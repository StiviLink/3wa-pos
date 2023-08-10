export default interface Product {
    idProduct?: string,
    sku: string,
    name: string,
    gender?: string,
    description?: string,
    subDescription?: string,
    publish?: string,
    category?: string,
    available?: number,
    price?: number,
    priceSale?: number,
    taxes?: number,
    quantity?: number,
    createdAt?: Date,
    cover?: string,
    colors?: string[],
    sizes?: string[],
    images?: string[]
}