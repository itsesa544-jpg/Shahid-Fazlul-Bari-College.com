import React from 'react';
import type { Notice } from '../../types';
import AdminContentManager from './AdminContentManager';

interface AdminNoticesProps {
  notices: Notice[];
  onUpdateNotices: (notices: Notice[]) => void;
}

const AdminNotices: React.FC<AdminNoticesProps> = ({ notices, onUpdateNotices }) => {
  return (
    <AdminContentManager
      items={notices}
      onUpdateItems={onUpdateNotices}
      title="নোটিশ ব্যবস্থাপনা"
      itemTypeLabel="নোটিশ"
    />
  );
};

export default AdminNotices;