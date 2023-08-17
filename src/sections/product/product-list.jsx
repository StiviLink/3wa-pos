// @mui
import Box from '@mui/material/Box'
import Pagination, { paginationClasses } from '@mui/material/Pagination'
//
import ProductItem from './product-item';
import { ProductItemSkeleton } from './product-skeleton';
import {useState} from "react";

// ----------------------------------------------------------------------

export default function ProductList({ products, loading, maxi, addCart, ...other }) {
    if(!maxi) maxi = 8
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(maxi-1)
    const [page, setPage] = useState(1)
  const renderSkeleton = (
    <>
      {[...Array(8)].map((_, index) => (
        <ProductItemSkeleton key={index} />
      ))}
    </>
  )

    const handleChange = (e, value) => {
        if(value!==page){
            const ecart = value>page ? value-page : page-value
            setMin(value>page ? min+(ecart*(maxi-1)) : min-(ecart*(maxi-1)))
            setMax(value>page ? max+(ecart*(maxi-1)) : max-(ecart*(maxi-1)))
            setPage(value)
        }
    }

  const renderList = (
    <>
      {products.filter((x,i) => i>=min && i<=max).map((product) => (
        <ProductItem key={product.id} product={product} addCart={addCart} />
      ))}
    </>
  )
    const nbInt = parseInt((products.length/maxi).toString()),
        nbProd = products.length/maxi > nbInt ? nbInt + 1 : nbInt

  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        {...other}
      >
        {loading ? renderSkeleton : renderList}
      </Box>

      {products.length > maxi && (
        <Pagination
          count={nbProd}
          onChange={handleChange}
          sx={{
            mt: 8,
            [`& .${paginationClasses.ul}`]: {
              justifyContent: 'center',
            },
          }}
        />
      )}
    </>
  );
}
