"use client"

import React, { useState,useEffect } from "react";
import axios from "axios";

function RegistartionPage({ dummyData }) {

    console.log(dummyData);

  // const [editState, setEditState] = useState(false);
  const [editableId, setEditableId] = useState(null);
  const [parameters, setParameters] = useState([]); 

  const [inputFieldValue, setInputFieldValue] = useState({
      field: "",
      value: ""
  });
  const [renderTableToggle, setRenderTableToggle] = useState(false);


  
  useEffect(() => {

    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/appconfig`);
            console.log(response);
            setParameters(response.data.appconfig);
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Error fetching data");
        }
    };

    fetchData();
},[renderTableToggle])

function handleOnChange(field, value) {
  console.log(value);
  setInputFieldValue(() => ({
      field: field,
      value: value
  }));
}


async function handleSubmit () {

  try {
      if(inputFieldValue.value) {

          const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/update-appconfig`, {
              id: editableId,
              field: inputFieldValue.field,
              value: inputFieldValue.value,
          });
          if(response) {
              setRenderTableToggle(prevValue => !prevValue);
          }


      } else {
          setEditableId(null);
          toast("Please enter the value to configure.");
      }

  } catch (error) {
      console.log("Financial configuration updating", error);
      toast.error("Error updating parameter.")
  }
  setInputFieldValue("");
  setEditableId(null);
};


  return (
    <div className="w-full overflow-scroll h-[90%]">
      <table className="table rounded-3xl">
        <thead
          className="w-full h-[50px] bg-[#66A2FA] text-white sticky top-0 gap-x-20 text-[0.9rem]"
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
                    parameters[0] ? (
                        parameters.map((data, index) => { 
                            return (
                                <tr className="font-medium text-xs text-black border-b-[1px] border-[#eeeeee]" key={index}>
                                    <td className="text-left ps-5">{data.field}</td>
                                    <td className="text-center text-indigo-600">
                                        {
                                            editableId === data.id ? (
                                              <input 
                                                className="w-full h-[35px] px-2 border-none bg-[#D9D9D9] rounded" 
                                                type="text"
                                                placeholder={data.value} 
                                                name="value"
                                                value={inputFieldValue.value}
                                                onChange={ (e) => {
                                                  const value = e.target.value;
                                                  handleOnChange(data.field, value);
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

                    ) : (
                        <tr>
                            <td>Loading.....</td>
                        </tr>
                    )
                    
                }


              


              
              
            
        
        </tbody>
      </table>
    </div>
  );
}

export default RegistartionPage;
