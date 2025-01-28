const productSchema = {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'ID',
      type: 'number',
      validation: (Rule) => Rule.required().integer().positive(),
    },
    {
      name: 'img',
      title: 'Image URL',
      type: 'url',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    },
    {
      name: 'title2',
      title: 'Subtitle',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    },
    {
      name: 'price',
      title: 'Price',
      type: 'string',
      validation: (Rule) => Rule.required().max(50),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required().max(500),
    },
    {
      name: 'color',
      title: 'Colors',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'producttype',
      title: 'Product Type',
      type: 'string',
      options: {
        list: [
          { title: 'Men', value: 'men' },
          { title: 'Women', value: 'women' },
          { title: 'Unisex', value: 'unisex' },
          { title: 'Kids', value: 'kids' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'type',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Shoes', value: 'shoes' },
          { title: 'Clothing', value: 'clothing' },
          { title: 'Accessories', value: 'accessories' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
  ],
};

export default productSchema;