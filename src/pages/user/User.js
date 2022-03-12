import { Avatar, Button } from '@mui/material';
import { RoleEnum } from '../../constants/object';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUpdateSearch } from 'src/hook/useSearchParams';
import CustomTable from '../../components/Table';
import { useLoadPagingUsersQuery } from '../../reducers/user/api'
import account from 'src/_mocks_/account';

export default function UserList() {

  const { search, pathname } = useLocation()

  const navigate = useNavigate()

  const { handleChangePageSize } = useUpdateSearch(pathname, search)

  const { data } = useLoadPagingUsersQuery(search)

  const { users, total } = data ?? {}

  const columns = [
    {
      id: 'image',
      label: 'Ảnh đại diện',
      render: (value) => value ? <Avatar alt="user_avatar" src={value?.url} /> : <Avatar src={account.photoURL} alt="photoURL" />
    },
    {
      id: 'username',
      label: 'Tên đăng nhập',
      render: (value) => value ?? '-'
    },
    {
      id: 'phoneNumber',
      label: 'Số điện thoại',
      render: (value) => value ?? '-'
    },
    {
      id: 'email',
      label: 'Email',
      render: (value) => value ?? '-'
    },
    {
      id: 'role',
      label: 'Vai trò',
      render: (value) => value === 1 ? RoleEnum.Admin : RoleEnum.Customer
    },
    {
      id: '',
      label: 'Hành động',
      align: 'center',
      action: (id) => {
        return (
          <React.Fragment>
            <Button onClick={() => navigate(`/dashboard/users/${id}`)}>Xem</Button>
            <Button onClick={() => navigate(`/dashboard/users/edit/${id}`)}>Cập nhật</Button>
          </React.Fragment>
        )
      }
    },
  ];

  return (
    <CustomTable
      title={'Danh sách người dùng'}
      data={users}
      total={total}
      columns={columns}
      handleChangePageSize={handleChangePageSize}
      pagination={true}
      link={'/dashboard/users/create'}
    />
  );
}
