function Soru(sorumetni,cevabsecenekleri,dogruCevap){
    this.sorumetni =sorumetni;
    this.cevabsecenekleri = cevabsecenekleri;
    this.dogruCevap = dogruCevap;
}

let cart =  document.querySelector('.cart')
let answer = document.querySelector('.answer')
let question =document.querySelector('.question')
let cart2 =  document.querySelector('.cart-two')
let sorusayi = document.querySelector('.soru-sayi')

 let sorular = [
    new Soru("1-hangisi js frameworkudur",{"a":"react", "b":"typescript","c":"npm","d":"bootstrap"},"a"),
    new Soru("2- Hangisi bir veritabanı yönetim sistemidir?",{"a":"MongoDB", "b":"Redux is framework","c":"GraphQL","d":"jQuery"},"a"),
    new Soru("3-hangisi proqramlasdirma dilidir ",{"a":"html", "b":"css","c":"java","d":"bootstrap"},"c"),
    new Soru("4-Hangisi bir CSS ön işlemcisidir?",{"a":"LESS", "b":"Sass","c":"Stylus","d":"jQuery"},"b"),
    new Soru("5- Hangisi bir backend teknolojisidir?",{"a":"Express.js", "b":"React.js","c":"Vue.js","d":" Angular.js"},"a")  
  ]

  function Quiz(sorular){
    soruIndex = 0;
    this.sorular = sorular;
  }
  Quiz.prototype.soruGetir = function(){
    return this.sorular[soruIndex];
  }
  const quiz = new Quiz(sorular)

  function SoruGoster(soru){
    let questions = `<span>${soru.sorumetni}</span>`;
    let options = ``;
    for(let secenek in soru.cevabsecenekleri){
       options += `
        <div class="option">
        <span><b>${secenek}</b>: ${soru.cevabsecenekleri[secenek]}</span>
        </div>
        `
      } 
      document.querySelector('.question').innerHTML = questions;
      document.querySelector('.answer').innerHTML = options;
  }  

  document.querySelector('.btn').addEventListener('click', function() {
    document.querySelector('.btn_start').classList.add('passive')
    cart.classList.add('active')
    sorusayi.innerText = `${sorular.length} \\ ${soruIndex+1}`
    SoruGoster(quiz.soruGetir())
    DogruCevap(quiz.soruGetir().dogruCevap)
    clearInterval(clear)
    LineTime()
    NumberTime(5)
 });

document.querySelector('.sonraki-soru').addEventListener('click',function(){
  if(soruIndex <sorular.length-1){ 
  soruIndex +=1;
  sorusayi.innerText = `${sorular.length} \\ ${soruIndex+1}`
  SoruGoster(quiz.soruGetir())   
  DogruCevap(quiz.soruGetir().dogruCevap)
  clearInterval(clear)
  LineTime()
  clearInterval(count)
  NumberTime(5)
  }else{
    cart.classList.remove('active')
    cart2.classList.add('active')
    document.querySelector('#sorusayi').innerText = `TRUE: ${sorular.length} \\ ${sum}`
  }
})

document.querySelector('.onceki-soru').addEventListener('click',function(){
  if(soruIndex >0){
  soruIndex -=1;
  SoruGoster(quiz.soruGetir())
  clearInterval(clear)
  LineTime()
  clearInterval(count)
  NumberTime(5)
  }else{
    return;
  }
})

let sum=0
function DogruCevap(cevap){
  document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', function(){       
  if( this.querySelector('span b').innerText === cevap ){
      this.style.backgroundColor = 'green'
      sum +=1
  }else{
   this.style.backgroundColor = 'red'
  }   
  setTimeout(function(){
    document.querySelector('.sonraki-soru').click();
  },500)
  })
    })
}

let clear;
function LineTime(){
  let clear = setInterval(timeline,10)
  let time_line = 0;
   function timeline(){
    time_line +=1;
    document.querySelector('.timeline').style.width = time_line + 'px';
    if(time_line>440){
      clearInterval(clear)
    }
   }        
     }

let count;
function NumberTime(number){
  clearInterval(count)
  document.querySelector('.time_number').innerText = `Time: ${number}`;
  count = setInterval(numbertime,1000)
  function numbertime(){
    number--;
    document.querySelector('.time_number').innerText = `Time: ${number}`;
    if(number<0){
     clearInterval(count)
     document.querySelector('.sonraki-soru').click();
    }
  }
}

document.querySelector('#yenidenbaslat').addEventListener('click',function(){
  soruIndex = 0; 
  sum = 0; 
  document.querySelector('.btn_start').classList.remove('passive'); 
  cart2.classList.remove('active'); 
  cart.classList.remove('active'); 
})

