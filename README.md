# Tugas Pemrograman Website Express dan Backend

## Requirements
- Node.js
- npm

## Installation

Install seluruh dependencies:

```bash
npm install
```

## Running the Application

Jalankan development server:

```bash
npm run dev
```

Server berjalan pada:

`http://localhost:3000`

## Available Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /products | Get all products |
| GET | /products/:id | Get product by ID |
| POST | /products | Create a new product |

## POST Request Example

URL: `POST /products`

Request Body:

```json
{
  "name": "Laptop",
  "price": 7500000
}
```

Expected Response: `201 Created`

```json
{
  "id": 3,
  "name": "Laptop",
  "price": 7500000
}
```

## Data Storage

Products are stored in an in-memory array. No database is used.