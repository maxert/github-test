import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export function showAxiosError(error: unknown, fallbackMessage = 'Something went wrong') {
    const axiosError = error as AxiosError<{ message: string }>;

    if (axiosError?.response?.data?.message) {
        toast.error(axiosError.response.data.message);
    } else {
        toast.error(fallbackMessage);
    }
}
