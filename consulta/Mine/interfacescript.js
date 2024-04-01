//Listener para quando todas as acções de quando a página carrega

window.onload = function () {
  //Obtém o username e password da localStorage
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");
  //Vai buscar o elemento que mostra o username
  getUserData(username);
  //Chama a função para mostrar a foto de perfil
  getPhotoUrl(username, password);
  displayDateTime(); // Adiciona a exibição da data e hora
  setInterval(displayDateTime, 1000); // Atualiza a cada segundo
  //Chama a função para obter as tarefas
  gettasks();
};

//Obtem o botão Add Task
const addTaskButton = document.getElementById("addTaskButton");
//Obtem a modal para adicionar uma nova tarefa
const newTaskModal = document.getElementById("newTaskModal");
//Obtem o botao para cancelar a adição de uma nova tarefa
const cancelButtonAddTaskModal = document.getElementById("cancelTaskButton");
//taskAreas To do, Doing, Done
const todoSection = document.getElementById("todo");
const doingSection = document.getElementById("doing");
const doneSection = document.getElementById("done");
//Obtem o modal de aviso de delete
const deleteWarning = document.getElementById("deleteWarning");
//Obtem os 2 botões do avisos de delete
const yesButton = document.getElementById("yesButtonDelete");
const noButton = document.getElementById("noButtonDelete");
//Obtem o popup menu que aparece com o click direito
const contextMenu = document.getElementById("contextMenu");
//Obtem a opcao de deconste do popup menu
const deleteTaskOption = document.getElementById("deleteTask");
//Obtem a opcao de editar do popup menu
const editTaskOption = document.getElementById("editTask");
//Obtem a modal que mostra os detalhes da tarefa
const taskDetailsModal = document.getElementById("taskDetailsModal");
//Obtem o label para o titulo da tarefa
const modalTaskTitle = document.getElementById("taskTitleinfo");
//Obtem o label para a descrição da tarefa
const modalTaskDescription = document.getElementById("taskDescriptioninfo");
//Obtem o botão para fechar a modal de detalhes da tarefa
const modalOkButton = document.getElementById("modalOkButton");
//Obtem o warning modal
const warningModal = document.getElementById("warningModal");
//Obtem o botão de ok do warning modal
const okButton = document.getElementById("modalWarningOkButton");
//Obtem o titulo e descrição do modal de adicionar uma nova tarefa
const taskTitle = document.getElementById("taskTitle").value;
const taskDescription = document.getElementById("taskDescription").value;
//Obtem o botão de logout
const botaoLogout = document.getElementById("logoutButton");
//Obtem a div que mostra a data e hora
const dateTimeDisplay = document.getElementById("dateTimeDisplay");

//Permite que uma tarefa seja largada sobre as secções
todoSection.addEventListener("drop", drop);
doingSection.addEventListener("drop", drop);
doneSection.addEventListener("drop", drop);

//Listener para quando se clica na em qualquer sitio da página
window.addEventListener("click", function (event) {
  //Se o popup menu estiver aberto e se clicar fora do popup menu, o popup menu é fechado
  if (contextMenu.style.display === "block") {
    contextMenu.style.display = "none";
  }
});
//Função que faz logout
async function logout() {
  const headers = new Headers();
  headers.append("username", localStorage.getItem("username"));
  headers.append("Content-Type", "application/json");
  await fetch("http://localhost:8080/backEnd/rest/users/logout", {
    method: "GET",
    headers: headers,
  }).then(async function (response) {
    if (response.status == 200) {
      localStorage.clear();
      sessionStorage.clear();
      //Redireciona para a página de login
      window.location.href = "index.html";
    } else if (response.status == 404) {
      alert("user not found.");
    } else alert(response.status);
  });
}

//Listener para quando o botão de logout é clicado
botaoLogout.addEventListener("click", logout);

//Listener para quando o botão de editar perfil é clicado
document
  .getElementById("editProfileButton")
  .addEventListener("click", function () {
    window.location.href = "editProfilePage.html";
  });

//Listener para quando o botão Add Task é clicado
addTaskButton.addEventListener("click", function () {
  //Limpas os campos de input da modal
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDescription").value = "";
  document.getElementById("editTaskPriority").value = "";
  document.getElementById("initialDate").value = "";
  document.getElementById("finalDate").value = "";

  //Mostra a modal
  newTaskModal.style.display = "block";
  //Escurece o fundo da página
  document.body.classList.add("modal-open");
});

//Listener para quando o botão de cancelar da modal de adicionar uma nova tarefa é clicado
cancelButtonAddTaskModal.addEventListener("click", function () {
  //Fecha a modal
  newTaskModal.style.display = "none";
  //Remove o escurecimento do fundo da página
  document.body.classList.remove("modal-open");
});

//Previne o comportamento padrão do browser quando o cursor é arrastado sobre as secções
todoSection.addEventListener("dragover", function (event) {
  event.preventDefault();
});
doingSection.addEventListener("dragover", function (event) {
  event.preventDefault();
});
doneSection.addEventListener("dragover", function (event) {
  event.preventDefault();
});

//Listener para quando o botão de adicionar uma nova tarefa é clicado
submitTaskButton.addEventListener("click", async function () {
  // Vai buscar os valores dos inputs do titulo, descrição e prioridade da tarefa e guarda-os nas variáveis titulo, descricao e priority
  const titulo = document.getElementById("taskTitle").value;
  const descricao = document.getElementById("taskDescription").value;
  const priority = document.getElementById("editTaskPriority").value;
  const inicalDate = document.getElementById("initialDate").value;
  let finalDate = document.getElementById("finalDate").value;
  if (inicalDate === "") {
    dateError.style.display = "block";
  } else if (finalDate === "") {
    finalDate = "2199-12-31";
  }

  dateErrorPriority.style.display = "none";
  if (titulo === "" || descricao === "") {
    //Mostra o modal de aviso
    warningModal.style.display = "block";
    //Adiciona o escurecimento do fundo da página
    document.getElementById("modalOverlay2").style.display = "block";
  } else if (finalDate < inicalDate) {
    dateError.style.display = "block";
  } else if (priority === "") {
    dateErrorPriority.style.display = "block";
  } else {
    let priorityupdate;
    if (priority == "low") {
      priorityupdate = 100;
    } else if (priority == "medium") {
      priorityupdate = 200;
    } else {
      priorityupdate = 300;
    }
    const task = {
      title: titulo,
      description: descricao,
      priority: priorityupdate,
      initialDate: inicalDate,
      finalDate: finalDate,
    };
    const headers = new Headers();
    headers.append("username", localStorage.getItem("username"));
    headers.append("password", localStorage.getItem("password"));
    headers.append("Content-Type", "application/json");
    await fetch("http://localhost:8080/backEnd/rest/users/addTask", {
      method: "POST",
      headers: headers,

      body: JSON.stringify(task),
    }).then(async function (response) {
      if (response.status == 403) {
        alert("Acess Denied");
      } else if (response.status == 200) {
        createTaskElements(gettasks());
        //Fecha a modal
        newTaskModal.style.display = "none";
        //Remove o escurecimento do fundo da página
        document.body.classList.remove("modal-open");
      }
    });
  }
});
//Função que vai buscar as tarefas do user
async function gettasks() {
  let user = {
    username: localStorage.getItem("username"),
    password: localStorage.getItem("password"),
  };
  const headers = new Headers();
  headers.append("username", user.username);
  headers.append("password", user.password);
  headers.append("Content-Type", "application/json");

  await fetch("http://localhost:8080/backEnd/rest/users/tasks", {
    method: "GET",
    headers: headers,
  }).then(async function (response) {
    if (response.status == 403) {
      alert("Acess Denied");
    } else if (response.status == 200) {
      const tasks = await response.json();
      displayTasks(tasks);
    }
  });
}

//Listener para quando o botão de "Yes" do deleteWarning modal é clicado
yesButton.addEventListener("click", async function () {
  // Close the deleteWarning modal and remove the background overlay
  deleteWarning.style.display = "none";
  document.body.classList.remove("modal-open");
  //Obtem o identificador da tarefa que foi guardado no atributo data-task-id do deleteWarning modal
  const taskId = deleteWarning.getAttribute("data-task-id");
  //Vai buscar o username e a password da localStorage
  let userUsado = {
    username: localStorage.getItem("username"),
    password: localStorage.getItem("password"),
  };
  const headerss = new Headers();
  headerss.append("username", userUsado.username);
  headerss.append("password", userUsado.password);
  headerss.append("id", taskId);
  headerss.append("Content-Type", "application/json");
  await fetch("http://localhost:8080/backEnd/rest/users/getTask", {
    method: "GET",
    headers: headerss,
  }).then(async function (response) {
    if (response.status == 403) {
      alert("Acess Denied");
    } else if (response.status == 404) {
      alert("Task not found");
    } else if (response.status == 200) {
      const taskMoved = await response.json();
      deleteTask(taskMoved);
    }
  });
});
//Listener para quando o botão de "No" do deleteWarning modal é clicado
noButton.addEventListener("click", function () {
  //Esconde o deleteWarning modal e remove o escurecimento do fundo da página
  deleteWarning.style.display = "none";
  document.body.classList.remove("modal-open");
});
//Listener para quando o botão de "Delete" do popup menu é clicado
deleteTaskOption.addEventListener("click", () => {
  //Esconde o popup menu
  contextMenu.style.display = "none";
  //Obtem o identificador da tarefa que foi guardado no atributo data-task-id do popup menu
  const taskId = contextMenu.getAttribute("data-task-id");
  //Guarda o identificador da tarefa no atributo data-task-id do deleteWarning modal
  deleteWarning.setAttribute("data-task-id", taskId);
  //Mostra o deleteWarning modal e escurece o fundo da página
  deleteWarning.style.display = "block";
  document.body.classList.add("modal-open");
});
//Listener para quando o botão de "Edit" do popup menu é clicado
editTaskOption.addEventListener("click", async () => {
  //Esconde o popup menu
  contextMenu.style.display = "none";
  //Obtem o identificador da tarefa que foi guardado no atributo data-task-id do popup menu
  const taskId = contextMenu.getAttribute("data-task-id");
  sessionStorage.setItem("taskToEdite", taskId);
  //Redireciona para a página de editar tarefa
  window.location.href = "editTaskPage.html";
});
//Listener para quando o botão de "Ok" do modal de detalhes da tarefa é clicado
modalOkButton.addEventListener("click", function () {
  //Esconde o modal de detalhes da tarefa e remove o escurecimento do fundo da página
  taskDetailsModal.style.display = "none";
  document.body.classList.remove("modal-open");
});
//Listener para quando o botão de "Ok" do modal de aviso é clicado
okButton.addEventListener("click", function () {
  //Esconde o modal de aviso e remove o escurecimento do fundo da página
  warningModal.style.display = "none";
  //Remove o escurecimento do fundo da página
  document.getElementById("modalOverlay2").style.display = "none";
});
//Função que define o que acontece quando uma tarefa é largada sobre um determinado elemento
async function drop(event) {
  //Evita o comportamento padrão do browser
  event.preventDefault();
  const taskID = event.dataTransfer.getData("data_id");
  const taskElement = document.getElementById(taskID);
  let userUsado = {
    username: localStorage.getItem("username"),
    password: localStorage.getItem("password"),
  };
  const headerss = new Headers();
  headerss.append("username", userUsado.username);
  headerss.append("password", userUsado.password);
  headerss.append("id", taskID);
  headerss.append("Content-Type", "application/json");
  await fetch("http://localhost:8080/backEnd/rest/users/getTask", {
    method: "GET",
    headers: headerss,
  }).then(async function (response) {
    if (response.status == 403) {
      alert("Acess Denied");
    } else if (response.status == 404) {
      alert("Task not found");
    } else if (response.status == 200) {
      const taskMoved = await response.json();

      let targetSection = event.target;

      if (targetSection.id === "todo") {
        taskMoved.status = 100;
        targetSection.appendChild(taskElement);
      } else if (targetSection.id === "doing") {
        taskMoved.status = 200;
        targetSection.appendChild(taskElement);
      } else if (targetSection.id === "done") {
        taskMoved.status = 300;
        targetSection.appendChild(taskElement);
      }
      updateStatusTask(taskMoved); //Atualiza o status da tarefa
      gettasks(); //Vai buscar as tarefas
    }
  });
}
//Função que atualiza o status da tarefa
async function updateStatusTask(task) {
  let username = localStorage.getItem("username");
  let password = localStorage.getItem("password");

  const headers = new Headers();
  headers.append("username", username);
  headers.append("password", password);
  headers.append("id", task.id);
  headers.append("Content-Type", "application/json");

  const taskkk = {
    title: task.title,
    description: task.description,
    id: task.id,
    priority: task.priority,
    status: task.status,
    initialDate: task.initialDate,
    finalDate: task.finalDate,
  };

  await fetch(`http://localhost:8080/backEnd/rest/users/task/update`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(taskkk),
  }).then(function (response) {
    if (response.status == 403) {
      console.log(user.username);
      alert("Acess Denied");
    } else if (response.status == 404) {
      alert("Task not found");
    } else if (response.status == 200) {
      console.log("Task updated");
    }
  });
}

//Função que imprime as tarefas nas secções correspondentes
function displayTasks(tasks) {
  //Limpa todas as secções de tarefas
  todoSection.innerHTML = "";
  doingSection.innerHTML = "";
  doneSection.innerHTML = "";

  //Função que cria um elemento para uma tarefa na secção correspondente
  createTaskElements(tasks);
}
//Função que cria o elemento (div) para uma tarefa na secção correspondente
function createTaskElements(tasksArray) {
  let todoTasksContainer = document.getElementById("todo");
  let doingTasksContainer = document.getElementById("doing");
  let doneTasksContainer = document.getElementById("done");

  for (let i = 0; i < tasksArray.length; i++) {
    const task = tasksArray[i];

    const taskElement = document.createElement("div");
    taskElement.setAttribute("id", task.id);
    taskElement.style.margin = "5px 10px"; // Update the margin property to make the rectangle less tall
    taskElement.classList.add("task");

    if (task.priority == 100) {
      taskElement.style.backgroundColor = "#5cbf8a"; // Dark green
    } else if (task.priority == 200) {
      taskElement.style.backgroundColor = "#d4d17a"; // Darker yellow
    } else if (task.priority == 300) {
      taskElement.style.backgroundColor = "#f58a8a"; // Dark red
    }

    taskElement.innerHTML = `
    <h3 title="${task.title}">${task.title}</h3>
`;

    taskElement.setAttribute("draggable", "true");

    //Adiciona um listener para quando o elemento div é clicado com o botão direito
    taskElement.addEventListener("contextmenu", (e) => {
      //Previnir o comportamento padrão do browser
      e.preventDefault();
      //Faz com que o popup menu apareça no local onde o botão direito do rato foi clicado
      contextMenu.style.top = `${e.pageY}px`;
      contextMenu.style.left = `${e.pageX}px`;
      //Guarda o identificador e a prioridade da tarefa
      contextMenu.setAttribute("data-task-id", task.id);
      //Guarda o identificador da tarefa no sessionStorage
      sessionStorage.setItem("taskID", task.id);
      //Mostra o popup menu
      contextMenu.style.display = "block";
    });

    taskElement.addEventListener("dragstart", function (event) {
      event.dataTransfer.setData("data_id", event.target.id);
    });

    //Adiciona um listener para quando o elemento div é clicado duas vezes
    taskElement.addEventListener("dblclick", function () {
      //Coloca no modal os detalhes da tarefa o titulo, a descrição, a data inicial e a data final
      modalTaskTitle.textContent = task.title;
      modalTaskDescription.textContent = task.description;
      console.log(task.initialDate);
      document.getElementById("taskInitialDateinfo").textContent =
        task.initialDate;
      console.log(task.finalDate);
      if (task.finalDate === "2199-12-31") {
        task.finalDate = "No final date";
      }
      document.getElementById("taskFinalDateinfo").textContent = task.finalDate;

      //Mostra o modal escurecendo o fundo da página
      taskDetailsModal.style.display = "block";
      document.body.classList.add("modal-open");
    });
    //Adiciona o elemento div à secção correspondente
    if (task.status == 100) {
      todoTasksContainer.appendChild(taskElement);
    } else if (task.status == 200) {
      doingTasksContainer.appendChild(taskElement);
    } else if (task.status == 300) {
      doneTasksContainer.appendChild(taskElement);
    }
  }
}
//Função que apaga uma tarefa
async function deleteTask(task) {
  let username = localStorage.getItem("username");
  let password = localStorage.getItem("password");

  const headers = new Headers();
  headers.append("username", username);
  headers.append("password", password);
  headers.append("id", task.id);
  headers.append("Content-Type", "application/json");

  await fetch(`http://localhost:8080/backEnd/rest/users/deleteTask`, {
    method: "DELETE",
    headers: headers,
  }).then(function (response) {
    if (response.status == 403) {
      console.log(user.username);
      alert("Acess Denied");
    } else if (response.status == 404) {
      alert("Task not found");
    } else if (response.status == 200) {
      console.log("task deleted");
      gettasks();
    }
  });
}

//Função que mostra a data e hora
function displayDateTime() {
  const currentDate = new Date();

  //Formata a data e hora
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };
  const dateTimeString = currentDate.toLocaleDateString("en-US", options);

  // Atualiza o conteúdo do elemento
  dateTimeDisplay.textContent = dateTimeString;
}

//Função que vai buscar a foto de perfil do utilizador
async function getPhotoUrl(username, password) {
  let photoUrlRequest = "http://localhost:8080/backEnd/rest/users/profilePhoto";

  try {
    const response = await fetch(photoUrlRequest, {
      method: "GET",
      headers: {
        "Content-Type": "application/JSON",
        Accept: "application/JSON",
        username: username,
        password: password,
      },
    });

    if (response.status == 200) {
      const data = await response.text();
      document.getElementById("userIcon").src = data;
    } else if (response.status === 403) {
      alert("Acess Denied");
    } else if (response.status === 404) {
      alert("User not found");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong");
  }
}
async function getUserData(username) {
  let user = {
    username: username,
  };

  const headers = new Headers();
  headers.append("username", user.username);

  await fetch("http://localhost:8080/backEnd/rest/users/getUser", {
    method: "GET",
    headers: headers,
  })
    .then(async function (response) {
      if (response.status == 404) {
        alert("User not found");
      } else if (response.status == 200) {
        const userData = await response.json();
        console.log(userData);
        document.getElementById("displayUsername").textContent =
          userData.firstName;
      }
    })
    .catch(function (error) {
      console.error("Error fetching user information:", error);
    });
}
