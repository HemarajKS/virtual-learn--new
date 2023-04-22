import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBIE8bhbC7ULZI_QBz9OOFimSXMIAzw8H8",
  authDomain: "virtuallearn-user-ae45a.firebaseapp.com",
  projectId: "virtuallearn-user-ae45a",
  storageBucket: "virtuallearn-user-ae45a.appspot.com",
  messagingSenderId: "881700342599",
  appId: "1:881700342599:web:94851287b2be9d0fc65a62",
};

// Add the public key generated from the console here.
// Initialize Firebase

function requestPermission() {
  // console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      // console.log("Notification permission granted.");
      const app = initializeApp(firebaseConfig);

      // Initialize Firebase Cloud Messaging and get a reference to the service
      const messaging = getMessaging(app);
      getToken(messaging, {
        vapidKey:
          "BJ_hLk7qecMLDH6bxSzo5eiOE15HEG6ttFu0ujZfmlFxUCH5Wvf6CEUSxCz_JC-sIygRl31Hd8tNTmownv8oHsk",
      }).then((currentToken) => {
        if (currentToken) {
          console.log("Current token", currentToken);
        } else {
          console.log("Can't get token");
        }
      });
    } else {
      console.log("Permission Denied");
    }
  });
}


requestPermission();
