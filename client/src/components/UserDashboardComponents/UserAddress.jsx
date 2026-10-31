import l from "../../assets/beige-chinos.jpg";
function UserAddress() {
  return (
    <div className="w-full h-auto px-5 mt-8">
      <div className="w-full flex items-center">
        <div>
          <img className="w-10 h-10 rounded hidden" src={l} alt="" />
        </div>
        <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3  gap-4 place-items-center">
          <div className="w-full max-w-80 flex flex-col gap-2 border border-primary-border p-2 rounded bg-secondary-bg ">
            <span className="text-primary-text">Home</span>
            <p className="text-secondary-text text-[12px]">
              Behind Nalkoop Colony, Om Nagar Asafabad Firozabad
            </p>
            <div className="w-full flex gap-2 text-[12px]">
              <span className="text-primary-text">Phone number :</span>{" "}
              <span className="text-secondary-text">8630750297</span>
            </div>
            <button className="px-2 py-1 rounded bg-btn cursor-pointer">
              Remove
            </button>
          </div>
          <div className="w-full max-w-80 flex flex-col gap-2 border border-primary-border p-2 rounded bg-secondary-bg ">
            <span className="text-primary-text">Office</span>
            <p className="text-secondary-text text-[12px]">
              Jain Mandir,Asafabad Firozabad
            </p>
            <div className="w-full flex gap-2 text-[12px]">
              <span className="text-primary-text">Phone number :</span>{" "}
              <span className="text-secondary-text">8609320297</span>
            </div>
            <button className="px-2 py-1 rounded bg-btn cursor-pointer">
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAddress;
