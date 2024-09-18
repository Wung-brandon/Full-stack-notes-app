import React from 'react'
import EmailIcon from '@mui/icons-material/Email';
import useNoteDetails from '../customHook/NoteDetailsHook';
import { useParams } from 'react-router-dom';

function NotesDetail() {


    const {noteId} = useParams()
    // const url = `http://127.0.0.1:8000/api/note/${id}`
   
    // console.log("id", id)
    // const { noteDetails } = useNoteDetails(`http://127.0.0.1:8000/api/note/detail/${noteId}/`);

    const url = noteId ? `http://127.0.0.1:8000/api/note/detail/${noteId}/` : null;
    const {noteDetails, error} = useNoteDetails(url)
    console.log(noteDetails)

    if (error) {
        return <div>Error: {error}</div>;
    }
    
    if (!noteDetails) {
        return <div>Loading...</div>;
    }

  return (
    <div style={{minHeight: "100vh"}}>
    <div>
        <div className="container">
            <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-12 mt-4">
                    <div className="rounded shadow bg-white p-4" style={{ backgroundColor: "#eed202", color: "black" }}>
                        <h2>{noteDetails.title}</h2>
                        <span>{noteDetails.created_at}</span>
                        <p>{noteDetails.body}</p>
                        <EmailIcon sx={{ color: "#ffff00", fontSize: 40 }} /> <span className='h4'>{noteDetails.category}</span>
                    </div>
                </div> 
            </div>
        </div>
    </div>
</div>
  )

}

export default NotesDetail