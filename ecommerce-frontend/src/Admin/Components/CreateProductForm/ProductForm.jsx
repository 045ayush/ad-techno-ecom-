import React, { useState } from 'react';
import { TextField, Button, Box, Typography,Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem, } from '@mui/material';

function ProductForm({ onProductSubmit }) {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    categoryId: '',
    brand: '',
    highlights: [],
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleCategoryChange = (e) => {
    setProduct({ ...product, categoryId: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onProductSubmit(product);
    
    setProduct({
      title: '',
      description: '',
      categoryId: '',
      brand: '',
      highlights: [],
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6">Add Product</Typography>

      <TextField
        label="Title"
        name="title"
        value={product.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Description"
        name="description"
        value={product.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />

<Grid container spacing={2}>
        <Grid item xs={4}>
          <FormControl fullWidth >
            <InputLabel id="category-select-label">Category*</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={product.categoryId}
              onChange={handleCategoryChange}
              label="Category"
              fullWidth
              required
            >
              <MenuItem value={1}>Desktops</MenuItem>
              <MenuItem value={2}>Laptops</MenuItem>
              <MenuItem value={3}>Software</MenuItem>
              <MenuItem value={4}>Networking</MenuItem>
              <MenuItem value={5}>Surveillance</MenuItem>
              <MenuItem value={6}>Printers</MenuItem>
              <MenuItem value={7}>Spare Parts</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <TextField
        label="Brand"
        name="brand"
        value={product.brand}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Highlights (comma-separated)"
        name="highlights"
        value={product.highlights.join(', ')}
        onChange={(e) =>
          setProduct({
            ...product,
            highlights: e.target.value.split(',').map((item) => item.trim()),
          })
        }
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Add Product
      </Button>
    </Box>
  );
}

export default ProductForm;
