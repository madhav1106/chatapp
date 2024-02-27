import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const login = async (inputs) => {
        const validate = validations(inputs);
        if(!validate) return;

        setLoading(true);
        try {
            const res = await fetch('/api/auth/login', {
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
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }

    return {loading, login}
}

export default useLogin

const validations = ({username, password}) => {
    if(!username || !password) {
        toast.error('Plese fill all the fields')
        return false;
    }

    return true;
}