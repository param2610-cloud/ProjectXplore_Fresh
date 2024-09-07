'use client';
import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import UseAuth from '../../../lib/hooks/UseAuth';
import userAtom from '../../../lib/atoms/UserAtom';
import { user_achievements } from '../../../lib/interface/INTERFACE';
import { Domain } from '../../../lib/Domain';

export function TeamListAchievements({team_id}:{team_id:string}) {
  const { loading, authenticated } = UseAuth();
  const [userId] = useAtom(userAtom);
  const [achievements, setAchievements] = useState<user_achievements[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await fetch(`${Domain}/api/v1/team/achievements?team_id=${team_id}`);
        console.log(response);
        
        if (response.ok) {
          const data = await response.json();
          setAchievements(data);
        } else {
          const errorData = await response.json();
          setError(errorData.error || 'Failed to fetch achievements');
        }
      } catch (error) {
        setError('An error occurred while fetching achievements');
      }
    };
    if (authenticated && userId) {
      fetchAchievements();
    }
  }, [authenticated, userId]);

 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!authenticated) {
    return <Alert variant="destructive"><AlertDescription>You must be authenticated to view achievements.</AlertDescription></Alert>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Team Achievements</h2>
      {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
      {achievements.length === 0 ? (
        <Alert><AlertDescription>You haven&apos;t added any achievements yet.</AlertDescription></Alert>
      ) : (
        achievements.map((achievement) => (
          <Card key={achievement.id}>
            <CardHeader>
              <CardTitle>{achievement.title}</CardTitle>
              <CardDescription>{new Date(achievement.date).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{achievement.description}</p>
              {achievement.images.length > 0 && (
                <div className="mt-2 flex space-x-2">
                  {achievement.images.map((image, index) => (
                    // <img key={index} src={image} alt={`Achievement ${index + 1}`} className="w-20 h-20 object-cover rounded" />
                    <div className='text-blue-500' key={index}>
                      {image}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
