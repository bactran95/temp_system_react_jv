import {
  Avatar,
  Badge,
  BellOutlined,
  CaretDownOutlined,
  Input,
  Popover,
  SearchOutlined,
  UserOutlined
} from 'core-ui';
import Cookies from 'js-cookie';
import { RoutePath } from 'src/enums/routePath';
import { ACCESS_TOKEN_KEY } from 'src/constants/auth';
import useHandleNetwork from 'src/hooks/useHandleNetwork';

const Header = () => {
  const handleLogout = () => {
    Cookies.remove(ACCESS_TOKEN_KEY);
    window.location.replace(RoutePath.LOGIN);
  };

  const { isOnline } = useHandleNetwork();

  return (
    <div className="h-[100%] flex items-center justify-between px-[20px]">
      <Input
        className="w-[40%] bg-[transparent]"
        prefix={
          <SearchOutlined
            style={{
              color: 'white'
            }}
          />
        }
      />

      <div className="flex items-center">
        <div className="mr-[57px] mt-[5px]">
          <Badge
            dot={true}
            color="orange"
            offset={[-5, 22]}
            style={{
              display: 'block'
            }}
          >
            <BellOutlined
              color="white"
              style={{
                fontSize: '24px',
                color: 'white'
              }}
            />
          </Badge>
        </div>

        <Popover
          placement="bottomRight"
          content={
            <div className="min-w-[100px]">
              <p onClick={handleLogout} className="cursor-pointer w-full">
                ログアウト
              </p>
            </div>
          }
        >
          <div className="flex cursor-pointer items-center">
            <Avatar
              size={32}
              icon={<UserOutlined />}
              style={{
                border: '1px solid white',
                minWidth: '32px'
              }}
              src={''}
            />

            <div className="mr-[20px] flex">
              <Badge
                dot={true}
                color="green"
                offset={[14, 10]}
                style={{
                  display: isOnline ? 'block' : 'none',
                  height: '10px',
                  width: '10px'
                }}
              >
                <div className="flex flex-col ml-[8px]">
                  <p className="leading-[20px] font-[700] text-white text-[16px] min-w-[60px]">
                    Name
                  </p>
                  <p className="leading-[20px] font-[400] text-white text-[12px] ">
                    Role
                  </p>
                </div>
              </Badge>
            </div>

            <CaretDownOutlined
              style={{
                color: 'white',
                marginLeft: '12px'
              }}
            />
          </div>
        </Popover>
      </div>
    </div>
  );
};

export default Header;
