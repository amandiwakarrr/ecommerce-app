import l from "../../assets/beige-chinos.jpg";
function UserAddress() {
  return (
    <div className="w-full h-auto px-5">
      <div className="w-full flex items-center">
        <div>
          <img className="w-10 h-10 rounded hidden" src={l} alt="" />
        </div>
        <div className="w-full flex items-start">
          <div className="w-full max-w-80 border border-primary-border p-2 rounded bg-secondary-bg">
            <span className="text-primary-text">Home</span>
            <p className="text-secondary-text text-[12px]">
              Behind Nalkoop Colony, Om Nagar Asafabad Firozabad
            </p>
            <div className="w-full flex gap-2 text-[12px]">
              <span className="text-primary-text">Phone number :</span>{" "}
              <span className="text-secondary-text">8630750297</span>
            </div>
            <div className="w-full flex gap-3 items-center justify-between">
              <button className="w-5 h-5 text-btn cursor-pointer">
                <span>...</span>
              </button>
              <button className="w-5 h-5 flex items-center cursor-pointer justify-center bg-btn rounded-full">
                <i className="pi pi-arrow-up"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAddress;
