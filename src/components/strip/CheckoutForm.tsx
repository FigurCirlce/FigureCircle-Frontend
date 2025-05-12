import React from 'react';
//@ts-ignore
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';


const CheckoutForm: React.FC<{ clientSecret: string }> = ({ clientSecret }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        try {
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement!,
                    billing_details: {
                        name: "test"
                    },
                },
            });

            if (error) {
                console.error('Payment failed:', error.message);
                // Display user-friendly error message
                alert('Payment failed. Please check the provided information.');
            } else if (paymentIntent?.status === 'succeeded') {
                console.log('Payment successful:', paymentIntent);
                // Handle successful payment here
                alert('Payment successful!');
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle unexpected errors
            alert('An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>
                Pay
            </button>
        </form>
    );
};

export default CheckoutForm;
