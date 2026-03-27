let count = 0;
let target = 10;
let bossSpawned = false;

const scoreText = document.getElementById("score");
const bgm = document.getElementById("bgm");
const pop = document.getElementById("pop");

// เล่นเพลงเมื่อมี interaction
document.body.addEventListener("click", ()=>{
  bgm.play();
}, {once:true});

// ฟังก์ชันเสียง
function playSound(){
  pop.currentTime = 0;
  pop.play();
}

// สร้างหัวใจ
let heartInterval = setInterval(()=>{
  let h=document.createElement("div");
  h.innerHTML="💗";
  h.className="heart";
  h.style.left=Math.random()*90+"vw";

  function clickHeart(e){
    playSound();

    heartExplosion(e.clientX, e.clientY);

    count++;
    scoreText.innerText = count + " / " + target;
    h.remove();

    if(count>=7 && !bossSpawned){
      spawnBoss();
      bossSpawned=true;
    }

    if(count>=target){
      winGame();
    }
  }

  h.addEventListener("click", clickHeart);
  h.addEventListener("touchstart", clickHeart);

  document.body.appendChild(h);
  setTimeout(()=>h.remove(),4000);

},700);

// บอส
function spawnBoss(){
  let b=document.createElement("div");
  b.innerHTML="💖";
  b.className="boss";
  b.style.left=Math.random()*80+"vw";

  function bossClick(e){
    playSound();
    heartExplosion(e.clientX, e.clientY);
    winGame(true);
    b.remove();
  }

  b.addEventListener("click", bossClick);
  b.addEventListener("touchstart", bossClick);

  document.body.appendChild(b);
  setTimeout(()=>b.remove(),6000);
}

// เอฟเฟกต์อลัง
function heartExplosion(x,y){
  for(let i=0;i<60;i++){
    let h=document.createElement("div");
    h.innerHTML = ["💖","💗","💘","💝"][Math.floor(Math.random()*4)];
    h.className="winHeart";

    h.style.left = x + "px";
    h.style.top = y + "px";
    h.style.fontSize = (20 + Math.random()*40) + "px";

    let angle = Math.random()*2*Math.PI;
    let distance = 100 + Math.random()*200;

    let moveX = Math.cos(angle)*distance + "px";
    let moveY = Math.sin(angle)*distance + "px";

    h.style.setProperty("--x", moveX);
    h.style.setProperty("--y", moveY);

    document.body.appendChild(h);
    setTimeout(()=>h.remove(),1500);
  }
}

// ชนะ
function winGame(){
  clearInterval(heartInterval);
  heartExplosion(window.innerWidth/2, window.innerHeight/2);

  setTimeout(()=>{
    window.location.href="cinema.html";
  },2000);
}