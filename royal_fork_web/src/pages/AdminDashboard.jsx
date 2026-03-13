import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, MessageSquare, Utensils, Users, LogOut, TrendingUp, Package, Star, Clock, ExternalLink } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch Orders
    const qOrders = query(collection(db, 'orders'), orderBy('date', 'desc'));
    const unsubscribeOrders = onSnapshot(qOrders, (snapshot) => {
      setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    // Fetch Reviews
    const qReviews = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
    const unsubscribeReviews = onSnapshot(qReviews, (snapshot) => {
      setReviews(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubscribeOrders();
      unsubscribeReviews();
    };
  }, []);

  // Fallback Mock Data for previewing the Dashboard
  const mockOrders = [
    { id: '#RF-2026-881', date: new Date('2026-03-13T12:00:00Z').toISOString(), total: 345.00, status: 'Confirmed', customer: { firstName: 'Marc-Antoine', lastName: 'D.', country: 'France' } },
    { id: '#RF-2026-880', date: new Date('2026-03-13T11:00:00Z').toISOString(), total: 890.50, status: 'Preparing', customer: { firstName: 'Elena', lastName: 'Rossi', country: 'Italie' } },
    { id: '#RF-2026-879', date: new Date('2026-03-13T09:00:00Z').toISOString(), total: 120.00, status: 'Delivered', customer: { firstName: 'Sebastian', lastName: 'W.', country: 'Suisse' } },
    { id: '#RF-2026-878', date: new Date('2026-03-11T12:00:00Z').toISOString(), total: 450.00, status: 'Delivered', customer: { firstName: 'Sophie', lastName: 'L.', country: 'Belgique' } },
    { id: '#RF-2026-877', date: new Date('2026-03-09T12:00:00Z').toISOString(), total: 600.00, status: 'Delivered', customer: { firstName: 'Marc', lastName: 'G.', country: 'France' } }
  ];

  const mockReviews = [
    { id: '1', rating: 5, status: 'pending', name: 'Jean Dupont', content: 'Superbe expérience !' },
    { id: '2', rating: 4, status: 'pending', name: 'Alice M.', content: 'Très bon, mais livraison un peu longue.' },
    { id: '3', rating: 5, status: 'approved', name: 'Sophie L.', content: 'Parfait comme toujours.' }
  ];

  const displayOrders = orders.length > 0 ? orders : mockOrders;
  const displayReviews = reviews.length > 0 ? reviews : mockReviews;

  // Compute stats
  const todayStr = new Date().toDateString();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const ordersToday = displayOrders.filter(o => {
    const d = new Date(o.date);
    return !isNaN(d.getTime()) && d.toDateString() === todayStr;
  });
  const revenueToday = ordersToday.reduce((sum, o) => sum + (o.total || 0), 0);
  
  const ordersMonth = displayOrders.filter(o => {
    const d = new Date(o.date);
    return !isNaN(d.getTime()) && d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });
  const revenueMonth = ordersMonth.reduce((sum, o) => sum + (o.total || 0), 0) + (orders.length === 0 ? 12450 : 0); // Add fake monthly base if mock
  
  const pendingReviews = displayReviews.filter(r => r.status === 'pending');
  const avgRating = displayReviews.length > 0 
    ? (displayReviews.reduce((sum, r) => sum + (r.rating || 0), 0) / displayReviews.length).toFixed(1)
    : 'N/A';

  // Last 3 transactions
  const lastOrders = displayOrders.slice(0, 3);

  // Group revenue by day for the last 7 days for the chart
  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d;
  });
  
  const salesDataPoints = last7Days.map(day => {
    let dayTotal = displayOrders
      .filter(o => new Date(o.date).toDateString() === day.toDateString())
      .reduce((sum, o) => sum + (o.total || 0), 0);
      
    // Add fake history data if using mock to populate the chart
    if (orders.length === 0 && day.toDateString() !== todayStr) {
       // use a pseudo-random value based on the day to avoid Math.random() hook purity errors
       dayTotal += (day.getDate() * 100) + 1000;
    }
    return dayTotal;
  });

  const dayLabels = last7Days.map(d => d.toLocaleDateString('fr-FR', { weekday: 'short' }));

  const salesData = {
    labels: dayLabels,
    datasets: [{
      label: 'Revenus (€)',
      data: salesDataPoints,
      borderColor: '#d4af37',
      backgroundColor: 'rgba(212, 175, 55, 0.1)',
      fill: true,
      tension: 0.4,
      borderWidth: 3
    }]
  };

  const salesOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { grid: { color: 'rgba(255,255,255,0.05)' }, border: { dash: [4, 4] }, ticks: { color: '#666' } },
      x: { grid: { display: false }, ticks: { color: '#666' } }
    }
  };

  // Group by country for the pie chart
  const countryDist = displayOrders.reduce((acc, order) => {
    const c = order.customer?.country || 'Autres';
    acc[c] = (acc[c] || 0) + 1;
    return acc;
  }, {});

  const distData = {
    labels: Object.keys(countryDist),
    datasets: [{
      data: Object.values(countryDist),
      backgroundColor: ['#d4af37', '#001f3f', '#2ecc71', '#444', '#ff9800'],
      borderWidth: 0
    }]
  };

  const distOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { color: '#e0e0e0', padding: 20 } }
    }
  };

  const trStyle = { borderBottom: '1px solid rgba(255, 255, 255, 0.03)' };
  const thStyle = { textAlign: 'left', padding: '15px', fontSize: '0.8rem', opacity: 0.4, borderBottom: '1px solid rgba(255, 255, 255, 0.05)' };
  const tdStyle = { padding: '20px 15px', fontSize: '0.9rem' };

  return (
    <div style={{ backgroundColor: '#0a0a0c', color: '#e0e0e0', minHeight: '100vh', display: 'flex', fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar */}
      <div style={{ width: '260px', backgroundColor: '#151518', borderRight: '1px solid rgba(255, 255, 255, 0.05)', padding: '30px 20px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
        <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.5rem', color: '#d4af37', textAlign: 'center', borderBottom: '2px solid #d4af37', paddingBottom: '20px' }}>
          ROYAL FORK
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 15px', borderRadius: '8px', textDecoration: 'none', color: '#d4af37', backgroundColor: 'rgba(212, 175, 55, 0.1)', fontWeight: 500 }}>
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 15px', borderRadius: '8px', textDecoration: 'none', color: '#e0e0e0', fontWeight: 500 }}>
            <ShoppingBag size={20} /> Commandes
          </Link>
          <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 15px', borderRadius: '8px', textDecoration: 'none', color: '#e0e0e0', fontWeight: 500 }}>
            <MessageSquare size={20} /> Avis Clients
          </Link>
          <Link to="/menu" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 15px', borderRadius: '8px', textDecoration: 'none', color: '#e0e0e0', fontWeight: 500 }}>
            <Utensils size={20} /> Gestion Menu
          </Link>
          <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 15px', borderRadius: '8px', textDecoration: 'none', color: '#e0e0e0', fontWeight: 500 }}>
            <Users size={20} /> Clients
          </Link>
        </div>
        <div style={{ marginTop: 'auto' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 15px', borderRadius: '8px', textDecoration: 'none', color: '#e0e0e0', fontWeight: 500 }}>
            <LogOut size={20} /> Retour au Site
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', marginBottom: '5px', background: 'linear-gradient(90deg, #fff, #d4af37)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Bonjour, Administrateur
            </h1>
            <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>Voici l'aperçu réel de l'activité de Royal Fork.</p>
          </div>
          <Link to="/admin" style={{ backgroundColor: '#d4af37', color: '#001f3f', padding: '12px 25px', borderRadius: '8px', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px', transition: 'all 0.3s' }}>
            <ExternalLink size={20} /> Gérer Commandes / Avis
          </Link>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px', marginBottom: '40px' }}>
          {[
            { icon: <TrendingUp color="#d4af37" size={24} />, value: `${revenueMonth.toFixed(2)}€`, label: "CA Mensuel" },
            { icon: <TrendingUp color="#d4af37" size={24} />, value: `${revenueToday.toFixed(2)}€`, label: "Recette du Jour" },
            { icon: <Package color="#d4af37" size={24} />, value: ordersToday.length, label: "Commandes du Jour" },
            { icon: <Star color="#d4af37" size={24} />, value: avgRating, label: "Note Moyenne" },
            { icon: <Clock color="#d4af37" size={24} />, value: pendingReviews.length, label: "Avis à Valider" },
          ].map((stat, i) => (
            <div key={i} style={{ backgroundColor: '#151518', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.03)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ marginBottom: '5px' }}>{stat.icon}</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700 }}>{stat.value}</div>
              <div style={{ fontSize: '0.7rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Charts Container */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '40px' }}>
          <div style={{ backgroundColor: '#151518', padding: '30px', borderRadius: '16px', height: '400px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h3 style={{ fontSize: '1.1rem' }}>Ventes des 7 derniers jours</h3>
            </div>
            <div style={{ height: '300px' }}>
              <Line data={salesData} options={salesOptions} />
            </div>
          </div>
          <div style={{ backgroundColor: '#151518', padding: '30px', borderRadius: '16px', height: '400px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h3 style={{ fontSize: '1.1rem' }}>Pays d'origine</h3>
            </div>
            <div style={{ height: '300px' }}>
               <Doughnut data={distData} options={distOptions} />
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div style={{ backgroundColor: '#151518', padding: '30px', borderRadius: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '20px' }}>Dernières Commandes</h3>
          {lastOrders.length === 0 ? (
            <p style={{ opacity: 0.5 }}>Aucune commande récente.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
              <thead>
                <tr>
                  <th style={thStyle}>ID COMMANDE</th>
                  <th style={thStyle}>CLIENT</th>
                  <th style={thStyle}>PAYS</th>
                  <th style={thStyle}>DATE</th>
                  <th style={thStyle}>MONTANT</th>
                  <th style={thStyle}>STATUT</th>
                </tr>
              </thead>
              <tbody>
                {lastOrders.map(order => {
                  const d = new Date(order.date);
                  const isValidDate = !isNaN(d.getTime());
                  const isToday = isValidDate && d.toDateString() === new Date().toDateString();
                  
                  let dateStr = 'Date inconnue';
                  if (isValidDate) {
                    const timeStr = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    dateStr = isToday ? `Aujourd'hui à ${timeStr}` : d.toLocaleDateString('fr-FR');
                  }
                  
                  let badgeColors = { bg: 'rgba(255,255,255,0.1)', col: '#ccc' };
                  if (order.status === 'Confirmed' || order.status === 'Delivered') badgeColors = { bg: 'rgba(46, 204, 113, 0.1)', col: '#2ecc71' };
                  if (order.status === 'Preparing') badgeColors = { bg: 'rgba(241, 196, 15, 0.1)', col: '#f1c40f' };

                  return (
                    <tr key={order.id} style={trStyle}>
                      <td style={tdStyle}>{order.id}</td>
                      <td style={tdStyle}>{order.customer?.firstName} {order.customer?.lastName}</td>
                      <td style={tdStyle}>{order.customer?.country || '-'}</td>
                      <td style={tdStyle}>{dateStr}</td>
                      <td style={{ ...tdStyle, fontWeight: 600 }}>{order.total}€</td>
                      <td style={tdStyle}>
                        <span style={{ padding: '5px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, background: badgeColors.bg, color: badgeColors.col }}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
