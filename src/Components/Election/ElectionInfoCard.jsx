import React from 'react';

const ElectionInfoCard = ({ electionData }) => {
  return (
    <div className="bg-gray-100 rounded-lg p-6 h-full">
      <h2 className="text-[#3F4B8C] font-climate text-xl mb-4">ELECTION INFORMATION</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-gray-700 font-assistant">Department:</div>
        <div className="text-right font-assistant font-semibold">{electionData.department}</div>
        
        <div className="text-gray-700 font-assistant">Status:</div>
        <div className="text-right">
          <span className="bg-[#3F4B8C] text-white px-3 py-1 rounded-full font-assistant">
            {electionData.status}
          </span>
        </div>
        
        <div className="text-gray-700 font-assistant">Campaign Period:</div>
        <div className="text-right font-assistant font-semibold">
          {electionData.campaignPeriod.start} - {electionData.campaignPeriod.end}
        </div>
        
        <div className="text-gray-700 font-assistant">Voting Period:</div>
        <div className="text-right font-assistant font-semibold">
          {electionData.votingPeriod.start} - {electionData.votingPeriod.end}
        </div>
      </div>
    </div>
  );
};

export default ElectionInfoCard; 