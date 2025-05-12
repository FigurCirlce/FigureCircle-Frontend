import  { useState } from 'react';
import axios from 'axios';
import useRedirectIfNotLoggedIn from '@/customHooks/useRedirectIfNotLoggedIn';

const RazerPay = () => {
    const [paymentStatus, setPaymentStatus] = useState('');
    useRedirectIfNotLoggedIn()

    const initiatePayment = async () => {
        try {
            const response = await axios.post(
                'https://api.razerpay.com/v1/payments',
                {
                    amount: 100, // Amount in cents
                    currency: 'MYR', // Currency code
                    method: 'credit_card', // Payment method
                    description: 'Payment for XYZ', // Payment description
                    redirect: 'http://localhost:5173/razerpay', // Redirect URL after payment
                    api_key: 'YOUR_API_KEY', // Your Razer Pay API key
                }
            );
            // Handle the response
            setPaymentStatus(response.data.status);
        } catch (error) {
            // Handle errors
            console.error(error);
        }
    };

    return (
        <div>
            <button onClick={initiatePayment}>Pay Now</button>
            <p>Payment Status: {paymentStatus}</p>
        </div>
    );
};

export default RazerPay;
