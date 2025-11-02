
import React from 'react';
import { DEPARTMENTS } from '../constants';

const Departments: React.FC = () => {
  return (
    <div className="bg-base-200 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-primary mb-12">আমাদের বিভাগসমূহ</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {DEPARTMENTS.map((dept) => {
            const Icon = dept.icon;
            return (
              <div key={dept.id} className="bg-base-100 p-8 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
                <div className="flex justify-center mb-4">
                  <Icon className="w-16 h-16 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{dept.name}</h3>
                <p className="text-gray-600">{dept.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Departments;
