// src/Components/admin/CandidateManagement.jsx
import React, { useState } from 'react';
import DashboardHeader from '../../components/admin/DashboardHeader';
import CandidateTable from '../../Components/admin/CandidateTable';
import CreateCandidateForm from '../../Components/admin/CandidateForm';
import { CirclePlus } from 'lucide-react';

const CandidateManagement = () => {
  // Sample data - replace with your actual data source
  const [candidates, setCandidates] = useState([
    { 
      username: 'username1', 
      lastName: 'Gonzales', 
      firstName: 'Joshua', 
      partyList: 'takbong bayan', 
      department: 'CCIS', 
      position: 'PRESIDENT' 
    },
    { 
      username: 'username2', 
      lastName: 'Villanueva', 
      firstName: 'Patricia', 
      partyList: 'balik alindog', 
      department: 'CON', 
      position: 'PIO' 
    },
  ]);

  const [activeTab, setActiveTab] = useState('table'); // 'table' or 'form'

  const addCandidate = (newCandidate) => {
    setCandidates([...candidates, newCandidate]);
    setActiveTab('table'); // Switch back to table view after adding
  };

  return (
    <div className="flex flex-col h-full max-h-full overflow-hidden p-4">
      <div className="flex-none mb-2">
        <DashboardHeader title="Candidate Management" />
      </div>
      
      {/* Tab Navigation - Full Width */}
      <div className="flex-none flex w-full border-b border-gray-300 mb-2">
        <button
          className={`flex-1 py-2 px-4 font-medium ${
            activeTab === 'table' 
              ? 'text-[#38438c] border-b-2 border-[#38438c]' 
              : 'text-gray-500 hover:text-[#38438c]'
          }`}
          onClick={() => setActiveTab('table')}
        >
          Candidate List
        </button>
        <button
          className={`flex-1 py-2 px-4 font-medium flex items-center justify-center ${
            activeTab === 'form' 
              ? 'text-[#38438c] border-b-2 border-[#38438c]' 
              : 'text-gray-500 hover:text-[#38438c]'
          }`}
          onClick={() => setActiveTab('form')}
        >
          <CirclePlus size={18} className="mr-2" />
          Add Candidate
        </button>
      </div>
      
      {/* Content Area - Fixed Height */}
      <div className="flex-grow overflow-hidden">
        {activeTab === 'table' ? (
          <div className="h-full overflow-auto pb-2">
            <CandidateTable candidates={candidates} />
          </div>
        ) : (
          <div className="h-full overflow-auto pb-2">
            <CreateCandidateForm onAddCandidate={addCandidate} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateManagement;