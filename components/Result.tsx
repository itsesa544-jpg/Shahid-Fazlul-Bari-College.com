import React from 'react';
import type { Notice } from '../types';
import { DownloadIcon, ExternalLinkIcon } from './Icons';

interface ResultProps {
  results: Notice[];
}

const Result: React.FC<ResultProps> = ({ results }) => {
  return (
    <div className="bg-base-200 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-primary mb-12">ফলাফল</h1>
        <div className="max-w-4xl mx-auto bg-base-100 rounded-lg shadow-lg">
          {results.length === 0 ? (
            <p className="text-center text-gray-500 py-20">এখনো কোনো ফলাফল প্রকাশ করা হয়নি।</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left table-auto">
                <thead className="bg-base-300">
                  <tr>
                    <th className="px-6 py-3 text-lg font-semibold text-gray-700">শিরোনাম</th>
                    <th className="px-6 py-3 text-lg font-semibold text-gray-700 text-center">প্রকাশের তারিখ</th>
                    <th className="px-6 py-3 text-lg font-semibold text-gray-700 text-right">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {results.map((result) => (
                    <tr key={result.id} className="hover:bg-base-200 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="font-medium text-gray-900">{result.title}</p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <p className="text-gray-600">{result.date}</p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {result.type === 'file' ? (
                          <a 
                            href={result.link} 
                            target="_blank"
                            rel="noopener noreferrer"
                            download={result.fileName || true}
                            className="inline-flex items-center justify-center p-2 rounded-full text-primary hover:bg-primary hover:text-white transition-colors"
                            aria-label={`Download ${result.title}`}
                            title="ডাউনলোড করুন"
                          >
                            <DownloadIcon className="w-6 h-6" />
                          </a>
                        ) : (
                           <a 
                            href={result.link} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center p-2 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                            aria-label={`Visit link for ${result.title}`}
                            title="লিঙ্ক দেখুন"
                          >
                            <ExternalLinkIcon className="w-6 h-6" />
                          </a>
                        )}
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

export default Result;