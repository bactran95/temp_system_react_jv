import { Input, Form, notification, Button } from 'core-ui';
import { useNavigate } from 'react-router-dom';
import { LoginFormI } from 'src/models/auth';
import { notifyMessage } from 'src/constants/message';
import { isString } from 'lodash';
import { login } from 'src/services/auth';
import { RoutePath } from 'src/enums/routePath';
import { useTranslation } from 'react-i18next';
import { LanguageCodes } from 'src/constants/languages';

const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleLogin = async (form: LoginFormI) => {
    try {
      await login({
        email: form?.email?.trim(),
        password: form?.password?.trim()
      });
      navigate(RoutePath.USER);

      notification.success({
        message: notifyMessage.success
      });
    } catch (err) {
      const resMessage = (err as any)?.response?.data?.errors;
      const errorMessage = isString(resMessage)
        ? resMessage
        : notifyMessage.failed;

      notification.error({
        message: errorMessage
      });
    } finally {
    }
  };

  const { i18n, t } = useTranslation();

  const handleChangeLanguage = () => {
    let newLang =
      i18n.language === LanguageCodes.EN ? LanguageCodes.JP : LanguageCodes.EN;
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="h-[100vh] gap-[30px] flex">
      <div className="h-full">
        <img
          src="/login-bg.png"
          alt=""
          style={{
            height: '100%',
            width: '100%'
          }}
        />
      </div>

      <div className="bg-white justify-center items-center flex-1 flex">
        <div className="flex w-[300px] flex-col gap-[10px]">
          <p className="font-[700] text-[24px] text-center">Login to account</p>
          <h2 className="font-bold text-3xl text-center"> {t('Dashboard')}</h2>
          <div>
            <button onClick={handleChangeLanguage}>Change languages</button>
          </div>

          <p>Welcome back! Please Log in to youir Account</p>

          <Form
            layout="vertical"
            form={form}
            name="control-hooks"
            onFinish={handleLogin}
            style={{ maxWidth: 600 }}
          >
            <Input label="Email" inputType="email" name="email" isRequired />
            <Input
              label="Password "
              inputType="password"
              name="password"
              type="password"
              isRequired
            />

            <Form.Item className="mt-3">
              <Button
                htmlType="submit"
                type="primary"
                className="w-full bg-[#4759FF]"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
