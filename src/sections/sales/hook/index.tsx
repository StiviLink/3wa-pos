//react
import React from "react"
//api
import {getAllProducts} from "../../../api/product"
//components
import Iconify from "../../../components/iconify"
//redux
import {AnyAction} from "redux"
//checkout
import {updateQuantity, addToCart} from "../../../redux/slice/checkout"

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
    console.log('nbr', nbr)
    if(input.endsWith('Paiement')){

    }
    else if(input.endsWith('valider')){
        if(lineSelected){
            const indexSelected = lines.indexOf(lineSelected)
            console.log('indexSelected', indexSelected)
            if(lineSelected.quantity>0){
                lineSelected.selected = false
                input = ""
                const total = (parseFloat(lineSelected.priceTotal)+totalOfLinesRegistered).toFixed(2)
                    .replace('.',',')
                setState({ input, lines, total })
            }
            else {
                lines.splice(indexSelected, 1)
                input = ""
                const total = totalOfLinesRegistered.toFixed(2).replace('.',',')
                setState({ input, lines, total })
            }
        }
    }
    else {
        input = eltInput==='<' ? stateInput.substring(0, stateInput.length-1) : stateInput+eltInput
        const quantity = input ? parseInt(input) : 0
            , priceTotal = (product.price*quantity).toFixed(2)
            , stock = product.quantity
            , total = (totalOfLinesRegistered + parseFloat(priceTotal)).toFixed(2).replace('.',',')
        if(lineSelected){
            console.log('lines', lines)
            console.log('lineSelected', lineSelected)
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
    dispatch: React.Dispatch<AnyAction>
}
export const SalesLine = (props:SalesLineProps) => {
    const {state, setState, dispatch} = props
    const {lines} = state
    return (
        <ul className="sales-line">
            {lines?.map((line:LineProp, i:number) => {
                return(
                    <li className={`sales-li${line.selected ? " selected" : ""}`} key={i}
                        onClick={() => changeSelectedLine({line, dispatch, state, setState})}>
                            <span className="li-product-name">
                                {line.name}
                                <span></span>
                            </span>
                        <span className="li-price">{line.priceTotal.replace('.',',')} €</span>
                        <ul className="li-info-list" key={i}>
                            <li key={i}>
                                <em>{line.quantity}</em>
                                <span> </span>
                                unités à {line.price.toString().replace('.',',')} € / unité
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
                    <span> {total.replace('.',',')} €</span>
                </div>
            </div>
        </div>
    )
}
