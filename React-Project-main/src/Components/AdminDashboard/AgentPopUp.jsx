import React, { useState } from 'react';
import { PhoneIcon } from "@heroicons/react/24/solid";
import ContactForm from './ContactForm';
import {useSelector } from 'react-redux';

const AgentPopUp = ({ agent, onClose }) => {
  const [showContactForm, setShowContactForm] = useState(false);
  const userId = useSelector(state => state.user.userId);
  if (!agent) {
    return <div>No agent found with the provided id</div>;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative flex w-full max-w-[40rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
        <div className="flex justify-end">
          <button className='hover:bg-white' onClick={onClose}>&times;</button>
        </div>
        <div className="p-6">
          <div className="mb-3 flex items-center justify-between">
            <h5 className="block font-sans text-xl font-medium leading-snug tracking-normal text-blue-900 antialiased">
              {agent.name}
            </h5>
            <p className="flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-900 antialiased">
              {agent.rating} Rating
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <label className="text-gray-700 font-semibold">Name:</label>
                <p className="text-gray-900">{agent.name}</p>
              </div>
              <div className="col-span-1">
                <label className="text-gray-700 font-semibold">Email:</label>
                <p className="text-gray-900">{agent.email}</p>
              </div>
              <div className="col-span-1">
                <label className="text-gray-700 font-semibold">Mobile:</label>
                <p className="text-gray-900">{agent.mobile}</p>
              </div>
              <div className="col-span-1">
                <label className="text-gray-700 font-semibold">Experience:</label>
                <p className="text-gray-900">{agent.experience}</p>
              </div>
              <div className="col-span-1">
                <label className="text-gray-700 font-semibold">Education:</label>
                <p className="text-gray-900">{agent.education}</p>
              </div>
              <div className="col-span-1">
                <label className="text-gray-700 font-semibold">Languages:</label>
                <p className="text-gray-900">{agent.languages}</p>
              </div>
              <div className="col-span-1">
                <label className="text-gray-700 font-semibold">Profession:</label>
                <p className="text-gray-900">{agent.profession}</p>
              </div>
              <div className="col-span-1">
                <label className="text-gray-700 font-semibold">Certifications:</label>
                <p className="text-gray-900">{agent.certifications}</p>
              </div>
              <div className="col-span-1">
                <label className="text-gray-700 font-semibold">Projects Completed:</label>
                <p className="text-gray-900">{agent.projectsCompleted}</p>
              </div>
              <div className="col-span-1">
                <label className="text-gray-700 font-semibold">Skills:</label>
                <p className="text-gray-900">{agent.skills}</p>
              </div>
              <div className="col-span-1">
                <label className="text-gray-700 font-semibold">Specializations:</label>
                <p className="text-gray-900">{agent.specializations}</p>
              </div>
              <div className="col-span-1">
                <label className="text-gray-700 font-semibold">Contact Address:</label>
                <p className="text-gray-900">{agent.contactAddress}</p>
              </div>
              <div className="col-span-1">
                <label className="text-gray-700 font-semibold">LinkedIn URL:</label>
                <p className="text-gray-900">{agent.linkedinUrl}</p>
              </div>
              <div className="col-span-1">
                <label className="text-gray-700 font-semibold">Twitter URL:</label>
                <p className="text-gray-900">{agent.twitterUrl}</p>
              </div>
            </div>
          <p className="block font-sans text-base font-light leading-relaxed text-gray-700 antialiased">
            {/* Agent description */}
          </p>
        </div>
        <div className="p-6 pt-3 flex justify-between">
          <button
            className="flex items-center justify-center w-1/2 rounded-lg bg-blue-500 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={() => setShowContactForm(true)}
            data-ripple-light="true"
          >
            <PhoneIcon className="h-5 w-5 text-white mr-2" />
            Contact
          </button>
        </div>
        {showContactForm && (
          <ContactForm
            senderId={userId}
            recipientType="Agent"
            recipientId={agent._id}
            onClose={() => setShowContactForm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default AgentPopUp;
