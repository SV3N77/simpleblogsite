import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAXNG_IPYcexZoo09-SZhWqMrLsnO7SEv4",
  authDomain: "simpleblogsite-64287.firebaseapp.com",
  projectId: "simpleblogsite-64287",
  storageBucket: "simpleblogsite-64287.appspot.com",
  messagingSenderId: "347125099073",
  appId: "1:347125099073:web:e2b6c537b3fc0dce4db4c0",
  measurementId: "G-SH94DHTHHW",
};

initializeApp(firebaseConfig);

const storage = getStorage();

export { storage };
