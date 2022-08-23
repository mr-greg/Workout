import { useState } from "react";
import { useAuthContext } from './useAuthContext';

// changé le nom du hook en useLogin ici
export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    // changé signup par login
    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        // l'endpoint changé le signup par login aussi
        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update the auth context
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
        }
    }

    // on return login au lieu de signup
    return { login, isLoading, error }
}