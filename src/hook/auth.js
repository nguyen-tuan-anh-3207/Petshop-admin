import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/authentication/slice';

export function useAuth() {
  const { user } = useSelector((state) => state.auth);

  return !!user;
}

export function useLogout() {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  return [onLogout];
}
