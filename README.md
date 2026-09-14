# AuraShop E-Commerce Store

AuraShop is a modern React e-commerce storefront built with Vite. It includes a product catalog, cart management, checkout flow, and order history, with cart state persisted in local storage.

## Features

- Responsive storefront homepage and navigation
- Product listing using the complete DummyJSON catalog
- Product search, category filtering, and pagination with 21 products per page
- Product detail browsing
- Shopping cart with add, remove, increase, and decrease actions
- Checkout form for customer details
- Order confirmation and order history tracking
- Persistent cart data via localStorage

## Tech Stack

- React 19
- Vite
- React Router
- Axios
- Tailwind CSS

## Project Structure

```text
src/
	components/   Reusable product, cart, checkout, and navigation components
	context/      Cart state and localStorage persistence
	pages/        Home, products, cart, checkout, and order pages
	utils/        Shared utility functions
	App.jsx       Application routes
	main.jsx      React entry point
```

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm or yarn

### Install dependencies

```bash
npm install
```

### Run the app locally

```bash
npm run dev
```

The app will start in development mode and open the Vite local server in your default browser.

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Available Scripts

```bash
npm run dev      # start Vite dev server
npm run build    # create production build
npm run preview  # preview the production build
npm run lint     # run Oxlint checks
```

## Notes

- Product data is fetched from the public DummyJSON API with the complete catalog requested before local search, category filtering, and pagination are applied.
- The products page displays 21 products per page and resets pagination when the search or category filter changes.
- Cart and order data are saved in the browser's localStorage so they remain available after refreshes.
- The app is designed as a frontend storefront demonstration and does not include a backend API or payment processing.
