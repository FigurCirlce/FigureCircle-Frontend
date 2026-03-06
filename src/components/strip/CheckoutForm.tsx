import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import baseURL from '@/config/config';

interface CheckoutFormProps {
    clientSecret: string;
    mentorId: any;
    userId: any;
    mentorUserId: any;
    onSuccess: () => void;
    onFailure: (error: any) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ clientSecret, mentorId, userId, mentorUserId, onSuccess, onFailure }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);
        setLoading(true);

        try {
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement!,
                    billing_details: {
                        name: "User Payment",
                        email: "test@example.com",
                        address: {
                            line1: "123 Test Street",
                            city: "Mumbai",
                            state: "MH",
                            postal_code: "400001",
                            country: "IN"
                        }
                    },
                },
            });

            if (error) {
                console.error('Payment failed:', error.message);
                alert('Payment failed: ' + error.message);
                onFailure(error);
            } else if (paymentIntent?.status === 'succeeded') {
                console.log('Payment successful:', paymentIntent);

                // Assign mentor after payment success
                const token = localStorage.getItem('token');
                try {
                    await axios.post(
                        `${baseURL}/new_assign_mentor`,
                        {
                            mentor_id: mentorId,
                            user_id: userId,
                            mentro_user_id: mentorUserId,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    onSuccess();
                } catch (assignError) {
                    console.error('Mentor assignment failed:', assignError);
                    onFailure(assignError);
                }
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An unexpected error occurred. Please try again later.');
            onFailure(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div className="p-4 border border-gray-300 rounded-md">
                <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
            </div>
            <button
                type="submit"
                disabled={!stripe || loading}
                className="w-full inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-blue-500 rounded shadow-md hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? 'Processing...' : 'Pay with Stripe'}
            </button>
        </form>
    );
};

export default CheckoutForm;
