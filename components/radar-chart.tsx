"use client"

import React from "react";
import {
  Radar,
  RadarChart,
  PolarAngleAxis,
  PolarGrid,
} from "recharts";

const data = [
  {
    subject: "Jan",
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: "Feb",
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "Mar",
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "Apr",
    A: 99,
    B: 100,
    fullMark: 150,
  },
  {
    subject: "May",
    A: 85,
    B: 90,
    fullMark: 150,
  },
  {
    subject: "Jun",
    A: 65,
    B: 85,
    fullMark: 150,
  },
];

export default function Radarchart() {
  return (
    <RadarChart
      cx={300}
      cy={250}
      outerRadius={150}
      width={500}
      height={500}
      data={data}
      style={{ backgroundColor: "#fff" }}
    >
      <PolarGrid stroke="#111" />
      <PolarAngleAxis dataKey="subject" fill="#111" stroke="#111" />
      {/* <PolarRadiusAxis /> */}
      <Radar
        name="Mike"
        dataKey="A"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.6}
      />
    </RadarChart>
  );
}
