import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, User, Edit, PenSquare } from "lucide-react";
import StatusBadge from "../CommonComponents/StatusBadge";

const CandidateProfile = ({ candidate }) => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);

  // Default candidate data (replace with props or API data)
  const defaultCandidate = {
    name: "Cullera, Michael Angelo",
    partylist: "TAKBONGKABAYO PARTYLIST",
    position: "CCIS VP CANDIDATE",
    image: "/path/to/candidate-image.jpg", // Replace with actual image path
    bio: "Ako gawin niyong vice president, walang required bayaran at walang corruption",
    platform: [
      "MAGING POGI AT MAGANDA LAHAT",
      "PEDE KAHIT ANONG ASTETIK",
      "MAGANDANG DEPT SHIRT",
      "DI PAPANG LABAS ANG FUNDS"
    ],
    documents: [
      { name: "AGENDA VIDEO.MP4", status: "ON REVIEW" },
      { name: "LEAKS OF CORRUPTION.DOCX", status: "DECLINED" },
      { name: "INCREASE OF FUNDS FOR EVENTS", status: "APPROVED" },
      { name: "INCREASE OF FUNDS FOR EVENTS", status: "APPROVED" },
      { name: "INCREASE OF FUNDS FOR EVENTS", status: "APPROVED" },
      { name: "INCREASE OF FUNDS FOR EVENTS", status: "APPROVED" },
      { name: "INCREASE OF FUNDS FOR EVENTS", status: "APPROVED" },
      { name: "INCREASE OF FUNDS FOR EVENTS", status: "APPROVED" },
      { name: "INCREASE OF FUNDS FOR EVENTS", status: "APPROVED" },
    ]
  };

  const candidateData = candidate || defaultCandidate;
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDocumentClick = () => {
    navigate("/document");
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0].name);
    }
  };

  // Edit handlers (placeholder functions for future implementation)
  const handleEditProfilePicture = () => {
    console.log("Edit profile picture");
    // Future implementation: Open file picker or modal
  };

  const handleEditPartylistLogo = () => {
    console.log("Edit partylist logo");
    // Future implementation: Open file picker or modal
  };

  const handleEditBio = () => {
    console.log("Edit bio");
    // Future implementation: Open edit modal or navigate to edit page
  };

  const handleEditPlatform = () => {
    console.log("Edit platform");
    // Future implementation: Open edit modal or navigate to edit page
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 max-w-full mx-auto">
      {/* Left Section - Candidate Profile */}
      <div className="w-full md:w-3/5 bg-white rounded-lg overflow-hidden shadow-md">
        {/* Banner and Profile Image */}
        <div className="relative">
          {/* Banner Image with Edit Button */}
          <div className="border-[#38438c] border-2 h-48 bg-blue-500 overflow-hidden relative">
            <img 
              src="/path/to/building-banner.jpg" 
              alt="PLACE HOLDER FOR PARTYLIST LOGO" 
              className="w-full object-cover"
            />
            {/* Edit Button for Partylist Logo */}
            <button 
              onClick={handleEditPartylistLogo}
              className="absolute top-2 right-2 bg-white bg-opacity-70 p-1 rounded-full hover:bg-opacity-100 transition-all"
              title="Edit Partylist Logo"
            >
              <Edit size={16} className="text-[#3F4B8C]" />
            </button>
          </div>
          
          {/* Profile Image with Edit Button */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 group">
            <div className="w-32 h-32 rounded-full border-[#38438c] border-2 overflow-hidden bg-white relative">
              <img 
                src={candidateData.image} 
                alt={candidateData.name} 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Edit Button for Profile Picture - Moved outside the circle */}
            <button 
              onClick={handleEditProfilePicture}
              className="absolute -bottom-0 -right-0 bg-[#3F4B8C] p-1.5 rounded-full hover:bg-[#2F3875] transition-all shadow-md"
              title="Edit Profile Picture"
            >
              <PenSquare size={16} className="text-white" />
            </button>
          </div>
        </div>
        
        {/* Candidate Information */}
        <div className="pt-16 pb-6 px-6">
          {/* Name and Partylist */}
          <h1 className="text-[#3F4B8C] font-climate text-3xl text-center">
            {candidateData.name}
          </h1>
          <h2 className="text-[#3F4B8C] font-bebas font-bold text-2xl text-center tracking-wider">
            {candidateData.partylist}
          </h2>
          <p className="text-[#3F4B8C] text-center mb-8">
            {candidateData.position}
          </p>
          
          {/* Bio Section with Edit Button */}
          <div className="mb-6 relative">
            <h3 className="text-[#3F4B8C] font-climate text-xl mb-2">BIO:</h3>
            <div className="border border-[#3F4B8C] border-dashed rounded-md p-4 relative">
              <p className="text-gray-700">{candidateData.bio}</p>
              {/* Edit Button for Bio */}
              <button 
                onClick={handleEditBio}
                className="absolute top-2 right-2 bg-gray-100 p-1 rounded-full hover:bg-gray-200 transition-all"
                title="Edit Bio"
              >
                <Edit size={14} className="text-[#3F4B8C]" />
              </button>
            </div>
          </div>
          
          {/* Platform Section with Edit Button */}
          <div className="relative">
            <h3 className="text-[#3F4B8C] font-climate text-xl mb-2">PLATFORM:</h3>
            <div className="border border-[#3F4B8C] border-dashed rounded-md p-4 relative">
              <ul className="text-gray-700">
                {candidateData.platform.map((item, index) => (
                  <li key={index} className="mb-1">-{item}</li>
                ))}
              </ul>
              {/* Edit Button for Platform */}
              <button 
                onClick={handleEditPlatform}
                className="absolute top-2 right-2 bg-gray-100 p-1 rounded-full hover:bg-gray-200 transition-all"
                title="Edit Platform"
              >
                <Edit size={14} className="text-[#3F4B8C]" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Section - Documents */}
      <div className="w-full md:w-2/5 bg-white rounded-lg p-6 text-[#3F6B7C] shadow-md border border-[#3F6B7C]">
        {/* Drag and Drop File Upload */}
        <div className="mb-6">
          <div 
            className="border-2 border-dashed border-[#3F6B7C] rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => document.getElementById('fileInput').click()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files.length > 0) {
                setSelectedFile(e.dataTransfer.files[0].name);
              }
            }}
            onDragOver={(e) => e.preventDefault()}
          >
            <Upload size={32} className="text-[#3F6B7C] mb-2" />
            <p className="text-[#3F6B7C] font-bold font-assistant text-2xl text-center">Drag and drop files here</p>
            <p className="text-[#3F6B7C] text-md font-assistant text-center">or click to browse</p>
            {selectedFile && (
              <div className="mt-3 text-sm bg-[#3F6B7C] bg-opacity-10 px-3 py-1 rounded-full">
                {selectedFile}
              </div>
            )}
            <input 
              id="fileInput" 
              type="file" 
              className="hidden" 
              onChange={handleFileChange} 
            />
          </div>
        </div>
        
        {/* Separator Line */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-full h-px bg-[#3F6B7C]"></div>
        </div>
        
        {/* Document List Header */}
        <h3 className="text-[#3F6B7C] font-climate text-xl mb-4">DOCUMENTS:</h3>
        
        {/* Document List - Fixed Height Scrollable Container */}
        <div className="h-96 overflow-y-auto pr-1 custom-scrollbar">
          {candidateData.documents.map((doc, index) => (
            <div 
              key={index} 
              className={`px-3 py-3 flex justify-between items-center ${index % 2 === 0 ? 'bg-[#38738c] bg-opacity-30' : 'bg-[#38738c] bg-opacity-10'}`}
            >
              <div className="flex items-center">
                <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full mr-3 shadow-sm">
                  <Upload size={14} className="text-[#3F6B7C]" />
                </div>
                <span className="text-[#3F6B7C]">
                  {doc.name}
                </span>
              </div>
              <StatusBadge status={doc.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;

{/* Add this CSS to your global styles or as a style tag */}
<style jsx>{`
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(56, 115, 140, 0.1);
    border-radius: 10px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(56, 115, 140, 0.3);
    border-radius: 10px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(56, 115, 140, 0.5);
  }
`}</style>
