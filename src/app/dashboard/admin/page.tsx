import { Card } from "@/components/Card";
import Link from "next/link";
import React from "react";

function AdminDashboard() {
  return (
    <div className="grid sm:grid-cols-2 sm:gap-0 lg:grid-cols-5 lg:gap-4">
      <Link href="dashboard/admin/category">
        <Card>
          <div className="w-full flex justify-center">Manage Categories</div>
        </Card>
      </Link>
    </div>
  );
}

export default AdminDashboard;
