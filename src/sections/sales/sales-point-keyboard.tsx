//React
import React, {ChangeEvent, useEffect, useState} from "react"
//keyboard
import {KeyboardReactInterface, KeyboardWrapper} from "./keyboard-wrapper"
//api
import {getAllProducts} from "../../api/product"
//hook
import {StateProps, onChangeHook, emptySale, SalesLine, SalesSummary} from "./hook"

export default function SalesPointKeyboard(){
    let keyboard : KeyboardReactInterface
    useEffect(() => console.log('products', getAllProducts), [])
    const [state, setState] = useState({input: "", lines: [], total: "0"} as StateProps)

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
