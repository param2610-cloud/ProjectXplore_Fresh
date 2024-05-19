"use client";
import React, { useState, useEffect } from "react";
import { UserProfile } from "@/lib/interface/UserProfile";
import { useUserId } from "@/lib/context/Usercontext";
import STATES, { StorageBucketName } from "@/lib/utils/constants";
import { ProfileImageUpdate } from "@/lib/Database/ProfileUpdate";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/ui/use-toast";
import { useRouter } from "next/navigation";

const ClientPage = () => {
  // id fetch
  const { uid } = useUserId();
  console.log(uid);
  // hook init
  const [user_data, setuser_data] = useState<UserProfile | null>(null);
  const [loading, setloading] = useState(STATES.LOADED);
  const [success, setsuccess] = useState<boolean>(false);
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
  console.log(user_data?.avatar_URL);
  const [selectedImgFile, setSelectedImgFile] = useState(null);
  const [preview, setPreview] = useState(user_data?.avatar_URL);
  useEffect(() => {
    setPreview(user_data?.avatar_URL);
  }, [user_data]);
  const handleImageInputChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImgFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const router = useRouter()
  
  useEffect(()=>{
    if(success===true){
      router.refresh()
      console.log("triggered")
    }
  },[success])

  if (loading === STATES.LOADED) {
    return (
      <div>
        <form
          className="flex w-full h-full"
          onSubmit={async (event) => {
            setsuccess(false)
            event.preventDefault();
            const supabase = createClient();
            //image commit
            if (selectedImgFile && user_data) {
              console.log(`${uid}/Profile_image`);
              const { data, error } = await supabase.storage
                .from(StorageBucketName)
                .upload(`${uid}/Profile_image`, selectedImgFile, {
                  upsert: true,
                });
              const data2 = await supabase
                .from("Profile_info")
                .update({
                  avatar_URL: `https://yyszbuqlbxmejmiqcmts.supabase.co/storage/v1/object/public/Projectxplore_image_store/${uid}/Profile_image`,
                })
                .eq("id", uid);
              console.log(data2);
              if (error || data2.error) {
                console.log(error);
                console.log(data2);
                toast({
                  title: "Error Uploading File",
                  description: "Connect with us to fix this bug.",
                });
              } else {
                setsuccess(true);
              }

              // Other data
            }
            if (user_data) {
              const Data3 = await supabase
                .from("Profile_info")
                .update({
                  Full_Name: user_data.Full_Name,
                  date_of_birth: user_data.date_of_birth,
                  course: user_data.course,
                })
                .eq("id", uid);
              if (Data3.error) {
                toast({
                  title: Data3.error.message,
                  description: "Connect with us to fix this bug.",
                });
              } else {
                setsuccess(true);
              }
            }
            
          }
        }
          
        >
          <div className="flex justify-center items-center ">
            <label>
              <div>
                {preview ? (
                  <img
                    src={preview}
                    alt="avatar"
                    className="w-[200px] h-[200px] rounded-full"
                  />
                ) : (
                  <img
                    src="pink_default.png"
                    alt="avatar"
                    className="w-[200px] h-[200px] rounded-full"
                  />
                )}
              </div>
              <input
                type="file"
                name="avatar_URL"
                accept="image/*"
                onChange={handleImageInputChange}
                className="mt-2"
              />
            </label>
          </div>
          <div className="flex flex-col justify-center items-center flex-grow">
            <label>
              Full Name:
              <input
                type="text"
                name="Full_Name"
                value={user_data?.Full_Name}
                onChange={handleInputChange}
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
          </div>
        </form>
      </div>
    );
  } else if (loading === STATES.LOADING) {
    return <div>Loading</div>;
  }
};

export default ClientPage;
