
"use strict";

/* =========================================
   1. DARK MODE
========================================= */

const themeBtn = document.getElementById("themeBtn");

function applyTheme(theme) {
    const isDark = theme === "dark";

    document.documentElement.classList.toggle("dark", isDark);

    try {
        localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch (error) {
        console.warn("Unable to save theme preference.");
    }

    if (themeBtn) {
        themeBtn.textContent = isDark ? "Light Mode" : "Dark Mode";
        themeBtn.setAttribute("aria-pressed", String(isDark));
    }
}

// Load the saved theme.
let savedTheme = "light";

try {
    savedTheme = localStorage.getItem("theme") || "light";
} catch (error) {
    // Use light mode if local storage is unavailable.
}

applyTheme(savedTheme);

// Toggle between light and dark mode.
if (themeBtn) {
    themeBtn.addEventListener("click", function () {
        const isDark = document.documentElement.classList.contains("dark");

        applyTheme(isDark ? "light" : "dark");
    });
}


/* =========================================
   2. MOBILE NAVIGATION MENU
========================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
        const isOpen = navLinks.classList.toggle("active");

        menuBtn.setAttribute("aria-expanded", String(isOpen));
        menuBtn.textContent = isOpen ? "Close" : "Menu";
    });

    // Close the menu after clicking a navigation link.
    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("active");
            menuBtn.setAttribute("aria-expanded", "false");
            menuBtn.textContent = "Menu";
        });
    });
}


/* =========================================
   3. PROJECT DATA
   Replace or add your actual projects here.
========================================= */

const projects = [
    {
        title: "AI and Machine Learning Projects",
        description:
            "A collection of projects exploring artificial intelligence, data analysis, and machine learning concepts.",
        technologies: ["Python", "AI", "Machine Learning"],
        github: ""
    },
    {
        title: "Python Programming Projects",
        description:
            "Python programs demonstrating problem-solving, programming fundamentals, and practical applications.",
        technologies: ["Python"],
        github: ""
    },
    {
        title: "Personal Portfolio Website",
        description:
            "A responsive personal portfolio featuring my background, skills, projects, and an AI chatbot.",
        technologies: ["HTML", "CSS", "JavaScript"],
        github: ""
    }
];


/* =========================================
   4. PROJECT ELEMENTS
========================================= */

const projectGrid = document.getElementById("projectGrid");
const projectSearch = document.getElementById("projectSearch");
const emptyMsg = document.getElementById("emptyMsg");


/* =========================================
   5. CREATE PROJECT CARDS SAFELY
========================================= */

function createProjectCard(project) {
    const card = document.createElement("article");
    card.className = "project-card";

    const title = document.createElement("h3");
    title.textContent = project.title || "Untitled Project";

    const description = document.createElement("p");
    description.textContent =
        project.description || "No description available.";

    const technologies = document.createElement("p");
    technologies.className = "project-technologies";

    const techList = Array.isArray(project.technologies)
        ? project.technologies
        : [];

    technologies.textContent = techList.length
        ? "Technologies: " + techList.join(", ")
        : "";

    card.appendChild(title);
    card.appendChild(description);

    if (technologies.textContent) {
        card.appendChild(technologies);
    }

    // Display a GitHub link only when a valid URL is provided.
    if (project.github) {
        try {
            const githubURL = new URL(project.github);

            if (
                githubURL.protocol === "https:" &&
                githubURL.hostname === "github.com"
            ) {
                const githubLink = document.createElement("a");

                githubLink.href = githubURL.href;
                githubLink.textContent = "View on GitHub";
                githubLink.target = "_blank";
                githubLink.rel = "noopener noreferrer";

                card.appendChild(githubLink);
            }
        } catch (error) {
            console.warn("An invalid GitHub URL was skipped.");
        }
    }

    return card;
}


/* =========================================
   6. DISPLAY AND SEARCH PROJECTS
========================================= */

function displayProjects(projectList) {
    if (!projectGrid) return;

    // Remove previously displayed project cards.
    projectGrid.replaceChildren();

    projectList.forEach(function (project) {
        projectGrid.appendChild(createProjectCard(project));
    });

    if (emptyMsg) {
        emptyMsg.hidden = projectList.length !== 0;
    }
}

function searchProjects() {
    if (!projectSearch) return;

    const query = projectSearch.value.trim().toLowerCase();

    const filteredProjects = projects.filter(function (project) {
        const searchableText = [
            project.title || "",
            project.description || "",
            ...(Array.isArray(project.technologies)
                ? project.technologies
                : [])
        ].join(" ").toLowerCase();

        return searchableText.includes(query);
    });

    displayProjects(filteredProjects);
}

// Update project results as the user types.
if (projectSearch) {
    projectSearch.addEventListener("input", searchProjects);
}

// Show all projects when the page loads.
displayProjects(projects);


/* =========================================
   7. FOOTER YEAR (OPTIONAL)
========================================= */

// If you add an element with id="currentYear",
// it will automatically show the current year.
const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}
