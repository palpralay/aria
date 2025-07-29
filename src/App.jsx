import "./App.css";
import { FaMicrophone } from "react-icons/fa6";
import ai2 from "./assets/ai2.png";
import loading from "./assets/speak.gif";
import aiVoice from "./assets/aiVoice.gif";
import { useContext } from "react";
import { dataContext } from "./component/UserContext";


const App = () => {
  let {
    recognition,
    setSpeaking,
    speaking,
    prompt,
    setPrompt,
    setResponse,
    response,
  } = useContext(dataContext);

  return (
    <div className="main">
      <img src={ai2} alt="AI" id="jarvis" className={speaking ? "glow" : ""} />
      <span>Hi, I'm Aria, your AI assistant.</span>

      {!speaking ? (
        <button
          onClick={() => {
            setPrompt("listening...");
            setSpeaking(true);
            recognition.start();
            setResponse(false);
          }}
        >
          <FaMicrophone />
        </button>
      ) : (
        <div className="listening">
          {!response ? (
            <img src={aiVoice} id="aiVoice" />
          ) : (
            <img src={loading} id="loading" />
          )}

          <p>{prompt}</p>
        </div>
      )}
    </div>
  );
};

export default App;
