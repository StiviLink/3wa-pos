//@mui
import Container from "@mui/material/Container"
//
import SalesPointProduct from "../sales-point-products"
import SalesPointKeyboard from "../sales-point-keyboard"

export default function SalesPointView(){

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'row'
            }}
        >
            <SalesPointKeyboard />
            <SalesPointProduct />
        </Container>
    )
}
