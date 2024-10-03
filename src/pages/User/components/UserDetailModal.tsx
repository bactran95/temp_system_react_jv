import { Input, Form, FormInstance } from 'core-ui';
import { User } from 'src/models/user';

interface UserDetailModalPropsI {
  form: FormInstance<User>;
  isEdit?: boolean;
}

const UserDetailModal = ({ form, isEdit = false }: UserDetailModalPropsI) => {
  return (
    <div>
      <Form layout="vertical" form={form}>
        <Input
          disabled={!isEdit}
          name="phone_number"
          label="Phone number"
          inputType="phone"
        />

        <Input disabled={!isEdit} name="address" label="Address" />
        <Input
          disabled={!isEdit}
          name="email"
          label="Email"
          inputType="email"
        />

        <Input disabled={!isEdit} name="note" label="Note" />
      </Form>
    </div>
  );
};

export default UserDetailModal;
