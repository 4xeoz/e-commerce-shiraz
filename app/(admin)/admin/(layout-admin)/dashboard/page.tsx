import {
  fetchTotalOrders,
  fetchTotalRevenue,
  fetchTotalProductsSold,
    fetchTotalUsers,
} from "@/app/api/admin/adminfetch";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
import React from "react";

const totalOrders = fetchTotalOrders();
const totalRevenueInCents = await fetchTotalRevenue();
const totalRevenue = totalRevenueInCents / 100;
const totalProductsSold = fetchTotalProductsSold();
const totalUsers = fetchTotalUsers();

const page = async () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

        <DashboardCard title="Total Orders" content={totalOrders} />

        <DashboardCard title="Total Revenue"  content={totalRevenue.toString()+" GBP"} />

        <DashboardCard title="Total Products Sold"  content={totalProductsSold} />

        <DashboardCard title="Total Users"  content={totalUsers} /> 

    </div>
  );
};

export default page;

interface DashboardCardProps {
    title?: string;
    content?: any;

}


const DashboardCard = ({title, content}: DashboardCardProps) => (
    <Card>
  <CardHeader>
    <CardTitle>{title}</CardTitle>
  </CardHeader>
  <CardContent>
    <p>{content}</p>
  </CardContent>
</Card>

)