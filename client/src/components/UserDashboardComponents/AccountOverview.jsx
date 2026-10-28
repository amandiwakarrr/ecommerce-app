import CurrentOrder from "./CurrentOrder";

function AccountOverview() {
  return (
    <div className="w-full min-w-0 grid grid-cols-1 gap-2">
      {/* Move your existing Overview cards here */}
      <CurrentOrder />
    </div>
  );
}

export default AccountOverview;