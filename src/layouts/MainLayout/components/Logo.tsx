import { MailOutlined, MenuOutlined } from 'core-ui';

const Logo = () => {
  return (
    <div className="flex items-center flex-nowrap overflow-x-hidden gap-x-[10px] text-[20px] justify-center h-[100%]">
      <MenuOutlined />
      <MailOutlined />
      <span>Mailbox</span>
    </div>
  );
};

export default Logo;
