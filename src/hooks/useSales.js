import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSales } from '@/redux/slice/salesSlice';

const useSales = () => {
  const sales = useSelector((state) => state.sales);

  const dispatch = useDispatch();

  useEffect(() => {
    if (sales.status === 'idle') {
      dispatch(fetchSales());
    }
  }, [sales.status, dispatch]);

  return { sales };
};

export default useSales;
