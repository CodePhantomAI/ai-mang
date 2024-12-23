import React from 'react';
import { Search, Star, MoreVertical } from 'lucide-react';
import { Lead } from '../types';
import { useLeadUtils } from '../hooks/useLeadUtils';

interface LeadsListProps {
  leads: Lead[];
  onSelectLead: (lead: Lead) => void;
}

const LeadsList = ({ leads, onSelectLead }: LeadsListProps) => {
  const { getStatusColor, getPriorityColor, getStatusText, formatDate } = useLeadUtils();

  return (
    <div className="col-span-2 bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800">
      {/* Search and Filters */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="חיפוש לידים..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-4 pr-10 py-2"
            />
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <select className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2">
            <option value="all">כל הסטטוסים</option>
            <option value="new">חדש</option>
            <option value="inProgress">בטיפול</option>
            <option value="contacted">נוצר קשר</option>
            <option value="converted">הומר</option>
            <option value="closed">סגור</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-4 py-3 text-right">שם</th>
              <th className="px-4 py-3 text-right">נושא</th>
              <th className="px-4 py-3 text-right">סטטוס</th>
              <th className="px-4 py-3 text-right">עדיפות</th>
              <th className="px-4 py-3 text-right">תאריך</th>
              <th className="px-4 py-3 text-right">פעולות</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr 
                key={lead.id}
                onClick={() => onSelectLead(lead)}
                className="border-b border-gray-800 hover:bg-gray-900/50 cursor-pointer"
              >
                <td className="px-4 py-3">
                  <div>
                    <div className="font-medium">{lead.name}</div>
                    <div className="text-sm text-gray-400">{lead.email}</div>
                  </div>
                </td>
                <td className="px-4 py-3">{lead.subject}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(lead.status)} bg-opacity-10`}>
                    {getStatusText(lead.status)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Star className={`h-5 w-5 ${getPriorityColor(lead.priority)}`} />
                </td>
                <td className="px-4 py-3 text-sm text-gray-400">
                  {formatDate(lead.createdAt)}
                </td>
                <td className="px-4 py-3">
                  <button className="p-2 hover:bg-gray-800 rounded-lg">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadsList;