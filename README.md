# Product Catalog — Backend

REST API built with **Node.js, Express 5, MongoDB, and Mongoose** for product management and inventory consumption.

**[Frontend repository](https://github.com/jlcambraia/product-catalog-frontend)** · **[Live frontend demo](https://product-catalog-pink.vercel.app/)**

## Features

- Retrieve products stored in MongoDB
- Create products with schema validation
- Delete products by ID
- Record inventory consumption, rejecting requests exceeding available stock
- Validate categories, prices, and image URLs
- Serve static assets from `public/`
- Support cross-origin requests using CORS

## Tech stack

Node.js · Express 5 · MongoDB · Mongoose · JavaScript ES Modules · dotenv · cors · validator

## API endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/products` | List products |
| POST | `/products` | Create a product |
| DELETE | `/products/:productId` | Delete a product |
| PATCH | `/products/:productId/stock` | Consume inventory |

### Create a product

`POST /products`

```json
{
  "name": "Wireless Mouse",
  "price": 89.9,
  "description": "Ergonomic wireless mouse",
  "image": "https://example.com/mouse.png",
  "category": "ELETRÔNICOS",
  "stock": 10
}
```

Allowed categories: `ACESSÓRIOS`, `MÓVEIS`, `ELETRÔNICOS`, `ROUPAS`, `OUTROS`.

### Consume inventory

`PATCH /products/:productId/stock`

```json
{ "stock": 3 }
```

The requested amount is **subtracted** from existing stock. For example, 10 units become 7 after consuming 3.

## Read-only demo deployment

The frontend demo reads real products but simulates creates, deletes, and stock changes in each visitor's browser. The backend **must not expose unauthenticated database writes**.

On the `feature/admin-auth-phase1` branch, `GET /products` and static images remain publicly available. `POST`, `DELETE` and `PATCH` routes require the `X-Internal-API-Key` header matching `INTERNAL_API_KEY`. If the key is **not configured**, the server runs in **read-only mode**: write requests return `401`. This is the recommended configuration for the public portfolio demo.

> The old `main` branch had unauthenticated write routes. Do not expose it as the public demo backend without deploying the protected changes first. The frontend API proxy alone does not protect direct access to the backend.

## Run locally

Requires Node.js, npm, and MongoDB.

```bash
git clone https://github.com/jlcambraia/product-catalog-backend.git
cd product-catalog-backend
npm install
```

Create a `.env` file:

```env
PORT=3001
MONGO_URL=your_mongodb_connection_string
# Optional: omit for a read-only public demo
# INTERNAL_API_KEY=replace-with-a-long-random-secret
```

Keep credentials out of version control.

```bash
npm run dev
# or
npm start
```

With the example port, the API is available at http://localhost:3001/products.

## Project structure

```text
app.js
controllers/products.js
models/product.js
routes/products.js
public/
package.json
```

- `app.js` configures Express and the MongoDB connection.
- `controllers/` contains request handlers.
- `models/` defines the Mongoose product schema.
- `routes/` registers API endpoints.

## Potential improvements

- Automated API tests
- Centralized error handling
- Authentication and authorization
- OpenAPI documentation
- Stronger request validation
- Database connection readiness checks

## Author

**João Luiz Cambraia** · [GitHub](https://github.com/jlcambraia) · [LinkedIn](https://www.linkedin.com/in/joaoluizcambraia/)
