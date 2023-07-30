const express = require('express');
const app = express();
const port = 3000; 

app.use(express.json());

let products = [
  { id: 1, name: 'Product 1', price: 10 },
  { id: 2, name: 'Product 2', price: 20 }
];

app.get('/products', (req, res) => {
  res.json(products);
});

app.post('/products', (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const updatedProduct = req.body;

  products = products.map((product) =>
    product.id === productId ? { ...product, ...updatedProduct } : product
  );

  res.json(products.find((product) => product.id === productId));
});

app.delete('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);

  products = products.filter((product) => product.id !== productId);

  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
