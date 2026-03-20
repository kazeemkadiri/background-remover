import React, { useState, useRef, useEffect } from 'react';
import { Upload, File, X, CheckCircle } from 'lucide-react'; // Optional: for icons
import useApiHandler from '../../hooks/useApiHandler';

const FileUploader = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<null | File>(null);
  const fileInputRef = useRef(null);

  const abortController = new AbortController(); // For potential upload cancellation
  const { uploadImage } = useApiHandler();

    // Commence file upload process (e.g., send to backend)
    useEffect(() => {
        if (file) {
            console.log("File ready for upload:", file);

            doFileUpload();
        }
    }, [file]);

    const doFileUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('image', file as Blob); // Append the file to the form data

            const response = await uploadImage(formData, abortController.signal);
            
            if (!response.status || response.status >= 400) {
                throw new Error(`Upload failed: ${response.statusText}`);
            }

            console.log("Upload successful, server response:", response.data);
        } catch (error) {
            console.error("Error during file upload:", error);
        }
    }

  const handleDragOver = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  }

  const handleDrop = (e: { preventDefault: () => void; dataTransfer: { files: any[]; } } | any) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  };

  const handleFileSelect = (e: { target: { files: any[]; }} | any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) setFile(selectedFile);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-6">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => {
            if(fileInputRef.current){
                (fileInputRef.current as HTMLInputElement).click();
            }
        }}
        className={`
          relative w-full h-64 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-200
          ${isDragging 
            ? 'border-blue-500 bg-blue-50 scale-[1.02]' 
            : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400'}
        `}
      >
        <input 
          type="file" 
          className="hidden" 
          ref={fileInputRef} 
          onChange={handleFileSelect} 
        />

        {!file ? (
          <div className="flex flex-col items-center text-center p-4">
            <div className="p-3 mb-4 bg-white rounded-full shadow-sm">
              <Upload className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-lg font-semibold text-gray-700">Click or Drag to upload</p>
            <p className="text-sm text-gray-500 mt-1">PNG, JPG (max. 10MB)</p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center p-4">
            <div className="p-3 mb-4 bg-green-100 rounded-full">
              <File className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
              {file.name}
            </p>
            <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
            <button 
              onClick={(e) => { e.stopPropagation(); setFile(null); }}
              className="mt-4 text-xs font-bold text-red-500 hover:text-red-700 uppercase tracking-wider"
            >
              Remove File
            </button>
          </div>
        )}
      </div>
      
      {file && (
        <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2">
          Upload to Cloud
        </button>
      )}
    </div>
  );
};

export default FileUploader;