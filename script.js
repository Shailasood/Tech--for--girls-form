let shareCount = 0;
const maxShare = 5;

const shareBtn = document.getElementById('shareBtn');
const clickCounter = document.getElementById('clickCounter');
const submitBtn = document.getElementById('submitBtn');
const form = document.getElementById('registrationForm');
const thankYouMsg = document.getElementById('thankYouMsg');

// Agar pehle hi submit ho chuka hai toh form na dikhaye
if (localStorage.getItem('submitted') === 'true') {
  form.style.display = 'none';
  thankYouMsg.style.display = 'block';
}

// WhatsApp Share Button click event
shareBtn.addEventListener('click', () => {
  if (shareCount < maxShare) {
    const message = "Hey Buddy, Join Tech For Girls Community 💻✨";
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    shareCount++;
    clickCounter.innerText = `Click Count: ${shareCount}/5`;

    if (shareCount >= maxShare) {
      shareBtn.disabled = true;
      clickCounter.innerText = "Sharing complete. Please continue.";
      submitBtn.disabled = false;
    }
  }
});

// Submit button logic
form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (shareCount < maxShare) {
    alert("Please share on WhatsApp 5 times before submitting!");
    return;
  }

  // Yahan pe Google Sheets integration ka code bhi ayega (later)
  form.style.display = 'none';
  thankYouMsg.style.display = 'block';
  localStorage.setItem('submitted', 'true');
});
