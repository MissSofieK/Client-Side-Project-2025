document.addEventListener('DOMContentLoaded', () => {
    // 1. Funny comments used as button labels / titles
    const funnyTitles = [
        "I See You, Even When You Think I Don't :)",
        "Dear Bandwidth Bandits, the Router is Crying Again.",
        "If Tabs Were Chores, This House Would Be Spotless.",
        "Cloud Storage is Not the Sky, My Loves.",
        "Yes, Netflix is Buffering Because You Started Three Other Streams.",
        "One Does Not Simply 'Accidentally' Play the Whole Season.",
        "Homework First, Memes Later. Okay… Maybe One Meme.",
        "If Wi-Fi Had Feelings, Ours Would Ask for a Holiday.",
        "No, Sweetie, Clearing Cookies Will Not Empty the Snack Cupboard.",
        "Mum Loves You More Than Unlimited Data. Just Barely."
    ];

    // Shuffle helper: random order each time
    const shuffled = [...funnyTitles].sort(() => Math.random() - 0.5);
    let titleIndex = 0;
    const nextTitle = () => {
        const t = shuffled[titleIndex % shuffled.length];
        titleIndex++;
        return t;
    };

    const body = document.body;

    // 2. Theme toggle button (Same Story Night / Day)
    const toggleBtn = document.getElementById('theme-toggle');

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            body.classList.toggle('light-theme');
        });

        // Use a funny comment as tooltip for the theme button
        toggleBtn.title = nextTitle();
    }

    // 3. Keep a reference to all original sections (for restoring)
    const allSections = Array.from(document.querySelectorAll('.story-section'));

    // 4. Dynamically add a dismiss button to each section
    allSections.forEach((section) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'dismiss-btn';
        // Show the funny line INSIDE the button
        btn.textContent = nextTitle();
        // Also keep it as tooltip for fun
        btn.title = btn.textContent;

        // Append at the end so it appears underneath text and image
        section.appendChild(btn);
    });

    // 5. Restore button under H1
    const restoreBtn = document.getElementById('restore-sections');
    if (restoreBtn) {
        // Give restore button a fun tooltip too
        restoreBtn.title = nextTitle();

        restoreBtn.addEventListener('click', () => {
            allSections.forEach((section) => {
                section.classList.remove('fade-out', 'hidden-section');
            });
        });
    }
});

// 6. Event delegation for dismiss buttons
document.addEventListener('click', (event) => {
    if (event.target.matches('.dismiss-btn')) {
        const section = event.target.closest('.story-section');
        if (!section) return;

        // Add fade-out class to trigger CSS transition
        section.classList.add('fade-out');

        // Instead of removing from DOM, hide it after animation
        setTimeout(() => {
            section.classList.add('hidden-section');
        }, 400); // match CSS transition
    }
});
// 7. Optional: Log a funny message when all sections are dismissed
document.addEventListener('click', (event) => {
    if (event.target.matches('.dismiss-btn')) {
        const allHidden = Array.from(document.querySelectorAll('.hidden-section'));
        if (allHidden.length === allSections.length) {
            console.log("All sections have been dismissed. Time for a Wi-Fi break!");
        }
    }
});