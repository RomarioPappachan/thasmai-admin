"use client"

import React, { useState, useEffect } from 'react'
import { IoMdSearch } from "react-icons/io";
import OperatorCreationTable from '@/app/components/operator/operator-creation/OperatorCreationTable'
import AddEmployee from '@/app/components/operator/operator-creation/AddEmployee'
import NavLink from '../navlink/navlink'
import { useNavbarTextStore } from '../../state/navbar-state';
import UpdateEmployee from '@/app/components/operator/operator-creation/UpdateEmployee';
import { toast } from 'react-hot-toast';
import axios from 'axios';

function OperatorCreation() {

    const [operatorData, setOperatorData] = useState([]);
	const [pageNo, setPageNo] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [updateEmployee, setUpdateEmployee] = useState(false);
	const [addPopup, setAddPopup] = useState(false);
	const [employeeId, setEmployeeId] = useState("");
	const [renderTableToggle, setRenderTableToggle] = useState(false);
	const [searchData, setSearchData] = useState({
		searchField : "",
		searchValue : ""
	});
	// console.log(operatorData);

	const setNavbarText = useNavbarTextStore((state) => state.setNavbarText);
	setNavbarText("Operator Management");

	function handleSearchChange(event) {
        const { name, value } = event.target
        setSearchData(prevValue => (
          	{
            	...prevValue , 
            	[name] : value
          	}
        ))
    }

	function handlePreviousPage() {
        if(pageNo <= 1) {
            return;
        } else {
            setPageNo(prevValue => prevValue - 1);
        }
    };
    
    function handleNextPage() {
        if(pageNo >= totalPages ) {
            return;
        } else {
            setPageNo(prevValue => prevValue + 1);
        }
    };


	async function handleSearchEmployee(event) {
		event.preventDefault();

		if( searchData.searchField && searchData.searchValue ) {
			
			try {
				const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/search-operator`, {
					search : searchData.searchField,
        			value : searchData.searchValue
				})
				 console.log(response);
				setOperatorData(response.data);			 
			} catch (error) {
				// console.error('Error fetching data:', error);
				toast.error(error.message);
			}
			
 
		} else {
			toast("Please Enter the required Fileds");
			return;
		}
	  
	}

  	return (
    	<div className='w-full h-[92vh] px-7 overflow-y-auto'>
    	  	<div className='flex items-center justify-between'>
    	   		<NavLink />      
    	  	</div>
    	  	<div className='w-full h-[85%] mt-2 p-4  bg-white rounded shadow drop-shadow-md '>
		
		
				<div className='w-full h-[8%] flex items-center'>
    	      		<div className='w-[70%] h-full flex'>
					    <select 
    	        	  	 	className='w-[250px] h-full px-2 bg-[#EEEAEA] text-black rounded-xl'
							name='searchField'
							value={searchData.searchField}
							onChange={handleSearchChange}
    	       		    >
 				 	  	 	<option value="" disabled defaultValue>Choose Field</option>
				 	  	 	<option value="name">Name</option>
    	         	  	 	<option value="emp_Id">Emp Id</option>
 				 	  	 	<option value="location">Location</option>
			  		    </select>
    	      		  	<input 
    	      		  	  	type='text'
    	      		  	  	className='w-[250px] h-full ms-6 px-2 bg-[#EEEAEA] text-black rounded-xl'
					  		placeholder='Values'
							name='searchValue'
							value={searchData.searchValue}
							onChange={handleSearchChange}
			  		  	/>
	
			  		  	<div className='w-[40px] h-[40px] ms-6 bg-[#005DB8] text-white hover:bg-[#005cb8d1] cursor-pointer flex justify-center items-center rounded-full'>
					  		<IoMdSearch 
								className='text-3xl'
								onClick={handleSearchEmployee}
							/>
			  		  	</div>
					</div>

						<div className='w-[30%] h-full flex flex-row-reverse'>
						   <button 
					   	    	className='w-[180px] h-full text-white bg-[#005DB8] rounded-xl hover:bg-[#005cb8c0] hover:scale-105'
						    		onClick={() => {
						    	setAddPopup(true);
						    	}}
						    >
					         + Add Employee
				       	    </button>
					    </div>
    	    	</div>

				<div className='w-full h-[90%] mt-5'>
					<div className="w-full h-[85%] m-0 p-0 overflow-y-auto">
						<OperatorCreationTable 
							operatorData={operatorData}
							setOperatorData={setOperatorData}
							pageNo={pageNo}
							setTotalPages={setTotalPages}
							setUpdateEmployee={setUpdateEmployee} 
							setEmployeeId={setEmployeeId} 
							renderTableToggle={renderTableToggle}
							searchData={searchData}
						/>
					</div>
					<div className="w-full h-[15%] px-2 flex justify-between items-center">
						<div>
							<p className="text-sm text-gray-500">Page { pageNo } of { totalPages }</p>
						</div>
						<div>
							<button
								className="w-28 h-9 text-sm bg-[#005DB8] text-white rounded-xl"
								onClick={ handlePreviousPage }
							>Previous</button>
							<button
								className="w-28 h-9 ms-5 text-sm bg-[#005DB8] text-white rounded-xl"
								onClick={ handleNextPage }
							>Next</button>
						</div>
					
					</div>
				</div>

    	  	</div>

			{

				addPopup && 
					<AddEmployee 
						setAddPopup={ setAddPopup } 
						setPageNo={setPageNo}
						renderTableToggle={renderTableToggle}
						setRenderTableToggle={setRenderTableToggle}
					/>
			}

			{
				updateEmployee && 
					<UpdateEmployee 
						setUpdateEmployee={setUpdateEmployee} 
						employeeId={employeeId}
						renderTableToggle={renderTableToggle}
						setRenderTableToggle={setRenderTableToggle}
					/>
			}

    	</div>
  	)
}

export default OperatorCreation