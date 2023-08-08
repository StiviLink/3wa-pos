import html2canvas from "html2canvas"
import {jsPDF} from "jspdf"
import axios from "axios"

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
        'X-ElasticEmail-ApiKey': 'F8724D4BD49390C30FB67D152F93AD0849E102AFBE8D45BB1' +
            'AAEDD7FE3DE664B3476250796EFE857B682100BBB931580'
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
