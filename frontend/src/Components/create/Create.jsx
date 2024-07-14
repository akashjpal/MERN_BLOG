import React, { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import useAuthStatus from "../../hooks/auth/useAuthStatus";
import { useNavigate } from "react-router-dom";
import "./Create.css";

export default function Create() {
  const [value, setValue] = useState("**Hello world!!!**");
  const [showInput, setShowInput] = useState(false);
  const [predictionQuery, setPredictionQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { state } = useAuthStatus();

  useEffect(() => {
    const handleKeyUp = (e) => {
      if (value.endsWith("//")) {
        setShowInput(true);
      }
    };
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [value]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: value, UId: state.userId }),
      });
      console.log(res);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    console.log(value);
  }

  async function handlePrediction() {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question:
            `Content: ${value}\n${predictionQuery}. 
            Strictly remember to give the content in markdown format only. 
            Remember the following points: 
            1. If it is grammar check or sentence organization then just give the correct sentence. 
            2. If it is full article generation then give the title and the detailed article. 
            3. If it is image generation then give the title and the detailed image description.`.replace("//", ""),
        }),
      });
      const data = await res.json();

      setValue(`${data.data.answer}`);
      if (
        predictionQuery.includes("grammar") ||
        predictionQuery.includes("grammar check") ||
        predictionQuery.includes("grammatical")
      ) {
        alert("Grammar check completed successfully");
      }

      if (
        predictionQuery.includes("sentence organization") ||
        predictionQuery.includes("sentence") || predictionQuery.includes("organization") || predictionQuery.includes("organize")
      ) {
        alert("Sentence organization completed successfully");
      }

      setShowInput(false);
      setPredictionQuery("");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container">
      <div>
        <div>
          <button
            type="button"
            className="back-btn"
            onClick={() => navigate("/")}
          >
            Back
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <button className="submit-btn" type="submit">
          Submit
        </button>
        <MDEditor
          className="editor"
          height={600}
          value={value}
          onChange={setValue}
        />
      </form>

      {showInput && (
        <div className="floating-input">
          <textarea
            rows="4"
            value={predictionQuery}
            onChange={(e) => setPredictionQuery(e.target.value)}
            placeholder="Ask for grammar check, sentence organization, full article generation, or image generation..."
          />
          <button onClick={handlePrediction} disabled={isLoading}>
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </div>
      )}
    </div>
  );
}
