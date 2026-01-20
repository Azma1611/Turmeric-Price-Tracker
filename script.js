// script will be added step by step

function saveAndNext() {
  const text = document.getElementById("dataInput").value.trim();

  if (text === "") {
    alert("Please paste data first");
    return;
  }

  let history = JSON.parse(localStorage.getItem("turmericHistory")) || [];

  const today = new Date().toLocaleDateString();

  history.push({
    date: today,
    raw: text
  });

  localStorage.setItem("turmericHistory", JSON.stringify(history));

  window.location.href = "history.html";
}

function loadHistory() {
  const container = document.getElementById("historyContainer");
  if (!container) return;

  const history = JSON.parse(localStorage.getItem("turmericHistory")) || [];

  if (history.length === 0) {
    container.innerHTML = "<p>No data found</p>";
    return;
  }

  history.reverse().forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "historyBox";
    div.innerHTML = `
      <strong>${item.date}</strong>
      <pre>${item.raw}</pre>
    `;
    container.appendChild(div);
  });
}

loadHistory();
