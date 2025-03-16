import React, { useState, useRef } from 'react';

const StudentForm = ({ onAddStudent, onBatchUpload }) => {
  const [formData, setFormData] = useState({
    studentNumber: '',
    firstName: '',
    lastName: '',
    department: '',
    token: ''
  });
  
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Generate a random token or this could come from your backend
    const generatedToken = Math.random().toString(36).substring(2, 10).toUpperCase();
    
    onAddStudent({
      ...formData,
      token: generatedToken
    });
    
    // Reset form
    setFormData({
      studentNumber: '',
      firstName: '',
      lastName: '',
      department: '',
      token: ''
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith('.csv')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const csvData = event.target.result;
        // Process CSV data and pass to parent component
        onBatchUpload(csvData);
      };
      reader.readAsText(file);
    } else {
      alert('Please upload a valid CSV file');
    }
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="border border-gray-300 rounded">
      <div className="bg-[#38438c] text-white py-3 px-4 text-xl font-climate tracking-widest uppercase">
        ADD STUDENT
      </div>
      
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-[#38438c] font-bold font-assistant text-xl uppercase mb-2">
                STUDENT NUMBER
              </label>
              <input
                type="text"
                name="studentNumber"
                value={formData.studentNumber}
                onChange={handleChange}
                className="w-full border border-blue-400 rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block text-[#38438c] font-bold font-assistant text-xl uppercase mb-2">
                FIRST NAME
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full border border-blue-400 rounded p-2"
                required
              />
            </div>
            
            <div>
              <label className="block text-[#38438c] font-bold font-assistant text-xl uppercase mb-2">
                LAST NAME
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full border border-blue-400 rounded p-2"
                required
              />
            </div>

            <div>
              <label className="block text-[#38438c] font-bold font-assistant text-xl uppercase mb-2">
                DEPARTMENT
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full border border-blue-400 rounded p-2 bg-white"
                required
              >
                <option value="" disabled>Select Department</option>
                <option value="CCIS">CCIS</option>
                <option value="COE">COE</option>
                <option value="CON">CON</option>
                <option value="COC">COC</option>
                <option value="CHTM">CHTM</option>
                <option value="COB">COB</option>
                <option value="CAS">CAS</option>
              </select>
            </div>
          </div>
          
          <button 
            type="submit"
            className="mt-4 bg-[#38438c] text-white px-4 py-2 rounded-md hover:bg-[#2d3470] transition-colors text-sm font-medium"
          >
            Add Student
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-gray-300">
          <h3 className="text-[#38438c] font-bold font-assistant text-lg mb-4">BATCH UPLOAD STUDENTS</h3>
          
          <div className="flex flex-col">
            <div className="flex items-center mb-2">
              <span className="text-sm font-medium text-gray-700 mr-2">Upload CSV File:</span>
              <span className="text-sm text-gray-500">(CSV files only)</span>
            </div>
            
            <input
              type="file"
              accept=".csv"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-medium
                file:bg-[#38438c] file:text-white
                hover:file:bg-[#2d3470]"
            />
            
            <p className="mt-2 text-sm text-gray-500">
              CSV format: student_number,first_name,last_name,department
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentForm; 