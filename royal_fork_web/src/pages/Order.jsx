import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PayPalButtons } from '@paypal/react-paypal-js'
import CheckoutForm from '../components/CheckoutForm'

const Order = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { cart, cartTotal, removeFromCart, placeOrder } = useCart()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: 'France',
    city: '',
    address: '',
    serviceType: 'Delivery',
    paymentMethod: 'Card'
  });

  const [transferReference] = useState(() => `RF-${Date.now().toString().slice(-6)}`);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleConfirmOrder = () => {
    if (!formData.email || !formData.address) {
      alert("Veuillez remplir les informations de contact et d'adresse.");
      return;
    }
    placeOrder(formData);
    navigate('/tracking');
  };

  const paymentLabelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px',
    border: '1px solid #eee',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    backgroundColor: 'var(--white)'
  }

  return (
    <div className="order-page section-padding">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px' }}>
          {/* Order Form */}
          <div>
            <h2 style={{ marginBottom: '30px', color: 'var(--navy)' }}>{t('order.title')}</h2>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ padding: '20px', backgroundColor: 'var(--gray-light)', borderRadius: '8px', marginBottom: '10px' }}>
                <h4 style={{ color: 'var(--navy)', marginBottom: '15px' }}>📍 {t('order.service_type')}</h4>
                <div style={{ display: 'flex', gap: '30px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                    <input 
                      type="radio" 
                      name="serviceType" 
                      value="Delivery"
                      checked={formData.serviceType === 'Delivery'} 
                      onChange={handleChange}
                    /> {t('order.delivery')}
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                    <input 
                      type="radio" 
                      name="serviceType" 
                      value="Pickup"
                      checked={formData.serviceType === 'Pickup'} 
                      onChange={handleChange}
                    /> {t('order.pickup')}
                  </label>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', fontWeight: '500' }}>{t('order.firstname')}</label>
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Jean" 
                    style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', outline: 'none' }} 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', fontWeight: '500' }}>{t('order.lastname')}</label>
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Dupont" 
                    style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', outline: 'none' }} 
                  />
                </div>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', fontWeight: '500' }}>{t('order.email')}</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jean.dupont@email.com" 
                  style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', outline: 'none' }} 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', fontWeight: '500' }}>{t('order.country')}</label>
                  <select 
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', backgroundColor: 'var(--white)' }}
                  >
                    <option>France</option>
                    <option>Suisse</option>
                    <option>Belgique</option>
                    <option>Pays-Bas</option>
                    <option>Allemagne</option>
                    <option>Italie</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', fontWeight: '500' }}>{t('order.city')}</label>
                  <input 
                    type="text" 
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Paris" 
                    style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', outline: 'none' }} 
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', fontWeight: '500' }}>{t('order.address')}</label>
                <textarea 
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="2" 
                  placeholder={t('order.address_placeholder')}
                  style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', outline: 'none', resize: 'none' }}
                ></textarea>
              </div>
              
              <div style={{ padding: '25px', border: '2px solid var(--gold)', borderRadius: '12px', backgroundColor: 'rgba(212,175,55,0.03)' }}>
                <h4 style={{ color: 'var(--navy)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem' }}>
                  💳 {t('order.payment_method')}
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
                  {['Card', 'PayPal', 'Cash', 'Transfer'].map((method) => (
                    <label key={method} style={paymentLabelStyle}>
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value={method}
                        checked={formData.paymentMethod === method}
                        onChange={handleChange}
                      /> 
                      <span>{method === 'Card' ? t('order.card') : method === 'Transfer' ? t('order.transfer') : method === 'Cash' ? t('order.cash') : method}</span>
                    </label>
                  ))}
                </div>
              </div>

              {formData.paymentMethod === 'Card' ? (
                <div style={{ padding: '0px', marginTop: '10px' }}>
                  <h4 style={{ color: 'var(--navy)', marginBottom: '15px' }}>💳 {t('order.payment_info')}</h4>
                  <CheckoutForm 
                    customerData={formData} 
                    total={cartTotal} 
                  />
                </div>
              ) : formData.paymentMethod === 'PayPal' ? (
                <div style={{ padding: '20px', backgroundColor: '#f5f7fa', borderRadius: '8px', marginTop: '10px', textAlign: 'center' }}>
                  <h4 style={{ color: 'var(--navy)', marginBottom: '15px' }}>{t('order.payment_info')} - PayPal</h4>
                  <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                    <PayPalButtons 
                      style={{ layout: "vertical", shape: "pill" }}
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: cartTotal.toString(),
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={(data, actions) => {
                        return actions.order.capture().then((details) => {
                          // Handle successful payment
                          alert(`Transaction completed by ${details.payer.name.given_name}`);
                          placeOrder(formData);
                          navigate('/tracking');
                        });
                      }}
                      disabled={cart.length === 0}
                    />
                  </div>
                </div>
              ) : formData.paymentMethod === 'Transfer' ? (
                <div style={{ marginTop: '20px', borderRadius: '12px', overflow: 'hidden', border: '2px solid var(--gold)' }}>
                  {/* Header */}
                  <div style={{ backgroundColor: 'var(--navy)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '1.4rem' }}>🏦</span>
                    <h4 style={{ color: 'var(--gold)', margin: 0, fontSize: '1.1rem' }}>{t('transfer.title')}</h4>
                  </div>

                  {/* Details */}
                  <div style={{ padding: '20px', backgroundColor: '#f9f8f5', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#555' }}>{t('transfer.instructions')}</p>

                    {[
                      { label: t('transfer.beneficiary'), value: 'Royal Fork SARL' },
                      { label: 'IBAN', value: 'FR76 3000 4002 8600 0100 0000 000' },
                      { label: 'BIC / SWIFT', value: 'BNPAFRPPXXX' },
                      { label: t('transfer.bank'), value: 'BNP Paribas' },
                      { label: t('transfer.reference'), value: transferReference },
                      { label: t('transfer.amount'), value: `${cartTotal}€` },
                    ].map(({ label, value }) => (
                      <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #eee' }}>
                        <span style={{ fontSize: '0.82rem', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</span>
                        <span style={{ fontWeight: 'bold', color: 'var(--navy)', fontFamily: 'monospace', fontSize: '0.95rem' }}>{value}</span>
                      </div>
                    ))}

                    <div style={{ backgroundColor: '#fff8e1', border: '1px solid #ffe082', borderRadius: '8px', padding: '12px 16px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span>⚠️</span>
                      <p style={{ margin: 0, fontSize: '0.82rem', color: '#795548' }}>{t('transfer.warning')}</p>
                    </div>
                  </div>

                  {/* Confirm button */}
                  <div style={{ padding: '16px 20px', backgroundColor: '#f0f0f0', borderTop: '1px solid #eee' }}>
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={handleConfirmOrder}
                      style={{ width: '100%', padding: '16px', fontSize: '1rem', fontWeight: 'bold', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                      disabled={cart.length === 0}
                    >
                      ✅ {t('transfer.confirm_btn')} ({cartTotal}€)
                    </button>
                  </div>
                </div>
              ) : (
                <button  
                  type="button" 
                  className="btn-primary" 
                  onClick={handleConfirmOrder}
                  style={{ marginTop: '20px', padding: '20px', fontSize: '1.2rem', fontWeight: 'bold', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                  disabled={cart.length === 0}
                >
                  {t('order.confirm_btn')} ({cartTotal}€)
                </button>
              )}
            </form>
          </div>

          {/* Cart Summary */}
          <div style={{ backgroundColor: 'var(--gray-light)', padding: '30px', borderRadius: '8px', alignSelf: 'start' }}>
            <h3 style={{ marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>{t('order.summary')}</h3>
            {cart.length === 0 ? (
              <p style={{ opacity: 0.6 }}>{t('order.empty_cart')}</p>
            ) : (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {cart.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontWeight: '500' }}>{item.name} x{item.quantity}</span>
                        <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>{item.price * item.quantity}€</div>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ff4d4d' }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '20px', paddingTop: '10px', borderTop: '2px solid var(--gold)', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                  <span>{t('order.total')}</span>
                  <span>{cartTotal}€</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Order
