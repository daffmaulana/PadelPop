let token = '';

function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  fetch('/auth/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(data => {
    token = data.token;
    alert("Login berhasil!");
  });
}

function book() {
  const field_id = document.getElementById('fieldId').value;
  const date = document.getElementById('date').value;
  const time_start = document.getElementById('timeStart').value;
  const time_end = document.getElementById('timeEnd').value;

  fetch('/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ field_id, date, time_start, time_end })
  })
  .then(res => res.json())
  .then(data => alert(data.message || 'Gagal'))
}
