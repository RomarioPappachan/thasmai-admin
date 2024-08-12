"use client"

import React, { useState, useEffect } from 'react';
import { useBlogFilterStore } from "@/app/events/blogs/filterstate";
import axios from 'axios';
import { toast } from 'react-hot-toast'
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Fill } from "react-icons/ri";


function BlogDetailsTable(props) {

  	const [blogs, setBlogs] = useState([]);
  	const [loading, setLoading] = useState(true);
  	const [error, setError] = useState(null);


  	const filterState = useBlogFilterStore((state) => {
  	  return state;
  	});


  	useEffect(() => {
    	const fetchData = async () => {
    
        	try {
        	    	const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/listblogs?page=${props.pageNo}`);
      				filterState.setBlogsData(response.data.blogs);
      				props.setTotalPages(response.data.totalPages);
      				props.setIsFilteredData(false);
      				props.setFilteredPageNo(1);
				    console.log(response);
        	} catch (error) {
        	    // console.error('Error fetching data:', error);
      			toast.error("Error fetching data.");
        	}
    	};

    	fetchData();
	}, [props.pageNo, props.filterToggle]);



  return (
  
   
      <table className="table rounded-3xl">
        <thead className="bg-[#5799FD] sticky top-0">
          <tr className="min-w-full h-12 text-[10px] md:text-sm text-left bg-[#5799FD] text-white">
            {/* <th className="text-center">Sl. No</th> */}
            <th className="text-center">Date</th>
            <th className="text-center">Title</th>
            <th className="text-center">Body</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody className="my-10 text-black">
          {
            filterState.blogsData.map((blog, index) => (
            <tr 
              key={index + 1}
              className='text-[10px] md:text-xs border-b-[1px] border-[#eeeeee]'
            >

              {/* <td>{index + 1}</td> */}
              <td className="text-center">{blog.date}</td>
              <td 
                title="View event details"
                className="text-center font-semibold cursor-pointer hover:text-[#5799FD] hover:scale-105"
                onClick={() => {
                  props.setBlogId(blog.id);
                  props.setIsViewBlog(true);
                }}
              >
                { blog.blog_name.length > 30 ? blog.blog_name.substring(0,30) : blog.blog_name }
              </td>

              <td className="text-center">{ blog.blog_description.length > 50 ? blog.blog_description.substring(0,50) : blog.blog_description }</td>

              {/* <td className="text-center">{event.place}</td> */}
              {/* <td className="text-center">{event.event_time}</td> */}
              {/* <td className="text-center">{event.priority}</td> */}
              <td className="text-center" title="Edit event">
                <button onClick={() => {
                  props.setBlogId(blog.id);
                  props.setEditBlog(true);
                }}>
                  <TbEdit className='text-2xl text-blue-600 hover:bg-slate-200 hover:scale-110'/>
                </button>
              </td>
              <td className="text-center" title="Delete event">
                <button onClick={() => {
                  props.setBlogId(blog.id);
                  props.setIsDeleteBlog(true);
                }}>
                  <RiDeleteBin6Fill className='text-2xl text-red-600 hover:text-red-700 hover:bg-slate-200 hover:scale-110'/>
                </button>
              </td>
              <td className="text-center">
                <button 
                  title="View Blog details"
                  className='w-28 h-8 bg-[#5799FD] text-white rounded-xl hover:scale-105'
                  onClick={() => {
                    props.setBlogId(blog.id);
                    props.setIsViewBlog(true);
                  }}
                >
                  View Details
                </button>
              </td>
            </tr>

          ))}


          {/* <tr>
            <td className="w-[10%] text-center">1</td>
            <td className="w-[15%] text-center">2024/04/28</td>
            <td className="w-[30%] text-center">The Title</td>
            <td className="w-[45%] text-center">{blog.substring(0, 40)}</td>
            <td className="text-center" title="Edit event">
                <button 
                    // onClick={() => {
                    //   props.setEventId(event.id);
                    //   props.setEditEvent(true);
                    // }}
                >
                  <TbEdit className='text-2xl text-blue-600 hover:bg-slate-200 hover:scale-110'/>
                </button>
            </td>
            <td className="text-center" title="Delete event">
                <button 
                    // onClick={() => handleDelete(event.id)}
                >
                  <RiDeleteBin6Fill className='text-2xl text-red-600 hover:text-red-700 hover:bg-slate-200 hover:scale-110'/>
                </button>
            </td>
              <td className="text-center">
                <button 
                  title="View event details"
                  className='w-28 h-8 bg-[#5799FD] text-white rounded-xl hover:scale-105'
                //   onClick={() => {
                //     props.setEventId(event.id);
                //     props.setIsViewEvent(true);
                //   }}
                >
                  View Details
                </button>
              </td>
          </tr>
          <tr>
            <td className="w-[10%] text-center">1</td>
            <td className="w-[15%] text-center">2024/04/28</td>
            <td className="w-[30%] text-center">The Title</td>
            <td className="w-[45%] text-center">{blog.substring(0, 40)}</td>
            <td className="text-center" title="Edit event">
                <button 
                    // onClick={() => {
                    //   props.setEventId(event.id);
                    //   props.setEditEvent(true);
                    // }}
                >
                  <TbEdit className='text-2xl text-blue-600 hover:bg-slate-200 hover:scale-110'/>
                </button>
            </td>
            <td className="text-center" title="Delete event">
                <button 
                    // onClick={() => handleDelete(event.id)}
                >
                  <RiDeleteBin6Fill className='text-2xl text-red-600 hover:text-red-700 hover:bg-slate-200 hover:scale-110'/>
                </button>
            </td>
              <td className="text-center">
                <button 
                  title="View event details"
                  className='w-28 h-8 bg-[#5799FD] text-white rounded-xl hover:scale-105'
                //   onClick={() => {
                //     props.setEventId(event.id);
                //     props.setIsViewEvent(true);
                //   }}
                >
                  View Details
                </button>
              </td>
          </tr>

          <tr>
            <td className="w-[10%] text-center">1</td>
            <td className="w-[15%] text-center">2024/04/28</td>
            <td className="w-[30%] text-center">The Title</td>
            <td className="w-[45%] text-center">{blog.substring(0, 40)}</td>
            <td className="text-center" title="Edit event">
                <button 
                    // onClick={() => {
                    //   props.setEventId(event.id);
                    //   props.setEditEvent(true);
                    // }}
                >
                  <TbEdit className='text-2xl text-blue-600 hover:bg-slate-200 hover:scale-110'/>
                </button>
            </td>
            <td className="text-center" title="Delete event">
                <button 
                    // onClick={() => handleDelete(event.id)}
                >
                  <RiDeleteBin6Fill className='text-2xl text-red-600 hover:text-red-700 hover:bg-slate-200 hover:scale-110'/>
                </button>
            </td>
              <td className="text-center">
                <button 
                  title="View event details"
                  className='w-28 h-8 bg-[#5799FD] text-white rounded-xl hover:scale-105'
                //   onClick={() => {
                //     props.setEventId(event.id);
                //     props.setIsViewEvent(true);
                //   }}
                >
                  View Details
                </button>
              </td>
          </tr> */}
          
        </tbody>
      </table>
    

    



  );
}

export default BlogDetailsTable;
