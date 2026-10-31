import { Link } from "react-router-dom";
import profile from "../assets/socialprof.jpg";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

function UserDashboard() {
  const location = useLocation();
  const profileLinks = [
    {
      title: "Overview",
      icon: "pi pi-objects-column",
      path: "/account/overview",
    },
    {
      title: "Orders",
      icon: "pi pi-shopping-bag",
      path: "/account/orders",
      count: 23,
    },
    {
      title: "Wishlist",
      icon: "pi pi-heart-fill",
      path: "/account/wishlist",
      count: 5,
    },
    {
      title: "Address",
      icon: "pi pi-map-marker",
      path: "/account/address",
    },
    {
      title: "Profile details",
      icon: "pi pi-user",
      path: "/account/profile",
    },
    {
      title: "Payment methods",
      icon: "pi pi-credit-card",
      path: "/account/payment-methods",
    },
    {
      title: "Preferences",
      icon: "pi pi-cog",
      path: "/account/preferences",
    },
  ];

  // const [selectedLink, setSelectedLink] = useState("Overview");

  return (
    <div className="w-full order h-auto py-5 grid grid-cols-1 gap-4 sm:grid-cols-[220px_1fr] md:grid-cols-[260px_1fr] items-start md:px-6 lg:px-5 xl:px-16">
      {/* Sidebar */}
      <div className="w-full order-2 sm:order-1 flex flex-col py-5 gap-2 px-5">
        <div className="flex w-full items-center gap-3 border-b border-primary-border py-2">
          <div className="w-12 h-12 shrink-0 rounded-full bg-amber-400 overflow-hidden">
            <img src={profile} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col min-w-0">
            <h2 className="truncate text-primary-text">Aman diwakar</h2>
            <span className="text-[12px] text-secondary-text truncate">
              amandiwakar@gmail.com
            </span>
          </div>
        </div>

        <div className="w-full flex flex-col gap-1">
          {profileLinks.map((pl, index) => {
            const isActive =
              location.pathname === pl.path ||
              (location.pathname === "/account" && pl.title === "Overview");

            return (
              <Link key={index} to={pl.path}>
                <div
                  className={`w-full px-3 py-2 rounded flex items-center justify-between ${
                    isActive
                      ? "bg-btn text-dark"
                      : "bg-dark hover:bg-secondary-bg text-secondary-text"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <i className={pl.icon}></i>
                    <span>{pl.title}</span>
                  </div>

                  {pl.count && <span>{pl.count}</span>}
                </div>
              </Link>
            );
          })}
          <button
            // onClick={() => navigate("/")}
            className="cursor-pointer w-full px-3 py-2 mt-1 rounded bg-dark border border-primary-border text-primary-text"
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="w-full order-1 sm:order-2 min-w-0 grid grid-cols-1 gap-2">
        <Outlet />
      </div>
    </div>
  );
}

export default UserDashboard;
