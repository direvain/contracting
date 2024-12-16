import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RefrshHandler({ setIsAuthenticated, setRole, setSupplierProduct }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const supplierProduct = localStorage.getItem('supplierProduct');

    if (token && role) {
      setIsAuthenticated(true);
      setRole(role);
      if (role === 'supplier' && supplierProduct) {
        setSupplierProduct(supplierProduct);
      }

      // تعريف المسارات المسموحة لكل دور
      const allowedPaths = {
        supplier: {
          cement: ['/supplier/cement/under-preparing-orders', '/supplier/cement/pending-orders', '/supplier/cement/old-orders', '/supplier/cement/profile'],
          concrete: ['/supplier/concrete/home'],
        },
<<<<<<< HEAD
        company: ['/company/home', '/company/home/cement-order', '/company/home/concrete-order', '/company/home/profile', '/company/home/preparing-orders', '/company/home/pending-orders', '/company/home/past-orders'],
        admin: ['/admin/home', '/admin/home/request-order', '/admin/home/approve-order', "/admin/home/reject-order","/admin/home/Add-admin" ],
=======
        company: ['/company/home', '/company/home/cement-order', '/company/home/concrete-order', '/company/home/profile', '/company/home/under-preparing-orders', '/company/home/pending-orders', '/company/home/old-orders', '/company/home/cement-order/cement-bill'],
        admin: ['/admin/home'],
>>>>>>> a5572ed6e3751fba9d15c732b6f9bd7c5846724d
      };

      // التحقق إذا كان المسار الحالي من المسارات المسموحة
      const isAllowed =
        role === 'supplier'
          ? allowedPaths[role]?.[supplierProduct]?.includes(location.pathname)
          : allowedPaths[role]?.includes(location.pathname);

      // إذا كان المسار غير مسموح، توجيه المستخدم إلى الصفحة المناسبة
      if (!isAllowed) {
        if (role === 'supplier' && supplierProduct) {
          navigate(`/${role}/${supplierProduct}/pending-orders`, { replace: false });
        } else {
          navigate(`/${role}/home`, { replace: false });
        }
      }
    } else {
      setIsAuthenticated(false);
      setRole(null);
      setSupplierProduct(null);
      // إذا لم يتم تسجيل الدخول، نقوم بتوجيه المستخدم إلى صفحة تسجيل الدخول
      if (!['/supplier-login', '/company-login', '/admin', '/supplier-registration', '/company-registration'].includes(location.pathname)) {
        navigate('/supplier-login', { replace: false }); // تحويل المستخدم إلى صفحة تسجيل الدخول الخاصة بـ supplier
      }
    }
  }, [location, navigate, setIsAuthenticated, setRole, setSupplierProduct]);

  return null; // هذا المكون لا يعرض شيئًا
}

export default RefrshHandler;
