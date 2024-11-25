import { toast } from 'react-toastify'; // يحتوي على دالتين تستخدمان لإظهار رسائل الإشعارات

export const handleSuccess = (msg) => {
    // لإظهار رسالة نجاح في الزاوية العلوية اليمنى من الشاشة.
    toast.success(msg, {
        position: 'top-right'
    })
}

// دالة لإظهار رسالة خطأ في الزاوية العلوية اليمنى من الشاشة
export const handleError = (msg) => {
    toast.error(msg, {
        position: 'top-right'
    })
}