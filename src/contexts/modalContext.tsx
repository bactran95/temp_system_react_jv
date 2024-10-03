import { CSSProperties, createContext, useState } from 'react';
import { Button, Modal, ModalProps } from 'core-ui';

interface ModalProviderPropsI {
  children: React.ReactNode;
}

interface ModalConfigI {
  title?: string;
  content?: React.ReactNode | string;
  okeButtonLabel?: string;
  cancelButtonLabel?: string;
  footer?: React.ReactNode;
  okeButtonStyle?: CSSProperties;
  modalProps?: ModalProps;
  onOke?: () => void;
  onCancel?: () => void;
}

export const ModalContext = createContext({
  openModal: (_config?: ModalConfigI) => {},
  closeModal: () => {}
});

const defaultConfigs = {
  title: '',
  content: <></>,
  okeButtonLabel: '',
  cancelButtonLabel: '',
  footer: null,
  onOke: () => {},
  onCancel: () => {}
};

const ModalProvider = (props: ModalProviderPropsI) => {
  const { children } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState<ModalConfigI>(defaultConfigs);

  const openModal = (configs?: ModalConfigI) => {
    setModalConfig({ ...defaultConfigs, ...configs });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    closeModal();
    modalConfig?.onCancel?.();
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      <Modal
        centered
        open={isOpen}
        onCancel={closeModal}
        footer={modalConfig?.footer}
        {...modalConfig.modalProps}
      >
        <div className="mb-[10px] justify-center flex">
          {/* <WarningIcon /> */}
        </div>

        <p className="text-center text-[#4758ff] mb-[8px]">
          {modalConfig?.title}
        </p>

        <p>{modalConfig?.content}</p>

        <div className="flex pt-[8px] px-[16px] gap-[10px] justify-center mt-[32px]">
          <Button
            style={{
              width: '147px',
              height: '36px',
              fontSize: '16px'
            }}
            onClick={handleCancel}
          >
            {modalConfig?.cancelButtonLabel}
          </Button>
          <Button
            style={{
              width: '147px',
              height: '36px',
              fontSize: '16px',
              ...modalConfig?.okeButtonStyle
            }}
            type="primary"
            onClick={modalConfig?.onOke}
          >
            {modalConfig?.okeButtonLabel}
          </Button>
        </div>
      </Modal>
    </ModalContext.Provider>
  );
};

export default ModalProvider;
