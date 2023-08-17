import isEqual from 'lodash/isEqual'
import { useState, useEffect, useCallback } from 'react'
// @mui
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Container from '@mui/material/Container'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
// routes
import { paths } from 'src/routes/paths'
import { useRouter } from 'src/routes/hook'
// _mock
import { PRODUCT_STOCK_OPTIONS } from 'src/_mock/_product'
// components
import { useSettingsContext } from 'src/components/settings/context/settings-context'
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableSkeleton,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from 'src/components/table'
import Scrollbar from 'src/components/scrollbar'
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs'
//
import ProductTableRow from '../product-table-row';
import ProductTableToolbar from '../product-table-toolbar';
import ProductTableFiltersResult from '../product-table-filters-result';
import useProducts from "../../hook/use-products";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Product' },
  { id: 'createdAt', label: 'Create at', width: 160 },
  { id: 'inventoryType', label: 'Stock', width: 160 },
  { id: 'price', label: 'Price', width: 140 },
  { id: 'publish', label: 'Publish', width: 110 },
  { id: '', width: 88 },
]

const PUBLISH_OPTIONS = [
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
]

const defaultFilters = {
  name: '',
  publish: [],
  stock: [],
}

// ----------------------------------------------------------------------

export default function ProductListView() {
  const router = useRouter()

  const table = useTable()

  const settings = useSettingsContext()

  const [tableData, setTableData] = useState([])

  const [filters, setFilters] = useState(defaultFilters)

  const {allProducts} = useProducts()

  const { products, productsLoading, productsEmpty } = {
    products: allProducts,
    productLoading: false,
    productsEmpty: false
  }

  useEffect(() => {
    if (products.length) {
      setTableData(products);
    }
  }, [products])
  useEffect(() => console.info('allProducts[0] images', allProducts[0].images), [allProducts])

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  })

  const denseHeight = table.dense ? 60 : 80

  const canReset = !isEqual(defaultFilters, filters)

  const notFound = (!dataFiltered.length && canReset) || productsEmpty

  const handleFilters = useCallback(
    (name, value) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  )

  const handleViewRow = useCallback(
    (id) => {
      router.push(paths.dashboard.product.details(id));
    },
    [router]
  )

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters)
  }, [])

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            {
              name: 'Product',
              href: paths.dashboard.product.root,
            },
            { name: 'List' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card>
          <ProductTableToolbar
            filters={filters}
            onFilters={handleFilters}
            //
            stockOptions={PRODUCT_STOCK_OPTIONS}
            publishOptions={PUBLISH_OPTIONS}
          />

          {canReset && (
            <ProductTableFiltersResult
              filters={filters}
              onFilters={handleFilters}
              //
              onResetFilters={handleResetFilters}
              //
              results={dataFiltered.length}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>

            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {productsLoading ? (
                    [...Array(table.rowsPerPage)].map((i, index) => (
                      <TableSkeleton key={index} sx={{ height: denseHeight }} />
                    ))
                  ) : (
                    <>
                      {dataFiltered
                        .slice(
                          table.page * table.rowsPerPage,
                          table.page * table.rowsPerPage + table.rowsPerPage
                        )
                        .map((row) => (
                          <ProductTableRow
                            key={row.id}
                            row={row}
                            selected={table.selected.includes(row.id)}
                            onSelectRow={() => table.onSelectRow(row.id)}
                            onViewRow={() => handleViewRow(row.id)}
                          />
                        ))}
                    </>
                  )}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered.length}
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
            //
            dense={table.dense}
            onChangeDense={table.onChangeDense}
          />
        </Card>
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filters,
}) {
  const { name, stock, publish } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (product) => product.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (stock.length) {
    inputData = inputData.filter((product) => {
      const productStock = PRODUCT_STOCK_OPTIONS.filter(x => stock.includes(x.value))
      let result = false
      for(const pStock of productStock){
        if (pStock.min && pStock.max && !result) result = product.available > pStock.min && product.available < pStock.max
        else if (pStock.min && !result) result = product.available > pStock.min
        else if (pStock.max && !result) result = product.available < pStock.max
      }
      return result
    });
  }

  if (publish.length) {
    inputData = inputData.filter((product) => publish.includes(product.publish));
  }

  return inputData;
}
