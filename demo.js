var time = 1500;
var seconds = 0; // ספירת שניות
var IsGameOver = false;
var numCards = 12;
// הכנסת התמונות למערך
var images = [];
images[0] = "PIC/1.jpg";
images[1] = "PIC/2.jpg";
images[2] = "PIC/3.jpg";
images[3] = "PIC/4.jpg";
images[4] = "PIC/5.jpg";
images[5] = "PIC/6.jpg";
images[6] = "PIC/7.jpg";
images[7] = "PIC/8.jpg";
images[8] = "PIC/9.jpg";
images[9] = "PIC/10.jpg";
images[10] = "PIC/11.jpg";
images[11] = "PIC/12.jpg";



function howMuchCards(){
    var x = prompt("הקלד את מספר הקלפים איתם תרצה לשחק. \n על המספר להיות זוגי בין 2 ל24.", "12");
    if (x === null || x<2 || x>24 || x%2 != 0) {
      x = prompt("הקלד את מספר הקלפים איתם תרצה לשחק. \n על המספר להיות זוגי בין 2 ל24. \n אם תבחר מספר קטן מ2 המספר שיבחר יהיה 2. \n אם תבחר מספר גדול מ24 – המספר שיבחר יהיה 24. \n אם תבחר מספר אי זוגי המספר יעבור עיגול כלפי מטה.","12");
      if (x<2){
          x = 2;
      }
      else if(x>24){
         x = 24; 
      }
      else if(x%2 != 0){
          x--;
      }
      else{  
          x = 12;
      }
    }
    // הפיכה למספר כולל חישוב של חצי מהתמונות
    numCards = (parseInt(x));
    shuffle(images);  // עירבוב התמונות
    images = images.slice(0, numCards/2);  // חיתוך המערך למספר התמונות המבוקש
    // הכפלת המערך כדי להכפיל את תמונות
    images = images.concat(images); 
    shuffle(images);  // עירבוב התמונות שוב
}
howMuchCards();


// ערבוב המערך
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // כל עוד נשארים אלמנטים לערבב
  while (0 !== currentIndex) {

    //בחר אלמנט שנותר
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // והחליפו עם האלמנט הנוכחי.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}



// בניית טבלה
function buildTable(){
    var i =0;
    var cells = document.getElementsByClassName("back");
    // הכנסת התמונות לטבלת
    for (i; i<images.length; i++){   
        // יצירת אלמנט תמונה
        var elementPic = document.createElement("img");

        // הכנסת התמונה
        elementPic.src = images[i];
        // מיקום התמונה
        cells[i].appendChild(elementPic);
        // הצגת קלף סגור
        cells[i].parentElement.parentElement.className = "closed container";
    };
    for (i; i<cells.length; i++){ 
        // מחיקת התאים המיותרים
        cells[i].parentElement.parentElement.className = "empty";
    };
    
    var rows = document.getElementsByTagName("tr");
    var j = Math.ceil(numCards/4);6
    for (j; j<6 ; j++){
       rows[j].className = "empty"; 
    }
}


buildTable();


// ספירת זמן
function incrementSeconds() {
    seconds += 1;
    if(IsGameOver){ 
        alert("כל הכבוד!!!\nסיימת את המשחק.\nזמן המשחק הוא "+ seconds + " שניות.");
        IsGameOver = false;
    }
}
var cancel = setInterval(incrementSeconds, 1000);


// פונקצית מאזין
function flip(event){
	// האלמנמט שנבחר
    var element = event.currentTarget;
    // הפיכת הקלף
    if (element.className === "card") {
        // כאשר קלף נסגר
        if(element.style.transform == "rotateY(180deg)") {
        element.style.transform = "rotateY(0deg)";
        // הכנסת סגור
        element.parentElement.className = "closed container";
        }
        else { // הקלף נפתח
            element.style.transform = "rotateY(180deg)";
            // הכנסת פתוח
            element.parentElement.className = "open container";
            // בדיקת כמה קלפים הפוכיפ
        } 
        var openCards = document.getElementsByClassName("open container");
        if (openCards.length>1){      // אם יש יותר מ2 קלפים שנראים נעשה בדיקה
        // הוצאת התמונה
        var c1 = openCards[0].childNodes[1].childNodes[3].childNodes[1];
        c1Src = c1.src;
        var c2 = openCards[1].childNodes[1].childNodes[3].childNodes[1];
        c2Src = c2.src;

        // בדיקת שיוון
        if (c1Src == c2Src){
            equalCards(openCards[0], c1, openCards[1]), c2;
        }else 
           diffCards (openCards[0], openCards[1]);
        }
        // בדיקה האם לא נשארו קלפים
        var closedCards = document.getElementsByClassName("closed container");
        if (closedCards.length == 0){
            IsGameOver = true;
            var buttons = document.getElementsByTagName("button");
            buttons[0].style.visibility = "visible";

        }
    }
}

function equalCards(card1, img1, card2, img2){
    // אם הקלפים זהים שינוי הקלאס לנסתר 
    card1.className = "hidden";
    card1.style.backgroundImage = "url("+c1Src+")";  // הרקע הקלף הופך להיות התמונה
    card1.childNodes[1].style.visibility = "hidden";   // הסתרת הילדים

    // אם הקלפים זהים שינוי הקלאס לנסתר 
    card2.className = "hidden";
    card2.style.backgroundImage = "url("+c2Src+")";  // הרקע הקלף הופך להיות התמונה
    card2.childNodes[1].style.visibility = "hidden";   // הסתרת הילדים
}

function diffCards (card1, card2){
    // לסגור את הקלפים לאחר הזמן שבחרנו 
    var myVar = setTimeout(function changeImg() {   
    card1.className = "closed container";
    card1.childNodes[1].style.transform = "rotateY(0deg)"; 
    }, time);

    var myVar = setTimeout(function changeImg() {   
    card2.className = "closed container";
    card2.childNodes[1].style.transform = "rotateY(0deg)";     
    }, time); 
}




