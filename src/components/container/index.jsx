import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import ProductLayout from "../../layout/product"
const ContainerComponent = ({childs=[], maxWidth="xl", fixed=false}) => {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth={maxWidth} fixed={fixed}>
                <ProductLayout />
                {//childs.map(x => x)
                     }
            </Container>
        </React.Fragment>
    )
}

export default ContainerComponent
