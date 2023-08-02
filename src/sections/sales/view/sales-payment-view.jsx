//@mui
import Container from "@mui/material/Container"
//
import SalesPayment from "../sales-payment"

export default function SalesPaymentView(){

    return (
        <Container
            sx={{
                width: '100%',
                height: '100%',
                display: 'table-row'
            }}
        >
            <SalesPayment />
        </Container>
    )
}
