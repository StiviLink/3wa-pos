//@mui
import Container from "@mui/material/Container"
//List
import ProductList from "../product/product-list"
//api
import {getAllProducts} from "src/api/product"
// components
import {useSettingsContext} from 'src/components/settings/context/settings-context'

export default function SalesPointProduct(){
    const settings = useSettingsContext()

    return (
        <Container
            maxWidth={settings.themeStretch ? false : 'lg'}
            sx={{
                mb: 10
            }}
        >
            <ProductList products={getAllProducts} />
        </Container>
    )
}
