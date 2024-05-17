"use client";
import React, { useState, useEffect } from "react";
import { UserProfile } from "@/lib/interface/UserProfile";
import { useUserId } from "@/lib/context/Usercontext";
import STATES, { StorageBucketName } from "@/lib/utils/constants";
import { ProfileImageUpdate } from "@/lib/Database/ProfileUpdate";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/ui/use-toast";

const ClientPage = () => {
  // id fetch
  const { uid } = useUserId();
  // hook init
  const [user_data, setuser_data] = useState<UserProfile | null>(null);
  const [loading, setloading] = useState(STATES.LOADED);
  const { toast } = useToast();
  //data fetch at startup
  useEffect(() => {
    if (uid) {
      setloading(STATES.LOADING);
      fetch(`/api/profile?id=${uid}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data: UserProfile) => {
          setuser_data(data);
          setloading(STATES.LOADED);
          console.log("data recieves");
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [uid]);
  //handle live change in input field
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setuser_data((prev_data) => {
      if (prev_data === null) {
        return {
          id: "",
          email: "",
          created_at: "",
          Full_Name: "",
          avatar_URL: "",
          date_of_birth: "",
          course: "",
        };
      }
      return { ...prev_data, [name]: value, email: prev_data.email || "" };
    });
  };
  //Image upload section
  console.log(user_data?.avatar_URL)
  const [preview, setPreview] = useState(user_data?.avatar_URL);
  const [selectedImgFile, setSelectedImgFile] = useState(null);

  const handleImageInputChange = (event:any) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImgFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading === STATES.LOADED) {
    return (
      <div>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const supabase = createClient();
            //image commit
            if (selectedImgFile && user_data) {
              const { data,error } = await supabase.storage
                .from(StorageBucketName)
                .upload(user_data?.avatar_URL, selectedImgFile);
                if(error){
                  console.log(error)
                  toast({
                    title:"Error Uploading File",
                    description:"Connect with us to fix this bug."
                  })
                }else{
                  console.log(data)
                }
            }
          }}
        >
          <label>
            Full Name:
            <input
              type="text"
              name="Full_Name"
              value={user_data?.Full_Name}
              onChange={handleInputChange}
            />
          </label>

          <label >
        <div>
          <img src={preview} alt="avatar" className="w-50 h-50 rounded-full" />
        </div>
        <input
          type="file"
          name="avatar_URL"
          accept="image/*"
          onChange={handleImageInputChange}
          className="mt-2"
        />
      </label>

          <label>
            Date of Birth:
            <input
              type="date"
              name="date_of_birth"
              value={user_data?.date_of_birth}
              onChange={handleInputChange}
            />
          </label>

          <label>
            Course:
            <input
              type="text"
              name="course"
              value={user_data?.course}
              onChange={handleInputChange}
            />
          </label>

          <button type="submit">Update Profile</button>
        </form>
      </div>
    );
  } else if (loading === STATES.LOADING) {
    return <div>Loading</div>;
  }
};

export default ClientPage;
