// Get DOM elements
const nameInput = document.getElementById("nameInput");
const generateBtn = document.getElementById("generateBtn");
const generatedLinkContainer = document.getElementById("generatedLinkContainer");
const generatedLink = document.getElementById("generatedLink");
const copyBtn = document.getElementById("copyBtn");
const greetingContainer = document.getElementById("greetingContainer");
const greetingText = document.getElementById("greetingText");
// Get share buttons
const whatsappBtn = document.getElementById("whatsappShare");
const facebookBtn = document.getElementById("facebookShare");
const twitterBtn = document.getElementById("twitterShare");
const instagramBtn = document.getElementById("instagramShare");
const snapchatBtn = document.getElementById("snapchatShare");
const threadsBtn = document.getElementById("threadsShare");

// Function to read URL parameters
function getNameFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("n"); // ?n=Name
}

// Function to display greeting if URL has a name
function displayGreeting() {
  const name = getNameFromURL();
  if (name) {
    greetingText.textContent = `🎉 Hey ${name}! You got a special greeting! 🎉`;
    greetingContainer.classList.remove("hidden");
    // Optionally hide input box if someone visits with ?n=Name
    document.querySelector(".input-box").classList.add("hidden");
  }
}

// Function to generate personalized link
function generateLink() {
  const name = nameInput.value.trim();
  if (!name) {
    alert("Please enter your name!");
    return;
  }

  // Build personalized URL
  const currentURL = window.location.origin + window.location.pathname;
  const personalizedURL = `${currentURL}?n=${encodeURIComponent(name)}`;

  // Show the link in input box
  generatedLink.value = personalizedURL;
  generatedLinkContainer.classList.remove("hidden");
}

// Function to copy link to clipboard
function copyLink() {
  generatedLink.select();
  generatedLink.setSelectionRange(0, 99999); // For mobile
  navigator.clipboard.writeText(generatedLink.value)
    .then(() => alert("Link copied to clipboard! 🎉"))
    .catch(() => alert("Failed to copy link."));
}

// Event listeners
generateBtn.addEventListener("click", generateLink);
copyBtn.addEventListener("click", copyLink);

// Display greeting on page load if URL has ?n=Name
window.addEventListener("DOMContentLoaded", displayGreeting);


// Function to share on WhatsApp
whatsappBtn.addEventListener("click", () => {
  const text = `Check out my personalized greeting on Wishly! 🎉 ${generatedLink.value}`;
  const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
});

// Function to share on Facebook
facebookBtn.addEventListener("click", () => {
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(generatedLink.value)}`;
  window.open(url, "_blank");
});

// Function to share on Twitter
twitterBtn.addEventListener("click", () => {
  const text = `Check out my personalized greeting on Wishly! 🎉`;
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(generatedLink.value)}`;
  window.open(url, "_blank");
});

// Instagram (cannot auto-share links in posts, open profile or copy link)
instagramBtn.addEventListener("click", () => {
  alert("Instagram doesn't allow direct link sharing. Copy your link and paste it in a post/story!");
});

// Snapchat share via URL
snapchatBtn.addEventListener("click", () => {
  const url = `https://www.snapchat.com/scan?attachmentUrl=${encodeURIComponent(generatedLink.value)}`;
  window.open(url, "_blank");
});

// Threads (use text + link, similar to Twitter)
threadsBtn.addEventListener("click", () => {
  const text = `Check out my personalized greeting on Wishly! 🎉`;
  const url = `https://www.threads.net/share?text=${encodeURIComponent(text)}%20${encodeURIComponent(generatedLink.value)}`;
  window.open(url, "_blank");
});


