import CurrentOrder from "./CurrentOrder";
import RecentOrders from "./RecentOrders";

function AccountOverview() {
  return (
    <div className="w-full min-w-0 grid grid-cols-1 gap-2">
      {/* Move your existing Overview cards here */}

      <CurrentOrder />
      <RecentOrders />
    </div>
  );
}

export default AccountOverview;