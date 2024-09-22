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
import { fetchProductsDetails } from "../../Redux/Customers/Product/ProductAction";
import AddVariant from "./CreateProductForm/CreateVariant";

const AllProducts = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products,loading,error ,totalPages} = useSelector((store) => store.products);
  const [filterValue, setFilterValue] = useState({
    id: "",
  });

  // query 
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const page = searchParams.get("page");


  const handlePaginationChange = (event, value) => {
    searchParams.set("page", value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  useEffect(() => {
    // setFilterValue({ availability, category, sort });
    console.log("useeffect")
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.toString();
    dispatch(fetchProductsDetails(query));
  }, [ dispatch,id,page]);

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
        </Grid>
      </Card>
      <Card className="mt-2">
        <CardHeader
          title="All Products"
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
                <TableCell>Id</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Category</TableCell>
                <TableCell>Description</TableCell>
                <TableCell sx={{ textAlign: "center", textWrap:"nowrap" }}>Add Variant</TableCell>               
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.map((item) => (
                <TableRow
                  hover
                  key={item.id}
                  sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                  
                >
                  <TableCell sx={{ textAlign: "" }}>{item.id}</TableCell>
                  <TableCell sx={{ textAlign: "" }}>{item.title}</TableCell>
                  <TableCell sx={{ textAlign: "" }}>{item.brand}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{item.category?.name}</TableCell>  
                  <TableCell sx={{ textAlign: "" }}>{item.description}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button variant="text" onClick={()=>(
                      navigate("/admin/variant/create",{ state: { productId: item.id } })
                    )}>ADD</Button>
                  </TableCell>                                
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

export default AllProducts;


