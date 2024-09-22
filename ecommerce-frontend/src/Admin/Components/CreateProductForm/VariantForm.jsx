import React, { useState } from "react";
import { TextField, Button, Box, Typography,Snackbar,
    IconButton,
    Alert, } from "@mui/material";
import ImageUpload from "./ImageUpload"; // Assuming you use the previously created ImageUpload component


function VariantForm({ productId, onVariantSubmit }) {
  const [variant, setVariant] = useState({
    variantName: "",
    price: "",
    discountedPrice: "",
    discountPercentage: "",
    quantity: "",
    images: [],
    specifications: {},
  });

  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVariant({ ...variant, [name]: value });
  };

  const handleSpecificationChange = (e, key) => {
    const value = e.target.value;
    setVariant((prevState) => ({
      ...prevState,
      specifications: {
        ...prevState.specifications,
        [key]: value,
      },
    }));
  };

  const handleAddSpecification = () => {
    const key = prompt("Enter the specification name:");
    if (key) {
      setVariant((prevState) => ({
        ...prevState,
        specifications: {
          ...prevState.specifications,
          [key]: "",
        },
      }));
    }
  };

  const handleRemoveSpecification = (key) => {
    setVariant((prevState) => {
      const { [key]: removed, ...rest } = prevState.specifications;
      return {
        ...prevState,
        specifications: rest,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const variantData = {
      ...variant,
      productId, // Already a number
      price: parseFloat(variant.price), // Convert price to float
      discountedPrice: parseFloat(variant.discountedPrice), // Convert discounted price to float
      discountPercentage: parseFloat(variant.discountPercentage), // Convert discountPercentage to float
      quantity: Number(variant.quantity), // Convert quantity to number
    };

    onVariantSubmit(variantData);
    setOpenSnackbar(true); // Show the Snackbar on submit
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6">Add Variant</Typography>
      <TextField
        label="Variant Name"
        name="variantName"
        value={variant.variantName}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Price"
        name="price"
        type="number"
        value={variant.price}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Discounted Price"
        name="discountedPrice"
        type="number"
        value={variant.discountedPrice}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Discount Percentage"
        name="discountPercentage"
        type="number"
        value={variant.discountPercentage}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Quantity"
        name="quantity"
        type="number"
        value={variant.quantity}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Typography variant="body2" gutterBottom>
        Upload Images (You can add multiple images but once an image is uploaded
        then it cannot be removed)
      </Typography>
      <ImageUpload
        onUpload={(imageUrl) =>
          setVariant({ ...variant, images: [...variant.images, imageUrl] })
        }
      />
      {variant.images.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" gutterBottom>
            Uploaded Images:
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {variant.images.map((item, index) => (
              <Box key={index} sx={{ marginRight: 2, marginBottom: 2 }}>
                <img
                  src={item}
                  alt={`Uploaded ${index}`}
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      )}
      <Typography variant="body2" gutterBottom>
        Specifications
      </Typography>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleAddSpecification}
        sx={{ mb: 2 ,}}
      >
        Add Specification
      </Button>
      {Object.entries(variant.specifications).map(([key, value]) => (
        <Box key={key} sx={{ mb: 2 }}>
          <TextField
            label={key}
            value={value}
            onChange={(e) => handleSpecificationChange(e, key)}
            fullWidth
            margin="normal"
          />
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleRemoveSpecification(key)}
          >
            Remove
          </Button>
        </Box>
      ))}
      <div className="mt-5">
      <Button type="submit" variant="contained" color="primary">
        Add Variant
      </Button>
      </div>

      {/* Snackbar for success message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Variant added successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default VariantForm;
