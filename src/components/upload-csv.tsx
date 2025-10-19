import { useState, ChangeEvent } from 'react';
import '../styles/upload-csv.css';
import { uploadMeterReaedings } from '../infrastructure/meterReadingService';

function UploadCSV() {

  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');
  const [responseData, setResponseData] = useState<{ success: number; failed: number } | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file first.');
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await uploadMeterReaedings(formData);
      setMessage('File uploaded successfully!');
      setResponseData(response);
    } catch (error) {
      setMessage('Failed to upload file.');
      setResponseData(null);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>Upload Meter Readings</h1>
      <input data-testid="inputCsv" type="file" accept=".csv" onChange={handleFileChange} />
      <button data-testid="uploadButton" onClick={handleUpload} disabled={isUploading} className={isUploading ? 'uploading' : ''}>
        {isUploading ? 'Uploading...' : 'Upload'}
      </button>
      {message && <p data-testid="message">{message}</p>}
      {responseData && (
        <div>
          <p>Success: {responseData.success}</p>
          <p>Failed: {responseData.failed}</p>
        </div>
      )}
    </div>
  );
};

export default UploadCSV;