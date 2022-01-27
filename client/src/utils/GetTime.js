import React, { useEffect, useState } from "react";

const GetTime = () => {
  const locale = "en";
  const [today, setDate] = useState(new Date()); // Save the current date to be able to trigger an update

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 100);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const time = today.toLocaleTimeString(locale, {
    hour: "numeric",
    // hour12: true,
    minute: "numeric",
    second: "numeric",
  });

  return <>{time}</>;
};

export default GetTime;
