'use client';

import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, Button, Box, CircularProgress, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { createProjectSchema } from '@/validations/project.validation';
import api from '@/services/api';
import { searchRepositories } from '@/services/search';
import { debounce } from 'lodash';
import { showAxiosError } from '@/utils/showAxiosError';
import { ApiResponse } from '@/types/api-response';
import { Project } from '@/types/project';

interface ProjectFormProps {
    onProjectCreated: (project: Project) => void;
}

interface CreateProjectFormValues {
    path: string;
}

const ProjectForm = ({ onProjectCreated }: ProjectFormProps) => {
    const {
        handleSubmit,
        control,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<CreateProjectFormValues>({
        resolver: yupResolver(createProjectSchema),
    });

    const [repos, setRepos] = useState<{ full_name: string; html_url: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const cacheRef = useRef<Map<string, { full_name: string; html_url: string }[]>>(new Map());
    const autocompleteRef = useRef<HTMLDivElement>(null);

    const query = watch('path');

    const handleSearch = debounce(async (searchText: string) => {
        if (!searchText?.trim()) {
            setRepos([]);
            return;
        }

        // Кеширование
        if (cacheRef.current.has(searchText)) {
            setRepos(cacheRef.current.get(searchText)!);
            return;
        }

        try {
            setLoading(true);
            const results = await searchRepositories(searchText);
            const mapped = results.map(repo => ({
                full_name: repo.full_name,
                html_url: repo.html_url,
            }));

            cacheRef.current.set(searchText, mapped);
            setRepos(mapped);
        } catch (error) {
            console.error('Failed to search repositories', error);
        } finally {
            setLoading(false);
        }
    }, 500);

    useEffect(() => {
        if (typeof query === 'string' && query.length > 0) {
            handleSearch(query);
        }
    }, [query]);

    // Клик вне списка — закрытие
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (autocompleteRef.current && !autocompleteRef.current.contains(event.target as Node)) {
                setRepos([]);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const onSubmit = async (data: CreateProjectFormValues) => {
        try {
            const response = await api.post<ApiResponse<Project>>('/projects', data);
            onProjectCreated(response.data.data);
            reset();
            toast.success('Project added successfully!');
            setRepos([]);
            handleSearch.cancel();
        } catch (error) {
            console.error('Failed to create project', error);
            showAxiosError(error, 'Failed to add project');
        }
    };

    const handleSelectRepo = (fullName: string) => {
        setValue('path', fullName, { shouldValidate: true });
        setRepos([]);
        handleSearch.cancel();
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mb: 4, display: 'flex', gap: 2, flexDirection: 'column', maxWidth: 400, minWidth: 300, mx: 'auto' }}
        >
            <Controller
                name="path"
                control={control}
                render={({ field }) => (
                    <div style={{ position: 'relative' }}>
                        <TextField
                            {...field}
                            label="Repository path (e.g. facebook/react)"
                            error={!!errors.path}
                            helperText={errors.path?.message}
                            fullWidth
                        />
                        {loading && (
                            <CircularProgress
                                size={24}
                                sx={{ position: 'absolute', top: '50%', right: 10, marginTop: '-12px' }}
                            />
                        )}
                    </div>
                )}
            />

            {repos.length > 0 && (
                <div ref={autocompleteRef}>
                    <List sx={{
                        bgcolor: 'background.paper',
                        border: '1px solid #ccc',
                        borderRadius: 1,
                        position: 'absolute',
                        zIndex: 10,
                        width: '100%',
                        maxWidth: 400,
                        maxHeight: 250,
                        overflowY: 'auto',
                    }}>
                        {repos.map((repo) => (
                            <ListItem key={repo.full_name} disablePadding>
                                <ListItemButton onClick={() => handleSelectRepo(repo.full_name)}>
                                    <ListItemText primary={repo.full_name} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </div>
            )}

            <Button type="submit" variant="contained" color="primary" fullWidth>
                Add Project
            </Button>
        </Box>
    );
};

export default ProjectForm;
