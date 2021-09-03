let startBtn = document.querySelector("#start");
let ammount = document.querySelector("#questions");
let categoryId = document.querySelector("#category");
var qq = document.getElementById("qqq");

startBtn.addEventListener("click", function () {
  var link = document.getElementById("nav-ask");

  link.style.visibility = "hidden";

  Jsondata();
});
function Jsondata() {
  const MAX_QUESTIONS = ammount.value;
  const CATEGORY = categoryId.value;

  const url = `https://opentdb.com/api.php?amount=${MAX_QUESTIONS}&category=${CATEGORY}&type=multiple`;
  console.log(url);

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let quizJsonData = this.response;
      let Quizques = JSON.parse(quizJsonData);
      let results = Quizques["results"];
      let size = results.length;
      let questions = results["question"];

      let data = [];
      var pair = [];

      let newdiv = document.querySelector("#master");
      let div4 = document.createElement("div");
      newdiv.appendChild(div4);

      let count = 0;
      var correctcount = document.createTextNode(count);
      div4.appendChild(correctcount);

      results.forEach(function (result) {
        let quess = result["question"];
        let ans = result["correct_answer"];
        let wans = result["incorrect_answers"];
        wans.push(ans);
        console.log(ans);

        var currentIndex = wans.length;
        var randomIndex;
        while (currentIndex != 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;

          [wans[currentIndex], wans[randomIndex]] = [wans[randomIndex], wans[currentIndex]];
        }

        let div = document.createElement("div");
        let div2 = document.createElement("div");
        let div3 = document.createElement("div");
        let button = document.createElement("button");

        div.style.marginLeft = "1020px";
        div.style.textAlign = "center";
        div.style.width = "50%";
        div.style.height = "40px";
        div.style.background = "blue ";
        div.style.margin = "5px";
        div.style.color = "white";
        div.style.border = "5px outset red";
        div.style.cssText += "color:white;background-color:black";
        div.style.align = "center";

        div2.style.border = "5px outset green";
        div2.style.width = "20%";
        div2.style.height = "50px";
        div2.style.background = "#98a5da ";
        div2.style.margin = "5px";
        div2.style.textAlign = "center";
        div2.style.marginLeft = "450px";

        div3.style.display = "none";
        div3.class = "answershow";
        div3.style.width = "30%";
        div3.style.height = "20px";
        div3.style.background = "#20dd20";
        div3.style.margin = "5px";
        div3.style.color = "black";
        div3.style.textAlign = "right";

        div4.style.marginLeft = "450px";
        div4.style.border = "10px outset blue";
        div4.style.width = "80px";
        div4.style.height = "40px";
        div4.id = "score";
        div4.style.background = "black ";
        div4.style.margin = "5px";
        div4.style.textAlign = "center";
        div4.style.color = "white ";

        button.style.display = "none";
        button.style.width = "80px";
        button.style.height = "30px";
        button.innerHTML = "show ANS";
        button.onclick = function () {
          div3.style.display = "block";
        };
        var choice = wans;
        var j = 0;
        choice.forEach((choiceValue, i) => {
          var labelValue = document.createElement("label");
          labelValue.innerHTML = choiceValue;
          var inputValue = document.createElement("input");
          inputValue.type = "radio";
          inputValue.name = choice;
          inputValue.value = choiceValue;

          div2.appendChild(inputValue);
          div2.appendChild(labelValue);
          inputValue.addEventListener("click", function (event) {
            var item = event.target.value;
            if (item == ans) {
              div2.style.background = "green";
              div3.style.display = "block";
              count++;
              console.log(count);
              for (let i = 0; i < choice.length; i++) {
                document.getElementsByName(choice)[i].disabled = true;
              }
              document.getElementById("score").innerHTML = count;
            } else {
              for (let i = 0; i < choice.length; i++) {
                document.getElementsByName(choice)[i].disabled = true;
              }
              div2.style.background = "red";
              count--;

              document.getElementById("score").innerHTML = count;
              div3.style.display = "block";
            }
          });
        });

        div4.appendChild(correctcount);
        document.getElementById("score").innerHTML = "Your Score";

        var correct1 = document.createTextNode(ans);
        var Answers = document.createTextNode(wans);
        var ques = document.createTextNode(quess);

        div.appendChild(ques);
        div3.appendChild(correct1);

        newdiv.appendChild(div);
        newdiv.appendChild(div2);

        newdiv.appendChild(button);
        newdiv.appendChild(div3);
      });
    }
  };

  xhttp.open("GET", url, true);
  xhttp.send();
}
