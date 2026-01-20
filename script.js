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
