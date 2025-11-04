import React from 'react';
import type { Notice } from '../../types';
import AdminContentManager from './AdminContentManager';

interface AdminResultsProps {
  results: Notice[];
  onUpdateResults: (results: Notice[]) => void;
}

const AdminResults: React.FC<AdminResultsProps> = ({ results, onUpdateResults }) => {
  return (
    <AdminContentManager
      items={results}
      onUpdateItems={onUpdateResults}
      title="ফলাফল ব্যবস্থাপনা"
      itemTypeLabel="ফলাফল"
    />
  );
};

export default AdminResults;