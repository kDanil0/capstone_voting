// src/Components/admin/CreateCandidateForm.jsx
import React, { useState } from 'react';

const CreateCandidateForm = ({ onAddCandidate }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    department: '',
    position: '',
    partyList: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCandidate({
      ...formData,
      // Add any additional processing here
    });
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      department: '',
      position: '',
      partyList: ''
    });
  };

  return (
    <div className="border border-gray-300 rounded">
      <div className="bg-[#38438c] text-white py-3 px-4 text-xl font-climate tracking-widest uppercase">
        CREATE CANDIDATE ACCOUNT
      </div>
      
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-[#38438c] font-bold font-assistant text-xl uppercase mb-2">
                USERNAME
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
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
                PASSWORD
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-blue-400 rounded p-2"
                required
              />
            </div>
          </div>
          
          {/* Hidden fields for department, position, and partyList */}
          <input type="hidden" name="department" value={formData.department} />
          <input type="hidden" name="position" value={formData.position} />
          <input type="hidden" name="partyList" value={formData.partyList} />
          
          <button 
            type="submit"
            className="mt-4 bg-[#38438c] text-white px-4 py-2 rounded-md hover:bg-[#2d3470] transition-colors text-sm font-medium"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCandidateForm;