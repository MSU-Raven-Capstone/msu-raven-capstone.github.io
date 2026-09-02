/* ============================================================================
   NASA RAVEN AERODYNAMICS PROJECT — SITE NAVIGATION SCRIPT
   ============================================================================
   WHAT THIS FILE DOES
   This script builds the site header (site title + the "Options" button and
   its dropdown menu in the top-right corner) and the site footer, then
   inserts them into every page automatically. It reads the page's <title>
   and an empty <header id="site-header"></header> / <footer id="site-footer">
   pair that already sit in each HTML file, and fills them in.

   WHY IT WORKS THIS WAY
   Every page on the site needs the exact same navigation menu. Instead of
   copy-pasting that menu into all 7 HTML files (and having to update all 7
   any time you add or rename a page), the list of pages lives in ONE place
   below: the PAGES array. Every page's Options menu is generated from that
   single list, so editing it here updates the whole site at once.

   ============================================================================
   HOW TO ADD, REMOVE, OR RENAME A PAGE IN THE SITE-WIDE "OPTIONS" MENU
   ============================================================================
   1. Edit the PAGES array directly below this comment block.
        - "label" is the text shown in the Options dropdown.
        - "href"  is the filename of the page (must match the actual .html
          file name in the site's root folder).
   2. If you are ADDING a brand-new page:
        a. Duplicate one of the existing .html files (e.g. copy future.html)
           and rename the copy, e.g. "conclusions.html".
        b. Update the <title> and page content in your new file.
        c. Add a matching { label: "...", href: "conclusions.html" } entry
           to the PAGES array below.
        d. That's it — the new page will now appear in the Options menu on
           EVERY page, and it will get the same header/footer automatically.
   That is the only file you need to touch to change site-wide navigation.
   ========================================================================= */

const PAGES = [
  { label: "Home", href: "index.html" },
  { label: "Learn About the RAVEN", href: "raven.html" },
  { label: "More About the Project", href: "project.html" },
  { label: "Research Approach", href: "approach.html" },
  { label: "Research Findings", href: "findings.html" },
  { label: "Future Research", href: "future.html" },
  { label: "Sources & Credits", href: "sources.html" },
];

// Text shown next to the small dot logo in the header, on every page.
// Change this one string to rename the site everywhere at once.
const SITE_TITLE = "NASA RAVEN Aerodynamics Capstone Project";


/* ============================================================================
   Implementation below. You generally should NOT need to edit anything past
   this point just to add/remove/rename pages — use the PAGES array above.
   ========================================================================= */

document.addEventListener("DOMContentLoaded", () => {
  buildHeader();
  buildFooter();
});

/**
 * Figures out which file the browser is currently showing (e.g. "raven.html")
 * so the matching link in the Options menu can be marked as the current page.
 */
function getCurrentPageFile() {
  const path = window.location.pathname;
  const fileName = path.substring(path.lastIndexOf("/") + 1);
  // Treat a blank path (e.g. a bare "/") the same as "index.html".
  return fileName === "" ? "index.html" : fileName;
}

/**
 * Builds the sticky top header: site title on the left, "Options" button +
 * dropdown menu of every page on the right. Injected into
 * <header id="site-header"></header>, which must exist in the page's HTML.
 */
function buildHeader() {
  const headerEl = document.getElementById("site-header");
  if (!headerEl) return; // Page forgot the <header id="site-header">; nothing to do.

  const currentPage = getCurrentPageFile();

  const menuItemsHtml = PAGES.map((page) => {
    const isCurrent = page.href === currentPage;
    const currentAttr = isCurrent ? ' aria-current="page"' : "";
    return `<li><a href="${page.href}"${currentAttr}>${page.label}</a></li>`;
  }).join("\n        ");

  headerEl.innerHTML = `
    <div class="site-header__bar">
      <a class="site-header__brand" href="index.html">
        <span class="site-header__brand-mark" aria-hidden="true"></span>
        <span class="site-header__brand-text">${SITE_TITLE}</span>
      </a>
      <nav class="options" aria-label="Site pages">
      <button
        type="button"
          class="options__button"
            id="options-toggle"
            aria-haspopup="true"
            aria-expanded="false"
            aria-controls="options-menu"
            aria-label="Site menu"
                >
           <span aria-hidden="true" style="font-size: 1.3rem; line-height: 1;">&#9776;</span>
        </button>
        <ul class="options__menu" id="options-menu" role="menu" hidden>
        ${menuItemsHtml}
        </ul>
      </nav>
    </div>
  `;

  wireUpOptionsMenu();
}

/**
 * Adds the click / outside-click / Escape-key behavior for the Options
 * dropdown. Kept separate from buildHeader() just for readability.
 */
function wireUpOptionsMenu() {
  const toggleButton = document.getElementById("options-toggle");
  const menu = document.getElementById("options-menu");
  if (!toggleButton || !menu) return;

  function openMenu() {
    menu.hidden = false;
    toggleButton.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    menu.hidden = true;
    toggleButton.setAttribute("aria-expanded", "false");
  }

  function toggleMenu() {
    const isOpen = toggleButton.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  toggleButton.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleMenu();
  });

  // Close the menu if the user clicks anywhere outside of it.
  document.addEventListener("click", (event) => {
    const clickedInsideMenu = menu.contains(event.target);
    const clickedToggle = toggleButton.contains(event.target);
    if (!clickedInsideMenu && !clickedToggle) {
      closeMenu();
    }
  });

  // Close the menu on the Escape key, and return focus to the button.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggleButton.getAttribute("aria-expanded") === "true") {
      closeMenu();
      toggleButton.focus();
    }
  });
}

/**
 * Builds the site footer with a short credit line and the current year.
 * Injected into <footer id="site-footer"></footer>, which must exist in the
 * page's HTML. Edit the text below to change the footer on every page.
 */
function buildFooter() {
  const footerEl = document.getElementById("site-footer");
  if (!footerEl) return;

  const year = new Date().getFullYear();

  footerEl.innerHTML = `
    <div class="site-footer__bar">
      <span>&copy; ${year} Noah Walker &amp; Thomas Stafford &mdash; Mississippi State University, Department of Aerospace Engineering</span>
      <a href="sources.html">Sources &amp; Credits</a>
    </div>
  `;
}
