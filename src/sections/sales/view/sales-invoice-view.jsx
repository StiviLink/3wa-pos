//@mui
import Container from "@mui/material/Container"
//
import SalesInvoice from "../sales-invoice"

export default function SalesInvoiceView(){

    return (
        <Container
            sx={{
                width: '100%',
                height: '100%',
                display: 'table-row'
            }}
        >
            <SalesInvoice />
        </Container>
    )
}
