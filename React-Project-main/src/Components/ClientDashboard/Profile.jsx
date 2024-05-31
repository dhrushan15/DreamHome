import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const [showForm, setShowForm] = useState(false);
  const userId = useSelector(state => state.user.userId);
  const [agents, setAgents] = useState([]);
  const [agentData, setAgentData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    profession: '',
    experience: '',
    education: '',
    certifications: '',
    projectsCompleted: '',
    skills: '',
    specializations: '',
    contactAddress: '',
    location: '',
    languages: '',
    linkedinUrl: '',
    twitterUrl: ''
  }); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    profession: '',
    experience: '',
    education: '',
    certifications: '',
    projectsCompleted: '',
    skills: '',
    specializations: '',
    contactAddress: '',
    location: '',
    languages: '',
    linkedinUrl: '',
    twitterUrl: ''
  });   

  useEffect(() => {
    const fetchAllAgentsData = async () => {
      try {
        const response = await fetch(`https://api-main-1-kdm2.onrender.com/agents`);
        if (!response.ok) {
          throw new Error('Failed to fetch agents data');
        }
        const data = await response.json();
        setAgents(data);
      } catch (error) {
        console.error('Error fetching agents data:', error);
      }
    };

    // Initial fetch
    fetchAllAgentsData();

    // Fetch agents data every 5000 milliseconds
    const interval = setInterval(fetchAllAgentsData, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array to run only once on component mount

  useEffect(() => {
    // Filter the data to include only the agent with the specific userId
    const filteredAgent = agents.find(agent => agent._id === userId);
    
    // Set the filtered agent data to agentData state
    if (filteredAgent) {
      setAgentData({
        name: filteredAgent.name || '',
        email: filteredAgent.email || '',
        mobile: filteredAgent.mobile || '',
        password: filteredAgent.password || '',
        profession: filteredAgent.profession || '',
        experience: filteredAgent.experience || '',
        education: filteredAgent.education || '',
        certifications: filteredAgent.certifications || '',
        projectsCompleted: filteredAgent.projectsCompleted || '',
        skills: filteredAgent.skills || '',
        specializations: filteredAgent.specializations || '',
        contactAddress: filteredAgent.contactAddress || '',
        location: filteredAgent.location || '',
        languages: filteredAgent.languages || '',
        linkedinUrl: filteredAgent.linkedinUrl || '',
        twitterUrl: filteredAgent.twitterUrl || '',
      });
    }
  }, [agents, userId]);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch(`https://api-main-1-kdm2.onrender.com/agents/profile/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        alert('Failed to update agent profile');
      } else {
        alert('Agent profile updated successfully');
        // Optionally, you can update agentData state here if needed
      }
    } catch (error) {
      alert('Error updating agent profile:', error);
    }
  };
  

  if (!agentData) {
    return <div>Loading...</div>;
  }
  const handleUpdateProfileClick = () => {
    setShowForm(true);
  };

  return (
    
    <div className="bg-white-100 " >
      <div className="container mx-auto my-5 p-5">
        <div className="md:flex no-wrap md:-mx-2">
          {/* Left Side */}
          {!showForm && (
          <div className="flex justify items-center h-full">
          <div className="profile-card justify-center bg-white p-6 border border-gray-300 rounded-lg shadow-sm ml-6">
            <h2 className="text-gray-900 font-bold text-xl mb-4">Profile Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <label className="text-gray-700 font-semibold">Name:</label>
                <p className="text-gray-900">{agentData.name}</p>
              </div>
              <div className="col-span-1">
                <label className="text-gray-700 font-semibold">Email:</label>
                <p className="text-gray-900">{agentData.email}</p>
              </div>
              <div className="col-span-1">
                <label className="text-gray-700 font-semibold">Mobile:</label>
                <p className="text-gray-900">{agentData.mobile}</p>
              </div>
              <div className="col-span-1">
                <label className="text-gray-700 font-semibold">Experience:</label>
                <p className="text-gray-900">{agentData.experience}</p>
              </div>
              <div className="col-span-1">
                <label className="text-gray-700 font-semibold">Education:</label>
                <p className="text-gray-900">{agentData.education}</p>
              </div>
              <div className="col-span-1">
                <label className="text-gray-700 font-semibold">Languages:</label>
                <p className="text-gray-900">{agentData.languages}</p>
              </div>
              <div className="col-span-1">
                <label className="text-gray-700 font-semibold">Profession:</label>
                <p className="text-gray-900">{agentData.profession}</p>
              </div>
              <div className="col-span-1">
                <label className="text-gray-700 font-semibold">Certifications:</label>
                <p className="text-gray-900">{agentData.certifications}</p>
              </div>
              <div className="col-span-1">
                <label className="text-gray-700 font-semibold">Projects Completed:</label>
                <p className="text-gray-900">{agentData.projectsCompleted}</p>
              </div>
              <div className="col-span-1">
                <label className="text-gray-700 font-semibold">Skills:</label>
                <p className="text-gray-900">{agentData.skills}</p>
              </div>
              <div className="col-span-1">
                <label className="text-gray-700 font-semibold">Specializations:</label>
                <p className="text-gray-900">{agentData.specializations}</p>
              </div>
              <div className="col-span-1">
                <label className="text-gray-700 font-semibold">Contact Address:</label>
                <p className="text-gray-900">{agentData.contactAddress}</p>
              </div>
              <div className="col-span-1">
                <label className="text-gray-700 font-semibold">LinkedIn URL:</label>
                <p className="text-gray-900">{agentData.linkedinUrl}</p>
              </div>
              <div className="col-span-1">
                <label className="text-gray-700 font-semibold">Twitter URL:</label>
                <p className="text-gray-900">{agentData.twitterUrl}</p>
              </div>
              <button
                      onClick={handleUpdateProfileClick}
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                      Update Profile
              </button>
            </div>
          </div>
          </div>
          )
        }
          {/* Right Side */}
          {showForm && (
          
          <div className="w-full md:w-9/12 mx-2 h-64">
            {/* Profile tab */}
            {/* About Section */}
            <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-sm">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-6 gap-6 text-sm">
                        <div className="col-span-6 sm:col-span-3 mb-4">
                            <label htmlFor="name" className="text-gray-900 font-medium mb-2 block">Name:</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder={agentData.name || 'Enter your name'}
                                value={formData.name}
                                onChange={handleChange}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                required
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-3 mb-4">
                            <label htmlFor="email" className="text-gray-900 font-medium mb-2 block">Email:</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder={agentData.email || 'Enter your email'}
                                value={formData.email}
                                onChange={handleChange}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                required
                            />
                        </div>
                        {/* Add similar input fields for other fields */}
                        <div className="col-span-6 sm:col-span-3 mb-4">
                            <label htmlFor="mobile" className="text-gray-900 font-medium mb-2 block">Mobile:</label>
                            <input
                                type="text"
                                name="mobile"
                                id="mobile"
                                placeholder={agentData.mobile || 'Enter your mobile number'}
                                value={formData.mobile}
                                onChange={handleChange}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                required
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-3 mb-4">
                            <label htmlFor="experience" className="text-gray-900 font-medium mb-2 block">Experience:</label>
                            <input
                                type="number"
                                name="experience"
                                id="experience"
                                placeholder={agentData.experience || 'Enter your experience'}
                                value={formData.experience}
                                onChange={handleChange}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                required
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-3 mb-4">
                            <label htmlFor="education" className="text-gray-900 font-medium mb-2 block">Education:</label>
                            <input
                                type="text"
                                name="education"
                                id="education"
                                placeholder={agentData.education || 'Enter your education'}
                                value={formData.education}
                                onChange={handleChange}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                required
                            />
                        </div>
                        {/* Add similar input fields for other fields */}
                        <div className="col-span-6 sm:col-span-3 mb-4">
                            <label htmlFor="languages" className="text-gray-900 font-medium mb-2 block">Languages:</label>
                            <input
                                type="text"
                                name="languages"
                                id="languages"
                                placeholder={agentData.languages || 'Enter your languages'}
                                value={formData.languages}
                                onChange={handleChange}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                required
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-3 mb-4">
                          <label htmlFor="profession" className="text-gray-900 font-medium mb-2 block">Profession:</label>
                          <input
                              type="text"
                              name="profession"
                              id="profession"
                              placeholder={agentData.profession || 'Enter your profession'}
                              value={formData.profession}
                              onChange={handleChange}
                              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                              required
                          />
                      </div>
                      <div className="col-span-6 sm:col-span-3 mb-4">
                          <label htmlFor="certifications" className="text-gray-900 font-medium mb-2 block">Certifications:</label>
                          <input
                              type="text"
                              name="certifications"
                              id="certifications"
                              placeholder={agentData.certifications || 'Enter your certifications'}
                              value={formData.certifications}
                              onChange={handleChange}
                              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                              required
                          />
                      </div>
                      {/* Add similar input fields for other fields */}
                      <div className="col-span-6 sm:col-span-3 mb-4">
                          <label htmlFor="projectsCompleted" className="text-gray-900 font-medium mb-2 block">Projects Completed:</label>
                          <input
                              type="text"
                              name="projectsCompleted"
                              id="projectsCompleted"
                              placeholder={agentData.projectsCompleted || 'Enter number of projects completed'}
                              value={formData.projectsCompleted}
                              onChange={handleChange}
                              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                              required
                          />
                      </div>
                      <div className="col-span-6 sm:col-span-3 mb-4">
                          <label htmlFor="skills" className="text-gray-900 font-medium mb-2 block">Skills:</label>
                          <input
                              type="text"
                              name="skills"
                              id="skills"
                              placeholder={agentData.skills || 'Enter your skills'}
                              value={formData.skills}
                              onChange={handleChange}
                              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                              required
                          />
                      </div>
                      <div className="col-span-6 mb-4">
                          <label htmlFor="specializations" className="text-gray-900 font-medium mb-2 block">Specializations:</label>
                          <input
                              type="text"
                              name="specializations"
                              id="specializations"
                              placeholder={agentData.specializations || 'Enter your specializations'}
                              value={formData.specializations}
                              onChange={handleChange}
                              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                              required
                          />
                      </div>
                      <div className="col-span-6 mb-4">
                          <label htmlFor="contactAddress" className="text-gray-900 font-medium mb-2 block">Contact Address:</label>
                          <input
                              type="text"
                              name="contactAddress"
                              id="contactAddress"
                              placeholder={agentData.contactAddress || 'Enter your contact address'}
                              value={formData.contactAddress}
                              onChange={handleChange}
                              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                              required
                          />
                      </div>
                        {/* Add similar input fields for other fields */}
                        <div className="col-span-6 sm:col-span-3 mb-4">
                            <label htmlFor="linkedinUrl" className="text-gray-900 font-medium mb-2 block">LinkedIn URL:</label>
                            <input
                                type="text"
                                name="linkedinUrl"
                                id="linkedinUrl"
                                placeholder={agentData.linkedinUrl || 'Enter your LinkedIn URL'}
                                value={formData.linkedinUrl}
                                onChange={handleChange}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                required
                            />
                        </div>
                        {/* Add similar input fields for other fields */}
                        <div className="col-span-6 sm:col-span-3 mb-4">
                            <label htmlFor="twitterUrl" className="text-gray-900 font-medium mb-2 block">Twitter URL:</label>
                            <input
                                type="text"
                                name="twitterUrl"
                                id="twitterUrl"
                                placeholder={agentData.twitterUrl || 'Enter your Twitter URL'}
                                value={formData.twitterUrl}
                                onChange={handleChange}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                required
                            />
                        </div>
                        {/* Add similar input fields for other fields */}
                        <div className="col-span-6 mb-4">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                            >
                                Update Profile
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            
            {/* End of profile tab */}
          </div>
          )
        }
        </div>
      </div>
    </div>
  );
};

export default Profile;
