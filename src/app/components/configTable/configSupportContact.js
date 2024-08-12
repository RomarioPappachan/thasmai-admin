"use client"
import React, { useState, useEffect } from "react";
import axios from 'axios';
import toast from "react-hot-toast";


function SupportContactConfigTable(props) {

  	const [editableId, setEditableId] = useState(null);
  	const [developers, setDevelepors] = useState([]);

  	const [inputData, setInputData] = useState({
    	Name: "",
    	Role: "",
    	PhoneNo: ""
  	});
  	console.log(inputData);

  	useEffect(() => {
  	  	const fetchData = async () => {
  	    	try {
  	      		const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/support`);
  	      		console.log(response);
  	      		setDevelepors(response.data.support);	
  	    	} catch (error) {
  	      		console.error("Error fetching data:", error);
				toast.error("Error while fetching data.");
  	    	}
  	  	};
    	fetchData();
  	}, [props.renderTableToggle]);


  	function handleOnChange(event) {
    	const { name, value } = event.target;

    	setInputData((prevValue) => {
      		return {
        		...prevValue,
        		[name] : value
      		};
    	})
  	}




	async function handleSubmit (id, prevName, prevRole, prevPhoneNo ) {

    	if(inputData.Name || inputData.Role || inputData.PhoneNo) {
        	try {
            	const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/update-support/${editableId}`, {
              		Name: inputData.Name ? inputData.Name : prevName,
              		Role: inputData.Role ? inputData.Role : prevRole,
              		PhoneNo: inputData.PhoneNo ? inputData.PhoneNo : prevPhoneNo
            	});
            	setInputData({
              		Name: "",
              		Role: "",
              		PhoneNo: ""
            	});
            	props.setRenderTableToggle(!props.renderTableToggle);
        	} catch (error) {
            	toast.error("Error while updating developer details.")
        	}
    	} else {
        	// setEditableId(null);
        	toast("Please enter any field.");
      	}
    
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
        	    	<th className="text-center w-[30%]">Name</th>
        	    	<th className="text-center w-[25%]">Role</th>
        	    	<th className="text-center w-[25%]">Phone</th>
        	    	<th className="text-center w-[20%]"></th>
        	  		</tr>
        		</thead>
        		<tbody className="my-10">
          			{
            			developers.map((data, index) => {
              				return (
                				<tr className="font-semibold text-[0.8rem] text-black my-10 border-b-[1px] border-[#eeeeee]">
                  					<td className="text-center ps-5">
                    					{
                    					  	editableId === data.id ? (
                    					    	<input 
                    					    	  	className="w-full h-[35px] px-2 border-none bg-[#D9D9D9] rounded placeholder:text-gray-700" 
                    					    	  	type="text"
                    					    	  	placeholder={data.Name}
                    					    	  	name="Name"
                    					    	  	value={inputData.Name}
                    					    	  	onChange={handleOnChange} 
                    					    	/>
                    					  	) : (
                    					    	data.Name
                    					  	)
                    					}
                  					</td>
                  					<td className="text-center text-indigo-600">
                  						{
                  					    	editableId === data.id ? (
                  					      		<input 
                  					      		  className="w-full h-[35px] px-2 border-none bg-[#D9D9D9] rounded placeholder:text-gray-700" 
                  					      		  type="text"
                  					      		  placeholder={data.Role}
                  					      		  name="Role"
                  					      		  value={inputData.Role}
                  					      		  onChange={handleOnChange} 
                  					      		/>
                  					    	) : (
                  					      		data.Role
                  					    	)
                  					  	}
                  					</td>
                  					<td className="text-center">
                  					 	{
                  					 	   	editableId === data.id ? (
                  					 	     	<input 
                  					 	     	  	className="w-full h-[35px] px-2 border-none bg-[#D9D9D9] rounded placeholder:text-gray-700" 
                  					 	     	  	type="number"
                  					 	     	  	placeholder={data.PhoneNo}
                  					 	     	  	name="PhoneNo"
                  					 	     	  	value={inputData.PhoneNo}
                  					 	     	  	onChange={handleOnChange} 
                  					 	     	/>
                  					 	   	) : (
                  					 	     	data.PhoneNo
                  					 	   	)
                  					 	}
                  					</td>
                  					<td className="text-center">
                  					  	{
                  					  	  	editableId === data.id ? (
                  					  	  	  	<button 
                  					  	  	  	  	className="w-[100px] h-[35px] bg-green-500 text-white rounded-xl"
                  					  	  	  	  	onClick={ () => { 
                  					  	  	  	    	handleSubmit(data.id, data.Name, data.Role, data.PhoneNo)
                  					  	  	  	  	} }
                  					  	  	  	>Save</button>
                  					  	  	) : (
                  					  	  	  	<button 
                  					  	  	    	className="w-[100px] h-[35px] bg-[#66A2FA] text-white rounded-xl"
                  					  	  	    	onClick={ () => { setEditableId(data.id) } }
                  					  	  	  	>Edit</button>
                  					  	  	)
                  					  	}
                  					</td>               
                				</tr>
              				);
            			})
						// end of mapping
          			} 

             
        		</tbody>
      		</table>
    	</div>
  	);
}

export default SupportContactConfigTable;
