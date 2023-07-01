import Link from "next/link";

export default function Dashboard() {
  const isAdmin = true; // userData?.roles.admin;

  return (
    <div className="grid sm:grid-cols-1 sm:gap-0 lg:grid-cols-3 lg:gap-4">
      {isAdmin ? (
        <div className="col-span-3">
          <Link
            className="outline outline-white rounded px-3 py-2"
            href="/dashboard/admin"
          >
            Admin Pannel
          </Link>
        </div>
      ) : null}
      <div className="col-span-2 bg-red-200">a</div>
      <div className="bg-blue-200">b</div>
    </div>
  );
}
