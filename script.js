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
    const url = https://wa.me/?text=${encodeURIComponent(message)};
    window.open(url, '_blank');

    shareCount++;
    clickCounter.innerText = Click Count: ${shareCount}/5;

    if (shareCount >= maxShare) {
      shareBtn.disabled = true;
      clickCounter.innerText = "Sharing complete. Please continue.";
      submitBtn.disabled = false;
    }
  }
});

// Submit button logic with Google Sheets integration
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (shareCount < maxShare) {
    alert("Please share on WhatsApp 5 times before submitting!");
    return;
  }

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const college = document.getElementById('college').value;
  const file = document.getElementById('screenshot').files[0];

  const fileLink = file ? file.name : "Not uploaded";

  await fetch('https://script.google.com/macros/s/AKfycbyyc07HUIezYi8r2y7pdnIYPWP6eOaFnzv3JBPZv4y2PwjMphjcxWnwgI3qtG2LMv1SpA/exec', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      phone,
      email,
      college,
      fileLink,
    }),
  });

  form.style.display = 'none';
  thankYouMsg.style.display = 'block';
  localStorage.setItem('submitted', 'true');
});