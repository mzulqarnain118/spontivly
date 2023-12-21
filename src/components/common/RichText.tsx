import React, {  useRef } from "react";
import JoditEditor from "jodit-react";
import { commonStyles } from '../../styles/commonStyles'

export function RichText({ value, onBlur ,className, placeholder, ...others }:any) {
  const editor = useRef(null);
const classes = commonStyles()
  const config = {
    readonly: false,
    height: 400,
    className: className ?? classes.editor,
    placeholder: placeholder || 'Description',
    ...others,
    // toolbarAdaptive: false,
    buttons: [
      'source',
      '|',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      '|',
      'ul',
      'ol',
      '|',
      'indent',
      'outdent',
      '|',
      'font',
      'fontsize',
      '|',
      'table',
      '|',
      'align',
      'undo',
      'redo',
      '|',
      'selectall',
      'fullsize',
      '|',
      'copyformat',
      'hr',
      'symbol',
      'fullsize',
      'print',
      'about'
    ]
  }

  return (
    <>
      <JoditEditor
        ref={editor}
        value={value}
        config={config}
        onBlur={(newContent) => onBlur && onBlur(newContent)}

      />
    </>
  );
}
//!  FOR MORE INFO ABOUT THIS COMPONENT VISIT THIS LINK https://www.npmjs.com/package/jodit-react or
//! use CSK - EDITOR https://ckeditor.com/docs/ckeditor5/latest/installation/integrations/react.html
//TODO: CALL THIS COMPONENT IN THE PARENT COMPONENT
//   const handleBodyChange = (newContent) => {
//     setValues((old) => ({ ...old, ["request_body"]: newContent }));
//   };
//                     <RichText
//                       content={values.request_body}
//                       setContent={handleBodyChange}
//                     />;
