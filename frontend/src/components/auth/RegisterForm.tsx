'use client';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '@/validations/auth.validation';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import {AxiosError} from "axios";

interface RegisterFormValues {
    email: string;
    password: string;
    confirmPassword: string;
}

const RegisterForm = () => {
    const { register: registerUser } = useAuth();
    const router = useRouter();
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: yupResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormValues) => {
        try {
            await registerUser(data.email, data.password);
            router.push('/projects');
        } catch (error) {
            const axiosError = error as AxiosError<{ message: string }>;
            alert(axiosError?.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 4, width: '100%', maxWidth: 400, mx: 'auto' }}>
            <Typography variant="h5" component="h1" gutterBottom>
                Register
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

            <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Confirm Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                    />
                )}
            />

            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Register
            </Button>
        </Box>
    );
};

export default RegisterForm;
