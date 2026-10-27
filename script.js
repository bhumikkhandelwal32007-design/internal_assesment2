
// =====================================================
// BHUMIK KHANDELWAL PORTFOLIO
// script.js
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    // =================================================
    // GET HTML ELEMENTS
    // =================================================

    const themeBtn = document.getElementById("themeBtn");
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    const projectGrid = document.getElementById("projectGrid");
    const projectSearch = document.getElementById("projectSearch");
    const emptyMsg = document.getElementById("emptyMsg");


    // =================================================
    // PROJECTS
    // =================================================

    const projects = [

        {
            title: "Book Reading List",
            description:
                "A simple web application for managing and organizing books to read.",
            technologies:
                "HTML, CSS, JavaScript",
            github:
                "https://github.com/bhumikkhandelwal32007-design/internal_assesment2/tree/e0e5ee745ba621bf009de311726cd7ba0e1fe274/book-reading-list"
        },

        {
            title: "Bug Fixing",
            description:
                "A project focused on identifying, debugging, and fixing programming issues.",
            technologies:
                "Programming, Debugging",
            github:
                "https://github.com/bhumikkhandelwal32007-design/internal_assesment2/tree/e0e5ee745ba621bf009de311726cd7ba0e1fe274/bug-fixing"
        },

        {
            title: "Messy Python",
            description:
                "A collection of Python practice programs focused on improving code structure and programming logic.",
            technologies:
                "Python",
            github:
                "https://github.com/bhumikkhandelwal32007-design/internal_assesment2/tree/e0e5ee745ba621bf009de311726cd7ba0e1fe274/messy-Python"
        },

        {
            title: "Python Program",
            description:
                "A Python programming project created to practice programming concepts and problem solving.",
            technologies:
                "Python",
            github:
                "https://github.com/bhumikkhandelwal32007-design/internal_assesment2/tree/e0e5ee745ba621bf009de311726cd7ba0e1fe274/Python%20Program"
        },

        {
            title: "Quiz Application",
            description:
                "An interactive quiz application that allows users to answer questions and test their knowledge.",
            technologies:
                "HTML, CSS, JavaScript",
            github:
                "https://github.com/bhumikkhandelwal32007-design/internal_assesment2/tree/e0e5ee745ba621bf009de311726cd7ba0e1fe274/Quiz"
        }

    ];


    // =================================================
    // DISPLAY PROJECTS
    // =================================================

    function displayProjects(projectList) {

        if (!projectGrid) {
            console.error("projectGrid was not found.");
            return;
        }

        // Remove old project cards
        projectGrid.innerHTML = "";


        // No projects found
        if (projectList.length === 0) {

            if (emptyMsg) {
                emptyMsg.hidden = false;
            }

            return;
        }


        // Hide empty message
        if (emptyMsg) {
            emptyMsg.hidden = true;
        }


        // Create project cards
        projectList.forEach((project) => {

            const card = document.createElement("article");

            card.className = "project-card";


            card.innerHTML = `
                <h3>${project.title}</h3>

                <p>
                    ${project.description}
                </p>

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
                    View on GitHub →
                </a>
            `;


            projectGrid.appendChild(card);

        });

    }


    // =================================================
    // SHOW ALL PROJECTS
    // =================================================

    displayProjects(projects);


    // =================================================
    // PROJECT SEARCH
    // =================================================

    if (projectSearch) {

        projectSearch.addEventListener("input", () => {

            const searchText =
                projectSearch.value
                    .toLowerCase()
                    .trim();


            const filteredProjects = projects.filter((project) => {

                return (
                    project.title
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    project.description
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    project.technologies
                        .toLowerCase()
                        .includes(searchText)
                );

            });


            displayProjects(filteredProjects);

        });

    }


    // =================================================
    // DARK / LIGHT MODE
    // =================================================

    function updateThemeButton() {

        if (!themeBtn) {
            return;
        }


        const isDark =
            document.documentElement.classList.contains("dark");


        if (isDark) {

            themeBtn.textContent = "Light Mode";

            themeBtn.setAttribute(
                "aria-label",
                "Switch to light mode"
            );

            themeBtn.setAttribute(
                "aria-pressed",
                "true"
            );

        } else {

            themeBtn.textContent = "Dark Mode";

            themeBtn.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );

            themeBtn.setAttribute(
                "aria-pressed",
                "false"
            );

        }

    }


    // Update button when page opens
    updateThemeButton();


    // Theme button click
    if (themeBtn) {

        themeBtn.addEventListener("click", () => {

            document.documentElement.classList.toggle("dark");


            const isDark =
                document.documentElement.classList.contains("dark");


            // Save theme
            try {

                localStorage.setItem(
                    "theme",
                    isDark ? "dark" : "light"
                );

            } catch (error) {

                console.log(
                    "Unable to save theme preference."
                );

            }


            // Update button text
            updateThemeButton();

        });

    }


    // =================================================
    // MOBILE MENU
    // =================================================

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


        // Close menu after clicking a link
        const links =
            navLinks.querySelectorAll("a");


        links.forEach((link) => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("open");

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    // =================================================
    // FINISHED
    // =================================================

    console.log(
        "Bhumik Khandelwal portfolio loaded successfully."
    );

    console.log(
        `${projects.length} projects loaded.`
    );

});
