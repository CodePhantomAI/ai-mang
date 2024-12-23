import { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  Search,
  Pencil,
  Trash2,
  X,
  FileDown
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { PageTransition } from '../components/PageTransition';
import { Tooltip } from '../components/Tooltip';
import { exportToExcel } from '../utils/exportToExcel';

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  message?: string;
  status: string;
  source: string;
  date: string;
  priority: string;
}

const LeadsManagement = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    // Load leads from localStorage
    const storedLeads = JSON.parse(localStorage.getItem('leads') || '[]');
    setLeads(storedLeads);
  }, []);

  // Filter leads based on search term
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = !statusFilter || lead.status === statusFilter;
    const matchesSource = !sourceFilter || lead.source === sourceFilter;

    return matchesSearch && matchesStatus && matchesSource;
  });

  const handleEditLead = (lead: Lead) => {
    setEditingLead({ ...lead });
    setIsEditModalOpen(true);
  };

  const handleUpdateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLead) return;

    const updatedLeads = leads.map(lead => 
      lead.id === editingLead.id ? editingLead : lead
    );
    
    setLeads(updatedLeads);
    localStorage.setItem('leads', JSON.stringify(updatedLeads));
    setIsEditModalOpen(false);
    setEditingLead(null);
    toast.success('סטטוס הליד עודכן בהצלחה!');
  };

  const handleDeleteLead = (id: number) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק ליד זה?')) {
      const updatedLeads = leads.filter(lead => lead.id !== id);
      setLeads(updatedLeads);
      localStorage.setItem('leads', JSON.stringify(updatedLeads));
      toast.success('הליד נמחק בהצלחה!');
    }
  };

  const handleExportToExcel = () => {
    const exportData = filteredLeads.map(lead => ({
      שם: lead.name,
      אימייל: lead.email,
      טלפון: lead.phone,
      מקור: lead.source,
      סטטוס: lead.status,
      תאריך: lead.date
    }));
    
    exportToExcel(exportData, 'לידים');
    toast.success('הלידים יוצאו בהצלחה!');
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white p-6" dir="rtl">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-center">ניהול לידים</h1>
            
            <div className="flex gap-4">
              <Tooltip content="ייצא לאקסל">
                <button
                  onClick={handleExportToExcel}
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                >
                  <FileDown size={20} />
                  ייצא לאקסל
                </button>
              </Tooltip>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-gray-900 p-6 rounded-lg mb-8">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <Tooltip content="חפש לפי שם, אימייל או טלפון">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="חיפוש..."
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 pr-10 text-white"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                </Tooltip>
              </div>

              <div className="flex gap-4">
                <Tooltip content="סנן לפי סטטוס">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                  >
                    <option value="">כל הסטטוסים</option>
                    <option value="חדש">חדש</option>
                    <option value="בטיפול">בטיפול</option>
                    <option value="סגור">סגור</option>
                  </select>
                </Tooltip>

                <Tooltip content="סנן לפי מקור">
                  <select
                    value={sourceFilter}
                    onChange={(e) => setSourceFilter(e.target.value)}
                    className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                  >
                    <option value="">כל המקורות</option>
                    <option value="טופס צור קשר">טופס צור קשר</option>
                    <option value="דף נחיתה">דף נחיתה</option>
                  </select>
                </Tooltip>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-right">שם</th>
                    <th className="px-6 py-3 text-right">אימייל</th>
                    <th className="px-6 py-3 text-right">טלפון</th>
                    <th className="px-6 py-3 text-right">מקור</th>
                    <th className="px-6 py-3 text-right">סטטוס</th>
                    <th className="px-6 py-3 text-right">תאריך</th>
                    <th className="px-6 py-3 text-right">פעולות</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map(lead => (
                    <tr key={lead.id} className="border-b border-gray-800">
                      <td className="px-6 py-4 text-center">{lead.name}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <Tooltip content="שלח אימייל">
                            <a
                              href={`mailto:${lead.email}`}
                              className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                            >
                              <Mail size={16} />
                              {lead.email}
                            </a>
                          </Tooltip>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <Tooltip content="חייג">
                            <a
                              href={`tel:${lead.phone}`}
                              className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                            >
                              <Phone size={16} />
                              {lead.phone}
                            </a>
                          </Tooltip>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">{lead.source}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            lead.status === 'חדש' ? 'bg-green-900 text-green-300' :
                            lead.status === 'בטיפול' ? 'bg-blue-900 text-blue-300' :
                            'bg-gray-800 text-gray-300'
                          }`}>
                            {lead.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">{lead.date}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <Tooltip content="ערוך ליד">
                            <button 
                              onClick={() => handleEditLead(lead)}
                              className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-blue-500 hover:text-blue-400"
                            >
                              <Pencil size={20} />
                            </button>
                          </Tooltip>
                          <Tooltip content="מחק ליד">
                            <button 
                              onClick={() => handleDeleteLead(lead.id)}
                              className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-red-500 hover:text-red-400"
                            >
                              <Trash2 size={20} />
                            </button>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && editingLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">עריכת ליד</h2>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 hover:bg-gray-800 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleUpdateLead} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">שם</label>
                <input
                  type="text"
                  value={editingLead.name}
                  onChange={(e) => setEditingLead({ ...editingLead, name: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">אימייל</label>
                <input
                  type="email"
                  value={editingLead.email}
                  onChange={(e) => setEditingLead({ ...editingLead, email: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">טלפון</label>
                <input
                  type="tel"
                  value={editingLead.phone}
                  onChange={(e) => setEditingLead({ ...editingLead, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">הודעה</label>
                <textarea
                  value={editingLead.message}
                  onChange={(e) => setEditingLead({ ...editingLead, message: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 rounded-lg h-24"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">סטטוס</label>
                <select
                  value={editingLead.status}
                  onChange={(e) => setEditingLead({ ...editingLead, status: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 rounded-lg"
                >
                  <option value="חדש">חדש</option>
                  <option value="בטיפול">בטיפול</option>
                  <option value="טופל">טופל</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">עדיפות</label>
                <select
                  value={editingLead.priority}
                  onChange={(e) => setEditingLead({ ...editingLead, priority: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 rounded-lg"
                >
                  <option value="גבוה">גבוה</option>
                  <option value="בינוני">בינוני</option>
                  <option value="נמוך">נמוך</option>
                </select>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
                >
                  שמור שינויים
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg"
                >
                  ביטול
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PageTransition>
  );
};

export default LeadsManagement;
