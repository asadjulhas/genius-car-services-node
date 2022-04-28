import axios from 'axios';
import { useEffect, useState } from 'react';

const useServices = () => {
 const [services, setServices] = useState([])
 useEffect(() => {
   axios.get('https://salty-ravine-90360.herokuapp.com/services', {
     headers: {
       token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhkbmF0b2swMkBnbWFpbC5jb20iLCJpYXQiOjE2NTExMjY2NzQsImV4cCI6MTY1MTIxMzA3NH0.ZwSZN7to7LBwW6ek_NYvRfQbRcDKR134fAro4oNmj44'
     }
   })
   .then(services => setServices(services.data))
 },[]);
 return [services, setServices];
}

export default useServices;