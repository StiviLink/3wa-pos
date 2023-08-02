//react
import React from "react"
//components
import Iconify from "../../../components/iconify"

interface Props {
    checkout: any
}
export const TopContentView = (props: Props) => {
    const {checkout} = props, subTotal = checkout.subTotal
    return(
        <div className="wsc-rsc-top-content">
            <div className="wsc-rsc-tc-center">
                <h1>{`${subTotal}`.replace('.',',')} €</h1>
            </div>
        </div>
    )
}
const DvActions = () => {
    return (
        <div className="wsc-rsc-dv-actions">
            <h1>Comment souhaitez-vous recevoir votre reçu?</h1>
            <div className="wsc-rsc-dva-buttons">
                <div className="wsc-rsc-dva--button-print">
                    Imprimer le ticket
                    <div><Iconify icon={'uil:print'} width={20}/></div>
                </div>
            </div>
            <form className="wsc-rsc-dva-mail">
                <div className="wsc-rsc-dva-mail-input">
                    <input type="email" placeholder="Envoyez le reçu par email" />
                    <button className="wsc-rsc-dva-mi-button"></button>
                </div>
            </form>
            <div className="wsc-rsc-dva-notice"></div>
        </div>
    )
}
export const DefaultView = () => {
    return(
        <div className="wsc-rsc-default-view">
            <DvActions />
            <div className="wsc-rsc-dv-container"></div>
        </div>
    )
}
export const ValidationButton = () => {
    return(
        <div className="wsc-rsc-validation-button">

        </div>
    )
}
