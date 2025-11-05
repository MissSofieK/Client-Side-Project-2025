// Run after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle
    const toggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            body.classList.toggle('light-theme');
        });
    }

    // Dynamically add a dismiss button to each section
    const sections = document.querySelectorAll('.story-section');

    sections.forEach((section) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'dismiss-btn';
        btn.textContent = 'Dismiss section';
        // Append at the end so it appears underneath text and image
        section.appendChild(btn);
    });
});

// Event delegation for dismiss buttons
document.addEventListener('click', (event) => {
    // If the clicked element has the dismiss button class
    if (event.target.matches('.dismiss-btn')) {
        const section = event.target.closest('.story-section');

        if (!section) return;

        // Add fade-out class to trigger transition
        section.classList.add('fade-out');

        // Remove after 400 ms (matches CSS transition)
        setTimeout(() => {
            section.remove();
        }, 400);
    }
});
