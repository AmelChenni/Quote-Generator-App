let generateBtn = document.querySelector(".generate");
let autoBtn = document.querySelector(".auto");
let stopBtn = document.querySelector(".stop");
let quoteDiv = document.querySelector(".quote-display");
let quoteAuthor = document.querySelector(".quote-author");
let autoStatus = document.querySelector(".auto-status");
let languageBtn = document.querySelector(".language");
let btns = document.querySelector(".buttons");
let twitter = document.querySelector(".twitter");
let facebook = document.querySelector('.facebook');
let intervalId;
let currentLanguage = 'English';

// Event listener
languageBtn.addEventListener("click", changeLanguage);
generateBtn.addEventListener("click", generateQuote);
autoBtn.addEventListener("click", autoQuote);
stopBtn.addEventListener("click", stopQuote);

twitter.addEventListener("click", shareOnTwitter);
facebook.addEventListener("click", shareOnFacebook);

// Function to get quotes from API for English
async function getQuotes() {
  const response = await fetch("https://api.quotable.io/quotes");
  const data = await response.json();
  return data.results;
}

// Function to get quotes from API for Arabic
async function getQuotesA() {
  let random = Math.floor(Math.random() * (6236 - 1 + 1) + 1);
  const response = await fetch(`https://api.alquran.cloud/v1/ayah/${random}`);
  const data = await response.json();
  console.log(data.data);
  return data.data;
}

// Function to generate quote in English
async function generateQuote() {
  const quotes = await getQuotes();
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteDiv.innerHTML = quote.content;
  quoteAuthor.innerHTML = `By: ${quote.author}`;
}

// Function to generate quote in Arabic
async function generateQuoteA() {
  const quotes = await getQuotesA();
  quoteDiv.innerHTML = quotes.text;
  quoteAuthor.innerHTML = `${quotes.surah.name}`;
}

// Function to start auto generation of quotes
function autoQuote() {
  if (currentLanguage === 'English') {
    intervalId = setInterval(generateQuote, 2000);
  } else {
    intervalId = setInterval(generateQuoteA, 2000);
  }
  autoStatus.textContent = "AUTO ON";
}

// Function to stop auto generation of quotes
function stopQuote() {
  clearInterval(intervalId);
  autoStatus.textContent = "";
}

// Function to change language between English and Arabic
function changeLanguage() {
  if (currentLanguage === 'English') {
    currentLanguage = 'Arabic';
    languageBtn.textContent = "English";
    generateBtn.textContent = "توليد اقتباس";
    autoBtn.textContent = "أوتوماتيكي";
    stopBtn.textContent = "توقف";
    quoteDiv.textContent = "اقتباس القرآن الكريم سيظهر هنا";
    quoteAuthor.textContent = "اسم السورة";
    generateBtn.removeEventListener("click", generateQuote);
    generateBtn.addEventListener("click", generateQuoteA);
    btns.style = "flex-direction: row-reverse;";
  quoteAuthor.style.fontFamily = "Amiri, serif"; 
  } else {
    currentLanguage = 'English';
    languageBtn.textContent = "العربية";
    generateBtn.textContent = "Generate Quote";
    autoBtn.textContent = "Auto Generate";
    stopBtn.textContent = "Stop Generate";
    generateBtn.removeEventListener("click", generateQuoteA);
    generateBtn.addEventListener("click", generateQuote);
    quoteDiv.textContent = "Quote Will Appear Here";
    quoteAuthor.textContent = "The author";
    btns.style = "flex-direction: row;";
    quoteDiv.style.fontFamily = "Rubik, sans-serif";  
   }
}

// share on twitter and facebook
function shareOnTwitter() {
    const quote = document.querySelector(".quote-display").innerText;
    const author = document.querySelector(".quote-author").innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quote)} - ${encodeURIComponent(author)}`;
    window.open(twitterUrl, "_blank");
}
function shareOnFacebook() {
    const quote = document.querySelector(".quote-display").innerText;
    const author = document.querySelector(".quote-author").innerText;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(quote)} - ${encodeURIComponent(author)}`;
    window.open(facebookUrl, "_blank");
}
