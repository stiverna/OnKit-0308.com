function searchBooks() {
  const query = document.getElementById("searchInput").value.trim();
  const resultsDiv = document.getElementById("results");

  if (!query) {
    alert("Iltimos, kitob nomini kiriting.");
    return;
  }

  resultsDiv.innerHTML = "⏳ Qidirilmoqda...";

  fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`)
    .then(res => res.json())
    .then(data => {
      if (!data.docs || data.docs.length === 0) {
        resultsDiv.innerHTML = "❌ Kitob topilmadi.";
        return;
      }

      resultsDiv.innerHTML = "";

      data.docs.slice(0, 10).forEach((book) => {
        const title = book.title || "Nomsiz";
        const author = book.author_name ? book.author_name.join(", ") : "Muallif yo‘q";
        const year = book.first_publish_year || "Noma’lum";
        const olid = book.edition_key ? book.edition_key[0] : "";
        const coverId = book.cover_i;
        const coverUrl = coverId
          ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
          : "https://via.placeholder.com/200x250?text=No+Cover";

        const card = document.createElement("div");
        card.className = "book-card";

        card.innerHTML = `
          <img src="${coverUrl}" alt="Kitob rasmi">
          <h4>${title}</h4>
          <p>${author}</p>
        `;

        card.onclick = function () {
          const url = `book.html?title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}&year=${encodeURIComponent(year)}&cover=${coverId}&olid=${olid}`;
          window.location.href = url;
        };

        resultsDiv.appendChild(card);
      });
    })
    .catch(() => {
      resultsDiv.innerHTML = "❌ Qidiruvda xatolik yuz berdi.";
    });
}
