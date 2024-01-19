'use client'
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const ToastComponent = () => {
  useEffect(() => {
    const successMessage = localStorage.getItem('successMessage');

    if (successMessage) {
      toast.success(successMessage);
      // Clear the success message from localStorage after displaying the toast
      localStorage.removeItem('successMessage');
    }
  }, []);

  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 5000, // Set the duration for how long the toast should be displayed
      }}
    />
  );
};

export default ToastComponent;
