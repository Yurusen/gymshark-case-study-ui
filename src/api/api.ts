import axios from 'axios';

const api = axios.create({
    baseURL: "https://gymshark-case-study-production.up.railway.app",
    headers: {
        "Content-Type": "application/json",
    }
})

export const postData = async (data: any) => {
    const response = await api.post("/calculate", data);
    return response.data;
}
