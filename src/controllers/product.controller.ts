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

// PUT /products  (id di body)  atau  PUT /products/:id
export async function updateProduct(req: Request, res: Response) {
  const { id: bodyId, name, price } = req.body ?? {};
  const id = parseId(req.params.id ?? bodyId);

  if (id === null) {
    return res.status(400).json({ message: 'ID harus berupa angka valid' });
  }

  if (!isValidProductBody(name, price)) {
    return res.status(400).json({
      message: 'Name dan price harus valid (price berupa bilangan bulat > 0)'
    });
  }

  const existing = await prisma.product.findUnique({ where: { id } });

  if (!existing) {
    return res.status(404).json({ message: 'Produk tidak ditemukan' });
  }

  const updated = await prisma.product.update({
    where: { id },
    data: { name: name.trim(), price }
  });

  return res.status(200).json(updated);
}

// DELETE /products/:id
export async function deleteProduct(req: Request, res: Response) {
  const id = parseId(req.params.id);

  if (id === null) {
    return res.status(400).json({ message: 'ID harus berupa angka valid' });
  }

  const existing = await prisma.product.findUnique({ where: { id } });

  if (!existing) {
    return res.status(404).json({ message: 'Produk tidak ditemukan' });
  }

  await prisma.product.delete({ where: { id } });

  return res.status(200).json({
    message: 'Produk berhasil dihapus',
    data: existing
  });
}