import { debounce } from 'lodash';
import { useEffect, useState } from 'react';

/**
 * This custom hook helps manage responsive behavior by updating
 * state based on window dimensions and provides cleanup for event listeners.
 * @returns The `useResponsive` custom hook returns an object containing the following properties:
 * - `isMobile`: a boolean indicating if the viewport width is less than or equal to 768px.
 * - `isTablet`: a boolean indicating if the viewport width is between 768px and 990px.
 * - `isDesktop`: a boolean indicating if the viewport width is greater than 1560px.
 */
const useResponsive = () => {
  const [state, setState] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLaptop: false,
    windowHeight: 0,
    windowWidth: 0
  });

  const onResizeHandler = () => {
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth <= 990;
    const isLaptop = window.innerWidth > 990 && window.innerWidth <= 1560;
    const isDesktop = window.innerWidth > 1560;

    setState({
      isMobile,
      isTablet,
      isDesktop,
      isLaptop,
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth
    });
  };

  const debouncedCall = debounce(onResizeHandler, 300);
  const setup = () => {
    window.addEventListener('resize', debouncedCall, false);
  };

  const cleanup = () => {
    window.removeEventListener('resize', debouncedCall, false);
  };

  useEffect(() => {
    onResizeHandler();

    setup();

    return () => {
      cleanup();
    };
  }, []);

  return state;
};

export default useResponsive;
