"use client";

import { useEffect, useState } from "react";

const InteractionStats = () => {
  const [totalFeedbacks, setTotalFeedbacks] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);

  useEffect(() => {
    const incrementValue = (
      setter: React.Dispatch<React.SetStateAction<number>>,
      targetValue: number,
      step: number,
      intervalTime: number
    ) => {
      let currentValue = 0;
      const intervalId = setInterval(() => {
        currentValue += step;
        setter(currentValue);
        if (currentValue >= targetValue) {
          setter(targetValue);
          clearInterval(intervalId);
        }
      }, intervalTime);
    };

    incrementValue(setTotalFeedbacks, 1200, 1, 1);
    incrementValue(setAverageRating, 4.8, 0.01, 10);
    incrementValue(setActiveUsers, 350, 1, 10);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-5xl mx-auto mt-10">
      <h2 className="text-2xl font-openSans font-bold mb-6 text-center">
        Interaction Statistics
      </h2>
      <div className="flex justify-between text-center py-8 px-4">
        <div>
          <p className="text-3xl font-poppins font-bold pb-2">
            {totalFeedbacks}
          </p>
          <p className="text-gray-800 font-roboto">Total Feedbacks</p>
        </div>
        <div>
          <p className="text-3xl font-poppins font-bold pb-2">
            {averageRating.toFixed(2)}
          </p>
          <p className="text-gray-800 font-roboto">Average Rating</p>
        </div>
        <div>
          <p className="text-3xl font-poppins font-bold pb-2">{activeUsers}</p>
          <p className="text-gray-800 font-roboto">Active Users</p>
        </div>
      </div>
    </div>
  );
};

export default InteractionStats;
