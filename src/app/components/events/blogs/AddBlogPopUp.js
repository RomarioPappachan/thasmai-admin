// "use client"

// import React, { useState } from 'react';
// import { BiCloudUpload } from "react-icons/bi";
// import axios from 'axios';
// import moment from 'moment';
// import { toast } from 'react-hot-toast'

// function AddBlogPopUp(props) {

//   const [previewImage, setPreviewImage] = useState();

//   const [blogData, setBlogData] = useState({
//     blog_name: "",
//     blog_description: "",  
//     // date: "",
//     image: null
//   });

//   console.log(blogData);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setBlogData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

  
//   const uploadBlogImage = (event) => {
//     const file = event.target.files[0];
//     setBlogData((prevValue) => ({
//       ...prevValue,
//       image: file
//     }));

//     setPreviewImage(URL.createObjectURL(file));

//   };

//   const handleSubmit = async (e) => {

//     e.preventDefault();
//     const { blog_name, blog_description, image } = blogData;

//     if (blog_name && blog_description && image ) {
//       const date = new Date();
//       const year = date.getFullYear();
//       const month = String(date.getMonth() + 1).padStart(2, '0');
//       const day = String(date.getDate()).padStart(2, '0');
    
//       const formattedDate = `${year}-${month}-${day}`;
//       // console.log(formattedDate);


//       const formData = new FormData();

//       formData.append('blog_name', blog_name);
//       formData.append('blog_description', blog_description);
//       formData.append('date', formattedDate);
//       formData.append('image', image);

//       try {

//         const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/add-blog`, formData);
//         console.log('Success:', response);
//         // alert(response.data.message);
//         toast.success(response.data.message);
//         window.location = "/admin/message/blogs";
//         props.setAddBlogStatus(false);

//       } catch (error) {
//         // console.error('Error uploading event:', error);
//         // Log the error to the console
//         // alert("Error uploading event. Please try again."); // Optionally, inform the user about the error
//         toast.error("Error uploading event. Please try again.");
//       }
      
//     } else {
//       toast("Enter the required information📌📍");
//     }
//   };


//   return (
//     <div className="w-[100vw] h-[100vh] bg-[#000000af] absolute left-0 top-0 flex justify-center items-center">
//       <div className='w-[1000px] h-[550px] bg-[#D9D9D9] rounded'>
//         <div className='w-full h-[10%] px-10 bg-[#5799fd] rounded-t flex items-center justify-between'>
//           <h1 className='text-xl text-white font-bold'>Add New Blogs</h1>
//           <button
//             className='w-8 h-8 rounded bg-blue-600 text-white hover:bg-white hover:text-black'
//             onClick={() => {
//               props.setAddBlogStatus(false);
//             }}
//           >X</button>
//         </div>

//         <div className='w-full h-[90%] px-20 rounded-b'>
//           <form className='w-full h-full'>
//             <div className='w-full h-[15%] flex justify-between items-center'>
//               <input
//                 className='w-full h-[40px] px-2 bg-white text-black rounded border-[2px] border-[rgba(0,0,0,0.36)]'
//                 type="text"
//                 placeholder="Headline"
//                 name="blog_name"
//                 value={blogData.blog_name}
//                 onChange={handleChange}
//               />
              
//             </div>
            
//             <div className='w-full h-[40%]'>
//               <textarea
//                 className="w-full h-full p-2 bg-white text-black rounded border-[2px] border-[rgba(0,0,0,0.36)]"
//                 name="blog_description"
//                 value={blogData.blog_description}
//                 onChange={handleChange}
//                 cols="30"
//                 rows="10"
//                 placeholder="Write the blog......"
//               ></textarea>
//             </div>
//             <div className='w-full h-[40%] py-6 rounded relative'>
//               <div className="w-[35%] h-full rounded flex justify-center items-center bg-[#999393]">
//                 <label className="w-full h-full relative" htmlFor="image">

//                   {
//                     blogData.image ? (
//                             <>
//                               <img className="w-full h-full object-contain" src = { previewImage } alt="Blog image"/>
//                               <span className="w-full h-full hover:text-lg hover:text-white  hover:bg-[#00000048] absolute top-0 left-0 flex flex-col items-center justify-center"  role="button"><BiCloudUpload className='text-3xl'/> Edit Image</span>
//                             </>
//                     ) : (
//                       <span className="w-full h-full text-lg flex flex-col items-center justify-center" role="button"><BiCloudUpload className='text-3xl' /> Upload Image</span>
//                     )
//                   }
//                   <input
//                     type="file"
//                     className=""
//                     id="image"
//                     name="image"
//                     accept="image/*"
//                     hidden
//                     onChange={uploadBlogImage}
//                   />
//                 </label>
//               </div>
//               <button
//                 className="w-[120px] h-[40px] mb-6 bg-[#ff8710] hover:bg-[#ff8810d1] text-white font-semibold rounded absolute bottom-0 right-0"
//                 onClick={handleSubmit}
//               >
//                 Save
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddBlogPopUp;





"use client"

import React, { useState } from 'react';
import { BiCloudUpload } from "react-icons/bi";
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-hot-toast'
import useImageCompressor from '../../ImageCompression/useImageCompressor'; 

function AddBlogPopUp(props) {

  const [previewImage, setPreviewImage] = useState();
  const { compressImage } = useImageCompressor(); 

  const [blogData, setBlogData] = useState({
    blog_name: "",
    blog_description: "",
    image: null
  });

  console.log(blogData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const uploadBlogImage = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const compressedFile = await compressImage(file);
      setBlogData((prevValue) => ({
        ...prevValue,
        image: compressedFile
      }));
      setPreviewImage(URL.createObjectURL(compressedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { blog_name, blog_description, image } = blogData;

    if (blog_name && blog_description && image) {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      const formattedDate = `${year}-${month}-${day}`;

      const formData = new FormData();
      formData.append('blog_name', blog_name);
      formData.append('blog_description', blog_description);
      formData.append('date', formattedDate);
      formData.append('image', image);

      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/add-blog`, formData);
        console.log('Success:', response);
        toast.success(response.data.message);
        props.setFilterToggle(prevValue => !prevValue);
        props.setAddBlogStatus(false);
      } catch (error) {
        console.error('Error uploading blog:', error);
        toast.error("Error uploading blog. Please try again.");
      }
    } else {
      toast("Enter the required information📌📍");
    }
  };

  return (
    <div className="w-screen min-h-screen md:h-screen px-2 py-10 md:p-0 bg-[#000000af] absolute left-0 top-0 flex justify-center items-center">
      <div className='w-full md:w-[1000px] md:h-[550px] bg-[#D9D9D9] rounded'>
      
        <div className='w-full h-16 md:h-[10%] px-5 md:px-10 bg-[#5799fd] rounded-t flex items-center justify-between'>
          <h1 className='text-xl text-white font-bold'>Add New Blogs</h1>
          <button
            className='w-8 h-8 rounded bg-blue-600 text-white hover:bg-white hover:text-black'
            onClick={() => {
              props.setAddBlogStatus(false);
            }}
          >X</button>
        </div>

        <div className='w-full md:h-[90%] px-2 md:px-20 py-5 md:py-0 rounded-b'>
          <form className='w-full h-full'>
            <div className='w-full h-[15%] flex justify-between items-center'>
              <input
                className='w-full h-[40px] px-2 bg-white text-black rounded border-[2px] border-[rgba(0,0,0,0.36)]'
                type="text"
                placeholder="Headline"
                name="blog_name"
                value={blogData.blog_name}
                onChange={handleChange}
              />
            </div>

            <div className='w-full h-[40%] mt-4 md:mt-0'>
              <textarea
                className="w-full h-full p-2 bg-white text-black rounded border-[2px] border-[rgba(0,0,0,0.36)]"
                name="blog_description"
                value={blogData.blog_description}
                onChange={handleChange}
                cols="30"
                rows="10"
                placeholder="Write the blog......"
              ></textarea>
            </div>
            <div className='w-full md:h-[40%] mb-2 md:mb-0 md:py-6 rounded relative'>
              <div className="w-full md:w-[35%]  h-[25vh] md:h-full mt-4 md:mt-0 rounded flex justify-center items-center bg-[#999393]">
                <label className="w-full h-full relative" htmlFor="image">
                  {
                    blogData.image ? (
                      <>
                        <img className="w-full h-full object-contain" src={previewImage} alt="Blog image" />
                        <span className="w-full h-full hover:text-lg hover:text-white  hover:bg-[#00000048] absolute top-0 left-0 flex flex-col items-center justify-center" role="button"><BiCloudUpload className='text-3xl' /> Edit Image</span>
                      </>
                    ) : (
                      <span className="w-full h-full text-lg flex flex-col items-center justify-center" role="button"><BiCloudUpload className='text-3xl' /> Upload Image</span>
                    )
                  }
                  <input
                    type="file"
                    className=""
                    id="image"
                    name="image"
                    accept="image/*"
                    hidden
                    onChange={uploadBlogImage}
                  />
                </label>
              </div>
              <button
                className="w-full md:w-[120px] h-[40px] mt-4 md:mt-0 mb-6 bg-[#ff8710] hover:bg-[#ff8810d1] text-white font-semibold rounded md:absolute bottom-0 right-0"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBlogPopUp;

