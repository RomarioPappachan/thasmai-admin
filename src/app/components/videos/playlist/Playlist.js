"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";

function Playlist(props) {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/superadmin/get-video`
        );
        console.log(response, "playlists");
        setPlaylists(response.data.videos);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      return;
    };
  }, [props.renderPlaylistToggle]);

  return (

    <>
      {
        playlists[0] ? (
          playlists.map((item, index) => {
            return(
              <div key={index}>

                <div className="w-full h-15 mt-8 bg-[#495F85] flex">
                  <div className="w-[60%] h-full p-2 flex text-white">
                    <img src={ item.playList_image } className="w-11 h-11 rounded-full object-cover" />
                    <div className="ps-2 flex justify-center items-center">
                      <p>{ item.playList_heading }</p>
                    </div>
                  </div>
                      
                  <div className="w-[40%] h-full p-1 text-white flex  items-center justify-evenly ">
                    <RiDeleteBin6Line className="text-2xl cursor-pointer hover:text-red-500"
                        onClick={() => {
                         props.setSelectedPlaylistId(item.id);
                         props.setIsDeletePlaylistPopup(true)

   
                       }}
                    />
                    {/* <MdOutlineEdit className="text-2xl cursor-pointer hover:text-blue-500" /> */}
                    <button
                      className="w-[150px] h-10 ms-8 mt-2 bg-[#6EA5FF] text-white rounded-2xl hover:scale-105 hover:bg-[#629bf7]"
                      onClick={() => {
                        props.setSelectedPlaylistId(item.id);
                        props.setSelectedPlaylistData({
                          head : item.playList_heading,
                          category : item.category,
                          videoArray : item.video
                        })
                        props.setAddVideoPopUp(true);
                      }}
                    >
                      + Add Video
                    </button>
                  </div>
                </div>
                    
                <div className="w-full h-full">
                  <table className="w-full h-full">
                    <thead className="w-full h-12 bg-[#C5D8FF] text-black ">
                      <tr >
                        <th className="w-[10%] text-start ps-2">Sl No.</th>
                        <th className="w-[20%] text-start">Video Heading</th>
                        <th className="w-[50%] text-start">Video Url</th>
                        <th className="w-[10%] text-start">Delete</th>
                        <th className="w-[10%] text-start">Edit</th>
                      </tr>
                    </thead>
                    <tbody className="w-full h-14 bg-[#F9F9FF] border-b-2 border-[#C1C6D4] text-black">
                      {
                        item.video[0] && 
                        item.video.map((vid, ind) => {
                          return(
                            <tr className="text-xs py-2 border-b-2 border-gray-300">
                              <td className="ps-2">{ ind + 1}</td>
                              <td>{ vid.video_heading }</td>

                              <td className='text-[#7698ef] hover:text-[#005DB8]'>
                                            <a href={ vid.video_link } target="_blank">{ vid.video_link }</a>
                              </td>

                              <td>
                                <RiDeleteBin6Line className="text-2xl cursor-pointer hover:text-red-500"
                                  onClick={() => {
                                    props.setSelectedPlaylistId(item.id);
                                    props.setSelectedPlaylistData({
                                      head : item.playList_heading,
                                      category : item.category,
                                      videoArray : item.video,
                                      index : ind
                                    })
                                    props.setIsDeleteVideoPopup(true)
                                  }}
                                />
                              </td>
                              <td>
                                <MdOutlineEdit className="text-2xl cursor-pointer hover:text-blue-500"
                                  onClick={() => {
                                    props.setSelectedPlaylistId(item.id);
                                    props.setSelectedPlaylistData({
                                      head : item.playList_heading,
                                      category : item.category,
                                      videoArray : item.video,
                                      index : ind
                                    })
                                    props.setIsEditVideoPopup(true)
                                    
                                  }}
                                />
                              </td>
                            </tr>
                          );
                        })

                      }
                    </tbody>
                  </table>
                </div>

              </div>
            )
          })
        ) : (
          <div>No playlists</div>
        )
      }
    </>

    
  );
}

export default Playlist;
