import React from 'react';
import CandidateCard from './CandidateCard';

const PositionVoting = ({ position, selectedCandidateId, onSelectCandidate, onAbstain }) => {
  return (
    <>
      {/* Position Title and Instructions */}
      <div className="text-center mb-8">
        <h2 className="text-[#3F4B8C] font-climate text-3xl mb-2">{position.title}</h2>
        <p className="text-gray-600 font-assistant">{position.instruction}</p>
      </div>

      {/* Candidates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {position.candidates.map(candidate => (
          <CandidateCard 
            key={candidate.id}
            candidate={candidate}
            selected={selectedCandidateId === candidate.id}
            onSelect={onSelectCandidate}
          />
        ))}
      </div>

      {/* Abstain Button */}
      <div className="flex justify-center mb-8">
        <button 
          className={`py-3 px-6 rounded-md ${selectedCandidateId === 'abstain' ? 'bg-[#3F4B8C] text-white' : 'bg-gray-300 text-gray-700'}`}
          onClick={onAbstain}
        >
          Abstain from voting
        </button>
      </div>
    </>
  );
};

export default PositionVoting;
