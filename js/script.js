function renderQuizzesPage(userQuizzes, allQuizzes) {
  mainEl.innerHTML = quizzesPageHTML(userQuizzes, allQuizzes);
}

function renderQuizzPage(quizz) {
  mainEl.innerHTML = quizzPageHTML(quizz);
  quizzEl = document.querySelectorAll(".quizz");
  quizzIdx = 0;
}

function renderResults(result, percentage) {
  mainEl.querySelector(".quizz-page .quizzes").innerHTML += quizzResultHTML(result, percentage);
  scroll(mainEl.querySelector(".quizz-result"));
}

function renderCreationPage(pageIndex, isEdit) {
  const htmls = [infoHTML, questionsHTML, levelsHTML];
  const fillers = [infoFiller, questionsFiller, levelsFiller];

  mainEl.innerHTML = htmls[pageIndex]();
  if (isEdit) fillers[pageIndex]();
}

function renderSuccessPage(quizzId, quizzImage, quizzTitle) {
  mainEl.innerHTML = successPageHTML(quizzId, quizzImage, quizzTitle);
}

function renderLoader() {
  mainEl.innerHTML = /*html*/ `
  <div class="loader">
  <img src="./assets/loader.gif" alt="loader" />
  <p>Carregando</p>
  </div>`;
}

function scroll(el) {
  el.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center"
  });
}

const mainEl = document.querySelector("main");

// quizz-page
let quizzEl;
let quizzPercentage;
let quizzIdx;
let playQuizz;

const quizzQuestionsCounter = {
  questions: 0,
  answered: 0,
  correct: 0
};

// creation-page
let creationQuizz;
let creationIndex = 0;
let isCreationFill = true;
let editQuizz = {
  id: 14,
  title: "O quanto você é fã de naruto?",
  image: "https://sm.ign.com/ign_br/screenshot/default/naruto-shippuden_f134.png",
  questions: [
    {
      title: "Qual o primeiro jutsu que Naruto usou?",
      color: "#123456",
      answers: [
        {
          text: "clone das sombras",
          image: "https://pm1.narvii.com/6508/970f8527d54b71c49661ef94221124bc61c13f1e_hq.jpg",
          isCorrectAnswer: true
        },
        {
          text: "rasengan",
          image: "https://www.einerd.com.br/wp-content/uploads/2018/04/rasengan.jpg",
          isCorrectAnswer: false
        },
        {
          text: "chidori",
          image: "https://nerdhits.com.br/wp-content/uploads/2021/08/kakashi-raikiri.jpg",
          isCorrectAnswer: false
        },
        {
          text: "justu da raposa",
          image:
            "https://criticalhits.com.br/wp-content/uploads/2019/04/naruto-olhos-raposa-nove-caudas-01.jpg",
          isCorrectAnswer: false
        }
      ]
    },
    {
      title: "Como o ninja Kakashi era conhecido?",
      color: "#123456",
      answers: [
        {
          text: "Kakashi do sharingan o ninja que copia",
          image: "https://nerdhits.com.br/wp-content/uploads/2021/12/kakashi-1-1200x900.jpg",
          isCorrectAnswer: true
        },
        {
          text: "Kakashi dos mil justus",
          image:
            "https://i0.wp.com/narutokonoha.com/wp-content/uploads/2019/11/Naruto-Cl%C3%A1ssico-A-decis%C3%A3o-de-Kakashi.jpg?fit=1024%2C768&ssl=1",
          isCorrectAnswer: false
        },
        {
          text: "Kakashi da folha",
          image: "https://i1.sndcdn.com/avatars-000429490611-okb192-t240x240.jpg",
          isCorrectAnswer: false
        },
        {
          text: "Kakashi Hatake",
          image:
            "https://nerdhits.com.br/wp-content/uploads/2020/09/kakashi-mascara-1-1200x720.jpg",
          isCorrectAnswer: false
        }
      ]
    },
    {
      title: "Qual é a (o) jinchuuriki que possui a biju de 7 cauda?",
      color: "#123456",
      answers: [
        {
          text: "esse ",
          image: "https://pm1.narvii.com/6452/27b9d094b494a94622d5c8526233d7bc315b9507_hq.jpg",
          isCorrectAnswer: true
        },
        {
          text: "esse",
          image: "https://narutoguides.com/wp-content/uploads/2018/05/Yugito-Nii.png",
          isCorrectAnswer: false
        },
        {
          text: "esse",
          image: "http://pm1.narvii.com/6323/022d0a7f11229af57a6ca3f973937213586ceea2_00.jpg",
          isCorrectAnswer: false
        },
        {
          text: "esse",
          image: "https://qph.cf2.quoracdn.net/main-qimg-29fde7e2fad74674352fcdd747339287-pjlq",
          isCorrectAnswer: false
        }
      ]
    }
  ],
  levels: [
    {
      title: "Hokage da aldeira folha (🍃🍃🍃🍃🍃🍃🍃)",
      image: "https://img.quizur.com/f/img5f32ce3121ad69.24124188.jpeg?lastEdited=1597165111",
      text: "você com certeza é uma grandeeeeeeeeeee fããaã",
      minValue: "90"
    },
    {
      title: "fã modinha de narutoooooo",
      image: "https://pm1.narvii.com/6319/ab01f3ff5b0b25a269752a874118a80a87521ad4_hq.jpg",
      text: "Precisa assisir muito maisssssssssssssssssssss",
      minValue: "0"
    }
  ]
};
