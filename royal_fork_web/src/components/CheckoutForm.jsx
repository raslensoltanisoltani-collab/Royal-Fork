import React, { useState } from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Lock, CreditCard } from 'lucide-react';

const inputStyle = {
  base: {
    color: '#001f3f',
    fontFamily: 'Inter, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': { color: '#aab7c4' }
  },
  invalid: { color: '#fa755a', iconColor: '#fa755a' }
};

const fieldBox = {
  padding: '14px 16px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  backgroundColor: 'white',
  marginBottom: '14px',
  transition: 'border-color 0.2s',
};

const CheckoutForm = ({ customerData, total }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { placeOrder } = useCart();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardNumberElement);

    const { error } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      setProcessing(false);
    } else {
      setError(null);
      try {
        await placeOrder(customerData);
        setSucceeded(true);
        setProcessing(false);
        navigate('/tracking');
      } catch {
        setError(t('checkout.error'));
        setProcessing(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
      {/* Card Brand Icons Row */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', alignItems: 'center' }}>
        <CreditCard size={20} color="var(--navy)" />
        <span style={{ fontSize: '0.85rem', color: '#555', fontWeight: 500 }}>{t('checkout.accepted_cards')}</span>
        <div style={{ display: 'flex', gap: '6px', marginLeft: 'auto' }}>
          {['VISA', 'MC', 'AMEX'].map(brand => (
            <span key={brand} style={{
              fontSize: '0.65rem', fontWeight: 'bold', padding: '2px 6px',
              border: '1px solid #ddd', borderRadius: '4px', color: '#444', letterSpacing: '0.5px'
            }}>{brand}</span>
          ))}
        </div>
      </div>

      {/* Card Number */}
      <div>
        <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: '600', color: 'var(--navy)' }}>
          {t('checkout.card_number')}
        </label>
        <div style={fieldBox}>
          <CardNumberElement options={{ style: inputStyle, showIcon: true }} />
        </div>
      </div>

      {/* Expiry + CVC */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: '600', color: 'var(--navy)' }}>
            {t('checkout.expiry')}
          </label>
          <div style={fieldBox}>
            <CardExpiryElement options={{ style: inputStyle }} />
          </div>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: '600', color: 'var(--navy)' }}>
            {t('checkout.cvc')}
          </label>
          <div style={fieldBox}>
            <CardCvcElement options={{ style: inputStyle }} />
          </div>
        </div>
      </div>

      {/* Security note */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px', color: '#888', fontSize: '0.78rem' }}>
        <Lock size={12} />
        <span>{t('checkout.secure')}</span>
      </div>

      {error && (
        <div style={{ color: '#ff4d4d', marginBottom: '15px', fontSize: '0.9rem', padding: '10px', backgroundColor: '#fff1f1', borderRadius: '6px', border: '1px solid #ffcccc' }}>
          {error}
        </div>
      )}

      <button
        disabled={processing || !stripe || succeeded}
        className="btn-primary"
        style={{ width: '100%', padding: '16px', fontSize: '1.1rem', fontWeight: 'bold', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
      >
        {processing ? (
          <>
            <span style={{ display: 'inline-block', width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            {t('checkout.processing')}
          </>
        ) : (
          <>
            <Lock size={16} />
            {t('checkout.pay_btn')} {total}€
          </>
        )}
      </button>
    </form>
  );
};

export default CheckoutForm;
