const transactions = [];

window.onload = function () {
  const saved = localStorage.getItem("transactions");
  if (saved) {
    transactions.push(...JSON.parse(saved));
    afficherTransactions();
    mettreAJourTotaux();
  }
};

function ajouterTransaction() {
  const description = document.getElementById("description").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;

  if (!description || isNaN(amount) || amount <= 0) {
    alert("Veuillez entrer une désignation et un montant valide.");
    return;
  }

  transactions.push({ description, amount, type });
  localStorage.setItem("transactions", JSON.stringify(transactions));

  document.getElementById("description").value = "";
  document.getElementById("amount").value = "";

  afficherTransactions();
  mettreAJourTotaux();
}

function afficherTransactions() {
  const creditBody = document.getElementById("credit-body");
  const debitBody = document.getElementById("debit-body");
  const recentList = document.getElementById("recent-transactions");

  creditBody.innerHTML = "";
  debitBody.innerHTML = "";
  recentList.innerHTML = "";

  transactions.forEach((tx) => {
    const row = `<tr><td>${tx.description}</td><td>${tx.amount.toFixed(
      2
    )}</td></tr>`;
    if (tx.type === "credit") creditBody.innerHTML += row;
    else debitBody.innerHTML += row;
  });

  const lastTransactions = transactions.slice(-5).reverse();
  lastTransactions.forEach((tx) => {
    const item = document.createElement("li");
    item.className = "list-group-item";
    item.textContent = `${tx.type.toUpperCase()} | ${
      tx.description
    } : ${tx.amount.toFixed(2)}`;
    recentList.appendChild(item);
  });
}

function mettreAJourTotaux() {
  let totalCredit = 0,
    totalDebit = 0;

  transactions.forEach((tx) => {
    if (tx.type === "credit") totalCredit += tx.amount;
    else totalDebit += tx.amount;
  });

  const solde = totalCredit - totalDebit;

  document.getElementById("total-credit").textContent = `Total Crédit : ${
    totalCredit /*.toFixed(2)*/
  } Ar`;
  document.getElementById("total-debit").textContent = `Total Débit : ${
    totalDebit /*.toFixed(2)*/
  } Ar`;
  document.getElementById("solde").textContent = `Reste : ${solde} Ar`;
}

function resetTransactions() {
  if (confirm("Voulez-vous vraiment effacer toutes les transactions ?")) {
    transactions.length = 0;
    localStorage.removeItem("transactions");
    afficherTransactions();
    mettreAJourTotaux();
  }
}
