import { useEffect, useState } from 'react';

const useServices = () => {
 const [services, setServices] = useState([])
 useEffect(() => {
   fetch('https://salty-ravine-90360.herokuapp.com/services')
   .then(res => res.json())
   .then(services => setServices(services))
 },[]);
 return [services, setServices];
}

export default useServices;