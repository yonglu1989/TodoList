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

    get title() {
        return this.title;
    }

    get description() {
        return this.description;
    }

    get dueDate() {
        return this.dueDate;
    }

    get priority() {
        return this.priority;
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
}

class Model {
    
}

class View {
    constructor() {
        this.body = document.body;
        this.generateStaticElements();
    }

    generateStaticElements() {
        // Header
        const heading = document.createElement("header");
        const headingText = document.createElement("h1");
        headingText.textContent = "TodoList";
        heading.classList.add("heading");
        heading.append(headingText);
        this.body.appendChild(heading);

        // Main container: includes sideMenu and tasks.
        const mainContainer = document.createElement("div");
        const sideMenu = document.createElement("div");
        const tasks = document.createElement("div");

        mainContainer.classList.add("maincontainer");
        sideMenu.classList.add("sideMenu");
        tasks.classList.add("tasks");

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
        sideMenu.appendChild(todayWeekContainer);

        // Side Menu Items: Project
        const project = document.createElement("div");
        project.textContent = "Projects";
        project.id = "project";
        sideMenu.appendChild(project);

        // Tasks
        const tasksListingTitle = document.createElement("h1");
        tasksListingTitle.textContent = "Today";
        tasks.appendChild(tasksListingTitle);

        // Appending sidemenu and tasks into maincontainer. maincontainer appended into body.
        mainContainer.appendChild(sideMenu);
        mainContainer.appendChild(tasks);
        this.body.appendChild(mainContainer);
    }
}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }
}

const app = new Controller(new Model(), new View());

