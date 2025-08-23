import React, { useEffect } from "react";
import axios from "axios";
import baseURL from "@/config/config";

interface RazorpayProps {
  mentorId: string | number;
  userId: string | number;
  // mentorUserId: string | number;
   autoOpen?: boolean;
  onSuccess?: () => void;
  onFailure?: (error: any) => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const RazorpayPayment: React.FC<RazorpayProps> = ({
  mentorId,
  userId,
  // mentorUserId,
  autoOpen = false,
  onSuccess,
  onFailure,
}) => {

    const token=localStorage.getItem("token");
  // Load Razorpay script once
  useEffect(() => {
    const loadRazorpayScript = () => {
      if (document.getElementById("razorpay-script")) return;

      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => console.log("Razorpay script loaded");
      script.onerror = () => console.error(" Error loading Razorpay script");
      document.body.appendChild(script);
    };

    loadRazorpayScript();
  }, []);

  const checkoutFN = async () => {
    try {
      // 1️⃣ Create Order
      const response = await axios.post(`${baseURL}/create_order`, {
        mentor_id: mentorId,
      });

      const { id: order_id, amount, currency } = response.data;

      // 2️⃣ Razorpay options
      const razorpayOptions = {
        key: "rzp_test_D4OC2CLZNTebD7",
        amount,
        currency,
        name: "Mentorship Payment",
        description: "Payment for mentoring services",
        order_id,
        handler: async (paymentResponse: any) => {
          console.log("Payment response:", paymentResponse);
          try {
            // 3️⃣ Verify Payment
            const verificationResponse = await axios.post(
              `${baseURL}/verify_payment`,
              {
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_signature: paymentResponse.razorpay_signature,
                mentor_id: mentorId,
                user_id: userId,
              }
            );

            // 4️⃣ Assign Mentor
            await axios.post(
              `${baseURL}/new_assign_mentor`,
              {
                mentor_id: mentorId,
                user_id: userId,
              },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            console.log("Payment verified & mentor assigned:", verificationResponse.data);
            onSuccess?.();
          } catch (verificationError) {
            console.error("Payment verification failed:", verificationError);
            onFailure?.(verificationError);
          }
        },
        theme: {
          color: "#F37254",
        },
      };

      // 5️⃣ Open Razorpay Checkout
      if (window.Razorpay) {
        const razorpay = new window.Razorpay(razorpayOptions);
        razorpay.open();
      } else {
        console.error(" Razorpay SDK not loaded.");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      onFailure?.(error);
    }
  };

   useEffect(() => {
    if (autoOpen) {
      checkoutFN();
    }
  }, [autoOpen]);

 

  return (
    // 
    <>
    </>
  );
};

export default RazorpayPayment;
