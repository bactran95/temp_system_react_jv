import { useRef } from 'react';

/**
 * This custom hook returns true on the first render and false on subsequent renders.
 */
const useIsFirstRender = () => {
  const isFirstRenderRef = useRef(true);

  if (isFirstRenderRef.current) {
    isFirstRenderRef.current = false;

    return true;
  }

  return isFirstRenderRef.current;
};

export default useIsFirstRender;
