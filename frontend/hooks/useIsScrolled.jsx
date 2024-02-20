import { useEffect, useState } from 'react';

function useIsScrolled() {
  const [isFullyScrolled, setIsFullyScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.clientHeight;
      const scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;

      // Check if we are at the bottom of the page
      const fullyScrolled = scrollTop + windowHeight >= documentHeight;

      setIsFullyScrolled(fullyScrolled);
    }

    // Attach scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array means this effect runs only once after initial render

  return isFullyScrolled;
}

export default useIsScrolled;
