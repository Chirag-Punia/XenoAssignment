import React from "react";
import ReactDOM from "react-dom/client";
import {NextUIProvider} from "@nextui-org/react";
import App from "./App";
import "./index.css";
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
        <NextUIProvider>
            <App/>
        </NextUIProvider>
        </GoogleOAuthProvider>
    </React.StrictMode>,
);