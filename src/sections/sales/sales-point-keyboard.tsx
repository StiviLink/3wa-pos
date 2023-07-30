//React
import React, {ChangeEvent, useEffect, useState} from "react"
//keyboard
import {KeyboardReactInterface, KeyboardWrapper} from "./keyboard-wrapper"
//hook
import {StateProps, onChangeHook, emptySale, SalesLine, SalesSummary, PaiementModal} from "./hook"
//redux
import {resetCart} from "../../redux/slice/checkout"
import {useSelector, useDispatch} from "../../redux/store"

export default function SalesPointKeyboard(){
    let keyboard : KeyboardReactInterface
    const checkout = useSelector((state:any) => state.checkout), cart = checkout.cart, dispatch = useDispatch(),
        subTotal = checkout.subTotal, select = cart.find((x:any) => x.selected), input = `${select?select.quantity??"":""}`
    useEffect(() => {
        dispatch(resetCart())
    }, [])

    const [state, setState] = useState({input, lines: cart,
        total: `${subTotal ? subTotal.toFixed(2) : 0}`} as StateProps)
    useEffect(() => console.log('cart', cart), [cart])
    useEffect(() => console.log('subTotal', subTotal), [subTotal])
    useEffect(() => setState(state => {return {...state, input, lines: cart,
        total: subTotal ? subTotal.toFixed(2):0}}), [cart, input, subTotal])

    const onChange = (input: string) => {
        console.log("Input string", input)
        onChangeHook({input, state, setState, dispatch})
        console.log("Input changed", input)
    }

    const onChangeInput = (event: ChangeEvent<HTMLInputElement>): void => {
        const input = event.target.value, lines = state.lines, total = state.total
        setState({ input, lines, total })
        keyboard.setInput(input)
    }

    return (
        <div className="sales-keyboard">
            <PaiementModal state={state} setState={setState}/>
            <div
                className="sales-input"
                onChange={onChangeInput}
            >
                {(state.lines[0] && (
                    <div className="sales-order">
                        <SalesLine state={state} setState={setState} dispatch={dispatch}/>
                        <SalesSummary state={state}/>
                    </div>
                )) || emptySale}
            </div>
            <KeyboardWrapper
                keyboardRef={r => (keyboard = r)}
                onChange={onChange}
            />
        </div>
    )
}
