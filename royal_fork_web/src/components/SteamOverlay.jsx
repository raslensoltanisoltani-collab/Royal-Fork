import React from 'react';
import '../index.css';

const SteamOverlay = ({ count = 5, height = '60px', opacity = 0.5 }) => {
  const [wisps, setWisps] = React.useState([]);

  React.useEffect(() => {
    setWisps([...Array(count)].map(() => ({
      heightAdd: Math.random() * 40,
      widthAdd: Math.random() * 8,
      delayAdd: Math.random() * 3,
      durationAdd: Math.random() * 1.5,
      blurAdd: Math.random() * 3,
    })));
  }, [count]);

  return (
    <div style={{
      position: 'absolute',
      bottom: '10%', // Start from the food level
      left: 0,
      right: 0,
      display: 'flex',
      justifyContent: 'space-around',
      pointerEvents: 'none',
      zIndex: 5,
      opacity: opacity
    }}>
      {wisps.map((w, i) => (
        <div 
          key={i}
          className="steam-wisp"
          style={{ 
            height: `${parseInt(height) + w.heightAdd}px`, 
            width: `${6 + w.widthAdd}px`,
            animationDelay: `${w.delayAdd}s`,
            animationDuration: `${2 + w.durationAdd}s`,
            filter: `blur(${3 + w.blurAdd}px)`,
          }}
        />
      ))}
    </div>
  );
};

export default SteamOverlay;
