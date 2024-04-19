import React, { useState, useRef } from "react";
import "./Modal.css";
const Modal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [body, setBody] = useState("");
  const modalRef = useRef(null);

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
    console.log("Title:", title);
    console.log("Tags:", tags);
    console.log("Body:", body);

    onClose();
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  // Добавляем слушатель клика для закрытия модального окна при клике вне его области
  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div ref={modalRef} className="modal">
            
            <h2>Введите данные:</h2>
            <input
              type="text"
              placeholder="Заголовок"
              value={title}
              onChange={handleTitleChange}
            />
            <input
              type="text"
              placeholder="Теги"
              value={tags}
              onChange={handleTagsChange}
            />
            <textarea
              placeholder="Текст"
              value={body}
              onChange={handleBodyChange}
            />
            <button onClick={handleSubmit}>Отправить</button>
            <button className="close-button" onClick={onClose}>
              Отмена
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
