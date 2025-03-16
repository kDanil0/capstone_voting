import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ElectionInfoCard from '../../Components/Election/ElectionInfoCard';
import VotingInfoCard from '../../Components/Election/VotingInfoCard';
import PositionCard from '../../Components/Election/PositionCard';

const ElectionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [electionData, setElectionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasVoted, setHasVoted] = useState(false);
  const [voteSummary, setVoteSummary] = useState([]);

  // Mock data - replace with API call
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      // Mock data based on the image
      setElectionData({
        id: id,
        title: "SUPREME STUDENT COUNCIL ELECTION 2023",
        department: "SSC",
        status: "Ongoing",
        campaignPeriod: { start: "Feb 25, 2025", end: "Mar 4, 2025" },
        votingPeriod: { start: "Mar 5, 2025", end: "Mar 8, 2025" },
        positions: [
          {
            id: 1,
            title: "SSC President",
            candidates: [
              { id: 1, name: "Mark Daniel Torres" },
              { id: 2, name: "Michael Angelo Cullera" },
              { id: 3, name: "Katherine Anne Balicao" }
            ]
          },
          {
            id: 2,
            title: "SSC Vice President",
            candidates: [
              { id: 4, name: "Jesus Brown" },
              { id: 5, name: "John Gabriel Dayrit" }
            ]
          },
          {
            id: 3,
            title: "SSC Secretary",
            candidates: [
              { id: 6, name: "Amy Withertaker" },
              { id: 7, name: "Ann Taylor" },
              { id: 8, name: "Joyce Cameron" }
            ]
          },
          {
            id: 4,
            title: "SSC Treasurer",
            candidates: [
              { id: 9, name: "John Myers" },
              { id: 10, name: "Arthur Nery" },
              { id: 11, name: "Paulo Velasquez" }
            ]
          },
          {
            id: 5,
            title: "SSC Auditor",
            candidates: [
              { id: 12, name: "Candidate 1" },
              { id: 13, name: "Candidate 2" }
            ]
          }
        ]
      });
      
      // Check if user has voted
      const userHasVoted = false; // For testing purposes
      setHasVoted(userHasVoted);
      
      if (userHasVoted) {
        setVoteSummary([
          { position: "SSC President", candidate: "Mark Daniel Torres" },
          { position: "SSC Vice President", candidate: "Jesus Brown" },
          { position: "SSC Secretary", candidate: "Ann Taylor" },
          { position: "SSC Treasurer", candidate: "Paulo Velasquez" },
          { position: "SSC Auditor", candidate: "Candidate 2" }
        ]);
      }
      
      setLoading(false);
    }, 500);
  }, [id]);

  const handleVoteNow = () => {
    navigate(`/election/${id}/vote`);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <>
      {/* Full-width header */}
      <div className="bg-gray-200 -mx-8 -mt-8 mb-5 pt-10 py-2 ">
        <h1 className="text-[#3F4B8C] font-climate text-4xl text-center tracking-wider">
          {electionData.title}
        </h1>
      </div>

      {/* Original content area - unchanged */}
      <div className="h-[calc(100vh-120px)] overflow-hidden">
        <div className="container mx-auto h-full px-4 pb-4">
          <div className="bg-white rounded-lg shadow-xl p-6 h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
              {/* Left Column */}
              <div className="h-full flex flex-col overflow-hidden">
                <div className="mb-4">
                  <ElectionInfoCard electionData={electionData} />
                </div>
                <div className="flex-grow overflow-hidden">
                  <VotingInfoCard 
                    hasVoted={hasVoted} 
                    onVoteClick={handleVoteNow} 
                    electionId={id}
                    voteSummary={voteSummary}
                  />
                </div>
              </div>

              {/* Right Column - Positions & Candidates */}
              <div className="h-full flex flex-col overflow-hidden">
                <h2 className="text-[#3F4B8C] font-climate text-xl mb-4">
                  POSITION & CANDIDATES
                </h2>
                
                <div className="flex-grow overflow-y-auto pr-2 candidates-container">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {electionData.positions.map(position => (
                      <PositionCard key={position.id} position={position} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add this style to ensure the page doesn't scroll */}
      <style jsx>{`
        body {
          overflow: hidden;
        }
        .candidates-container::-webkit-scrollbar {
          width: 6px;
        }
        .candidates-container::-webkit-scrollbar-thumb {
          background-color: #3F4B8C;
          border-radius: 3px;
        }
      `}</style>
    </>
  );
};

export default ElectionDetails; 