import { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signup = async (inputs) => {
        const validate = validations(inputs);
        if(!validate) return;
        
        setLoading(true);
        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(inputs)
            });

            const data = await res.json();
            if(data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem('app-user', JSON.stringify(data));
            setAuthUser(data);            
        } catch(error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return {loading, signup}
}

export default useSignup

const validations = ({fullname, username, password, confirmPassword, gender}) => {
    if(!fullname || !username || !password || !confirmPassword || !gender) {
        toast.error('Plese fill all the fields');
        return false;
    }

    if(password !== confirmPassword) {
        toast.error('Password do not match');
        return false;
    }

    if(password.length < 6) {
        toast.error('Password must be a 6 characters');
        return false;
    }

    return true;
}