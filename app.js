const input = document.querySelector("input");
const form = document.querySelector("form");
const resultContainer = document.querySelector(".result-container");
const key = "zZmt79TEtH-MrE8TStiVeLg4vzX2EgzPvRRzyZK56MI";
const url = `https://api.unsplash.com/photos/?client_id=${key}`;
let page = 1;
//https://api.unsplash.com?client_id=zZmt79TEtH-MrE8TStiVeLg4vzX2EgzPvRRzyZK56MI&query=football

async function fetchImages(entry) {
  let req_result = await request(entry);
  req_result.map((item) => {
    resultContainer.innerHTML += `
    <div class="result-item">
      <img src="${item.urls.small}"/>
    </div>
    `;
  });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  resultContainer.innerHTML = "";
  fetchImages(input.value);
});

async function request(request_term) {
  console.log(`${url}&query=${request_term}&page=${page}&per_page=40`);
  request_object = {
    method: "GET",
  };
  const response = await fetch(`${url}&query=${request_term}`, request_object);
  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }
  const data = await response.json();
  console.log(data);
  return data;
}

let options = {
  root: document.querySelector("#scrollArea"),
  rootMargin: "0px",
  threshold: 1.0,
};

function obderverCallback(entries, observer) {
  page += 1;
  entries.forEach((entry) => {
    if (entry.isIntersecting && resultContainer.innerHTML) {
      fetchImages();
    }
  });
}

const observer = new IntersectionObserver(obderverCallback, options);
observer.observe(document.querySelector("footer"));
