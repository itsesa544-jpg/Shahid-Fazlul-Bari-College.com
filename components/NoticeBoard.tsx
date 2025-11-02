import React from 'react';
import type { Notice } from '../types';
import { DownloadIcon } from './Icons';

interface NoticeBoardProps {
  notices: Notice[];
}

const NoticeBoard: React.FC<NoticeBoardProps> = ({ notices }) => {
  return (
    <div className="bg-base-200 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-primary mb-12">নোটিশ বোর্ড</h1>
        <div className="max-w-4xl mx-auto bg-base-100 rounded-lg shadow-lg">
          {notices.length === 0 ? (
            <p className="text-center text-gray-500 py-20">কোনো নতুন নোটিশ নেই।</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left table-auto">
                <thead className="bg-base-300">
                  <tr>
                    <th className="px-6 py-3 text-lg font-semibold text-gray-700">শিরোনাম</th>
                    <th className="px-6 py-3 text-lg font-semibold text-gray-700 text-center">প্রকাশের তারিখ</th>
                    <th className="px-6 py-3 text-lg font-semibold text-gray-700 text-right">ডাউনলোড</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {notices.map((notice) => (
                    <tr key={notice.id} className="hover:bg-base-200 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="font-medium text-gray-900">{notice.title}</p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <p className="text-gray-600">{notice.date}</p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <a 
                          href={notice.link} 
                          className="inline-flex items-center justify-center p-2 rounded-full text-primary hover:bg-primary hover:text-white transition-colors"
                          aria-label={`Download ${notice.title}`}
                          >
                          <DownloadIcon className="w-6 h-6" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoticeBoard;