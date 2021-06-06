import { useContext } from 'react';
import { AuthContext } from './context';

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('Context usage outside of AuthProvider');
    }
    return context;
}