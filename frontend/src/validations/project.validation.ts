import * as yup from 'yup';

export const createProjectSchema = yup.object({
    path: yup
        .string()
        .required('Repository path is required')
        .matches(/^[^\/]+\/[^\/]+$/, 'Path must be in format "owner/repo"'),
});
