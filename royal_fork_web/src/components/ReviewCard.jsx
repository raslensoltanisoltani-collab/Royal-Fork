import React from 'react';
import { Star, Quote } from 'lucide-react';
import Card3D from './Card3D';

const ReviewCard = ({ name, role, content, rating = 5, date, createdAt }) => {
  // Format date if it's a Firestore timestamp
  const displayDate = date || (createdAt?.toDate ? createdAt.toDate().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) : null);
  return (
    <Card3D intensity={10} style={{ height: '100%' }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        border: '1px solid #eee'
      }}>
        <div style={{ position: 'absolute', top: '20px', right: '20px', opacity: 0.1 }}>
          <Quote size={40} color="var(--navy)" />
        </div>
        
        <div style={{ display: 'flex', gap: '2px', marginBottom: '15px' }}>
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={16} 
              fill={i < rating ? "var(--gold)" : "none"} 
              color="var(--gold)" 
            />
          ))}
        </div>

        <p style={{ 
          fontStyle: 'italic', 
          color: 'var(--text-dark)', 
          fontSize: '0.95rem', 
          lineHeight: '1.7',
          flex: 1,
          marginBottom: '20px'
        }}>
          "{content}"
        </p>

        <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '15px' }}>
          <div style={{ fontWeight: 'bold', color: 'var(--navy)', fontSize: '1rem' }}>{name}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--gold)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>{role}</div>
          {displayDate && <div style={{ fontSize: '0.7rem', opacity: 0.5, marginTop: '4px' }}>{displayDate}</div>}
        </div>
      </div>
    </Card3D>
  );
};

export default ReviewCard;
