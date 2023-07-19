//react
import React from "react"
//api
import {getAllProducts} from "../../../api/product"
//components
import Iconify from "../../../components/iconify"

type LineProp = {
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
}
export const onChangeHook = (props:OnChangeProps) => {
    const {state, setState} = props
    let input = props.input
    const stateInput = state.input, eltInput = input.substring(input.length-1)
        , lines = state.lines
        , product = getAllProducts[lines.length]
        , lineSelected = lines.find(x => x.selected)
        , totalOfLinesRegistered = lines.filter(x => !x.selected).reduce(
        (prev, curr) => prev+parseFloat(curr.priceTotal), 0)
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
            , price = product.price, stock = product.quantity
            , total = (totalOfLinesRegistered + parseFloat(priceTotal)).toFixed(2).replace('.',',')
        if(!lineSelected){
            if(quantity<=product.quantity)
                lines.push({name: product.name, price, stock, quantity, selected: true, priceTotal})
            setState({ input, lines, total })
        }
        else {
            if(quantity <= stock){
                lineSelected.quantity = quantity
                lineSelected.priceTotal = priceTotal
                setState({ input, lines, total })
            }
        }
    }
}
export const emptySale = <div className="sales-empty">
    <Iconify icon="solar:cart-plus-bold" width={64} />
    <p>CETTE COMMANDE EST VIDE</p>
</div>

interface changeSelectedProps extends Props{
    i: number
}
const changeSelectedLine = (props:changeSelectedProps) => {
    const {i, state, setState} = props
    const {lines, total} = state,
        lineSelected = lines.find((x,n) => n===i)
    if(lineSelected){
        const input = lineSelected.quantity.toString()
        lines.map(x => x.selected = false)
        lineSelected.selected = true
        setState({ input, lines, total })
    }
}
export const SalesLine = (props:Props) => {
    const {state, setState} = props
    const {lines} = state
    return (
        <ul className="sales-line">
            {lines?.map((line:LineProp, i:number) => {
                return(
                    <li className={`sales-li${line.selected ? " selected" : ""}`} key={i}
                        onClick={() => changeSelectedLine({i, state, setState})}>
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
                    <span> {total} €</span>
                </div>
            </div>
        </div>
    )
}
