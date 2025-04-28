// src/utils/is-public-route.ts

import { PUBLIC_ROUTES } from '@/config/publicRoutes';

export const isPublicRoute = (path: string): boolean => {
    return PUBLIC_ROUTES.some((prefix) => path.startsWith(prefix));
};
