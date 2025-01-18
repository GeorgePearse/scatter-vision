import React from 'react';
import createScatterplot from 'regl-scatterplot';

function App() {
  const [isDarkMode, setIsDarkMode] = React.useState(true);

  React.useEffect(() => {
    // Create random points
    const numPoints = 10000;
    const points = Array(numPoints)
      .fill()
      .map(() => [
        Math.random() * 2 - 1, // x between -1 and 1
        Math.random() * 2 - 1  // y between -1 and 1
      ]);

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

    // Handle window resize
    const handleResize = () => {
      scatterplot.resize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      scatterplot.destroy();
    };
  }, [isDarkMode]); // Re-run effect when theme changes

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
