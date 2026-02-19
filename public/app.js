document.getElementById('btn').addEventListener('click', () => {
  fetch('/api/hello')
    .then(res => res.json())
    .then(data => {
      document.getElementById('result').textContent = data.message
    })
    .catch(() => {
      document.getElementById('result').textContent = 'API error'
    })
})
document.getElementById('sendBtn').addEventListener('click', () => {
  const name = document.getElementById('nameInput').value

  fetch('/api/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name })
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById('postResult').textContent = data.message
    })
    .catch(() => {
      document.getElementById('postResult').textContent = 'POST error'
    })
})
