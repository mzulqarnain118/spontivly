import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import React, { useRef } from 'react'

export function RichText({ data, onReady, onChange, onFocus, value, onBlur, className, required, placeholder, ...others }: any) {
  const editorRef = useRef()

  return (
    <CKEditor
      editor={ClassicEditor}
      data={data}
      onReady={(editor) => {
        editorRef.current = editor
        if (onReady) onReady(editor)
      }}
      onChange={(newContent) => onChange && onChange(newContent)}
      onBlur={(newContent) => onBlur && onBlur(newContent)}
      onFocus={onFocus}
      required // Add the required attribute
    />
  )
}
//!  FOR MORE INFO ABOUT THIS COMPONENT VISIT THIS LINK https://www.npmjs.com/package/jodit-react or
//! use CSK - EDITOR https://ckeditor.com/docs/ckeditor5/latest/installation/integrations/react.html
