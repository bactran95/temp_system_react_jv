import { Layout, MenuProps, UserOutlined } from 'core-ui';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Logo from './components/Logo';

const MainLayout = () => {
  const menuItems: MenuProps['items'] = [
    {
      key: 'user',
      icon: React.createElement(UserOutlined),
      label: 'User'
    }
  ];

  return (
    <Layout
      headerContent={<Header />}
      logoContent={<Logo />}
      logoClassName="flex justify-center items-center"
      menuItems={menuItems}
      siderStyle={{
        overflowX: 'hidden'
      }}
      contentStyle={{
        overflow: 'auto'
      }}
    >
      <Outlet />
    </Layout>
  );
};

export default MainLayout;
