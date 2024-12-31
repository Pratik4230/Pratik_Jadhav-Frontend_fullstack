import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import Runs from "./Runs";
import { CirclePlus } from "lucide-react";

const CurrentOver = ({
  latestOver,
  user,
  setLatestOver,
  isUpdating,
  setUpdating,
}) => {
  const [currentOver, setCurrentOver] = useState([]);
  const [loading, setLoading] = useState(false);

  const commonButton =
    "text-lg flex items-center  justify-center rounded-full border-2 border-black h-12 w-12";

  useEffect(() => {
    getCurrentOver();
  }, [isUpdating, user]);

  const getCurrentOver = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/over/get/${latestOver}`);
      setCurrentOver(response?.data?.over);

      setLoading(false);
    } catch (error) {
      console.log("Error", error);
      setLoading(false);
    }
  };

  const updateOver = async (overNumber, ballNumber, outcome, name) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(`/over/update`, {
        overNumber,
        ballNumber,
        outcome,
        name,
      });
      setUpdating(!isUpdating);
      setLoading(false);
    } catch (error) {
      console.log("Error", error);
      setLoading(false);
    }
  };

  const handleUpdate = (e) => {
    let ballNumber = currentOver?.length + 1;
    let outcome = e.target.innerText;

    if (outcome == "Out") {
      outcome = "-1";
    }

    updateOver(latestOver, ballNumber, outcome, user);
  };

  const createNewOver = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(`/over/create`, { name: user });
      setCurrentOver(response?.data?.over?.result);
      setLatestOver(response?.data?.over?.overNumber);

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
    <div className="my-5">
      <p className="text-xl font-semibold">This Over</p>

      {latestOver > 0 && (
        <div className="flex items-center border-2 border-black p-1.5 ">
          {currentOver?.length > 0 &&
            currentOver?.map((ball) => (
              <Runs key={ball?.result?._id} ball={ball} />
            ))}

          {user == "Admin user" && currentOver?.length < 6 && currentOver && (
            <button
              onClick={() => setUpdating(!isUpdating)}
              className="flex  justify-center items-center border-2 border-yellow-400 rounded-full h-12 w-12 "
            >
              {!isUpdating && <CirclePlus />}
            </button>
          )}
        </div>
      )}

      {user == "Admin user" &&
        (currentOver?.length == 6 || latestOver == 0) && (
          <button
            onClick={() => createNewOver()}
            className="p-3 border-2 border-black mt-2 text-xl font-medium rounded-xl bg-black text-white "
          >
            Add new Over
          </button>
        )}

      {isUpdating && (
        <section className="  mt-2 flex  flex-wrap w-[70%] justify-self-end justify-end gap-4 ">
          <button
            onClick={(e) => handleUpdate(e)}
            className={`${commonButton} bg-white `}
          >
            0
          </button>
          <button
            onClick={(e) => handleUpdate(e)}
            className={`${commonButton} bg-gray-300  `}
          >
            1
          </button>
          <button
            onClick={(e) => handleUpdate(e)}
            className={`${commonButton} bg-gray-300 `}
          >
            2
          </button>
          <button
            onClick={(e) => handleUpdate(e)}
            className={`${commonButton} bg-gray-300 `}
          >
            3
          </button>
          <button
            onClick={(e) => handleUpdate(e)}
            className={`${commonButton} bg-green-300 `}
          >
            4
          </button>
          <button
            onClick={(e) => handleUpdate(e)}
            className={`${commonButton} bg-blue-300 `}
          >
            6
          </button>
          <button
            onClick={(e) => handleUpdate(e)}
            className={`${commonButton} bg-red-500 `}
          >
            Out
          </button>
        </section>
      )}
    </div>
  );
};

export default CurrentOver;
