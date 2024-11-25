import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RefrshHandler({ setIsAuthenticated, setRole }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token && role) {
      setIsAuthenticated(true);
      setRole(role);

      // تعريف المسارات المسموحة لكل دور
      const allowedPaths = {
        supplier: ['/supplier/home'],
        company: ['/company/home'],
        admin: ['/admin/home'],
      };

      // إذا لم يكن المسار الحالي من المسارات المسموحة للدور، يتم إعادة توجيه المستخدم إلى المسار المناسب
      if (!allowedPaths[role]?.includes(location.pathname)) {
        navigate(`/${role}/home`, { replace: true }); // إعادة التوجيه إلى الصفحة الرئيسية الخاصة بالدور
      }
      //  عندما تريد استبدال الصفحة الحالية وعدم السماح بالعودة إليها replace: true استخدم.
      // عندما تريد إضافة الصفحة الجديدة إلى السجل وتمكين العودة للصفحة السابق replace: false استخدم 
    } else {
      setIsAuthenticated(false);
      setRole(null);

      // إذا لم يتم تسجيل الدخول، نقوم بتوجيه المستخدم إلى صفحة تسجيل الدخول
      if (!['/supplier-login', '/company-login', '/admin', '/supplier-registration', '/company-registration'].includes(location.pathname)) {
        navigate('/supplier-login', { replace: false }); // تحويل المستخدم إلى صفحة تسجيل الدخول الخاصة بـ supplier
      }
    }
  }, [location, navigate, setIsAuthenticated, setRole]);

  return null; // هذا المكون لا يعرض شيئًا
}

export default RefrshHandler;
