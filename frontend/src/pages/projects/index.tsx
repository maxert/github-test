import PrivateRoute from '@/components/common/PrivateRoute';
import ProjectList from '@/components/projects/ProjectList';

export default function ProjectsPage() {
    return (
        <PrivateRoute>
            <ProjectList />
        </PrivateRoute>
    );
}
