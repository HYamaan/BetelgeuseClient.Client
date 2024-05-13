import React, {useEffect, useState} from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles


const QuillEditor = dynamic(() => import('react-quill'), {ssr: false});


export default function WYSIWYG(props) {
    const {className, text, setText} = props;

    const quillModules = {
        toolbar: [
            [{header: [1, 2, 3, false]}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{list: 'ordered'}, {list: 'bullet'}],
            ['link', 'image'],
            [{align: []}],
            [{color: []}],
            ['code-block'],
            ['clean'],
        ],
    };


    const quillFormats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'link',
        'image',
        'align',
        'color',
        'code-block',
    ];


    const handleEditorChange = (newContent) => {
        setText(newContent);
    };


    return <div className={className}>
        <QuillEditor
            value={text}
            onChange={handleEditorChange}
            modules={quillModules}
            formats={quillFormats}
            className="w-full h-max mt-2 bg-white"
            defaultValue={text}
        />
    </div>


}
