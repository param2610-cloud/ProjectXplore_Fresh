import React from 'react';
import AddAchievement from '@/components/users/add-achievement-component';
import ListAchievements from '@/components/users/list-achievements-component';
import TeamAddAchievement from './TeamAddechievments';
import { TeamListAchievements } from './TeamListAchievement';

export function TeamAchievementsPage({team_id}:{team_id:string}) {
  return (
    <div className="container mx-auto p-4 w-full">
      <h1 className="text-3xl font-bold mb-8">Team Achievements</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <TeamAddAchievement team_id={team_id}/>
        </div>
        <div>
          <TeamListAchievements team_id={team_id} />
        </div>
      </div>
    </div>
  );
}