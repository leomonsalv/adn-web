import { useContext } from 'react';
import { SpinnerContext } from './context';

const useSpinnerContext = () => {
  const { loading, spinner, setLoading } = useContext(SpinnerContext);

  return {
    loading,
    spinner,
    setLoading
  };
};

export default useSpinnerContext;
