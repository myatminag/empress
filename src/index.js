import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { HelmetProvider } from "react-helmet-async";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import App from "./App";
import { ContextProvider } from "context/user-context"
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root")); 
root.render(
    <HelmetProvider>
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <ContextProvider>
                <PayPalScriptProvider deferLoading={true}>
                    <App />
                </PayPalScriptProvider>
            </ContextProvider>
        </QueryClientProvider>
    </HelmetProvider>
);
