import React, { useState, useRef, useEffect } from "react";
import "./Modal.css";
const Modal = ({ isOpen, onClose, Method, isEdit, Task }) => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [body, setBody] = useState("");
  const [_id, setId] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isEdit) {
      setTitle(Task.title);
      setBody(Task.body);
      setTags(Task.tags);
      setId(Task._id);
    }
  }, [isEdit, Task]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTagsChange = (e) => {
    setTags(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleSubmit = () => {
    const task = { _id, title, body, tags };
    let fetchUrl = "/api/tasks";
    if (isEdit) {
      fetchUrl = "/api/tasks/" + _id;
    }
    fetch(fetchUrl, {
      method: Method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    }).then(() => console.log("Task added"));

    onClose();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div className='modal-overlay'>
          <div ref={modalRef} className='modal'>
            <h2>Введите данные:</h2>
            <input
              type='text'
              placeholder='Заголовок'
              value={title}
              onChange={handleTitleChange}
            />
            <input
              type='text'
              placeholder='Теги'
              value={tags}
              onChange={handleTagsChange}
            />
            <textarea
              placeholder='Текст'
              value={body}
              onChange={handleBodyChange}
            />
            <button onClick={handleSubmit}>Отправить</button>
            <button className='close-button' onClick={onClose}>
              Отмена
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
