const animation_enter = "image-enter";
const animation_exit = "image-exit";

const timiInImage = 5000;

const animation_carrousel = "1s linear";

let childFigure = 1;

const actualFigure = () => {
    const figure = document.querySelector(`#init > div.image-carrousel > figure:nth-child(${childFigure})`)

    if (figure) return figure;

    childFigure = 1;

    return actualFigure();
};

const animationEnter = () => animation_enter + " " + animation_carrousel;
const animationExit = () => animation_exit + " " + animation_carrousel;

const updateBallSlide = () => {

    document.querySelector(".slide > .round-slide.selected").classList.remove("selected");
    document.querySelector(`.slide > .round-slide:nth-child(${childFigure})`).classList.add("selected");
}

const enterFigure = figure => {
    figure.style.display = "block";
    figure.style.animation = animationEnter();

    updateBallSlide();
}

function addSlideBall(number){

    const fragment = document.createDocumentFragment();

    for(let i = 0; i < number; i++){

        const span = document.createElement("SPAN");

        span.classList.add("round-slide");
        if(i == 0) span.classList.add("selected");

        fragment.appendChild(span);

    }

    document.querySelector(".slide").appendChild(fragment);

}

const exitFigure = figure => figure.style.animation = animationExit();

const figures = document.querySelectorAll("#init .image-carrousel figure")

addSlideBall(figures.length);

figures.forEach(n => {

    n.style.backgroundImage = `url('${n.getAttribute("bc")}')`;

    n.style.display = "none";

    n.addEventListener("animationstart", e => {
        
        if(e.animationName == animation_exit){
            childFigure++;
            enterFigure(actualFigure());
        }

    });

    n.addEventListener("animationend", e => {

        if(e.animationName == animation_exit){
            e.target.style.display = "none";
        }else if(e.animationName == animation_enter){
            setTimeout(() => exitFigure(actualFigure()), timiInImage);
        }

    });

});


const first = actualFigure();

enterFigure(first);


