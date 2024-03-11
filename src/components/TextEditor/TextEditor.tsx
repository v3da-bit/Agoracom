"use client";

import { useMemo, useRef } from 'react';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';

function TextEditor({ data, setData, className = '' }: any) {
  const quillRef = useRef();
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', "strike"],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['image', "link",],
        [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466'] }]
      ],
      //   handlers: {
      //     image: imageHandler
      //   }
    },
  }), [])
  console.log(modules);
  return (
    <div className="w-full">
      <ReactQuill theme="snow" className={`bg-white dark:bg-neutral-900 dark:text-white ${className}`} value={data} modules={modules} onChange={(e: any) => setData(e)} />
    </div>
  )
}

export default TextEditor