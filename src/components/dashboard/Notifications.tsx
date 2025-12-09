import { useState } from "react";

export const Notifications = () => {
  const [currentDate, setCurrentDate] = useState();
  const [deadline, setDeadline] = useState();

  const currentDate = new Date();

  // send notification when payment deadline is less than or equal to 10days (yellow warning)
  // when payment deadline less than or equal 3 days (red warning)

  // const notification =

  return (
    <div className="border-2 border-portal-ash rounded-lg">Notifications</div>
  );
};
