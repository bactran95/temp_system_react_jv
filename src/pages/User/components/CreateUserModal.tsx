import { Input, Form, FormInstance } from 'core-ui';
import { User } from 'src/models/user';

interface CreateUserModalPropsI {
  form: FormInstance<User>;
}

const CreateUserModal = ({ form }: CreateUserModalPropsI) => {
  return (
    <div>
      <Form layout="vertical" form={form}>
        <Input
          isRequired
          name="phone_number"
          label="Phone number"
          inputType="phone"
        />
        <Input isRequired name="email" label="Email" inputType="email" />
        <Input isRequired name="address" label="Address" />

        <Input
          isRequired
          name="password"
          label="Password"
          inputType="password"
          type="password"
        />

        <Input name="note" label="Note" />
      </Form>
    </div>
  );
};

export default CreateUserModal;
