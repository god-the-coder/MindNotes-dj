console.log("js loaded");
console.log("its working");


function searchNotes() {
  const searchInput = document.getElementById("noteSearch");

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();

    const notes = document.querySelectorAll(".note-div");

    let hasResult = false;

    notes.forEach(note => {
      const title = note.dataset.title.toLowerCase();
      const content = note.dataset.content.toLowerCase();
      const tags = (note.dataset.tags || "").toLowerCase();

      if (
        title.includes(query) ||
        content.includes(query) ||
        tags.includes(query)
      ) {
        note.style.display = "block";
        hasResult = true;
      } else {
        note.style.display = "none";
      }
    });

    // optional "no results" message
    let msg = document.querySelector(".no-search-results");

    if (!hasResult && query !== "") {
      if (!msg) {
        msg = document.createElement("div");
        msg.className = "no-search-results";
        msg.textContent = "No matching notes 😢";
        document.querySelector(".showcase").appendChild(msg);
      }
    } else if (msg) {
      msg.remove();
    }
  });

}


function formatDate(isoString) {
  return new Date(isoString).toLocaleString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}


async function loadShowCase() {

  try {
    const res = await fetch("/api/notes/"); // get is default
    const datas = await res.json();

    const showcase = document.querySelector(".showcase");

    //  SEARCH BAR
    const searchWrapper = document.createElement("div");
    searchWrapper.className = "w-[95%] mt-3 mb-2 sticky top-2 z-10";

    searchWrapper.innerHTML = `
      <input
        type="text"
        id="noteSearch"
        placeholder="Search notes..."
        class="w-full px-4 py-2 rounded-xl bg-[#1f2226] text-white placeholder-gray-400
               outline-none border border-white/10
               focus:border-cyan-400/50
               transition-all duration-300"
      />
    `;

    showcase.appendChild(searchWrapper);

    if (datas.length === 0) {
      showcase.innerHTML = `<div class="text-gray-400 mt-4">no notes 😢</div>`;
      return;
    }

    datas.forEach(data => {
      const noteDiv = document.createElement("div");

      noteDiv.classList.add(
        "note-div",
        "w-[95%]",
        "h-[12%]",
        "bg-[#272A2E]/80",     // enhanced depth
        "m-1",
        "rounded-2xl",

        // interaction & animation
        "transition-all",
        "duration-300",
        "ease-out",
        "cursor-pointer",
        "group",

        // hover effects
        "hover:scale-[1.02]",
        "hover:-translate-y-1",
        "hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
      );

      noteDiv.dataset.title = data.title;
      noteDiv.dataset.content = data.notes;
      noteDiv.dataset.time = data.updated_time;
      noteDiv.dataset.id = data.id;
      noteDiv.dataset.tags = JSON.stringify(data.tags || []);
      const formt_date = formatDate(data.updated_time)


      noteDiv.innerHTML = `
      <div class="p-3 font-bold truncate">${data.title}</div>
      <div class="pl-3 text-xs text-gray-400">
          <div> ${formt_date} </div>
      </div>
      `;

      showcase.appendChild(noteDiv);
    });

    searchNotes();
    // console.log(data);
  } catch (error) {
    console.log(error);
  }


  // console.log();


}


async function saveNote(e) {
  e.preventDefault();

  const form = e.target;

  const data = {
    title: form.title.value,
    // tags: [form.tags.value],
    notes: form.notes.value,
    // date_time: new Date()
  };

  const res = await fetch("/api/notes/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCSRFToken()
    },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    // refresh notes list or redirect
    // Reloads the current page
    window.location.reload(); 

  } else {
    console.error("Failed to create note");
  }
}


async function deleteNote(pk) {
  console.log(pk);

  if (!confirm("Are you sure to delete this note ?")) return;

  const res = await fetch(`/api/notes/${pk}`, {
    method: "DELETE",
    headers: {
      "X-CSRFToken": getCSRFToken()
    }
  })

  if (res.status === 204) {
    location.reload();
    console.log("note dlted");
  }
  else {
    console.log("error");
  }
}


async function editNote(pk) {

  const form = document.getElementById("edit-form");

  const data = {
    title: form.title.value,
    // tags: [form.tags.value],
    notes: form.notes.value
  };

  const res = await fetch(`/api/notes/${pk}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCSRFToken()
    },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    // refresh notes list or redirect
    location.reload();
    console.log("Note created");
  } else {
    console.error("Failed to create note");
  }

}


function getCSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').content;
}


function create_note() {
  const hero = document.querySelector(".hero");

  hero.innerHTML = `
    <form class="h-full w-full p-4 flex flex-col gap-4" onsubmit="saveNote(event)">

      <!-- Header -->
      <div class="flex items-start justify-between gap-4">

        <input
          type="text"
          name="title"
          placeholder="Title..."
          class="w-full text-2xl font-semibold text-white bg-transparent outline-none border-b"
          required
        />


      </div>

      <div class="text-sm text-gray-400">
        New note
      </div>

      <hr class="border-[#272A2E]" />

      <textarea
        name="notes"
        placeholder="Start writing..."
        class="flex-1 resize-none bg-transparent outline-none text-base text-gray-200"
        required
      ></textarea>

      <div class="flex gap-3 pt-3 border-t border-[#272A2E] justify-end">
        <button type="submit" class="px-4 py-2 rounded-lg bg-blue-600">
          Save
        </button>

        <button type="reset" class="px-4 py-2 rounded-lg bg-gray-600">
          Cancel
        </button>
      </div>

    </form>
  `;
}


function main() {

  let showcase = document.querySelector(".showcase");
  let new_notes = document.querySelectorAll(".new_note")[0];


  showcase.addEventListener("click", (e) => {

    const note = e.target.closest(".note-div");

    if (!note) return;

    let title = note.dataset.title;
    let time = note.dataset.time;
    let content = note.dataset.content;
    let tags = JSON.parse(note.dataset.tags || "[]");
    let pk = note.dataset.id


    const hero = document.getElementsByClassName("hero")[0];


    hero.innerHTML = `
    <form id="edit-form" class="h-full w-full p-4 flex flex-col gap-4">

      <!-- Header -->
      <div class="flex items-start justify-between gap-4">

        <input
          type="text"
          name="title"
          placeholder="Title..."
          value="${title}"
          class="w-full text-2xl font-semibold text-white bg-transparent outline-none border-b"
          required
        />

        <input
          type="text"
          name="tags"
          placeholder="tags (comma separated)"
          value="${tags}"
          class="max-w-[40%] bg-transparent text-sm text-gray-200 outline-none border-b text-right"
        />

      </div>

      <div class="text-sm text-gray-400">
        New note
      </div>

      <hr class="border-[#272A2E]" />

      <textarea
        name="notes"
        placeholder="Start writing..."
        class="flex-1 resize-none bg-transparent outline-none text-base text-gray-200"
        
      >${content}</textarea>

      <div class="flex gap-3 pt-3 border-t border-[#272A2E] justify-end">
        <button type="button" onclick="deleteNote(${pk})" class="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition">
          Delete
        </button>

        <button onclick="editNote(${pk})" type="button" class="px-4 py-2 rounded-lg bg-blue-600">
          Save
        </button>

        <button type="reset" class="px-4 py-2 rounded-lg bg-gray-600">
          Cancel
        </button>
      </div>

    </form>
  `;



    // const note = document.n

    // hero.classList.remove("opacity-100", "scale-100");
    // hero.classList.add("opacity-0", "scale-95")

    // hero.innerHTML = `
    // <div class="h-full w-full p-4 flex flex-col gap-4">
    // <!-- Header: Title + Tags -->
    // <div class="flex items-start justify-between gap-4">

    // <!-- Title -->
    // <h1 class="text-2xl font-semibold text-white wrap-break-word">
    // ${title}
    // </h1>

    // <!-- Tags -->
    // <div class="flex flex-wrap gap-2 justify-end max-w-[40%]">
    // ${tags && tags.length ? tags.map(tag => `
    //     <span class="px-3 py-1 text-xs rounded-full 
    //     bg-[#3A3D42] text-gray-200 
    //     whitespace-nowrap">
    //     ${tag}
    //     </span>
    //     `).join("") : ""}
    //     </div>

    //     </div>

    //     <!-- Meta -->
    //     <div class="text-sm text-gray-400">
    //     Created on ${time}
    //     </div>

    //     <!-- Divider -->
    //     <hr class="border-[#272A2E]" />

    //     <!-- Content -->
    //     <div class="flex-1 overflow-y-auto text-base leading-relaxed text-gray-200">
    //     ${content}
    //     </div>

    //     <!-- Actions -->
    //     <div class="flex gap-3 pt-3 border-t border-[#272A2E]">
    //     <button onclick="editNote(${pk})" class="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition">
    //     Edit
    //     </button>
    //     <button onclick="deleteNote(${pk})" class="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition">
    //     Delete
    //     </button>
    //     </div>

    //     </div>
    //     `;

    // requestAnimationFrame(() => {
    //     hero.classList.remove("opacity-0", "scale-95");
    //     hero.classList.add("opacity-100", "scale-100");
    // })

  })


  new_notes.addEventListener("click", () => {
    create_note();
  })

  loadShowCase();
}


main();