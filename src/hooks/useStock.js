import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStock } from '@/redux/slice/stockSlice'; 

const useStock = () => {
  const stock = useSelector((state) => state.stocks); 
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (stock.status === 'idle') {
      dispatch(fetchStock());
    }
  }, [stock.status, dispatch]); 

  return { stock }; 
};

export default useStock