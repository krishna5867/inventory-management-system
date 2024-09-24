import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStock } from '@/redux/slice/stockSlice';

const useStock = () => {
  const dispatch = useDispatch();
  const stock = useSelector((state) => state.stocks);

  useEffect(() => {
    if (stock.status === 'idle') {
      dispatch(fetchStock());
    }
  }, [dispatch, stock.status]);

  return { stock };
};

export default useStock;
