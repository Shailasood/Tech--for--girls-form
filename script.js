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
    const message = "Hey Buddy, Join Tech For Girls Community 💻✨";
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    shareCount++;
    clickCounter.innerText = `Click Count: ${shareCount}/5`;

    if (shareCount >= maxShare) {
      shareBtn.disabled = true;
      clickCounter.innerText = "✅ Sharing complete. Please continue.";
      submitBtn.disabled = false;
    }
  }
});

// ✅ Form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (shareCount < maxShare) {
    alert("⚠️ Please share on WhatsApp 5 times before submitting!");
    return;
  }

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const college = document.getElementById('college').value;
  const file = document.getElementById('screenshot').files[0];

  const fileLink = file ? file.name : "Not uploaded";

  try {
    await fetch('https://script.google.com/macros/s/AKfycbzuBWD0JyP1oOfEVPnpoamYfjy9uXrCWVPmeAdEyFAJnyiHscZbmKDTcm380P-JgBec/exec', {
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
  } catch (error) {
    alert("❌ Submission failed. Please try again.");
    console.error(error);
  }
});
