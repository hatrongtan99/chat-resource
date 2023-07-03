import { toast, ToastOptions } from "react-hot-toast";

const useToast = (defaultOptions: ToastOptions = {}) => {
    const success = (data: string, options?: ToastOptions) =>
        toast.success(data, { ...defaultOptions, ...options });

    const error = (data: string, options?: ToastOptions) =>
        toast.error(data, { ...defaultOptions, ...options });

    const info = (data: string, options?: ToastOptions) =>
        toast.custom(<div>{data}</div>);
    return { success, error, info };
};

export default useToast;
