"use client";

import React, { useEffect, useState } from "react";
import { useMahadhanamFilterStore } from "@/app/users/mahadhanam/filterstate";
import axios from 'axios';
import { toast } from "react-hot-toast"

function  MahadhanamTable(props) {

    const filterState = useMahadhanamFilterStore((state) => {
        return state;
    });
    
    console.log(filterState.distributedList);


    useEffect(() => {

        const pageNo = props.pageNo;
        const pageRows = props.pageRows;

        const fetchData = async () => {

            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/mahadhanam-list-meditators?page=${pageNo}&limit=${pageRows}`);

                filterState.setMeditatorsData(response.data.users);
                filterState.setCouponCount(response.data.totalCoupons)
                props.setTotalPages(response.data.totalPages);
                props.setIsFilteredData(false);
                props.setIsSearchedData(false);
                props.setFilteredPageNo(1);
                props.setSearchedPageNo(1);
                console.log(response);
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error("Error fetching data.");
            }

            return () => {
                return;
            }
        };

        fetchData();
    }, [props.pageNo, props.filterToggle, props.fetchToggle, props.tableRowToggle, props.bantoggle]);

    return (
        <table className="table">
            <thead className="bg-[#5799FD] text-white sticky top-0 text-[0.9rem] z-50">
                <tr>
                    <th className="text-center">DOJ</th>
                    <th className="text-center">Name</th>
                    <th className="text-center">Id</th>
                    <th className="text-center">Coupons</th>
                    <th className="text-center">Phone</th>
                    <th className="text-center">Email</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Ban</th>
                    <th className="text-center">
                        <label>
                            <input
                                className="w-4 h-4 checkbox checkbox-md checkbox-accent bg-white text-2xl focus:outline-none text-[#34d399] border-none shadow-none px-[0.7rem] py-[0.7rem] focus:ring-0 "
                                type="checkbox"
                                onChange={function (e) {
                                    console.log(e.target.checked)
                                    if (e.target.checked) {
                                        const UIds = filterState.meditatorsData.map(function (i) {
                                            return i.UId
                                        })
                                        filterState.setDistributedList(UIds)
                                        filterState.setSelectAll(true);
                                        // console.log(UIds);
                                    } else {
                                        filterState.setSelectAll(false)
                                    }
                                }}
                            />
                        </label>
                    </th>
                </tr>
            </thead>

            <tbody className="">
                {
                    filterState.meditatorsData[0] ? (
                        filterState.meditatorsData.map((i, index) => {
                            return (
                                <tr
                                    key={index}
                                    className="font-medium text-xs text-black border-b-[1px] border-[#eeeeee]"
                                >

                                    <td className="text-center">{i.DOJ ? i.DOJ : "-"}</td>
                                    <td
                                        className="text-center text-indigo-600 hover:text-indigo-800 hover:scale-105 cursor-pointer"
                                        onClick={() => {
                                            // props.setUserId(i.UId);
                                            // props.setIsViewProfile(true);
                                            filterState.setRefPopData(i.UserId, true);
                                        }}
                                    >
                                        {i.firstName + " " + i.secondName}
                                    </td>
                                    <td className="text-center">{i.UId} </td>
                                    <td className="text-center">{i.coupons} </td>
                                    <td className="text-center">{i.phone} </td>
                                    <td className="text-center">{i.email}</td>
                                    <td className={(i.user_Status === "BANNED" || i.user_Status === "DELETED") ? "text-center text-red-600" : "text-center text-green-600"}>
                                            {i.user_Status === "BANNED" && "Banned"}
                                            {i.user_Status === "DELETED" && "Deleted"}
                                            {(i.user_Status === "ACTIVE" || i.user_Status === null) && "Active"}
                                    </td>

                                    <td className="text-center">
                                        <button
                                            className="w-5 h-5"
                                            onClick={() => {
                                                props.setBanToggle(true);
                                                props.setUserId(i.UId);
                                                // console.log(i.UserId);
                                            }}
                                            disabled={i.ban === true || i.ban === 1}
                                        >
                                            <img src="/admin/ban.png" className={`${i.ban === true || i.ban === 1 ? "mahadhanam-ban" : ""}`} />
                                        </button>
                                    </td>
                                    <td className="text-center">
                                        <label>
                                            <input
                                                type="checkbox"
                                                className={filterState.selectAll ? `w-4 h-4 checkbox  checkbox-md text-2xl outline-none checkbox-accent focus:outline-none text-[#34d399] border-none shadow-none focus:ring-0 bg-gray-800 opacity-20` : `w-4 h-4 checkbox checkbox-md text-2xl outline-none checkbox-accent  focus:outline-none text-[#34d399] border-none shadow-none px-[0.7rem] py-[0.7rem] focus:ring-0 bg-gray-500`}
                                                disabled={filterState.selectAll || i.user_Status === "DELETED" || i.user_Status === "BANNED"}
                                                checked={filterState.distributedList.has(i.UId)}
                                                onClick={(e) => {
                                                    console.log(i.UId, "checked individual box");
                                                    if (e.target.checked) {
                                                        filterState.setDistributedList(i.UId);
                                                        // filterState.setDistributedListUserId(i.UserId)
                                                        // console.log(filterState.distributedList);
                                                    } else {
                                                        filterState.setRemoveIdFromDistList(i.UId);
                                                    }
                                                }}
                                            />
                                        </label>
                                    </td>

                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td>No results found</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    );
}

export default MahadhanamTable;