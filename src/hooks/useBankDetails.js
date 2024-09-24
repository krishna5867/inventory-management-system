import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBankDetails } from '@/redux/slice/bankDetailsSlice';

const useBankDetails = () => {
  const bankDetails = useSelector((state) => state.bankDetails);

  const dispatch = useDispatch();

  useEffect(() => {
    if (bankDetails.status === 'idle') {
      dispatch(fetchBankDetails());
    }
  }, [bankDetails.status, dispatch]);

  return { bankDetails };
};

export default useBankDetails;
