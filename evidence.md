# Laporan Evidence Backend Produk

Dokumen ini merangkum fitur backend produk pada tugas 2 dan bukti pengujian yang tersedia. Backend menggunakan Express.js, TypeScript, Prisma ORM, dan SQLite. Screenshot bukti berada di folder `assets/tugas-2/`.

## Ringkasan fitur

| Fitur | Endpoint | Perilaku |
|---|---|---|
| Membaca semua produk | `GET /products` | Mengembalikan daftar produk, diurutkan berdasarkan ID menaik. |
| Membaca produk berdasarkan ID | `GET /products/:id` | Mengembalikan produk; ID tidak valid menghasilkan `400`, produk yang tidak ditemukan menghasilkan `404`. |
| Menambahkan produk | `POST /products` | Memvalidasi nama dan harga, lalu menyimpan produk baru dan mengembalikan `201`. |
| Mengubah produk | `PUT /products/:id` atau `PUT /products` | Memvalidasi ID serta data, memeriksa keberadaan produk, lalu mengembalikan data yang diperbarui. Untuk `PUT /products`, ID dikirim melalui body. |
| Menghapus produk | `DELETE /products/:id` | Memvalidasi ID dan keberadaan produk, menghapusnya, lalu mengembalikan pesan serta data yang dihapus. |
| Validasi input | Untuk operasi baca per ID dan operasi tulis | Nama wajib berupa string yang tidak kosong setelah trim; harga wajib bilangan bulat positif. ID wajib bilangan bulat positif. |
| Penanganan JSON rusak | Middleware error | Mengembalikan `400` dengan pesan `Format JSON tidak valid`. |

Data produk disimpan melalui model Prisma `Product` dengan kolom `id`, `name`, dan `price`. Relasi database menggunakan SQLite.

## Bukti pengujian

### GET — membaca produk

**Membaca daftar produk sebelum perubahan data:**

![GET products sebelum POST](assets/tugas-2/prism-get-before-post.png)

**Membaca daftar produk setelah penambahan:**

![GET products setelah POST](assets/tugas-2/prism-get-after-post.png)

**ID numerik yang tidak ditemukan:**

![GET produk dengan ID tidak ditemukan](assets/tugas-2/prism-get-invalid.png)

**ID dengan format non-numerik/tidak valid:**

![GET produk dengan ID non-numerik](assets/tugas-2/prism-get-invalid-not-numbers.png)

### POST — menambahkan produk

**Payload valid berhasil membuat produk:**

![POST produk valid](assets/tugas-2/prism-post-valid.png)

**Payload tidak valid ditolak:**

![POST produk tidak valid](assets/tugas-2/prism-post-invalid.png)

### PUT — memperbarui produk

**Data sebelum pembaruan:**

![GET sebelum PUT](assets/tugas-2/prism-get-before-put.png)

**Pembaruan valid dengan ID pada body:**

![PUT produk dengan ID pada body](assets/tugas-2/prism-put-valid.png)

**Data setelah pembaruan:**

![GET setelah PUT](assets/tugas-2/prism-get-after-put.png)

**Pembaruan valid dengan ID pada URL:**

![PUT produk dengan ID pada URL](assets/tugas-2/prism-put-id-valid.png)

**ID valid tetapi produk tidak ditemukan:**

![PUT produk yang tidak ditemukan](assets/tugas-2/prism-put-id-not-found.png)

**Body dengan format JSON rusak:**

![PUT dengan JSON tidak valid](assets/tugas-2/prism-put-json-invalid.png)

**Pemeriksaan produk tertentu sebelum dan sesudah PUT:**

![GET produk berdasarkan ID sebelum PUT](assets/tugas-2/prism-get-id-before-put.png)

![GET produk berdasarkan ID setelah PUT](assets/tugas-2/prism-get-id-after-put.png)

### DELETE — menghapus produk

**Data sebelum penghapusan:**

![GET sebelum DELETE](assets/tugas-2/prism-get-before-delete.png)

**Penghapusan dengan ID valid:**

![DELETE produk dengan ID valid](assets/tugas-2/prism-delete-id-valid.png)

**Daftar produk setelah penghapusan:**

![GET setelah DELETE](assets/tugas-2/prism-get-after-delete.png)

**Penghapusan dengan ID tidak valid:**

![DELETE produk dengan ID tidak valid](assets/tugas-2/prism-delete-id-invalid.png)

## Lokasi implementasi

- Routing endpoint: `src/routes/product.routes.ts`
- Logika CRUD dan validasi: `src/controllers/product.controller.ts`
- Middleware error: `src/middleware/error-handler.ts`
- Model Prisma: `prisma/schema.prisma`
- Konfigurasi Express dan middleware: `src/app.ts`

