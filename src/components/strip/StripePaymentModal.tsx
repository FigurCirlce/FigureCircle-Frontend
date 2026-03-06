import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import baseURL from '@/config/config';

interface StripePaymentModalProps {
    mentorId: any;
    userId: any;
    mentorUserId: any;
    onSuccess: () => void;
    onFailure: (error: any) => void;
    onClose: () => void;
}

const StripePaymentModal: React.FC<StripePaymentModalProps> = ({ mentorId, userId, mentorUserId, onSuccess, onFailure, onClose }) => {
    const [clientSecret, setClientSecret] = useState<string>('');
    const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);

    useEffect(() => {
        const fetchStripeKeys = async () => {
            try {
                const response = await axios.post(`${baseURL}/create_stripe_order`, {
                    mentor_id: mentorId,
                });
                const { clientSecret, publishableKey } = response.data;
                setClientSecret(clientSecret);
                setStripePromise(loadStripe(publishableKey));
            } catch (err) {
                console.error("Failed to fetch Stripe keys", err);
                onFailure(err);
            }
        };
        if (mentorId) {
            fetchStripeKeys();
        }
    }, [mentorId, onFailure]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
                    aria-label="Close modal"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                <h2 className="text-xl font-bold mb-6 text-gray-800">Complete Payment</h2>

                {clientSecret && stripePromise ? (
                    <Elements stripe={stripePromise}>
                        <CheckoutForm
                            clientSecret={clientSecret}
                            mentorId={mentorId}
                            userId={userId}
                            mentorUserId={mentorUserId}
                            onSuccess={() => {
                                onSuccess();
                                onClose();
                            }}
                            onFailure={onFailure}
                        />
                    </Elements>
                ) : (
                    <div className="flex justify-center items-center h-32 text-gray-600">
                        Loading...
                    </div>
                )}
            </div>
        </div>
    );
};

export default StripePaymentModal;
