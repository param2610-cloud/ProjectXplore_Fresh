"use client";
import React, { useState, useEffect, use } from "react";
import { UserProfile } from "@/lib/interface/UserProfile";
import { useUserId } from "@/lib/context/Usercontext";
import STATES from "@/lib/utils/constants";

const page = () => {
  const { uid } = useUserId();
  console.log(uid)
  const [user_data, setuser_data] = useState<UserProfile | null>(null);
  const [loading, setloading] = useState(STATES.LOADED);

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
          console.log("data recieves")
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [uid]);
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
    return (
      <div>
        <form onSubmit={() => {console.log(user_data?.Full_Name)}}>
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
            Avatar URL:
            <input
              type="url"
              name="avatar_URL"
              value={user_data?.avatar_URL}
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
        </form>
      </div>
    );
};

export default page;
