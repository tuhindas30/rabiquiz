import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const showToast = (toastMessage: string) => {
  return toast.error(toastMessage, {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
export default showToast;
