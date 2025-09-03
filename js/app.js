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
              .then(data => console.log(data.data)) ;
}

//-----------------Lesson wise Word container------------------------
 