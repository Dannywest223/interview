# interview

Project Overview
A full-stack project with a frontend and backend where users can input questions, and the backend fetches real-time answers using a web scraping API (SerpAPI). The backend is built with Node.js, and the frontend is a static HTML, CSS, and JavaScript interface.

Setup Instructions
Backend
Clone the repository and navigate to the project folder:

bash
Copy
git clone <repository-url>
cd <project-folder>
Install dependencies:

bash
Copy
npm install
Create a .env file with your API key:

ini
Copy
SERPAPI_API_KEY=<your-serp-api-key>
Start the server:

bash
Copy
node server.js
The backend will run on http://localhost:3000.

Frontend
The frontend is served by the backend. Once the backend is running, you can access it on http://localhost:3000.

Deployment
Deploy the backend on Render or another platform (e.g., render).
The frontend is served from the backend itself, so once deployed, it will be accessible from the same URL.
Dependencies
express
cors
axios
dotenv
Install with:

bash
Copy
npm install express cors axios dotenv
API Usage
Endpoint: POST /process
Request: { "text": "<query>" }
Response: { "response": "<fetched answer>" }
Push to GitHub
After setting up the project, push the code to GitHub:

bash
Copy
git add .
git commit -m "Initial commit"
git push origin main
