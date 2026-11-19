import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import profile from "../assets/socialprof.webp";
import { useAuth } from "../context/useAuth";
import { useWishlist } from "../context/useWishlist";

function UserDashboard() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { wishlist } = useWishlist();
 

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
      count: "",
    },
    {
      title: "Wishlist",
      icon: "pi pi-heart-fill",
      path: "/account/wishlist",
      count: wishlist.length,
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

  return (
    <div className="w-full h-auto mt-5 py-1 grid grid-cols-1 gap-4 sm:grid-cols-[220px_minmax(0,1fr)] md:grid-cols-[260px_minmax(0,1fr)] items-start md:px-6 lg:px-5 xl:px-16">
      {/* Sidebar */}
      <aside className="w-full sm:order-1 flex flex-col gap-2 px-5 sm:sticky sm:top-20 sm:self-start sm:h-fit">
        {/* User Profile */}
        <div className="flex w-full items-center gap-3 border-b border-primary-border py-2">
          <div className="w-12 h-12 shrink-0 rounded-full bg-amber-400 overflow-hidden">
            <img
              src={profile}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col min-w-0">
            <h2 className="truncate text-primary-text">
              {user?.name || "User"}
            </h2>
            <span className="text-[12px] text-secondary-text truncate">
              {user?.email || ""}
            </span>
          </div>
        </div>
        {/* Navigation */}
        <nav className="w-full min-w-0 flex flex-row sm:flex-col overflow-x-auto sm:overflow-x-visible gap-1 pb-2 sm:pb-0">
          {profileLinks.map((pl) => {
            const isActive =
              location.pathname === pl.path ||
              (location.pathname === "/account" && pl.title === "Overview");

            return (
              <Link key={pl.path} to={pl.path} className="shrink-0 sm:w-full">
                <div
                  className={`w-full px-3 py-2 rounded flex items-center justify-between gap-3 ${isActive
                    ? "bg-btn text-dark"
                    : "bg-dark hover:bg-secondary-bg text-secondary-text"
                    }`}
                >
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <i className={pl.icon}></i>
                    <span>{pl.title}</span>
                  </div>

                  {pl.count !== undefined && <span>{pl.count}</span>}
                </div>
              </Link>
            );
          })}
        </nav>
        {/* Sign Out */}
        <button
          onClick={async () => {
            try {
              await logout();
              navigate("/");
            } catch (error) {
              console.error("Logout failed:", error);
            }
          }}
          className="cursor-pointer w-full px-3 py-2 rounded bg-dark border border-primary-border text-primary-text"
        >
          Sign out
        </button>
      </aside>
      {/* Main Content */}
      <main className="w-full sm:order-2 min-w-0 grid grid-cols-1 gap-2 ">
        <Outlet />
      </main>
    </div>
  );
}

export default UserDashboard;
