# Catálogo de Produtos - Backend

Backend de uma aplicação de gerenciamento de produtos, desenvolvido com **Node.js**, **Express** e **MongoDB**. Essa API permite criar, listar, deletar e atualizar o estoque de produtos armazenados em banco de dados.

## Rotas

### Listar produtos

**GET** `/products`  
Retorna todos os produtos cadastrados.

---

### Criar novo produto

**POST** `/products`  
Body (JSON):

```json
{
  "name": "Nome do produto",
  "price": 99.9,
  "description": "Descrição do produto",
  "image": "https://url-da-imagem.com/img.png",
  "category": "ELETRÔNICOS",
  "stock": 10
}
```

---

### Deletar produto

**DELETE** `/products/:productId`

Remove o produto com o ID especificado.

---

### Consumir estoque

**PATCH** `/products/:productId/stock`  
Body (JSON):

```json
{
  "stock": 3
}
```

Esse valor será subtraído do estoque atual do produto.
Por exemplo: se o produto possui 10 unidades e for enviado { "stock": 3 }, o estoque será atualizado para 7.

---

## Tecnologias usadas

- **Node.js**
- **Express**
- **MongoDB** com **Mongoose**
- **dotenv**
- **cors**
- **validator**

---

## Figuras

As imagens da pasta `public/` são acessíveis diretamente pela URL.

---

## Observações

- Categorias válidas para produtos:

  - `ACESSÓRIOS`
  - `MÓVEIS`
  - `ELETRÔNICOS`
  - `ROUPAS`
  - `OUTROS`

- Todos os campos são validados antes de criar ou atualizar um produto.

---

## Autor

Desenvolvido por João Luiz Cambraia
