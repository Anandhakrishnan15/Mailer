import { useEffect } from "react";
import { useState } from "react";

const Fetchdata = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  console.log('data', data);
  

  const fetchBackend = async () => {
    try {
      const res = await fetch("http://localhost:5555/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // credentials:'include',
      });
      if(!res.ok){
        throw new Error(`http respons error in ${res.status}`)

      }
      const result =await res.json()
      console.log('the result is ',result);
      
      setData(result)
    } catch (error) {
        console.error("Fetch error:", err.message);
        setError("Failed to fetch data.");
    }
  };
  useEffect(()=>{
    fetchBackend()
  },[])

  return (
    <div>
      <h2>Backend Message:</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data ? <p>{data.message}</p> : <p>Loading...</p>}
    </div>
  );
};

export default Fetchdata;
