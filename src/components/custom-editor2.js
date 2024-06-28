// import React from "react";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import Editor from "ckeditor5-custom-build";

// const editorConfiguration = {
//   toolbar: [
//     // Font related options
//     "heading",
//     "bold",
//     "italic",
//     "fontSize",
//     "fontColor",
//     "fontBackgroundColor",
//     "|",
//     // List and indent/outdent options
//     "bulletedList",
//     "numberedList",
//     "outdent",
//     "indent",
//     "|",
//     // Block options
//     "blockQuote",
//     "codeBlock",
//     "code",
//     "|",
//     // Media options
//     "link",
//     "imageUpload",
//     "imageInsert",
//     "insertTable",
//     "mediaEmbed",
//     "|",
//     // Undo/redo options
//     "undo",
//     "redo",
//     "|",
//   ],
//   heading: {
//     options: [
//       { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
//       {
//         model: "heading1",
//         view: "h1",
//         title: "Heading 1",
//         class: "ck-heading_heading1",
//       },
//       {
//         model: "heading2",
//         view: "h2",
//         title: "Heading 2",
//         class: "ck-heading_heading2",
//       },
//       {
//         model: "heading3",
//         view: "h3",
//         title: "Heading 3",
//         class: "ck-heading_heading3",
//       },
//       {
//         model: "heading4",
//         view: "h4",
//         title: "Heading 4",
//         class: "ck-heading_heading4",
//       },
//       {
//         model: "heading5",
//         view: "h5",
//         title: "Heading 5",
//         class: "ck-heading_heading5",
//       },
//       {
//         model: "heading6",
//         view: "h6",
//         title: "Heading 6",
//         class: "ck-heading_heading6",
//       },
//     ],
//   },
//   table: {
//     contentToolbar: [
//       "tableColumn",
//       "tableRow",
//       "mergeTableCells",
//       "tableProperties",
//       "tableCellProperties",
//     ],
//     tableProperties: {
//       borderColors: [
//         {
//           color: "hsl(0, 0%, 0%)",
//           label: "Black",
//         },
//         {
//           color: "hsl(0, 0%, 30%)",
//           label: "Dim grey",
//         },
//         {
//           color: "hsl(0, 0%, 60%)",
//           label: "Grey",
//         },
//         {
//           color: "hsl(0, 0%, 90%)",
//           label: "Light grey",
//         },
//         {
//           color: "hsl(0, 0%, 100%)",
//           label: "White",
//           hasBorder: true,
//         },
//       ],
//       backgroundColors: [
//         {
//           color: "hsl(0, 75%, 60%)",
//           label: "Red",
//         },
//         {
//           color: "hsl(30, 75%, 60%)",
//           label: "Orange",
//         },
//         {
//           color: "hsl(60, 75%, 60%)",
//           label: "Yellow",
//         },
//         {
//           color: "hsl(90, 75%, 60%)",
//           label: "Light green",
//         },
//         {
//           color: "hsl(120, 75%, 60%)",
//           label: "Green",
//         },
//       ],
//     },
//     tableCellProperties: {
//       borderColors: [
//         {
//           color: "hsl(0, 0%, 0%)",
//           label: "Black",
//         },
//         {
//           color: "hsl(0, 0%, 30%)",
//           label: "Dim grey",
//         },
//         {
//           color: "hsl(0, 0%, 60%)",
//           label: "Grey",
//         },
//         {
//           color: "hsl(0, 0%, 90%)",
//           label: "Light grey",
//         },
//         {
//           color: "hsl(0, 0%, 100%)",
//           label: "White",
//           hasBorder: true,
//         },
//       ],
//       backgroundColors: [
//         {
//           color: "hsl(0, 75%, 60%)",
//           label: "Red",
//         },
//         {
//           color: "hsl(30, 75%, 60%)",
//           label: "Orange",
//         },
//         {
//           color: "hsl(60, 75%, 60%)",
//           label: "Yellow",
//         },
//         {
//           color: "hsl(90, 75%, 60%)",
//           label: "Light green",
//         },
//         {
//           color: "hsl(120, 75%, 60%)",
//           label: "Green",
//         },
//       ],
//     },
//   },
//   language: "en",
//   outputType: "html",
// };
// const config = {
//   ...editorConfiguration,
//   removePlugins: ["Title"],
// };

// function CustomEditor({ setFieldValue }) {
//   return (
//     <CKEditor
//       editor={Editor}
//       config={config}
//       onChange={(event, editor) => {
//         const data = editor.getData();
//         setFieldValue("content", data);
//       }}
//     />
//   );
// }

// export default CustomEditor;
