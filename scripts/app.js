const courseNames = ["HTML Basics", "CSS Basics", "JavaScript", "React"];
const courseStatuses = ["Completed", "In Progress", "Not Started", "Upcoming"];
const startDates = ["Apr 15, 2026", "May 1, 2026", "May 20, 2026", "Oct 10, 2026"];
const courseImages = ["images/html.png", "images/css.png", "images/js.png", "images/react.png"];

const TODAY = new Date("May 20, 2026");
const MS_PER_DAY = 86400000;

function getDaysLeft(dateString) {
    const launchDate = new Date(dateString);
    const todayMidnight = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate());
    const launchMidnight = new Date(launchDate.getFullYear(), launchDate.getMonth(), launchDate.getDate());
    return (launchMidnight - todayMidnight) / MS_PER_DAY;
}

function getLaunchLabel(daysLeft) {
    if (daysLeft > 0) return daysLeft + " days left";
    if (daysLeft === 0) return "Launching today";
    return "Already launched";
}

function filterByStatus(status) {
    const filteredIndexes = [];
    for (let i = 0; i < courseStatuses.length; i++) {
        if (courseStatuses[i] === status) filteredIndexes.push(i);
    }
    return filteredIndexes;
}

function renderCourses() {
    const sliderTrack = document.getElementById("courseSlider");
    if (!sliderTrack) return;

    sliderTrack.innerHTML = "";

    for (let i = 0; i < courseNames.length; i++) {
        const daysLeft = getDaysLeft(startDates[i]);
        const label = getLaunchLabel(daysLeft);
        const status = courseStatuses[i];
        let badgeClass = "open-badge";
        let badgeText = "مفتوح الآن";
        
        if (status === "Upcoming") {
            badgeClass = "opens-soon-badge";
            badgeText = "يفتح قريباً";
        } else if (status === "Not Started") {
            badgeClass = "coming-badge";
            badgeText = "قريباً";
        }

        sliderTrack.innerHTML += `
            <div class="course-slide-item">
                <article class="course-card h-100 bg-white">
                    <div class="aspect-ratio-wrapper rounded-top-4 overflow-hidden position-relative">
                        <img src="${courseImages[i]}" alt="${courseNames[i]}" class="cover-img">
                        <span class="badge-pill ${badgeClass} position-absolute top-3 right-3">
                            <span class="dot"></span>${badgeText}
                        </span>
                    </div>
                    <div class="card-body p-4">
                        <span class="text-primary fw-bold fs-7">مسار البرمجة</span>
                        <h3 class="h5 fw-bold text-dark my-2">${courseNames[i]}</h3>
                        <p class="text-muted fs-7">الحالة الحالية للكورس: ${status}</p>
                        <div class="d-flex align-items-center gap-3 mt-4 text-muted fs-7 border-top pt-3">
                            <span><i class="bi bi-clock me-1"></i> ${label}</span>
                            <span><i class="bi bi-calendar-event me-1"></i> ${startDates[i]}</span>
                        </div>
                    </div>
                </article>
            </div>
        `;
    }       
}

window.addEventListener("DOMContentLoaded", function() {
    renderCourses();
    console.log("--- جميع الكورسات في الـ Console ---");
    for (let i = 0; i < courseNames.length; i++) {
        console.log(`${i + 1}. ${courseNames[i]} - ${courseStatuses[i]} - ${getLaunchLabel(getDaysLeft(startDates[i]))}`);
    }
});

function toggleMobileMenu() {
    document.getElementById("hamburgerBtn").classList.toggle("active");
    document.getElementById("mobileDrawer").classList.toggle("active");
}

window.addEventListener("resize", function() {
    if (window.innerWidth >= 992) {
        const hamburgerBtn = document.getElementById("hamburgerBtn");
        const mobileDrawer = document.getElementById("mobileDrawer");
        if (mobileDrawer.classList.contains("active")) {
            hamburgerBtn.classList.remove("active");
            mobileDrawer.classList.remove("active");
        }
    }
});

const slider = document.getElementById("courseSlider");

function getScrollStep() {
    const cardWidth = window.innerWidth < 768 ? 300 : 340;
    const gap = 24;
    return cardWidth + gap;
}

function scrollSlider(direction) {
    slider.scrollBy({ left: direction * getScrollStep(), behavior: "smooth" });
    setTimeout(updateActiveDot, 300);
}

function jumpToSlide(index) {
    slider.scrollTo({ left: index * getScrollStep(), behavior: "smooth" });
    updateActiveDot(index);
}

function updateActiveDot(indexSpecified = null) {
    const dots = document.querySelectorAll(".slider-dot");
    dots.forEach(dot => dot.classList.remove("active"));
    
    if (indexSpecified !== null) {
        if (dots[indexSpecified]) dots[indexSpecified].classList.add("active");
    } else {
        const currentActive = Math.round(Math.abs(slider.scrollLeft) / getScrollStep());
        if (dots[currentActive]) dots[currentActive].classList.add("active");
    }
}

if (slider) {
    slider.addEventListener("scroll", function() {
        clearTimeout(slider.scrollTimeout);
        slider.scrollTimeout = setTimeout(updateActiveDot, 100);
    });
}

function handleFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const experience = document.getElementById("experience").value;
    
    alert(`أهلاً بك يا ${name}!\nتم تسجيل حسابك بنجاح باستخدام البريد الإلكتروني: (${email}).\nمستوى خبرتك المحدد: [${experience}]. سيتواصل معك أحد مشرفينا قريباً!`);
    document.getElementById("registrationForm").reset();
}

const themeToggle = document.getElementById("themeToggle");
if(themeToggle){
    if(localStorage.getItem("theme") === "dark"){
        document.body.classList.add("dark-mode");
        themeToggle.classList.add("active");
        themeToggle.querySelector(".toggle-circle i").className = "bi bi-moon-fill";
    }

    themeToggle.addEventListener("click", function(){
        document.body.classList.toggle("dark-mode");
        themeToggle.classList.toggle("active");
        const isDark = document.body.classList.contains("dark-mode");
        
        themeToggle.querySelector(".toggle-circle i").className = isDark ? "bi bi-moon-fill" : "bi bi-sun-fill";
        localStorage.setItem("theme", isDark ? "dark" : "light");
    });
}