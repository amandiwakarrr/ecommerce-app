import paytmlogo from "../../assets/paytmlogo.jpg";
import Gpaylogo from "../../assets/Gpaylogo.jpg";
import amazonpaylogo from "../../assets/Amazonpaylogo.jpg";
function PaymentMethods() {
  return (
    <div className="w-full h-auto px-5 ">
      <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 gap-2 bg-secondary-bg p-2 rounded place-items-center border border-primary-border">
        {/* Creadit Card */}
        <div className="w-full h-20 max-w-75 border flex flex-col border-primary-border p-2 rounded gap-2">
          <div className="w-full flex items-center justify-between">
            <h1 className="text-primary-text">Card</h1>
            <button className="text-[12px] text-tertiary-text cursor-pointer">
              ADD
            </button>
          </div>
          <div className="w-full flex items-center justify-between">
            <div className="w-full flex items-center justify-start gap-2">
              <div className="w-10 rounded h-5 bg-white flex items-center justify-center">
                <i className="pi pi-credit-card "></i>
              </div>
              <span className="text-[12px] text-primary-text">
                Add credit or debit card
              </span>
            </div>
          </div>
        </div>

        {/* UPI */}
        <div className="w-full h-20 max-w-75 border flex flex-col border-primary-border p-2 rounded gap-2">
          <h1 className="text-primary-text">UPI</h1>
          <div className="w-full flex items-center justify-start gap-2">
            <div className="w-10 rounded h-5 bg-white flex items-center justify-center">
              <img src={paytmlogo} alt="" />
            </div>
            <span className="text-[12px] text-primary-text">Paytm UPI</span>
          </div>
        </div>

        {/* Netbanking */}
        <div className="w-full h-20 max-w-75 border flex flex-col border-primary-border p-2 rounded gap-2">
          <h1 className="text-primary-text">Netbanking</h1>
          <div className="w-full flex items-center justify-start gap-2 py-1">
            <div className="w-10 rounded h-5 bg-white flex items-center justify-center">
              <i className="pi pi-building-columns"></i>
            </div>
            <div className="w-full flex flex-col">
              <span className="text-[12px] text-primary-text">Netbanking</span>
            </div>
            <button className="text-[12px] text-tertiary-text cursor-pointer">
              ADD
            </button>
          </div>
        </div>

        {/* Wallets */}
        <div className="w-full max-w-75 border flex flex-col border-primary-border p-2 rounded gap-4">
          <div className="w-full flex items-center justify-between">
            <h1 className="text-primary-text">Wallets</h1>
          </div>
          <div className="w-full">
            <div className="w-full flex items-center justify-between">
              <div className="w-full flex items-center justify-start gap-2 py-1 border-b border-primary-border">
                <div className="w-10 rounded h-5 bg-white flex items-center justify-center">
                  <img src={amazonpaylogo} alt="" />
                </div>
                <div className="w-full flex flex-col">
                  <span className="text-[12px] text-primary-text">
                    Amazon Pay
                  </span>
                  <p className="text-[8px] text-secondary-text">
                    Link your Amazon Pay Balance wallet
                  </p>
                </div>
                <button className="text-[12px] text-tertiary-text cursor-pointer">
                  ADD
                </button>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="w-full flex items-center justify-between">
              <div className="w-full flex items-center justify-start gap-2 py-1">
                <div className="w-10 rounded h-5 bg-white flex items-center justify-center">
                  <img src={Gpaylogo} alt="" />
                </div>
                <div className="w-full flex flex-col">
                  <span className="text-[12px] text-primary-text">
                    Google Pay
                  </span>
                  <p className="text-[8px] text-secondary-text">
                    Link your Google Pay Balance wallet
                  </p>
                </div>
                <button className="text-[12px] text-tertiary-text cursor-pointer">
                  ADD
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentMethods;
