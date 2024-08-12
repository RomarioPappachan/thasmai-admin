"use client"

import React, { useState, useEffect } from "react";
import axios from 'axios';

function FinancialConfigTable({ dummyData }) {

    // console.log(dummyData);

  // const [editState, setEditState] = useState(false);
  const [editableId, setEditableId] = useState(null);
  const [parameters, setParameters] = useState([]);

  const [inputValue, setInputValue] = useState("");


  console.log(parameters);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/financialconfig`);
        console.log(response);
        setParameters(response.data.finconfig);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

    };

    fetchData();
  }, []);



  function handleOnChange(value) {
    console.log(value);
    setInputValue(value);
  }




  async function handleSubmit () {

    try {
      if(inputValue) {

        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/update-configuration/${editableId}`, {
          value: inputValue
        })

      } else {
        setEditableId(null);
        alert("Please enter a value.");
      }
      
    } catch (error) {
      
    }
    setInputValue("");
    setEditableId(null);
  }




  return (
    <div className="w-full overflow-scroll h-[90%]">
      <table className="table rounded-3xl">
        <thead
          className="w-full h-[50px] bg-[#005DB8] text-white sticky top-0 gap-x-20 text-[0.9rem]"
          style={{ borderRadius: "11px" }}
        >
          <tr className="rounded-3xl">
            <th className="text-center w-[30%]">Field</th>
            <th className="text-center w-[55%]">Value</th>
            <th className="text-center w-[15%]"></th>
          </tr>
        </thead>
        <tbody className="my-10">
        
           {
                parameters.map((data, index) => { 
                  return (
                    <tr className="font-semibold text-[0.8rem] text-black my-10" key={index}>
                        <td className="text-left ps-5">{data.field}</td>
                        <td className="text-center text-indigo-600">
                            {
                                editableId === data.id ? (
                                    <input 
                                      className="w-full h-[35px] px-2 border-none bg-[#D9D9D9] rounded" 
                                      type="text"
                                      placeholder={data.value} 
                                      name="value"
                                      value={inputValue}
                                      onChange={ (e) => {
                                        const value = e.target.value;
                                        handleOnChange(value)
                                      }}
                                    />
                                ) : (
                                    data.value
                                )    
                            }
                        </td>
                        <td className="text-center">
                            {
                                editableId === data.id ? (
                                  <button 
                                    className="w-[100px] h-[35px] bg-green-500 text-white rounded-xl"
                                    onClick = {() => {
                                      handleSubmit(data.id);
                                    }}
                                  >Save</button>
                                ) : (
                                  <button 
                                    className="w-[100px] h-[35px] bg-[#66A2FA] text-white rounded-xl"
                                    onClick = {() => setEditableId(data.id)}
                                  >Edit</button>
                                )
                            }
                        </td>                
                    </tr>
                  ); 
                })
           }
        
              

              
        </tbody>
      </table>
    </div>
  );
}

export default FinancialConfigTable;
