const accessToken = `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`;
const usernameForm = document.getElementById('usernameForm');
usernameForm.addEventListener('submit', handleSubmit);

async function getRepositories(username) {
        let url = `https://api.github.com/users/${username}/repos`;
        const response = await fetch(url,{
            headers: {
                Authorization: `token ${accessToken}`
            }
        }); // Await the fetch call
        if (!response.ok) {
            throw new Error('User not found or rate limit exceeded');
        }
        return await response.json();
    }

function displayRepositories(repositories) {
    const repositoriesContainer = document.getElementById('repositories');
    repositoriesContainer.innerHTML = `
        <h2>Repositories</h2>
        <ul>
            ${repositories.map(repo => `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`).join('')}
        </ul>
    `;
}
async function handleSubmit(event) {
    event.preventDefault();
    const username = document.getElementById('usernameInput').value;
    
    try {
        const repositories = await getRepositories(username);
        displayRepositories(repositories);
    } catch (error) {
        displayError(error.message);
    }
}
function displayError(message) {
    const repositoriesContainer = document.getElementById('repositories');
    repositoriesContainer.innerHTML = `<p>Error: ${message}</p>`;
}