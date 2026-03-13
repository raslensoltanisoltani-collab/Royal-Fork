import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, limit, getDocs, doc, getDoc } from 'firebase/firestore';
import { BarChart2, Users, Globe, Smartphone, Monitor, Tablet } from 'lucide-react';

const Analytics = () => {
  const [totalVisits, setTotalVisits] = useState(0);
  const [recentVisits, setRecentVisits] = useState([]);
  const [pageStats, setPageStats] = useState([]);
  const [deviceStats, setDeviceStats] = useState({});
  const [browserStats, setBrowserStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Global counter
        const globalRef = doc(db, 'analytics', 'global');
        const globalSnap = await getDoc(globalRef);
        if (globalSnap.exists()) setTotalVisits(globalSnap.data().totalVisits || 0);

        // Recent visits
        const visitsQuery = query(collection(db, 'visits'), orderBy('timestamp', 'desc'), limit(50));
        const visitsSnap = await getDocs(visitsQuery);
        const visits = visitsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        setRecentVisits(visits);

        // Aggregate device & browser stats from recent visits
        const devices = {};
        const browsers = {};
        visits.forEach(v => {
          devices[v.device] = (devices[v.device] || 0) + 1;
          browsers[v.browser] = (browsers[v.browser] || 0) + 1;
        });
        setDeviceStats(devices);
        setBrowserStats(browsers);

        // Page stats
        const pagesQuery = await getDocs(collection(db, 'analytics'));
        const pages = pagesQuery.docs
          .filter(d => d.id.startsWith('page_'))
          .map(d => ({ ...d.data() }))
          .sort((a, b) => (b.visits || 0) - (a.visits || 0));
        setPageStats(pages);
      } catch (e) {
        console.error('Analytics fetch error:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const DeviceIcon = ({ type }) => {
    if (type === 'Mobile') return <Smartphone size={16} />;
    if (type === 'Tablet') return <Tablet size={16} />;
    return <Monitor size={16} />;
  };

  const StatCard = ({ icon, label, value, color = 'var(--gold)' }) => (
    <div style={{
      backgroundColor: 'white', borderRadius: '12px', padding: '24px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)', display: 'flex',
      alignItems: 'center', gap: '18px', border: '1px solid #eee'
    }}>
      <div style={{ backgroundColor: `${color}20`, borderRadius: '10px', padding: '12px', color }}>
        {icon}
      </div>
      <div>
        <p style={{ margin: 0, fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</p>
        <h3 style={{ margin: 0, fontSize: '2rem', color: 'var(--navy)', fontWeight: 'bold' }}>{value}</h3>
      </div>
    </div>
  );

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', color: 'var(--navy)' }}>
      <div>⏳ Chargement des statistiques...</div>
    </div>
  );

  return (
    <div className="section-padding" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <BarChart2 size={32} color="var(--gold)" />
          <div>
            <h1 style={{ margin: 0, color: 'var(--navy)', fontSize: '2rem' }}>Analytics</h1>
            <p style={{ margin: 0, color: '#888', fontSize: '0.9rem' }}>Statistiques de fréquentation — Royal Fork</p>
          </div>
        </div>

        {/* KPI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <StatCard
            icon={<Users size={24} />}
            label="Total des visites"
            value={totalVisits.toLocaleString()}
            color="var(--gold)"
          />
          <StatCard
            icon={<Globe size={24} />}
            label="Pages vues récentes"
            value={recentVisits.length}
            color="#4CAF50"
          />
          <StatCard
            icon={<Smartphone size={24} />}
            label="Mobiles (50 dernières)"
            value={deviceStats['Mobile'] || 0}
            color="#2196F3"
          />
          <StatCard
            icon={<Monitor size={24} />}
            label="Desktops (50 dernières)"
            value={deviceStats['Desktop'] || 0}
            color="#9C27B0"
          />
        </div>

        {/* Page Rankings + Device/Browser */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '40px' }}>
          {/* Top Pages */}
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid #eee' }}>
            <h3 style={{ color: 'var(--navy)', marginBottom: '20px', borderBottom: '2px solid var(--gold)', paddingBottom: '10px' }}>📄 Pages les plus visitées</h3>
            {pageStats.length === 0 ? (
              <p style={{ color: '#aaa' }}>Aucune donnée disponible</p>
            ) : (
              pageStats.map((p, i) => {
                const max = pageStats[0]?.visits || 1;
                const pct = Math.round((p.visits / max) * 100);
                return (
                  <div key={p.page} style={{ marginBottom: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.9rem' }}>
                      <span style={{ color: 'var(--navy)', fontWeight: 500 }}>{p.page || '/'}</span>
                      <span style={{ color: 'var(--gold)', fontWeight: 'bold' }}>{p.visits}</span>
                    </div>
                    <div style={{ height: '8px', backgroundColor: '#f0f0f0', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pct}%`, backgroundColor: i === 0 ? 'var(--gold)' : 'var(--navy)', borderRadius: '4px', transition: 'width 0.5s' }} />
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Device & Browser */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid #eee' }}>
              <h4 style={{ color: 'var(--navy)', marginBottom: '14px' }}>📱 Appareils</h4>
              {Object.entries(deviceStats).map(([device, count]) => (
                <div key={device} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f5f5f5' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#555' }}>
                    <DeviceIcon type={device} /> {device}
                  </span>
                  <strong style={{ color: 'var(--navy)' }}>{count}</strong>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid #eee' }}>
              <h4 style={{ color: 'var(--navy)', marginBottom: '14px' }}>🌐 Navigateurs</h4>
              {Object.entries(browserStats).map(([browser, count]) => (
                <div key={browser} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f5f5f5' }}>
                  <span style={{ color: '#555' }}>{browser}</span>
                  <strong style={{ color: 'var(--navy)' }}>{count}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Visits Table */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid #eee' }}>
          <h3 style={{ color: 'var(--navy)', marginBottom: '20px', borderBottom: '2px solid var(--gold)', paddingBottom: '10px' }}>🕐 50 Dernières visites</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--navy)', color: 'white' }}>
                  {['Page', 'Appareil', 'Navigateur', 'Langue', 'Source', 'Date'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentVisits.map((v, i) => (
                  <tr key={v.id} style={{ backgroundColor: i % 2 === 0 ? '#fafafa' : 'white' }}>
                    <td style={{ padding: '10px 14px', color: 'var(--navy)', fontWeight: 500 }}>{v.page}</td>
                    <td style={{ padding: '10px 14px', color: '#555' }}>{v.device}</td>
                    <td style={{ padding: '10px 14px', color: '#555' }}>{v.browser}</td>
                    <td style={{ padding: '10px 14px', color: '#555' }}>{v.language}</td>
                    <td style={{ padding: '10px 14px', color: '#888', fontSize: '0.8rem' }}>{v.referrer === 'direct' ? '—' : v.referrer}</td>
                    <td style={{ padding: '10px 14px', color: '#888' }}>
                      {v.timestamp?.toDate?.()?.toLocaleString('fr-FR') || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
