// ================================
// DOM ELEMENTS
// ================================
const nameInput = document.getElementById("nameInput");
const generateBtn = document.getElementById("generateBtn");
const generatedLinkContainer = document.getElementById("generatedLinkContainer");
const generatedLink = document.getElementById("generatedLink");
const copyBtn = document.getElementById("copyBtn");
const greetingContainer = document.getElementById("greetingContainer");
const greetingText = document.getElementById("greetingText");

// Share buttons
const whatsappBtn = document.getElementById("whatsappShare");
const facebookBtn = document.getElementById("facebookShare");
const twitterBtn = document.getElementById("twitterShare");
const instagramBtn = document.getElementById("instagramShare");
const snapchatBtn = document.getElementById("snapchatShare");
const threadsBtn = document.getElementById("threadsShare");


// ================================
// URL PARAM HANDLING
// ================================
function getNameFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("n");
}

function displayGreeting() {
  const name = getNameFromURL();
  if (name) {
    greetingText.textContent = `🎉 Hey ${name}! You got a special greeting! 🎉`;
    greetingContainer.classList.remove("hidden");
    document.querySelector(".input-box").classList.add("hidden");
    adjustContainerHeight();
  }
}


// ================================
// LINK GENERATION
// ================================
function generateLink() {
  const name = nameInput.value.trim();
  if (!name) {
    alert("Please enter your name!");
    return;
  }

  const baseURL = window.location.origin + window.location.pathname;
  const personalizedURL = `${baseURL}?n=${encodeURIComponent(name)}`;

  generatedLink.value = personalizedURL;
  generatedLinkContainer.classList.remove("hidden");

  adjustContainerHeight();
}


// ================================
// COPY LINK
// ================================
function copyLink() {
  generatedLink.select();
  generatedLink.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(generatedLink.value)
    .then(() => alert("Link copied to clipboard! 🎉"))
    .catch(() => alert("Failed to copy link."));
}


// ================================
// RESPONSIVE HEIGHT HANDLER
// ================================
function adjustContainerHeight() {
  const vh = window.innerHeight;

  if (!greetingContainer.classList.contains("hidden")) {
    greetingContainer.style.maxHeight = `${vh * 0.6}px`;
    greetingContainer.style.overflowY = "auto";
  }

  if (!generatedLinkContainer.classList.contains("hidden")) {
    generatedLinkContainer.style.maxHeight = `${vh * 0.65}px`;
    generatedLinkContainer.style.overflowY = "auto";
  }
}


// ================================
// SHARE FUNCTIONS
// ================================
whatsappBtn.addEventListener("click", () => {
  const text = `Check out my personalized greeting on Wishly! 🎉 ${generatedLink.value}`;
  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
});

facebookBtn.addEventListener("click", () => {
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(generatedLink.value)}`,
    "_blank"
  );
});

twitterBtn.addEventListener("click", () => {
  const text = `Check out my personalized greeting on Wishly! 🎉`;
  window.open(
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(generatedLink.value)}`,
    "_blank"
  );
});

instagramBtn.addEventListener("click", () => {
  alert("Instagram doesn't allow direct link sharing. Copy your link and paste it in your story or bio.");
});

snapchatBtn.addEventListener("click", () => {
  window.open(
    `https://www.snapchat.com/scan?attachmentUrl=${encodeURIComponent(generatedLink.value)}`,
    "_blank"
  );
});

threadsBtn.addEventListener("click", () => {
  const text = `Check out my personalized greeting on Wishly! 🎉`;
  window.open(
    `https://www.threads.net/share?text=${encodeURIComponent(text)}%20${encodeURIComponent(generatedLink.value)}`,
    "_blank"
  );
});


// ================================
// EVENT LISTENERS
// ================================
generateBtn.addEventListener("click", generateLink);
copyBtn.addEventListener("click", copyLink);

window.addEventListener("DOMContentLoaded", displayGreeting);
window.addEventListener("resize", adjustContainerHeight);
window.addEventListener("load", adjustContainerHeight);
