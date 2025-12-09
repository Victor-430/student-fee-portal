import { useNavigate } from "react-router";

export const StudentProfile = () => {
  const feeNavigation = useNavigate();

  return (
    // {/* student profile */}
    <div className="p-8 py-12 border-2 border-portal-ash rounded-lg">
      <div className="flex justify-between ">
        <h1 className="justify-self-start">Student Profile</h1>
        <Button className="bg-blue-600"> View Receipts</Button>
        <Button
          className="bg-blue-600 h-4 p-2 rounded-lg"
          onClick={feeNavigation("/dashboard/fee")}
        >
          {" "}
          Fees Details
        </Button>
      </div>
      <div>
        {/* avatar section */}
        <>
          <div className="w-1/3 h-full border-2 border-portal-ash p-4 flex gap-8 rounded-xl">
            <Avatar className="w-4 h-4 pb-8" />

            <div className="space-y-3">
              <h1>Oyeleke Victor</h1>
              <p className="h-4 p-2 bg-portal-green rounded-lg">
                Admission no: flex113
              </p>
              <p>Email:victoroyeleke333@gmail.com</p>
              <p className="bg-portal-darkYellow h-4 p-2 rounded-lg">
                Gender: MALE
              </p>
            </div>
            <p className="text-portal-ash">Course: Frontend development</p>
            <p className="text-portal-ash">Batch: 2025</p>
          </div>
        </>
        {/* student info section */}
        <>
          <div className="w-2/3 h-full rounded-xl border-portal-ash border-2">
            <div className="flex border-b-2 border-portal-ash ">
              <h1 className="capitalize justify-items-start">Profile</h1>
              <p className="justify-items-end">Edit Details</p>

              <div className="bg-portal-ash p-2 &:not(:nth-last-child(-n+1))-border-b-2 ">
                <div className="flex justify-between">
                  <h3 className="bg-portal-ash border-b-2">Admission Date</h3>{" "}
                  <span>01-09-2025</span>
                </div>
                <h3>Date of Birth</h3>
                <h3>Category</h3>
                <h3>Mobile number</h3> <span>23487484403</span>
                <h3>Religion</h3>
                <div className="flex justify-between"></div>
                <h3>Email </h3>{" "}
                <span className="bg-portal-darkYellow h-4 p-2">N/A</span>
                <h3>Locality</h3>
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};
