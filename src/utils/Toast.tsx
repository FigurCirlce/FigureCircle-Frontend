import { toast } from 'react-toastify';

/*
* type can be : success | info | error | warn | default
*/
interface ToastI {
    message: string,
    type?: 'success' | 'info' | 'error' | 'warn'
}

const Toast = ({ message, type = 'info' }: ToastI) => {
    toast[type](message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}

export default Toast;