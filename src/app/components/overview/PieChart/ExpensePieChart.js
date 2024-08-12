"use client";
 
import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
// import Chart from "react-apexcharts";
import Link from "next/link";
import axios from 'axios';
import {toast} from 'react-hot-toast';
 
 
// If you're using Next.js please use the dynamic import for react-apexcharts and remove the import from the top for the react-apexcharts
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
 
 
 
export default function ExpensePieChart() {
 
 
  const [role, setRole] = useState('');

  const [ pieChartData, setPieChartData ] = useState([]);
 
  const dataValues = pieChartData.map((i, index) => {
      return(
          Math.round(i.value)
      )
  });
 
  console.log(pieChartData);
 
 
  useEffect(() => {
 
    const fetchData = async () => {

      setRole('')
        let role_text = localStorage.getItem('userdata');
        console.log("Role from local storage:", role_text); // Log the role_text to check if it's retrieved correctly
        if (role_text) {
          const parsedRole = JSON.parse(role_text).role; // Parse the role from the stored userdata
          console.log("Parsed role:", parsedRole); // Log the parsed role to check its value
          setRole(parsedRole); // Set the role state
        }
 
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/expensePiechart`);
            console.log(response);
            setPieChartData(response.data.summary);
 
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error("Error loading piechart data")

        }
        return() => {
          return
        }
 
    };
 
    fetchData();
}, []);
 
 
  const chartConfig = {
    type: "pie",
    width: 220,
    height: 220,
    series: dataValues,
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#597EDD", "#f59e0b"],
      legend: {
        show: false,
      },
      labels: ["Distribution", "Ashram Expense"], // Custom labels for pie chart
      tooltip: {
        enabled: true,
        y: {
          formatter: function (val) {
            return val + "%";
          },
        },
      },
    },
  };
 
 
 
  return (
    <Card className="w-full h-full">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="h-[15%] m-0 p-2 flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
        <div className="ps-2">
          <Typography variant="h6" color="blue-gray">
            Ashram Expense
          </Typography>
 
        </div>
      </CardHeader>
 
 
      <CardBody className="h-[85%] m-0 p-0 px-2  flex flex-col md:flex-row justify-around items-center">
        {
          pieChartData[0] ? (
            <Chart {...chartConfig} />
 
          ) : (
            <div className="w-32 h-32 flex justify-center items-center">
              <span className="w-full h-full loading loading-spinner text-[#5799FD]"></span>
            </div>
          )
        }
 
        <div className="w-full md:w-[50%] h-full">
          <div className="m-2 flex items-center ">
              <div className="h-3 w-3 m-2 bg-[#58C2D9]"></div>
              <Link 
                href={(role === 'operator' || role === "Operator") ? "/overview" : "financial/distribution"} 
                className="text-sm text-black"
              >Distribution</Link>
          </div>
          <div className="m-2 flex items-center ">
              <div className="h-3 w-3 m-2 bg-[#f59e0b]"></div>
              <Link 
                href={(role === 'operator' || role === "Operator") ? "/overview" : "expenses/reports"}
                className="text-sm text-black"
              >Ashram Expense</Link>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
