import {Product, Image, ProductImage, Address} from "src/types"
import {productService, imageService, productImageService} from "src/services"

const getImageById = async (id:string) => {
    try {
        return (await imageService.get(id)).data
    }
    catch (e) {
        console.error('Error getImageById', e)
        return e
    }
}
const getProductImageByIdProduct = async (idProduct:string) => {
    try {
        return (await productImageService.getByIdProduct(idProduct)).data[0]
    }
    catch (e) {
        console.error('Error getProductImageByIdProduct', e)
        return e
    }
}
const getProductFinal = async (product:any) => {
    const images = [], productImage = await getProductImageByIdProduct(product.id)
    for(const img of productImage.idsImage){
        const image = await getImageById(img)
        images.push(image.url??image.base64)
    }
    return {...product, images}
}
export const getAllProducts = async () => {
    try {
        const results = [] ,productData = (await productService.getAll()).data
        for(const product of productData){
            results.push(await getProductFinal(product))
        }
        return results
    }
    catch (e) {
        console.error('Error getAllProducts', e)
        return [e]
    }
}
export const getProductByID = async (id:string) => {
    try {
        const product = (await productService.get(id)).data
        const productImage = await getProductImageByIdProduct(product.id)
        product.images = []
        for(const img of productImage.idsImage){
            const image = await getImageById(img)
            product.images.push(image.url??image.base64)
        }
        return product
    }
    catch (e) {
        console.error('Error getProductByID', e)
        return e
    }
}
export const searchProduct = (query:any) => {
    const allResults = []
    for(const x in query){
        // @ts-ignore
        allResults.push(...getAllProducts.filter(prod => prod[x]===query[x]))
    }
    return allResults
}

interface ProductProps extends Product, Image {}
const getImageByUrl = async (url:string) => {
    try {
        return (await imageService.getByUrl(url)).data[0]
    }
    catch (e) {
        console.error('Error getImageByUrl', e)
        return e
    }
}
const getImageByBase64 = async (base64:string) => {
    try {
        return (await imageService.getByBase64(base64)).data[0]
    }
    catch (e) {
        console.error('Error getImageByBase64', e)
        return e
    }
}
const createImage = async (data:Image) => {
    try {
        if(data.url){
            const image = await getImageByUrl(data.url)
            if(image) return image
        }
        if(data.base64){
            const image = await getImageByBase64(data.base64)
            if(image) return image
        }
        return (await imageService.create(data)).data
    }
    catch (e) {
        console.error('Error createImage', e)
        return e
    }
}
const createProductImage = async (data:ProductImage) => {
    try {
        return await productImageService.create(data)
    }
    catch (e) {
        console.error('Error createProductImage', e)
        return e
    }
}
export const createProduct = async (data:ProductProps) => {
    try {
        const idsImage = []
        if(data.images){
            for(let img of data.images) {
                const image:Image = {url: img}
                // @ts-ignore
                idsImage.push((await createImage(image)).id)
            }
        }
        const product:Product = {
            sku: data.sku,
            name: data.name,
            gender: data.gender,
            description: data.description,
            subDescription: data.subDescription,
            publish: data.publish,
            category: data.category,
            available: data.available,
            price: data.price,
            priceSale: data.priceSale,
            taxes: data.taxes,
            quantity: data.quantity,
            createdAt: data.createdAt,
            cover: data.cover,
            colors: data.colors,
            sizes: data.sizes
        }
        const productCreated = (await productService.create(product)).data
        if(productCreated.id && idsImage[0]){
            const productImage:ProductImage = {
                idProduct: productCreated.id,
                idsImage
            }
            await createProductImage(productImage)
        }
        return productCreated
    }
    catch (e) {
        console.error('Error createProduct', e)
        return e
    }
}
const updateProduct = async (data:ProductProps) => {
    try {
        const product:Product = {
            sku: data.sku,
            name: data.name,
            gender: data.gender,
            description: data.description,
            subDescription: data.subDescription,
            publish: data.publish,
            category: data.category,
            available: data.available,
            price: data.price,
            priceSale: data.priceSale,
            taxes: data.taxes,
            quantity: data.quantity,
            createdAt: data.createdAt,
            cover: data.cover,
            colors: data.colors,
            sizes: data.sizes
        }
        return (await productService.update(`${data.idProduct}`, product)).data
    }
    catch (e) {
        console.error('Error updateProduct', e)
        return e
    }
}
export const updateQuantityProduct = async (id:string, quantity: number) => {
    try {
        const product = await getProductByID(id)
        product.available -= quantity
        return await updateProduct(product)
    }
    catch (e) {
        console.error('Error updateProduct', e)
        return e
    }
}
