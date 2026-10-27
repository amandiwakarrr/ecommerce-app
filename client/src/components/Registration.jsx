import { useState } from "react";
function Registration() {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="w-full flex flex-col items-center justify-between py-10 gap-4">
      <div className="w-[90%] sm:w-[50%] h-140 p-2 bg-[#171a1f] flex flex-col items-center  border border-gray-800 rounded gap-5">
        <div className="w-full sm:w-[300px] grid grid-cols-2 gap-5 bg-dark rounded p-2">
          <button
            onClick={() => setIsActive(!isActive)}
            className={` py-2 rounded  ${isActive ? "bg-dark" : "bg-[#f2b24c]"}`}
          >
            Sign in
          </button>
          <button
            onClick={() => setIsActive(!isActive)}
            className={` py-2 rounded ${isActive ? "bg-[#f2b24c]" : "bg-dark"}`}
          >
            Create account
          </button>
        </div>
        <div className="w-full grid place-items-center sm:w-[80%]">
          <form className="w-full h-full grid gap-3 place-items-center p-5">
            <div className="w-full flex flex-col items-start justify-star gap-1">
              <label htmlFor="fullname" className="text-gray-400 text-[14px]">
                Full name
              </label>
              <input
                type="text"
                className="border w-full px-2 py-3 border-gray-800 rounded focus:outline-amber-600"
              />
            </div>
            <div className="w-full flex flex-col items-start justify-star gap-1">
              <label htmlFor="email" className="text-gray-400 text-[14px]">
                Email
              </label>
              <input
                type="email"
                className="border w-full px-2 py-3 border-gray-800 rounded focus:outline-amber-600"
              />
            </div>
            <div className="w-full flex flex-col items-start justify-star gap-1">
              <label htmlFor="phone" className="text-gray-400 text-[14px]">
                Phone
              </label>
              <input
                type="text"
                className="border w-full px-2 py-3 border-gray-800 rounded focus:outline-amber-600"
              />
            </div>
            <div className="w-full flex flex-col items-start justify-star gap-1">
              <label htmlFor="password" className="text-gray-400 text-[14px]">
                Password
              </label>
              <input
                type="password"
                className="border w-full px-2 py-3 border-gray-800 rounded focus:outline-amber-600"
              />
            </div>
            <div className="w-full flex gap-1 py-2">
              <input type="checkbox" />
              <label htmlFor="checkbox" className=" text-[12px] text-white">
                agree with the <span className="text-[#f2b24c]">Terms</span> and{" "}
                <span className="text-[#f2b24c]">conditions</span>
              </label>
            </div>

            <div className="w-full">
              <button
                type="button"
                className="w-full py-2 bg-btn rounded text-dark cursor-pointer"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;
