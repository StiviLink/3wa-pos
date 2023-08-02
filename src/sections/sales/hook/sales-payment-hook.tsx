//react
import React from "react"
import {useNavigate} from "react-router-dom"
//redux
import {AnyAction} from "redux"
//component
import Iconify from "../../../components/iconify"
import {addToMoney, deleteMoney} from "../../../redux/slice/checkout"
import {paths} from "../../../routes/paths";
export const TopContent = () => {
    return (
        <div className="wcp-top-content">
            <div className="wcptc-button">
                <span className="wcptcb-text">{"<<"} Retour</span>
            </div>
            <div className="wcptc-center">
                <h1>Paiement</h1>
            </div>
        </div>
    )
}
interface Props {
    checkout: any
    dispatch: React.Dispatch<AnyAction>
}
type Money = {
    name: string
    quantity: number
    selected: boolean
}
type PayMethod = {
    name: string
    icon: string
    selected: boolean
}
interface PmcProps {
    money: Money[]
    payMethod: PayMethod
    dispatch: React.Dispatch<AnyAction>
}
const PaymentMethodContainer = (props:PmcProps) => {
    const {money, payMethod, dispatch} = props
    return (
        <div className="wcplc-payment-method-container">
            <div>
                <p className="wcplc-pmc-pm-tittle">Mode de paiement sélectionné</p>
                <div className="wcplc-pmc-pm-detail">
                    <div className="wcplc-pmc-pmd-display">
                        <Iconify icon={payMethod.icon} sx={{verticalAlign: 'middle'}} width={50} />
                        <span className="pld-name">{payMethod.name}</span>
                    </div>
                </div>
            </div>
            <div className="wcplc-pmc-payment-lines">
                {money.map((mon, i) => {
                    return (
                        <div className={`wcplc-pmc-pl-display${mon.selected ? " selected" : ""}`} key={i}>
                            <div className="wcplc-pmc-pld-billet">{mon.name}</div>
                            <div className="wcplc-pmc-pld-quantity">{mon.quantity}</div>
                            <div className="wcplc-pmc-pld-delete">
                                <Iconify icon={'typcn:delete'} width={20} onClick={() => dispatch(deleteMoney(mon.name))}/>
                            </div>
                        </div>
                    )
                })}
                <p className="wcplc-pmc-pm-tittle">Résumé</p>
            </div>
        </div>
    )
}
const LeftContent = (props:Props) => {
    const {checkout, dispatch} = props,
        {total, subTotal, money, paymentMethod} = checkout, navigate = useNavigate()
    const onClickValid = () => {
        if(total>=subTotal) navigate(paths.sales.invoice)
    }
    return (
        <div className="wcp-left-content">
            <PaymentMethodContainer money={money} payMethod={paymentMethod} dispatch={dispatch}/>
            <div className={`wcplc-button${total>=subTotal ? " highlight" : ""}`} onClick={onClickValid}>
                <div className="wcplc-button-circle">
                    <Iconify icon={'ci:chevron-right'} width={30}/>
                </div>
                <span>Valider</span>
            </div>
        </div>
    )
}
interface PlProps {
    subTotal: number
    total: number
}
const PaymentLines = (props:PlProps) => {
    const {subTotal,total} = props
    const restant = subTotal > total ? `${(subTotal - total).toFixed(2)}` : '0,00',
        montantDu = subTotal > parseFloat(restant) ? `${(subTotal - parseFloat(restant)).toFixed(2)}` : '0,00',
        rendu = subTotal < total ? `${(-subTotal + total).toFixed(2)}` : '0,00'
    return(
        <section className="wcp-cc-payment-lines">
            <div>
                <div className="wcp-cc-pl-payment-status">
                    <div>
                        <div>
                            <span className="wcp-ccp-lps-label">Restant</span>
                            <span>{restant.replace('.',',')} €</span>
                        </div>
                        <div className="wcp-ccp-lps-total-due">
                            <span className="wcp-ccp-lps-label">Montant dû</span>
                            <span>{`${montantDu}`.replace('.',',')} €</span>
                        </div>
                    </div>
                    <div>
                        <div>
                            <span className="wcp-ccp-lps-label">Rendu</span>
                            <span>{`${rendu}`.replace('.',',')} €</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
interface PbProps {
    dispatch: React.Dispatch<AnyAction>
}
const PaymentButtons = (props:PbProps) => {
    const {dispatch} = props
    const allButtons = [
        "200€","100€","50€","20€",
        "10€","5€","1€","50c",
        "20c","10c","5c","1c"
    ]
    return(
        <div className="wcp-cc-payment-buttons">
            <section className="wcp-cc-pb-container">
                <div className="wxp-cc-pbc-numpad">
                    {allButtons.map((x,i) => <button className="wxp-ccp-bcn-button" key={i}
                                                     onClick={() => dispatch(addToMoney(x))}>
                        {x}
                    </button>
                    )}
                </div>
            </section>
        </div>
    )
}
const CenterContent = (props:Props) => {
    const {checkout, dispatch} = props, subTotal = checkout.subTotal,
        total = checkout.total
    return (
        <div className="wcp-center-content">
            <PaymentLines  subTotal={subTotal} total={total}/>
            <PaymentButtons  dispatch={dispatch}/>
        </div>
    )
}
export const MainContent = (props:Props) => {
    const {checkout, dispatch} = props
    return (
        <div className="wcp-main-content">
            <LeftContent  checkout={checkout} dispatch={dispatch}/>
            <CenterContent  checkout={checkout} dispatch={dispatch}/>
            <div className="wcp-right-content"></div>
        </div>
    )
}
