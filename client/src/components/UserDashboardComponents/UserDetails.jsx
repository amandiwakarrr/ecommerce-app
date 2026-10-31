function UserDetails() {
  return (
    <div className="w-full h-auto px-5 sm:mt-8">
      <div className="w-full flex flex-wrap items-center justify-between gap-2 py-3">
        <h1 className="text-[clamp(1.5rem,2vw,2.25rem)] text-primary-text font-extrabold font-syne">
          Personal information
        </h1>
      </div>
      <form className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="w-full flex flex-col gap-2">
          <div className="w-full flex flex-col">
            <label className="text-primary-text">Full name</label>
            <input
              type="text"
              placeholder="Aman Diwakar"
              className="w-full py-2 rounded focus:outline bg-dark outline-btn text-secondary-text px-2 border border-primary-border"
            />
          </div>
          <div className="w-full flex flex-col">
            <label className="text-primary-text">Email</label>
            <input
              type="email"
              placeholder="amandiwakar@gmail.com"
              className="w-full py-2 rounded focus:outline bg-dark outline-btn text-secondary-text px-2 border border-primary-border"
            />
          </div>
          <div className="w-full flex flex-col">
            <label className="text-primary-text">Phone</label>
            <input
              type="text"
              placeholder="8630750297"
              className="w-full py-2 rounded focus:outline bg-dark outline-btn text-secondary-text px-2 border border-primary-border"
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-2">
          <div className="w-full flex flex-col">
            <label className="text-primary-text">Password</label>
            <input
              type="password"
              placeholder="........"
              className="w-full py-2 rounded focus:outline bg-dark outline-btn text-secondary-text px-2 border border-primary-border"
            />
          </div>
          <div className="w-full flex flex-col">
            <label className="text-primary-text">Address</label>
            <input
              type="text"
              placeholder="Om nagar Asafabad Firozabad"
              className="w-full py-2 rounded focus:outline bg-dark outline-btn text-secondary-text px-2 border border-primary-border"
            />
          </div>
          <div className="w-full flex flex-col">
            <label className="text-primary-text">Image</label>
            <input
              type="file"
              className="w-full py-2 rounded focus:outline bg-dark outline-btn text-secondary-text px-2 border border-primary-border"
            />
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <button className="w-full text-dark cursor-pointer bg-btn py-2 rounded">
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserDetails;
