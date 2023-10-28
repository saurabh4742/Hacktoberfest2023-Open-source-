import React, { useState } from 'react';

const PaymentComponent = () => {
  const [clientSecret, setClientSecret] = useState('');
  const [amount, setAmount] = useState(0);

  const initiatePayment = async () => {
    // Replace with your backend URL
    const backendUrl = 'http://localhost:3000'; // Your Node.js backend URL

    try {
      // Make a request to your backend to create a payment intent
      const response = await fetch(`${backendUrl}/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: amount, currency: 'usd' }), // Change currency if needed
      });

      const data = await response.json();
      setClientSecret(data.clientSecret);

      // Use clientSecret to confirm the payment on the client-side using Stripe Elements or Checkout
      // This example assumes you're using the Stripe API for frontend payment handling
      // Implement the Stripe functionality here
      // e.g., stripe.confirmCardPayment(clientSecret, { payment_method: { card: cardElement } });

    } catch (error) {
      console.error('Error initiating payment:', error);
      // Handle error, show error message to the user, etc.
    }
  };

  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <button onClick={initiatePayment}>Initiate Payment</button>
      {/* Additional UI elements for payment handling */}
    </div>
  );
};

export default PaymentComponent;
