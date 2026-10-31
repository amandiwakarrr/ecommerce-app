// import paytmlogo from "../../assets/paytmlogo.jpg";
// import Gpaylogo from "../../assets/Gpaylogo.jpg";
// import amazonpaylogo from "../../assets/Amazonpaylogo.jpg";
import CreditCardSim from "../../assets/creditcardsim.jpg";
import NFClogo from "../../assets/svg/NFC.svg";
function PaymentMethods() {
  return (
    <div className="w-full h-auto px-5 mt-8">
      {/* Creadit Card */}
      <div className="w-full grid lg:grid-cols-3 gap-5">
        <div className="w-full flex flex-col gap-2 items-center justify-center">
          <div className="w-full max-w-80 h-40 border flex flex-col border-primary-border p-2 rounded-2xl gap-1 bg-linear-to-r from-[#2a2114] to-secondary-bg">
            <h1 className="text-primary-text text-end">SBI BANK</h1>
            <div className="w-full px-2 flex items-center justify-between">
              <img className="w-12" src={CreditCardSim} alt="" />
              <img src={NFClogo} alt="" />
            </div>
            <div className="w-full flex items-center justify-between text-secondary-text px-2 text-xl">
              <span>1234</span>
              <span>5678</span>
              <span>9176</span>
              <span>0297</span>
            </div>
            <div className="w-full flex text-secondary-text text-[12px] px-2">
              <span>VALID THUR - 06/39</span>
            </div>
            <h2 className="text-secondary-text px-2">AMAN DIWAKAR</h2>
          </div>
          <button className="w-full cursor-pointer max-w-75 bg-btn py-1 rounded">
            Remove
          </button>
        </div>
        <div className="w-full flex flex-col gap-2 items-center justify-center">
          <div className="w-full max-w-80 h-40 border flex flex-col border-primary-border p-2 rounded-2xl gap-1 bg-linear-to-r from-[#2a2114] to-secondary-bg">
            <h1 className="text-primary-text text-end">RBI BANK</h1>
            <div className="w-full px-2 flex items-center justify-between">
              <img className="w-12" src={CreditCardSim} alt="" />
              <img src={NFClogo} alt="" />
            </div>
            <div className="w-full flex items-center justify-between text-secondary-text px-2 text-xl">
              <span>1234</span>
              <span>5986</span>
              <span>9176</span>
              <span>9457</span>
            </div>
            <div className="w-full flex text-secondary-text text-[12px] px-2">
              <span>VALID THUR - 06/89</span>
            </div>
            <h2 className="text-secondary-text px-2">GAURAV BHIKHARI</h2>
          </div>
        <button className="w-full cursor-pointer max-w-75 bg-btn py-1 rounded">
          Remove
        </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentMethods;
