import React, { useState } from "react";
import "../general.css";
import { userStore } from "../stores/UserStore";

function CategoryModal({ isOpen, onClose }) {
  const [categoryName, setCategoryName] = useState("");
  const token = userStore.getState().token;

  const handleChange = (event) => {
    setCategoryName(event.target.value);
  };

  const normalizeCategoryName = (name) => {
    const trimmedName = name.trim().replace(/\s+/g, "");
    const lowercaseName = trimmedName.toLowerCase();
    return lowercaseName.charAt(0).toUpperCase() + lowercaseName.slice(1);
  };

  const onConfirm = (categoryName) => {
    const formattedCategoryName = normalizeCategoryName(categoryName);
    if (formattedCategoryName === "") {
      alert("Category name cannot be empty");
    } else {
      fetch("http://localhost:8080/project4backend/rest/task/createCategory", {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({ name: formattedCategoryName }),
      })
        .then(async function (response) {
          if (response.status === 401) {
            alert("Unauthorized");
          } else if (response.status === 409) {
            alert("Category already exists");
          } else if (response.status === 200) {
            console.log("Category added successfully");
          }
        })
        .catch((error) => {
          console.error("Error adding category:", error);
        });
      console.log("Category Name:", categoryName);
    }
  };

  const handleConfirm = () => {
    onConfirm(categoryName);
    setCategoryName("");
    onClose();
  };

  const handleClose = () => {
    setCategoryName("");
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="overlay">
          <div className="modal">
            <h2 className="h2">Add Category</h2>
            <input
              type="text"
              placeholder="Category Name"
              value={categoryName}
              onChange={handleChange}
            />
            <div className="modal-buttons">
              <button className="button" onClick={handleConfirm}>
                Confirmar
              </button>
              <button className="button" onClick={handleClose}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CategoryModal;
