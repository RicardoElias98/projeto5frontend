import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "../general.css";
import { userStore } from "../stores/UserStore";
import CategoryModal from "./CategoryModal";
import AllCategoriesModal from "./AllCategoriesModal";
import { categoriesStore } from "../stores/CategoriesStore";
import { useNavigate } from "react-router-dom";
import translations from "../Translation/translation";


function AsideAddTask() {
  const token = userStore.getState().token;
  const [categories, setCategories] = useState([]);
  const updateCategories = categoriesStore((state) => state.updateCategories);
  const fullUsers = userStore.getState().allUsers;
  const updateSelectedCategory = categoriesStore(
    (state) => state.updateSelectedCategory
  );
  const updateUserSelected = userStore((state) => state.updateUserSelected);
  const categorySelected = categoriesStore((state) => state.selectedCategory);
  const selectedUser = userStore((state) => state.userSelected);
  const counter = userStore((state) => state.counter);

  const updateCounter = userStore((state) => state.updateCounter);
  const role = userStore.getState().loginUser.role;
  const navigate = useNavigate();
  const language = userStore((state) => state.language);
  const {taskName, taskDescription, category, chooseACategory, priority, chooseAPrority, low ,medium ,high ,initialDate ,finalDate ,addTask ,addCategory ,editDelet,Category ,filterByCategory, filterByUser, chooseAnUser
  } = translations[language];

  useEffect(() => {
    getAllCategories();
    console.log("categorias");
  }, []);
  const priorityMapping = {
    Low: 100,
    Medium: 200,
    High: 300,
  };

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isAllCategoriesModalOpen, setIsAllCategoriesModalOpen] =
    useState(false);

  const handleOpenCategoryModal = () => {
    setIsCategoryModalOpen(true);
  };

  const handleCloseCategoryModal = () => {
    setIsCategoryModalOpen(false);
  };

  const handleOpenAllCategoriesModal = () => {
    setIsAllCategoriesModalOpen(true);
  };

  const handleCloseAllCategoriesModal = () => {
    setIsAllCategoriesModalOpen(false);
  };


  const getAllCategories = () => {
    fetch("http://localhost:8080/projecto5backend/rest/task/allCategories", {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        token: token,
      },
    }).then(async function (response) {
      if (response.status === 401) {
        alert("Unauthorized");
      } else if (response.status === 200) {
        const categoriesData = await response.json();
        console.log('as');
        setCategories(categoriesData);
        updateCategories(categoriesData);
      } else if (response.status === 403) {
        alert("Token timer expired, please login again.");
        navigate("/goBackInitialPage", { replace: true });
      }
    });
  };

  const [formData, setFormData] = useState({
    taskName: "",
    taskDescription: "",
    category: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    const task = {
      title: formData.taskName,
      description: formData.taskDescription,
      priority: priorityMapping[formData.priority] || "Unknow",
      startDate: formData.startDate,
      endDate: formData.endDate,
      category: formData.category,
    };
    console.log("PRIORITY:" + task.priority);
    event.preventDefault();
    if (task.startDate > task.endDate) {
      alert("The initial date must be before the final date");
      return;
    } else if (
      task.title === "" ||
      task.description === "" ||
      task.category === "" ||
      task.startDate === "" ||
      task.endDate === ""
    ) {
      alert("All elements are required");
      return;
    } else {
      fetch("http://localhost:8080/projecto5backend/rest/task/add", {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(task),
      }).then(async function (response) {
        if (response.status === 401) {
          alert("Unauthorized");
        } else if (response.status === 403) {
          alert("Token timer expired, please login again.");
          navigate("/goBackInitialPage", { replace: true });
        } else if (response.status === 400) {
          alert("All elements are required");
        } else if (response.status === 201) {
          setFormData({
            taskName: "",
            taskDescription: "",
            category: "",
            startDate: "",
            endDate: "",
          });
          updateCounter(counter + 1);
        }
      });
    }
  };


  const handleChangeFilter = (event) => {
    const selectedCategory = event.target.value;
    updateSelectedCategory(selectedCategory === "" ? "" : selectedCategory);
  };

  const handleChangeFilterUser = (event) => {
    const selectedUser = event.target.value;
    updateUserSelected(selectedUser === "" ? "" : selectedUser);
  };

  return (
    <div>
      {" "}
      <form onSubmit={handleSubmit}>
        <label htmlFor="taskName">{taskName}</label>
        <input
          type="text"
          id="taskName"
          name="taskName"
          defaultValue=""
          onChange={handleChange}
        />
        <label htmlFor="taskDescription">{taskDescription}:</label>
        <input
          type="text"
          id="taskDescription"
          name="taskDescription"
          defaultValue=""
          onChange={handleChange}
        />
        <label htmlFor="category">{category}</label>
        <select
          id="category"
          defaultValue=""
          name="category"
          onChange={handleChange}
        >
          <option value="">{chooseACategory}</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <label htmlFor="priority">{priority}</label>
        <select
          id="priority"
          defaultValue=""
          name="priority"
          onChange={handleChange}
        >
          <option value="">{chooseAPrority}</option>
          <option value="Low">{low} &#x1F7E2;</option>
          <option value="Medium">{medium} &#x1F7E1; </option>
          <option value="High">{high} &#x1F534; </option>
        </select>
        <label htmlFor="startDate">{initialDate}</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          defaultValue=""
          onChange={handleChange}
        />
        <label htmlFor="endDate">{finalDate}</label>
        <input
          type="date"
          id="endDate"
          defaultValue=""
          name="endDate"
          onChange={handleChange}
        />

        <button className="button" type="submit">
          {" "}
          {addTask}
        </button>
      </form>
      {role === "Owner" && (
        <>
          <button className="button" onClick={handleOpenCategoryModal}>
            {addCategory}
          </button>
          <CategoryModal
            isOpen={isCategoryModalOpen}
            onClose={handleCloseCategoryModal}
            setCategories={setCategories}
          />
          <button className="button" onClick={handleOpenAllCategoriesModal}>
            {editDelet}
          </button>
          <AllCategoriesModal
            isOpen={isAllCategoriesModalOpen}
            onClose={handleCloseAllCategoriesModal}
            categories={categories}
          />
        </>
      )}
      {(role === "Owner" || role === "user") && (
        <>
          <label htmlFor="category">{filterByCategory}</label>
          <select
            id="categoryFilter"
            defaultValue={categorySelected}
            name="categoryFilter"
            onChange={handleChangeFilter}
          >
            <option value="">{chooseACategory}</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <label htmlFor="user">{filterByUser}</label>
          <select
            id="userFilter"
            defaultValue={selectedUser}
            name="userFilter"
            onChange={handleChangeFilterUser}
          >
            <option value="">{chooseAnUser}</option>
            {fullUsers.map((user) => (
              <option key={user.username} value={user.username}>
                {user.username}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
}

export default AsideAddTask;
