"use client"

import React, { useState, useEffect, useRef } from "react";
// import { useDistributionFilterStore } from './filterState'
import NavLink from '../navlink/navlink';
import { useNavbarTextStore } from "../../state/navbar-state";
import ProfileView from '@/app/components/users/profileView';
import {toast} from 'react-hot-toast'
import axios from "axios";
import BeneficiariesListTable from "./BeneficiariesListTable";




function BeneficiariesList() {

    const [usersData, setUsersData] = useState([]);

	const [pageRows, setPageRows] = useState(10);
  	const [pageNo, setPageNo] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [searchedPageNo, setSearchedPageNo] = useState(1);
	const [isSearchedData, setIsSearchedData] = useState(false);
	const [filterToggle, setFilterToggle] = useState(false);
	const [userId, setUserId] = useState(null);
	const [isViewProfile, setIsViewProfile] = useState(false);
	const [tableRowToggle, setTableRowToggle] = useState(false);


	// console.log(pageNo, totalPages, filteredPageNo);


	const searchRef = useRef()
	const textRef = useRef()
  


    const setNavbarText = useNavbarTextStore((state) => state.setNavbarText);
	setNavbarText("Users List");

    
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
        if(!isSearchedData) {
            setPageRows(newRow);
            setTableRowToggle(!tableRowToggle);
            return;
        
        } else if(isSearchedData) {
            setPageRows(newRow);
            handleSearch(1, newRow);
        }
    };



	//handleSearch to quickly search meditators

	async function handleSearch(page, newRow) {
		const rows = newRow ? newRow : pageRows;
		const searchPage = page ? page : 1
		try {
			console.log(searchRef.current.value);
			console.log(textRef.current.value);
	
			const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/search?field=${searchRef.current.value}&value=${textRef.current.value}&page=${searchPage}&limit=${rows}`);
			console.log(response);
			setUsersData(response.data.data); 
			setIsSearchedData(true);
			setIsFilteredData(false);
			setTotalPages(response.data.pagination.totalPages);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};
  
	

    return (
        <div className="w-full h-[85vh] px-7 overflow-y-auto">

            <div className='flex items-center justify-between'>
                <NavLink />
            </div>

            <div className='w-full h-[90%] mt-2 p-4 bg-white rounded-[8px] shadow drop-shadow-md'>
                
                <div className='w-full h-full mt-2'>


                {/* -----search bar------- */}
                {/* <div className="w-full h-[10%] flex items-center">
 
                    <div className="w-[40%] h-full flex items-center">
                        <select 
                            ref = {searchRef}
                            className="px-2 w-40 h-8 text-[12px] focus:outline-none rounded bg-[#EEEAEA] text-black"
                        >
                            <option value = "" disabled selected>
                              Choose option
                            </option>
                            <option value="DOJ">Date Of Joining</option>
                            <option value="firstName">First Name</option>
                            <option value="secondName">Second Name</option>
                            <option value="UId">User Id</option>
						
 
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
									setPageNo(1);
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
                        <select name="newRow" id=""
                            className="px-2 w-20 h-8 text-[12px] focus:outline-none rounded bg-[#EEEAEA] text-black"
                            onChange={(event) => {
                                // console.log(e.target.value);
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

                    <div className="w-[40%] flex items-center justify-between">
                        
                    
                    </div>

                </div> */}


                {/* <div className="w-full h-[80%] m-0 p-0 overflow-scroll"> */}
                <div className="w-full h-[90%] m-0 p-0 overflow-scroll">

                    <BeneficiariesListTable
                        usersData={usersData} 
                        setUsersData={setUsersData}
						setUserId={ setUserId }
						setIsViewProfile={ setIsViewProfile }
                        pageNo={pageNo}
                        setTotalPages={setTotalPages}
                        filterToggle={filterToggle}
						isSearchedData={isSearchedData}
                        setIsSearchedData={setIsSearchedData}
                        setSearchedPageNo={setSearchedPageNo}
						pageRows={pageRows}
                        tableRowToggle={tableRowToggle}
                    />
                    
               	</div>


              	<div className="w-full h-[10%] px-2 flex justify-between items-center border-t-[1px] border-[#005DB8]">
                   <div>
                      	{
                      	  (!isSearchedData ) &&
                      	    <p className="text-sm text-gray-500">Page { pageNo } of { totalPages }</p>
                      	}

						{
                        	(isSearchedData) &&
							<p className="text-sm text-gray-500">Page { searchedPageNo } of { totalPages }</p>
						}
                    </div>

                    {
                        (!isSearchedData ) &&
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
                        (isSearchedData) &&
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

		    {
		    	isViewProfile && <ProfileView UId={ userId } setIsViewProfile={ setIsViewProfile } />
		    }
   

  	    </div>
    )
}

export default BeneficiariesList