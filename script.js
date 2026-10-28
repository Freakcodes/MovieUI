const movieData = [
  {
    id: 1,
    title: "Midnight Circuit",
    genre: "Sci-Fi",
    year: 2025,
    rating: 8.9,
    runtime: "2h 12m",
    votes: "1.2M",
    awards: 8,
    status: "PG-13",
    description:
      "A rogue hacker joins a street-racing syndicate in a neon-drenched city where the lines between reality and memory have vanished.",
    poster:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=80",
    tags: ["Cyberpunk", "Action", "Techno", "High-Speed"],
    featured: true,
    hot: true
  },
  {
    id: 2,
    title: "Atlas Run",
    genre: "Action",
    year: 2024,
    rating: 8.7,
    runtime: "1h 58m",
    votes: "980K",
    awards: 6,
    status: "PG-13",
    description:
      "An elite courier races across a collapsing empire to stop a weaponized weather system from crashing into the capital.",
    poster:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80",
    tags: ["Thrilling", "Adventure", "Survival"],
    featured: false,
    hot: true
  },
  {
    id: 3,
    title: "Glass Harbor",
    genre: "Drama",
    year: 2023,
    rating: 8.5,
    runtime: "2h 04m",
    votes: "760K",
    awards: 4,
    status: "PG",
    description:
      "A small-town musician returns home to discover the family memories hidden beneath the harbor's glassy tides.",
    poster:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80",
    tags: ["Heartfelt", "Music", "Family"],
    featured: false,
    hot: false
  },
  {
    id: 4,
    title: "Shadow Ridge",
    genre: "Thriller",
    year: 2025,
    rating: 8.8,
    runtime: "1h 52m",
    votes: "1.4M",
    awards: 9,
    status: "R",
    description:
      "A forensic specialist uncovers a conspiracy involving a missing mountain town and a vanished transmission signal.",
    poster:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    tags: ["Mystery", "Crime", "Suspense"],
    featured: false,
    hot: true
  },
  {
    id: 5,
    title: "Velvet Echo",
    genre: "Comedy",
    year: 2022,
    rating: 7.9,
    runtime: "1h 39m",
    votes: "540K",
    awards: 3,
    status: "PG-13",
    description:
      "A failed radio host and a struggling magician accidentally become the most unlikely duo on the city's comedy circuit.",
    poster:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=900&q=80",
    tags: ["Comedy", "Romance", "Feel-Good"],
    featured: false,
    hot: false
  },
  {
    id: 6,
    title: "Aurora Bloom",
    genre: "Fantasy",
    year: 2025,
    rating: 8.6,
    runtime: "2h 18m",
    votes: "810K",
    awards: 7,
    status: "PG",
    description:
      "A forgotten sky gardener discovers a hidden valley where every dawn blooms into a living constellation.",
    poster:
      "https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?auto=format&fit=crop&w=900&q=80",
    tags: ["Fantasy", "Family", "Adventure"],
    featured: false,
    hot: false
  },
  {
    id: 7,
    title: "Steel Horizon",
    genre: "Action",
    year: 2021,
    rating: 8.3,
    runtime: "2h 21m",
    votes: "670K",
    awards: 5,
    status: "PG-13",
    description:
      "A retired pilot is pulled back into the sky to defend a floating city from a rogue military fleet.",
    poster:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
    tags: ["Pilot", "Epic", "Air Combat"],
    featured: false,
    hot: false
  },
  {
    id: 8,
    title: "The Last Lantern",
    genre: "Drama",
    year: 2024,
    rating: 8.1,
    runtime: "1h 47m",
    votes: "615K",
    awards: 4,
    status: "PG",
    description:
      "In a city of fading light, one teacher sets out to rebuild a community after the last public lanterns go out.",
    poster:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=900&q=80",
    tags: ["Inspirational", "Hope", "Community"],
    featured: false,
    hot: false
  }
];

const state = {
  activeView: "home",
  activeGenre: "all",
  activeSort: "popularity",
  searchTerm: "",
  bookmarks: JSON.parse(localStorage.getItem("cineverse-bookmarks") || "[]")
};

const elements = {
  movieGrid: document.getElementById("movieGrid"),
  movieSectionEyebrow: document.getElementById("movieSectionEyebrow"),
  movieSectionTitle: document.getElementById("movieSectionTitle"),
  searchInput: document.getElementById("searchInput"),
  bookmarkList: document.getElementById("bookmarkList"),
  bookmarkCount: document.getElementById("bookmarkCount"),
  featuredTitle: document.getElementById("featuredTitle"),
  featuredYear: document.getElementById("featuredYear"),
  featuredGenre: document.getElementById("featuredGenre"),
  featuredRuntime: document.getElementById("featuredRuntime"),
  featuredDescription: document.getElementById("featuredDescription"),
  featuredPoster: document.getElementById("featuredPoster"),
  featuredVotes: document.getElementById("featuredVotes"),
  featuredAwards: document.getElementById("featuredAwards"),
  featuredStatus: document.getElementById("featuredStatus"),
  featuredBookmarkBtn: document.getElementById("featuredBookmarkBtn"),
  movieModal: document.getElementById("movieModal"),
  modalPoster: document.getElementById("modalPoster"),
  modalTitle: document.getElementById("modalTitle"),
  modalYear: document.getElementById("modalYear"),
  modalGenre: document.getElementById("modalGenre"),
  modalRuntime: document.getElementById("modalRuntime"),
  modalRating: document.getElementById("modalRating"),
  modalDescription: document.getElementById("modalDescription"),
  modalTags: document.getElementById("modalTags"),
  modalBookmarkBtn: document.getElementById("modalBookmarkBtn")
};

function saveBookmarks() {
  localStorage.setItem("cineverse-bookmarks", JSON.stringify(state.bookmarks));
}

function getMovieById(id) {
  return movieData.find((movie) => movie.id === id);
}

function isBookmarked(movieId) {
  return state.bookmarks.includes(movieId);
}

function toggleBookmark(movieId) {
  if (isBookmarked(movieId)) {
    state.bookmarks = state.bookmarks.filter((id) => id !== movieId);
  } else {
    state.bookmarks = [...state.bookmarks, movieId];
  }

  saveBookmarks();
  renderBookmarks();
  renderMovies();
  updateFeaturedBookmarkState();
}

function getFilteredMovies() {
  let filtered = [...movieData];

  if (state.activeView === "popular") {
    filtered = filtered.filter((movie) => movie.hot);
  } else if (state.activeView === "watchlist") {
    filtered = filtered.filter((movie) => isBookmarked(movie.id));
  } else if (state.activeView === "tv-shows") {
    filtered = [];
  }

  if (state.searchTerm) {
    const term = state.searchTerm.toLowerCase();
    filtered = filtered.filter((movie) => {
      return (
        movie.title.toLowerCase().includes(term) ||
        movie.genre.toLowerCase().includes(term) ||
        movie.tags.some((tag) => tag.toLowerCase().includes(term))
      );
    });
  }

  if (state.activeGenre !== "all") {
    filtered = filtered.filter((movie) => movie.genre === state.activeGenre);
  }

  if (state.activeSort === "new") {
    filtered.sort((a, b) => b.year - a.year);
  } else {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return filtered;
}

function renderFeaturedMovie() {
  const featured = movieData.find((movie) => movie.featured) || movieData[0];

  elements.featuredTitle.textContent = featured.title;
  elements.featuredYear.textContent = featured.year;
  elements.featuredGenre.textContent = featured.genre;
  elements.featuredRuntime.textContent = featured.runtime;
  elements.featuredDescription.textContent = featured.description;
  elements.featuredPoster.src = featured.poster;
  elements.featuredPoster.alt = `${featured.title} poster`;
  elements.featuredVotes.textContent = featured.votes;
  elements.featuredAwards.textContent = featured.awards;
  elements.featuredStatus.textContent = featured.status;

  updateFeaturedBookmarkState(featured.id);
}

function updateFeaturedBookmarkState(featuredId = null) {
  const featured = movieData.find((movie) => movie.featured) || movieData[0];
  const currentId = featuredId || featured.id;
  const isActive = isBookmarked(currentId);

  elements.featuredBookmarkBtn.textContent = isActive ? "✓ Saved" : "+ My list";
  elements.featuredBookmarkBtn.style.background = isActive
    ? "rgba(118, 228, 163, 0.14)"
    : "rgba(255, 255, 255, 0.06)";
  elements.featuredBookmarkBtn.style.borderColor = isActive
    ? "rgba(118, 228, 163, 0.4)"
    : "rgba(255, 255, 255, 0.08)";
}

function renderMovies() {
  const movies = getFilteredMovies();
  const sectionContent = {
    home: ["Trending now", "Discover"],
    movies: ["Browse the collection", "Movies"],
    "tv-shows": ["Coming soon", "TV Shows"],
    popular: ["Fan favorites", "New & Popular"],
    watchlist: ["Your collection", "My List"]
  }[state.activeView];

  elements.movieSectionEyebrow.textContent = sectionContent[0];
  elements.movieSectionTitle.textContent = sectionContent[1];

  if (!movies.length) {
    const emptyMessage = state.activeView === "tv-shows"
      ? "TV shows are coming soon. Browse the movie collection in the meantime."
      : state.activeView === "watchlist" && !state.searchTerm
        ? "Your list is empty. Save movies to see them here."
        : "No movies match your search or selected filters.";

    elements.movieGrid.innerHTML = `
      <div class="movie-empty" role="status">
        ${emptyMessage}
      </div>
    `;
    return;
  }

  elements.movieGrid.innerHTML = movies
    .map((movie) => {
      const bookmarked = isBookmarked(movie.id) ? "active" : "";
      return `
        <article class="movie-card" data-id="${movie.id}">
          <div class="card-poster" data-open="${movie.id}">
            <img src="${movie.poster}" alt="${movie.title} poster" />
            <div class="card-overlay"></div>
            <div class="card-badges">
              <span class="card-rating">★ ${movie.rating}</span>
              <button class="card-bookmark ${bookmarked}" data-bookmark="${movie.id}" aria-label="Bookmark ${movie.title}">
                ${bookmarked ? "✓" : "+"}
              </button>
            </div>
          </div>
          <div class="card-info">
            <div class="card-title-row">
              <h3>${movie.title}</h3>
              <span class="movie-year">${movie.year}</span>
            </div>
            <span class="movie-genre">${movie.genre}</span>
            <div class="movie-meta">
              <span>${movie.runtime}</span>
              <span>${movie.status}</span>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  elements.movieGrid.querySelectorAll("[data-bookmark]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleBookmark(Number(button.dataset.bookmark));
    });
  });

  elements.movieGrid.querySelectorAll("[data-open]").forEach((card) => {
    card.addEventListener("click", () => openMovieModal(Number(card.dataset.open)));
  });
}

function renderBookmarks() {
  elements.bookmarkCount.textContent = state.bookmarks.length;

  if (!state.bookmarks.length) {
    elements.bookmarkList.innerHTML = '<div class="bookmark-empty">No saved movies yet. Add a few to your watchlist.</div>';
    return;
  }

  const bookmarkedMovies = state.bookmarks
    .map((id) => getMovieById(id))
    .filter(Boolean);

  elements.bookmarkList.innerHTML = bookmarkedMovies
    .map(
      (movie) => `
        <div class="bookmark-item">
          <img src="${movie.poster}" alt="${movie.title} poster" />
          <div>
            <strong>${movie.title}</strong>
            <span>${movie.genre} • ${movie.year}</span>
          </div>
        </div>
      `
    )
    .join("");
}

function openMovieModal(movieId) {
  const movie = getMovieById(movieId);
  if (!movie) return;

  elements.modalPoster.src = movie.poster;
  elements.modalPoster.alt = `${movie.title} poster`;
  elements.modalTitle.textContent = movie.title;
  elements.modalYear.textContent = movie.year;
  elements.modalGenre.textContent = movie.genre;
  elements.modalRuntime.textContent = movie.runtime;
  elements.modalRating.textContent = `★ ${movie.rating}`;
  elements.modalDescription.textContent = movie.description;
  elements.modalTags.innerHTML = movie.tags.map((tag) => `<span>${tag}</span>`).join("");

  const active = isBookmarked(movie.id);
  elements.modalBookmarkBtn.textContent = active ? "✓ Added" : "+ Watchlist";
  elements.modalBookmarkBtn.style.background = active
    ? "rgba(118, 228, 163, 0.14)"
    : "rgba(255,255,255,0.06)";
  elements.modalBookmarkBtn.style.borderColor = active
    ? "rgba(118, 228, 163, 0.4)"
    : "rgba(255,255,255,0.08)";

  elements.movieModal.classList.remove("hidden");
  elements.movieModal.setAttribute("aria-hidden", "false");
}

function closeMovieModal() {
  elements.movieModal.classList.add("hidden");
  elements.movieModal.setAttribute("aria-hidden", "true");
}

function attachEvents() {
  document.querySelectorAll("[data-view]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const { view } = link.dataset;

      state.activeView = view;
      state.activeGenre = "all";
      state.activeSort = "popularity";
      state.searchTerm = "";
      elements.searchInput.value = "";

      document.querySelectorAll(".main-nav [data-view]").forEach((navLink) => {
        const isActive = navLink.dataset.view === view;
        navLink.classList.toggle("active", isActive);
        if (isActive) {
          navLink.setAttribute("aria-current", "page");
        } else {
          navLink.removeAttribute("aria-current");
        }
      });

      document
        .querySelectorAll(".chip[data-genre]")
        .forEach((chip) => chip.classList.toggle("active", chip.dataset.genre === "all"));
      document
        .querySelectorAll(".chip[data-sort]")
        .forEach((chip) => chip.classList.toggle("active", chip.dataset.sort === "popularity"));

      renderMovies();
      document.getElementById(view === "home" ? "home" : "movies").scrollIntoView();
    });
  });

  elements.searchInput.addEventListener("input", (event) => {
    state.searchTerm = event.target.value.trim();
    renderMovies();
  });

  document.querySelectorAll(".chip[data-genre]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeGenre = button.dataset.genre;
      document
        .querySelectorAll(".chip[data-genre]")
        .forEach((chip) => chip.classList.toggle("active", chip === button));
      renderMovies();
    });
  });

  document.querySelectorAll(".chip[data-sort]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeSort = button.dataset.sort;
      document
        .querySelectorAll(".chip[data-sort]")
        .forEach((chip) => chip.classList.toggle("active", chip === button));
      renderMovies();
    });
  });

  elements.featuredBookmarkBtn.addEventListener("click", () => {
    const featured = movieData.find((movie) => movie.featured) || movieData[0];
    toggleBookmark(featured.id);
  });

  elements.modalBookmarkBtn.addEventListener("click", () => {
    const title = elements.modalTitle.textContent;
    const movie = movieData.find((item) => item.title === title);
    if (movie) toggleBookmark(movie.id);
  });

  document.querySelectorAll("[data-close]").forEach((el) => {
    el.addEventListener("click", closeMovieModal);
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMovieModal();
  });
}

renderFeaturedMovie();
renderMovies();
renderBookmarks();
attachEvents();
