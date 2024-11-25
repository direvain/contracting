import { useState } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";

import RefrshHandler from './routes/RefrshHandler'; // مكتبة لازمة للتنقل بين الصفحات
//  يتم استخدامه لمعالجة التحديثات أو إعادة تحميل الصفحة أو تحديث الحالة بعد التحديثات.

import PrivateRoute from './routes/PrivateRoute';//يستخدم لحماية المسارات ويتحقق من المصادقة أو الأدوار المسموحة للوصول
// مكون  يُستخدم عادةً لحماية المسارات  بحيث لا يمكن للمستخدمين الوصول إليها إلا إذا كانوا مُصادق عليهم أو لديهم الدور المناسب  إذا حاول مستخدم غير مُصادق عليه الوصول إلى هذه المسارات، يتم إعادة توجيهه إلى صفحة تسجيل الدخول.

// الصفحات
import SupplierLogin from "./pages/Supplier/SupplierLogin";
import SupplierRegistration from "./pages/Supplier/SupplierRegistration";
import SupplierHome from "./pages/Supplier/SupplierDashboard";
import CompanyLogin from "./pages/Company/CompanyLogin";
import CompanyRegistration from "./pages/Company/CompanyRegistration";
import CompanyHome from "./pages/Company/CompanyDashboard";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminHome from "./pages/Admin/AdminDashboard";


function App() {
  // لادارة التنقل بين الصفحات
  const [isAuthenticated, setIsAuthenticated] = useState(false); // ام لا authenticated تستخدم لتحديد اذا كان المستخدم تحقق ، false في البداية تكون الحالة
  const [role, setRole] = useState(null);
  
  return (
    <div className="App">
      {/* تحديث الحالة بناءً على التخزين المحلي */}
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} setRole={setRole} />

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
        <Route path="/supplier/home" element={<PrivateRoute
                                                isAuthenticated={isAuthenticated}
                                                role={role}
                                                allowedRoles={['supplier']}
                                                element={<SupplierHome />}
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
