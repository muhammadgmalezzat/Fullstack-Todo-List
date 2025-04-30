import React, { useContext, useState } from 'react';
import { AppContext } from '../contexts/AppContext.jsx';
import axios from 'axios'
import { toast } from 'react-toastify'

const MyProfile = () => {
    

  const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false);

  // Function to update user profile data using API
  const updateUserProfileData = async () => {

    try {
      const { data } = await axios.post(backendUrl + '/api/user/updateUserProfile', { name: userData.name, phone: userData.phone }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }

  }
  
  return userData && (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
  <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl space-y-6">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-800">User Profile</h1>
      <p className="text-gray-500 text-sm">View and edit your personal information</p>
    </div>

    {/* Basic Info */}
    <section>
      <h2 className="text-lg font-semibold text-gray-600 border-b pb-1 mb-4">Basic Information</h2>
      <div className="space-y-2">
        <label className="text-gray-500 text-sm">Full Name</label>
        {isEdit ? (
          <input
            className="bg-gray-100 px-4 py-2 rounded-md w-full border focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
            value={userData.name}
          />
        ) : (
          <p className="text-gray-800 font-medium text-lg">{userData.name}</p>
        )}
      </div>
    </section>

    {/* Contact Info */}
    <section>
      <h2 className="text-lg font-semibold text-gray-600 border-b pb-1 mb-4">Contact Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-gray-500 text-sm">Email</label>
          <p className="text-blue-500 break-words">{userData.email}</p>
        </div>
        <div>
          <label className="text-gray-500 text-sm">Phone</label>
          {isEdit ? (
            <input
              className="bg-gray-100 px-4 py-2 rounded-md w-full border focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
              value={userData.phone}
            />
          ) : (
            <p className="text-blue-500">{userData.phone}</p>
          )}
        </div>
      </div>
    </section>

    {/* Action Button */}
    <div className="text-right pt-4">
      {isEdit ? (
        <button
          onClick={updateUserProfileData}
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all"
        >
          Save Changes
        </button>
      ) : (
        <button
          onClick={() => setIsEdit(true)}
          className="border border-blue-600 text-blue-600 px-6 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all"
        >
          Edit Profile
        </button>
      )}
    </div>
  </div>
</div>

  )
};

  export default MyProfile;