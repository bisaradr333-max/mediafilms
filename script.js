let allMovies = movies;
let movies = JSON.parse(localStorage.getItem("movies") || "[]");

if(movies.length===0){
  movies = [
    {
      title: "Demo Movie",
      poster: "https://via.placeholder.com/300x450",
      quality: "480p | 720p | 1080p",
      screens: [
        "https://via.placeholder.com/300x180",
        "https://via.placeholder.com/300x180"
      ],
      downloads: [
        { q: "480p", link: "#" },
        { q: "720p", link: "#" },
        { q: "1080p", link: "#" }
      ]
    }
  ];
}

const dashboard = document.getElementById("dashboard");
const details = document.getElementById("details");
const search = document.getElementById("search");

function showMovies(list){
  dashboard.innerHTML = "";
  list.forEach((m, i) => {
    dashboard.innerHTML += `
      <div class="card" onclick="openMovie(${i})">
        <img src="${m.poster}">
        <p>${m.title}</p>
        <p class="quality">${m.quality}</p>
      </div>
    `;
  });
}

showMovies(movies);

if(search){
search.oninput = () => {
  const val = search.value.toLowerCase();
  const filtered = movies.filter(m => m.title.toLowerCase().includes(val));
  showMovies(filtered);
};
}

function openMovie(i){
  const m = movies[i];
  dashboard.style.display = "none";
  details.classList.remove("hidden");

  dTitle.innerText = m.title;
  dPoster.src = m.poster;

  screens.innerHTML = "";
  m.screens.forEach(s=>{
    screens.innerHTML += `<img src="${s.trim()}">`;
  });

  downloads.innerHTML = "";
  m.downloads.forEach(d=>{
    if(d.link)
    downloads.innerHTML += `<a class="download-btn" href="${d.link}">Download ${d.q}</a>`;
  });
}

function goBack(){
  details.classList.add("hidden");
  dashboard.style.display = "grid";
}
function filterCat(cat){
  if(cat==="All") showMovies(allMovies);
  else{
    const f = allMovies.filter(m=>m.category===cat);
    showMovies(f);
  }
}
let slideIndex = 0;

function startSlider(){
  if(allMovies.length===0) return;

  slideImg.src = allMovies[slideIndex].poster;
  slideTitle.innerText = allMovies[slideIndex].title;

  slideIndex++;
  if(slideIndex >= allMovies.length) slideIndex = 0;
}

setInterval(startSlider, 3000);
startSlider();
