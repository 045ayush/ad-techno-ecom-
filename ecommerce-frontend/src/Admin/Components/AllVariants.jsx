import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../Redux/Customers/Product/ProductAction";

const AllVariants = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products,loading,error ,totalPages} = useSelector((store) => store.products);
  const [filterValue, setFilterValue] = useState({
    stock: "",
    id: "",
    sort: "",
  });

  // query 
  const searchParams = new URLSearchParams(location.search);
  const stock = searchParams.get("stock");
  const id = searchParams.get("id");
  const sort = searchParams.get("sort");
  const page = searchParams.get("page");


  const handlePaginationChange = (event, value) => {
    searchParams.set("page", value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  useEffect(() => {
    // setFilterValue({ availability, category, sort });
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.toString();
    dispatch(fetchProducts(query));
  }, [dispatch,stock, id, sort,page]);

  const handleFilterChange = (e, sectionId) => {
    console.log(e.target.value, sectionId);
    setFilterValue((values) => ({ ...values, [sectionId]: e.target.value }));
    searchParams.set(sectionId, e.target.value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };



  return (
    <Box width={"100%"}>
      <Card className="p-3">
        <CardHeader
          title="Sort"
          sx={{
            pt: 0,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <Grid container spacing={2}>
          
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filterValue.id}
                label="Category"
                onChange={(e) => handleFilterChange(e, "id")}
              >
                <MenuItem value={"1"}>Desktops</MenuItem>
                <MenuItem value={"2"}>Laptops</MenuItem>
                <MenuItem value={"3"}>Software</MenuItem>
                <MenuItem value={"4"}>Networking</MenuItem>
                <MenuItem value={"5"}>Surveillance</MenuItem>
                <MenuItem value={"6"}>Printers</MenuItem>
                <MenuItem value={"7"}>Spare Parts</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Availability
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filterValue.stock}
                label="Availability"
                onChange={(e) => handleFilterChange(e, "stock")}
              >
                <MenuItem value={"in_stock"}>Instock</MenuItem>
                <MenuItem value={"out_of_stock"}>Out Of Stock</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Sort By Price
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filterValue.sort}
                label="Sort By Price"
                onChange={(e) => handleFilterChange(e, "sort")}
              >
                <MenuItem value={"price_high"}>High - Low</MenuItem>
                <MenuItem value={"price_low"}>Low - High</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>
      <Card className="mt-2">
        <CardHeader
          title="All Variants"
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Product Title</TableCell>
                <TableCell>Variant Name</TableCell>
                {/* <TableCell sx={{ textAlign: "center" }}>Category</TableCell> */}
                <TableCell sx={{ textAlign: "center" }}>Price</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.map((item) => (
                <TableRow
                  hover
                  key={item.variantId}
                  sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                  
                >
                  <TableCell>
                    {" "}
                    <Avatar alt={item.variantName} src={item.variantImages?.[0]} />{" "}
                  </TableCell>
                  <TableCell sx={{ textAlign: "" }}>{item.productTitle}</TableCell>
                  <TableCell
                    sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: "0.875rem !important",
                        }}
                      >
                        {item.variantName}
                      </Typography>
                      <Typography variant="caption">{item.productBrand}</Typography>
                    </Box>
                  </TableCell>
                  {/* <TableCell sx={{ textAlign: "center" }}>{item.productCategory}</TableCell> */}
                  <TableCell sx={{ textAlign: "center" }}>{item.variantDiscountedPrice}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{item.variantQuantity}</TableCell>
              
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Card className="mt-2 border">
        {/* <Pagination
          className="py-5 border w-auto"
          size="large"
          count={10}
          color="primary"
          onChange={handlePaginationChange}
        /> */}

        <div className="mx-auto px-4 py-5 flex justify-center shadow-lg rounded-md">
          <Pagination
            count={totalPages}
            color="primary"
            className=""
            onChange={handlePaginationChange}
            // value={page}
          />
        </div>
      </Card>
    </Box>
  );
};

export default AllVariants;


