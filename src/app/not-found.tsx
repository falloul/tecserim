import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found | TECSERIM Sarl',
  description: 'The page you are looking for does not exist. Please check the URL or navigate back to the homepage.',
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-20">
      <div className="text-center max-w-lg">
        <h1 className="text-6xl font-bold text-teal-700 mb-6">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link 
          href="/" 
          className="px-6 py-3 bg-teal-700 text-white rounded-md font-medium hover:bg-teal-800 transition transform hover:scale-105 shadow-lg"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
} 