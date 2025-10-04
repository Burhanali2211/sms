import React from 'react';
import { UserRole } from '@/types/dashboard';

interface RoleBasedContentProps {
  role: UserRole;
}

const RoleBasedContent = ({ role }: RoleBasedContentProps) => {
  switch (role) {
    case 'admin':
    case 'school-admin':
    case 'principal':
    case 'super-admin':
      return (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Administration Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-lg mb-2">User Management</h3>
              <p className="text-gray-600">Manage users, roles, and permissions</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-lg mb-2">System Reports</h3>
              <p className="text-gray-600">View system analytics and reports</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-lg mb-2">Settings</h3>
              <p className="text-gray-600">Configure system-wide settings</p>
            </div>
          </div>
        </div>
      );
      
    case 'student':
      return (
        <div className="mt-6 space-y-4">
          <h2 className="text-xl font-bold">My Schedule</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800">Today's Classes</h3>
            <p className="text-blue-600">Mathematics - 9:00 AM to 10:00 AM</p>
            <p className="text-sm text-blue-600 mt-1">Science - 10:30 AM to 11:30 AM</p>
          </div>
        </div>
      );
      
    case 'teacher':
      return (
        <div className="mt-6 space-y-4">
          <h2 className="text-xl font-bold">Duty Schedule</h2>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-800">Today's Classes</h3>
            <p className="text-green-600">Mathematics - Room 101 - 9:00 AM to 10:00 AM</p>
            <p className="text-sm text-green-600 mt-1">Science - Room 205 - 10:30 AM to 11:30 AM</p>
          </div>
        </div>
      );
      
    default:
      return null;
  }
};

export default RoleBasedContent;
