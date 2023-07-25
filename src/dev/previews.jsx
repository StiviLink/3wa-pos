import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import SalesPointProduct from "../sections/sales/sales-point-products";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/SalesPointProduct">
                <SalesPointProduct/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews
