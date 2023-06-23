// *************валидация формы
const inputs = document.querySelectorAll("input, textarea");
// подсветка error
inputs.forEach((input) => {
  input.addEventListener(
    "invalid",
    (event) => {
      input.classList.add("error");
    },
    false
  );
});
// удаление подсветки error
function resetInvalid(input) {
  input.classList.remove("error");
  console.log("asda");
}
inputs.forEach((input) => {
  input.addEventListener("input", () => resetInvalid(input), true);
});

// *************анимация page mission
const imageContent = document.querySelector(".mission_left__content");
const missionRight = document.querySelector(".mission_right");
const observer = new IntersectionObserver(
  ([entry]) => {
    console.log("TOTAL ========\n", entry.isIntersecting,
    entry.isVisible,
    entry.intersectionRatio);
    if (
      (entry.isIntersecting && entry.intersectionRatio >= 0.75) ||
      (entry.isVisible && entry.intersectionRatio >= 0.75)
    ) {
      console.log("add style");
      imageContent.classList.add("mission_left__content_anim");
      missionRight.classList.add("mission_right__anim");
    } else if (entry.intersectionRatio < 0.5){
      console.log("remove style");
      imageContent.classList.remove("mission_left__content_anim");
      missionRight.classList.remove("mission_right__anim");
    }
  },
  {
    rootMargin: "0px 0px 0px 0px",
    threshold: [.5, .75],
  }
);
const mission = document.querySelector(".flex__mission_left");
observer.observe(mission);

// *************анимация cookie
const cookie = document.querySelector(".flex_cookie");
setTimeout(() => {
  cookie.classList.remove("vis");
}, 500);
function hiddenCookie() {
  console.log("hide");
  cookie.classList.add("vis");
}
