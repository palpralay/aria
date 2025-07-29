import React, { Children, createContext } from "react";
import run from "../gemini";
export const dataContext = createContext();
import { useState } from "react";
const UserContext = ({ children }) => {
  let [speaking, setSpeaking] = useState(false);
  let [prompt, setPrompt] = useState("listening...");
  let [response, setResponse] = useState(false);

  // Function to speak text using the Web Speech API
  function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.volume = 1;
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.lang = "en-US, hi-IN, bn-IN";
    window.speechSynthesis.speak(text_speak);
  }

  let speechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = new speechRecognition();

  recognition.onresult = (e) => {
    let transcript = e.results[0][0].transcript;
    console.log("Transcript: ", transcript);
    setPrompt(transcript);
    aiResponse(transcript);
    setResponse(true);
    setTimeout(() => {
      setSpeaking(false);
    }, 3000);
    takeCommand(transcript);
    getCurrentTime(transcript);
  };

  function takeCommand(command) {
    if (command.includes("open") || command.includes("launch")) {
      let appName = command.split(" ")[1];
      if (appName) {
        window.open(`https://www.${appName}.com`, "_blank");
        return `Opening ${appName} for you.`;
      } else if (command.includes("what is your name")) {
        return "My name is ARIA.";
      }
    }
  }

  //real time and date
  function getCurrentTime() {
    let date = new Date();
    let hours = date.getHours().toString().padStart(2, "0");
    let minutes = date.getMinutes().toString().padStart(2, "0");
    return `The current time is ${hours}:${minutes}`;
  }

  async function aiResponse(prompt) {
    let text = await run(prompt);
    console.log("AI Response: ", text);

    let newText =
      text.split("**") &&
      text.split("**") &&
      text.replace("google", "praloy") &&
      text.replace("Google", "praloy");

    console.log("AI Response: ", text);
    setPrompt(newText);
    console.log("AI Response: ", newText);
    speak(newText);
  }

  let value = {
    speak,
    recognition,
    setSpeaking,
    speaking,
    prompt,
    setPrompt,
    response,
    setResponse,
  };
  return (
    <div>
      <dataContext.Provider value={value}>{children}</dataContext.Provider>
    </div>
  );
};

export default UserContext;
