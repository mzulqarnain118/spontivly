import React from 'react';
import { useParams } from 'react-router-dom';

interface PdfViewerProps {
  url?: string;
}

const PdfViewer: React.FC<PdfViewerProps> = () => {
  const { url } = useParams();

  console.log("🚀 ~ file: PdfViewer.tsx:11 ~ url:", url)


  return (
    <div>
      <iframe title="PDF Viewer" src={url} style={{ width: '100%', height: '100vh', border: 'none' }} />
    </div>
  );
};

export {PdfViewer};
