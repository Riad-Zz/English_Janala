//-------------Initial Lesson Button from API----------------------------
const getAllLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((response) => response.json())
    .then((data) => lessonButtonGenerator(data.data));
};
//------------------Calling the function to fetch from api ------------
getAllLesson();

//--------------Loading data from api and creating button------------------
const lessonButtonGenerator = (allData) => {
  const parentLessonContainer = document.getElementById("lesson-container");
  parentLessonContainer.innerHTML = "";
  allData.forEach((data) => {
    const newLesson = document.createElement("div");
    newLesson.innerHTML = `
          <div>
          <button  id ="lesson-btn-${data.level_no}" onclick="levelWiseWord(${data.level_no})" class="btn btn-outline text-[#422AD5]"><i class="fa-solid fa-book-open"></i>Lesson-${data.level_no}</button>
        </div>
        `;
    newLesson.classList.add("lesson-btn");
    parentLessonContainer.appendChild(newLesson);
  });
};

//---------------Get word for specific lessson on-click-------------------------
const levelWiseWord = (level) => {
  spinnerDisplay(true);
  const url = `https://openapi.programming-hero.com/api/level/${level}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      activeById(level);
      wordCardGenerator(data.data);
    });
};

//--------------------Button Activate on Click-----------------------
const activeById = (id) => {
  const allButtons = document.querySelectorAll(".lesson-btn div button");
  //Remove all Active
  // console.log(allButtons) ;
  for (const btn of allButtons) {
    btn.classList.remove("active");
  }
  // Clicked Active button
  const activeButton = document.getElementById(`lesson-btn-${id}`);
  activeButton.classList.add("active");
};

//-----------------Lesson wise Word appeding------------------------
const wordCardGenerator = (allWord) => {
  const wordContainerParent = document.getElementById("word-container");
  wordContainerParent.innerHTML = "";
  // console.log(allWord.length) ;
  if (allWord.length == 0) {
    const NoWordMessage = document.createElement("div");
    NoWordMessage.classList.add(
      "col-span-3",
      "flex",
      "justify-center",
      "flex-col",
      "items-center"
    );
    // NoWordMessage.classList.add('flex') ;
    NoWordMessage.innerHTML = `
            <img src="assets/alert-error.png" alt="" class="mb-2">
            <p class="bangla-font text-[#79716B] text-sm">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <p class="bangla-font text-[#292524] text-xl font-medium py-2">নেক্সট Lesson এ যান</p>
      `;
    wordContainerParent.appendChild(NoWordMessage);
    spinnerDisplay(false);
    return;
  }

  for (const word of allWord) {
    wordCardCreation(word);
  }

  //-----Better heart icon iteraction-------------
  BetterHeart();
  //-------Spinner Display off-----------------
  spinnerDisplay(false);
};

//--------------Better Heart ICon--------------------
const BetterHeart = () => {
  const allHearts = document.querySelectorAll(".heartDiv .heartIcon");
  for (const heart of allHearts) {
    heart.addEventListener("mouseenter", () => {
      // console.log("Mouse") ;
      heart.classList.remove("fa-regular");
      heart.classList.add("fa-solid", "text-red-700");
    });
    heart.addEventListener("mouseleave", () => {
      heart.classList.remove("fa-solid", "text-red-700");
      heart.classList.add("fa-regular");
    });
  }
};

//----------Word Card Creation reuseable function----------------
const wordCardCreation = (word) => {
  const wordContainerParent = document.getElementById("word-container");
  // wordContainerParent.innerHTML = "" ;
  const newWordCard = document.createElement("div");
  newWordCard.innerHTML = `
           <div class="word-card bg-white rounded-xl text-center px-3 relative">
            <p class="font-bold text-2xl pt-5">${
              word.word ? word.word : "Not found"
            } </p>
            <p class="text-xl font-medium py-6">Meaning / Pronounciation</p>
            <p class="bangla-font font-semibold text-xl">"${
              word.meaning ? word.meaning : "অর্থ পাওয়া যাই নাই"
            } / ${
    word.pronunciation ? word.pronunciation : "পাওয়া যাই নাই"
  }"</p>
            <div class="flex justify-around py-5">
              <div>
                <button onclick="loadWord(${
                  word.id
                })" class="btn btn-square bg-[#1a91ff1a]"> <i class="fa-solid fa-info"></i>
</button>
              </div>
              <div>
                <button onclick = "pronounceWord('${
                  word.word
                }')" class="btn btn-square bg-[#1a91ff1a] "><i class="fa-solid fa-volume-high"></i></button>
              </div>
            </div>
            <div onclick = "heartClickHandler(${
              word.id
            })" class = "heartDiv absolute top-2 right-3 bg-[#1a91ff1a] h-7 w-7 rounded-full flex justify-center items-center cursor-pointer"><i class="fa-regular fa-heart heartIcon"></i></div>
          </div>
        `;
  wordContainerParent.appendChild(newWordCard);
};

//--------------- Load Word Details------------------------
const loadWord = (wordId) => {
  const wordUrl = `https://openapi.programming-hero.com/api/word/${wordId}`;
  fetch(wordUrl)
    .then((res) => res.json())
    .then((data) => displayWordDetails(data.data));
};

//-----------------Word Details Display----------------------
const displayWordDetails = (allDetails) => {
  console.log(allDetails);
  const modalBox = document.getElementById("my_modal_5");
  const modalBoxAppend = document.getElementById("modal-box-parent");
  modalBoxAppend.innerHTML = "";
  modalBoxAppend.innerHTML = `
       <div class="area p-6 border border-blue-400 rounded-xl">
      <p class="text-2xl pb-4 font-bold">${allDetails.word} (<i class="fa-solid fa-microphone"></i> : ${allDetails.pronunciation})</p>
      <p class="font-semibold text-xl">Meaning</p>
      <p class="bangla-font mt-2 mb-4 font-medium text-xl">${allDetails.meaning}</p>
      <p class="font-semibold text-xl">Example</p>
      <p class="text-[#000000] text-sm pt-2 mb-4">${allDetails.sentence}</p>
      <p class="bangla-font font-medium mb-2">সমার্থক শব্দ গুলো</p>
      <div class="flex gap-2 flex-wrap " id ="synonyms">
      </div>
    </div>
    <div class="modal-action justify-start">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
         
         <button class="btn btn-active bg-[#422AD5] text-white">Complete Learning</button>
      </form>
    </div>
  `;
  allSynonymsAppend(allDetails.synonyms);
  modalBox.showModal();
};
//------------------Synonym finder---------------------
const allSynonymsAppend = (allSynonyms) => {
  const parent = document.getElementById("synonyms");
  for (const syn of allSynonyms) {
    console.log(syn);
    const synonymButton = document.createElement("button");
    synonymButton.innerHTML = `
          <button class="btn bg-[#EDF7FF]">${syn}</button>
    `;
    parent.appendChild(synonymButton);
  }
};

//---------- load all Word from api --------------------
const loadAllWordAndSearch = (wordToSearch) => {
  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
      const allWordCollection = data.data;
      //  console.log(allWordCollection) ;
      allWordCollection.forEach((word) => {
        const singleword = word.word.toLowerCase().trim();
        // console.log(singleword) ;
        if (singleword.includes(wordToSearch)) {
          //  console.log(singleword) ;
          wordCardCreation(word);
        }
        BetterHeart();
        spinnerDisplay(false);
      });
    });
};

//------------------Search functionality--------------------------
document.getElementById("search-btn").addEventListener("click", () => {
  const allButtons = document.querySelectorAll(".lesson-btn div button");
  for (const btn of allButtons) {
    btn.classList.remove("active");
  }
  const searcedWord = document
    .getElementById("input-word")
    .value.toLowerCase()
    .trim();
  const wordContainerParent = document.getElementById("word-container");
  wordContainerParent.innerHTML = "";
  //  console.log(searcedWord) ;
  if (searcedWord != "") {
    // wordContainerParent.innerHTML = "" ;
    loadAllWordAndSearch(searcedWord);
    spinnerDisplay(true);
  }
});

//------------------Text to speech feature----------------------
function pronounceWord(word) {
  // console.log("Clicked") ;
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

//--------------Spiner display Control-------------
const spinnerDisplay = (value) => {
  if (value == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("word-container").classList.remove("hidden");
  }
};

//---------------------Heart Click Handler----------------------
const heartClickHandler = (wordid) => {
  console.log("Hello");
  // console.log(wordDetails) ;
  console.log(wordid);
  //---------------fetching word--------------------
  const defaultNoSelection = document.getElementById("default");
  defaultNoSelection.innerHTML = "";
  fetch(`https://openapi.programming-hero.com/api/word/${wordid}`)
    .then((res) => res.json())
    .then((data) => {
      const fullData = data.data;
      const parentContainer = document.getElementById(
        "favorite-word-container"
      );
      const newWordBtn = document.createElement("div");
      newWordBtn.innerHTML = `
            <button onclick="loadWord(${fullData.id})" class="btn btn-soft btn-primary">${fullData.word}</button>
         `;
      parentContainer.appendChild(newWordBtn);
    });
};
