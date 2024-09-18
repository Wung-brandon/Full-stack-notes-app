import React, { useState, useEffect } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import { Link, useParams } from 'react-router-dom';
import useAxios from '../utils/useAxios';

function NoteCard() {
    const [notes, setNotes] = useState([]);

    const axiosInstance = useAxios()

    const fetchNotes = async () => {
        const response = await axiosInstance.get("/note/");
        console.log("Fetching notes", response.data)
        setNotes(response.data);
    }

    useEffect(() => {
        fetchNotes();
    }, []);

    // useAxios.get("/note/").then((res) => setNotes(res.data))
    return (
        <div style={{minHeight: "100vh"}}>
            <div>
                <div className="container">
                    <div className="row">
                        {notes.map((n, i) => (
                            <Link to={`details/${n.id}`} className="col-lg-4 col-md-6 col-sm-12 mt-4 text-decoration-none" key={i}>
                                <div>
                                    <div className="rounded shadow bg-white p-4" style={{ backgroundColor: "#eed202", color: "black" }}>
                                        <h2>{n.title}</h2>
                                        <span>{n.created_at}</span>
                                        <p>{n.body}</p>
                                        <EmailIcon sx={{ color: "#ffff00", fontSize: 40 }} /> <span className='h4'>{n.category}</span>
                                    </div>
                                </div>
                            </Link>

                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NoteCard;
