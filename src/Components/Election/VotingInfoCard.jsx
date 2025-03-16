import React from 'react';

const VotingInfoCard = ({ hasVoted, onVoteClick, electionId, voteSummary = [] }) => {
  return (
    <div className="bg-gray-100 rounded-lg p-6 h-full flex flex-col overflow-hidden">
      <h2 className="text-[#3F4B8C] font-climate text-xl mb-4">VOTING INFORMATION</h2>
      
      {hasVoted ? (
        <div className="flex flex-col h-full overflow-hidden">
          <div className="flex items-center mb-4">
            <h3 className="text-[#3F4B8C] font-assistant text-xl font-bold mr-2">
              YOU HAVE ALREADY VOTED IN THIS ELECTION
            </h3>
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          <p className="text-gray-700 font-assistant font-semibold mb-3">Your Vote Summary:</p>
          
          <div className="overflow-y-auto flex-grow vote-summary-container pr-2">
            <div className="space-y-2">
              {voteSummary.map((vote, index) => (
                <div key={index} className="bg-gray-300 p-3 rounded">
                  <p className="text-gray-600 font-assistant text-sm">{vote.position}:</p>
                  <p className="font-assistant font-semibold">{vote.candidate}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="w-32 h-32 border-4 border-gray-300 rounded-full flex items-center justify-center mb-4">
            {/* This would be a progress circle in a real implementation */}
          </div>
          
          <h3 className="text-[#3F4B8C] font-assistant text-xl font-bold mb-2">
            You haven't voted in this election yet
          </h3>
          
          <p className="text-gray-600 font-assistant text-center mb-4">
            Cast your vote for each position to participate in this election
          </p>
          
          <button 
            onClick={onVoteClick}
            className="bg-[#3F4B8C] text-white font-assistant py-3 px-6 rounded-md flex items-center"
          >
            Vote Now
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}

      <style jsx>{`
        .vote-summary-container::-webkit-scrollbar {
          width: 6px;
        }
        .vote-summary-container::-webkit-scrollbar-thumb {
          background-color: #3F4B8C;
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
};

export default VotingInfoCard; 