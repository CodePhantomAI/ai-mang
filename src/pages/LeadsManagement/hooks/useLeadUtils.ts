export const useLeadUtils = () => {
  const getStatusColor = (status: string) => {
    const colors = {
      new: 'bg-blue-500',
      inProgress: 'bg-yellow-500',
      contacted: 'bg-purple-500',
      converted: 'bg-green-500',
      closed: 'bg-gray-500'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-500';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: 'text-red-400',
      medium: 'text-yellow-400',
      low: 'text-blue-400'
    };
    return colors[priority as keyof typeof colors] || 'text-gray-400';
  };

  const getStatusText = (status: string) => {
    const statusTexts = {
      new: 'חדש',
      inProgress: 'בטיפול',
      contacted: 'נוצר קשר',
      converted: 'הומר',
      closed: 'סגור'
    };
    return statusTexts[status as keyof typeof statusTexts] || status;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return {
    getStatusColor,
    getPriorityColor,
    getStatusText,
    formatDate
  };
};