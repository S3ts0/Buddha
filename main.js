document.addEventListener("DOMContentLoaded", function () {
  // Navigation functionality
  const navLinks = document.querySelectorAll(".nav-link");
  const pages = document.querySelectorAll(".page");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove active class from all links and pages
      navLinks.forEach((l) => l.classList.remove("active"));
      pages.forEach((page) => page.classList.remove("active"));

      // Add active class to clicked link
      this.classList.add("active");

      // Show corresponding page
      const pageId = this.getAttribute("data-page");
      document.getElementById(pageId).classList.add("active");

      // Toggle body class for characters page
      if (pageId === "characters") {
        document.body.classList.add("characters-active");
      } else {
        document.body.classList.remove("characters-active");
      }
    });
  });

  // Animated button effect (if present on Home page)
  const animatedBtn = document.getElementById("animated-btn");
  if (animatedBtn) {
    animatedBtn.addEventListener("click", function () {
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Whoosh!';
      this.style.transform = "scale(1.1)";

      setTimeout(() => {
        this.innerHTML = '<i class="fas fa-check"></i> Magic Happened!';
        this.style.backgroundColor = "#4CAF50";
      }, 1000);

      setTimeout(() => {
        this.innerHTML = '<i class="fas fa-magic"></i> Click Me Again!';
        this.style.backgroundColor = "";
        this.style.transform = "";
      }, 3000);
    });
  }

  // Video button functionality (on Home page)
  const videoBtn = document.getElementById("video-btn");
  const videoContainer = document.getElementById("video-container");

  if (videoBtn) {
    videoBtn.addEventListener("click", function () {
      const isShowing = videoContainer.style.display === "block";
      videoContainer.style.display = isShowing ? "none" : "block";
      document.body.classList.toggle("video-playing", !isShowing);

      if (!isShowing) {
        // Pause video when hiding
        const iframe = videoContainer.querySelector("iframe");
        if (iframe) {
          iframe.src = iframe.src; // Reset to pause video
        }
      }
    });
  }

  // Explore button goes to characters page (if present)
  const exploreBtn = document.getElementById("explore-btn");
  if (exploreBtn) {
    exploreBtn.addEventListener("click", function () {
      navLinks.forEach((l) => l.classList.remove("active"));
      pages.forEach((page) => page.classList.remove("active"));

      document
        .querySelector('.nav-link[data-page="characters"]')
        .classList.add("active");
      document.getElementById("characters").classList.add("active");

      // Smooth scroll to top
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // --- Lightbox Functionality ---
  const lightboxModal = document.getElementById("lightboxModal");
  const lightboxImage = document.getElementById("lightboxImage");
  const closeButton = document.querySelector(".close-button");

  // Target all character image thumbnails (now there are multiple)
  const characterImageThumbnails = document.querySelectorAll(
    ".character-image-thumbnail"
  );

  characterImageThumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      const fullSrc = this.getAttribute("data-full-src");
      lightboxImage.src = fullSrc;
      lightboxModal.classList.add("active"); // Show the modal
      document.body.classList.add("modal-open"); // Prevent background scrolling
    });
  });

  // Make triptych poster panels clickable for lightbox
  const posterPanels = document.querySelectorAll(".poster-panel");
  posterPanels.forEach((panel) => {
    panel.addEventListener("click", function () {
      const clickedImage = this.querySelector(".poster-image");
      if (clickedImage) {
        const fullSrc = clickedImage.getAttribute("data-full");
        lightboxImage.src = fullSrc;
        lightboxModal.classList.add("active"); // Show the modal
        document.body.classList.add("modal-open"); // Prevent background scrolling
      }
    });
  });

  // Event listener for closing the lightbox via the close button
  closeButton.addEventListener("click", function () {
    lightboxModal.classList.remove("active"); // Hide the modal
    document.body.classList.remove("modal-open"); // Re-enable background scrolling
    lightboxImage.src = ""; // Clear the image source
  });

  // Event listener for closing the lightbox when clicking outside the image
  lightboxModal.addEventListener("click", function (event) {
    // If the click target is the modal itself (not the image inside it)
    if (event.target === lightboxModal) {
      lightboxModal.classList.remove("active");
      document.body.classList.remove("modal-open");
      lightboxImage.src = "";
    }
  });

  // Event listener for closing the lightbox with the ESC key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && lightboxModal.classList.contains("active")) {
      lightboxModal.classList.remove("active");
      document.body.classList.remove("modal-open");
      lightboxImage.src = "";
    }
  });
});
