import React from "react";

const Runs = ({ ball }) => {
  let outcome;
  let ballNumber;

  if (ball.result) {
    outcome = ball.result.outcome;
    ballNumber = ball.result.ballNumber;
  }

  if (!ball.result) {
    outcome = ball.outcome;
    ballNumber = ball.ballNumber;
  }

  let color;

  if (outcome == "4") {
    color = "bg-green-300";
  }

  if (outcome == "6") {
    color = "bg-blue-300";
  }

  if (outcome == 0) {
    color = "bg-white";
  }

  if (outcome == 1 || outcome == 2 || outcome == 3) {
    color = "bg-gray-300";
  }

  if (outcome == -1) {
    color = "bg-red-500";
  }

  let suffix;

  if (ballNumber == 1) {
    suffix = "st";
  } else if (ballNumber == 2) {
    suffix = "nd";
  } else if (ballNumber == 3) {
    suffix = "rd";
  } else {
    suffix = "th";
  }

  return (
    <div>
      <div className="my-2 flex flex-col items-center  mx-4">
        <p
          className={`text-lg flex items-center  justify-center rounded-full border-2 border-black h-14 w-14 ${color} `}
        >
          {outcome == -1 ? "Out" : outcome}
        </p>
        <p>
          {ballNumber}
          {suffix} ball
        </p>
      </div>
    </div>
  );
};

export default Runs;
