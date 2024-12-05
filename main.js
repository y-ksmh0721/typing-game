let untyped = "";
let typed ="";
let score = 0;

const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');

const textLists = [
  'Hello Unko','Hello World','This is my App','How are you?',
   'Today is sunny','I love JavaScript!','Unko Big','Smal Unko',
];

const createText = () => {
  // 正タイプした文字列をクリア
  typed = "";
  typedfield.textContent = typed;

  let random = Math.floor(Math.random()*textLists.length);
  untyped = textLists[random];
  untypedfield.textContent = untyped;

};

const keyPress = e => {

  if(e.key !== untyped.substring(0, 1)){
    wrap.classList.add('mistyped');

    //100msで元に戻す
    setTimeout(()=>{
      wrap.classList.remove('mistyped');
    },100)
    return;
  }

  score++;
  typed += untyped.substring(0, 1);
  untyped = untyped.substring(1);
  typedfield.textContent = typed;
  untypedfield.textContent = untyped;

  // テキストがなくなったら新いテキストを表示
  if(untyped === ''){
    createText();
  }
};

const rankCheck = score => {
  
  let text = "";
  
  if(score < 100){
    text = "あなたのランクはCです。\nBランクまであと${100 - score}文字です";
  } else if(score <200){
    text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;   
  } else if(score < 300){
    text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;
  } else if(score >= 300){
    text = `あなたのランクはSです。\nおめでとうございます!`;  
  }

  return `${score}文字打てました！\n${text}\n[OK]リトライ / [キャンセル]終了`;
};

//ゲーム終了時
const gameOver = id => {
  clearInterval(id);

  const result =confirm(rankCheck(score));

  if(result == true){
    window.location.reload();
  } 
};


//タイマーの処理
const timer = () =>{

  const id = setInterval(()=>{
      // カウントのテキストを取得
      let time = count.textContent;
      // タイマーを１ずつ引く
      time--;
      count.textContent = time;
      //０になったら止める
      if(time <= 0){
            gameOver(id);
          }
    },1000);

};

start.addEventListener('click',()=>{
  timer();

  createText();

  start.style.display = 'none';

  document.addEventListener('keypress',keyPress);
});

untypedfield.textContent = "スタートボタンで開始";