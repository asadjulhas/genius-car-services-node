import { useEffect, useState } from 'react';

const useServices = () => {
 const [services, setServices] = useState([])
 useEffect(() => {
   fetch('http://localhost:5000/services')
   .then(res => res.json())
   .then(services => setServices(services))
 },[]);
 return [services];
}

export default useServices;