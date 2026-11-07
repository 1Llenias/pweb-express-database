import type { Request, Response, NextFunction } from 'express';

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  // JSON body yang dikirim formatnya rusak
  if ((err as { status?: number })?.status === 400) {
    return res.status(400).json({ message: 'Format JSON tidak valid' });
  }

  console.error(err);
  return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
}