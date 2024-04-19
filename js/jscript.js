// GitHub Personal Access Token
const accessToken = `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`;

// Get the form element for username input
const usernameForm = document.getElementById('usernameForm');
// Attach an event listener to the form
usernameForm.addEventListener('submit', handleSubmit);

// Function to fetch repositories for a given username
async function getRepositories(username) {
        // API URL for fetching repositories
        let url = `https://api.github.com/users/${username}/repos`;
        // Fetch repositories data from GitHub API
        const response = await fetch(url,{
            headers: {
                // Include the Personal Access Token in the request header for authorization
                Authorization: `token ${accessToken}`
            }
        }); // Await the fetch call

        if (!response.ok) {
            // Check if the response is successful
            throw new Error('User not found or rate limit exceeded');
        }
        return await response.json();
    }

// Function to display the list of repositories
function displayRepositories(repositories) {
    const repositoriesContainer = document.getElementById('repositories');
    // Generating HTML for displaying repositories
    repositoriesContainer.innerHTML = `
        <h2>Repositories</h2>
        <ul>
            ${repositories.map(repo => `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`).join('')}
        </ul>
    `;
}

// Function to handle form submission
async function handleSubmit(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the value entered in the username input field
    const username = document.getElementById('usernameInput').value;
    
    try {
        // fetch repositories for the entered username
        const repositories = await getRepositories(username);
        // Displaying the fetched repositories
        displayRepositories(repositories);
    } catch (error) {
        // If an error occurs, display the error message
        displayError(error.message);
    }
}

// Function to display error messages
function displayError(message) {
    // Get the container element for repositories
    const repositoriesContainer = document.getElementById('repositories');
    // Display the error message
    repositoriesContainer.innerHTML = `<p>Error: ${message}</p>`;
}