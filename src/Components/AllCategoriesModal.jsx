import React from "react";
import { userStore } from "../stores/UserStore";
import { useState } from "react";

function AllCategoriesModal({ isOpen, onClose, categories }) {
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [oldName, setOldName] = useState("");

  const token = userStore.getState().token;

  const handleChangeToName = (event) => {
    setCategoryName(event.target.value);
  };

  const handleChangeToOldName = (event) => {
    const selectedName = event.target.value;
    console.log("****Selected Name:" + selectedName);
    const selectedCategory = categories.find(
      (category) => category.name === selectedName
    );
    const id = selectedCategory.id;
    console.log("****Selected ID:" + id);
    setCategoryId(id);
    setOldName(selectedName);
  };

  const normalizeCategoryName = (name) => {
    const trimmedName = name.trim().replace(/\s+/g, "");
    const lowercaseName = trimmedName.toLowerCase();
    return lowercaseName.charAt(0).toUpperCase() + lowercaseName.slice(1);
  };

  const handleConfirm = () => {
    onConfirm(categoryName);
    setCategoryName("");
    setCategoryId("");
    onClose();
  };

  const handleClose = () => {
    setCategoryName("");
    setCategoryId("");
    onClose();
  };

  const handleConfirmDelete = () => {
    onDelete(oldName);
    setCategoryName("");
    setCategoryId("");
    onClose();
  };

  const onDelete = (oldName) => {
    if (oldName) {
      fetch(
        `http://localhost:8080/project4backend/rest/task/deleteCategory/${oldName}`,
        {
          method: "DELETE",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            token: token,
          },
        }
      ).then(function (response) {
        if (response.status === 401) {
          alert("Unauthorized");
        } else if (response.status === 404) {
          alert("Category not found");
        } else if (response.status === 409) {
          alert("Category has tasks and cannot be deleted");
        } else if (response.status === 200) {
          console.log("Category deleted successfully");
        }
      });
    }
  };

  const onConfirm = (categoryName) => {
    const formattedCategoryName = normalizeCategoryName(categoryName);
    if (formattedCategoryName === "") {
      alert("Category name cannot be empty");
    } else {
      fetch("http://localhost:8080/project4backend/rest/task/updateCategory", {
        method: "PUT",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({
          id: categoryId,
          name: formattedCategoryName,
        }),
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
      console.log("Category ID:" + categoryId);
    }
  };
  return (
    <>
      {isOpen && (
        <div className="overlay">
          <div className="modal">
            <h2 className="h2"> Edit/Delete Categories</h2>
            <label htmlFor="category" className="h2">
              Category:
            </label>
            <select
              id="category"
              defaultValue=""
              name="category"
              onChange={(event) => {
                handleChangeToOldName(event);
              }}
            >
              <option value="">Choose a category...</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Category Name"
              value={categoryName}
              onChange={handleChangeToName}
            />
            <div className="modal-buttons">
              <button className="button" onClick={handleConfirm}>
                Confirmar
              </button>
              <button className="button" onClick={handleConfirmDelete}>
                {" "}
                Delete selected category{" "}
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

export default AllCategoriesModal;
