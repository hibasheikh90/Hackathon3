const productSchema = {
  name: "product",
  type: "document",
  title: "Product",
  fields: [
    { name: "title", type: "string", title: "Title" },
    { name: "price", type: "number", title: "Price" },
    { name: "image", type: "image", title: "Image" },
    { name: "stock", type: "number", title: "Stock" },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "title",
        maxLength: 200,
      },
    },
  ],
};

export default productSchema;
