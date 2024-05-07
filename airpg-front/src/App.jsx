import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [story, setStory] = useState("Click the button to generate a story...");

  const fetchStory = () => {
    fetch("http://localhost:3000")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.text();
      })
      .then(data => {
        console.log("Received data:", data);  // Ensure the data is as expected
        setStory(data);
      })
      .catch(err => {
        setStory("Failed to fetch story. " + err.message);
        console.error("Fetch error: ", err);
      });
  };
  

  return (
    <div style={styles.container}>
      <div style={styles.storyBox}>{story}</div>
      <button onClick={fetchStory} style={styles.button}>Generate Story</button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
  },
  storyBox: {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#fff",
    width: "80%",  // Increased width
    maxWidth: "800px",  // Fixed maximum width
    marginBottom: "20px",
    textAlign: "center",
    minHeight: "100px",
    display: "flex",
    flexDirection: "column",  // Align text to start vertically
    justifyContent: "center",
    alignItems: "center",
    color: "black",
    overflow: "auto"  // Allows the box to scroll if content overflows
  },
  
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007BFF",
    color: "white",
  }
};

export default App;