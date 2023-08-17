//react
import React, {useState} from "react"
//node-modules
import { Client, SendEmailV3_1, LibraryResponse } from 'node-mailjet'
//components
import Iconify from "../../../components/iconify"


const mailjet = new Client({
    apiKey: '98727bc19c9602ac2203cdd4261d652d',
    apiToken: '554c78f99f8822a04108ff37b6c1b558',
    options: {
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    },
    config: {host: 'cors-anywhere.herokuapp.com/https://api.mailjet.com'}
})
interface Props {
    checkout: any
}
export const TopContentView = (props: Props) => {
    const {checkout} = props, subTotal = checkout.subTotal
    return(
        <div className="wsc-rsc-top-content">
            <div className="wsc-rsc-tc-center">
                <h1>{`${subTotal.toFixed(2)}`.replace('.',',')} €</h1>
            </div>
        </div>
    )
}
const printClick = () => {
    const divContents = document.getElementById("receipt")?.innerHTML,
        a = window.open('', '', 'height=750, width=750')
    a?.document.write('<html lang="fr">')
    a?.document.write(`<head>
<title>Receipt</title>
<link rel="stylesheet" type="text/css" href="../style/sales-invoice.css"/>
</head>`)
    a?.document.write('<body>')
    a?.document.write(divContents??"")
    a?.document.write('</body></html>')
    a?.document.close()
    return a?.print()
}
const sendMail = (email:string) => {
    const failed = document.getElementById("failed")
    console.log('sendMail email', email)
    if(failed){
        if(!email.match('@.*.[.]..*$')) {
            failed.style.color = '#a85959'
            failed.style.display = 'inline'
        }
        else {

            (async () => {
                const data: SendEmailV3_1.Body = {
                    Messages: [
                        {
                            From: {
                                Email: 'pilot@test.com',
                            },
                            To: [
                                {
                                    Email: email,
                                },
                            ],
                            TemplateErrorReporting: {
                                Email: 'reporter@test.com',
                                Name: 'Reporter',
                            },
                            Subject: 'Your email flight plan!',
                            HTMLPart: '<h3>Dear passenger, welcome to Mailjet!</h3><br />May the delivery force be with you!',
                            TextPart: 'Dear passenger, welcome to Mailjet! May the delivery force be with you!',
                        },
                    ],
                }

                console.log('mailjet', mailjet)
                const result: LibraryResponse<SendEmailV3_1.Response> = await mailjet
                    .post('send', { version: 'v3.1', host: 'api.mailjet.com',  })
                    .request(data)
                console.log('result', result)
            })()
            const request = mailjet
                .post('send', { version: 'v3.1' })
                .request({
                    Messages: [
                        {
                            From: {
                                Email: "test@mail.com",
                                Name: "Test Mail"
                            },
                            To: [
                                {
                                    Email: email,
                                    Name: "Stivi"
                                }
                            ],
                            Subject: "Facture lors de l'achat",
                            TextPart: "Voici votre facture lors de l'achat éffectué récemment",
                            HTMLPart: "<h3>Dear passenger 1, welcome to <a href=\"https://www.mailjet.com/\">" +
                                "Mailjet</a>!</h3><br />May the delivery force be with you!"
                        }
                    ]
                })
            request
                .then(result => {
                    console.log('result', result)
                    console.log('result body', result.body)
                    failed.innerText = 'Email envoyé'
                    failed.style.color = 'green'
                    failed.style.display = 'inline'
                })
                .catch(err => {
                    console.log('error', err)
                    console.log('error code', err.statusCode)
                    failed.innerText = err.message
                    failed.style.color = '#a85959'
                    failed.style.display = 'inline'
                })
        }
    }
}
const DvActions = () => {
    const [email, setEmail] = useState('')
    return (
        <div className="wsc-rsc-dv-actions">
            <h1>Comment souhaitez-vous recevoir votre reçu?</h1>
            <div className="wsc-rsc-dva-buttons">
                <div className="wsc-rsc-dva--button-print" onClick={printClick}>
                    Imprimer le ticket
                    <div><Iconify icon='uil:print' width={20}/></div>
                </div>
            </div>
            <form className="wsc-rsc-dva-mail">
                <div className="wsc-rsc-dva-mail-input">
                    <input type="email" placeholder="Envoyez le reçu par email" value={email}
                           onChange={(e) => setEmail(e.currentTarget.value)}/>
                    <div className={`wsc-rsc-dva-mi-button${email.match('@.*.[.]..*$') ? " highlight" : ""}`}
                            onClick={() => sendMail(email)}>
                        <Iconify icon='entypo:paper-plane' width={20}/>
                    </div>
                </div>
            </form>
            <div className="wsc-rsc-dva-notice">
                <div className="failed" id="failed">Email invalide.</div>
            </div>
        </div>
    )
}
const DvContainer = (props: Props) => {
    const {checkout} = props
    const {cart, subTotal, total, paymentMethod} = checkout
    return(
        <div className="wsc-rsc-dv-container" >
            <div className="wsc-rsc-dvc-receipt"  id="receipt"
                 style={{textAlign: 'left', width: '300px', backgroundColor: 'white', margin: '20px',
                     fontSize: '16px', padding: '15px 15px 30px', display: 'inline-block',
                     border: 'solid 1px gainsboro', borderRadius: '3px', overflow: 'hidden'}}>
                <img className="wsc-rsc-dvc-receipt-logo" style={{width: '50%',display: 'block', margin: '0 auto'}} alt="Logo" src="data:image/png;base64,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"/>
                <br/>
                <div className="wsc-rsc-dvc-receipt-contact" style={{textAlign: 'center', fontSize: '75%'}}>
                    <div>null</div>
                    <div>TVA:FR18837947209</div>
                    <div>nulldl@yopmail.fr</div>
                    <div>https://yopmail.fr</div>
                    <div>
                        <div>--------------------------------</div>
                        <div>Servi par null fff</div>
                    </div>
                </div>
                <br/>
                <br/>
                <div className="wsc-rsc-dvc-receipt-lines">
                    {cart.map((product:any, i:number) => {
                        return (
                            <div key={i}>
                                <div>{product.name}</div>
                                <span></span>
                                <div className="wsc-rsc-dvc-rl-left-padding" style={{paddingLeft: '2em'}}>
                                    {product.quantity} x {`${product.price}`.replace('.',',')} €
                                    <span className="wsc-rsc-dvc-rl-right-align" style={{float: 'right'}}>
                                        {`${(product.quantity*product.price).toFixed(2)}`
                                            .replace('.',',')}
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="wsc-rsc-dvc-receipt-right" style={{float: 'right'}}>--------</div>
                <br/>
                <div className="wsc-rsc-dvc-receipt-amount" style={{fontSize: '125%', paddingLeft: '6em'}}>
                    TOTAL
                    <span className="wsc-rsc-dvc-receipt-right" style={{float: 'right'}}>
                        {`${subTotal.toFixed(2)}`.replace('.',',')}&nbsp;€
                    </span>
                </div>
                <br/>
                <br/>
                <div>
                    {paymentMethod.name}
                    <div className="wsc-rsc-dvc-receipt-right"  style={{float: 'right'}}>
                        {`${total.toFixed(2)}`.replace('.',',')}
                    </div>
                </div>
                <br/>
                <div className="wsc-rsc-dvc-receipt-amount change">
                    RENDU
                    <div className="wsc-rsc-dvc-receipt-right"  style={{float: 'right'}}>
                        {total>subTotal ?
                            `${(total - subTotal).toFixed(2)}`.replace('.',',') : "0,00"
                        } €
                    </div>
                </div>
                <br/>
                <div>20% G<span className="wsc-rsc-dvc-receipt-right" style={{float: 'right'}}>3,00</span></div>
                <div className="wsc-rsc-dvc-receipt-taxes">
                    Total des taxes
                    <span className="wsc-rsc-dvc-receipt-right"  style={{float: 'right'}}>3,00 €</span>
                </div>
                <div className="wsc-rsc-dvc-before-footer"></div>
                <div className="wsc-rsc-dvc-after-footer"></div>
                <br/>
                <br/>
                <div className="wsc-rsc-dvc-receipt-order" style={{textAlign: 'center'}}>
                    <div>Commande 00009-002-0001</div>
                    <div>03/08/2023 09:35:04</div>
                </div>
            </div>
        </div>
    )
}
export const DefaultView = (props:Props) => {
    const {checkout} = props
    return(
        <div className="wsc-rsc-default-view">
            <DvActions />
            <DvContainer  checkout={checkout}/>
        </div>
    )
}
export const ValidationButton = () => {
    return(
        <div className="wsc-rsc-validation-button">
            <div className="wcplc-button highlight">
                <div className="wcplc-button-circle">
                    <Iconify icon={'ci:chevron-right'} width={30}/>
                </div>
                <span>Nouvelle Commande</span>
            </div>
        </div>
    )
}
