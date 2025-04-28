import axios from 'axios';

export const githubApi = {
  async getRepoData(owner: string, repo: string) {
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}`);
    return response.data;
  },

  searchRepositories: async (query: string) => {
    const response = await axios.get('https://api.github.com/search/repositories', {
      params: { q: query },
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    });
    return response.data.items;
  }
};
