// Footer loader utility
async function loadFooter() {
  try {
    const response = await fetch('footer.html');
    const footerContent = await response.text();
    document.getElementById('footer-container').innerHTML = footerContent;
  } catch (error) {
    console.error('Error loading footer:', error);
    // Fallback footer content
    document.getElementById('footer-container').innerHTML = `
      <footer>
        <span>Noah Shore &mdash; </span>
        <a href="https://github.com/noshore5" target="_blank" aria-label="GitHub" style="vertical-align:middle; margin:0 0.5rem;">
          <svg height="22" width="22" viewBox="0 0 16 16" fill="#eaeaea" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.01.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.11.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
        </a>
        <a href="https://www.linkedin.com/in/noah-shore/" target="_blank" aria-label="LinkedIn" style="vertical-align:middle; margin:0 0.5rem;">
          <svg height="22" width="22" viewBox="0 0 24 24" fill="#eaeaea" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.597 2 3.597 4.59v5.606z"/></svg>
        </a>
      </footer>
    `;
  }
}

// Load footer when DOM is ready
document.addEventListener('DOMContentLoaded', loadFooter);
