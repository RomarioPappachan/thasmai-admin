"use client";
 
import React, { useState, useEffect, useRef } from "react";
import { useNavbarTextStore } from "../../state/navbar-state";
import { useMahadhanamFilterStore } from "./filterstate";
import NavLink from "../navlink/navlink";
import FilterChip from "./filterchips";
import MahadhanamTable from "@/app/components/users/mahadhanam/MahadhanamTable";
import MahadhanamCart from "@/app/components/users/mahadhanam/MahadhanamCart";
// import ProfileView from "@/app/components/users/profileView";
import { MdOutlineShoppingCart } from "react-icons/md";
import { PiShareFatLight } from "react-icons/pi";
import { TbRefresh } from "react-icons/tb";
import axios from "axios";
import {toast} from 'react-hot-toast'
import MahadhanamBan from "@/app/components/users/mahadhanam/MahadhanamBan";
import MahadhanamCouponLabel from "@/app/components/couponlabel/MahadhanamCouponLabel";
import MahadhanamRefPop from "@/app/components/users/mahadhanam/MahadhanamRefPop";
// import data from "./data.json";
// import BanUserPopup from "@/app/components/users/meditatorList/BanUserPopup";
 
 
 
function Mahadhanam() {
 
    const [pageRows, setPageRows] = useState(10);
    const [pageNo, setPageNo] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [filteredPageNo, setFilteredPageNo] = useState(1);
	const [isFilteredData, setIsFilteredData] = useState(false);
    const [searchedPageNo, setSearchedPageNo] = useState(1);
	const [isSearchedData, setIsSearchedData] = useState(false);
	const [filterToggle, setFilterToggle] = useState(false);
    const [fetchToggle, setFetchToggle] = useState(false);
    const [tableRowToggle, setTableRowToggle] = useState(false);
 
	const [userId, setUserId] = useState(null);
	const [isViewProfile, setIsViewProfile] = useState(false);
    const [bantoggle,setBanToggle] = useState(false);

    const [copyTable, setCopyTable] = useState(false);
    const [copyTableToggle, setCopyTableToggle] = useState(false);
    
    const fieldRef = useRef("")
    const operatorRef = useRef("")
    const dataRef = useRef("")
    const startDateRef = useRef()
    const endDateRef = useRef()
 
    const searchRef = useRef()
    const textRef = useRef()
    const distributeRef = useRef()
 
    const filterState = useMahadhanamFilterStore((state) => {
        return state;
    });
 
    const setNavbarText = useNavbarTextStore((state) => state.setNavbarText);
    setNavbarText("Users");
 
 
    // useEffect(()=>{console.log('hi',filterState.fieldValue);filterState.setFieldText(filterState.fieldValue)},[])
    // useEffect(()=>{filterState.setFieldText(filterState.fieldValue)},[filterState.fieldValue])  

    useEffect(() => {

        const fetchData = async () => {

            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/copy-users`);
                console.log(response);
                if(response.data.message) {
                    setCopyTable(true);
                }
            } catch (error) {
                console.error('Error copying table:', error);
                toast.error("Error fetching data.");
            }

            return () => {
                return;
            }
        };

        fetchData();
    }, [copyTableToggle]);
 
 
 
    function handleFieldChange(e) {
        const value = e.target.value;
        console.log(value, filterState);
        filterState.setFieldValue(value);
        filterState.setOperatorValue("");
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
 
    function handleFilteredPreviousPage() {
        if(filteredPageNo <= 1) {
            return;
        } else {
            setFilteredPageNo(prevPageNo => {
                const newPageNo = prevPageNo - 1;
                handleClickFind(newPageNo);
                return newPageNo;
            });
        }
    };
 
    function handleFilteredNextPage() {
        if(filteredPageNo >= totalPages ) {
            return;
        } else {
            setFilteredPageNo(prevPageNo => {
                const newPageNo = prevPageNo + 1;
                handleClickFind(newPageNo);
                return newPageNo;
            });
        }
    };
 
    function handleSearchedPreviousPage() {
        if(searchedPageNo <= 1) {
            return;
        } else {
            setSearchedPageNo(prevPageNo => {
                const newPageNo = prevPageNo - 1;
                handleSearch(newPageNo, pageRows);
                return newPageNo;
            });
        }
    };
 
    function handleSearchedNextPage() {
        if(searchedPageNo >= totalPages ) {
            return;
        } else {
            setSearchedPageNo(prevPageNo => {
                const newPageNo = prevPageNo + 1;
                handleSearch(newPageNo, pageRows);
                return newPageNo;
            });
        }
    };
 
    function handleChangeRow(event) {
 
        const newRow = event.target.value;
        if(!isFilteredData && !isSearchedData) {
            setPageNo(1);
            setPageRows(newRow);
            setTableRowToggle(!tableRowToggle);
            return;
        } else if(!isSearchedData && isFilteredData) {
            setFilteredPageNo(1);
            setPageRows(newRow);
            handleClickFind(1, newRow);
        } else if(!isFilteredData && isSearchedData) {
            setSearchedPageNo(1);
            setPageRows(newRow);
            handleSearch(1, newRow);
        }
    };
 
 
 
    //handleClick to filter list
    async function handleClickFind (newPageNo, newRow) {
        try {
            const config = {
                "DOJ" : "DOJ",
				"First Name" : "firstName",
				"Second Name" : "secondName",
				"User Id" : "UId",
				"Available Coupons" : "coupons",
				// "Distributed coupon" : "total_distributed_coupons",
				"Phone" : "phone",
				"Email" : "email",
				"Status" : "user_Status",
				// "Donation Paid So Far" : "total_donation",
				// "Latest Donation" : "latest_donation",
				// "Level" : "Level",
				// "Node" : "node_number",
 
                "starts with":"like",
                "equal to": "=",
                "greater than" : ">",
                "less than" : "<",
                "not equal to" : "<>"
            }
            console.log(config["starts with"]);
 
            const filteredData = filterState.filters.map((i, ind) => {
                const field = i.field;
                const operator = i.operator.toLowerCase();
                const value = ( i.field.toLowerCase() ==="first name" || 
                                i.field.toLowerCase() ==="second name" ||
                                i.field.toLowerCase() ==="phone" ||
                                i.field.toLowerCase() ==="email") && (i.operator.toLowerCase() === "starts with") ? `${i.value}%` : i.value;
                console.log(field,value,operator);
 
                if(field.includes("DOJ") && operator === "between") {
                    return({
                        field : config[`${field}`], 
                        operator: "between", 
                        value: value, 
                        logicaloperator: i.logicaloperator
                    });
                } 
 
                return({
                    field : config[`${field}`], 
                    operator: config[`${operator}`], 
                    value: value, 
                    logicaloperator: i.logicaloperator
                });
            });
 
            filteredData[filteredData.length-1].logicaloperator = "null";
            console.log(filteredData);   
 
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/mahadhanam-execute-query`, {
                queryConditions : filteredData,
                page : newPageNo,
                pageSize : newRow ? newRow : pageRows,
            });
            //undo
            console.log(response,"sdfghnbg");
            filterState.setMeditatorsData([...response.data.queryResults]);
            setIsFilteredData(true);
            setIsSearchedData(false);
			setTotalPages(response.data.totalPages);
 
        } catch (error) {
            console.error('Error occurred:', error);
            // toast.error(error.message);
        } 
    };
 
 
    //handleSearch to quickly search meditators
 
    async function handleSearch(page, newRow) {
        const rows = newRow ? newRow : pageRows;
        const searchPage = page ? page : 1
        try {
            console.log(searchRef.current.value)
            console.log(textRef.current.value)
 
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/mahadhanam-searchfield?field=${searchRef.current.value}&value=${textRef.current.value}&page=${searchPage}&limit=${rows}`);
            // console.log(response);
            filterState.setMeditatorsData(response.data.data); 
            setIsSearchedData(true);
            setIsFilteredData(false);
			setTotalPages(response.data.pagination.totalPages);
        } catch (error) {
            console.error('Error fetching data:', error);
            t
        }
    }
 
 
 
 
 
    //handleRedeem to redeem meditators coupons
  
    async function handleRedeem() {
        try {

            if(filterState.distributedList.size > 0 &&  distributeRef.current.value.length > 0) {

                const couponCount = parseInt(distributeRef.current.value);
                const uidArray = filterState.meditatorsData.map((item) => item.UId);
                console.log("uidArray", uidArray);
                
                const dl = [];
                
                filterState.distributedList.forEach((i) => {
                    dl.push(i);
                });
                console.log(dl);
                localStorage.setItem("redeem", JSON.stringify(dl));
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/mahadhanam-redeem`, {
                    coupons: couponCount,
                    UIds: dl,
                });
            
                console.log(response.data, "fbnujk");
                filterState.setToastData(true, response.data.message);
                setFetchToggle(!fetchToggle);
                setTimeout(() => {
                    filterState.setToastData(false);
                }, 5000);

                filterState.distributedList.clear();
                distributeRef.current.value = "";
                
            } else {
                if(filterState.distributedList.size === 0 ) {
                    filterState.SetValidToastData(true,"Select atleast one user")
                    setTimeout(()=>{
                      filterState.SetValidToastData(false)
                    }, 5000)
                } else if( distributeRef.current.value.length === 0 ) {
                    filterState.SetValidToastData(true,"Coupon is empty")
                    setTimeout(()=>{
                      filterState.SetValidToastData(false)
                    }, 5000);
                }
            }
            
 
        } catch (error) {
            console.error("Error distributing coupons:", error);

            filterState.SetValidToastData(true, error.response.data.message);
            setTimeout(()=>{
              filterState.SetValidToastData(false);
            }, 5000);
            
        }
    };
 
 
    //handleAdd

    async function handleAdd() {
        try {
            if(filterState.distributedList.size > 0 &&  distributeRef.current.value.length > 0) {
 
                const couponCount = distributeRef.current.value;
                const uidArray = filterState.meditatorsData.map((item) => item.UId);
                console.log("uidArray", uidArray, couponCount);
 
                const dl = [];
 
                filterState.distributedList.forEach((i) => {
                    dl.push(i);
                });
                console.log("qwerty", dl);
                localStorage.setItem("redeem", JSON.stringify(dl));
 
                const cart_data = JSON.parse(localStorage.getItem(`meditator_cart`));
 
                if(cart_data) {
                    console.log(cart_data, "cart data");
                    const addcart = new Set([...cart_data, ...dl]);
                    const finaldl = [];
                    for (const i of addcart) {
                        finaldl.push(i);
                    }
                    localStorage.setItem("meditator_cart", JSON.stringify(finaldl));
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/mahadhanam-coupons-cart`, {
                            couponsToDistribute: couponCount,
                            UIds: dl,
                    });
                    console.log(response.data, "fbnujk");
                    filterState.setToastData(true, response.data.message);

        

                } else {
                    localStorage.setItem("meditator_cart", JSON.stringify(dl));
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/mahadhanam-coupons-cart`, {
                        couponsToDistribute: couponCount,
                        UIds: dl,
                    });
                    console.log(response.data, "fbnujk");
                    filterState.setToastData(true, response.data.message);
                }
 
                setTimeout(() => {
                    filterState.setToastData(false);

                }, 2000);
 
                setFetchToggle(!fetchToggle);
                
                
                filterState.distributedList.clear();
                distributeRef.current.value = "";
 
            } else {
                console.log(filterState.distributedList, distributeRef.current.value, "apple");
 
                if(filterState.distributedList.size === 0 ) {
                    filterState.SetValidToastData(true,"Select atleast one user")
                    setTimeout(()=>{
                      filterState.SetValidToastData(false)
                    }, 5000)
                } else if( distributeRef.current.value.length === 0 ) {
                    filterState.SetValidToastData(true,"Coupon is empty")
                    setTimeout(()=>{
                      filterState.SetValidToastData(false)
                    }, 5000);
                }
 
            }
        } catch (error) {
            console.error("Error distributing coupons:", error);

            filterState.SetValidToastData(true, error.response.data.message);
            setTimeout(()=>{
              filterState.SetValidToastData(false)
            }, 5000);
        }
    };
 
 
    //handleDistribute to distribute coupons
 
    async function handleDistribute() {
        console.log('inside ');
        const couponCount = parseInt(distributeRef.current.value);
        const uidArray = filterState.meditatorsData.map((item) => item.UId);
        console.log("uidArray for distributing",couponCount,filterState.distributedList);
        try {
            if(filterState.distributedList.size > 0 &&  distributeRef.current.value.length > 0) {
 
                const couponCount = parseInt(distributeRef.current.value);
                const uidArray = filterState.meditatorsData.map((item) => item.UId);
                console.log("uidArray for distributing", uidArray,couponCount);
 
                if (couponCount % filterState.distributedList.size === 0) {
                    const dl = [];
                    filterState.distributedList.forEach((i) => {
                        dl.push(i);
                    });
                    console.log(dl,couponCount);
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/mahadhanam-coupon-systemDistribute`, {
                        totalCoupons: couponCount,
                        distributedIds: dl,
                    });
                    console.log(response.data, "fbnujk");
                    filterState.setToastData(true, response.data.message);
                    setFetchToggle(!fetchToggle);
 
                    setTimeout(() => {
                        filterState.setToastData(false);
                    }, 5000);

                    filterState.distributedList.clear();
                    distributeRef.current.value = "";

                } else {
                    filterState.SetValidToastData(true, "Cannot distribute coupons evenly")
                    setTimeout(() => {
                       filterState.SetValidToastData(false)
                    }, 5000)
                }

            } else {
                console.log(filterState.distributedList,distributeRef.current.value,"apple")
                if(filterState.distributedList.size === 0 ) {
                    filterState.SetValidToastData(true,"Select atleast one user")
                    setTimeout(() => {
                       filterState.SetValidToastData(false)
                    }, 5000)
                } else if( distributeRef.current.value.length === 0 ) {
                    filterState.SetValidToastData(true, "Coupon is empty")
                        setTimeout(()=>{
                          filterState.SetValidToastData(false)
                        },5000)
                }
 
            }
        } catch (error) {
            console.error("Error distributing coupons:", error);
            toast(error.message);
        }
    };
 
 
    //handleExport
 
    // async function handleExport() {
    //     try {
    //         const couponCount = parseInt(distributeRef.current.value);
    //         const redeemedList = localStorage.getItem("redeem");
 
    //         let template = "";
 
    //         for (let i = 0; i < JSON.parse(redeemedList).length; i++) {
    //             template += `UIds[]=${JSON.parse(redeemedList)[i]}`;
    //         }
 
    //         console.log(template);
 
    //         const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/download?${template}`, {
    //             responseType: 'blob', // Set the response type to blob
    //         });
 
    //         console.log(response.data, "fbnujk");
 
    //         // Create a Blob from the response data
    //         const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
 
    //         // Create a temporary URL for the Blob
    //         const url = window.URL.createObjectURL(blob);
 
    //         // Create a link element and click it to trigger the download
    //         const link = document.createElement('a');
    //         link.href = url;
    //         link.setAttribute('download', 'export.xlsx');
    //         document.body.appendChild(link);
    //         link.click();
 
    //         // Clean up resources
    //         link.remove();
    //         window.URL.revokeObjectURL(url);
 
    //         filterState.setToastData(true, response.data.message);
 
    //         setTimeout(() => {
    //             filterState.setToastData(false);
    //         }, 5000);
 
    //     } catch (error) {
    //         console.error('Error distributing coupons:', error);
    //     }
    // };
 
    async function handleExport() {
        try {
            const couponCount = parseInt(distributeRef.current.value);
            const redeemedList = localStorage.getItem("redeem");
 
            let template = "";
 
            for (let i = 0; i < JSON.parse(redeemedList).length; i++) {
                template += `UIds[]=${JSON.parse(redeemedList)[i]}&`;
            }
            // Remove the trailing '&'
            if (template.endsWith('&')) {
                template = template.slice(0, -1);
            }
 
            console.log(template);
 
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/mahadhanam-download?${template}`, {
                responseType: "blob", // Set the response type to blob
            });
            console.log(response.data, "fbnujk");
 
            // Create a Blob from the response data
            const blob = new Blob([response.data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
 
            // Create a temporary URL for the Blob
            const url = window.URL.createObjectURL(blob);
 
            // Create a link element and click it to trigger the download
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "export.xlsx");
            document.body.appendChild(link);
            link.click();
 
            // Clean up resources
            link.remove();
            window.URL.revokeObjectURL(url);
 
            filterState.setToastData(true, "Data exported successfully");
 
            setTimeout(() => {
                filterState.setToastData(false);
            }, 5000);

        } catch (error) {
            console.error("Error distributing coupons:", error);
        }
    };
 
 
 
 
    return (
 
        <div className="w-full h-[85vh] px-7 overflow-y-auto">
            <div className='flex items-center h-8'>
                <div className="w-[65%]">
                    <NavLink />
                </div>
                <div className="w-[30%] flex ">
                    <MahadhanamCouponLabel coupons ={filterState.couponCount} fetchToggle={ fetchToggle } />
                    <button 
                        className="w-[120px] h-8 ms-3 flex justify-center items-center rounded-full border-2 border-[#19AC65] hover:bg-[#19ac651e]"
                        onClick={handleExport}
                    >
                        <span className="text-black">Export</span>
                        <PiShareFatLight className="ms-2 text-xl text-[#19AC65]"/>
                    </button>
                </div>
                <div className="w-[5%] flex justify-center items-center">
                    <MdOutlineShoppingCart 
                        className="text-3xl cursor-pointer hover:scale-105 hover:text-red-600"
                        onClick={() => filterState.setCartToggle(prevState => !prevState)}
                    />
                </div>
            </div>
 
            <div className='w-full h-[93%] mt-2 p-4 bg-white rounded-[8px] shadow drop-shadow-md'>
                <div className="w-full h-8 flex justify-between">
 
                    <div className='w-[65%] flex'>
                        <select 
                            ref = {fieldRef}
                            className="px-2 w-40 h-8 text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]"
                            onChange={(e) => {
                                handleFieldChange(e);
                            }}
                        >
                            <option disabled selected>
                              Choose field
                            </option>
                            { 
                                filterState.fieldValues.map((i,index) => {
                                    return (
                                        <option key = {index} value = {i}> 
                                            {i}
                                        </option>
                                    )
                                  })
                            }
                        </select>
 
                            {/* -----------------operator select--------------- */}
                        {
						    filterState.fieldValue === "" && 
 
						    <select className="ms-3 px-2 w-40 h-8 text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]" 
						      disabled  
						    >
						      <option disabled selected>
						        Choose operator
						      </option>
						    </select>
						}
 
                        {
                            filterState.fieldValue === "DOJ" && 
 
                            <select className="ms-3 px-2 w-40 h-8 text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]" 
                                ref = {operatorRef}
                                onChange={e => {
                                    filterState.setOperatorValue(e.target.value)
                                }}
                            >
                                <option disabled selected>
                                      Choose operator
                                </option>
                                {
                                    filterState.dojOperator.map((i, index) => {
                                        return (
                                            <option key={index} value={i}>
                                                {i}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        }
 
                        {
                            filterState.fieldValue === "First Name" && 
 
                            <select className="ms-3 px-2 w-40 h-8 text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]" 
                                ref = {operatorRef}
                                onChange={e => {
                                    filterState.setOperatorValue(e.target.value)
                                }}
                            >
                                <option disabled selected>
                                      Choose operator
                                </option>
                                {
                                      filterState.stringOperator.map((i, index) => {
                                        return (
                                              <option key={index} value={i}>
                                                {i}
                                              </option>
                                        );
                                      })
                                }
                            </select>
                        }
 
						{
                            filterState.fieldValue === "Second Name" && 
 
                            <select className="ms-3 px-2 w-40 h-8 text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]" 
                                ref = {operatorRef}
                                onChange={e => {
                                    filterState.setOperatorValue(e.target.value)
                                }}
                            >
                                <option disabled selected>
                                      Choose operator
                                </option>
                                {
                                      filterState.stringOperator.map((i, index) => {
                                        return (
                                              <option key={index} value={i}>
                                                {i}
                                              </option>
                                        );
                                      })
                                }
                            </select>
                        }
 
						{
            			  	filterState.fieldValue === "User Id" && 
 
            			  	<select className="ms-3 px-2 w-40 h-8 text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]" 
            			  	  ref = {operatorRef}
            			  	  onChange={e => {
								filterState.setOperatorValue(e.target.value)
            			  	  }}
            			  	>
            			  	  <option disabled selected>
            			  	    Choose operator
            			  	  </option>
            			  	  <option value="equal to">Equal to</option>  
            			  	</select>
 
            			}
 
                        {
                            filterState.fieldValue === "Available Coupons" && 
 
                            <select className="ms-3 px-2 w-40 h-8 text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]" 
                                ref = {operatorRef}
                                onChange={e => {
                                    filterState.setOperatorValue(e.target.value)
                                }}
                            >
                                <option disabled selected>
                                      Choose operator
                                </option>
                                {
                                      filterState.integerOperator.map((i, index) => {
                                        return (
                                              <option key={index} value={i}>
                                                {i}
                                              </option>
                                        );
                                      })
                                }
                            </select>
                        }
 
                        {
                            filterState.fieldValue === "Phone" && 
 
                            <select className="ms-3 px-2 w-40 h-8 text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]" 
                                ref = {operatorRef}
                                onChange={e => {
                                    filterState.setOperatorValue(e.target.value)
                                }}
                            >
                                <option disabled selected>
                                      Choose operator
                                </option>
                                {
                                      filterState.stringOperator.map((i, index) => {
                                        return (
                                              <option key={index} value={i}>
                                                {i}
                                              </option>
                                        );
                                      })
                                }
                            </select>
                        }
 
						{
                            filterState.fieldValue === "Email" && 
 
                            <select className="ms-3 px-2 w-40 h-8 text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]" 
                                ref = {operatorRef}
                                onChange={e => {
                                    filterState.setOperatorValue(e.target.value)
                                }}
                            >
                                <option disabled selected>
                                      Choose operator
                                </option>
                                {
                                      filterState.stringOperator.map((i, index) => {
                                        return (
                                              <option key={index} value={i}>
                                                {i}
                                              </option>
                                        );
                                      })
                                }
                            </select>
                        }
 
						{
                    	    filterState.fieldValue === "Status" && 
 
                    	    <select className="ms-3 px-2 w-40 h-8 text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]" 
                    	      ref = {operatorRef}
                    	      onChange={e => {
                    	            filterState.setOperatorValue(e.target.value)
                    	      }}
                    	    >
                    	      <option disabled selected>
                    	            Choose operator
                    	      </option>
                    	      <option value="equal to">
                    	            equal to
                    	      </option>
                    	    </select>
                    	}
 
                                    {/* ----------------value input/select---------------- */}
 
                    	{
                    	    filterState.fieldValue === "" && (
                    	        <>
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] text-black  border-none text-slate-100"'></div>
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] text-black border-none text-slate-100"'></div>
                    	        </>
                    	    )
                    	}
 
                    	{
                    	    (filterState.fieldValue === "DOJ" && filterState.operatorValue === "") && 
                    	        <>
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	        </>
                    	}
                    	{
                    	  	( filterState.fieldValue === "DOJ" && filterState.operatorValue === "equal to") &&
                    	    <>
                    	      <input type="date" ref = {dataRef} className='ms-3 w-40 h-8 text-[12px] text-center px-4  focus:outline-none  rounded bg-white text-black border-[1px] border-[#44474E]' />
                    	      <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	    </>
                    	}
                    	{   ( filterState.fieldValue === "DOJ" && filterState.operatorValue === "between") && 
                    	    <>
                    	      <input type="date" ref={startDateRef} className='ms-3 w-40 h-8 text-[12px] text-center px-4  focus:outline-none  rounded bg-white text-black border-[1px] border-[#44474E]' />
                    	      <input type="date" ref={endDateRef} className='ms-3 w-40 h-8 text-[12px] text-center px-4  focus:outline-none  rounded bg-white text-black border-[1px] border-[#44474E]' />
                    	    </>
                    	}
 
 
                    	{
                    	    ( filterState.fieldValue === "First Name" && filterState.operatorValue === "") && 
                    	        <>
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	        </>
                    	}
                    	{ 
                    	    ( filterState.fieldValue  === "First Name" && filterState.operatorValue !== "") && 
                    	        <>
                    	              <input
                    	                type="text"
                    	                placeholder="Value" ref = {dataRef}
                    	                className="placeholder:text-black ms-3 w-40 h-8 text-[12px] text-center bg-white text-black px-4  focus:outline-none rounded border-[1px] border-[#44474E]"
                    	              />
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	        </>
                    	}
 
						{
                    	    ( filterState.fieldValue === "Second Name" && filterState.operatorValue === "") && 
                    	        <>
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	        </>
                    	}
                    	{ 
                    	    ( filterState.fieldValue  === "Second Name" && filterState.operatorValue !== "") && 
                    	        <>
                    	              <input
                    	                type="text"
                    	                placeholder="Value" ref = {dataRef}
                    	                className="placeholder:text-black ms-3 w-40 h-8 text-[12px] text-center bg-white text-black px-4  focus:outline-none rounded border-[1px] border-[#44474E]"
                    	              />
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	        </>
                    	}
 
 
						{
                    	    ( filterState.fieldValue === "User Id" && filterState.operatorValue === "") && 
                    	        <>
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	        </>
                    	}
                    	{ 
                    	    ( filterState.fieldValue  === "User Id" && filterState.operatorValue !== "") && 
                    	        <>
                    	              <input
                    	                type="text"
                    	                placeholder="Value" ref = {dataRef}
                    	                className="placeholder:text-black ms-3 w-40 h-8 text-[12px] text-center bg-white text-black px-4  focus:outline-none rounded border-[1px] border-[#44474E]"
                    	              />
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	        </>
                    	}
 
                        {
                    	    ( filterState.fieldValue === "Available Coupons" && filterState.operatorValue === "") && 
                    	        <>
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	        </>
                    	}
                    	{ 
                    	    ( filterState.fieldValue  === "Available Coupons" && filterState.operatorValue !== "") && 
                    	        <>
                    	              <input
                    	                type="text"
                    	                placeholder="Value" ref = {dataRef}
                    	                className="placeholder:text-black ms-3 w-40 h-8 text-[12px] text-center bg-white text-black px-4  focus:outline-none rounded border-[1px] border-[#44474E]"
                    	              />
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	        </>
                    	}
 
                        {
                    	    ( filterState.fieldValue === "Phone" && filterState.operatorValue === "") && 
                    	        <>
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	        </>
                    	}
                    	{ 
                    	    ( filterState.fieldValue  === "Phone" && filterState.operatorValue !== "") && 
                    	        <>
                    	              <input
                    	                type="text"
                    	                placeholder="Value" ref = {dataRef}
                    	                className="placeholder:text-black ms-3 w-40 h-8 text-[12px] text-center bg-white text-black px-4  focus:outline-none rounded border-[1px] border-[#44474E]"
                    	              />
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	        </>
                    	}
 
						{
                    	    ( filterState.fieldValue === "Email" && filterState.operatorValue === "") && 
                    	        <>
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	        </>
                    	}
                    	{ 
                    	    ( filterState.fieldValue  === "Email" && filterState.operatorValue !== "") && 
                    	        <>
                    	              <input
                    	                type="text"
                    	                placeholder="Value" ref = {dataRef}
                    	                className="placeholder:text-black ms-3 w-40 h-8 text-[12px] text-center bg-white text-black px-4  focus:outline-none rounded border-[1px] border-[#44474E]"
                    	              />
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	        </>
                    	}
 
 
						{
                    	    ( filterState.fieldValue === "Status" && filterState.operatorValue === "") && 
                    	        <>
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	        </>
                    	}
                    	{
                    	    (filterState.fieldValue  === "Status" && filterState.operatorValue !== "") && (
                    	        <>
                    	              <select className='ms-3 px-2 w-40 h-8 text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]' ref = {dataRef}>
                    	                <option value="" disabled selected>
                    	                      Choose value
                    	                </option>
                    	                {/* {
                    	                      filterState.statusValues.map((i, index) => {
                    	                        return <option value={i}>
                    	                              {i}
                    	                        </option>
                    	                      }) 
                    	                } */}
                                        <option value="ACTIVE">Active</option>
                                        <option value="BANNED">Banned</option>
                                        <option value="DELETED">Deleted</option>
                    	              </select>
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	        </>
                    	    )
                    	} 
 
              		</div>
 
                                      {/* ---------------------------AND / OR button------------------------ */}
 
               		<div className='w-[15%]  flex'>
 
                   	<button 
                   	   className="w-[60px] h-8 px-3 text-[12px] bg-[#D6E3FF] text-black rounded-2xl" 
                        onClick={(e) => {
                            if(filterState.fieldValue === "" || filterState.operatorValue === "") {
                                toast("Please choose a field and an operator to filter")
                            } else{
                                if(filterState.operatorValue === "between") {
                                    let startDate = startDateRef.current.value;
                                    startDate = startDate.split("-");
                                    startDate = `${startDate[0]}-${startDate[1]}-${startDate[2]}`;
 
                                    let endDate = endDateRef.current.value;
                                    endDate = endDate.split("-");
                                    endDate = `${endDate[0]}-${endDate[1]}-${endDate[2]}`;
 
                                    if(startDate && endDate){
                                        console.log(startDate, endDate);
 
                                        filterState.setFilter({
                                            field : fieldRef.current.value, 
                                            operator : "between", 
                                            value : `${startDate}/${endDate}`, 
                                            logicaloperator: 'and'
                                         })
                                    } else{
                                        toast("Please select start date and end date to filter")
                                    }
 
 
                                } else if(filterState.fieldValue.includes("Date") && filterState.operatorValue === "equal to") {
                                    let date = dataRef.current.value;
                                    date = date.split("-");
                                    date = `${date[0]}-${date[1]}-${date[2]}`;
 
                                    if(dataRef.current.value) {
                                        filterState.setFilter({
                                            field : fieldRef.current.value, 
                                            operator : operatorRef.current.value, 
                                            value : `${date}`, 
                                            logicaloperator: 'and'
                                        })
                                    } else{
                                        toast("Please select a date to filter")
                                    }
 
 
                                } else {
                                    const val = dataRef.current.value
                                    if(val){
                                        filterState.setFilter({
                                            field : fieldRef.current.value, 
                                            operator : operatorRef.current.value, 
                                            value : dataRef.current.value, 
                                            logicaloperator: 'and'
                                        })
                                    } else{
                                        toast("Please input a value to filter")
                                    }
 
                                }
                            }
                        }}
                   	>
                         AND
                  	</button>
 
                  	<button 
                  	    className="ms-3 w-[60px] h-8 px-3 text-[12px] bg-[#D6E3FF] text-black rounded-2xl" 
                  	    onClick={(e) => {
                            if(filterState.fieldValue === "" || filterState.operatorValue === "") {
                                toast("Please choose a field and an operator to filter")
                            } else{
                                if(filterState.operatorValue === "between") {
                                    let startDate = startDateRef.current.value;
                                    startDate = startDate.split("-");
                                    startDate = `${startDate[0]}-${startDate[1]}-${startDate[2]}`;
 
                                    let endDate = endDateRef.current.value;
                                    endDate = endDate.split("-");
                                    endDate = `${endDate[0]}-${endDate[1]}-${endDate[2]}`;
 
                                    if(startDate && endDate){
                                        console.log(startDate, endDate);
 
                                        filterState.setFilter({
                                            field : fieldRef.current.value, 
                                            operator : "between", 
                                            value : `${startDate}/${endDate}`, 
                                            logicaloperator: 'or'
                                         })
                                    } else{
                                        toast("Please select start date and end date to filter")
                                    }
 
 
                                } else if(filterState.fieldValue.includes("Date") && filterState.operatorValue === "equal to") {
                                    let date = dataRef.current.value;
                                    date = date.split("-");
                                    date = `${date[0]}-${date[1]}-${date[2]}`;
 
                                    if(dataRef.current.value) {
                                        filterState.setFilter({
                                            field : fieldRef.current.value, 
                                            operator : operatorRef.current.value, 
                                            value : `${date}`, 
                                            logicaloperator: 'or'
                                        })
                                    } else{
                                        toast("Please select a date to filter")
                                    }
 
 
                                } else {
                                    const val = dataRef.current.value
                                    if(val){
                                        filterState.setFilter({
                                            field : fieldRef.current.value, 
                                            operator : operatorRef.current.value, 
                                            value : dataRef.current.value, 
                                            logicaloperator: 'or'
                                        })
                                    } else{
                                        toast("Please input a value to filter")
                                    }
 
                                }
                            }
                        }}
                  	>
                        OR
                  	</button>
 
              	</div>
                                        {/* --------------Find button---------------- */}
 
              	<div className='w-[20%] h-full text-right'>
              	    <button 
              	        className="px-6 h-8 text-[12px] bg-[#005DB8] rounded-xl text-white font-semibold shadow-lg" 
              	        onClick={() => { 
              	            console.log('clicked');
              	            handleClickFind(1, pageRows);
              	        }}
              	    >
              	        Find
              	    </button>
              	</div>
 
          	</div>
 
 
 
                                    {/* ------------------Fiterchips div ------------------- */}
 
          	<div className="w-full h-[10%] my-3 p-2 bg-[#005DB8] overflow-y-auto shadow  flex flex-wrap items-center snap-mandatory snap-y">
 
                { 
                  	filterState.filters[0] ? (
                  	  	filterState.filters.map((i, index) => {
                  	  	  return (
                  	  	        <FilterChip key={index} filter={i} index={index} setFilterToggle={setFilterToggle} filterToggle={filterToggle} />
                  	  	  )
                  	  	})
 
                  	) : (
                  	    <p className="ms-3 text-[#94a3b8] font-light">No filters applied</p>
                  	)
                }
 
            </div>
 
                {/* -----search bar and meditators list table------- */}
 
 
            <div className='w-full h-[80%] mt-2'>
 
                {/* -----search bar------- */}
                <div className="w-full h-[10%] flex items-center"> 
 
                    <div className="w-[40%] h-full flex items-center">
                        <select 
                            ref = {searchRef}
                            className="px-2 w-40 h-8 text-[12px] focus:outline-none rounded bg-[#EEEAEA] text-black"
                        >
                            <option value="" disabled selected>
                              Choose option
                            </option>
                            <option value="DOJ">Date Of Joining</option>
                            <option value="firstName">First Name</option>
                            <option value="secondName">Second Name</option>
                            <option value="UId">User Id</option>
                            <option value="coupons">Available Coupons</option>
                            <option value="phone">Phone</option>
                            <option value="email">Email</option>
 
                        </select>
 
                        <input
                    	    type="text"
                    	    placeholder="Value" ref = {textRef}
                    	    className="placeholder:text-black ms-3 w-40 h-8 text-[12px] text-center bg-[#EEEAEA] text-black px-4  focus:outline-none rounded"
                    	/>
 
                        <div className="h-full flex items-center">
                            <img 
                                src="/admin/search.png" 
                                alt="search icon" 
                                className="w-8 h-8 ms-3 cursor-pointer hover:scale-105"
                                onClick={() => {
                                    handleSearch(1, pageRows);
                                }}
                            />
                        </div>
                        <p 
							className="ms-2 text-xs text-red-400 underline cursor-pointer"
							onClick={() => {
								setFilterToggle(!filterToggle);
								searchRef.current.value = "";
								textRef.current.value = "";
							}}
						>clear</p>
                    </div>
                    <div className="w-[20%]">
                        {/* <select name="newRow" id=""
                            className="px-2 w-20 h-8 text-[12px] focus:outline-none rounded bg-[#EEEAEA] text-black"
                            onChange={(event) => {
                                // console.log(event.target.value);
                                handleChangeRow(event);
                            }}
                        >
                            <option value="" selected disabled>Rows</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>

                        </select> */}

                        <button 
                            className="px-2 w-24 h-8 flex items-center gap-2 text-[14px] focus:outline-none rounded bg-[#4758f4] text-white hover:bg-[#4758f4d4]"
                            onClick={() => {
                                // setCopyTableToggle(prevValue => !prevValue);
                                // setTableRowToggle(prevValue => !prevValue);
                                // toast.success("Data refreshed successfully");
                                window.location.reload();
                            }}
                        >
                            Refresh 
                            <TbRefresh />
                        </button>

                    </div>
                    <div className="w-[40%] flex items-center justify-between">
                        <div className="w-24 h-8 pe-2 flex justify-between items-center bg-[#EEEAEA] rounded">
                            <input
                                type="number"
                                placeholder="Coupons"
                                ref = {distributeRef}
                                className="w-16 h-full px-2 text-[12px] focus:outline-none rounded-s bg-[#EEEAEA] text-black placeholder:text-black"
                            />
                            <div className="h-full flex justify-center items-center">
                                <img className="w-4 h-4" src="/admin/coupon-count.png" alt="coupon-icon" />
                            </div>
                        </div>
 
                        <button 
                            className="w-24 h-8 text-[14px] text-white font-medium rounded bg-[#676967de] hover:bg-[#676967]" 
                            onClick={handleRedeem}
                        >
                            Redeem
                        </button>
 
                        <button 
                            className="w-24 h-8 text-[14px] text-white font-medium rounded bg-[#04AA6D] hover:bg-[#5ae0af]" 
                            onClick={handleAdd}
                        >
                          Add to cart
                        </button>
 
                        <button 
                            className="w-24 h-8 text-[14px] text-white font-medium rounded bg-[#5799fdcf]  hover:bg-[#5799FD] " 
                            onClick={handleDistribute}
                        >
                          Distribute
                        </button>
                    </div>
                </div>
 
                <div className="w-full h-[80%] m-0 p-0 overflow-y-auto">

                   { copyTable ?
                    <MahadhanamTable
                        bantoggle = {bantoggle}
                        setBanToggle = {setBanToggle}
						setUserId={ setUserId }
						setIsViewProfile={ setIsViewProfile }
						isFilteredData={ isFilteredData } 
                        setIsFilteredData={setIsFilteredData}
                        setFilteredPageNo={setFilteredPageNo}
                        isSearchedData={isSearchedData}
                        setIsSearchedData={setIsSearchedData}
                        setSearchedPageNo={setSearchedPageNo}
                        pageNo={ pageNo }
						filteredPageNo={ filteredPageNo }
                        setTotalPages={setTotalPages}
                        pageRows={pageRows}
                        filterToggle={filterToggle}
                        fetchToggle={fetchToggle}
                        tableRowToggle={tableRowToggle}
                        
                    /> 
                    :
                    <div class="p-4 w-full mx-auto">
                        <div class="animate-pulse">
                            <table class="min-w-full divide-y divide-gray-200">
                              <tbody class="bg-white divide-y divide-gray-200">
                                <tr>
                                  <td class="text-center py-2 w-full">
                                    <div class="h-8 bg-gray-300 rounded"></div>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="text-center py-2 w-full">
                                    <div class="h-8 bg-gray-300 rounded"></div>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="text-center py-2 w-full">
                                    <div class="h-8 bg-gray-300 rounded"></div>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="text-center py-2 w-full">
                                    <div class="h-8 bg-gray-300 rounded"></div>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="text-center py-2 w-full">
                                    <div class="h-8 bg-gray-300 rounded"></div>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="text-center py-2 w-full">
                                    <div class="h-8 bg-gray-300 rounded"></div>
                                  </td>
                                </tr>
                                
                              </tbody>
                            </table>
                        </div>
                    </div>

                   }
               	</div>
 
 
              	<div className="w-full h-[10%] px-2 py-1 flex justify-between items-center border-t-[1px] border-[#005DB8]">
                   <div className="flex items-center gap-3">
                        {
                      	  ( !isFilteredData && !isSearchedData ) &&
                      	    <p className="text-sm text-gray-500">Page { pageNo } of { totalPages }</p>
                      	}
						{
                        	(!isSearchedData && isFilteredData) &&
							<p className="text-sm text-gray-500">Page { filteredPageNo } of { totalPages }</p>
						}
						{
                        	(!isFilteredData && isSearchedData) &&
							<p className="text-sm text-gray-500">Page { searchedPageNo } of { totalPages }</p>
						}
                        <select name="newRow" id=""
                            className="px-2 w-20 h-8 text-[12px] focus:outline-none rounded bg-[#EEEAEA] text-black"
                            onChange={(event) => {
                                // console.log(event.target.value);
                                handleChangeRow(event);
                            }}
                        >
                            <option value="" selected disabled>Rows</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>

                        </select>
                    </div>
 
                    {
                        ( !isFilteredData && !isSearchedData ) &&
                            <div>
                                <button
                                    className="w-24 h-8 text-sm bg-[#005DB8] text-white rounded-xl"
                                    onClick={ handlePreviousPage }
                                >Previous</button>
                                <button
                                    className="w-24 h-8 ms-5 text-sm bg-[#005DB8] text-white rounded-xl"
                                    onClick={ handleNextPage }
                                >Next</button>
                            </div>
                    } 
 
                    {
                        (!isSearchedData && isFilteredData) &&
                            <div>
                                <button
                                    className="w-24 h-8 text-sm bg-[#005DB8] text-white rounded-xl"
                                    onClick={ handleFilteredPreviousPage }
                                >Previous</button>
                                <button
                                    className="w-24 h-8 ms-5 text-sm bg-[#005DB8] text-white rounded-xl"
                                    onClick={ handleFilteredNextPage }
                                >Next</button>
                            </div>
                    }
 
                    {
                        (!isFilteredData && isSearchedData) &&
                            <div>
                                <button
                                    className="w-24 h-8 text-sm bg-[#005DB8] text-white rounded-xl"
                                    onClick={ handleSearchedPreviousPage }
                                >Previous</button>
                                <button
                                    className="w-24 h-8 ms-5 text-sm bg-[#005DB8] text-white rounded-xl"
                                    onClick={ handleSearchedNextPage }
                                >Next</button>
                            </div>
                    }
              	</div>
          	</div>
 
 
        </div>
 
		{/* {
			isViewProfile && <ProfileView UId={ userId } setIsViewProfile={ setIsViewProfile } />
		} */}
 
        {
            filterState.cartToggle  &&
                <MahadhanamCart 
                    setCartToggle={filterState.setCartToggle} 
                    fetchToggle={fetchToggle} 
                    setFetchToggle={setFetchToggle}
                    distributedList={filterState.distributedList}
                />
        }
 
 { 
        filterState.validToastData.validToastToggle && 
 
        <div className="toast toast-center toast-middle">
 
          <div className="alert alert-success">
            <span>{filterState.validToastData.validToastText}</span>
          </div>
        </div>
      }
 
 
      {
        filterState.toastData.toggle && (
        <div className="toast toast-center toast-middle">
          <div className="alert alert-success">
            <span>{filterState.toastData.message}</span>
          </div>
        </div>
      )}
        
        {
            bantoggle && <MahadhanamBan userId={ userId } bantoggle = {bantoggle} setBanToggle = {setBanToggle}/>
        }


        {
            filterState.RefPopData.refPopupToggle && 
                <MahadhanamRefPop refUserId={filterState.RefPopData.refUserId} />
        }
  	</div>
    );
}
 
export default Mahadhanam; 