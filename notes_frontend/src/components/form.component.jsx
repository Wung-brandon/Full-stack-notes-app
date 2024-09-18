import React from 'react';
import { useState } from 'react';

function NoteForm({ title, buttonText, initialTitle, initialContent, initialCategory, onSubmit }) {
  const [noteTitle, setNoteTitle] = useState(initialTitle || '');
  const [noteContent, setNoteContent] = useState(initialContent || '');
  const [noteCategory, setNoteCategory] = useState(initialCategory || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title: noteTitle,
      body: noteContent,
      category: noteCategory,
    });
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#c0c0c0" }}>
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="shadow rounded bg-light p-4" style={{ width: '100%', maxWidth: '600px' }}>
          <form onSubmit={handleSubmit}>
            <h5>{title}</h5>
            <div className="mb-3">
              <label htmlFor="titleInput" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="titleInput"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                placeholder="Enter note's title"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="contentTextarea" className="form-label">
                Content
              </label>
              <textarea
                className="form-control"
                id="contentTextarea"
                rows={4}
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Enter note's content"
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="categorySelect" className="form-label">
                Note's category
              </label>
              <select
                className="form-select"
                id="categorySelect"
                value={noteCategory}
                onChange={(e) => setNoteCategory(e.target.value)}
                style={{ height: "40px" }}
              >
                <option value="">Pick a category</option>
                <option value="BUSINESS">BUSINESS</option>
                <option value="PERSONAL">PERSONAL</option>
                <option value="IMPORTANT">IMPORTANT</option>
              </select>
            </div>

            <button className="btn btn-primary d-flex justify-content-center" style={{ width: "100%" }}>
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default NoteForm;
