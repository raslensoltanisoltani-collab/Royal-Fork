import React from 'react'
import { db } from '../firebase'
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { CheckCircle, Clock, Trash2, User, Package, CreditCard, MessageSquare, Check, X, LayoutDashboard } from 'lucide-react'
import { Link } from 'react-router-dom'

const Admin = () => {
  const [orders, setOrders] = React.useState([])
  const [reviews, setReviews] = React.useState([])
  const [activeTab, setActiveTab] = React.useState('orders') // 'orders' or 'reviews'

  React.useEffect(() => {
    // Fetch Orders
    const qOrders = query(collection(db, 'orders'), orderBy('date', 'desc'))
    const unsubscribeOrders = onSnapshot(qOrders, (snapshot) => {
      setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    })

    // Fetch Reviews
    const qReviews = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'))
    const unsubscribeReviews = onSnapshot(qReviews, (snapshot) => {
      setReviews(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    })

    return () => {
      unsubscribeOrders()
      unsubscribeReviews()
    }
  }, [])

  // Fallback Mock Data for previewing the Admin Panel
  const mockOrders = [
    { id: '#RF-2026-881', date: new Date('2026-03-13T12:00:00Z').toISOString(), total: 345.00, status: 'Confirmed', customer: { firstName: 'Marc-Antoine', lastName: 'D.', email: 'marc.d@email.com' }, items: [{name: 'Menu Royal', quantity: 2}] },
    { id: '#RF-2026-880', date: new Date('2026-03-13T11:00:00Z').toISOString(), total: 890.50, status: 'Preparing', customer: { firstName: 'Elena', lastName: 'Rossi', email: 'elena.r@email.com' }, items: [{name: 'Buffet VIP', quantity: 1}] },
    { id: '#RF-2026-879', date: new Date('2026-03-13T09:00:00Z').toISOString(), total: 120.00, status: 'Delivered', customer: { firstName: 'Sebastian', lastName: 'W.', email: 'seb@email.com' }, items: [{name: 'Petit Déjeuner Affaires', quantity: 4}] }
  ];

  const mockReviews = [
    { id: '1', rating: 5, status: 'pending', name: 'Jean Dupont', role: 'Acheteur Vérifié', content: 'Superbe expérience !' },
    { id: '2', rating: 4, status: 'pending', name: 'Alice M.', role: 'Acheteur Vérifié', content: 'Très bon, mais livraison un peu longue.' },
    { id: '3', rating: 5, status: 'approved', name: 'Sophie L.', role: 'Acheteur Vérifié', content: 'Parfait comme toujours.' }
  ];

  const displayOrders = orders.length > 0 ? orders : mockOrders;
  const displayReviews = reviews.length > 0 ? reviews : mockReviews;

  const handleApproveReview = async (id) => {
    try {
      await updateDoc(doc(db, 'reviews', id), { status: 'approved' })
    } catch (err) {
      console.error("Error approving review:", err)
    }
  }

  const handleDeleteReview = async (id) => {
    if (window.confirm('Supprimer cet avis ?')) {
      try {
        await deleteDoc(doc(db, 'reviews', id))
      } catch (err) {
        console.error("Error deleting review:", err)
      }
    }
  }

  const handleDeleteOrder = async (id) => {
    if (window.confirm('Supprimer cette commande ?')) {
      try {
        await deleteDoc(doc(db, 'orders', id))
      } catch (err) {
        console.error("Error deleting order:", err)
      }
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return '#4CAF50';
      case 'Preparing': return '#FF9800';
      case 'Delivered': return '#2196F3';
      default: return '#757575';
    }
  };

  return (
    <div className="admin-page section-padding" style={{ backgroundColor: '#f8f9fa', minHeight: '90vh' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h1 style={{ color: 'var(--navy)', marginBottom: '10px' }}>Administration Royal Fork</h1>
            <p style={{ opacity: 0.6 }}>Gérez vos commandes et modérez les avis clients.</p>
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ backgroundColor: 'var(--navy)', color: 'white', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold' }}>
              {displayOrders.length} Commandes
            </div>
            <div style={{ backgroundColor: 'var(--gold)', color: 'var(--navy)', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
              Recette: {displayOrders.reduce((sum, order) => sum + (order.total || 0), 0).toFixed(2)}€
            </div>
            <Link to="/dashboard" style={{ backgroundColor: 'white', color: 'var(--navy)', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none', border: '1px solid var(--navy)', display: 'flex', alignItems: 'center', gap: '8px' }}>
               Aperçu Graphique
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', borderBottom: '1px solid #ddd', paddingBottom: '15px' }}>
          <button 
            onClick={() => setActiveTab('orders')}
            style={{ 
              backgroundColor: activeTab === 'orders' ? 'var(--navy)' : 'transparent',
              color: activeTab === 'orders' ? 'white' : 'var(--navy)',
              border: activeTab === 'orders' ? 'none' : '1px solid var(--navy)',
              padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px'
            }}
          >
            <LayoutDashboard size={18} /> Commandes
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            style={{ 
              backgroundColor: activeTab === 'reviews' ? 'var(--navy)' : 'transparent',
              color: activeTab === 'reviews' ? 'white' : 'var(--navy)',
              border: activeTab === 'reviews' ? 'none' : '1px solid var(--navy)',
              padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px'
            }}
          >
            <MessageSquare size={18} /> Avis Clients {displayReviews.filter(r => r.status === 'pending').length > 0 && <span style={{ backgroundColor: '#ff4d4d', color: 'white', padding: '2px 8px', borderRadius: '10px', fontSize: '0.7rem' }}>{displayReviews.filter(r => r.status === 'pending').length}</span>}
          </button>
        </div>

        {activeTab === 'orders' ? (
          displayOrders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '100px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
              <Clock size={60} color="#ddd" style={{ marginBottom: '20px' }} />
              <h3 style={{ color: '#999' }}>Aucune commande pour le moment.</h3>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {displayOrders.map(order => (
                <div 
                  key={order.id} 
                  style={{ 
                    backgroundColor: 'white', 
                    borderRadius: '12px', 
                    padding: '25px', 
                    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                    borderLeft: `6px solid ${getStatusColor(order.status)}`,
                    display: 'grid',
                    gridTemplateColumns: '1fr 2fr 1fr',
                    gap: '30px'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--gold)', marginBottom: '5px' }}>{order.id}</div>
                    <div style={{ fontSize: '0.9rem', marginBottom: '15px' }}>{order.date}</div>
                    <div style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '20px', backgroundColor: `${getStatusColor(order.status)}20`, color: getStatusColor(order.status), fontSize: '0.8rem', fontWeight: 'bold' }}>
                      {order.status}
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                      <h4 style={{ fontSize: '1rem', color: 'var(--navy)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <User size={16} /> Client
                      </h4>
                      <p style={{ fontSize: '0.9rem' }}>{order.customer.firstName} {order.customer.lastName}</p>
                      <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>{order.customer.email}</p>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1rem', color: 'var(--navy)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Package size={16} /> Articles
                      </h4>
                      {order.items.map((item, idx) => (
                        <div key={idx} style={{ fontSize: '0.8rem' }}>{item.name} x{item.quantity}</div>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--navy)' }}>{order.total}€</div>
                    <button onClick={() => handleDeleteOrder(order.id)} style={{ color: '#ff4d4d', background: 'none', border: 'none', cursor: 'pointer' }}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {displayReviews.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px', backgroundColor: 'white', borderRadius: '12px' }}>
                <MessageSquare size={40} color="#ddd" />
                <p style={{ color: '#999', marginTop: '10px' }}>Aucun avis client pour le moment.</p>
              </div>
            ) : (
              displayReviews.map(rev => (
                <div key={rev.id} style={{
                  backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                  display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '20px', alignItems: 'center',
                  borderLeft: rev.status === 'approved' ? '6px solid #2ecc71' : '6px solid #f39c12'
                }}>
                  <div>
                    <div style={{ fontWeight: 'bold', color: 'var(--navy)' }}>{rev.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--gold)' }}>{'★'.repeat(rev.rating)}</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>{rev.role}</div>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#444', fontStyle: 'italic' }}>"{rev.content}"</div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                    {rev.status === 'pending' ? (
                      <button 
                        onClick={() => handleApproveReview(rev.id)}
                        style={{ padding: '8px 15px', backgroundColor: '#eafaf1', color: '#2ecc71', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem' }}
                      >
                        <Check size={16} /> Approuver
                      </button>
                    ) : (
                      <span style={{ fontSize: '0.8rem', color: '#2ecc71', fontWeight: 'bold' }}>Publié</span>
                    )}
                    <button onClick={() => handleDeleteReview(rev.id)} style={{ padding: '8px', color: '#ff4d4d', background: 'none', border: 'none', cursor: 'pointer' }}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin
