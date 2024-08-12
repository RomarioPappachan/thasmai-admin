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
import { HiMinusCircle , HiPlusCircle} from "react-icons/hi";
import { BsArrowRightCircleFill } from "react-icons/bs";
 
// If you're using Next.js please use the dynamic import for react-apexcharts and remove the import from the top for the react-apexcharts
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
 

 
export default function ColumnChart () {
 
  const [ columnChartData, setColumnChartData ] = useState([]);
  const [selectedOperator, setSelectedOperator] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonthYear, setSelectedMonthYear] = useState();
  const [isYearlyData, setIsYearlyData] = useState(true);
  const [isMonthlyData, setIsMonthlyData] = useState(false);

  console.log(selectedMonthYear);

  let monthArray = [];
  let monthlyCountArray = [];

  

  if(isYearlyData && !isMonthlyData) {
    // monthArray = columnChartData.map((i, ind) => {
    //   return(
    //     i.month
    //   )
    // });
    monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ]

  
    monthlyCountArray = columnChartData.map((i, ind) => {
      return(
        i.count
      )
    });
  } else if(!isYearlyData && isMonthlyData) {
    monthArray = columnChartData.map((i, ind) => {
      return(
        i.day
      )
    });
  
    monthlyCountArray = columnChartData.map((i, ind) => {
      return(
        i.count
      )
    });
  }

  
 
  useEffect(() => {

    const yearOnLoad = new Date().getFullYear();
    // console.log(yearOnLoad);
 
    const fetchData = async () => {
 
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/register-count?year=${yearOnLoad}`);
            // console.log(response);
            setColumnChartData(response.data);
            setIsYearlyData(true);
            setIsMonthlyData(false);
 
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        return () => {
          return;
        }
 
    };
 
    fetchData();
  }, []);


  async function handleSubmitColChart(e) {
    e.preventDefault();
  
    if (selectedYear === "" && selectedMonthYear === "" ) {
      toast("Choose operator to search.");
      return;
    } else {

      if(selectedMonthYear) {

        const splitDate = selectedMonthYear.split("-");
        const splittedYear = splitDate[0];
        const splittedMonth = splitDate[1];
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/register-count?year=${splittedYear}&month=${splittedMonth}`);
          console.log(response);
          setColumnChartData(response.data);
          setIsYearlyData(false);
          setIsMonthlyData(true);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error("Error while fetching monthly data.");
            return;
        }
        
      } else if(selectedYear && !selectedMonthYear) {

        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/register-count?year=${selectedYear}`);
          console.log(response);
          setColumnChartData(response.data);
          setIsYearlyData(true);
          setIsMonthlyData(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error("Error while fetching yearly data.");
            return;
        }

      } else {
        toast("please select month and year")
      }

    }
  };



  const chartConfig = {
    type: "bar",
    height: "100%",
    width: "100%",
    series: [
      {
        name: "New Joinees",
        // data: [50, 40, 300, 320, 500, 350, 200, 230, 500, 450, 320, 700],
        // data: [21,12,33,14,25,16,27,8,16,10,21,12,21,14,35,16,7,18,29,20,21,2,23,12,25,26,17,28,29,40,31],
        data: monthlyCountArray,
      },
    ],
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
      colors: ["#5799FD"],
      plotOptions: {
        bar: {
          columnWidth: "80%",
          borderRadius: 2,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "10px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        // categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ],
        // categories: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        categories: monthArray,
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "10px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: false,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 1,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };
 
  return (
    <Card className="w-full h-full">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col h-[15%] m-0 p-2 rounded-none md:flex-row md:items-center"
      >
        <div className="w-full h-full ps-2 flex justify-between items-center">
          <Typography variant="h6" color="blue-gray">
            New Joinees
          </Typography>
          <div className="flex items-center">
              <select 
                className="w-[80px] h-6  text-[11px] text-black bg-white border-2 outline-none border-[#5799FD] rounded"
                name="selectedOperator"
                onChange={(e) => {
                  let val= e.target.value;
                  setSelectedYear(new Date().getFullYear());
                  setSelectedOperator(val);
                }}
              >
                <option value="" disabled selected>SELECT</option>
                <option value="year" > By Year</option>
                <option value="month"> By month & year</option>
    
              </select>
              {
                    selectedOperator === "" && <div className="h-6 w-[85px] ms-2  bg-[#ebebec] rounded"></div>
              }

              {   
                
                selectedOperator === "year" && 
                <div className=" h-6 w-[85px] flex items-center border-2 ms-2  border-[#5799FD] rounded">
                  <button
                    className="w-6 h-6 text-md flex justify-center items-center hover:text-[#5799FD]"
                    onClick={() => {
                      setSelectedMonthYear("");
                      setSelectedYear(prevValue => prevValue - 1);
                    }}
                  >
                    <HiMinusCircle/>
                  </button>
                  <div className="text-[11px] flex justify-center items-center font-medium" >{ selectedYear }</div>
                  <button
                    className="w-6 h-6 text-md flex justify-center items-center hover:text-[#5799FD]"
                    onClick={() => {
                      setSelectedMonthYear("");
                      setSelectedYear(prevValue => prevValue + 1);
                    }}
                  >
                    <HiPlusCircle/>
                  </button>
                </div> 
                  
                   
                
              }

              {
                selectedOperator === "month" &&
                <input 
                  type="month" 
                  name="selectedMonthYear" 
                  className="w-[85px] ms-2 h-6 text-[11px] text-black bg-white outline-none border-2  border-[#5799FD] rounded"
                  onChange={(e) => {
                    var val = e.target.value;
                    setSelectedMonthYear(val);
                  }}  
                />
              }

              <button
                className="w-8 h-8 text-xl text-teal-600 flex justify-center items-center hover:text-teal-400 hover:scale-105"
                onClick={handleSubmitColChart}
              >
                < BsArrowRightCircleFill/>
              </button>

              

          </div>
        </div>
      </CardHeader>
      <CardBody className="h-[85%] m-0 p-0 px-2 pb-0">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
}