import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, User, Edit, PenSquare, X, Check, Image, Video } from "lucide-react";
import StatusBadge from "../CommonComponents/StatusBadge";
import Post from "../Post";
import { BASE_URL } from '../../utils/api';

const CandidateProfile = ({ candidateData, onBioUpdate, onPhotoUpload }) => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [newBio, setNewBio] = useState(candidateData?.bio || '');
  const [isUploading, setIsUploading] = useState(false);
  const [newPost, setNewPost] = useState('');
  const [imageError, setImageError] = useState(false);

  const handleDocumentClick = () => {
    navigate("/document");
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setProfileImage(e.target.files[0].name);
    }
  };

  const handleBioSubmit = async () => {
    try {
      await onBioUpdate(newBio);
      setIsEditingBio(false);
    } catch (error) {
      console.error('Failed to update bio:', error);
    }
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      try {
        await onPhotoUpload(file);
      } finally {
        setIsUploading(false);
      }
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

  // Debug log to check candidateData
  // console.log('Profile photo path:', candidateData?.profile_photo);

  const getStorageUrl = (path) => {
    if (!path) return null;
    const baseUrl = BASE_URL.replace(/\/+$/, '');
    const cleanPath = path.replace(/^\/+/, '');
    return `${baseUrl}/storage/${cleanPath}`;
  };

  const renderProfileImage = () => {
    if (!candidateData?.profile_photo || imageError) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <User size={40} className="text-gray-400" />
        </div>
      );
    }

    // Debug log the constructed URL
    const imageUrl = getStorageUrl(candidateData.profile_photo);
    // console.log('Constructed image URL:', imageUrl);

    return (
      <img 
        src={imageUrl}
        alt={candidateData.user?.name || 'Profile'}
        className="w-full h-full object-cover"
        onError={(e) => {
          console.error('Image failed to load:', e);
          setImageError(true);
        }}
      />
    );
  };

  if (!candidateData) return null;

  return (
    <div className="h-full max-w-[1200px] mx-auto pt-4 px-4">
      <div className="flex gap-4">
        {/* Main Content */}
        <div className="flex-grow max-w-[800px]">
          {/* Profile Banner and Info */}
          <div className="bg-white rounded-lg shadow mb-4">
            {/* Banner Image */}
            <div className="h-48 bg-[#38438c] rounded-t-lg relative">
              {candidateData?.banner_image && (
                <img 
                  src={`/storage/${candidateData.banner_image}`}
                  alt="Banner"
                  className="w-full h-full object-cover rounded-t-lg"
                />
              )}
            </div>

            {/* Profile Info */}
            <div className="px-4 pb-4">
              <div className="flex items-end -mt-6">
                {/* Profile Picture */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-gray-200">
                    {renderProfileImage()}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-[#38438c] text-white p-2 rounded-full cursor-pointer hover:bg-[#4B5FCD]">
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handlePhotoChange}
                      disabled={isUploading}
                    />
                    <Upload size={16} />
                  </label>
                </div>

                {/* Name and Details */}
                <div className="ml-4 -mb-3">
                  <h1 className="text-2xl font-bold">{candidateData?.user?.name}</h1>
                  <p className="text-gray-600">{candidateData?.position?.name}</p>
                  <p className="text-gray-600">{candidateData?.partylist?.name}</p>
                </div>
              </div>
            </div>

            {/* Bio Section with Edit Functionality */}
            <div className="border-t px-4 py-3">
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="font-bold">Bio</h2>
                  {!isEditingBio && (
                    <button
                      onClick={() => {
                        setIsEditingBio(true);
                        setNewBio(candidateData?.bio || '');
                      }}
                      className="text-[#38438c] hover:text-[#4B5FCD]"
                    >
                      <Edit size={18} />
                    </button>
                  )}
                </div>
                
                {isEditingBio ? (
                  <div className="space-y-2">
                    <textarea
                      value={newBio}
                      onChange={(e) => setNewBio(e.target.value)}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#38438c] focus:border-transparent"
                      rows="4"
                      placeholder="Write your bio here..."
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setIsEditingBio(false);
                          setNewBio(candidateData?.bio || '');
                        }}
                        className="p-1 text-gray-600 hover:text-gray-800"
                      >
                        <X size={20} />
                      </button>
                      <button
                        onClick={handleBioSubmit}
                        className="p-1 text-green-600 hover:text-green-700"
                      >
                        <Check size={20} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600">{candidateData?.bio || 'No bio available'}</p>
                )}
              </div>
            </div>

            {/* Post Creation */}
            <div className="border-t px-4 py-3">
              <div className="border rounded-lg p-4">
                <textarea
                  placeholder="Share your platform here"
                  className="w-full p-2 border rounded-lg mb-2"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                />
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1 text-gray-600">
                      <Image size={20} />
                      Photo
                    </button>
                    <button className="flex items-center gap-1 text-gray-600">
                      <Video size={20} />
                      Video
                    </button>
                  </div>
                  <button className="bg-[#38438c] text-white px-4 py-2 rounded-lg hover:bg-[#4B5FCD]">
                    Make a Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Documents Section (Right Side) */}
        <div className="w-[300px]">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="font-bold text-lg mb-4">Documents</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-4 text-center">
              <p className="text-gray-500">Drag and drop files here to upload</p>
            </div>
            
            {/* Document List */}
            <div className="space-y-2">
              {/* Example documents - replace with actual data */}
              {['PLATFORM PROPOSAL', 'LEAVE OF CONSULTATION', 'INCREASE OF FUNDS'].map((doc, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span className="text-sm">{doc}</span>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded">
                    APPROVED
                  </span>
                </div>
              ))}
            </div>
          </div>
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
