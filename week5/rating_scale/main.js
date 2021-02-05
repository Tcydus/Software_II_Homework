const slideValue = document.querySelector("span");
const inputSlider = document.querySelector("input");
inputSlider.oninput = (() =>{
  let value = inputSlider.value;
  slideValue.textContent = value;
  newValue = Number((value - inputSlider.min) *100 / (inputSlider.max - inputSlider.min))
  const newPosition = 10 - (newValue * 0.2)
  slideValue.style.left = `calc(${newValue}% + (${newPosition}px))`;
  slideValue.classList.add("show");

});

inputSlider.onblur = (() =>{
  slideValue.classList.remove("show");
});

