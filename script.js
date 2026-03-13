// document.getElementById('searchInput').addEventListener('keyup', function() {
//     let filter = this.value.toUpperCase();
//     let cards = document.querySelectorAll('.card');

//     cards.forEach(card => {
//         let text = card.textContent || card.innerText;
//         if (text.toUpperCase().indexOf(filter) > -1) {
//             card.style.display = "";
//         } else {
//             card.style.display = "none";
//         }
//     });
// });

document.getElementById('searchInput').addEventListener('keyup', function() {
    let filter = this.value.toUpperCase();
    let cards = document.querySelectorAll('.card');
    let noResultsMsg = document.getElementById('no-results');
    let visibleCount = 0;

    cards.forEach(card => {
        let text = card.textContent || card.innerText;
        if (text.toUpperCase().indexOf(filter) > -1) {
            card.style.display = "";
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    });

    // Toggle the "Working on it" message based on results
    if (visibleCount === 0 && filter !== "") {
        noResultsMsg.style.display = "block";
    } else {
        noResultsMsg.style.display = "none";
    }
});

// 1. Data Structure (Mimicking your folders)
const studyData = {
    "ACE Engineering College": {
        "CSD": {
            "R-20": {
                "1st Year": ["I-I-Syllabus.pdf", "I-II-Syllabus.pdf"],
                "2nd Year": ["II-I-Syllabus.pdf", "II-II-Syllabus.pdf"],
                "3rd Year": ["III-I-Syllabus.pdf", "III-II-Syllabus.pdf"],
                "4th Year": ["IV-I-Syllabus.pdf", "IV-II-Syllabus.pdf"]
            },
            "R-22": { /* Add similar structure here */ }
        },
        "CSE": { /* Add branches here */ },
        "IT": { /* Add branches here */ },
        "CSE(AI & ML)": { /* Add branches here */ },
        "IOT": { /* Add branches here */ },
        "CIVIL": { /* Add branches here */ },
        "MECH": { /* Add branches here */ },
        "EEE": { /* Add branches here */ },
        "ECE": { /* Add branches here */ }
    },
    "JNTUH": {
        "CSD": {
            "R-20": {
                "1st Year": ["I-I-Syllabus.pdf", "I-II-Syllabus.pdf"],
                "2nd Year": ["II-I-Syllabus.pdf", "II-II-Syllabus.pdf"],
                "3rd Year": ["III-I-Syllabus.pdf", "III-II-Syllabus.pdf"],
                "4th Year": ["IV-I-Syllabus.pdf", "IV-II-Syllabus.pdf"]
            },
            "R-22": { /* Add similar structure here */ }
        },
        "CSE": { /* Add branches here */ }
    }
};

const grid = document.getElementById('contentGrid');
const breadcrumbs = document.getElementById('breadcrumbs');

// 2. Function to Render Colleges (Level 1)
function renderColleges() {
    breadcrumbs.innerHTML = `<span onclick="renderColleges()">Colleges</span>`;
    grid.innerHTML = '';
    Object.keys(studyData).forEach(college => {
        grid.innerHTML += `
            <div class="card college-card" onclick="renderBranches('${college}')">
                <h3>${college}</h3>
                <p>Click to view Departments</p>
            </div>`;
    });
}

// 3. Function to Render Branches (Level 2)
function renderBranches(college) {
    breadcrumbs.innerHTML = `<span onclick="renderColleges()">Colleges</span> > <span>${college}</span>`;
    grid.innerHTML = '';
    Object.keys(studyData[college]).forEach(branch => {
        grid.innerHTML += `
            <div class="card branch-card" onclick="renderRegulations('${college}', '${branch}')">
                <h3>${branch}</h3>
                <p>Click to view Available Regulations</p>
            </div>`;
    });
}

// 4. Function to Render Regulations (Level 3)
function renderRegulations(college, branch) {
    breadcrumbs.innerHTML = `<span onclick="renderColleges()">Colleges</span> > <span onclick="renderBranches('${college}')">${college}</span> > <span>${branch}</span>`;
    grid.innerHTML = '';
    Object.keys(studyData[college][branch]).forEach(reg => {
        grid.innerHTML += `
            <div class="card reg-card" onclick="renderYears('${college}', '${branch}', '${reg}')">
                <h3>Regulation ${reg}</h3>
                <p>Click to view Syllabus</p>
            </div>`;
    });
}

// 5. Function to Render Years & Files (Final Level)
function renderYears(college, branch, reg) {
    grid.innerHTML = '';
    const years = studyData[college][branch][reg];
    
    for (let year in years) {
        let filesHtml = years[year].map(file => 
            `<a href="data/colleges/${college}/${branch}/${reg}/${file}" class="file-link" target="_blank">📄 ${file}</a>`
        ).join('');

        grid.innerHTML += `
            <div class="year-section">
                <h3>${year}</h3>
                <div class="file-list">${filesHtml}</div>
            </div>`;
    }
}

// Initialize the app
renderColleges();