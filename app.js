
let suggestion=[
    'los angeles','istanbul','new york','madrid','barcelona','manchester','liverpool','london',
    'rome','milan','torino','munich','berlin','paris','oklahoma','mexico city','','',
    'tokyo','garmsar',' ','','','tehran','shiraz','',
    'arak','kish','rasht','esfahan','seol','france','bushehr','',''
    ,'abadan','vancover','','alaska','mashhad','tabriz','miami','pekan','dubai',
    'moscow'
]           

const cityNameInputElem=document.querySelector('input')
const autocompleteWrapper=document.querySelector('.search-input')
const autocompleteBox=document.querySelector('.autocom-box')
const iconElem=document.querySelector('.icon')
let city=document.querySelector('.city')
let loader=document.querySelector('.loader')


let apiData={
    url:'https://api.openweathermap.org/data/2.5/weather?q=',
    key:'71c617e61b200b124f3cbfd960d74ddc'
}


function fetchData(){
  
    let cityName=cityNameInputElem.value

    fetch(`${apiData.url}${cityName}&&appid=${apiData.key}`)
    .then(res=> res.json())
    .then(data=>{
        console.log(data);
        showData(data)    // input data
        showDate()
        cityNameInputElem.value=''
    
    } 
)
}

window.addEventListener('keydown',()=>{
    if(cityNameInputElem.value===""){
        city.innerHTML='Northampton, GB'
        city.classList.remove('loader')
    }else{
        city.innerHTML=''
        city.classList.add('loader')
    }
   
})


function showData(data){

    let city=document.querySelector('.city')
    if(data.cod==='404'){
        city.innerHTML='your city not found'
        cityNameInputElem.value=''
    }else{
        city.innerHTML=`${data.name},${data.sys.country}`
   }
    
    let temp=document.querySelector('.temp')
      temp.innerHTML=`${Math.floor(data.main.temp-273)}°c` // k to c

      let weather=document.querySelector('.weather')
         weather.innerHTML=`${data.weather[0].main}`

         if(data.weather[0].main==='Clouds'){
            document.body.style.backgroundImage="url('cloud.jpg')";
         }else if(data.weather[0].main==='Sunny'){
             document.body.style.backgroundImage="url('sunny.jpg')";
            }else if(data.weather[0].main==='Clear'){
            document.body.style.backgroundImage="url('clear2.jpg')";
        }else if(data.weather[0].main==='Rain'){
             document.body.style.backgroundImage="url('rain.jpg')";
            }else if(data.weather[0].main==='Snow'){
             document.body.style.backgroundImage="url('snow.jpg')";
            }else if(data.weather[0].main==='Mist'){
                document.body.style.backgroundImage="url('mist.jpg')";
            }else if(data.weather[0].main==='Drizzle'){
                document.body.style.backgroundImage="url('drizzle.jpg')";
            }else if(data.weather[0].main==='Thunderstorm'){
             document.body.style.backgroundImage="url('Thunderstorm.jpg')";
            }else if(data.weather[0].main==='Haze'){
             document.body.style.backgroundImage="url('haze.jpg')";

         }


        let hilow=document.querySelector('.hi-low')
        hilow.innerHTML=`${Math.floor(data.main.temp_max-273)}°c / 
        ${Math.floor(data.main.temp_min-273)}°c `

        let date=document.querySelector('.date')
        date.innerHTML=showDate()

}

function showDate(){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let now=new Date();

    let nowWeeks=days[now.getDay()]
    let nowMonth=months[now.getMonth()]
    let nowDays=now.getDate()
    let nowYear=now.getFullYear()

    return `${nowWeeks} ${nowDays} ${nowMonth} ${nowYear}`
}

iconElem.addEventListener('click',()=>{
    if(!city.classList.toggle('loader')){
        city.classList.add('loader')
        fetchData()
        city.classList.remove('loader')
    }else{
        fetchData()    
        city.classList.remove('loader')
        
    }
})

cityNameInputElem.addEventListener('keyup',inputElem)

function inputElem(){
 

    let searchInput=cityNameInputElem.value
    if(searchInput){
        autocompleteWrapper.classList.add('active')
        
        let filteredSauggestion=suggestion.filter(function(word){// filtering
            return word.toLowerCase().includes(searchInput.toLowerCase())
    })
    suggestionWordGenerator(filteredSauggestion)
    }else{
        autocompleteWrapper.classList.remove('active')
    }
}

function suggestionWordGenerator(listArry){
    listItemsArray=listArry.map(function(word){ //autocomplete
        return `<li> ${word} </li>`  
    })
    let customList
    if(!listItemsArray.length){
  customList=`<li>${cityNameInputElem.value}</li>`
    }else{
   customList=listItemsArray.join('')
    }
  autocompleteBox.innerHTML=customList
  select()

}

function select(){
    let liElem=document.querySelectorAll('li')
   liElem.forEach(function(listItem){
    listItem.addEventListener('click',function(event){ //click li
       cityNameInputElem.value= event.target.textContent
        autocompleteWrapper.classList.remove('active')

    })
   })
}



