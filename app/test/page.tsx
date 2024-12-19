"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/ai/demand', {
          body: JSON.stringify({
            item_id: 'ITEM9999',
            city: 'ExampleCity',
            date: '2024-07-15',
            quantity: 1000,
            category: 'Electronics',
          }),
        });
        setResponseData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setResponseData({ error: "Failed to fetch data" });
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Hello</h1>
      <pre>{JSON.stringify(responseData, null, 2)}</pre>
    </div>
  );
}
