import React from 'react';
import AddAchievement from '@/components/users/add-achievement-component';
import ListAchievements from '@/components/users/list-achievements-component';

export default function AchievementsPage() {
  return (
    <div className="container mx-auto p-4 w-full">
      <h1 className="text-3xl font-bold mb-8">My Achievements</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <AddAchievement />
        </div>
        <div>
          <ListAchievements />
        </div>
      </div>
    </div>
  );
}