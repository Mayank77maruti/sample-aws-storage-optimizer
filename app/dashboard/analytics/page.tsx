'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Overview } from "@/components/overview-chart";
import { RecentSales } from "@/components/recent-sales";
import Radarchart from "@/components/radar-chart";
import PieChart from "@/components/pie-chart";

export default function AnalyticsPage() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold tracking-tight mb-6">Analytics</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 my-2">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>
              You made 265 sales this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 my-2">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Radar Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <Radarchart />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Piechart</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}