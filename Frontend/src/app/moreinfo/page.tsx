'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { domain } from '@/lib/domain';
import useAuth from '@/lib/hooks/useUser';
import { useAtom } from 'jotai';
import { userAtom } from '@/lib/atoms/userAtom';

interface UserData {
  full_name: string;
  username: string;
  mobileNumber: string;
  address: string;
  dateOfBirth: string;
  institution: string;
  skills: string[];
  interest: string;
}

export default function UserForm() {
    const {loading,authenticated} = useAuth()
    const [user] = useAtom(userAtom)
  const [formData, setFormData] = useState<UserData>({
    full_name: '',
    username: '',
    mobileNumber: '',
    address: '',
    dateOfBirth: '',
    institution: '',
    skills: [],
    interest: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get data from local storage if available on first render
  useEffect(() => {
      const savedData = localStorage.getItem('userFormData');
      if (savedData) {
          setFormData(JSON.parse(savedData));
        }
        
        // Fetch user data from API and set values to the form
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${domain}/api/v1/users/getUser`,{
                    params:{
                        userId:user
                    }
                });
                if (response.data) {
                    setFormData({
                        ...formData,
                        ...response.data, // Prefill form data with user info from the API
                    });
                }
      } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
    };
    
    if(!loading){
        fetchUserData();
    }
  }, [loading]);

  // Update form data and store in localStorage
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    localStorage.setItem('userFormData', JSON.stringify(updatedFormData));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const updatedFormData = {
      ...formData,
      skills: value.split(',').map((skill) => skill.trim()), // Store skills as array
    };
    setFormData(updatedFormData);
    localStorage.setItem('userFormData', JSON.stringify(updatedFormData));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post('/api/submit-user', formData);
      localStorage.removeItem('userFormData'); // Clear local storage after successful submission
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Failed to submit the form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1>User Information Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mobile Number:</label>
          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Institution:</label>
          <input
            type="text"
            name="institution"
            value={formData.institution}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Skills (comma-separated):</label>
          <input
            type="text"
            name="skills"
            value={formData.skills.join(', ')}
            onChange={handleSkillsChange}
          />
        </div>
        <div>
          <label>Interest:</label>
          <input
            type="text"
            name="interest"
            value={formData.interest}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
