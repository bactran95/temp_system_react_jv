import CreateUserModal from './components/CreateUserModal';
import useDrawer from 'src/hooks/useDrawer';
import useModal from 'src/hooks/useModal';
import UserDetailModal from './components/UserDetailModal';
import {
  Button,
  Table,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  Form,
  InfoCircleOutlined,
  LockOutlined,
  notification,
  Popover,
  UnlockOutlined
} from 'core-ui';
import {
  createUser,
  deleteUser,
  getUsers,
  lockUser,
  unlockUser,
  updateUser
} from 'src/services/user';
import { handleError } from 'src/utils/common';
import { notifyMessage } from 'src/constants/message';
import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { User } from 'src/models/user';
import { ErrorResponse } from 'src/models/apiRequest';

const UserPage = () => {
  const [params, setParams] = useState({
    page: 1,
    limit: 10
  });

  const { data, refetch, isLoading } = useQuery(['users', params], () =>
    getUsers(params)
  );
  const { openDrawer, closeDrawer } = useDrawer();
  const { openModal, closeModal } = useModal();

  const [form] = Form.useForm<User>();

  const columns = [
    {
      title: 'No.',
      dataIndex: 'id',
      key: 'id',
      render: (_: string, __: User, index: number) => {
        return index + 1 + (params?.page - 1) * params?.limit;
      }
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_number',
      key: 'phone_number'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note'
    },
    {
      title: 'Actions',
      dataIndex: '',
      key: 'action',
      render: (_: string, record: User) => {
        return (
          <Popover
            className="cursor-pointer"
            placement="bottomRight"
            content={
              <div className="flex gap-x-[10px] text-[20px]">
                <EditOutlined onClick={handleOpenEditUserModal(record)} />

                {record?.locked ? (
                  <UnlockOutlined
                    onClick={openConfirmUnLockUserModal(record)}
                  />
                ) : (
                  <LockOutlined onClick={openConfirmLockUserModal(record)} />
                )}

                <InfoCircleOutlined
                  onClick={handleOpenUserDetailModal(record)}
                />
                <DeleteOutlined
                  onClick={handleOpenConfirmDeleteModal(record)}
                />
              </div>
            }
          >
            <EllipsisOutlined />
          </Popover>
        );
      }
    }
  ];

  const openConfirmUnLockUserModal = (user: User) => () => {
    openModal({
      content: (
        <div className="flex flex-col justify-start">
          <InfoCircleOutlined className="text-[40px]" />
          <p className="font-[700] text-[34px]">UNLOCK</p>
          <p className="my-[10px]">
            Are you sure to un-lock the employee account ?
          </p>
        </div>
      ),
      okeButtonLabel: 'Yes',
      cancelButtonLabel: 'No',
      okeButtonStyle: {
        backgroundColor: '#4759ff'
      },
      modalProps: {
        width: 400
      },
      onOke: handleUnlockUser(user)
    });
  };

  const openConfirmLockUserModal = (user: User) => () => {
    openModal({
      content: (
        <div className="flex flex-col justify-start">
          <InfoCircleOutlined className="text-[40px]" />
          <p className="font-[700] text-[34px]">LOCK</p>
          <p className="my-[10px]">
            Are you sure to lock the employee account ?
          </p>
        </div>
      ),
      okeButtonLabel: 'Yes',
      cancelButtonLabel: 'No',
      okeButtonStyle: {
        backgroundColor: '#4759ff'
      },
      modalProps: {
        width: 400
      },
      onOke: handleLockUser(user)
    });
  };

  const handleLockUser = (user: User) => async () => {
    try {
      await lockUser(user);
      closeModal();
      notification.success({
        message: notifyMessage.success
      });
      refetch();
    } catch (err) {
      handleError(err as ErrorResponse);
    }
  };

  const handleUnlockUser = (user: User) => async () => {
    try {
      await unlockUser(user);
      closeModal();
      notification.success({
        message: notifyMessage.success
      });
      refetch();
    } catch (err) {
      handleError(err as ErrorResponse);
    }
  };

  const handleOpenConfirmDeleteModal = (user: User) => () => {
    openModal({
      content: (
        <div className="flex flex-col justify-start">
          <InfoCircleOutlined className="text-[40px] text-[#d83535]" />
          <p className="font-[700] text-[34px]">WARNING</p>
          <p className="my-[10px]">
            You definitely want to delete this account ?
          </p>
        </div>
      ),
      okeButtonLabel: 'Yes',
      cancelButtonLabel: 'No',
      okeButtonStyle: {
        backgroundColor: '#d83535'
      },
      modalProps: {
        width: 400
      },
      onOke: handleDeleteUser(user)
    });
  };

  const handleDeleteUser = (user: User) => async () => {
    try {
      await deleteUser(user);
      closeModal();
      notification.success({
        message: notifyMessage.success
      });
      refetch();
    } catch (err) {
      handleError(err as ErrorResponse);
    }
  };

  const handleOpenEditUserModal = (user: User) => () => {
    form.setFieldsValue(user);

    openDrawer({
      title: 'Detail information',
      cancelButtonLabel: 'Cancel',
      okeButtonLabel: 'Save',
      content: <UserDetailModal form={form} isEdit />,
      onOke: handleUpdateUser(user.id)
    });
  };

  const handleUpdateUser = (userId: number) => async () => {
    const updatedUser = form.getFieldsValue();

    try {
      await updateUser({
        ...updatedUser,
        id: userId
      });
      closeDrawer();
      notification.success({
        message: notifyMessage.success
      });
      refetch();
    } catch (err) {
      handleError(err as ErrorResponse);
    }
  };

  const handleOpenUserDetailModal = (user: User) => () => {
    form.setFieldsValue(user);
    openDrawer({
      title: 'Detail information',
      hideFooter: true,
      content: <UserDetailModal form={form} />
    });
  };

  const handleCreateUser = async () => {
    try {
      const newUser = form.getFieldsValue();
      await createUser(newUser);
      closeDrawer();
      notification.success({
        message: notifyMessage.success
      });
    } catch (err) {
      handleError(err as ErrorResponse);
    }
  };

  const handleOpenCreateUserModal = () => {
    form.resetFields();
    openDrawer({
      title: 'Create New',
      content: <CreateUserModal form={form} />,
      cancelButtonLabel: 'Cancel',
      okeButtonLabel: 'Save',
      onOke: handleCreateUser
    });
  };

  const users = useMemo(() => {
    return Array.isArray(data?.data?.users) ? data?.data?.users : [];
  }, [data]);

  const handleChangePage = (page: number) => {
    setParams({
      ...params,
      page
    });
  };

  return (
    <div>
      <div className="flex justify-end p-[15px]">
        <Button type="primary" onClick={handleOpenCreateUserModal}>
          Create new
        </Button>
      </div>

      <Table
        dataSource={users}
        columns={columns as any}
        pagination={{
          pageSize: 10,
          current: params.page,
          total: (data?.meta?.total_pages || 1) * params.limit,
          onChange: handleChangePage
        }}
        loading={isLoading}
      />
    </div>
  );
};

export default UserPage;
