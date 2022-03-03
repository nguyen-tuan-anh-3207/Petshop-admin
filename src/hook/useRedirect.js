import { useNavigate } from 'react-router-dom';

export const useRedirect = () => {
  const navigate = useNavigate();

  const onRedirect = ({ path, isBack }) => {
    if (path) {
      navigate(path);
      return;
    }

    if (isBack) {
      navigate(-1);
    }
  };

  return [onRedirect];
};
