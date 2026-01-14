// Responsive Canvas Dimensions
  const [canvasDims, setCanvasDims] = useState({ width: 800, height: 600 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const mobile = width < 640;
      setIsMobile(mobile);

      if (mobile) {
        // Mobile: Use full width, calculate height based on screen
        const mobileWidth = Math.min(width, 500);
        const mobileHeight = Math.min(height * 0.7, 700);
        setCanvasDims({
          width: mobileWidth,
          height: mobileHeight
        });
      } else {
        // Desktop: Standard canvas size
        setCanvasDims({
          width: 800,
          height: 600
        });
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
