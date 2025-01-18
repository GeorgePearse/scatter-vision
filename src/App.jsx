import React from 'react';
import createScatterplot from 'regl-scatterplot';

function App() {
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const [refreshTrigger, setRefreshTrigger] = React.useState(0);
  const scatterplotRef = React.useRef(null);

  const initializeScatterplot = (points) => {
    if (scatterplotRef.current) {
      scatterplotRef.current.destroy();
    }

    // Initialize the scatterplot
    const scatterplot = createScatterplot({
      canvas: document.querySelector('#plot-canvas'),
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: isDarkMode ? [0.1, 0.1, 0.1, 1] : [1, 1, 1, 1],
      pointColor: isDarkMode ? [1, 1, 1, 0.6] : [0, 0, 0, 0.6],
    });

    // Set the points
    scatterplot.draw(points);

    // Store reference
    scatterplotRef.current = scatterplot;

    // Handle window resize
    const handleResize = () => {
      scatterplot.resize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      scatterplot.destroy();
    };
  };

  React.useEffect(() => {
    // Fetch points from API
    const fetchPoints = async () => {
      const response = await fetch('/api/points');
      const data = await response.json();
      return data.points;
    };

    let cleanup;
    fetchPoints().then(points => {
      cleanup = initializeScatterplot(points);
    });

    return () => {
      if (cleanup) cleanup();
    };
  }, [isDarkMode, refreshTrigger]); // Re-run effect when theme changes or refresh is clicked

  return (
    <div style={{ 
      backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
      minHeight: '100vh',
      position: 'relative'
    }}>
      <h1 style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        margin: 0,
        zIndex: 1000,
        color: isDarkMode ? '#ffffff' : '#1a1a1a',
        fontFamily: 'Arial, sans-serif',
        fontSize: '24px'
      }}>
        Scatter Vision
      </h1>
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 1000,
          padding: '8px 16px',
          borderRadius: '4px',
          border: 'none',
          backgroundColor: isDarkMode ? '#ffffff' : '#1a1a1a',
          color: isDarkMode ? '#1a1a1a' : '#ffffff',
          cursor: 'pointer',
          fontWeight: 'bold',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}
      >
        {isDarkMode ? '☀️ Light' : '🌙 Dark'}
      </button>
      <button
        onClick={() => setRefreshTrigger(prev => prev + 1)}
        style={{
          position: 'absolute',
          top: '20px',
          right: '120px',
          zIndex: 1000,
          padding: '8px 16px',
          borderRadius: '4px',
          border: 'none',
          backgroundColor: isDarkMode ? '#ffffff' : '#1a1a1a',
          color: isDarkMode ? '#1a1a1a' : '#ffffff',
          cursor: 'pointer',
          fontWeight: 'bold',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}
      >
        🔄 Refresh
      </button>
      <canvas 
        id="plot-canvas" 
        style={{ 
          width: '100vw', 
          height: '100vh', 
          margin: 0,
          display: 'block'
        }} 
      />
    </div>
  );
}

export default App; 
