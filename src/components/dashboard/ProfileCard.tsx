import { CreditCard, Receipt } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

export const ProfileCard = () => {
  type SECTION = "Dashboard" | "Profile";

  return (
    <div className="w-full">
      <div className="flex lg:flex-row flex-col justify-between items-center py-8 lg:py-10">
        <h1 className="font-bold text-2xl">Student Profile</h1>
        <div className="space-x-2 flex pt-8 sm:pt-0">
          <Button className="bg-blue-600 flex gap-4">
            {" "}
            View Receipts <Receipt />{" "}
          </Button>
          <Button className="bg-blue-600 rounded-lg flex gap-4">
            Fees Details <CreditCard />{" "}
          </Button>
        </div>
      </div>

      <div className="flex gap-4 md:flex-row flex-col   ">
        {/* avatar section */}
        <div className="  border-2 border-portal-ash   space-x-16 lg:space-x-0 lg:justify-between w-full p-4 flex flex-wrap flex-col md:flex-row gap-8 rounded-lg ">
          <Avatar className="w-24 h-24 roundded-full bg-portal-darkYellow">
            <AvatarImage src="" alt="profile_img" />
            <AvatarFallback>profile image</AvatarFallback>
          </Avatar>

          <div className="space-y-6 space-x-16  lg:space-x-0 md:flex lg:block  ">
            <div className="md:space-x-8 flex flex-col space-y-4 lg:flex-row">
              <h1 className="font-bold text-2xl uppercase">Oyeleke Victor</h1>
              <p className=" p-2 bg-portal-green rounded-sm w-fit uppercase">
                Admission no: flex113
              </p>
              <p className="">Email:victoroyeleke333@gmail.com</p>
              <p className="bg-portal-darkYellow  p-2 rounded-sm w-fit">
                Gender: MALE
              </p>
            </div>
            <div className="flex lg:justify-between md:justify-center gap-4 lg:flex-row flex-col">
              <p className="text-portal-ash">Course: Frontend development</p>
              <p className="text-portal-ash">Batch: 2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
