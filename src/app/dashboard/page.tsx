'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth/AuthContext";
import { SavedRecommendations } from "@/components/dashboard/SavedRecommendations";
import { ProfileSettings } from "@/components/dashboard/profile-settings";
import { UsageStatistics } from "@/components/dashboard/usage-statistics";
import { ExportFeatures } from "@/components/dashboard/export-features";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="font-bold text-xl">
              <span className="bg-gradient-to-r from-primary-500 via-primary-600 to-accent-500 bg-clip-text text-transparent">
                StartupSpark
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">{user.email}</span>
              <Button
                variant="outline"
                onClick={async () => {
                  await signOut();
                  router.push("/login");
                }}
              >
                Sign out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Button
                  variant="gradient"
                  className="w-full justify-start"
                  onClick={() => router.push("/questionnaire")}
                >
                  Take Questionnaire
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => window.location.href = '#saved-recommendations'}
                >
                  View Saved Ideas
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Your Progress</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Questionnaire</span>
                    <span className="text-green-600">✓ Complete</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Profile</span>
                    <span className="text-green-600">✓ Complete</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Usage Statistics */}
            <UsageStatistics />

            {/* Profile Settings */}
            <ProfileSettings />

            {/* Saved Recommendations */}
            <div id="saved-recommendations" className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Your Saved Recommendations</h2>
              <SavedRecommendations userId={user.id} />
            </div>

            {/* Export Features */}
            <ExportFeatures />
          </div>
        </div>
      </main>
    </div>
  );
}
