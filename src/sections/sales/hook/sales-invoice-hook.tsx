//react
import React, {useState} from "react"
import {useNavigate} from "react-router-dom"
import {AnyAction} from "redux"
//components
import Iconify from "src/components/iconify"
//redux
import {resetCart} from "src/redux/slice/checkout"
//routes
import {paths} from "src/routes/paths"
//hook
import {htmlStringToPdf, axiosMailSend} from "../../hook"
import useUser from "../../hook/use-user"
//
import Logo from "../../../components/logo/logo"

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
const printClick = async () => {
    const receipt = document.getElementById("receipt")
    if(receipt){
        const pdf = await htmlStringToPdf(receipt)
        pdf.autoPrint({variant: 'non-conform'})
        pdf.save(`receipt_${new Date().toISOString()}.pdf`)
    }
}
const sendMail = async (email:string) => {
    const failed = document.getElementById("failed")
    if(failed){
        if(!email.match('@.*.[.]..*$')) {
            failed.style.color = '#a85959'
            failed.style.display = 'inline'
        }
        else {
            const receipt = document.getElementById("receipt")
            if(receipt){
                const pdf = await htmlStringToPdf(receipt)
                    , output = pdf.output("dataurlstring")
                    .replace('data:application/pdf;filename=generated.pdf;base64,','')
                const data = {
                    Recipients: [{Email: ""+email}],
                    Content: {
                        Body: [
                            {
                                ContentType: "HTML",
                                Content: receipt?.innerHTML,
                                Charset: "UTF-8"
                            }
                        ],
                        Attachments: [
                            {
                                BinaryContent: output,
                                Name: "receipt.pdf"
                            }
                        ],
                        From: "Stivi Linkid <stivi-linkid@hotmail.com>",
                        Subject: "Reçu du " + new Date().toLocaleString("fr-FR")
                    }
                }
                console.log("data", data)
                try{
                    const axiosResponse = await axiosMailSend(data)
                    console.log('axiosResponse', axiosResponse)
                    failed.innerText = 'Email envoyé'
                    failed.style.color = 'green'
                    failed.style.display = 'inline'
                }
                catch (err) {
                    console.error('err', err)
                    // @ts-ignore
                    failed.innerText = err
                    failed.style.color = '#a85959'
                    failed.style.display = 'inline'
                }
            }
        }
    }
}
const DvActions = () => {
    const [email, setEmail] = useState('')
    return (
        <div className="wsc-rsc-dv-actions">
            <h1>Comment souhaitez-vous recevoir votre reçu?</h1>
            <div className="wsc-rsc-dva-buttons">
                <div className="wsc-rsc-dva--button-print" onClick={()=>printClick().then()}>
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
    const {currentUser} = useUser()
    return(
        <div className="wsc-rsc-dv-container" >
            <div className="wsc-rsc-dvc-receipt"  id="receipt"
                 style={{textAlign: 'left', width: '300px', backgroundColor: 'white', margin: '20px',
                     fontSize: '16px', padding: '15px 15px 30px', display: 'inline-block',
                     border: 'solid 1px gainsboro', borderRadius: '3px', overflow: 'hidden'}}>
                <Logo sx={{width: '50%',display: 'block', margin: '0 auto'}} />
                <br/>
                <div className="wsc-rsc-dvc-receipt-contact" style={{textAlign: 'center', fontSize: '75%'}}>
                    <div>{currentUser.name}</div>
                    <div>{currentUser.email}</div>
                    <div>
                        <div>--------------------------------</div>
                        <div>Servi par {currentUser.name}</div>
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
                <div className="wsc-rsc-dvc-before-footer"></div>
                <div className="wsc-rsc-dvc-after-footer"></div>
                <br/>
                <br/>
                <div className="wsc-rsc-dvc-receipt-order" style={{textAlign: 'center'}}>
                    <div>Commande {currentUser.ordersIds[currentUser.ordersIds.length-1]}</div>
                    <div>{new Date().toLocaleString()}</div>
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
export const ValidationButton = ({dispatch}:{dispatch: React.Dispatch<AnyAction>}) => {
    const navigate = useNavigate()
    return(
        <div className="wsc-rsc-validation-button">
            <div className="wcplc-button highlight" onClick={() => {
                dispatch(resetCart())
                navigate(paths.dashboard.sales.point)
            }}>
                <div className="wcplc-button-circle">
                    <Iconify icon={'ci:chevron-right'} width={30}/>
                </div>
                <span>Nouvelle Commande</span>
            </div>
        </div>
    )
}
