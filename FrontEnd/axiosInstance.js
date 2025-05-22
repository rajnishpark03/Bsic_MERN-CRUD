import axios from "axios";

export const bookBaseUrl=axios.create({
    baseURL:"https://basic-ufmt.onrender.com"
});
