import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSku } from '@/redux/slice/skuSlice'; 

const useSku = () => {
  const sku = useSelector((state) => state.sku); 
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (sku.status === 'idle') {
      dispatch(fetchSku());
    }
  }, [sku.status, dispatch]); 

  return { sku }; 
};

export default useSku;