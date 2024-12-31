import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import Runs from "./Runs";

const OverList = ({ user, latestOver, isUpdating }) => {
  const [overs, setOvers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllOver();
  }, [user, latestOver, isUpdating]);

  const getAllOver = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/over/getAll");
      setOvers(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Error", error);
      setLoading(false);
    }
  };

  if (loading) {
    <p>loading.....</p>;
  }

  return (
    <div className="my-3">
      <h1 className="text-xl font-bold mb-2">All Overs</h1>
      {overs.map((over) => (
        <div
          key={over._id}
          className="flex items-baseline border-2 border-black px-2 rounded-lg mb-2"
        >
          <h2 className="flex text-base font-medium">Over {over.overNumber}</h2>
          <section className="flex mx-2 items-center  ">
            {over.result.map((ball, index) => (
              <Runs key={ball?._id} ball={ball} />
            ))}
          </section>
        </div>
      ))}
    </div>
  );
};

export default OverList;
