const prisma = require('../prisma/client'); // Import your Prisma client

// Create a new product
async function createProduct(reqData) {
  const savedProduct = await prisma.product.create({
    data: {
      title: reqData.title,
      description: reqData.description,
      brand: reqData.brand,
      color: reqData.color,
      highlights: reqData.highlights,
      categoryId: Number(reqData.categoryId), // Assuming a single category level now
      createdAt: new Date(),
    },
  });

  // If there are variants, create them
  if (reqData.variants && reqData.variants.length > 0) {
    for (let variant of reqData.variants) {
      await createVariant({ ...variant, productId: savedProduct.id });
    }
  }

  return savedProduct;
}

// Delete a product by ID
async function deleteProduct(productId) {
  const product = await findProductById(productId);

  if (!product) {
    throw new Error("Product not found with id - " + productId);
  }

  await prisma.product.delete({
    where: { id: productId },
  });

  return "Product deleted Successfully";
}

// Update a product by ID
async function updateProduct(productId, reqData) {
  const updatedProduct = await prisma.product.update({
    where: { id: productId },
    data: reqData,
  });

  return updatedProduct;
}

// Find a product by ID
async function findProductById(id) {
  const product = await prisma.product.findUnique({
    where: { id:id },
    include: {
      category: true,
      variants: true, // Include variants in the product response
    },
  });

  if (!product) {
    throw new Error("Product not found with id " + id);
  }

  return product;
}

// Get all products with filtering and pagination
async function getAllProducts(reqQuery) {
  const {
    id,
    price,
    stock,
    discount,
    sort,
    page=1,
    pageSize = 10,
  } = reqQuery;

  // Fetch all products with their variants
  const products = await prisma.product.findMany({
    include: {
      variants: true, // Include variants to filter and sort
      category: true, // Include category if needed
    },
  });

  // Flatten the product and variant data into a single array
  const productsWithVariants = products.flatMap(product =>
    product.variants.map(variant => ({
      productId: product.id,
      productTitle: product.title,
      productDescription: product.description,
      productBrand: product.brand,
      productColor: product.color,
      productHighlights: product.highlights,
      productCreatedAt: product.createdAt,
      productCategory: product.category?.id, // Assuming category name is what you need
      variantId: variant.id,
      variantName: variant.variantName,
      variantPrice: variant.price,
      variantDiscountedPrice: variant.discountedPrice,
      variantDiscountPercentage: variant.discountPercentage,
      variantQuantity: variant.quantity,
      variantImages: variant.images,
      variantSpecifications: variant.specifications,
    }))
  );

  let filteredProducts = productsWithVariants;


  // Apply filttering based on categoryId
  if(id){
    const categoryId=Number(id)
    filteredProducts=filteredProducts.filter(variant=>
      variant.productCategory==categoryId
    )
  }
  // Apply filtering based on variant prices
  if(price){
    const minPrice=price.split("-")[0]
    const maxPrice=price.split("-")[1]
    if (minPrice && maxPrice) {
      filteredProducts = filteredProducts.filter(variant =>
        variant.variantDiscountedPrice >= parseFloat(minPrice) &&
        variant.variantDiscountedPrice <= parseFloat(maxPrice)
      );
    }
  }

  // Apply stock filter
  if (stock) {
    filteredProducts = filteredProducts.filter(variant =>
      stock === "in_stock" ? variant.variantQuantity > 0 : variant.variantQuantity === 0
    );
  }

  // Apply discount filter
  if (discount) {
    filteredProducts = filteredProducts.filter(variant =>
      variant.variantDiscountPercentage >= parseFloat(discount)
    );
  }

  // Apply sorting based on discounted price
  if (sort) {
    filteredProducts.sort((a, b) => {
      return sort === "price_high" ? b.variantDiscountedPrice - a.variantDiscountedPrice : a.variantDiscountedPrice - b.variantDiscountedPrice;
    });
  }

  // Pagination
  const totalProducts = filteredProducts.length;
  const paginatedProducts = filteredProducts.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(totalProducts / pageSize);

  return { content: paginatedProducts, currentPage: page , totalPages };
}

async function createMultipleProducts(products) {
  for (let product of products) {
    await createProduct(product);
  }
}

async function findProductsByCategory(categoryId) {
  const products = await prisma.product.findMany({
    where: { categoryId },
    include: {
      category: true,
      variants: true, // Include variants in the product list
    },
  });

  return products;
}

async function searchProduct(searchTerm) {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        {
          title: {
            contains: searchTerm,
            mode: 'insensitive', // Case insensitive search
          },
        },
        {
          description: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
        {
          brand: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
        {
          color: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
        {
          highlights: {
            hasSome: searchTerm.toLowerCase().split(" "),
          },
        },
        {
          variants: {
            some: {
              variantName: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          },
        },

        // Add any other fields as needed
      ],
    },
    include: {
      category: true,
      variants: true, // Include variants in the product search results
    },
  });

  return products;
}

// Get all products with only product-related data (no variants)
async function getAllProductDetails(reqQuery) {
  const {
    id,
    page = 1,
    pageSize = 10,
  } = reqQuery;

  // Fetch all products without variants
  const products = await prisma.product.findMany({
    where: {
      categoryId: id ? Number(id) : undefined, // Filter by categoryId if provided
    },
    include: {
      category: true, // Include category if needed
    },
  });

  let filteredProducts = products;

  // Pagination
  const totalProducts = filteredProducts.length;
  const paginatedProducts = filteredProducts.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(totalProducts / pageSize);

  return { content: paginatedProducts, currentPage: page, totalPages };
}



module.exports = {
  getAllProductDetails,
  findProductsByCategory,
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  findProductById,
  createMultipleProducts,
  searchProduct
};
