import React, { useState } from "react";
// Add Material UI Icons import
import { PhotoCamera, Videocam } from '@mui/icons-material';

const Post = () => {
  const [activeTab, setActiveTab] = useState("institutional");

  const posts = [
    {
      id: 1,
      author: "Michael Angelo Cullera",
      role: "Candidate, CCIS President",
      timeAgo: "6 mins ago",
      title: "POST TITLE",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet lobortis eros, et rhoncus quam. Cras vel sagittis est, vel auctor orci. Suspendisse eu congue mi. Donec sed magna eget leo auctor accumsan. Nulla facilisi. Morbi posuere et tortor et vulputate. Maecenas in lorem vitae odio eleifend porta a at nisl. Suspendisse sed mollis elit, eget dictum felis. Nulla eget congue tortor.",
    },
    {
      id: 2,
      author: "Mark Daniel Torres",
      role: "Candidate, CCIS Vice President",
      timeAgo: "6 mins ago",
      title: "POST TITLE",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet lobortis eros, et rhoncus quam. Cras vel sagittis est, vel auctor orci. Suspendisse eu congue mi. Donec sed magna eget leo auctor accumsan.",
    },
    {
      id: 3,
      author: "John Doe",
      role: "Candidate, CCIS Secretary",
      timeAgo: "10 mins ago",
      title: "SAMPLE POST TITLE",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet lobortis eros, et rhoncus quam. Cras vel sagittis est, vel auctor orci. Suspendisse eu congue mi. Donec sed magna eget leo auctor accumsan. Nulla facilisi. Morbi posuere et tortor et vulputate. Maecenas in lorem vitae odio eleifend porta a at nisl. Suspendisse sed mollis elit, eget dictum felis. Nulla eget congue tortor. Integer vehicula massa sit amet diam efficitur, at luctus dui efficitur. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  return (
    <div className="flex flex-col h-full w-full">
      {/* Tab Navigation - Full-width header matching the image */}
      <div className="bg-gray-200 -mr-8 -mt-10 pt-10 w-full sticky top-0 z-10 border-b border-[#3F4B8C]">
        <div className="grid grid-cols-2">
          <button
            onClick={() => setActiveTab("institutional")}
            className={`py-4 relative text-center border-r border-[#3F4B8C] ${
              activeTab === "institutional"
                ? "bg-gray-200 text-[#3F4B8C]"
                : "bg-gray-300 text-[#3F4B8C] hover:bg-gray-200"
            }`}
          >
            <span className="font-climate text-2xl">INSTITUTIONAL</span>
            {activeTab === "institutional" && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#3F4B8C]"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab("departamental")}
            className={`py-4 relative text-center ${
              activeTab === "departamental"
                ? "bg-gray-200 text-[#3F4B8C]"
                : "bg-gray-300 text-[#3F4B8C] hover:bg-gray-200"
            }`}
          >
            <span className="font-climate text-2xl">DEPARTAMENTAL</span>
            {activeTab === "departamental" && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#3F4B8C]"></div>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow overflow-y-auto bg-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          {/* Create Post Section */}
          <div className="bg-white rounded-lg shadow-sm p-4 my-4">
            <div className="flex flex-col">
              {/* User input area */}
              <div className="flex items-start gap-3 pb-3 border-b border-gray-300">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
                <div className="flex-grow">
                  <textarea 
                    className="w-full bg-gray-100 hover:bg-gray-200 focus:bg-white text-gray-600 rounded-lg py-2.5 px-4 transition-colors min-h-[60px] resize-none"
                    placeholder="Share your platforms here"
                  ></textarea>
                </div>
              </div>
              
              {/* Post type options */}
              <div className="flex justify-between pt-2 mt-1">
                <div className="flex">
                  <button className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-gray-100 transition-colors">
                    <div className="text-[#3F4B8C]">
                      <PhotoCamera />
                    </div>
                    <span className="font-medium text-lgfont-assistant text-gray-600">Photo</span>
                  </button>
                  <button className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-gray-100 transition-colors">
                    <div className="text-[#3F4B8C]">
                      <Videocam />
                    </div>
                    <span className="font-medium text-lg font-assistant text-gray-600">Video</span>
                  </button>
                </div>
                <button className="bg-[#2F3875] hover:bg-[#3a4589] text-white font-assistant font-bold py-2 px-4 rounded-lg transition-colors">
                  Make a Post
                </button>
              </div>
            </div>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-lg">{post.author}</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-[#2F3875]">{post.role}</span>
                      <span className="text-gray-500">{post.timeAgo}</span>
                    </div>
                  </div>
                </div>

                <div className="ml-[60px]">
                  <h2 className="text-[#2F3875] text-xl font-semibold mb-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {post.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
