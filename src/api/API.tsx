const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const searchGithub = async () => {
  try {
    if (!TOKEN) {
      throw new Error("GitHub API token is missing! Check your .env file.");
    }

    const start = Math.floor(Math.random() * 100000000) + 1;
    const response = await fetch(`https://api.github.com/users?since=${start}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API Error: ${response.status} - ${response.statusText}`);
    }

    return await response.json();
  } catch (err) {
    console.error("An error occurred while fetching GitHub users:", err);
    return [];
  }
};

const searchGithubUser = async (username: string) => {
  try {
    if (!TOKEN) {
      throw new Error("GitHub API token is missing! Check your .env file.");
    }

    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API Error: ${response.status} - ${response.statusText}`);
    }

    return await response.json();
  } catch (err) {
    console.error(`An error occurred while fetching GitHub user ${username}:`, err);
    return {};
  }
};

export { searchGithub, searchGithubUser };
