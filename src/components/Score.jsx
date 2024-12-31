import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

const Score = ({ isUpdating, currentOver }) => {
  const [score, setScore] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getScore();
  }, [isUpdating, currentOver]);

  const getScore = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/score/get");
      setScore(response.data);
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
    <div className="flex  w-6/12 justify-center relative ">
      <div className="flex flex-col items-center">
        <p className="text-5xl  font-bold  ">
          {score?.totalRuns}/{score?.totalWickets}
        </p>
        <p className="text-2xl  font-medium  ">
          Over {score?.currentOver}.{score?.overLength}{" "}
        </p>
      </div>
    </div>
  );
};

export default Score;
