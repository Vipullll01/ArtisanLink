# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

DOCUMENTATION --- 

# Local Artisan Handcraft E-Commerce Platform

A full-stack e-commerce web application designed to connect local artisans with buyers. Built with the **MERN** stack (MongoDB, Express, React, Node.js) and powered by **Redux Toolkit** and **Vite**.

---

## 🌟 Key Features

### For Buyers
* **Artisan Catalog & Product Details:** Browse handcrafted items, search by category, and view detailed product info including artisan background.
* **Shopping Cart Management:** Add items, adjust quantities dynamically, and persist cart state using Redux Toolkit and `localStorage`.
* **Checkout & Order Processing:** Complete purchases with shipping address details and support for Cash on Delivery (COD).
* **Order History:** Track past purchases, item details, quantities, total prices, and shipping status.

### For Artisans
* **Artisan Dashboard:** Create, view, edit, and delete craft listings in real time.
* **Authorization Security:** Protected craft management ensuring artisans can only modify their own listings.

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Vite, Redux Toolkit, React Router DOM
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose ODM)
* **Authentication:** JSON Web Tokens (JWT) & bcryptjs

---

