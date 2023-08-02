//react
import React, {useState} from "react"
import {useNavigate} from "react-router-dom"
//api
import {getAllProducts} from "../../../api/product"
//components
import Iconify from "../../../components/iconify"
import BasicModal from "../../../components/modal"
//redux
import {AnyAction} from "redux"
//checkout
import {updateQuantity, addToCart, validateProduct, validatePaymentMethod} from "../../../redux/slice/checkout"
//routes
import {paths} from "../../../routes/paths"

type LineProp = {
    id: string
    name: string
    price: number
    stock: number
    quantity: number
    selected: boolean
    priceTotal: string
}

export type StateProps = {
    input: string
    lines: LineProp[]
    total: string
    open?: boolean
}

interface Props {
    state: StateProps
    setState: React.Dispatch<React.SetStateAction<StateProps>>
}
interface OnChangeProps extends Props{
    input: string
    dispatch: React.Dispatch<AnyAction>
}
export const onChangeHook = (props:OnChangeProps) => {
    const {state, setState, dispatch} = props
    let input = props.input, nbr = 0
    const stateInput = state.input, eltInput = input.substring(input.length-1)
        , lines = state.lines
        , product = getAllProducts[lines.length]
        , lineSelected = lines.find(x => x.selected)
        , totalOfLinesRegistered = lines.filter(x => !x.selected).reduce(
        (prev, curr) => prev+parseFloat(curr.priceTotal), 0)
    if(lines.length!==nbr && lineSelected){
        nbr = lines.length
        const total = (totalOfLinesRegistered + parseFloat(lineSelected.priceTotal)).toFixed(2).replace('.',',')
        setState({ input, lines, total })
    }
    if(nbr){}
    if(input.endsWith('Paiement')){
        if(lines.filter(x => x.quantity > 0)[0]) setState({...state, open: true})
    }
    else if(input.endsWith('valider')){
        dispatch(validateProduct())
    }
    else {
        input = eltInput==='<' ? stateInput.substring(0, stateInput.length-1) : parseInt(stateInput) ?
            stateInput+eltInput : eltInput
        const quantity = input ? parseInt(input) : 0
            , priceTotal = (product.price*quantity).toFixed(2)
            , stock = product.quantity
            , total = (totalOfLinesRegistered + parseFloat(priceTotal)).toFixed(2).replace('.',',')
        if(lineSelected){
            if(quantity <= stock){
                dispatch(updateQuantity(quantity))
                setState({ input, lines, total })
            }
            else {
                alert(`Quantité en stock : ${stock}`)
            }
        }
    }
}
export const emptySale = <div className="sales-empty">
    <Iconify icon="solar:cart-plus-bold" width={64} />
    <p>CETTE COMMANDE EST VIDE</p>
</div>

interface changeSelectedProps extends Props{
    line: LineProp
    dispatch: React.Dispatch<AnyAction>
}
const changeSelectedLine = (props:changeSelectedProps) => {
    const {line, dispatch, state, setState} = props
    const {lines, total} = state
    dispatch(addToCart(line))
    setState({ input: `${line.quantity}`, lines, total })
}
interface SalesLineProps extends Props{
    dispatch?: React.Dispatch<AnyAction>
    liStyle?: any
}
export const SalesLine = (props:SalesLineProps) => {
    const {state, setState, dispatch, liStyle} = props
    const {lines} = state
    return (
        <ul className="sales-line">
            {lines?.map((line:LineProp, i:number) => {
                return(
                    <li className={`sales-li${line.selected && dispatch ? " selected" : ""}`} key={i} style={liStyle}
                        onClick={() => dispatch ?
                            changeSelectedLine({line, dispatch, state, setState}) : undefined}>
                            <span className="li-product-name">
                                {line.name}
                                <span></span>
                            </span>
                        <span className="li-price">{line.priceTotal?.replace('.',',')} €</span>
                        <ul className="li-info-list" key={i}>
                            <li key={i}>
                                <em>{line.quantity}</em>
                                <span> </span>
                                unité(s) à {line.price?.toString().replace('.',',')} € / unité
                            </li>
                        </ul>
                    </li>
                )
            })}
        </ul>
    )
}
export const SalesSummary = ({state}:{state:StateProps}) => {
    const {total} = state
    return (
        <div className="sales-summary">
            <div>
                <div>
                    <span>Total : </span>
                    <span> {total && total.replace('.',',')} €</span>
                </div>
            </div>
        </div>
    )
}

type PaymentMethodProp = {
    name: string
    icon: string
    selected: boolean
}

const paymentsMethod:PaymentMethodProp[] = [
    {name:"Cash", icon:"mdi:cash", selected: false},
    //{name:"Bank", icon:"iconoir:bank", selected: false},
    //{name:"Account", icon:"file-icons:autohotkey", selected: false}
]

type PaymentLineProp = {
    selected: number
    setSelected:React.Dispatch<React.SetStateAction<number>>
}

const selectPayMethod = (props:PaymentLineProp) => {
    const {selected, setSelected} = props
    setSelected(selected)
    paymentsMethod.map((x, i) => x.selected = selected === i)
}
export const PaymentLine = (props:PaymentLineProp) => {
    const {selected, setSelected} = props
    return (
        <>
            {paymentsMethod.map((payMethod,i) => {
                return (
                    <div className={`payment-line${i===0 ? " first" : ""}${i===selected ? " selected" : ""}`}
                         onClick={() => selectPayMethod({selected:i, setSelected})} key={i}>
                        <div className="pl-display">
                            <Iconify icon={payMethod.icon} sx={{verticalAlign: 'middle'}} width={50} />
                            <span className="pld-name">{payMethod.name}</span>
                        </div>
                    </div>
                )
            })}
        </>
    )
}
interface PaiementModalProps extends Props{
    dispatch: React.Dispatch<AnyAction>
}
export const PaiementModal = (props:PaiementModalProps) => {
    const {state, setState, dispatch} = props
    const [iconStyle, setIconStyle] = useState(
        {cursor: 'pointer', color: ''})
    const [selected, setSelected] = useState(-1)
    const navigate = useNavigate()
    return (
        <BasicModal open={state.open}>
            <>
                <div className="icon-cross">
                    <Iconify icon="gridicons:cross" width={30} sx={iconStyle}
                             onClick={() => {
                                 setState({...state, open: false})
                                 setIconStyle({...iconStyle, color: ''})
                             }}
                             onMouseEnter = {() => setIconStyle({...iconStyle, color: 'red'})}
                             onMouseLeave = {() => setIconStyle({...iconStyle, color: ''})}
                    />
                </div>
                <div className="main-paiement-modal">
                    <div className="mpm mode-paiement">
                        <h3>MODES DE PAIEMENT</h3>
                        <PaymentLine selected={selected} setSelected={setSelected}/>
                    </div>
                    <div className="mpm recap-commande">
                        <h3>RECAPITULATIF DE LA COMMANDE</h3>
                        <SalesLine state={state} setState={setState} liStyle={{cursor:'text'}}/>
                        <SalesSummary state={state} />
                    </div>
                </div>
                <div className="bottom-paiement">
                    <input type='button' value='Valider' disabled={selected<0}
                           onClick={() => {
                               dispatch(validatePaymentMethod({...paymentsMethod[selected], selected: undefined}))
                               navigate(paths.sales.payment)
                           }}/>
                </div>
            </>
        </BasicModal>
    )
}
