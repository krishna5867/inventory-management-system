import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWarehouseLocationDetails } from '@/redux/slice/locationDetails';

const useWarehouseLocation = () => {
  const locationDetails = useSelector((state) => state.warehouseLocation);

  const dispatch = useDispatch();

  useEffect(() => {
    if (locationDetails.status === 'idle') {
      dispatch(fetchWarehouseLocationDetails());
    }
  }, [locationDetails.status, dispatch]);

  return { locationDetails };
};

export default useWarehouseLocation;
