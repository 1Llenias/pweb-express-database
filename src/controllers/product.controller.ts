import type { Request, Response } from 'express';

// Data awal produk
const products = [
  { id: 1, name: 'Buku', price: 15000 },
  { id: 2, name: 'Pulpen', price: 5000 }
];

// GET /products
export function getProducts(req: Request, res: Response) {
  res.status(200).json(products);
}

// GET /products/:id
export function getProductById(req: Request, res: Response) {
  const id = Number(req.params.id);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({
      message: 'Produk tidak ditemukan'
    });
  }

  return res.status(200).json(product);
}

export function createProduct(req: Request, res: Response) {
  const { name, price } = req.body;

  // Validasi input
  if (
    typeof name !== 'string' ||
    name.trim() === '' ||
    typeof price !== 'number' ||
    !Number.isFinite(price) ||
    price <= 0
  ) {
    return res.status(400).json({
      message: 'Name dan price harus valid'
    });
  }

  // Membuat ID baru
  const newId = Math.max(...products.map((p) => p.id)) + 1;

  // Membuat produk baru
  const newProduct = {
    id: newId,
    name: name.trim(),
    price
  };

  // Menyimpan produk ke array
  products.push(newProduct);

  // Mengembalikan produk dengan status 201
  return res.status(201).json(newProduct);
}
