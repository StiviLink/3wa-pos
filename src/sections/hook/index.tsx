import html2canvas from "html2canvas"
import {jsPDF} from "jspdf"
import axios from "axios"

const emailApiKey = 'F8724D4BD49390C30FB67D152F93AD0849E102AFBE8D45BB1' +
    'AAEDD7FE3DE664B3476250796EFE857B682100BBB931580'

export const htmlStringToPdf = async (html:HTMLElement) => {
    const canvas = await html2canvas(html)
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF()
    pdf.addImage(imgData, 'PNG', 0, 0, 210, 297)
    return pdf
}

export const axiosMailSend = async (data:any) => axios({
    method: 'post',
    url: 'https://api.elasticemail.com/v4/emails',
    headers: {
        'X-ElasticEmail-ApiKey': emailApiKey
    },
    data
})

export const convertImageToBase64 = (imgUrl:string,callback:any) => {
    const image = new Image()
    image.crossOrigin='anonymous';
    image.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.height = image.naturalHeight
        canvas.width = image.naturalWidth
        ctx?.drawImage(image, 0, 0)
        callback(canvas.toDataURL().replace('data:image/png;base64,',''))
    }
    image.src = imgUrl
}

export const dataURLtoFile = (dataurl:string, filename:string) => {
    const arr = dataurl.split(','),
        match = arr[0].match(/:(.*?);/),
        mime = match ? match[1] : '',
        bstr = atob(arr[arr.length - 1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while(n--){
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, {type:mime});
}