import { useContext } from 'react';
import { ModalContext } from 'src/contexts/modalContext';

const useModal = () => {
  return useContext(ModalContext);
};

export default useModal;
