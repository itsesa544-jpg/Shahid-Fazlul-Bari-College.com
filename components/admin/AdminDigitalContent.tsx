import React from 'react';
import type { Notice } from '../../types';
import AdminContentManager from './AdminContentManager';

interface AdminDigitalContentProps {
  contents: Notice[];
  onUpdateContents: (contents: Notice[]) => void;
}

const AdminDigitalContent: React.FC<AdminDigitalContentProps> = ({ contents, onUpdateContents }) => {
  return (
    <AdminContentManager
      items={contents}
      onUpdateItems={onUpdateContents}
      title="ডিজিটাল কনটেন্ট ব্যবস্থাপনা"
      itemTypeLabel="কনটেন্ট"
    />
  );
};

export default AdminDigitalContent;