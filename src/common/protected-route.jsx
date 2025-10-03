import { Routes, Route, Navigate } from 'react-router-dom';
import Admin from '../components/admin/admin';

const ProtectedRoute = ({to, authenticated, element}) => {
    if(!authenticated) return <Navigate to={to}/> 
    return (
        <Routes>
            <Route path="/*" element={element} />
        </Routes>
    )
}

export default ProtectedRoute;