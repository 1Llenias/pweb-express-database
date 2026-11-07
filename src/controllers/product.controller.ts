import type { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';

// Mengubah parameter id menjadi angka valid, atau null jika tidak valid
function parseId(raw: unknown): number | null {
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}

// Validasi body untuk POST dan PUT
function isValidProductBody(name: unknown, price: unknown): boolean {
  return (
    typeof name === 'string' &&
    name.trim() !== '' &&
    typeof price === 'number' &&
    Number.isInteger(price) &&
    price > 0
  );
}

// GET /products
export async function getProducts(req: Request, res: Response) {
  const products = await prisma.product.findMany({
    orderBy: { id: 'asc' }
  });

  res.status(200).json(products);
}

// GET /products/:id
export async function getProductById(req: Request, res: Response) {
  const id = parseId(req.params.id);

  if (id === null) {
    return res.status(400).json({ message: 'ID harus berupa angka valid' });
  }

  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    return res.status(404).json({ message: 'Produk tidak ditemukan' });
  }

  return res.status(200).json(product);
}

// POST /products
export async function createProduct(req: Request, res: Response) {
  const { name, price } = req.body ?? {};

  if (!isValidProductBody(name, price)) {
    return res.status(400).json({
      message: 'Name dan price harus valid (price berupa bilangan bulat > 0)'
    });
  }

  const newProduct = await prisma.product.create({
    data: { name: name.trim(), price }
  });

  return res.status(201).json(newProduct);
}