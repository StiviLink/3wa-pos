import React from 'react';
import {Typography, Pagination, Stack} from '@mui/material'

const PaginationComponent = (props= {pages:0}) => {
    const pages = props.pages
    const [page, setPage] = React.useState(1)
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => setPage(value)
    if(pages>0)
        return (
            <Stack spacing={2}>
                <Typography>Page: {page}</Typography>
                <Pagination count={pages} page={page} onChange={handleChange} />
            </Stack>
        )
}

export default PaginationComponent
