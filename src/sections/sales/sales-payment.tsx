//react
import React from "react"
//style
import './style/sales.css'
import './style/sales-payment.css'
//hook
import {TopContent, MainContent} from "./hook"
//redux
import {useSelector, useDispatch} from "src/redux/store"
export default function SalesPayment () {
    const checkout = useSelector((state:any) => state.checkout),  dispatch = useDispatch()
    return (
        <div className="window">
            <div className="subWindow">
                <div className="subWindow-container">
                    <div className="sbc-fix">
                        <div className="wc-payment">
                            <div className="wcp-content">
                                <TopContent />
                                <MainContent  checkout={checkout} dispatch={dispatch}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
