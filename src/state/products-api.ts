import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {Product} from "../types/product-type.ts";
import type {Comment} from "../types/comment-type.ts";

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://127.0.0.1:5000',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    tagTypes: ['Products', 'Comments'],
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], void>({
            query: () => '/products',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Products' as const, id })),
                        { type: 'Products', id: 'LIST' },
                    ]
                    : [{ type: 'Products', id: 'LIST' }],
        }),
        getComments: builder.query<Comment[], number>({
            query: (productId) => `/products/${productId}/comments`,
            providesTags: (result, error, productId) => [
                { type: 'Comments', id: productId },
            ],
        }),
        addComment: builder.mutation<Comment, { productId: number; text: string }>({
            query: ({ productId, text }) => ({
                url: `/products/${productId}/comments`,
                method: 'POST',
                body: { text },
            }),
            invalidatesTags: (result, error, { productId }) => [
                { type: 'Comments', id: productId },
            ],
        }),
        deleteProduct: builder.mutation<void, number>({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'DELETE',
            }),
            // після видалення продукту оновлюємо список продуктів
            invalidatesTags: (result, error, id) => [
                { type: 'Products', id },       // видаляємо конкретний продукт
                { type: 'Products', id: 'LIST' } // і оновлюємо список
            ],
        }),
        addProduct: builder.mutation<Product, Partial<Product>>({
            query: (newProduct) => ({
                url: '/products',
                method: 'POST',
                body: newProduct,
            }),
            invalidatesTags: [{ type: 'Products', id: 'LIST' }],
        }),
        getProductById: builder.query<Product, number>({
            query: (id) => `/products/${id}`,
            providesTags: (result, error, id) => [{ type: 'Products', id }],
        }),
        deleteComment: builder.mutation<void, { productId: number; commentId: number }>({
            query: ({ productId, commentId }) => ({
                url: `/products/${productId}/comments/${commentId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, { productId }) => [
                { type: 'Comments', id: productId },
            ],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetCommentsQuery,
    useAddCommentMutation,
    useDeleteProductMutation,
    useAddProductMutation,
    useGetProductByIdQuery,
    useDeleteCommentMutation,
} = productsApi;

export default productsApi;
