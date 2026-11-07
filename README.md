## Setup Database

```bash
cp .env.example .env
npm install
npx prisma migrate dev --name init
npm run db:seed
```

## Available Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /products | Get all products |
| GET | /products/:id | Get product by ID |
| POST | /products | Create a new product |
| PUT | /products | Update product (id in body) |
| PUT | /products/:id | Update product (id in URL) |
| DELETE | /products/:id | Delete product by ID |

## PUT Request Example

```json
{
  "id": 1,
  "name": "Buku Tulis",
  "price": 18000
}
```

## Data Storage

Data disimpan di SQLite menggunakan Prisma ORM (`prisma/schema.prisma`).
Lihat isi database dengan `npm run db:studio`.