import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export const OrganizationSelector: React.FC = () => {
  const { currentOrganization, userOrganizations, switchOrganization } = useAuth();

  if (!userOrganizations.length) {
    return null;
  }

  return (
    <div className="relative">
      <select
        value={currentOrganization?.id || ''}
        onChange={(e) => switchOrganization(e.target.value)}
        className="block w-full px-4 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-gray-800 text-white"
      >
        {userOrganizations.map((org) => (
          <option key={org.id} value={org.id}>
            {org.name}
          </option>
        ))}
      </select>
    </div>
  );
};
