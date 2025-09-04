//-------------Initial Lesson Button from API---------------------------- 
const getAllLesson = () =>{
    fetch('https://openapi.programming-hero.com/api/levels/all')
      .then(response => response.json())
          .then(data => lessonButtonGenerator(data.data)) ;
}
//------------------Calling the function to fetch from api ------------
getAllLesson() ; 

//--------------Loading data from api and creating button------------------ 
const lessonButtonGenerator = (allData) =>{
    const parentLessonContainer = document.getElementById('lesson-container') ;
    parentLessonContainer.innerHTML ="" ;
    allData.forEach(data => {
        const newLesson = document.createElement('div') ;
        newLesson.innerHTML = `
          <div>
          <button  id ="lesson-btn-${data.level_no}" onclick="levelWiseWord(${data.level_no})" class="btn btn-outline text-[#422AD5]"><i class="fa-solid fa-book-open"></i>Lesson-${data.level_no}</button>
        </div>
        `
        newLesson.classList.add("lesson-btn")
        parentLessonContainer.appendChild(newLesson) ;
    })
}


//---------------Get word for specific lessson on-click------------------------- 
const levelWiseWord = (level) =>{
    const url = `https://openapi.programming-hero.com/api/level/${level}`
    fetch(url).then(res => res.json())
              .then(data => {
                activeById(level) ;
                wordCardGenerator(data.data) ;
              }) ;
}

//--------------------Button Activate on Click-----------------------
const activeById = id =>{
  const allButtons = document.querySelectorAll(".lesson-btn div button") ;
  //Remove all Active
  console.log(allButtons) ;
  for(const btn of allButtons){
    btn.classList.remove('active') ;
  }
  // Clicked Active button  
  const activeButton = document.getElementById(`lesson-btn-${id}`) ;
  activeButton.classList.add('active') ;
  
}

//-----------------Lesson wise Word appeding------------------------
const wordCardGenerator = allWord =>{
    const wordContainerParent = document.getElementById('word-container') ;
    wordContainerParent.innerHTML = "" ;
    // console.log(allWord.length) ;
    if(allWord.length == 0){
      const NoWordMessage = document.createElement('div') ;
      NoWordMessage.classList.add('col-span-3','flex' , 'justify-center','flex-col','items-center') ;
      // NoWordMessage.classList.add('flex') ;
      NoWordMessage.innerHTML = `
            <img src="assets/alert-error.png" alt="" class="mb-2">
            <p class="bangla-font text-[#79716B] text-sm">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <p class="bangla-font text-[#292524] text-xl font-medium py-2">নেক্সট Lesson এ যান</p>
      `
      wordContainerParent.appendChild(NoWordMessage) ;
      return ;
    }
    allWord.forEach(word => {
        // console.log(word) ;
        const newWordCard = document.createElement('div') ;
        newWordCard.innerHTML = `
           <div class="word-card bg-white rounded-xl text-center px-3">
            <p class="font-bold text-2xl pt-5">${word.word}</p>
            <p class="text-xl font-medium py-6">Meaning / Pronounciation</p>
            <p class="bangla-font font-semibold text-xl">"${word.meaning} / ${word.pronunciation}"</p>
            <div class="flex justify-around py-5">
              <div>
                <button class="btn btn-square bg-[#1a91ff1a]"> <i class="fa-solid fa-info"></i>
</button>
              </div>
              <div>
                <button class="btn btn-square bg-[#1a91ff1a]"><i class="fa-solid fa-volume-high"></i></button>
              </div>
            </div>
          </div>
        `
        wordContainerParent.appendChild(newWordCard) ;
    })
}