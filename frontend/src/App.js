import { useState } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";

import RefrshHandler from './routes/RefrshHandler'; // مكتبة لازمة للتنقل بين الصفحات
//  يتم استخدامه لمعالجة التحديثات أو إعادة تحميل الصفحة أو تحديث الحالة بعد التحديثات.

import PrivateRoute from './routes/PrivateRoute';//يستخدم لحماية المسارات ويتحقق من المصادقة أو الأدوار المسموحة للوصول
// مكون  يُستخدم عادةً لحماية المسارات  بحيث لا يمكن للمستخدمين الوصول إليها إلا إذا كانوا مُصادق عليهم أو لديهم الدور المناسب  إذا حاول مستخدم غير مُصادق عليه الوصول إلى هذه المسارات، يتم إعادة توجيهه إلى صفحة تسجيل الدخول.

// الصفحات
// Supplier
import SupplierLogin from "./pages/Supplier/Login-Registration/Login/SupplierLogin";
import SupplierRegistration from "./pages/Supplier/Login-Registration/Registration/SupplierRegistration";
// Supplier-Concrete
import ConcreteHome from "./pages/Supplier/ConcretePages/ConcreteHome";
// Supplier-Cement
import { UnderPreparingOrders as SupplierUnderPreparingOrders } from './pages/Supplier/CementPages/UnderPreparingOrders/UnderPreparingOrders';
import { PendingOrders as SupplierPendingOrders } from './pages/Supplier/CementPages/PendingOrders/PendingOrders';
import { OldOrders as SupplierOldOrders } from './pages/Supplier/CementPages/OldOrders/OldOrders';
import { Profile as SupplierProfile } from './pages/Supplier/CementPages/Profile/Profile';

// Company
import CompanyLogin from "./pages/Company/Login-Registration/Login/CompanyLogin";
import CompanyRegistration from "./pages/Company/Login-Registration/Registration/CompanyRegistration";
import CompanyHome from "./pages/Company/CompanyPages/CompanyHome";
import CementOrder from './pages/Company/CompanyPages/Cement/CementOrder';
import CementBill from './pages/Company/CompanyPages/Cement/CementBill/CementBill';
import ConcreteOrder from './pages/Company/CompanyPages/Concrete/ConcreteOrder';
import { UnderPreparingOrders as CompanyUnderPreparingOrders } from './pages/Company/CompanyPages/UnderPreparingOrders/UnderPreparingOrders';
import { PendingOrders as CompanyPendingOrders } from './pages/Company/CompanyPages/PendingOrders/PendingOrders';
import { OldOrders as CompanyOldOrders } from './pages/Company/CompanyPages/OldOrders/OldOrders';
import { Profile as CompanyProfile } from './pages/Company/CompanyPages/Profile/Profile';

// Admin
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
        
        {/* Supplier */}
        <Route path="/supplier-login" element={<SupplierLogin />} /> 
        <Route path="/supplier-registration" element={<SupplierRegistration />} /> 
        {/* Supplier-Concrete */}
        <Route path="/supplier/concrete/home" element={<PrivateRoute
                                                isAuthenticated={isAuthenticated}
                                                role={role}
                                                supplierProduct= {supplierProduct}
                                                allowedRoles={['supplier']}
                                                element={<ConcreteHome />}
                                              />} /> 
        {/* Supplier-Cement */}
        <Route path="/supplier/cement/under-preparing-orders" element={<PrivateRoute
                                                isAuthenticated={isAuthenticated}
                                                role={role}
                                                supplierProduct= {supplierProduct}
                                                allowedRoles={['supplier']}
                                                element={<SupplierUnderPreparingOrders />}
                                              />}/>
        <Route path="/supplier/cement/pending-orders" element={<PrivateRoute
                                                isAuthenticated={isAuthenticated}
                                                role={role}
                                                supplierProduct= {supplierProduct}
                                                allowedRoles={['supplier']}
                                                element={<SupplierPendingOrders />}
                                              />}/>
        <Route path="/supplier/cement/old-orders" element={<PrivateRoute
                                                isAuthenticated={isAuthenticated}
                                                role={role}
                                                supplierProduct= {supplierProduct}
                                                allowedRoles={['supplier']}
                                                element={<SupplierOldOrders />}
                                              />}/>
        <Route path="/supplier/cement/profile" element={<PrivateRoute
                                                isAuthenticated={isAuthenticated}
                                                role={role}
                                                supplierProduct= {supplierProduct}
                                                allowedRoles={['supplier']}
                                                element={<SupplierProfile />}
                                              />}/>
        
        {/* Company */}
        <Route path="/company-login" element={<CompanyLogin />} /> 
        <Route path="/company-registration" element={<CompanyRegistration />} /> 
        <Route path="/company/home" element={<PrivateRoute
                                                isAuthenticated={isAuthenticated}
                                                role={role}
                                                allowedRoles={['company']}
                                                element={<CompanyHome />}
                                              />} /> 
        <Route path="/company/home/cement-order" element={<PrivateRoute
                                              isAuthenticated={isAuthenticated}
                                              role={role}
                                              allowedRoles={['company']}
                                              element={<CementOrder />}
                                            />}/>
        <Route path="/company/home/cement-order/cement-bill" element={<PrivateRoute
                                              isAuthenticated={isAuthenticated}
                                              role={role}
                                              allowedRoles={['company']}
                                              element={<CementBill />}
                                            />}/>
        <Route path="/company/home/concrete-order" element={<PrivateRoute
                                                isAuthenticated={isAuthenticated}
                                                role={role}
                                                allowedRoles={['company']}
                                                element={<ConcreteOrder />}
                                              />}/>
        <Route path="/company/home/under-preparing-orders" element={<PrivateRoute
                                                isAuthenticated={isAuthenticated}
                                                role={role}
                                                allowedRoles={['company']}
                                                element={<CompanyUnderPreparingOrders />}
                                              />}/>
        <Route path="/company/home/pending-orders" element={<PrivateRoute
                                                isAuthenticated={isAuthenticated}
                                                role={role}
                                                allowedRoles={['company']}
                                                element={<CompanyPendingOrders />}
                                              />}/>
        <Route path="/company/home/old-orders" element={<PrivateRoute
                                                isAuthenticated={isAuthenticated}
                                                role={role}
                                                allowedRoles={['company']}
                                                element={<CompanyOldOrders />}
                                              />}/>
        <Route path="/company/home/profile" element={<PrivateRoute
                                                isAuthenticated={isAuthenticated}
                                                role={role}
                                                allowedRoles={['company']}
                                                element={<CompanyProfile />}
                                              />}/>

        {/* Admin */}
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
