import api from '@/services/api';
import { ApiResponse } from '@/types/api-response';
import {GithubRepository} from "@/types/github-repository";

export const searchRepositories = async (query: string): Promise<GithubRepository[]> => {
    const { data } = await api.get<ApiResponse<GithubRepository[]>>(`/search/repositories?q=${encodeURIComponent(query)}`);
    return data.data;
};
