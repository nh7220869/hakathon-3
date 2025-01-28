import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { SignOutButton } from '@clerk/nextjs';
import Image from 'next/image';
export default async function DashboardPage() {
  const { userId } = await auth(); // Get the authenticated user's ID

  // Redirect to sign-in if the user is not authenticated
  if (!userId) {
    redirect('/sign-in');
  }

  // Fetch user data from Clerk's API
  const user = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
    },
  }).then((res) => res.json());

  // If user data is not available, show a loading state
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Welcome to Your Dashboard</h1>
        <div className="space-y-6">
          {/* Profile Section */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Information</h2>
            <div className="space-y-4">
              {/* User Image */}
              <div className="flex items-center space-x-4">
                <Image
                  src={user.profile_image_url}
                  alt="Profile"
                  height={100}
                  width={100}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="text-lg font-medium text-gray-900">
                    {user.first_name} {user.last_name}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="text-lg font-medium text-gray-900">
                  {user.email_addresses[0].email_address}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Joined On</p>
                <p className="text-lg font-medium text-gray-900">
                  {new Date(user.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Sign Out Button */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Actions</h2>
            <SignOutButton>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200">
                Sign Out
              </button>
            </SignOutButton>
          </div>
        </div>
      </div>
    </div>
  );
}