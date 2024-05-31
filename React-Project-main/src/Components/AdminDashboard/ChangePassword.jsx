import React, { useState } from 'react';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordCriteria, setPasswordCriteria] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const clearConfirmPassword = () => {
    setConfirmPassword('');
  };

  const discardChanges = () => {
    // Implement your discard changes logic here
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    if (!passwordCriteria) {
      // Implement your weak password logic here
      return;
    }

    // Implement your submit logic here
  };

  return (
    <div className="flex items-center justify-center  ">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex items-center space-x-3 mb-6">
          <img src="https://unsplash.it/40/40?image=883" alt="Lock Icon" className="w-10 h-10 rounded-full" />
          <h1 className="text-lg font-semibold">Change Password</h1>
        </div>
        <p className="text-sm text-gray-700 mb-6">Update your password for enhanced account security.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">Current Password *</label>
            <input type="password" id="currentPassword" className="form-input w-full border rounded-md shadow-sm" required value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">New Password *</label>
            <input type="password" id="newPassword" className="form-input w-full border rounded-md shadow-sm" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password *</label>
            <input type="password" id="confirmPassword" className="form-input w-full border rounded-md shadow-sm" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <button type="button" onClick={clearConfirmPassword} className="text-xs text-blue-600 hover:underline mt-1">Clear</button>
          {passwordMismatch && <div className="text-sm text-red-500">Passwords do not match.</div>}
          <button type="button" onClick={discardChanges} className="text-sm text-gray-700 bg-gray-200 rounded-md py-2 w-full hover:bg-gray-300 focus:outline-none focus:ring focus:border-blue-300">Discard</button>
          <button type="submit" className="text-sm font-medium text-white bg-blue-600 rounded-md py-2 w-full hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300">Apply Changes</button>
        </form>
      </div>
    </div>
  );
  
};

export default ChangePassword;

