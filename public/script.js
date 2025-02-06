// Function to handle question submission
function submitQuestion() {
    // Get the user input
    const userInput = document.getElementById('userInput').value;
  
    // Validate user input
    if (!userInput) {
      alert('Please enter a question');
      return;
    }
  
    // Send request to the Node.js backend API
    fetch('http://localhost:3000/process', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: userInput }), // Send user input as JSON
    })
    .then(response => response.json())
    .then(data => {
      // Display the response from the backend
      document.getElementById('responseText').innerText = data.response || 'No response received.';
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('responseText').innerText = 'Error: Could not fetch response.';
    });
  }
  