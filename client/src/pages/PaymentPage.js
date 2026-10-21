import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { Card } from '../components/UIComponents';
import './PaymentPage.css';

const PaymentPage = () => {
  const { bookingId } = useParams();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const { data } = await api.get(`/payments/${bookingId}`);
        setPayment(data.payment);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load payment');
      } finally {
        setLoading(false);
      }
    };
    fetchPayment();
  }, [bookingId]);

  if (loading) return <p>Loading payment details...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!payment) return <p>No payment information available.</p>;

  return (
    <div className="payment-page container">
      <h2>Payment Confirmation</h2>
      <Card className="payment-card">
        <p><strong>Transaction ID:</strong> {payment.transactionId}</p>
        <p><strong>Amount:</strong> ${payment.amount}</p>
        <p><strong>Status:</strong> {payment.status}</p>
        <p><strong>Method:</strong> {payment.paymentMethod}</p>
      </Card>
    </div>
  );
};

export default PaymentPage;
