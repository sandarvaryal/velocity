// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// import Quill from "quill";
// // @ts-ignore
// import ImageResize from "quill-image-resize-module-react";
// import { useRef } from "react";
// Quill.register("modules/imageResize", ImageResize);

// function SimpleEditor({ value, setValue }: { value: any; setValue: any }) {
//   const quillRef = useRef<ReactQuill | null>(null);
//   const imageHandler = () => {
//     const input = document.createElement("input");
//     input.setAttribute("type", "file");
//     input.setAttribute("accept", "image/*");
//     input.click();

//     input.onchange = async () => {
//       const file = input.files?.[0];
//       if (!file) return;

//       const formData = new FormData();
//       formData.append("myFile", file);

//       const response = await fetch(
//         `${import.meta.env.VITE_BACKEND_URL}/api/uploadImage`,
//         {
//           method: "POST",
//           body: formData,
//           credentials: "include",
//         }
//       );
//       const data = await response.json();
//       const url = data.url;

//       const editor = quillRef.current?.getEditor();
//       const range = editor?.getSelection();
//       if (range) {
//         editor?.insertEmbed(range.index, "image", url);
//       }
//     };
//   };

//   const modules = {
//     toolbar: [
//       ["bold", "italic", "underline"],
//       [{ header: [1, 2, 3, false] }],
//       [{ list: "ordered" }, { list: "bullet" }],
//       ["clean"],
//     ],
//   };

//   const formats = [
//     "bold",
//     "italic",
//     "underline",
//     "header",
//     "list",
//     "bullet",
//     "image",
//   ];

//   return (
//     <ReactQuill
//       value={value}
//       onChange={setValue}
//       theme="snow"
//       modules={modules}
//       formats={formats}
//       className="bg-white h-[30rem]"
//     />
//   );
// }

// export default SimpleEditor;

//eta

import { useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
// import axios from "axios";

// @ts-ignore
import ImageResize from "quill-image-resize-module-react";
Quill.register("modules/imageResize", ImageResize);

// interface SimpleEditorProps {
//   value: string;
//   setValue: (value: string) => void;
// }

const SimpleEditor = ({ value, setValue }: { value: any; setValue: any }) => {
  const quillRef = useRef<ReactQuill | null>(null);

  // const imageHandler = () => {
  //   const input = document.createElement("input");
  //   input.setAttribute("type", "file");
  //   input.setAttribute("accept", "image/*");
  //   input.click();

  //   input.onchange = async () => {
  //     const file = input.files?.[0];
  //     if (!file) return;

  //     const formData = new FormData();
  //     formData.append("myFile", file);

  //     try {
  //       const response = await axios.post(
  //         `${import.meta.env.VITE_BACKEND_URL}/api/uploadImage`,
  //         formData,
  //         {
  //           withCredentials: true,
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         }
  //       );

  //       const url = response.data.url;

  //       const editor = quillRef.current?.getEditor();
  //       const range = editor?.getSelection();

  //       if (range) {
  //         editor?.insertEmbed(range.index, "image", url);
  //       }
  //     } catch (err) {
  //       console.error("Image upload failed", err);
  //     }
  //   };
  // };

  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline"],
        [{ header: [1, 2, 3, false] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["image"],
        ["clean"],
      ],
      //   handlers: {
      //     image: imageHandler,
      //   },
    },
    imageResize: {},
  };

  //   const modules = {
  //     toolbar: {
  //       container: [["bold", "italic", "underline"], ["image"]],
  //     },
  //   };

  const formats = [
    "bold",
    "italic",
    "underline",
    "header",
    "list",
    "bullet",
    "image",
  ];

  return (
    <ReactQuill
      ref={quillRef}
      value={value}
      onChange={setValue}
      theme="snow"
      modules={modules}
      formats={formats}
      className="bg-white h-[60rem] ql-editor"
    />
  );
};

export default SimpleEditor;
