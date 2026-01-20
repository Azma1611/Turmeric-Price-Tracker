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

function loadHistory() {
  const container = document.getElementById("historyContainer");
  if (!container) return;

  const history = JSON.parse(localStorage.getItem("turmericHistory")) || [];
  container.innerHTML = "";

  if (history.length === 0) {
    container.innerHTML = "<p>No history found</p>";
    return;
  }

  history.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "history-card";

    card.innerHTML = `
      <div class="menu-btn" onclick="toggleMenu(${index})">⋮</div>
      <div class="menu" id="menu-${index}">
        <button onclick="copyData(${index})">Copy</button>
        <button onclick="deleteOne(${index})">Delete</button>
      </div>
      <strong>${item.date}</strong>
      <pre>${item.raw}</pre>
    `;

    container.appendChild(card);
  });
}

function toggleMenu(i) {
  const menu = document.getElementById(`menu-${i}`);
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

function copyData(i) {
  const history = JSON.parse(localStorage.getItem("turmericHistory"));
  navigator.clipboard.writeText(history[i].raw);
  alert("Copied");
}

function deleteOne(i) {
  let history = JSON.parse(localStorage.getItem("turmericHistory"));
  history.splice(i, 1);
  localStorage.setItem("turmericHistory", JSON.stringify(history));
  loadHistory();
}

loadHistory();
