'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Domain } from '@/lib/Domain';
import UseAuth from '@/lib/hooks/UseUser';
import { useAtom } from 'jotai';
import { userAtom } from '@/lib/atoms/userAtom';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SkillSearchWithSuggestions } from '@/components/Searchbar';
import { Textarea } from '@/components/ui/textarea';
import { InstitutionSearchWithStudentId } from '@/components/InstitutionsearchBar';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface UserData {
  full_name: string;
  username: string;
  phone_number: string;
  address: string;
  dateOfBirth: string;
  interest: string;
}

export default function UserForm() {
  const router = useRouter()
    const {loading,authenticated} = UseAuth()
    const [user] = useAtom(userAtom)
  const [formData, setFormData] = useState<UserData>({
    full_name: '',
    username: '',
    phone_number: '',
    address: '',
    dateOfBirth: '',
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
                const response = await axios.get(`${Domain}/api/v1/users/getUser`,{
                    params:{
                        userId:user
                    }
                });
                console.log(response)
                if (response.data) {
                    setFormData({
                        ...formData,
                        ...response.data.data, // Prefill form data with user info from the API
                    });
                localStorage.setItem('userFormData', JSON.stringify(response.data.data));

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
    console.log(name,value);
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    localStorage.setItem('userFormData', JSON.stringify(updatedFormData));
    console.log(updatedFormData);
    
  };
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    localStorage.setItem('userFormData', JSON.stringify(updatedFormData));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      console.log(formData)
      
      if(user){
        await axios.post(`${Domain}/api/v1/users/more-info`, {...formData,userId:user},{
          withCredentials:true
        });
      }
      localStorage.removeItem('userFormData');
      router.push("/dashboard")
    } catch (error) {
      console.error('Failed to submit the form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  
  return (
    <div className='w-screen min-h-screen p-0 m-0 box-border flex justify-center items-center flex-col'>
      <h1 className='text-2xl font-bold'>User Information Form</h1>
      <form className='w-[40%] flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex justify-center items-center gap-4'>
          <Label className='text-xl font-bold whitespace-nowrap'>Full Name:</Label>
          <Input
          className='w-full flex-grow'
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className='flex justify-center items-center gap-4'>
          <Label className='text-xl font-bold whitespace-nowrap'>Username:</Label>
          <Input
          className='w-full flex-grow'
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className='flex justify-center items-center gap-4'>
          <Label className='text-xl font-bold whitespace-nowrap'>Mobile Number:</Label>
          <Input
          className='w-full flex-grow'
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
        </div>
        <div className='flex justify-center items-center gap-4'>
          <Label className='text-xl font-bold whitespace-nowrap'>Address:</Label>
          <Input
          className='w-full flex-grow'
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className='flex justify-center items-center gap-4'>
          <Label className='text-xl font-bold whitespace-nowrap'>Date of Birth:</Label>
          <Input
          className='w-full flex-grow'
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div className='flex justify-center items-center gap-4'>
          <InstitutionSearchWithStudentId/>
        </div>
        <div className='flex justify-center items-center gap-4'>
        <SkillSearchWithSuggestions /> 
        </div>
        <div className='flex justify-center items-center gap-4'>
          <Label className='text-xl font-bold whitespace-nowrap'>Interest:</Label>
          <Textarea
          className='w-full flex-grow'
            name="interest"
            value={formData.interest}
            onChange={handleTextChange}
          />
        </div>
        <div className='flex justify-center items-center gap-4'>
        <Button className='w-1/4 flex justify-center items-center' type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
        </div>
      </form>
      <div className='mt-2'>
        <Link href={"/dashboard"}>
        <Button variant={'outline'}>
          Back To Dashboard
        </Button>
        </Link>
      </div>
    </div>
  );
}
