// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router";
import { store } from "./state/store.ts";
import routes from "./routes";

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
