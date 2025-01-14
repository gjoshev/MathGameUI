# MathGameUI

This project is a real-time math game application built using **React** for the frontend and **SignalR** for real-time communication. Players are presented with math questions and can submit answers to see if they're correct. The results are updated in real-time for all connected clients.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)

## Description

This is a simple real-time math game where:

- Players receive math questions via SignalR.
- They input their answers and submit them.
- The result is broadcasted to all connected clients with feedback on whether the answer was correct or not.
- New questions are automatically generated and sent to all clients once an answer is submitted.

## Features

- **Real-time Communication:** Uses **SignalR** to provide real-time updates for new questions and answer results.
- **Math Game Mechanics:** Displays math expressions and checks user answers.
- **Answer Validation:** Users' answers are validated, and feedback is given on whether they were correct or incorrect.
- **React Frontend:** The app uses React for the frontend to handle UI and state management efficiently.

## Technologies

- **Frontend:** React
  - React hooks (`useState`, `useEffect`, `useCallback`)
  - SignalR client integration for real-time communication

## Setup

### Prerequisites

To run this project, ensure you have the following installed:

- **Node.js** (for React app)

### Install Frontend Dependencies

1. Clone this repository
   
2. Install dependencies for the React app:

   ```bash
   npm install

3. Run the Frontend
Start the React development server:
  
   ```bash
    npm start
Open your browser and go to http://localhost:3000 to see the math game in action.
