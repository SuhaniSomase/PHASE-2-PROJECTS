
/* =========================================
   SkillBridge - Freelancing Marketplace
   JavaScript Functionality
========================================= */

"use strict";

// ---------- DOM ELEMENTS ----------
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

const heroSearchForm = document.getElementById("heroSearchForm");
const heroSearch = document.getElementById("heroSearch");

const projectSearch = document.getElementById("projectSearch");
const categoryFilter = document.getElementById("categoryFilter");
const budgetFilter = document.getElementById("budgetFilter");
const sortFilter = document.getElementById("sortFilter");
const resetFilters = document.getElementById("resetFilters");
const projectsGrid = document.getElementById("projectsGrid");
const projectCount = document.getElementById("projectCount");
const projectEmptyState = document.getElementById("projectEmptyState");
const emptyResetBtn = document.getElementById("emptyResetBtn");
const loadMoreBtn = document.getElementById("loadMoreBtn");

const freelancerSearch = document.getElementById("freelancerSearch");
const experienceFilter = document.getElementById("experienceFilter");
const freelancersGrid = document.getElementById("freelancersGrid");
const freelancerEmptyState = document.getElementById("freelancerEmptyState");

const proposalModal = document.getElementById("proposalModal");
const proposalForm = document.getElementById("proposalForm");
const proposalProjectId = document.getElementById("proposalProjectId");

const postProjectBtn = document.getElementById("postProjectBtn");
const footerPostProjectBtn = document.getElementById("footerPostProjectBtn");
const postProjectModal = document.getElementById("postProjectModal");
const postProjectForm = document.getElementById("postProjectForm");

const freelancerModal = document.getElementById("freelancerModal");
const freelancerDetails = document.getElementById("freelancerDetails");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");
const backToTop = document.getElementById("backToTop");

const currentYear = document.getElementById("currentYear");

// ---------- LOCAL STORAGE ----------
const STORAGE_KEYS = {
    projects: "skillBridgeProjects",
    proposals: "skillBridgeProposals"
};

function readStorage(key, fallback) {
    try {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : fallback;
    } catch (error) {
        console.warn("Could not read saved data:", error);
        return fallback;
    }
}

function saveStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        showToast("Unable to save data in this browser.");
        console.error("Could not save data:", error);
        return false;
    }
}

// ---------- SAMPLE PROJECTS ----------
const sampleProjects = [
    {
        id: "p101",
        title: "Responsive Business Website",
        category: "Web Development",
        budget: 12000,
        description: "Create a clean and responsive business website with multiple pages and a modern layout.",
        skills: ["HTML", "CSS", "JavaScript"],
        deadline: "2026-12-15",
        client: "Nova Digital",
        status: "Open"
    },
    {
        id: "p102",
        title: "E-commerce UI Design",
        category: "UI/UX Design",
        budget: 8500,
        description: "Design a user-friendly online shopping experience for desktop and mobile screens.",
        skills: ["Figma", "Wireframing", "UI Design"],
        deadline: "2026-11-28",
        client: "PixelCraft Studio",
        status: "Open"
    },
    {
        id: "p103",
        title: "Social Media Content Pack",
        category: "Content Writing",
        budget: 4500,
        description: "Prepare engaging social media captions and creative content for a growing brand.",
        skills: ["Writing", "Editing", "Research"],
        deadline: "2026-11-20",
        client: "BrightLeaf Media",
        status: "Open"
    },
    {
        id: "p104",
        title: "React Dashboard Development",
        category: "Web Development",
        budget: 18000,
        description: "Build a reusable dashboard interface with responsive charts and data cards.",
        skills: ["React", "JavaScript", "CSS"],
        deadline: "2026-12-30",
        client: "CloudNova",
        status: "Open"
    },
    {
        id: "p105",
        title: "Brand Logo and Identity",
        category: "Graphic Design",
        budget: 6000,
        description: "Create a memorable logo and a small brand identity kit for a new startup.",
        skills: ["Illustrator", "Branding", "Typography"],
        deadline: "2026-11-25",
        client: "UrbanNest",
        status: "Open"
    },
    {
        id: "p106",
        title: "Product Data Research",
        category: "Data Entry",
        budget: 3500,
        description: "Organize product details in a spreadsheet and verify data for accuracy.",
        skills: ["Excel", "Data Entry", "Research"],
        deadline: "2026-11-18",
        client: "MarketBridge",
        status: "Open"
    }
];

// ---------- SAMPLE FREELANCERS ----------
const freelancers = [
    {
        id: "f101",
        name: "Aarav Sharma",
        title: "Frontend Developer",
        experience: 3,
        rating: 4.9,
        reviews: 28,
        image: "https://i.pravatar.cc/160?img=12",
        skills: ["HTML", "CSS", "JavaScript", "React"],
        bio: "Frontend developer focused on accessible, responsive and user-friendly web interfaces.",
        portfolio: ["Responsive Business Website", "React Admin Dashboard"]
    },
    {
        id: "f102",
        name: "Ananya Patel",
        title: "UI/UX Designer",
        experience: 4,
        rating: 4.8,
        reviews: 21,
        image: "https://i.pravatar.cc/160?img=47",
        skills: ["Figma", "Wireframing", "Prototyping", "UI Design"],
        bio: "UI/UX designer who turns ideas into clear and engaging digital experiences.",
        portfolio: ["Shopping App Design", "Travel App Prototype"]
    },
    {
        id: "f103",
        name: "Rohan Mehta",
        title: "Content Writer",
        experience: 2,
        rating: 4.7,
        reviews: 16,
        image: "https://i.pravatar.cc/160?img=13",
        skills: ["Writing", "SEO", "Editing", "Research"],
        bio: "Content writer creating readable website copy, blog articles and social media content.",
        portfolio: ["SEO Blog Collection", "Social Media Campaign"]
    },
    {
        id: "f104",
        name: "Meera Joshi",
        title: "Graphic Designer",
        experience: 5,
        rating: 5.0,
        reviews: 34,
        image: "https://i.pravatar.cc/160?img=44",
        skills: ["Branding", "Illustrator", "Logo Design", "Typography"],
        bio: "Graphic designer helping brands build a consistent and recognizable visual identity.",
        portfolio: ["Startup Brand Kit", "Logo Design Collection"]
    }
];

// Use saved projects if available; otherwise load sample projects.
let projects = readStorage(STORAGE_KEYS.projects, null);

if (!Array.isArray(projects)) {
    projects = sampleProjects;
    saveStorage(STORAGE_KEYS.projects, projects);
}

let proposals = readStorage(STORAGE_KEYS.proposals, []);

if (!Array.isArray(proposals)) {
    proposals = [];
}

let visibleProjectLimit = 6;
let activeDashboardTab = "proposals";
let toastTimeout;

// ---------- HELPER FUNCTIONS ----------
function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };
        return entities[character];
    });
}

function formatCurrency(amount) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(Number(amount) || 0);
}

function formatDate(dateString) {
    if (!dateString) return "Not specified";

    const date = new Date(`${dateString}T00:00:00`);

    if (Number.isNaN(date.getTime())) return "Not specified";

    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
}

function showToast(message) {
    if (!toast || !toastMessage) {
        alert(message);
        return;
    }

    toastMessage.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

function openModal(modal) {
    if (!modal) return;

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
}

function closeModal(modal) {
    if (!modal) return;

    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");

    const anotherModalOpen = [proposalModal, postProjectModal, freelancerModal]
        .some(item => item && item.classList.contains("active"));

    if (!anotherModalOpen) {
        document.body.classList.remove("modal-open");
    }
}

// ---------- MOBILE NAVIGATION ----------
if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });

    navMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });
}

// ---------- PROJECT CARDS ----------
function createProjectCard(project) {
    const skills = Array.isArray(project.skills) ? project.skills : [];
    const status = project.status || "Open";

    return `
        <article class="project-card">
            <div class="project-card-top">
                <div class="project-company">
                    <div class="company-logo">
                        <i class="fa-solid fa-briefcase"></i>
                    </div>
                    <div class="company-info">
                        <h4>${escapeHTML(project.client)}</h4>
                        <span>Client</span>
                    </div>
                </div>

                <span class="project-category">
                    ${escapeHTML(project.category)}
                </span>
            </div>

            <h3>${escapeHTML(project.title)}</h3>

            <p class="project-description">
                ${escapeHTML(project.description)}
            </p>

            <div class="project-skills">
                ${skills.map(skill =>
                    `<span class="skill-tag">${escapeHTML(skill)}</span>`
                ).join("")}
            </div>

            <div class="project-meta">
                <span>
                    <i class="fa-regular fa-calendar"></i>
                    ${escapeHTML(formatDate(project.deadline))}
                </span>
                <span>
                    <i class="fa-solid fa-circle-check"></i>
                    ${escapeHTML(status)}
                </span>
            </div>

            <div class="project-card-bottom">
                <div class="project-budget">
                    <small>Project budget</small>
                    <strong>${formatCurrency(project.budget)}</strong>
                </div>

                <button
                    class="btn btn-primary apply-project-btn"
                    type="button"
                    data-project-id="${escapeHTML(project.id)}"
                    ${status !== "Open" ? "disabled" : ""}
                >
                    ${status === "Open" ? "Send Proposal" : "Closed"}
                </button>
            </div>
        </article>
    `;
}

function getFilteredProjects() {
    let result = [...projects];

    const searchTerm = (projectSearch?.value || "").trim().toLowerCase();
    const category = categoryFilter?.value || "";
    const budget = budgetFilter?.value || "";
    const sort = sortFilter?.value || "";

    if (searchTerm) {
        result = result.filter(project => {
            const searchableText = [
                project.title,
                project.category,
                project.description,
                project.client,
                ...(project.skills || [])
            ].join(" ").toLowerCase();

            return searchableText.includes(searchTerm);
        });
    }

    if (category) {
        result = result.filter(project => project.category === category);
    }

    if (budget === "under5000") {
        result = result.filter(project => Number(project.budget) < 5000);
    } else if (budget === "5000to15000") {
        result = result.filter(project =>
            Number(project.budget) >= 5000 &&
            Number(project.budget) <= 15000
        );
    } else if (budget === "above15000") {
        result = result.filter(project => Number(project.budget) > 15000);
    }

    if (sort === "budget-low") {
        result.sort((a, b) => Number(a.budget) - Number(b.budget));
    } else if (sort === "budget-high") {
        result.sort((a, b) => Number(b.budget) - Number(a.budget));
    } else if (sort === "newest") {
        result.sort((a, b) =>
            String(b.deadline || "").localeCompare(String(a.deadline || ""))
        );
    }

    return result;
}

function renderProjects() {
    if (!projectsGrid) return;

    const filteredProjects = getFilteredProjects();
    const visibleProjects = filteredProjects.slice(0, visibleProjectLimit);

    projectsGrid.innerHTML = visibleProjects.map(createProjectCard).join("");

    if (projectCount) {
        projectCount.textContent = `${filteredProjects.length} project${filteredProjects.length === 1 ? "" : "s"} found`;
    }

    if (projectEmptyState) {
        projectEmptyState.classList.toggle("hidden", filteredProjects.length > 0);
    }

    if (loadMoreBtn) {
        loadMoreBtn.classList.toggle(
            "hidden",
            filteredProjects.length <= visibleProjectLimit
        );
    }
}

function resetProjectFilters() {
    if (projectSearch) projectSearch.value = "";
    if (categoryFilter) categoryFilter.value = "";
    if (budgetFilter) budgetFilter.value = "";
    if (sortFilter) sortFilter.value = "";

    visibleProjectLimit = 6;
    renderProjects();
}

[projectSearch, categoryFilter, budgetFilter, sortFilter].forEach(element => {
    if (!element) return;

    element.addEventListener("input", () => {
        visibleProjectLimit = 6;
        renderProjects();
    });

    element.addEventListener("change", () => {
        visibleProjectLimit = 6;
        renderProjects();
    });
});

if (resetFilters) {
    resetFilters.addEventListener("click", resetProjectFilters);
}

if (emptyResetBtn) {
    emptyResetBtn.addEventListener("click", resetProjectFilters);
}

if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
        visibleProjectLimit += 6;
        renderProjects();
    });
}

// ---------- HERO SEARCH AND CATEGORY CHIPS ----------
if (heroSearchForm) {
    heroSearchForm.addEventListener("submit", event => {
        event.preventDefault();

        if (projectSearch) {
            projectSearch.value = heroSearch?.value.trim() || "";
        }

        visibleProjectLimit = 6;
        renderProjects();

        document.getElementById("projects")?.scrollIntoView({
            behavior: "smooth"
        });
    });
}

document.querySelectorAll("[data-search]").forEach(button => {
    button.addEventListener("click", () => {
        const term = button.dataset.search || "";

        if (projectSearch) projectSearch.value = term;

        if (categoryFilter) {
            const matchingOption = [...categoryFilter.options].find(
                option => option.value.toLowerCase() === term.toLowerCase()
            );

            categoryFilter.value = matchingOption ? matchingOption.value : "";
        }

        visibleProjectLimit = 6;
        renderProjects();

        document.getElementById("projects")?.scrollIntoView({
            behavior: "smooth"
        });
    });
});

document.querySelectorAll("[data-category]").forEach(button => {
    button.addEventListener("click", () => {
        const category = button.dataset.category || "";

        if (categoryFilter) {
            const matchingOption = [...categoryFilter.options].find(
                option => option.value.toLowerCase() === category.toLowerCase()
            );

            categoryFilter.value = matchingOption ? matchingOption.value : "";
        }

        if (projectSearch) projectSearch.value = "";

        visibleProjectLimit = 6;
        renderProjects();

        document.getElementById("projects")?.scrollIntoView({
            behavior: "smooth"
        });
    });
});

// ---------- PROPOSAL MODAL ----------
function openProposalModal(projectId) {
    const project = projects.find(item => String(item.id) === String(projectId));

    if (!project) {
        showToast("Project not found.");
        return;
    }

    if (project.status !== "Open") {
        showToast("This project is no longer accepting proposals.");
        return;
    }

    if (proposalProjectId) proposalProjectId.value = project.id;

    const projectTitle = proposalModal?.querySelector("[data-proposal-title]");
    if (projectTitle) projectTitle.textContent = project.title;

    openModal(proposalModal);
}

if (projectsGrid) {
    projectsGrid.addEventListener("click", event => {
        const button = event.target.closest(".apply-project-btn");

        if (!button) return;

        openProposalModal(button.dataset.projectId);
    });
}

if (proposalForm) {
    proposalForm.addEventListener("submit", event => {
        event.preventDefault();

        if (!proposalForm.reportValidity()) return;

        const projectId = proposalProjectId?.value;
        const project = projects.find(item => String(item.id) === String(projectId));

        if (!project || project.status !== "Open") {
            showToast("This project is no longer available.");
            return;
        }

        const name = document.getElementById("freelancerName")?.value.trim();
        const email = document.getElementById("proposalEmail")?.value.trim();
        const budget = Number(document.getElementById("proposalBudget")?.value);
        const coverLetter = document.getElementById("proposalCoverLetter")?.value.trim();

        if (!name || !email || !coverLetter || !Number.isFinite(budget) || budget <= 0) {
            showToast("Please enter valid proposal details.");
            return;
        }

        const duplicate = proposals.some(proposal =>
            proposal.projectId === project.id &&
            proposal.email.toLowerCase() === email.toLowerCase()
        );

        if (duplicate) {
            showToast("You have already submitted a proposal for this project.");
            return;
        }

        const proposal = {
            id: `prop-${Date.now()}`,
            projectId: project.id,
            projectTitle: project.title,
            freelancerName: name,
            email,
            budget,
            coverLetter,
            status: "Pending",
            submittedAt: new Date().toISOString()
        };

        proposals.push(proposal);

        if (!saveStorage(STORAGE_KEYS.proposals, proposals)) {
            proposals.pop();
            return;
        }

        proposalForm.reset();
        closeModal(proposalModal);
        renderDashboard();
        showToast("Proposal submitted successfully!");
    });
}

// ---------- POST A NEW PROJECT ----------
function openPostProjectModal() {
    openModal(postProjectModal);
}

[postProjectBtn, footerPostProjectBtn].forEach(button => {
    if (button) {
        button.addEventListener("click", openPostProjectModal);
    }
});

if (postProjectForm) {
    postProjectForm.addEventListener("submit", event => {
        event.preventDefault();

        if (!postProjectForm.reportValidity()) return;

        const title = document.getElementById("newProjectTitle")?.value.trim();
        const description = document.getElementById("newProjectDescription")?.value.trim();
        const category = document.getElementById("newProjectCategory")?.value;
        const budget = Number(document.getElementById("newProjectBudget")?.value);
        const deadline = document.getElementById("newProjectDeadline")?.value;
        const client = document.getElementById("newProjectClient")?.value.trim();
        const skillsText = document.getElementById("newProjectSkills")?.value.trim();

        if (!title || !description || !category || !client || !deadline ||
            !Number.isFinite(budget) || budget <= 0) {
            showToast("Please complete all required fields.");
            return;
        }

        if (deadline < new Date().toISOString().slice(0, 10)) {
            showToast("Deadline cannot be in the past.");
            return;
        }

        const skills = skillsText
            ? skillsText.split(",").map(skill => skill.trim()).filter(Boolean)
            : [];

        const newProject = {
            id: `p-${Date.now()}`,
            title,
            description,
            category,
            budget,
            deadline,
            client,
            skills,
            status: "Open"
        };

        projects.unshift(newProject);

        if (!saveStorage(STORAGE_KEYS.projects, projects)) {
            projects.shift();
            return;
        }

        postProjectForm.reset();
        closeModal(postProjectModal);

        resetProjectFilters();
        renderDashboard();

        showToast("Your project has been posted!");

        document.getElementById("projects")?.scrollIntoView({
            behavior: "smooth"
        });
    });
}

// ---------- FREELANCER SEARCH AND FILTER ----------
function createFreelancerCard(freelancer) {
    return `
        <article class="freelancer-card">
            <img
                class="freelancer-avatar"
                src="${escapeHTML(freelancer.image)}"
                alt="${escapeHTML(freelancer.name)}"
                loading="lazy"
            >

            <h3>${escapeHTML(freelancer.name)}</h3>
            <p class="freelancer-title">${escapeHTML(freelancer.title)}</p>

            <div class="freelancer-rating">
                <i class="fa-solid fa-star"></i>
                <strong>${escapeHTML(freelancer.rating)}</strong>
                <span>(${escapeHTML(freelancer.reviews)} reviews)</span>
            </div>

            <div class="freelancer-skills">
                ${freelancer.skills.map(skill =>
                    `<span class="skill-tag">${escapeHTML(skill)}</span>`
                ).join("")}
            </div>

            <div class="experience-badge">
                <i class="fa-solid fa-briefcase"></i>
                ${escapeHTML(freelancer.experience)} years experience
            </div>

            <button
                type="button"
                class="btn btn-outline view-freelancer-btn"
                data-freelancer-id="${escapeHTML(freelancer.id)}"
            >
                View Profile
            </button>
        </article>
    `;
}

function renderFreelancers() {
    if (!freelancersGrid) return;

    const searchTerm = (freelancerSearch?.value || "").trim().toLowerCase();
    const experience = experienceFilter?.value || "";

    let filtered = freelancers.filter(freelancer => {
        const searchableText = [
            freelancer.name,
            freelancer.title,
            freelancer.bio,
            ...freelancer.skills
        ].join(" ").toLowerCase();

        return !searchTerm || searchableText.includes(searchTerm);
    });

    if (experience === "beginner") {
        filtered = filtered.filter(person => person.experience < 2);
    } else if (experience === "intermediate") {
        filtered = filtered.filter(person =>
            person.experience >= 2 && person.experience <= 4
        );
    } else if (experience === "expert") {
        filtered = filtered.filter(person => person.experience >= 5);
    }

    freelancersGrid.innerHTML = filtered.map(createFreelancerCard).join("");

    if (freelancerEmptyState) {
        freelancerEmptyState.classList.toggle("hidden", filtered.length > 0);
    }
}

[freelancerSearch, experienceFilter].forEach(element => {
    if (!element) return;

    element.addEventListener("input", renderFreelancers);
    element.addEventListener("change", renderFreelancers);
});

// ---------- FREELANCER PROFILE DETAILS ----------
if (freelancersGrid) {
    freelancersGrid.addEventListener("click", event => {
        const button = event.target.closest(".view-freelancer-btn");

        if (!button) return;

        const freelancer = freelancers.find(
            item => item.id === button.dataset.freelancerId
        );

        if (!freelancer || !freelancerDetails) return;

        freelancerDetails.innerHTML = `
            <div class="freelancer-detail-profile">
                <img
                    class="freelancer-avatar"
                    src="${escapeHTML(freelancer.image)}"
                    alt="${escapeHTML(freelancer.name)}"
                >
                <div>
                    <h2>${escapeHTML(freelancer.name)}</h2>
                    <p>${escapeHTML(freelancer.title)}</p>
                    <p>
                        <i class="fa-solid fa-star"></i>
                        ${escapeHTML(freelancer.rating)}
                        (${escapeHTML(freelancer.reviews)} reviews)
                    </p>
                </div>
            </div>

            <div class="freelancer-detail-section">
                <h3>About</h3>
                <p class="freelancer-detail-bio">
                    ${escapeHTML(freelancer.bio)}
                </p>
            </div>

            <div class="freelancer-detail-section">
                <h3>Skills</h3>
                <div class="freelancer-skills">
                    ${freelancer.skills.map(skill =>
                        `<span class="skill-tag">${escapeHTML(skill)}</span>`
                    ).join("")}
                </div>
            </div>

            <div class="freelancer-detail-section">
                <h3>Portfolio</h3>
                <ul class="freelancer-portfolio-list">
                    ${freelancer.portfolio.map(item =>
                        `<li class="freelancer-portfolio-item">${escapeHTML(item)}</li>`
                    ).join("")}
                </ul>
            </div>

            <p class="experience-badge">
                ${escapeHTML(freelancer.experience)} years of experience
            </p>
        `;

        openModal(freelancerModal);
    });
}

// ---------- DASHBOARD ----------
function renderDashboard() {
    const postedProjectsCount = document.getElementById("postedProjectsCount");
    const submittedProposalsCount = document.getElementById("submittedProposalsCount");
    const openProjectsCount = document.getElementById("openProjectsCount");

    if (postedProjectsCount) {
        postedProjectsCount.textContent = projects.length;
    }

    if (submittedProposalsCount) {
        submittedProposalsCount.textContent = proposals.length;
    }

    if (openProjectsCount) {
        openProjectsCount.textContent = projects.filter(
            project => project.status === "Open"
        ).length;
    }

    renderDashboardContent();
}

function renderDashboardContent() {
    const dashboardContent = document.getElementById("dashboardContent");
    if (!dashboardContent) return;

    if (activeDashboardTab === "posted") {
        if (projects.length === 0) {
            dashboardContent.innerHTML = `
                <div class="dashboard-empty">
                    <i class="fa-solid fa-folder-open"></i>
                    <p>No projects posted yet.</p>
                </div>
            `;
            return;
        }

        dashboardContent.innerHTML = `
            <div class="dashboard-list">
                ${projects.map(project => `
                    <article class="dashboard-item">
                        <div class="dashboard-item-main">
                            <h4>${escapeHTML(project.title)}</h4>
                            <p>${escapeHTML(project.client)} · ${escapeHTML(project.category)}</p>
                            <div class="dashboard-item-meta">
                                ${formatCurrency(project.budget)} · Deadline: ${escapeHTML(formatDate(project.deadline))}
                            </div>
                        </div>

                        <div class="dashboard-item-actions">
                            <select
                                class="dashboard-status-select"
                                data-status-project-id="${escapeHTML(project.id)}"
                                aria-label="Change status for ${escapeHTML(project.title)}"
                            >
                                <option value="Open" ${project.status === "Open" ? "selected" : ""}>Open</option>
                                <option value="In Progress" ${project.status === "In Progress" ? "selected" : ""}>In Progress</option>
                                <option value="Completed" ${project.status === "Completed" ? "selected" : ""}>Completed</option>
                            </select>

                            <button
                                type="button"
                                class="btn btn-outline delete-project-btn"
                                data-delete-project-id="${escapeHTML(project.id)}"
                            >
                                Delete
                            </button>
                        </div>
                    </article>
                `).join("")}
            </div>
        `;
    } else {
        if (proposals.length === 0) {
            dashboardContent.innerHTML = `
                <div class="dashboard-empty">
                    <i class="fa-solid fa-paper-plane"></i>
                    <p>No proposals submitted yet.</p>
                    <span>Explore projects and send your first proposal.</span>
                </div>
            `;
            return;
        }

        dashboardContent.innerHTML = `
            <div class="dashboard-list">
                ${proposals.map(proposal => `
                    <article class="dashboard-item">
                        <div class="dashboard-item-main">
                            <h4>${escapeHTML(proposal.projectTitle)}</h4>
                            <p>Submitted by ${escapeHTML(proposal.freelancerName)}</p>
                            <div class="dashboard-item-meta">
                                ${formatCurrency(proposal.budget)} ·
                                ${escapeHTML(proposal.email)} ·
                                ${escapeHTML(formatDate(proposal.submittedAt?.slice(0, 10)))}
                            </div>
                            <p>${escapeHTML(proposal.coverLetter)}</p>
                        </div>

                        <span class="status-badge">
                            ${escapeHTML(proposal.status)}
                        </span>
                    </article>
                `).join("")}
            </div>
        `;
    }
}

document.querySelectorAll("[data-dashboard-tab]").forEach(button => {
    button.addEventListener("click", () => {
        activeDashboardTab = button.dataset.dashboardTab;

        document.querySelectorAll("[data-dashboard-tab]").forEach(tab => {
            tab.classList.toggle("active", tab === button);
        });

        renderDashboardContent();
    });
});

const dashboardContentElement = document.getElementById("dashboardContent");

if (dashboardContentElement) {
    dashboardContentElement.addEventListener("change", event => {
        const select = event.target.closest("[data-status-project-id]");
        if (!select) return;

        const project = projects.find(
            item => String(item.id) === String(select.dataset.statusProjectId)
        );

        if (!project) return;

        const previousStatus = project.status;
        project.status = select.value;

        if (!saveStorage(STORAGE_KEYS.projects, projects)) {
            project.status = previousStatus;
            renderDashboard();
            return;
        }

        renderProjects();
        renderDashboard();
        showToast("Project status updated.");
    });

    dashboardContentElement.addEventListener("click", event => {
        const button = event.target.closest(".delete-project-btn");
        if (!button) return;

        const projectId = button.dataset.deleteProjectId;
        const project = projects.find(item => String(item.id) === String(projectId));

        if (!project) return;

        const confirmed = confirm(`Delete "${project.title}"?`);

        if (!confirmed) return;

        const oldProjects = [...projects];
        projects = projects.filter(item => String(item.id) !== String(projectId));

        if (!saveStorage(STORAGE_KEYS.projects, projects)) {
            projects = oldProjects;
            return;
        }

        renderProjects();
        renderDashboard();
        showToast("Project deleted.");
    });
}

// ---------- MODAL CLOSE BUTTONS ----------
document.querySelectorAll("[data-close-modal]").forEach(button => {
    button.addEventListener("click", () => {
        const modal = button.closest(".modal");
        closeModal(modal);
    });
});

[proposalModal, postProjectModal, freelancerModal].forEach(modal => {
    if (!modal) return;

    modal.addEventListener("click", event => {
        if (event.target === modal) {
            closeModal(modal);
        }
    });
});

document.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;

    [proposalModal, postProjectModal, freelancerModal].forEach(closeModal);
});

// ---------- BACK TO TOP ----------
window.addEventListener("scroll", () => {
    if (!backToTop) return;

    backToTop.classList.toggle("show", window.scrollY > 400);
});

if (backToTop) {
    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// ---------- FOOTER YEAR ----------
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// ---------- INITIAL RENDER ----------
renderProjects();
renderFreelancers();
renderDashboard();

console.log("SkillBridge marketplace initialized successfully.");
