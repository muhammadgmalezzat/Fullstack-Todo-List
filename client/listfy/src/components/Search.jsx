import React from 'react';

const Search = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="w-full flex justify-center   items-center ">
      <input
        type="text"
        placeholder="Search by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="  border border-gray-300   focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white shadow-md p-4 rounded-lg mb-4 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%]"
      />
    </div>
  );
};

export default Search;
