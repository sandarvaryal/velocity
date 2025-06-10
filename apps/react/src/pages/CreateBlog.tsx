// import { useMutation, useQuery } from "@tanstack/react-query";
// import SuperAdminProtectedWrap from "../hoc/SuperAdminProtectedWrap";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { FaBold, FaItalic, FaUndo, FaRedo, FaUnderline } from "react-icons/fa";

// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Underline from "@tiptap/extension-underline";
// import Image from "@tiptap/extension-image";
// import { useState } from "react";
// import reactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// import Quill from "quill";
// // import { ImageResize } from "quill-image-resize-module-react";
// // Quill.register("modules/imageResize", ImageResize);

// function unprotectedCreateBlog() {
//   const { mutate } = useMutation({
//     mutationFn: async (content: any) => {
//       const response = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/postBlog`,
//         content,
//         {
//           withCredentials: true,
//         }
//       );
//       return response.data;
//     },
//     onSuccess: (data: any) => {
//       toast.success(data.message);
//       navigate("/");
//     },
//     onError: (error: any) => {
//       toast.error(error.response?.data?.message);
//       console.error("Failed to create blog", error.response?.data?.message);
//     },
//   });

//   const navigate = useNavigate();

//   const editor: any = useEditor({
//     extensions: [StarterKit, Underline, Image],
//     content: "",
//   });

//   const [title, setTitle] = useState("");

//   const submitFunction = () => {
//     if (!editor) return;
//     const html = editor.getHTML();
//     const submitObj = {
//       title,
//       description: html,
//     };
//     mutate(submitObj);
//   };

//   const handleImageUpload = async (e: any) => {
//     const file = e.target.files[0];
//     if (!file || !editor) return;

//     const formData = new FormData();
//     formData.append("myFile", file);
//     const response = await axios.post(
//       `${import.meta.env.VITE_BACKEND_URL}/api/uploadImage`,
//       formData,
//       {
//         withCredentials: true,
//       }
//     );
//     const url = response.data.url;
//     console.log(url);

//     editor.chain().focus().setImage({ src: url }).run();
//   };

//   // function RichTextEditor() {
//   // const modules = {
//   //   toolbar: {
//   //     container: [
//   //       ["bold", "italic", "underline"],
//   //       [{ header: [1, 2, 3, false] }],
//   //       [{ list: "ordered" }, { list: "bullet" }],
//   //       ["image"],
//   //     ],

//   //   },
//   //   imageResize: {},
//   // };
//   return (
//     <>
//       <div className="flex flex-col gap-[3rem]">
//         {editor && (
//           <>
//             <div className="flex justify-center gap-[1rem] border-2 p-5 mt-5">
//               <button
//                 onClick={() => editor.chain().focus().toggleBold().run()}
//                 className={
//                   editor.isActive("bold")
//                     ? "border-black border-2 text-red-600 p-1 cursor-pointer"
//                     : "border-black border-2 p-1 cursor-pointer"
//                 }
//               >
//                 <FaBold />
//               </button>
//               <button
//                 onClick={() => editor.chain().focus().toggleItalic().run()}
//                 className={
//                   editor.isActive("italic")
//                     ? "border-black border-2 text-red-600 p-1 cursor-pointer"
//                     : "border-black border-2 p-1 cursor-pointer"
//                 }
//               >
//                 <FaItalic />
//               </button>
//               <button
//                 onClick={() => editor.chain().focus().toggleUnderline().run()}
//                 className={
//                   editor.isActive("underline")
//                     ? "border-black border-2 text-red-600 p-1 cursor-pointer"
//                     : "border-black border-2 p-1 cursor-pointer"
//                 }
//               >
//                 <FaUnderline />
//               </button>
//               <button
//                 onClick={() => editor.chain().focus().undo().run()}
//                 className="border-black border-2 p-1 cursor-pointer"
//               >
//                 <FaUndo />
//               </button>

//               <button
//                 onClick={() => editor.chain().focus().redo().run()}
//                 className="border-black border-2 p-1 cursor-pointer"
//               >
//                 <FaRedo />
//               </button>
//             </div>

//             {/* <input
//           className="border-2 block self-center px-[4rem] py-[1rem]  cursor-pointer"
//           type="file"
//           accept="image/*"
//           hidden
//           onChange={handleImageUpload}
//         /> */}
//             <label className="cursor-pointer border-2 rounded-md self-center px-[4rem] py-[1rem]">
//               Upload Image
//               <input
//                 type="file"
//                 accept="image/*"
//                 hidden
//                 onChange={handleImageUpload}
//               />
//             </label>

//             <div className="mx-[4rem]">
//               <span className="text-2xl font-extrabold">Title:</span>
//               <input
//                 type="text"
//                 className=" border-2 h-[3rem] w-full"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//               />
//             </div>
//             <div className=" mx-[4rem]">
//               <span className="text-2xl font-extrabold">Description:</span>
//               <EditorContent editor={editor} className="border-2 bg-red-100 " />
//             </div>
//           </>
//         )}
//         <button
//           className="mb-[10rem] border-2 self-center px-[1rem] cursor-pointer"
//           onClick={submitFunction}
//         >
//           Submit
//         </button>
//       </div>
//     </>
//   );
// }

// export const CreateBlog = SuperAdminProtectedWrap(unprotectedCreateBlog);

//eta bata

// import { useMutation } from "@tanstack/react-query";
import SuperAdminProtectedWrap from "../hoc/SuperAdminProtectedWrap";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

import { useState } from "react";

import "react-quill/dist/quill.snow.css";

import SimpleEditor from "../util/Editor";

function unprotectedCreateBlog() {
  const [content, setContent] = useState("");
  // const { mutate } = useMutation({
  //   mutationFn: async (content: any) => {
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_BACKEND_URL}/api/postBlog`,
  //       content,
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     return response.data;
  //   },
  //   onSuccess: (data: any) => {
  //     toast.success(data.message);
  //     navigate("/");
  //   },
  //   onError: (error: any) => {
  //     toast.error(error.response?.data?.message);
  //     console.error("Failed to create blog", error.response?.data?.message);
  //   },
  // });

  // const navigate = useNavigate();

  // const [title, setTitle] = useState("");

  // const submitFunction = () => {
  //   const submitObj = {
  //     title,
  //     description: content,
  //   };
  //   mutate(submitObj);
  // };

  // const handleImageUpload = async (e: any) => {
  //   const file = e.target.files[0];
  //   if (!file || !editor) return;

  //   const formData = new FormData();
  //   formData.append("myFile", file);
  //   const response = await axios.post(
  //     `${import.meta.env.VITE_BACKEND_URL}/api/uploadImage`,
  //     formData,
  //     {
  //       withCredentials: true,
  //     }
  //   );
  //   const url = response.data.url;
  //   console.log(url);

  //   editor.chain().focus().setImage({ src: url }).run();
  // };

  // const modules = {
  //   toolbar: {
  //     container: [
  //       ["bold", "italic", "underline"],
  //       [{ header: [1, 2, 3, false] }],
  //       [{ list: "ordered" }, { list: "bullet" }],
  //       ["image"],
  //     ],
  //   },
  //   imageResize: {},
  // };

  // const handleSubmit = () => {
  //   console.log(content);
  // };
  return (
    <div className="mb-[10rem]">
      <div className="p-6 m-[2rem]">
        <SimpleEditor value={content} setValue={setContent} />
      </div>
      <button
        // onClick={submitFunction}
        onClick={() => {}}
        className="mt-4 px-4 py-2 bg-black text-white rounded cursor-pointer"
      >
        Submit
      </button>
    </div>
  );
}

export const CreateBlog = SuperAdminProtectedWrap(unprotectedCreateBlog);
