// import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Edit, Receipt, CreditCard } from "lucide-react";

export const StudentProfile = () => {
  // const feeNavigation = useNavigate();

  return (
    // {/* student profile */}
    <div className="lg:px-8 px-2 pb-8 border-2 border-portal-ash rounded-lg text-lg lg:text-xl ">
      <div className="flex lg:flex-row flex-col justify-between items-center py-8 lg:py-10">
        <h1 className="">Student Profile</h1>
        <div className="space-x-2 flex pt-8 sm:pt-0">
          <Button className="bg-blue-600 flex gap-2">
            {" "}
            View Receipts <Receipt />{" "}
          </Button>
          <Button className="bg-blue-600  flex gap-2 rounded-lg">
            Fees Details <CreditCard />{" "}
          </Button>
        </div>
      </div>
      <div className="">
        <div className="flex gap-4 lg:flex-row flex-col">
          {/* avatar section */}
          <div className="  border-2 border-portal-ash p-4 flex flex-col gap-8 rounded-lg ">
            <Avatar className="w-24 h-24 roundded-full bg-portal-darkYellow">
              <AvatarImage src="" alt="profile_img" />
              <AvatarFallback>profile image</AvatarFallback>
            </Avatar>

            <div className="space-y-3">
              <h1>Oyeleke Victor</h1>
              <p className=" p-2 bg-portal-green rounded-sm w-fit uppercase">
                Admission no: flex113
              </p>
              <p className="">Email:victoroyeleke333@gmail.com</p>
              <p className="bg-portal-darkYellow  p-2 rounded-sm w-fit">
                Gender: MALE
              </p>
              <p className="text-portal-ash">Course: Frontend development</p>
              <p className="text-portal-ash">Batch: 2025</p>
            </div>
          </div>

          {/* student info section */}
          <div className="w-full rounded-lg border-portal-ash border-2">
            <div className="">
              <div className="flex p-4 border-b-2 border-portal-ash  justify-between">
                <h1 className="uppercase ">Profile</h1>
                <p className="flex gap-4 items-center text-portal-ash">
                  <Edit className="" />
                  Edit Details
                </p>
              </div>

              <div className="bg-portal-ash p-4 m-2 space-y-6 ">
                <div className="flex justify-between">
                  <h3 className="">Admission Date</h3> <span>01-09-2025</span>
                </div>
                <div className="flex justify-between">
                  <h3>Date of Birth</h3>
                  <span>01-09-2025</span>
                </div>
                <div className="flex justify-between">
                  <h3>Category</h3>
                  <p>December</p>
                </div>
                <div className="flex justify-between">
                  <h3>Mobile number</h3>
                  <span>23487484403</span>
                </div>
                <div className="flex justify-between">
                  <h3>Religion</h3>
                </div>
                <div className="flex justify-between items-center">
                  <h3>Email </h3>{" "}
                  <span className="bg-portal-darkYellow  p-1 rounded-sm">
                    N/A
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <h3>Locality</h3>
                  <span className="bg-portal-green  p-1 rounded-sm">N/A</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
