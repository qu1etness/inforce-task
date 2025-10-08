import ProductsPage from "./pages/products-page.tsx";
import ProductDetailPage from "./pages/product-detail-page.tsx";

const routes = [    
    {
        path: '/products',
        Component: ProductsPage,
    },
    {
        path: '/products/:id',
        Component: ProductDetailPage,
    },
];

export default routes;