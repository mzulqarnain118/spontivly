import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import React from 'react'

export function RichText({ onChange, value, placeholder, ...others }: any) {
  const editorConfig = {
    placeholder: placeholder
  }

  return (
    <CKEditor
      editor={ClassicEditor}
      config={editorConfig} // Pass the editor configuration
      data={value}
      onReady={(editor: any) => {
        editor.editing.view.change((writer) => {
          writer.setStyle('height', '300px', editor.editing.view.document.getRoot())
        })
      }}
      onChange={(event, editor: any) => onChange(editor.getData())}
      {...others}
    />
  )
}
//!  FOR MORE INFO ABOUT THIS COMPONENT VISIT THIS LINK https://www.npmjs.com/package/jodit-react or
//! use CSK - EDITOR https://ckeditor.com/docs/ckeditor5/latest/installation/integrations/react.html
