
let comments = undefined;

let commentId = 0;

const commentText = document.querySelector("#testimonials > div.comment > blockquote");
const userText = document.querySelector("#testimonials > div.comment > cite");

const left_button = document.querySelector(".buttons-move .left-move");
const right_button = document.querySelector(".buttons-move .right-move");

axios("../comments/comments.json")
    .then(res => {
        comments = res.data.content;
        loadComments(commentId);
    });

function updateButtons(){

    left_button.classList.toggle("disabled", commentId <= 0);
    right_button.classList.toggle("disabled", commentId >= (comments.length - 1));
}

function loadComments(comment){

    if(comment < 0 || comment >= comments.length) return;

    commentText.innerHTML = comments[comment].comment;
    userText.innerHTML = `<span class="username">${comments[comment].username}</span>, ${comments[comment].rol}`;

    updateButtons();
}

left_button.addEventListener("click", e => {

    if(e.target.classList.contains("disabled")) return;
    
    commentId--;
    loadComments(commentId);    

});

right_button.addEventListener("click", e => {

    if(e.target.classList.contains("disabled")) return;
    
    commentId++;
    loadComments(commentId);    

});