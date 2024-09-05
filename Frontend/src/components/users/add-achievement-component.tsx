'use client';
import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import UseAuth from '@/lib/hooks/UseAuth';
import userAtom from '@/lib/atoms/UserAtom';
import { Domain } from '@/lib/Domain';
import CloudinaryFileUpload from '../FileInputCompo';

export default function AddAchievement() {
  const { loading, authenticated } = UseAuth();
  const [userId] = useAtom(userAtom);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!authenticated) {
      setError('You must be authenticated to add an achievement.');
      return;
    }

    try {
      const response = await fetch(`${Domain}/api/v1/users/achievements`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          title,
          description,
          date,
          images,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setTitle('');
        setDescription('');
        setDate('');
        setImages([]);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to add achievement. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Add New Achievement</CardTitle>
        <CardDescription>Share your latest accomplishment</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="images">Social posts (comma-separated URLs)</Label>
              <Input
                id="images"
                value={images.join(',')}
                onChange={(e:any) => setImages(e.target.value.split(','))}
              />
            </div>
          </div>
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="mt-4">
              <AlertDescription>Achievement added successfully!</AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full" onClick={handleSubmit}>Add Achievement</Button>
      </CardFooter>
    </Card>
  );
}
