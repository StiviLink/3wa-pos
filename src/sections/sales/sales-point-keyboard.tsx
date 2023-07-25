//React
import React, {ChangeEvent, useEffect, useState} from "react"
//keyboard
import {KeyboardReactInterface, KeyboardWrapper} from "./keyboard-wrapper"
//hook
import {StateProps, onChangeHook, emptySale, SalesLine, SalesSummary} from "./hook"
//redux
import {resetCart} from "../../redux/slice/checkout"
import {useSelector, useDispatch} from "../../redux/store"

export default function SalesPointKeyboard(){
    let keyboard : KeyboardReactInterface
    const checkout = useSelector((state:any) => state.checkout), cart = checkout.cart, dispatch = useDispatch()
    useEffect(() => checkout.onResetAll, [])
    useEffect(() => {
        dispatch(resetCart())
    }, [])

    useEffect(() => console.log('cart', cart), [cart])
    useEffect(() => setState(state => {return {...state, lines: cart}}), [cart])
    const [state, setState] = useState({input: "", lines: cart, total: "0"} as StateProps)

    const onChange = (input: string) => {
        console.log("Input string", input)
        onChangeHook({input, state, setState})
        console.log("Input changed", input)
    }

    const onChangeInput = (event: ChangeEvent<HTMLInputElement>): void => {
        const input = event.target.value, lines = state.lines, total = state.total
        setState({ input, lines, total })
        keyboard.setInput(input)
    }

    return (
        <div className="sales-keyboard">
            <div
                className="sales-input"
                onChange={onChangeInput}
            >
                {(state.lines[0] && (
                    <div className="sales-order">
                        <SalesLine state={state} setState={setState}/>
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
