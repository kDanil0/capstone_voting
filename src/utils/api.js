    import axios from "axios";

    // Base URL configuration
    export const BASE_URL = "http://127.0.0.1:8000/";

    // Create Axios instance with custom configuration
    export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    withCredentials: false, // If you need to send cookies or other credentials with requests
    // timeout: 10000, // Optional: to set a timeout for requests
  });

    export const registerUser = async (formData) => {
        try {
        const response = await axiosInstance.post('/api/register', formData);
        return response.data.data;  // return the API response
        } catch (error) {
        console.error("Error during registration:", error.response);
        return error.response.data;  // throw the error response for handling in the component
        }
    };



// Document related endpoints
    export const documentAPI = {
        upload: (token, formData) => axiosInstance.post('/api/documents/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
        }).then(res => res.data),

        getStatus: (token) => axiosInstance.get('/api/documents/status', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => res.data),
    };


    //new web login that uses student id and email, if student id is not found, then register the user
    //if student id is found, then send the OTP to the email 
    export const loginUser = async (formData) => {
        try {
            const response = await axiosInstance.post('/api/web-login', formData);
            return {
                success: true,
                user: response.data.data.user,
                message: response.data.message
            };
        } catch (error) {
            console.error("Error during login:", error);
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
            const statusCode = error.response?.status;
            
            return {
                success: false,
                message: errorMessage,
                statusCode
            };
        }
    };

    export const verifyUser = async ({ code, email, student_id }) => {
        try {
            const response = await axiosInstance.post("/api/verifyOTP", {
                student_id: student_id,
                tokenOTP: code
            });

            return {
                success: true,
                access_token: response.data.data.access_token,
                token_type: response.data.data.token_type,
                message: response.data.message
            };
        } catch (error) {
            console.error("Error during OTP verification:", error);
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
            const statusCode = error.response?.status;
            
            return {
                success: false,
                message: errorMessage,
                statusCode
            };
        }
    };

    export const logoutUser = async (token) => {
        try {
            const response = await axiosInstance.post('/api/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data; 
        } catch (error) {
            console.error("Error logging out", error);
            throw error.response ? error.response.data : error; 
        }
    };

    export const getUser = async (token) => {
        try {
            const response = await axiosInstance.get('/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });
            console.log("Raw API Response:", response.data); // Debug log
            return response.data; // Return the direct response since it's already the user object
        } catch (error) {
            console.error("Error fetching user data:", error);
            throw error.response ? error.response.data : error;
        }
    };

    export const getDepartments = async () => {
        try{
            const response = await axiosInstance.get('/api/getDepartments');
            console.log(response.data.departments)
            return response.data.departments;
        }catch{
            console.error("Error fetching department data:", error);
            throw error
        }
    }

    export const getAllElections = async (token) => {
        try{
            const response = await axiosInstance.get('/api/elections', {
                headers: {
                Authorization: `Bearer ${token}`, 
                },
            });
            return response.data;
        }catch{
            console.error("Error fetching elections", error);
            throw error
        }
    }

    export const getAllRegistered = async (token) => {
        try{
            const response = await axiosInstance.get('/api/election/registered', {
                headers: {
                Authorization: `Bearer ${token}`, 
                },
            });
            return response.data;
        }catch{
            console.error("Error fetching registered voters", error);
            throw error
        }
    }

    export const getElectionById = async (token, id) => {
        try{
            const response = await axiosInstance.get(`/api/elections/${id}`, {
                headers: {
                Authorization: `Bearer ${token}`, 
                },
            });
            return response.data;
        }catch{
            console.error("Error fetching election details", error);
            throw error
        }
    }

    export const getAllCandidates = async () => {
        try{
            const response = await axiosInstance.get(`/api/candidates/all`);
            console.log('reached function')
            return response.data;
        }catch{
            console.error("Error fetching candidates details", error);
            throw error
        }
    }
    export const getAllCandidatesByDepartment = async (id) => {
        try{
            const response = await axiosInstance.get(`/api/candidates/by-department/${id}`);
            console.log('reached function')
            return response.data;
        }catch{
            console.error("Error fetching candidates details", error);
            throw error
        }
    }

    export const getAllPositions = async () => {
        try{
            const response = await axiosInstance.get(`/api/positions/all`,);
            console.log('reached function')
            return response.data;
        }catch{
            console.error("Error fetching candidates details", error);
            throw error
        }
    }


    export const getMakeElection = async (token, formData) => {
        try {
          const response = await axiosInstance.post('/api/elections/make', formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
          return response.data.data; // Return the data from the response if successful
        } catch (error) {
          // Check if the error has a response object (e.g., server responded with a status code)
          if (error.response) {
            console.error("Error during election creation:", error.response);
            return { success: false, message: error.response.data.message || 'An error occurred during election creation' };
          } else {
            // If no response (e.g., network error), handle it here
            console.error("Network or other error:", error);
            return { success: false, message: 'A network error occurred. Please try again later.' };
          }
        }
      };

    //register -> provide student_id, name, department, email, contact, -> unique id

