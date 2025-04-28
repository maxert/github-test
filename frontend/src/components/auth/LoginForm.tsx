'use client';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/validations/auth.validation';
import { TextField, Button, Typography, Box, Link } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import {AxiosError} from "axios";

interface LoginFormValues {
    email: string;
    password: string;
}

const LoginForm = () => {
    const { login } = useAuth();
    const router = useRouter();
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormValues) => {
        try {
            await login(data.email, data.password);
            router.push('/projects');
        } catch (error) {
            const axiosError = error as AxiosError<{ message: string }>;
            alert(axiosError?.response?.data?.message || 'Login failed');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 4, width: '100%', maxWidth: 400, mx: 'auto' }}>
            <Typography variant="h5" component="h1" gutterBottom>
                Login
            </Typography>

            <Controller
                name="email"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                )}
            />

            <Controller
                name="password"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                )}
            />

            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Login
            </Button>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Link href="/auth/register">
                    <Button variant="text">Don&apos;t have an account? Register</Button>
                </Link>
            </Box>
        </Box>
    );
};

export default LoginForm;
