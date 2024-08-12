"use client"

import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';


function UpdateEmployee(props) {


	const [isUpdateClicked, setIsUpdateClicked] = useState(false);
	const [isChangePassword, setIsChangePassword] = useState(false);
	const [data, setData] = useState({});
    const [ employeeData, setEmployeeData ] = useState(
        { 
          name:"",
          username : "",
          location : "",
          dateOfJoining : "",
		  password : "",
          confirmPassword : ""
        }
    );

	const [changedPassword, setChangedPassword] = useState({
		password : "",
        confirmPassword : ""
	});

	const [updatePageRender, setUpdatePageRender] = useState(false);



	console.log(employeeData);
	

	useEffect(() => {

		const employeeId = props.employeeId;
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/operator/${employeeId}`);
                // console.log(response);
                setData(response.data.operator);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        fetchData();
    }, [updatePageRender]);
	

    function handleOnChange(event) {
        const { name, value } = event.target
        setEmployeeData(prevValue => (
          	{
            	...prevValue , 
            	[name] : value
          	}
        ))
    }

	function handlePasswordChange(event) {
        const { name, value } = event.target
        setChangedPassword(prevValue => (
          	{
            	...prevValue , 
            	[name] : value
          	}
        ))
    }


	async function handleUpdateEmployeeDetail(event) {
		event.preventDefault();

		if( employeeData.name || employeeData.username || employeeData.location || employeeData.dateOfJoining ) {
		
		   	try {
				const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/updateOperator/${props.employeeId}`, {
					name: employeeData.name ? employeeData.name : data.name,
          			username : employeeData.username ? employeeData.username : data.username,
          			location : employeeData.location ? employeeData.location : data.location,
          			dateOfJoining : employeeData.dateOfJoining ? employeeData.dateOfJoining : data.dateOfJoining,
				})
			 	// console.log(response);
				 toast.success(response.data.message)
				//  props.setAddPopup(false)
				setIsUpdateClicked(false);
				props.setRenderTableToggle(!props.renderTableToggle);//render table with updated values
				setUpdatePageRender(!updatePageRender);//render update view
			 
		 	} catch (error) {
				console.error('Error fetching data:', error);
				setIsUpdateClicked(false);
		 	}
   
		
   
		} else {
			// toast("Please Enter the required Fileds")
			setIsUpdateClicked(false);
			return;
		}
	  
	}


	async function handleUpdatePassword(event) {
		event.preventDefault();

		if( changedPassword.password && changedPassword.confirmPassword ) {
			if( changedPassword.password === changedPassword.confirmPassword ) {
				try {
					const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/updateOperator/${props.employeeId}`, {
						password : changedPassword.password,
        				confirmPassword : changedPassword.confirmPassword
					})
					//  console.log(response);
					toast.success("Operator password updated successfully.");
					setIsChangePassword(false);
					props.setRenderTableToggle(!props.renderTableToggle);//render table with updated values
					setUpdatePageRender(!updatePageRender);//render update view
				 
				 } catch (error) {
					// console.error('Error fetching data:', error);
					toast.error(error.message);
					setIsChangePassword(false);
				 }
			} else {
				toast("Your password and confirm password should match.");
			}	
 
		} else {
			toast("Please Enter the required Fileds")
			// setIsChangePassword(false);
			return;
		}
	  
	}

  return (
    <div className="w-screen h-screen p-5 flex flex-col justify-center items-center absolute top-0 left-0 bg-[#000000d2] backdrop-blur-[1px]">
        <button
                className="w-8 h-8 m-0 p-0 absolute top-6 right-6 hover:scale-110 text-5xl text-white rotate-45"
                onClick={() => {
                    props.setUpdateEmployee(false);
                }}
        >+</button>

        <div className="w-[60%] h-[90%] bg-white">
            <div className='w-full h-[10%] bg-[#005DB8]  text-white flex items-center px-10'>
                <p className='text-xl'>Update Employee</p>
            </div>

            <div className='w-full h-[90%] px-10 py-8'>

				<div className='w-full h-[20%] bg-white flex items-center'>
					<div className='w-[50%] h-full p-4'>
						<p className='text-black'>Employee Name :</p>
						{
							!isUpdateClicked ? (
								<p className='mt-3 text-lg font-medium text-[#005DB8]'>{ data.name }</p>
							) :  (
								<input 
                				  	type='text'
                				  	placeholder='Employee Name'
                				  	className='w-full h-10 mt-2 ps-2 bg-[#E0E2EC] text-black border-2 border-[#74777F] rounded-[8px]'
                				  	name="name"
                				  	value={employeeData.name}
                				  	onChange={handleOnChange}
                				/>
							)
						}
						

					</div>
					<div className='w-[50%] h-full p-4'>
						<p className='text-black'>Username :</p>
						{/* {
							!isUpdateClicked ? (
								<p className='mt-3 text-lg font-medium text-[#005DB8]'>{ data.username }</p>
							) :  (
								<input 
                				  	type='email'
                				  	placeholder='Email as username'
                				  	className='w-full h-10 mt-2 ps-2 bg-[#E0E2EC] text-black border-2 border-[#74777F] rounded-[8px] focus:bg-slate-50'
                				  	name="username"
                				  	value={employeeData.username}
                				  	onChange={handleOnChange}
                				/>
							)
						} */}
						<p className='mt-3 text-lg font-medium text-[#4b4c4c]'>{ data.username }</p>
					</div>
				</div>

				<div className='w-full h-[20%] flex items-center'>
					<div className='w-[50%] h-full p-4'>
						<p className='text-black'>Location :</p>
						{
							!isUpdateClicked ? (
								<p className='mt-3 text-lg font-medium text-[#005DB8]'>{ data.location }</p>
							) :  (
								<input 
									type='text'
									placeholder='Location'
									className='w-full h-10 mt-2 ps-2 bg-[#E0E2EC] text-black border-2 border-[#74777F] rounded-[8px]'
									name="location"
									value={employeeData.location}
									onChange={handleOnChange}
						        />
							)
						}
					</div>
					<div className='w-[50%] h-full p-4'>
						<p className='text-black'>Date of Joining :</p>
						{
							!isUpdateClicked ? (
								<p className='mt-3 text-lg font-medium text-[#005DB8]'>{ data.dateOfJoining }</p>
							) :  (
								<input 
                				  	type='date'
                				  	placeholder='Date of Joining'
                				  	className='w-full h-10 mt-2 ps-2 bg-[#E0E2EC] text-black border-2 border-[#74777F] rounded-[8px]'
                				  	name="dateOfJoining"
                				  	value={employeeData.dateOfJoining}
                				  	onChange={handleOnChange}
                				/>
							)
						}
					</div>
				</div>

				<div className='flex flex-row-reverse'>
					{
						!isUpdateClicked ? (
							<button
                	 			className='w-32 h-9 text-sm bg-[#005cb8e6] text-white rounded-xl hover:bg-[#005DB8] hover:scale-105'
                	 			onClick = {() => {
									setIsUpdateClicked(true);
								}}
                			>
                	   			Update Details
                			</button>
						) :  (
							<button
								className='w-32 h-9 text-sm bg-[#005cb8e6] text-white rounded-xl hover:bg-[#005DB8] hover:scale-105'
								onClick = {(e) => {
									handleUpdateEmployeeDetail(e);
						   		}}
					   		>
						   		Save
					   		</button>
						)
					}
					
				</div>

                
				<hr className='mt-5 border-b-[1px] border-[#005DB8]'/>

				{
					!isChangePassword ? (
						<div className=''>
							<button
                	 			className='w-36 h-9 mt-5 text-sm bg-red-500 text-white rounded-xl hover:bg-red-600 hover:scale-105'
                	 			onClick = {() => {
									setIsChangePassword(true);
								}}
                			>
                	    		Change Password
                			</button>
						</div>
					) : (
						<>
							<div className='w-full h-[20%] mt-5 flex items-center'>
								<div className='w-[50%] h-full p-4'>
									<p>Password :</p>
									<input 
                  						type='text'
                  						placeholder='Password'
                  						className='w-full h-10 mt-2 ps-2 bg-[#E0E2EC] text-black border-2 border-[#74777F] rounded-[8px]'
                  						name="password"
                  						value={changedPassword.password}
                  						onChange={handlePasswordChange}
                					/>
								</div>
								<div className='w-[50%] h-full p-4'>
									<p>Confirm password :</p>
									<input 
                  						type='Password'
                  						placeholder='Confirm Password'
                  						className='w-full h-10 mt-2 ps-2 bg-[#E0E2EC] text-black border-2 border-[#74777F] rounded-[8px]'
                  						name="confirmPassword"
                  						value={changedPassword.confirmPassword}
                  						onChange={handlePasswordChange}
                					/>
								</div>
							</div>
							<div className='flex flex-row-reverse'>
								<button
                				 	className='w-32 h-9 mt-5 text-sm bg-green-500 text-white rounded-xl hover:bg-green-600 hover:scale-105'
                				 	onClick = {(e) => {
										handleUpdatePassword(e);
									}}
                				>
                				    Save
                				</button>
							</div>
						</>
					)
				}
                

				
            </div>

        </div>
        
    </div>
  )
}

export default UpdateEmployee