import React, { useEffect, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";

const App = () => {
  const [connection, setConnection] = useState(null);
  const [results, setResults] = useState([]); // Store results and questions
  const [userAnswer, setUserAnswer] = useState(null); // Track user's answer for the current question

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:5168/gamehub") // Adjust the URL based on your backend
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log("Connected to SignalR");

          connection.on("NewQuestion", (newQuestion) => {
            setResults((prev) => [
              ...prev,
              { expression: newQuestion.expression, correctAnswer: newQuestion.correctAnswer, userAnswer: null, isCorrect: null }
            ]);
            setUserAnswer(null); // Reset user's current answer
          });

          connection.on("ReceiveResult", (result) => {
            // Update the result for the corresponding question
            setResults((prevResults) =>
              prevResults.map((item, index) =>
                index === prevResults.length - 1
                  ? { ...item, isCorrect: result.isCorrect, userAnswer: result.userAnswer }
                  : item
              )
            );
          });
        })
        .catch((error) => console.error("Connection failed: ", error));
    }
  }, [connection]);

  const handleAnswer = (isYes) => {
    setUserAnswer(isYes ? "Yes" : "No"); // Track user's choice
    
    const currentResult = results[results.length - 1];

    // Extract the proposed answer from the expression (the value after the "=" sign)
    const proposedAnswer = parseFloat(currentResult.expression.split("=")[1].trim());

    // Compare the proposed answer directly with the correct answer
    const isCorrect = proposedAnswer === currentResult.correctAnswer;

    // Submit the answer to the server (pass the player's answer and their decision)
    connection
      .invoke("SubmitAnswer", "Player", currentResult.correctAnswer, proposedAnswer, isYes, isCorrect)
      .catch((err) => console.error("SubmitAnswer Error: ", err));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Math Game</h1>

      <div>
        <h2>Results:</h2>
        <table border="1" style={{ width: "100%", marginTop: "20px" }}>
          <thead>
            <tr>
              <th>Expression</th>
              <th>Your Answer</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td>{result.expression}</td> {/* Display the current math expression */}
                <td>
                  {/* Display the Yes/No buttons for each new question */}
                  {result.userAnswer === null ? (
                    <>
                      <button onClick={() => handleAnswer(true)}>Yes</button>
                      <button onClick={() => handleAnswer(false)}>No</button>
                    </>
                  ) : (
                    result.userAnswer
                  )}
                </td>
                <td>
                  {/* Handle all combinations for result display */}
                  {result.isCorrect === null
                    ? "Waiting for Answer"
                    : (result.isCorrect === true && result.userAnswer === "Yes") || 
                      (result.isCorrect === false && result.userAnswer === "No")
                    ? "OK"
                    : "FAILED"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
