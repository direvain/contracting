import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode> {/* يساعد المطورين في اكتشاف المشكلات المحتملة في التطبيق */}
    <BrowserRouter> {/* للتنقل بين الصفحات و المكونات بسلاسه */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

