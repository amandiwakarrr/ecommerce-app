import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import UserSchema from "../validations/UserSchema";
function Registration() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(UserSchema),
    mode: "onTouched",
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      phone: "",
    },
  });
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="w-full flex flex-col items-center justify-between py-10 gap-4">
      <div className="w-[90%] sm:w-[50%] min-h-120 h-auto p-2 bg-secondary-bg flex flex-col items-center  border border-primary-border rounded gap-5">
        <div className="w-full sm:w-75 grid grid-cols-2 gap-5 bg-dark rounded p-2">
          <button
            onClick={() => setIsActive(!isActive)}
            className={` py-2 rounded cursor-pointer  ${isActive ? "bg-dark text-primary-text" : "bg-btn"}`}
          >
            Sign in
          </button>
          <button
            onClick={() => setIsActive(!isActive)}
            className={` py-2 rounded cursor-pointer ${isActive ? "bg-btn" : "bg-dark text-primary-text"}`}
          >
            Create account
          </button>
        </div>
        <div className="w-full grid place-items-center sm:w-[80%]">
          <form
            onSubmit={handleSubmit()}
            className="w-full h-full grid gap-3 place-items-center p-5"
          >
            <div className="w-full flex flex-col items-start justify-start gap-1">
              <label htmlFor="fullname" className="text-secondary-text text-[14px]">
                Full name
              </label>
              <input
                type="text"
                {...register("fullname")}
                className="border w-full px-2 py-3 border-primary-border rounded focus:outline-amber-600 text-primary-text"
              />
              <p className="error">{errors.fullname?.message}</p>
            </div>
            <div className="w-full flex flex-col items-start justify-start gap-1">
              <label htmlFor="email" className="text-secondary-text text-[14px]">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                className="border w-full px-2 py-3 border-primary-border rounded focus:outline-amber-600 text-primary-text"
              />
              <p className="error">{errors.email?.message}</p>
            </div>
            <div
              className={`w-full flex flex-col items-start justify-start gap-1 ${isActive ? "flex" : "hidden"}`}
            >
              <label htmlFor="phone" className="text-secondary-text text-[14px]">
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                maxLength={10}
                {...register("phone")}
                className="border w-full px-2 py-3 border-primary-border rounded focus:outline-amber-600 text-primary-text"
              />
              <p className="error">{errors.phone?.message}</p>
            </div>
            <div className="w-full flex flex-col items-start justify-start gap-1">
              <label htmlFor="password" className="text-secondary-text text-[14px]">
                Password
              </label>
              <input
                {...register("password")}
                autoComplete={isActive ? "new-password" : "current-password"}
                type="password"
                className="border w-full px-2 py-3 border-primary-border rounded focus:outline-amber-600 text-primary-text"
              />
              <p className="error">{errors.password?.message}</p>
            </div>
            <div className="w-full flex gap-1 py-2">
              <input type="checkbox" />
              <label htmlFor="checkbox" className=" text-[12px] text-primary-text">
                agree with the <span className="text-tertiary-text">Terms</span> and{" "}
                <span className="text-">conditions</span>
              </label>
            </div>

            <div className="w-full">
              <button
                type="submit"
                className="w-full py-2 bg-btn rounded text-dark cursor-pointer"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Creating..."
                  : isActive
                    ? "Create Account"
                    : "Sign in"}
              </button>
            </div>
          </form>
          <p className="text-[12px] text-primary-text">
            {!isActive ? (
              <>
                Do not have account?{" "}
                <span
                  onClick={() => setIsActive(!isActive)}
                  className="text-tertiary-text cursor-pointer"
                >
                  Create Account
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  onClick={() => setIsActive(!isActive)}
                  className="text-tertiary-text cursor-pointer"
                >
                  Sign in
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Registration;
