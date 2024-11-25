import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import navbar from './Components/navbar';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode> {/* يساعد المطورين في اكتشاف المشكلات المحتملة في التطبيق */}
    <BrowserRouter> {/* للتنقل بين الصفحات و المكونات بسلاسه */}
    <navBar
    one="Supplier"
    two="Companies"
    three="Logout"
    four="add admin"
    />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

