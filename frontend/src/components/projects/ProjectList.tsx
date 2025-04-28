import ProjectForm from './ProjectForm';
import {Typography, Box, Card, CardContent, Button, CircularProgress, Stack} from '@mui/material';
import {useEffect, useState} from 'react';
import {Project} from '@/types/project';
import {ApiResponse} from '@/types/api-response';
import api from '@/services/api';
import {toast} from 'react-toastify';
import {useRouter} from 'next/router';
import {useAuth} from '@/contexts/AuthContext';
import {showAxiosError} from "@/utils/showAxiosError";

const ProjectList = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState<number | null>(null);
    const [deleting, setDeleting] = useState<number | null>(null);
    const router = useRouter();
    const {user, loading: authLoading} = useAuth();

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/auth/login');
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (user) {
            fetchProjects();
        }
    }, [user]);

    const fetchProjects = async () => {
        try {
            const {data} = await api.get<ApiResponse<Project[]>>('/projects');
            setProjects(data.data);
        } catch (error) {
            console.error(error);
            showAxiosError(error, 'Failed to fetch projects');
        } finally {
            setLoading(false);
        }
    };

    const handleProjectCreated = (newProject: Project) => {
        setProjects((prev) => [newProject, ...prev]);
    };

    const handleUpdate = async (projectId: number) => {
        setUpdating(projectId);
        try {
            const {data} = await api.put<ApiResponse<Project>>(`/projects/${projectId}`);
            setProjects((prev) =>
                prev.map((project) => (project.id === projectId ? data.data : project)),
            );
            toast.success('Project updated successfully!');
        } catch (error) {
            console.error('Failed to update project', error);
            showAxiosError(error, 'Failed to update project');
        } finally {
            setUpdating(null);
        }
    };

    const handleDelete = async (projectId: number) => {
        setDeleting(projectId);
        try {
            await api.delete(`/projects/${projectId}`);
            setProjects((prev) => prev.filter((project) => project.id !== projectId));
            toast.success('Project deleted successfully!');
        } catch (error) {
            console.error('Failed to delete project', error);
            showAxiosError(error, 'Failed to delete project');
        } finally {
            setDeleting(null);
        }
    };


    return (
        <Box sx={{mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2}}>
            <ProjectForm onProjectCreated={handleProjectCreated}/>

            {loading ? (
                <Box sx={{mt: 4, textAlign: 'center'}}>
                    <CircularProgress/>
                </Box>
            ) : projects.length === 0 ? (
                <Typography variant="h6" textAlign="center">
                    No projects found.
                </Typography>
            ) : projects.map((project) => (
                <Card key={project.id}>
                    <CardContent>
                        <Typography variant="h6">{project.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            Owner: {project.owner}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Stars: {project.stars} | Forks: {project.forks} | Issues: {project.issues}
                        </Typography>

                        <Stack direction="row" spacing={2} sx={{mt: 2}}>
                            <Button
                                size="small"
                                variant="outlined"
                                onClick={() => handleUpdate(project.id)}
                                disabled={updating === project.id}
                            >
                                {updating === project.id ? 'Updating...' : 'Update'}
                            </Button>

                            <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                onClick={() => handleDelete(project.id)}
                                disabled={deleting === project.id}
                            >
                                {deleting === project.id ? 'Deleting...' : 'Delete'}
                            </Button>

                            <Button
                                size="small"
                                variant="contained"
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                GitHub
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default ProjectList;
