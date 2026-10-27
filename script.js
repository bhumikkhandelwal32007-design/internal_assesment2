
// =========================================
// BHUMIK KHANDELWAL
// PORTFOLIO SCRIPT
// =========================================


// =========================================
// PROJECTS
// =========================================

const projects = [
    {
        title: "Book Reading List",
        description:
            "A simple web application for managing and organizing books to read.",
        technologies: "HTML, CSS, JavaScript",
        github:
            "https://github.com/bhumikkhandelwal32007-design/internal_assesment2/tree/8a729e7f85371704c0c82c4c9a0a9c73e2defd59/book-reading-list
    },

    {
        title: "Bug Fixing",
        description:
            "A project focused on identifying, debugging, and fixing programming issues.",
        technologies: "Programming, Debugging",
        github:
            "https://github.com/bhumikkhandelwal32007-design/internal_assesment2/tree/8a729e7f85371704c0c82c4c9a0a9c73e2defd59/bug-fixing

    {
        title: "Messy Python",
        description:
            "A collection of Python practice programs focused on improving code structure and programming logic.",
        technologies: "Python",
        github:
            "https://github.com/bhumikkhandelwal32007-design/internal_assesment2/tree/8a729e7f85371704c0c82c4c9a0a9c73e2defd59/messy-Python"
    },

    {
        title: "Python Program",
        description:
            "A Python programming project created to practice programming concepts and problem solving.",
        technologies: "Python",
        github:
            "https://github.com/bhumikkhandelwal32007-design/internal_assesment2/tree/8a729e7f85371704c0c82c4c9a0a9c73e2defd59/Python%20Program

    {
        title: "Quiz Application",
        description:
            "An interactive quiz application that allows users to answer questions and test their knowledge.",
        technologies: "HTML, CSS, JavaScript",
        github:
            "https://github.com/bhumikkhandelwal32007-design/internal_assesment2/tree/8a729e7f85371704c0c82c4c9a0a9c73e2defd59/Quiz"
    }
];


// =========================================
// DISPLAY PROJECTS
// =========================================

const projectGrid = document.getElementById("projectGrid");
const projectSearch = document.getElementById("projectSearch");
const emptyMsg = document.getElementById("emptyMsg");

function displayProjects(projectList) {

    if (!projectGrid) {
        console.error("Project grid not found.");
        return;
    }

    projectGrid.innerHTML = "";

    if (projectList.length === 0) {

        if (emptyMsg) {
            emptyMsg.hidden = false;
        }

        return;
    }

    if (emptyMsg) {
        emptyMsg.hidden = true;
    }


    projectList.forEach((project) => {

        const card = document.createElement("article");

        card.className = "project-card";

        card.innerHTML = `
            <h3>${project.title}</h3>

            <p>${project.description}</p>

            <p class="project-tech">
                <strong>Technologies:</strong>
                ${project.technologies}
            </p>

            <a
                href="${project.github}"
                class="project-link"
                target="_blank"
                rel="noopener noreferrer"
            >
                View on GitHub
            </a>
        `;

        projectGrid.appendChild(card);
    });
}


// =========================================
// PROJECT SEARCH
// =========================================

if (projectSearch) {

    projectSearch.addEventListener("input", function () {

        const searchText =
            this.value.toLowerCase().trim();

        const filteredProjects = projects.filter((project) => {

            return (
                project.title
                    .toLowerCase()
                    .includes(searchText) ||

                project.description
                    .toLowerCase()
                    .includes(searchText) ||

                project.technologies
                    .toLowerCase()
                    .includes(searchText)
            );

        });

        displayProjects(filteredProjects);
    });
}


// =========================================
// DARK / LIGHT MODE
// =========================================

const themeBtn = document.getElementById("themeBtn");

function updateThemeButton() {

    if (!themeBtn) {
        return;
    }

    const isDark =
        document.documentElement.classList.contains("dark");

    themeBtn.textContent =
        isDark ? "Light Mode" : "Dark Mode";

    themeBtn.setAttribute(
        "aria-pressed",
        isDark ? "true" : "false"
    );
}


if (themeBtn) {

    themeBtn.addEventListener("click", () => {

        document.documentElement.classList.toggle("dark");

        const isDark =
            document.documentElement.classList.contains("dark");

        localStorage.setItem(
            "theme",
            isDark ? "dark" : "light"
        );

        updateThemeButton();
    });

    updateThemeButton();
}


// =========================================
// MOBILE MENU
// =========================================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("open");

        const isOpen =
            navLinks.classList.contains("open");

        menuBtn.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );
    });


    // Close mobile menu after clicking a link

    navLinks.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );
        });

    });
}


// =========================================
// INITIALIZE PROJECTS
// =========================================

displayProjects(projects);


// =========================================
// BHUMIK PORTFOLIO CONSOLE MESSAGE
// =========================================

console.log(
    "Bhumik Khandelwal Portfolio loaded successfully."
);