import React from 'react';
import type { Notice } from '../../types';
import AdminContentManager from './AdminContentManager';

interface AdminRoutinesProps {
  routines: Notice[];
  onUpdateRoutines: (routines: Notice[]) => void;
}

const AdminRoutines: React.FC<AdminRoutinesProps> = ({ routines, onUpdateRoutines }) => {
  return (
    <AdminContentManager
      items={routines}
      onUpdateItems={onUpdateRoutines}
      title="ক্লাস রুটিন ব্যবস্থাপনা"
      itemTypeLabel="রুটিন"
    />
  );
};

export default AdminRoutines;