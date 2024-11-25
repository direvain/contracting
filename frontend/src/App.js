import { useState } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";

import RefrshHandler from './routes/RefrshHandler'; // مكتبة لازمة للتنقل بين الصفحات
//  يتم استخدامه لمعالجة التحديثات أو إعادة تحميل الصفحة أو تحديث الحالة بعد التحديثات.

import PrivateRoute from './routes/PrivateRoute';//يستخدم لحماية المسارات ويتحقق من المصادقة أو الأدوار المسموحة للوصول
// مكون  يُستخدم عادةً لحماية المسارات  بحيث لا يمكن للمستخدمين الوصول إليها إلا إذا كانوا مُصادق عليهم أو لديهم الدور المناسب  إذا حاول مستخدم غير مُصادق عليه الوصول إلى هذه المسارات، يتم إعادة توجيهه إلى صفحة تسجيل الدخول.

// الصفحات
import SupplierLogin from "./pages/Supplier/Login-Registration/Login/SupplierLogin";
import SupplierRegistration from "./pages/Supplier/Login-Registration/Registration/SupplierRegistration";
import CementHome from "./pages/Supplier/CementPages/CementHome";
import ConcreteHome from "./pages/Supplier/ConcretePages/ConcreteHome";
import CompanyLogin from "./pages/Company/Login-Registration/Login/CompanyLogin";
import CompanyRegistration from "./pages/Company/Login-Registration/Registration/CompanyRegistration";
import CompanyHome from "./pages/Company/CompanyPages/CompanyHome";
import AdminLogin from "./pages/Admin/Login/AdminLogin";
import AdminHome from "./pages/Admin/AdminPages/AdminHome";


function App() {
  // لادارة التنقل بين الصفحات
  const [isAuthenticated, setIsAuthenticated] = useState(false); // ام لا authenticated تستخدم لتحديد اذا كان المستخدم تحقق ، false في البداية تكون الحالة
  const [role, setRole] = useState(null);
  const [supplierProduct, setSupplierProduct] = useState(null);
  
  return (
    <div className="App">
      {/* تحديث الحالة بناءً على التخزين المحلي */}
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} setRole={setRole} setSupplierProduct={setSupplierProduct} />

       {/* هو عنصر يستخدم لتجميع جميع المسارات  */}
      <Routes> 
        {/* 
          هو عنصر يمثل مسارًا واحدًا في التطبيق. يحتوي على خاصيتين رئيسيتين
          - path: هو العنصر الذي يحدد المسار الذي سيتم توجيه إليه
          - element: هو العنصر الذي سيتم عرضه عند الوصول إلى المسار
        */}
        <Route path="/" element={<Navigate to="/supplier-login" />} /> {/* supplier page انه عند مطابقة المسار سيتم تحويلك الى   */}
        
        <Route path="/supplier-login" element={<SupplierLogin />} /> 
        <Route path="/supplier-registration" element={<SupplierRegistration />} /> 
        <Route path="/supplier/concrete/home" element={<PrivateRoute
                                                isAuthenticated={isAuthenticated}
                                                role={role}
                                                supplierProduct= {supplierProduct}
                                                allowedRoles={['supplier']}
                                                element={<ConcreteHome />}
                                              />} /> 
        <Route path="/supplier/cement/home" element={<PrivateRoute
                                                isAuthenticated={isAuthenticated}
                                                role={role}
                                                supplierProduct= {supplierProduct}
                                                allowedRoles={['supplier']}
                                                element={<CementHome />}
                                              />} /> 

        <Route path="/company-login" element={<CompanyLogin />} /> 
        <Route path="/company-registration" element={<CompanyRegistration />} /> 
        <Route path="/company/home" element={<PrivateRoute
                                                isAuthenticated={isAuthenticated}
                                                role={role}
                                                allowedRoles={['company']}
                                                element={<CompanyHome />}
                                              />} /> 

        <Route path="/admin" element={<AdminLogin />} /> 
        <Route path="/admin/home" element={<PrivateRoute
                                            isAuthenticated={isAuthenticated}
                                            role={role}
                                            allowedRoles={['admin']}
                                            element={<AdminHome />}
                                          />} />
      </Routes>
    </div>
  );
}

export default App;
