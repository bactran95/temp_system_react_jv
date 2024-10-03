import { createContext, useState } from 'react';
import { CloseOutlined, Button, Drawer } from 'core-ui';

interface DrawerProviderPropsI {
  children: React.ReactNode;
}

interface DrawerConfigI {
  title: string;
  content?: React.ReactNode;
  okeButtonLabel?: string;
  cancelButtonLabel?: string;
  hideFooter?: boolean;
  onOke?: () => void;
  onCancel?: () => void;
}

export const DrawerContext = createContext({
  openDrawer: (_config?: DrawerConfigI) => {},
  closeDrawer: () => {}
});

const defaultConfigs = {
  title: '',
  content: <></>,
  okeButtonLabel: '',
  cancelButtonLabel: '',
  hideFooter: false,
  onOke: () => {},
  onCancel: () => {}
};

const DrawerProvider = (props: DrawerProviderPropsI) => {
  const { children } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [drawerConfig, setDrawerConfig] =
    useState<DrawerConfigI>(defaultConfigs);

  const openDrawer = (configs?: DrawerConfigI) => {
    setDrawerConfig({ ...defaultConfigs, ...configs });
    setIsOpen(true);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  return (
    <DrawerContext.Provider value={{ openDrawer, closeDrawer }}>
      {children}
      <Drawer
        placement="right"
        onClose={closeDrawer}
        open={isOpen}
        bodyStyle={{
          padding: '0px'
        }}
        headerStyle={{
          display: 'none'
        }}
      >
        <div className="flex flex-col h-[100%]">
          <div className="flex bg-[#4758ff] text-white justify-between h-[56px] px-[18px] items-center">
            <p className="font-[500] text-[20px]">{drawerConfig?.title}</p>

            <CloseOutlined
              style={{
                color: 'white',
                fontSize: '24px'
              }}
              onClick={closeDrawer}
            />
          </div>

          <div className="px-[16px] py-[24px] flex-1">
            {drawerConfig.content}
          </div>

          {drawerConfig?.hideFooter || (
            <div className="flex h-[83px] pt-[8px] px-[16px] border-t border-t-[#ebebeb] gap-[4px]">
              <Button
                style={{
                  width: 'calc(50% - 2px)',
                  height: '40px',
                  fontSize: '16px'
                }}
                onClick={drawerConfig?.onCancel}
              >
                {drawerConfig.cancelButtonLabel as string}
              </Button>
              <Button
                style={{
                  width: 'calc(50% - 2px)',
                  height: '40px',
                  fontSize: '16px'
                }}
                type="primary"
                onClick={drawerConfig?.onOke}
              >
                {drawerConfig?.okeButtonLabel as string}
              </Button>
            </div>
          )}
        </div>
      </Drawer>
    </DrawerContext.Provider>
  );
};

export default DrawerProvider;
