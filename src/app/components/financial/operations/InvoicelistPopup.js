"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

function InvoicelistPopup(props) {
  const [invoiceData, setInvoiceData] = useState([]);

  const [isViewBill, setIsViewBill] = useState(false);
  const [selectedBill, setSelectedBill] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeeId = props.employeeId;
        console.log(employeeId);

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/superadmin/getFundById?emp_Id=${employeeId}`
        );
          console.log(response);
        setInvoiceData(response.data.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      return;
    };
  }, []);

  return (
    <div className="w-[100vw] h-[100vh] backdrop-blur-sm bg-[#0000003b] absolute top-0 left-0 flex justify-center items-center ">
      <div className="w-[1000px] h-[600px] bg-white rounded">
        <div className="w-full h-[15%] ps-8 font-semibold text-xl text-white bg-[#5799FD] rounded relative flex items-center">
          <p>{ invoiceData[0] && invoiceData[0].emp_Name }</p>
          <button
            className="w-[30px] h-[30px] text-black font-medium bg-white hover:text-white hover:bg-blue-700 rounded absolute right-[30px]"
            onClick={() => {
              props.setIsViewInvoiceList(false);
            }}
          >
            x
          </button>
        </div>

        <div className="w-full h-[85%] p-4 overflow-scroll">
          <table className="w-full">
            <thead className="text-black">
              <tr>
                <th className="text-start">Date</th>
                <th className="text-start">Amount</th>
                <th className="text-start">Bill Image</th>
              </tr>
            </thead>

            <tbody className="tetx-black">
              {invoiceData[0] &&
                invoiceData.map((i, index) => {
                  return (
                    <tr>
                      <td>{i.date}</td>
                      <td>{i.amount}</td>
                      <td
                        onClick={() => {
                          setSelectedBill(i);
                          setIsViewBill(true);
                        }}
                      >
                        <img className="h-12 w-12" src={i.bill_Image} alt="" />
                      </td>
                    </tr>

                    // <div className='h-16 bg-blue-gray-200 flex'>
                    //    <p>Date : {i.date}</p>
                    //    <img
                    //     className='h-12 w-12'
                    //     src={i.bill_Image}
                    //     alt="" />
                    //     <p>Amount : {i.amount}</p>
                    // </div>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* -------------invoice popup component ----------*/}

      {isViewBill && (
        <div className="w-screen min-h-screen p-5 flex flex-col justify-center items-center absolute top-0 left-0 bg-[#000000d2] backdrop-blur-[1px] overflow-scroll">
          <button
            className="w-8 h-8 m-0 p-0 absolute top-6 right-6 hover:scale-110 text-5xl text-white rotate-45"
            onClick={() => {
              setIsViewBill(false);
            }}
          >
            +
          </button>

          <div className="w-full md:h-[85%] flex justify-center items-center">
            <img
              className="w-full md:max-w-[85%] object-cover border-2 border-white"
              src={selectedBill.bill_Image}
              alt="Invoice Image"
            />
          </div>

          <div className="w-full p-5 flex justify-center items-center text-white">
            <p className="w-full h-full text-center font-bold">
              {selectedBill.date}, ₹ {selectedBill.amount}
              {/* <span className="font-light">{data.description}</span> */}
            </p>
          </div>
        </div>
        ) 
      }
    </div>
  );
}

export default InvoicelistPopup;
