import { useEffect, useState } from "react";

const useSingleService = (id) => {
  const [service, setService] = useState([])
  useEffect(() => {
    fetch(`https://salty-ravine-90360.herokuapp.com/service/${id}`)
    .then(res => res.json())
    .then(service => setService(service))
  },[])
  return [service, setService];
}

export default useSingleService;