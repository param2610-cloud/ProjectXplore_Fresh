
import { signOut,getAuth } from "firebase/auth";
import {app} from '@/firebase'

export const LogOut: React.MouseEventHandler<HTMLButtonElement> =async  () => {
  const auth = getAuth(app)

    const user = auth.currentUser;
    console.log("user::",user)
    if (user) {
      try {
        await signOut(auth);
        console.log("User signed out successfully");
      } catch (error) {
          console.error("Error signing out:", error);
          console.log("Error occurred while logging out");
      }
    } else {
      console.error("User is already signed out");
    }
  };