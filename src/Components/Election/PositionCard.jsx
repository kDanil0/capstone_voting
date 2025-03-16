import React from 'react';

const PositionCard = ({ position }) => {
  return (
    <div className="bg-gray-100 rounded-lg p-4 border border-[#3F4B8C]">
      <h3 className="text-[#3F4B8C] font-climate text-xl mb-2">
        {position.title}
      </h3>
      <p className="text-gray-600 font-assistant text-sm mb-3">
        {position.candidates.length} candidates
      </p>
      
      <div className="space-y-3">
        {position.candidates.map(candidate => (
          <div key={candidate.id} className="flex items-center">
            <div className="w-8 h-8 bg-[#3F4B8C] rounded-full flex items-center justify-center text-white mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="font-assistant">{candidate.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PositionCard; 