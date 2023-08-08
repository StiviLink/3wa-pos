//react
import {useCallback, useState} from "react"
//@mui
import Container from "@mui/material/Container"
//api
import {getAllProducts, searchProduct} from "src/api/product"
// components
import {useSettingsContext} from 'src/components/settings/context/settings-context'
//hook
import {useDebounce} from "src/hooks/use-debounce"
//routes
import {paths} from "src/routes/paths"
//
import ProductList from "../product/product-list"
import ProductSearch from "../product/product-search"

export default function SalesPointProduct(){
    const settings = useSettingsContext()

    const [searchQuery, setSearchQuery] = useState('')

    const debouncedQuery = useDebounce(searchQuery)

    const { searchResults, searchLoading } = searchProduct(debouncedQuery)

    const handleSearch = useCallback((inputValue) => {
        setSearchQuery(inputValue)
    }, [])
    return (
        <Container
            maxWidth={settings.themeStretch ? false : 'lg'}
        >
            <ProductSearch
                query={debouncedQuery}
                results={searchResults??[]}
                onSearch={handleSearch}
                loading={searchLoading}
                hrefItem={(id) => paths.product.details(id)}
            />
            <ProductList products={getAllProducts} maxi={8} addCart={true} />
        </Container>
    )
}
