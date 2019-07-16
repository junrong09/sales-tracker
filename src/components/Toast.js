import {Flip, toast, ToastContainer} from "react-toastify";
import React from "react";

export const toastComponent = <ToastContainer
    position="bottom-right"
    autoClose={1500}
    hideProgressBar={true}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    transition={Flip}
    className="b tl f6 sans-serif"
    draggablePercent={55}
    pauseOnVisibilityChange
    draggable
    pauseOnHover
/>;

export const toastWarning = (id, msg) => {
    toastInitOrRefresh(id, msg, (id, msg) => toast.warn(msg, {toastId: id}));
};

export const toastError = (id, msg) => {
    toastInitOrRefresh(id, msg, (id, msg) => toast.error(msg, {toastId: id}));
};

export const toastSuccess = (id, msg) => {
    toastInitOrRefresh(id, msg, (id, msg) => toast.success(msg, {toastId: id}));
};

const toastInitOrRefresh = (id, msg, initToast) => {
    if (toast.isActive(id)) {
        toast.update(id, {autoClose: 2000});
    } else {
        initToast(id, msg);
    }
}