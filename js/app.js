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
          <button onclick="levelWiseWord(${data.level_no})" class="btn btn-outline text-[#422AD5]"><i class="fa-solid fa-book-open"></i>Lesson-${data.level_no}</button>
        </div>
        `
        parentLessonContainer.appendChild(newLesson) ;
    })
}

//---------------Get word for specific lessson on-click------------------------- 
const levelWiseWord = (level) =>{
    const url = `https://openapi.programming-hero.com/api/level/${level}`
    fetch(url).then(res => res.json())
              .then(data => wordCardGenerator(data.data)) ;
}

//-----------------Lesson wise Word appeding------------------------
const wordCardGenerator = allWord =>{
    const wordContainerParent = document.getElementById('word-container') ;
    wordContainerParent.innerHTML = "" ;
    allWord.forEach(word => {
        console.log(word) ;
        const newWordCard = document.createElement('div') ;
        newWordCard.innerHTML = `
           <div class="word-card bg-white rounded-xl text-center">
            <p class="font-bold text-3xl pt-5">${word.word}</p>
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