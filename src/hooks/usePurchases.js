import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPurchases } from '@/redux/slice/purchasesSlice';

const usePurchases = () => {
  const purchases = useSelector((state) => state.purchases);

  const dispatch = useDispatch();

  useEffect(() => {
    if (purchases.status === 'idle') {
      dispatch(fetchPurchases());
    }
  }, [purchases.status, dispatch]);

  return { purchases };
};

export default usePurchases;
