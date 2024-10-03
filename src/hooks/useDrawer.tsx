import { useContext } from 'react';
import { DrawerContext } from 'src/contexts/drawerContext';

const useDrawer = () => {
  return useContext(DrawerContext);
};

export default useDrawer;
