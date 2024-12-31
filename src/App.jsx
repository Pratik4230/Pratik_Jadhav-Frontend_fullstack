import "./App.css";
import Score from "./components/Score";
import CurrentOver from "./components/CurrentOver";
import OverList from "./components/OverList";
import { useEffect, useState } from "react";
import axiosInstance from "./utils/axiosInstance";

function App() {
  const userStyle =
    "text-xl font-bold  border-2 border-black bg-blue-500 text-white p-3 rounded-xl shadow-2xl";

  const [latestOver, setLatestOver] = useState(1);
  const [currentUser, setCurrentUser] = useState("Admin user");
  const [isUpdating, setUpdating] = useState(false);

  useEffect(() => {
    getLatestOver();
  }, [currentUser, latestOver]);

  const getLatestOver = async () => {
    try {
      const response = await axiosInstance.get("/score/currentOver");
      setLatestOver(response?.data?.currentOver);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const updateUser = (user) => {
    setCurrentUser(user);
  };

  const ResetAll = async () => {
    try {
      const response = await axiosInstance.post("/reset", {});

      setLatestOver(0);
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <>
      <div className="flex justify-around p-3 ">
        <p className="text-2xl font-bold">
          {" "}
          <span className=" font-normal">User:</span> {currentUser}
        </p>
        <section className=" ">
          <button
            onClick={() => ResetAll()}
            className="py-2 px-3 bg-red-500 text-white font-medium text-lg rounded-xl hover:bg-black "
          >
            Reset
          </button>
        </section>
      </div>
      <div className="flex flex-col items-center w-full">
        <Score isUpdating={isUpdating} currentOver={latestOver} />
        <CurrentOver
          latestOver={latestOver}
          user={currentUser}
          setLatestOver={setLatestOver}
          isUpdating={isUpdating}
          setUpdating={setUpdating}
        />

        {currentUser == "Admin user" && (
          <OverList
            user={currentUser}
            latestOver={latestOver}
            isUpdating={isUpdating}
          />
        )}
        <div className="flex justify-evenly w-full my-5">
          <p
            className={userStyle}
            onClick={(e) => updateUser(e.target.innerText)}
          >
            Admin user
          </p>
          <p
            className={userStyle}
            onClick={(e) => updateUser(e.target.innerText)}
          >
            Pratik
          </p>
          <p
            className={userStyle}
            onClick={(e) => updateUser(e.target.innerText)}
          >
            Guest User
          </p>
          <p
            className={userStyle}
            onClick={(e) => updateUser(e.target.innerText)}
          >
            Test User
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
