let shareCount = 0;
const maxShare = 5;

const shareBtn = document.getElementById('shareBtn');
const clickCounter = document.getElementById('clickCounter');
const submitBtn = document.getElementById('submitBtn');
const form = document.getElementById('registrationForm');
const thankYouMsg = document.getElementById('thankYouMsg');

// ✅ If already submitted, hide form
if (localStorage.getItem('submitted') === 'true') {
  form.style.display = 'none';
  thankYouMsg.style.display = 'block';
}

// ✅ WhatsApp Share Button click event
shareBtn.addEventListener('click', () => {
  if (shareCount < maxShare) {
    const name = document.getElementById('name').value;
    const college = document.getElementById('college').value;

    const message = `Hey! I'm ${name} from ${college}. I'm joining Tech for Girls 🚀`;
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

// ✅ Form submit logic (no backend)
form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (shareCount < maxShare) {
    alert("Please share on WhatsApp 5 times before submitting!");
    return;
  }

  form.style.display = 'none';
  thankYouMsg.style.display = 'block';
  localStorage.setItem('submitted', 'true');
});
