//react
import React from "react"
//style
import './style/sales.css'
import './style/sales-invoice.css'
//hook
import {TopContentView, DefaultView, ValidationButton} from "./hook"
//redux
import {useSelector, useDispatch} from "src/redux/store"
export default function SalesInvoice () {
    const checkout = useSelector((state:any) => state.checkout),  dispatch = useDispatch()
    return (
        <div className="window">
            <div className="subWindow">
                <div className="subWindow-container">
                    <div className="sbc-fix">
                        <div className="wsc-receipt-screen">
                            <div className="wsc-rs-content">
                                <TopContentView  checkout={checkout}/>
                                <DefaultView  checkout={checkout}/>
                                <ValidationButton dispatch={dispatch}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
