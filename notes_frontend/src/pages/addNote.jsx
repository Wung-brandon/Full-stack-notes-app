import React from 'react';
import NoteForm from '../components/form.component';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAxios from '../utils/useAxios';

function AddNote() {
    const navigate = useNavigate();
    const axiosInstance = useAxios()

    async function handleAddNote(note) {
        try {
            // Retrieve the auth token from localStorage
            const tokenString = localStorage.getItem("authTokens");
            const token = tokenString ? JSON.parse(tokenString) : null;

                // Check if token and access token are available
                const accessToken = token ? token.access : null;

            // Make sure the token is available
            if (accessToken) {
                          // Send the note data with the authentication token in the headers
            const response = await axiosInstance.post("/note/", note, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }

            });
            Swal.fire({
                title: "Note Added Successfully!",
                toast: true,
                icon: "success",
                timer: 5000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false
            });
            navigate("/");

            console.log("data", response.data);
                
            }
            else{
                throw new Error("No authentication token found");
            }
  

        } catch (error) {
            console.log(error);
            const errorMessage = error.response && error.response.data && error.response.data.detail
                ? error.response.data.detail
                : error.message;
            console.log(errorMessage);
            Swal.fire({
                title: "An error occurred: " + errorMessage,
                toast: true,
                icon: "error",
                timer: 5000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false
            });
        }
    }

    return (
        <div>
            <NoteForm 
                title="Add New Note"
                buttonText="Add Note"
                onSubmit={handleAddNote}
            />
        </div>
    );
}

export default AddNote;
