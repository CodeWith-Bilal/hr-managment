import React from "react";
import FileUpload from "@/components/fileUpload/FileUpload";

interface DocumentsProps {
  handleFileUpload: (file: File, field: string) => void;
}

const Documents: React.FC<DocumentsProps> = ({ handleFileUpload }) => {
  return (
    <div className="space-y-6 py-8 px-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <h3 className="text-gray-400 mb-2">Upload Appointment Letter</h3>
          <FileUpload
            label="Appointment Letter"
            onFileSelect={(file) => {
              console.log("📤 Uploading relivingLetter:", file.name);
              handleFileUpload(file, "appointmentLetter");
            }}
          />
        </div>
        <div>
          <h3 className="text-gray-400 mb-2">Upload Salary Slips</h3>
          <FileUpload
            label="Upload Salary Slips"
            onFileSelect={(file) => handleFileUpload(file, "salarySlip")}
          />
        </div>
        <div>
          <h3 className="text-gray-400 mb-2">Upload Relieving Letter</h3>
          <FileUpload
            label="Upload Relieving Letter"
            onFileSelect={(file) => handleFileUpload(file, "relivingLetter")}
          />
        </div>
        <div>
          <h3 className="text-gray-400 mb-2">Upload Experience Letter</h3>
          <FileUpload
            label="Upload Experience Letter"
            onFileSelect={(file) => handleFileUpload(file, "experienceLetter")}
          />
        </div>
      </div>
    </div>
  );
};

export default Documents;
