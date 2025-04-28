import { AuthProvider } from '@/contexts/AuthContext';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '@/components/layout/Header';
import { CssBaseline, Container } from '@mui/material';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <>
                <CssBaseline />
                <Header />
                <Container sx={{ mt: 4 }}>
                    <Component {...pageProps} />
                </Container>
                <ToastContainer position="top-right" autoClose={3000} />
            </>
        </AuthProvider>
    );
}
