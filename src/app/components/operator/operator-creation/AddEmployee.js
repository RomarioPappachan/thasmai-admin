"use client"

import React ,{useEffect , useState} from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'

function AddEmployee(props) {

  const [ employeeData, setEmployeeData ] = useState(
    { 
      name:"",
      role : "",
      username : "",
      location : "",
      dateOfJoining : "",
      password : "",
      confirmPassword : ""
    }
  );
  const [isFocused, setIsFocused] = useState(false)

    console.log(employeeData);

   function handleOnChange(event) {
    const { name, value } = event.target
    setEmployeeData(prevValue => (
      {
        ...prevValue , 
        [name] : value
      }
    ))
   }

  async function handleCreateEmployee(event) {
    event.preventDefault();

    if( employeeData.name && employeeData.role && employeeData.username && employeeData.location && employeeData.dateOfJoining && employeeData.password && employeeData.confirmPassword ) {
      if( employeeData.password === employeeData.confirmPassword ) { 
        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/operatorCreation`, employeeData)
          console.log(response);
          toast.success(response.data.message);
          setEmployeeData({
            name:"",
            role : "",
            username : "",
            location : "",
            dateOfJoining : "",
            password : "",
            confirmPassword : ""
          });
          props.setPageNo(1);
          props.setAddPopup(false);
          props.setsetRenderTableToggle(prevValue => !prevValue);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error(error.response.data.message)
        }

      } else {
        toast("Your password and confirm password should match.")
      }

    } else {
       toast("Please Enter the required Fileds")
    }
   
  }


  return (
    <div className="w-screen h-screen p-5 flex flex-col justify-center items-center absolute top-0 left-0 bg-[#000000d2] backdrop-blur-[1px]">
        <button
                className="w-8 h-8 m-0 p-0 absolute top-6 right-6 hover:scale-110 text-5xl text-white rotate-45"
                onClick={() => {
                    props.setAddPopup(false);
                }}
        >+</button>

        <div className="w-[30%] h-[95%] bg-white">
            <div className='w-full h-[10%] bg-[#005DB8]  text-white flex items-center px-10'>
                <p className='text-xl'>Add Employee</p>
            </div>
            <div className='w-full h-[90%] px-10 py-8 flex flex-col justify-between'>
                <input 
                  type='text'
                  placeholder='Employee Name'
                  className='w-full h-10 ps-2 bg-[#E0E2EC] text-black border-2 border-[#74777F] rounded-[8px]'
                  name="name"
                  value={employeeData.name}
                  onChange={handleOnChange}
                />
                <select
                  className='w-full h-10 ps-2 bg-[#E0E2EC] text-black border-2 border-[#74777F] rounded-[8px]'
                  name="role"
                  value={employeeData.role}
                  onChange={handleOnChange}
                >
                    <option  value="" selected disabled>Role</option>
                    {/* <option value="supervisor">Supervisor</option> */}
                    <option value="operator">Operator</option>
                </select>
                {/* <select className='w-full h-10 ps-2 bg-[#E0E2EC] text-black border-2 border-[#74777F] rounded-[8px]' >
                    <option value="" selected disabled>*Supervisor(only if the role is operator)</option>
                    <option>Supervisor</option>
                    <option>Operator</option>
                </select> */}
                <input 
                  type='email'
                  placeholder='Email as username'
                  className='w-full h-10 ps-2 bg-[#E0E2EC] text-black border-2 border-[#74777F] rounded-[8px] focus:bg-slate-50'
                  name="username"
                  value={employeeData.username}
                  onChange={handleOnChange}

                />
                 {/* <input 
                  type='text'
                  placeholder='Employee Id'
                  className='w-full h-10 ps-2 bg-[#E0E2EC] text-black border-2 border-[#74777F] rounded-[8px]'
                  name="username"
                  value={employeeData.username}
                  onChange={handleOnChange}
                /> */}
                 <input 
                  type='text'
                  placeholder='Location'
                  className='w-full h-10 ps-2 bg-[#E0E2EC] text-black border-2 border-[#74777F] rounded-[8px]'
                  name="location"
                  value={employeeData.location}
                  onChange={handleOnChange}
                />
                 <input 
                  type={isFocused ? 'date' : 'text'}
                  onFocus={()=> {
                    setIsFocused(true)
                  }}
                  onBlur={()=> {
                    setIsFocused(false)
                  }}
                  placeholder={employeeData.dateOfJoining ? employeeData.dateOfJoining : "Date of joining"}
                  className='w-full h-10 ps-2 bg-[#E0E2EC] text-black border-2 border-[#74777F] rounded-[8px]'
                  name="dateOfJoining"
                  value={employeeData.dateOfJoining}
                  onChange={handleOnChange}
                />
                 <input 
                  type='text'
                  placeholder='Password'
                  className='w-full h-10 ps-2 bg-[#E0E2EC] text-black border-2 border-[#74777F] rounded-[8px]'
                  name="password"
                  value={employeeData.password}
                  onChange={handleOnChange}
                />
                 <input 
                  type='Password'
                  placeholder='Confirm Password'
                  className='w-full h-10 ps-2 bg-[#E0E2EC] text-black border-2 border-[#74777F] rounded-[8px]'
                  name="confirmPassword"
                  value={employeeData.confirmPassword}
                  onChange={handleOnChange}
                />
                <button
                 className='w-full h-12 bg-[#005cb8e6] text-white rounded-xl hover:bg-[#005DB8]'
                 onClick = {handleCreateEmployee}
                >
                     Add Employee
                </button>

            </div>

        </div>
        
    </div>
  )
}

export default AddEmployee