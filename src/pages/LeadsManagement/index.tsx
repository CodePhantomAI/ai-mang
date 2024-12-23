import React from 'react';
import LeadsHeader from './components/LeadsHeader';
import LeadsList from './components/LeadsList';
import LeadDetails from './components/LeadDetails';

const LeadsManagement = () => {
  return (
    <div className="min-h-screen bg-black text-white p-6" dir="rtl">
      <LeadsHeader />
      <div className="grid grid-cols-3 gap-6">
        <LeadsList />
        <LeadDetails />
      </div>
    </div>
  );
};

export default LeadsManagement;