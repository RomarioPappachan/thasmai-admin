// "use client"

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import NavLink from '../navlink/navlink';
// import { useLoginStore } from '@/app/loginstate/loginState';
// import { useNavbarTextStore } from '../../state/navbar-state';
// import { toast } from 'react-hot-toast';
// import { MdOutlineFileUpload } from "react-icons/md";
// import useImageCompressor from '@/app/components/ImageCompression/useImageCompressor';

// function AddExpense() {

//     const [employeeId, setEmployeeId] = useState(null); // to attach employye id with expense created.
    
//     const [formData, setFormData] = useState({
//         Expense_Date: '',
//         emp_id : '',
//         name: '',
//         expenseType: '',
//         amount: '',
//         description: '',
//         invoice: null, 
//     });
//     const [balanceAmount, setBalanceAmount] = useState();
//     const [renderToggle, setRenderToggle] = useState(false);
//     const [isButtonDisabled, setIsButtonDisabled] = useState(false);

//     console.log(formData);

//     const loginState = useLoginStore(function(state) {
//   	    return state
//   	});

//     const setNavbarText = useNavbarTextStore((state) => state.setNavbarText);
// 	setNavbarText("Financial / Expense");

//     const { compressImage } = useImageCompressor();



//     useEffect(() => {
//         // Get today's date
//         const today = new Date();
//         const day = String(today.getDate()).padStart(2, '0');
//         const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
//         const year = today.getFullYear();
//         const todayDate = `${year}-${month}-${day}`;

//         //set employee Id in form data
//        const userData = localStorage.getItem('userdata')
//        const empId = JSON.parse(userData).emp_Id;
//        const empName = JSON.parse(userData).name;

//         // Set today's date and employee id in your form data
//         setFormData({
//             ...formData,
//             Expense_Date: todayDate,
//             emp_id : empId,
//             name : empName,
//         });




//         const fetchData = async () => {
      
//             try {
//               const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/get-balance?emp_Id=${empId}`);
//               console.log(response);
//               setBalanceAmount(response.data.balance_amount);
//             } catch (error) {
//               // console.error('Error fetching data:', error);
//               toast.error("Error fetching data.");
//             }
//         };

//       fetchData();
        
//     }, [renderToggle]); // Run only once on component mount




//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     const handleImageChange = async (e) => {
//         const file = e.target.files[0];

//         const compressedFile = await compressImage(file);

//         setFormData({
//             ...formData,
//             invoice: compressedFile,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsButtonDisabled(true);

        
//         console.log('Submitting form data:', formData); // Log the form data before submission

//         const form = new FormData();
//         form.append('Expense_Date', formData.Expense_Date);
//         form.append('expenseType', formData.expenseType);
//         form.append('amount', formData.amount);
//         form.append('description', formData.description);
//         form.append('invoice', formData.invoice);
//         form.append('emp_id', formData.emp_id);
//         form.append('name', formData.name);


//         if(formData.invoice && formData.expenseType && formData.amount && formData.description) {
//                 console.log(form);
//             try {
//                 const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/expense`, form);
//                 console.log(response);


//                 setTimeout(() => {
//                     toast.success('Expense created successfully');
//                     // Clear form fields after successful submission
//                     setFormData({
//                         Expense_Date: '',
//                         emp_id : '',
//                         name : '',
//                         expenseType: '',
//                         amount: '',
//                         description: '',
//                         invoice: null,
//                     });
//                     setRenderToggle(prevValue => !prevValue);
//                     setIsButtonDisabled(false);
//                 }, 1000);
                
//             } catch (error) {
//                 console.error('Error creating expense:', error);
//                 toast.error(error.response.data.message);
//                 setIsButtonDisabled(false);
//             }

//         } else {
//             toast("Please enter the required expense details.");
//             setIsButtonDisabled(false);
//         }
//     };


//     return (
//         <div className="w-full h-[85vh] px-1 md:px-7">
//             <div className="w-full sticky top-0">
//                 <NavLink />
//             </div>
//             <div className='w-full h-[95%] mt-2 p-1 pb-6 md:p-4 bg-white rounded shadow drop-shadow-md overflow-y-auto'>
//                 <div className='w-full h-[5%] px-2 md:px-16'>
//                     <p className={balanceAmount <=1000 ? 'p-2 text-red-400 font-medium' : 'p-2 text-blue-400 font-medium'}>
//                         Balance Amount: {balanceAmount}
//                     </p>
//                 </div>
//                 <div className='w-full md:h-[80%] px-2 md:px-16 py-6 md:flex '>

//                     <div className='w-full md:w-[60%] flex flex-col'>
//                         {/* <input
//                             type='text'
//                             className='w-[45%] h-12 p-2 mb-5 bg-white text-black border-[1px] border-black rounded-[6px]'
//                             name="expenseType"
//                             value={formData.expenseType}
//                             onChange={handleInputChange}
//                             placeholder='Expense Type'
//                         /> */}
//                         <select 
//                             className='w-full md:w-[45%] h-12 p-2 mb-5 bg-white text-black border-[1px] border-black rounded-[6px]'
//                             name="expenseType"
//                             value={formData.expenseType}
//                             onChange={handleInputChange}
//                         >
//                             <option value="" disabled>Select</option>
//                             <option value="Electricity bill">Electricity Bill</option>
//                             <option value="Water bill">Water Bill</option>
//                             <option value="Stationery items">Stationery Items</option>
//                             <option value="Food and beverages">Food and beverages</option>
//                             {/* <option value="Other">Other</option> */}

//                         </select>
//                         <input
//                             type='number'
//                             className='w-full md:w-[45%] h-12 p-2 mb-5 bg-white text-black border-[1px] border-black rounded-[6px]'
//                             name="amount"
//                             value={formData.amount}
//                             onChange={handleInputChange}
//                             placeholder='Amount'
//                         />
//                         <div className='w-full md:w-[45%] h-12 px-2 mb-5 bg-[#565F71] text-white rounded-2xl hover:bg-green-600'>
//                             <label
//                                 htmlFor="bill"
//                                 className='w-full h-full flex items-center'
//                             >
//                                 <MdOutlineFileUpload className='text-2xl me-2' />
//                                 Upload Invoice
//                             </label>
//                             <input id="bill" className="w-full h-full" type="file" hidden onChange={handleImageChange} />
//                         </div>
//                         <textarea
//                             className='w-full md:w-[95%] p-3 bg-white text-black border-[1px] border-black rounded-[6px]'
//                             name="description"
//                             value={formData.description}
//                             onChange={handleInputChange}
//                             placeholder='Description'
//                             rows={8}
//                         />
//                     </div>
//                     <div className='w-full h-[350px] md:w-[40%] md:h-full mt-5 md:m-0 bg-slate-200 flex justify-center items-center rounded-[8px] border-[1px] border-black'>
//                         {
//                             formData.invoice ? (
//                                 <img className="w-full h-full" src={URL.createObjectURL(formData.invoice)} alt="invoice" />
//                             ) : (
//                                 <div className="text-gray-500 text-center">No invoice uploaded</div>
//                             )
//                         }
//                     </div>
//                 </div>

//                 <div className='w-full md:h-[15%] px-2 md:ps-16'>
//                     <div className='w-full md:w-[60%] h-full'>
//                         <button 
//                             className={isButtonDisabled ? 'w-full md:w-[90%] h-12 bg-[#9b9b9c] text-white rounded-2xl' :'w-full md:w-[90%] h-12 bg-[#005DB8] text-white rounded-2xl'} 
//                             onClick={handleSubmit}
//                             disabled={isButtonDisabled}
//                         >
//                             Create Expense
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default AddExpense;














// "use client"
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import NavLink from '../navlink/navlink';
// import { useLoginStore } from '@/app/loginstate/loginState';
// import { useNavbarTextStore } from '../../state/navbar-state';
// import { toast } from 'react-hot-toast';
// import { MdOutlineFileUpload } from "react-icons/md";
// import { FaTimes } from "react-icons/fa";
// import useImageCompressor from '@/app/components/ImageCompression/useImageCompressor';

// function AddExpense() {
//     const [formData, setFormData] = useState({
//         Expense_Date: '',
//         emp_id: '',
//         name: '',
//         expenseType: '',
//         amount: '',
//         description: '',
//         invoices: [],
//     });
//     const [balanceAmount, setBalanceAmount] = useState();
//     const [renderToggle, setRenderToggle] = useState(false);
//     const [isButtonDisabled, setIsButtonDisabled] = useState(false);

//     const loginState = useLoginStore(function(state) {
//         return state;
//     });

//     const setNavbarText = useNavbarTextStore((state) => state.setNavbarText);
//     setNavbarText("Financial / Expense");

//     const { compressImage } = useImageCompressor();

//     useEffect(() => {
//         const today = new Date();
//         const day = String(today.getDate()).padStart(2, '0');
//         const month = String(today.getMonth() + 1).padStart(2, '0');
//         const year = today.getFullYear();
//         const todayDate = `${year}-${month}-${day}`;

//         const userData = localStorage.getItem('userdata');
//         const empId = JSON.parse(userData).emp_Id;
//         const empName = JSON.parse(userData).name;

//         setFormData({
//             ...formData,
//             Expense_Date: todayDate,
//             emp_id: empId,
//             name: empName,
//         });

//         const fetchData = async () => {
//             try {
//                 const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/get-balance?emp_Id=${empId}`);
//                 setBalanceAmount(response.data.balance_amount);
//             } catch (error) {
//                 toast.error("Error fetching data.");
//             }
//         };

//         fetchData();
//     }, [renderToggle]);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     const handleImageChange = async (e) => {
//         const files = Array.from(e.target.files);
//         const compressedFiles = await Promise.all(files.map(file => compressImage(file)));
        
//         setFormData(prevState => ({
//             ...prevState,
//             invoices: [...prevState.invoices, ...compressedFiles],
//         }));
//     };

//     const handleImageDelete = (index) => {
//         setFormData(prevState => ({
//             ...prevState,
//             invoices: prevState.invoices.filter((_, i) => i !== index),
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsButtonDisabled(true);

//         const form = new FormData();
//         form.append('Expense_Date', formData.Expense_Date);
//         form.append('expenseType', formData.expenseType);
//         form.append('amount', formData.amount);
//         form.append('description', formData.description);
//         form.append('emp_id', formData.emp_id);
//         form.append('name', formData.name);

//         formData.invoices.forEach((invoice, index) => {
//             form.append('invoice', invoice); // Append each compressed file
//         });

//         console.log('Form Data before sending to API:', formData);

//         if (formData.invoices.length > 0 && formData.expenseType && formData.amount && formData.description) {
//             try {
//                 const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/expense`, form);

//                 setTimeout(() => {
//                     toast.success('Expense created successfully');
//                     setFormData({
//                         Expense_Date: '',
//                         emp_id: '',
//                         name: '',
//                         expenseType: '',
//                         amount: '',
//                         description: '',
//                         invoices: [],
//                     });
//                     setRenderToggle(prevValue => !prevValue);
//                     setIsButtonDisabled(false);
//                 }, 1000);
                
//             } catch (error) {
//                 console.error('Error creating expense:', error);
//                 toast.error(error.response.data.error || 'Failed to create expense');
//                 setIsButtonDisabled(false);
//             }

//         } else {
//             toast("Please enter the required expense details.");
//             setIsButtonDisabled(false);
//         }
//     };

//     return (
//         <div className="w-full h-[85vh] px-1 md:px-7">
//             <div className="w-full sticky top-0">
//                 <NavLink />
//             </div>
//             <div className='w-full h-[95%] mt-2 p-1 pb-6 md:p-4 bg-white rounded shadow drop-shadow-md overflow-y-auto'>
//                 <div className='w-full h-[5%] px-2 md:px-16'>
//                     <p className={balanceAmount <= 1000 ? 'p-2 text-red-400 font-medium' : 'p-2 text-blue-400 font-medium'}>
//                         Balance Amount: {balanceAmount}
//                     </p>
//                 </div>
//                 <div className='w-full md:h-[80%] px-2 md:px-16 py-6 md:flex '>
//                     <div className='w-full md:w-[60%] flex flex-col'>
//                         <select
//                             className='w-full md:w-[45%] h-12 p-2 mb-5 bg-white text-black border-[1px] border-black rounded-[6px]'
//                             name="expenseType"
//                             value={formData.expenseType}
//                             onChange={handleInputChange}
//                         >
//                             <option value="" disabled>Select</option>
//                             <option value="Electricity bill">Electricity Bill</option>
//                             <option value="Water bill">Water Bill</option>
//                             <option value="Stationery items">Stationery Items</option>
//                             <option value="Food and beverages">Food and beverages</option>
//                         </select>
//                         <input
//                             type='number'
//                             className='w-full md:w-[45%] h-12 p-2 mb-5 bg-white text-black border-[1px] border-black rounded-[6px]'
//                             name="amount"
//                             value={formData.amount}
//                             onChange={handleInputChange}
//                             placeholder='Amount'
//                         />
//                         <div className='w-full md:w-[45%] h-12 px-2 mb-5 bg-[#565F71] text-white rounded-2xl hover:bg-green-600'>
//                             <label
//                                 htmlFor="bill"
//                                 className='w-full h-full flex items-center'
//                             >
//                                 <MdOutlineFileUpload className='text-2xl me-2' />
//                                 Upload Invoices
//                             </label>
//                             <input id="bill" className="w-full h-full" type="file" multiple hidden onChange={handleImageChange} />
//                         </div>
//                         <textarea
//                             className='w-full md:w-[95%] p-3 bg-white text-black border-[1px] border-black rounded-[6px]'
//                             name="description"
//                             value={formData.description}
//                             onChange={handleInputChange}
//                             placeholder='Description'
//                             rows={8}
//                         />
//                     </div>
//                     <div className='w-full h-[350px] md:w-[40%] md:h-full mt-5 md:m-0 bg-slate-200 flex flex-wrap justify-center items-center rounded-[8px] border-[1px] border-black overflow-y-scroll'>
//                         {
//                             formData.invoices.length > 0 ? (
//                                 formData.invoices.map((invoice, index) => (
//                                     <div key={index} className="relative w-1/2 h-1/2 p-1">
//                                         <img className="w-full h-full object-contain" src={URL.createObjectURL(invoice)} alt={`invoice_${index}`} />
//                                         <button 
//                                             onClick={() => handleImageDelete(index)}
//                                             className="absolute top-0 right-0 text-red-600 bg-white rounded-full p-1 hover:bg-red-600 hover:text-white"
//                                         >
//                                             <FaTimes />
//                                         </button>
//                                     </div>
//                                 ))
//                             ) : (
//                                 <div className="text-gray-500 text-center">No invoice uploaded</div>
//                             )
//                         }
//                     </div>
//                 </div>
//                 <div className='w-full md:h-[15%] px-2 md:ps-16'>
//                     <div className='w-full md:w-[60%] h-full'>
//                         <button
//                             className={isButtonDisabled ? 'w-full md:w-[90%] h-12 bg-[#9b9b9c] text-white rounded-2xl' : 'w-full md:w-[90%] h-12 bg-[#005DB8] text-white rounded-2xl'}
//                             onClick={handleSubmit}
//                             disabled={isButtonDisabled}
//                         >
//                             Create Expense
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default AddExpense;





"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavLink from '../navlink/navlink';
import { useLoginStore } from '@/app/loginstate/loginState';
import { useNavbarTextStore } from '../../state/navbar-state';
import { toast } from 'react-hot-toast';
import { MdOutlineFileUpload } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import useImageCompressor from '@/app/components/ImageCompression/useImageCompressor';

function AddExpense() {
    const [formData, setFormData] = useState({
        Expense_Date: '',
        emp_id: '',
        name: '',
        expenseType: '',
        amount: '',
        description: '',
        invoices: [],
    });
    const [balanceAmount, setBalanceAmount] = useState();
    const [renderToggle, setRenderToggle] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const loginState = useLoginStore(function(state) {
        return state;
    });

    const setNavbarText = useNavbarTextStore((state) => state.setNavbarText);
    setNavbarText("Financial / Expense");

    const { compressImage } = useImageCompressor();

    useEffect(() => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        const todayDate = `${year}-${month}-${day}`;

        const userData = localStorage.getItem('userdata');
        const empId = JSON.parse(userData).emp_Id;
        const empName = JSON.parse(userData).name;

        setFormData({
            ...formData,
            Expense_Date: todayDate,
            emp_id: empId,
            name: empName,
        });

        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/get-balance?emp_Id=${empId}`);
                setBalanceAmount(response.data.balance_amount);
            } catch (error) {
                toast.error("Error fetching data.");
            }
        };

        fetchData();
    }, [renderToggle]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = async (e) => {
        const files = Array.from(e.target.files);
        const compressedFiles = await Promise.all(files.map(async (file) => {
            const compressedFile = await compressImage(file);
            return new File([compressedFile], file.name, { type: file.type });
        }));

        setFormData(prevState => ({
            ...prevState,
            invoices: [...prevState.invoices, ...compressedFiles],
        }));
    };

    const handleImageDelete = (index) => {
        setFormData(prevState => ({
            ...prevState,
            invoices: prevState.invoices.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsButtonDisabled(true);

        const form = new FormData();
        form.append('Expense_Date', formData.Expense_Date);
        form.append('expenseType', formData.expenseType);
        form.append('amount', formData.amount);
        form.append('description', formData.description);
        form.append('emp_id', formData.emp_id);
        form.append('name', formData.name);

        formData.invoices.forEach((invoice) => {
            form.append('invoice', invoice); // Append each compressed file
        });

        console.log('Form Data before sending to API:', formData);

        if (formData.invoices.length > 0 && formData.expenseType && formData.amount && formData.description) {
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/expense`, form);

                setTimeout(() => {
                    toast.success('Expense created successfully');
                    setFormData({
                        Expense_Date: '',
                        emp_id: '',
                        name: '',
                        expenseType: '',
                        amount: '',
                        description: '',
                        invoices: [],
                    });
                    setRenderToggle(prevValue => !prevValue);
                    setIsButtonDisabled(false);
                }, 1000);
                
            } catch (error) {
                console.error('Error creating expense:', error);
                toast.error(error.response.data.error || 'Failed to create expense');
                setIsButtonDisabled(false);
            }

        } else {
            toast("Please enter the required expense details.");
            setIsButtonDisabled(false);
        }
    };

    return (
        <div className="w-full h-[85vh] px-1 md:px-7">
            <div className="w-full sticky top-0">
                <NavLink />
            </div>
            <div className='w-full h-[95%] mt-2 p-1 pb-6 md:p-4 bg-white rounded shadow drop-shadow-md overflow-y-auto'>
                <div className='w-full h-[5%] px-2 md:px-16'>
                    <p className={balanceAmount <= 1000 ? 'p-2 text-red-400 font-medium' : 'p-2 text-blue-400 font-medium'}>
                        Balance Amount: {balanceAmount}
                    </p>
                </div>
                <div className='w-full md:h-[80%] px-2 md:px-16 py-6 md:flex '>
                    <div className='w-full md:w-[60%] flex flex-col'>
                        <select
                            className='w-full md:w-[45%] h-12 p-2 mb-5 bg-white text-black border-[1px] border-black rounded-[6px]'
                            name="expenseType"
                            value={formData.expenseType}
                            onChange={handleInputChange}
                        >
                            <option value="" disabled>Select</option>
                            <option value="Electricity bill">Electricity Bill</option>
                            <option value="Water bill">Water Bill</option>
                            <option value="Stationery items">Stationery Items</option>
                            <option value="Food and beverages">Food and beverages</option>
                        </select>
                        <input
                            type='number'
                            className='w-full md:w-[45%] h-12 p-2 mb-5 bg-white text-black border-[1px] border-black rounded-[6px]'
                            name="amount"
                            value={formData.amount}
                            onChange={handleInputChange}
                            placeholder='Amount'
                        />
                        <div className='w-full md:w-[45%] h-12 px-2 mb-5 bg-[#565F71] text-white rounded-2xl hover:bg-green-600'>
                            <label
                                htmlFor="bill"
                                className='w-full h-full flex items-center'
                            >
                                <MdOutlineFileUpload className='text-2xl me-2' />
                                Upload Invoices
                            </label>
                            <input id="bill" className="w-full h-full" type="file" multiple hidden onChange={handleImageChange} />
                        </div>
                        <textarea
                            className='w-full md:w-[95%] p-3 bg-white text-black border-[1px] border-black rounded-[6px]'
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder='Description'
                            rows={8}
                        />
                    </div>
                    <div className='w-full h-[350px] md:w-[40%] md:h-full mt-5 md:m-0 bg-slate-200 flex flex-wrap justify-center items-center rounded-[8px] border-[1px] border-black overflow-y-scroll'>
                        {
                            formData.invoices.length > 0 ? (
                                formData.invoices.map((invoice, index) => (
                                    <div key={index} className="relative w-1/2 h-1/2 p-1">
                                        <img className="w-full h-full object-contain" src={URL.createObjectURL(invoice)} alt={`invoice_${index}`} />
                                        <button 
                                            onClick={() => handleImageDelete(index)}
                                            className="absolute top-0 right-0 text-red-600 bg-white rounded-full p-1 hover:bg-red-600 hover:text-white"
                                        >
                                            <FaTimes />
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="text-gray-500 text-center">No invoice uploaded</div>
                            )
                        }
                    </div>
                </div>
                <div className='w-full md:h-[15%] px-2 md:ps-16'>
                    <div className='w-full md:w-[60%] h-full'>
                        <button
                            className={isButtonDisabled ? 'w-full md:w-[90%] h-12 bg-[#9b9b9c] text-white rounded-2xl' : 'w-full md:w-[90%] h-12 bg-[#005DB8] text-white rounded-2xl'}
                            onClick={handleSubmit}
                            disabled={isButtonDisabled}
                        >
                            Create Expense
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddExpense;
