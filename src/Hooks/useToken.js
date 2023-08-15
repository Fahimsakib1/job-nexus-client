import { useEffect, useState } from "react"
import toast from "react-hot-toast";

const useToken = (email) => {
    const [token, setToken] = useState('');

    useEffect(() => {
        if (email) {
            console.log("Email From useToken", email)
            fetch(`https://job-nexus-server.vercel.app/jwt?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    if (data.accessToken) {
                        localStorage.setItem('JobNexusToken', data.accessToken);
                        setToken(data.accessToken);
                        console.log("Job Nexus Access Token", data.accessToken);
                        toast.success('Token Issued Successfully')
                    }
                    else {
                        toast.error('Token Not Issued')
                    }
                })
        }
    }, [email])
    return [token]
}

export default useToken; 