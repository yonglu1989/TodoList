"use strict";
class taskItem {
    constructor(title, description, dueDate, priority) {
        this.title = title,
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    static compare(a, b) {
        if (a.priority > b.priority) {
            return 1;
        }
        else if (b.priority > a.priority) {
            return -1;
        }
        else {
            return 0;
        }
    }

    update(newtitle, newdesc, newdate, newpriority) {
        this.title = newtitle;
        this.description = newdesc;
        this.dueDate = newdate;
        this.priority = newpriority;
    }

}


class ProjectList {
    constructor(name) {
        this.taskArray = [];
        this.name = name;
    }

    addTask = (title, description, dueDate, priority) => {
        this.taskArray.push(new taskItem(title, description, dueDate, priority));
    }

    getName() {
        return this.name;
    }
}

class Model {
    constructor() {
        this.listofProjects = [];

        //initial projects for testing, remove later
        const defaultproj = new ProjectList("DefaultList");
        defaultproj.addTask("def", "def", "def", 1);
        this.listofProjects.push(defaultproj);
        // console.log(this.listofProjects);

    }

    bindProjectListChanged(callback) {
        this.onProjectsChanged = callback;
    }

    addProject(name) {
        let bnewName = true;
        for(let i = 0; i < this.listofProjects.length; i++) {
            if (name == this.listofProjects[i].name) {
                bnewName = false;
            }
        }
        if (bnewName) {
            let newProject = new ProjectList(name);
            this.listofProjects.push(newProject);
            this.onProjectsChanged(this.names);
        }
    }

    get names() {
        let projectnames = [];
        for(let i = 0; i < this.listofProjects.length; i++) {
            projectnames.push(this.listofProjects[i].name);
        }
        return projectnames;
    }
}

class View {
    constructor() {
        this.body = document.body;
        this.sideMenu = document.createElement("div");
        // projectsContainer will contain user created projects.
        this.projectsContainer = document.createElement("div");
        this.projectsContainer.id = "projectsContainer";

        // Projects: submit and cancel button
        this.addProjectSubmit = document.createElement("div");
        this.addProjectCancel = document.createElement("div");
        this.addProjectSubmit.textContent = "Submit";
        this.addProjectCancel.textContent = "Cancel";
        this.addProjectSubmit.id = "addProjectSubmit";
        this.addProjectCancel.id = "addProjectCancel";
        
        this.tasksListingTitle = document.createElement("h1");
        this.tasksListingTitle.textContent = "Today";

        this.tasksContainer = document.createElement("div");
        this.tasks = document.createElement("div");
        this.tasks.id = "tasks";

        this.generateStaticElements();
        this.initializeDynamicElements();
    }

    addGlobalEventListener(type, selector, callback) {
        document.addEventListener(type, e => {
            if(e.target.matches(selector)) callback(e);
        });
    }

    generateStaticElements() {
        // Header
        const heading = document.createElement("header");
        const headingText = document.createElement("h1");
        headingText.textContent = "TodoList";
        heading.classList.add("heading");
        heading.append(headingText);
        this.body.appendChild(heading);

        // Main container: includes this.sideMenu and tasks.
        const mainContainer = document.createElement("div");

        mainContainer.classList.add("maincontainer");
        this.sideMenu.classList.add("sideMenu");
        this.tasksContainer.classList.add("tasksContainer");

        // Side Menu Items: Today, This Week.
        const today = document.createElement("div");
        today.textContent = "Today";
        today.id = "today";

        const week = document.createElement("div");
        week.textContent = "Week";
        week.id = "week";

        const todayWeekContainer = document.createElement("div");
        todayWeekContainer.classList.add("todayWeekContainer");
        todayWeekContainer.appendChild(today);
        todayWeekContainer.appendChild(week);
        this.sideMenu.appendChild(todayWeekContainer);

        // Side Menu Items: Project
        const project = document.createElement("div");
        project.textContent = "Projects";
        project.id = "project";
        this.sideMenu.appendChild(project);

        // Tasks
        this.tasksContainer.append(this.tasksListingTitle, this.tasks);

        
        // Appending this.sideMenu and tasks into maincontainer. maincontainer appended into body.
        mainContainer.appendChild(this.sideMenu);
        mainContainer.appendChild(this.tasksContainer);
        this.body.appendChild(mainContainer);
    }

    initializeDynamicElements() {

        // Add Project form
        const addProjectForm = document.createElement("form");
        addProjectForm.id = "addProjectForm";

        const addProjectInput = document.createElement("input");
        addProjectInput.type = "text";
        addProjectInput.placeholder = "Project Name";
        addProjectInput.id = "addProjectInput";

        const addCancelContainer = document.createElement("div");
        addCancelContainer.classList.add("addCancelContainer");

        addCancelContainer.append(this.addProjectSubmit, this.addProjectCancel);
        addProjectForm.append(addProjectInput, addCancelContainer);
        
        // Submit button event listener: add project to projectsContainer

        // addProjectsButton
        this.addProjectButton = document.createElement("div");
        this.addProjectButton.id = "addProjectButton";
        this.addProjectButton.textContent = "Add Project";
        this.addProjectButton.addEventListener('click', () => {
            
        });

        this.sideMenu.append(this.projectsContainer, this.addProjectButton, addProjectForm);
    }



    displayProjects(projects) {
        // empty out current projects container.
        while(this.projectsContainer.firstChild != null) {
            this.projectsContainer.removeChild(this.projectsContainer.firstChild);
        }

        //populate with updated projects list.
        for(let i = 0; i < projects.length; i++) {
            const newProject = document.createElement("div");
            newProject.innerText = projects[i];
            newProject.classList.add("project");
            // console.log(projects[i].taskArray);
            // newProject.addEventListener('click', (e)=> {
            //     let projtasks = projects[i].taskArray;
            //     this.displayTasks(projtasks);
            // });
            this.projectsContainer.append(newProject);
        }
    }

    displayTasks(tasks) {
        while(this.tasks.firstChild != null) {
            this.tasks.removeChild(this.tasks.firstChild);
        }

        for(let i = 0; i < tasks.length; i++) {
            const task = document.createElement("task");
            task.classList.add("task");
            task.innerHTML = tasks[i].title;
            this.tasks.append(task);
        }
    }

    bindAddNewProject(handle) {
        this.addProjectSubmit.addEventListener('click', () => {
            const projectName = document.querySelector("#addProjectInput").value;
            if (projectName < 1) {
                alert("Please enter a project name.");
            }
            else {
                handle(projectName);
            }
        });
    }

    bindDisplayTasks(handle) {
        this.sideMenu.addEventListener('click', event => {
            console.log(event.target.innerText);
            if(event.target.className === 'project') {
                handle(event.target.innerText);
                this.tasksListingTitle.innerText = event.target.innerText;
            }
        });
    }
}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // console.log(this.model.names)
        this.view.displayProjects(this.model.names);

        // Handle bindings in View
        this.view.bindAddNewProject(this.handleAddProject);
        this.view.bindDisplayTasks(this.handleDisplayTasks);

        // Callback binding in Model (ProjectList)
        this.model.bindProjectListChanged(this.onProjectsListChanged);
    }



    onProjectsListChanged = (projects) => {
        this.view.displayProjects(projects);
    }

    handleAddProject = (name) => {
        this.model.addProject(name);
    }

    onTasksChanged = (tasks) => {
        this.view.displayTasks(tasks);
    }

    handleDisplayTasks = (name) => {
        let tasks = [];
        for(let i = 0; i < this.model.listofProjects.length; i++) {
            if(name === this.model.listofProjects[i].name) {
                tasks = this.model.listofProjects[i].taskArray;
            }
        }
        this.onTasksChanged(tasks);
    };

    handleAddTask = (project, desc) => {
        
    }
}


const app = new Controller(new Model(), new View());

