import React, {ChangeEvent, useState} from "react"
import {KeyboardReactInterface, KeyboardWrapper} from "./keyboard-wrapper"
import Iconify from "../../components/iconify"
import {getAllProducts} from "../../api/product"

type LineProp = {
    name: string
    price: number
    stock: number
    quantity: number
    selected: boolean
    priceTotal: string
}

type StateProps = {
    input: string
    lines: LineProp[]
    total: string
}
export default function SalesPointKeyboard(){
    let keyboard : KeyboardReactInterface
    console.log('products', getAllProducts)
    const [state, setState] = useState({input: "", lines: [], total: "0"} as StateProps)

    const onChange = (input: string) => {
        console.log("Input string", input)
        const stateInput = state.input, lines = state.lines, totalInput = state.total
            , eltInput = input.substring(input.length-1), product = getAllProducts[lines.length]
            , lineSelected = lines.find(x => x.selected)
        if(input.endsWith('Paiement')){

        }
        else if(input.endsWith('valider')){
            if(lineSelected){
                lineSelected.selected = false
                input = ""
                const total = (parseFloat(lineSelected.priceTotal)+parseFloat(totalInput)).toFixed(2)
                    .replace('.',',')
                setState({ input, lines, total })
            }
        }
        else {
            input = eltInput==='<' ? stateInput.substring(0, stateInput.length-1) : stateInput+eltInput
            const quantity = parseInt(input), priceTotal = (product.price*quantity).toFixed(2)
                , price = product.price, stock = product.quantity
            if(!lineSelected){
                if(quantity<=product.quantity)
                    lines.push({name: product.name, price, stock, quantity, selected: true, priceTotal})
            }
            else {
                if(quantity <= stock){
                    lineSelected.quantity = quantity
                    lineSelected.priceTotal = priceTotal
                }
            }
            setState({ input, lines, total:totalInput })
        }
        console.log("Input changed", input)
    }

    const onChangeInput = (event: ChangeEvent<HTMLInputElement>): void => {
        const input = event.target.value, lines = state.lines, total = state.total
        setState({ input, lines, total })
        keyboard.setInput(input)
    }

    const emptySale = <div className="sales-empty">
        <Iconify icon="solar:cart-plus-bold" width={64} />
        <p>CETTE COMMANDE EST VIDE</p>
    </div>

    const changeSelectedLine = (i:number) => {
        const {lines, total} = state,
            lineSelected = lines.find((x,n) => n===i)
        if(lineSelected){
            const input = lineSelected.quantity.toString()
            lines.map(x => x.selected = false)
            lineSelected.selected = true
            setState({ input, lines, total })
        }
    }

    const SalesLine = () => {
        const {lines} = state
        return (
            <ul className="sales-line">
                {lines?.map((line:LineProp, i:number) => {
                    return(
                        <>
                            <li className={`sales-li${line.selected ? " selected" : ""}`} key={i}
                                onClick={() => changeSelectedLine(i)}>
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
                        </>
                        )
                })}
            </ul>
        )
    }

    const SalesSummary = () => {
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

    return (
        <div className="sales-keyboard">
            <div
                className="sales-input"
                onChange={onChangeInput}
            >
                {(state.lines[0] && (
                    <div className="sales-order">
                        <SalesLine/>
                        <SalesSummary/>
                    </div>
                ))|| emptySale}
            </div>
            <KeyboardWrapper
                keyboardRef={r => (keyboard = r)}
                onChange={onChange}
            />
        </div>
    )
}
