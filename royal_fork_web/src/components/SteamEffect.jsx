import React from 'react';
import '../index.css';

const SteamEffect = () => {
  const [wisps, setWisps] = React.useState([]);

  React.useEffect(() => {
    // Creating more wisps for a denser, more "real" steam effect across all pages
    setWisps([...Array(15)].map(() => ({
      heightAdd: Math.random() * 100,
      widthAdd: Math.random() * 20,
      delayAdd: Math.random() * 5,
      durationAdd: Math.random() * 2,
      blurAdd: Math.random() * 4,
    })));
  }, []);

  return (
    <div style={{
      position: 'fixed',
      bottom: -20, // Slightly below to hide the start
      left: 0,
      right: 0,
      display: 'flex',
      justifyContent: 'space-around',
      pointerEvents: 'none',
      zIndex: 9999, // Above everything
      opacity: 0.6
    }}>
      {wisps.map((w, i) => (
        <div 
          key={i}
          className="steam-wisp"
          style={{ 
            height: `${80 + w.heightAdd}px`, 
            width: `${10 + w.widthAdd}px`,
            animationDelay: `${w.delayAdd}s`,
            animationDuration: `${3 + w.durationAdd}s`,
            filter: `blur(${6 + w.blurAdd}px)`,
          }}
        />
      ))}
    </div>
  );
};

export default SteamEffect;
