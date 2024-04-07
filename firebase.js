import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDEmrYcQDYSFI7rO31GrZwnC73326jhlQ8",
  authDomain: "projectxplore.firebaseapp.com",
  projectId: "projectxplore",
  storageBucket: "projectxplore.appspot.com",
  messagingSenderId: "534536790819",
  appId: "1:534536790819:web:6e04277aa25c68a346e296",
  measurementId: "G-KDVQ7C008M"

  };
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)

  export{ app, auth }