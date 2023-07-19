// @mui
import Box from '@mui/material/Box'
import Pagination, { paginationClasses } from '@mui/material/Pagination'
//
import ProductItem from './product-item';
import { ProductItemSkeleton } from './product-skeleton';
import {useState} from "react";

// ----------------------------------------------------------------------

export default function ProductList({ products, loading, ...other }) {
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(7)
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
            setMin(value>page ? min+(ecart*7) : min-(ecart*7))
            setMax(value>page ? max+(ecart*7) : max-(ecart*7))
            setPage(value)
        }
    }

  const renderList = (
    <>
      {products.filter((x,i) => i>=min && i<=max).map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </>
  )
    const nbInt = parseInt((products.length/8).toString()),
        nbProd = products.length/8 > nbInt ? nbInt + 1 : nbInt

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

      {products.length > 8 && (
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
