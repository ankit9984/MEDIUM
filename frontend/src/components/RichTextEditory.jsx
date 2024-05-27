// Import necessary libraries
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the Quill styles

// Define the component
const RichTextEditor = () => {
  // Define state to hold the editor content
  const [content, setContent] = useState('');

  // Handle content changes
  const handleContentChange = (value) => {
    setContent(value);
  };

  return (
    <div>
      <ReactQuill 
        value={content}
        onChange={handleContentChange}
        modules={RichTextEditor.modules}
        formats={RichTextEditor.formats}
      />
    </div>
  );
};

// Define modules and formats
RichTextEditor.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']                                        
  ],
};

RichTextEditor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
];

export default RichTextEditor;
