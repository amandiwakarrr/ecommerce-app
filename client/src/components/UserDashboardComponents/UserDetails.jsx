import profilephoto from "../../assets/socialprof.jpg";
function UserDetails() {
  return (
    <div className="w-full h-auto grid grid-cols-1 sm:grid-cols-2 px-5  ">
      <div className=" w-full grid borde p-2 gap-2 border border-primary-border rounded">
        <div className="w-full flex items-center justify-between border-b border-primary-border pb-2">
          <div className="w-full flex gap-2">
            <img
              className="w-20 h-20 rounded-full"
              src={profilephoto}
              alt="Profile"
            />
            <div className="w-full flex flex-col">
              <h2 className="text-primary-text font-bold font-syne">
                Aman Diwakar
              </h2>
              <span className="text-secondary-text text-[12px]">
                amandiwakarfghp@gmail.com
              </span>
              <span className="text-secondary-text text-[12px]">
                Member since October 2026
              </span>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <h3 className="text-primary-text">Personal information</h3>
          <div className="w-full grid grid-cols-2">
            <div className="w-full flex flex-col">
              <span className="text-secondary-text text-[12px]">
                First Name
              </span>
              <h3 className="text-primary-text">Aman</h3>
            </div>
            <div className="w-full flex flex-col">
              <span className="text-secondary-text text-[12px]">Last Name</span>
              <h3 className="text-primary-text">Diwakar</h3>
            </div>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="w-full flex flex-col">
              <span className="text-secondary-text text-[12px]">
                Email Address
              </span>
              <h3 className="text-primary-text">amandiwakarfghp@gmail.com</h3>
            </div>
            <div className="w-full flex flex-col">
              <span className="text-secondary-text text-[12px]">Phone No.</span>
              <h3 className="text-primary-text">+91 8630750297</h3>
            </div>
          </div>

          <div className="w-full grid grid-cols-2">
            <div className="w-full flex flex-col">
              <span className="text-secondary-text text-[12px]">
                Date of Birth
              </span>
              <h3 className="text-primary-text">DD/MM/YY</h3>
            </div>
            <div className="w-full flex flex-col">
              <span className="text-secondary-text text-[12px]">Gender</span>
              <h3 className="text-primary-text">Male</h3>
            </div>
          </div>
          <button className="w-full cursor-pointer text-dark bg-btn rounded">
            Edit Profile
          </button>
        </div>
      </div>
      
    </div>
  );
}

export default UserDetails;
