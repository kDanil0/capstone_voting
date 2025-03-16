import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProgressBar from '../../Components/Voting/ProgressBar';
import PositionVoting from '../../Components/Voting/PositionVoting';
import VoteSummary from '../../Components/Voting/VoteSummary';
import NavigationButtons from '../../Components/Voting/NavigationButtons';

const mockElectionData = {
  id: "ssc-2023",
  title: "SUPREME STUDENT COUNCIL ELECTION 2023",
  positions: [
    {
      id: 1,
      title: "SSC PRESIDENT",
      instruction: "Select one candidate or abstain",
      candidates: [
        { 
          id: 101, 
          name: "MARK DANIEL TORRES", 
          partylist: "Partylist 1",
          image: null
        },
        { 
          id: 102, 
          name: "MICHAEL ANGELO CULLERA", 
          partylist: "Partylist 2",
          image: null
        },
        { 
          id: 103, 
          name: "KATHERINE ANNE BALICAO", 
          partylist: "Partylist 3",
          image: null
        }
      ]
    },
    {
      id: 2,
      title: "SSC VICE PRESIDENT",
      instruction: "Select one candidate or abstain",
      candidates: [
        { 
          id: 201, 
          name: "JESUS BROWN", 
          partylist: "Partylist 1",
          image: null
        },
        { 
          id: 202, 
          name: "JOHN GABRIEL DAYRIT", 
          partylist: "Partylist 2",
          image: null
        }
      ]
    },
    {
      id: 3,
      title: "SSC SECRETARY",
      instruction: "Select one candidate or abstain",
      candidates: [
        { 
          id: 301, 
          name: "AMY WITHERTAKER", 
          partylist: "Partylist 1",
          image: null
        },
        { 
          id: 302, 
          name: "ANN TAYLOR", 
          partylist: "Partylist 2",
          image: null
        },
        { 
          id: 303, 
          name: "JOYCE CAMERON", 
          partylist: "Partylist 3",
          image: null
        }
      ]
    },
    {
      id: 4,
      title: "SSC TREASURER",
      instruction: "Select one candidate or abstain",
      candidates: [
        { 
          id: 401, 
          name: "JOHN MYERS", 
          partylist: "Partylist 1",
          image: null
        },
        { 
          id: 402, 
          name: "ARTHUR NERY", 
          partylist: "Partylist 2",
          image: null
        },
        { 
          id: 403, 
          name: "PAULO VELASQUEZ", 
          partylist: "Partylist 3",
          image: null
        }
      ]
    },
    {
      id: 5,
      title: "SSC AUDITOR",
      instruction: "Select one candidate or abstain",
      candidates: [
        { 
          id: 501, 
          name: "CANDIDATE 1", 
          partylist: "Partylist 1",
          image: null
        },
        { 
          id: 502, 
          name: "CANDIDATE 2", 
          partylist: "Partylist 2",
          image: null
        }
      ]
    }
  ]
};

const VotingProcess = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [electionData, setElectionData] = useState(null);
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0);
  const [selections, setSelections] = useState({});
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setElectionData(mockElectionData);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleSelectCandidate = (candidateId) => {
    const currentPosition = electionData.positions[currentPositionIndex];
    setSelections({
      ...selections,
      [currentPosition.id]: candidateId
    });
  };

  const handleAbstain = () => {
    const currentPosition = electionData.positions[currentPositionIndex];
    setSelections({
      ...selections,
      [currentPosition.id]: 'abstain'
    });
  };

  const handleNext = () => {
    if (currentPositionIndex < electionData.positions.length - 1) {
      setCurrentPositionIndex(currentPositionIndex + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handlePrevious = () => {
    if (currentPositionIndex > 0) {
      setCurrentPositionIndex(currentPositionIndex - 1);
    } else if (showSummary) {
      setShowSummary(false);
      setCurrentPositionIndex(electionData.positions.length - 1);
    }
  };

  const handleEditVote = (positionIndex) => {
    setCurrentPositionIndex(positionIndex);
    setShowSummary(false);
  };

  const handleSubmitVotes = async () => {
    try {
      // This would be your API call to submit votes
      console.log("Votes submitted:", selections);
      navigate(`/election/${id}?voted=success`);
    } catch (error) {
      console.error("Error submitting votes:", error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const currentPosition = electionData.positions[currentPositionIndex];
  const progressStep = showSummary ? electionData.positions.length + 1 : currentPositionIndex + 1;
  const totalSteps = electionData.positions.length + 1; // +1 for summary

  // Fix: Calculate isNextDisabled separately to handle the case when showSummary is true
  const isNextDisabled = showSummary ? false : !selections[currentPosition.id];

  return (
    <div className="min-h-screen flex flex-col -mx-8 -mt-8">
      {/* Full-width gray header with no margins */}
      <div className="w-full bg-gray-200 py-6">
        {/* Election Title */}
        <h1 className="text-[#3F4B8C] font-climate text-4xl text-center tracking-wider mb-6">
          {electionData.title}
        </h1>

        {/* Progress Bar - custom style to match image */}
        <div className="w-full px-8">
          <div className="h-2 bg-gray-300 rounded-full">
            <div 
              className="h-2 bg-[#3F4B8C] rounded-full transition-all duration-500 ease-in-out" 
              style={{ width: `${(progressStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* White Content Section with Border */}
      <div className="flex-grow bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="border border-gray-300 rounded-md p-6">
            {!showSummary ? (
              <PositionVoting 
                position={currentPosition}
                selectedCandidateId={selections[currentPosition.id]}
                onSelectCandidate={handleSelectCandidate}
                onAbstain={handleAbstain}
              />
            ) : (
              <VoteSummary 
                positions={electionData.positions}
                selections={selections}
                onEdit={handleEditVote}
              />
            )}

            <NavigationButtons 
              showSummary={showSummary}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onSubmit={handleSubmitVotes}
              isPreviousDisabled={currentPositionIndex === 0 && !showSummary}
              isNextDisabled={isNextDisabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotingProcess;
