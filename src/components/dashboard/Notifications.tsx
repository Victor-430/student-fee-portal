import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Bell } from "lucide-react";

export const Notifications = () => {
  const [currentDate, setCurrentDate] = useState();
  const [deadline, setDeadline] = useState();

  const date = new Date();

  // send notification when payment deadline is less than or equal to 10days (yellow warning)
  // when payment deadline less than or equal 3 days (red warning)

  // const notification =

  return (
    <Card className="lg:w-[90%] rounded-lg  py-12 text-white bg-portal-darkGray ">
      <CardHeader>
        <CardTitle className=" text-center pb-6 flex justify-center items-center gap-4 text-2xl">
          Notifications <Bell />
        </CardTitle>
        <CardContent>
          <div className=" flex gap-4 justify-center">
            <div className="flex flex-col gap-4">
              <p>Upcoming</p>
              <p className="font-bold text-2xl">completed</p>
            </div>
            <div className="border-r-2 border-portal-lightCyan "></div>
            <div className="flex flex-col gap-4">
              <p>Due</p>
              <p className="font-bold text-2xl">10,000</p>
            </div>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
};
