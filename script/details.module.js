import { y, display } from "./index.js";

document.addEventListener("DOMContentLoaded", () => {
    console.log(y.ids);
});

let Details = document.getElementById("Details");
let card = document.getElementById("Cards");
let nav = document.getElementById("nav")
let loading = document.getElementById("loading");

class GamesDetails {
    async getGameDetails(ID) {
        showLoading();
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '3a819aa11emshc7d4ffcc97a9695p15ea99jsn0d09f2d9cc04',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };

        try {
            const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${ID}`, options);
            const response = await api.json();
            return response;
        } catch (error) {
            console.error('Error fetching game details:', error);
        } finally {
            hideLoading();
        }
    }
}

function showLoading() {
    loading.classList.remove("d-none");
}

function hideLoading() {
    loading.classList.add("d-none");
}

const z = new GamesDetails();

export function addEventListeners() {
    document.querySelectorAll(".col-md-3").forEach(element => {
        element.addEventListener("click", async function() {
            let ID = element.getAttribute("data-id");
            console.log(ID); 
            const gameDetails = await z.getGameDetails(ID); 
            displays.renderGames(gameDetails); 
            Details.classList.replace("d-none", "d-block"); 
            card.classList.add("d-none");
            nav.classList.add("d-none")
        });
    });
}

class DisplayDetails {
    constructor() {
    }

    renderGames(game) {
        let cartoona = "";

        if (game) {
            let Title = game.title;
            let Genre = game.genre;
            let platform = game.platform;
            let Desc = game.description;
            let img = game.thumbnail;
            let status = game.status;
            let url = game.game_url;

            cartoona +=
                `<div class="container-fluid position-relative">
                    <h1 class="ps-5 pt-5">Details Game</h1>
                    <div class="row">
                        <div class="col-md-4">
                            <img src="${img}" class="w-100 ms-3" >
                        </div>
                        <div class="col-md-8">
                            <div class="content d-block">
                                <h2>Title: ${Title}</h2>
                                <span class="d-block">Category: <span class="box bg-success ps-2 pe-2">${Genre}</span></span>
                                <span class="d-block">Platform: <span class="box bg-success ps-2 pe-2">${platform}</span></span>
                                <span class="d-block">Status: <span class="box bg-success ps-2 pe-2">${status}</span></span>
                            </div>
                            <p class="pe-5">${Desc}</p>
                            <a href="${url}" class="text-decoration-none">
                                <button class="btn-outline-success bg-black text-warning">Show More</button>
                            </a>
                            <button id="ReturnButton" class="btn-outline-success bg-black text-warning">Return</button>
                        </div>
                    </div>
                </div>`;

            document.getElementById('Details').innerHTML = cartoona;



            let returnButton = document.getElementById("ReturnButton");
            returnButton.addEventListener("click", function () {
                card.classList.remove("d-none");
                Details.classList.replace("d-block", "d-none");
                nav.classList.remove("d-none")

            });
        } else {
            console.log(`No game details found`);
        }
    }
}

let displays = new DisplayDetails();





let navbar = document.querySelector(".navbar-nav");
let children = navbar.children;

for (let i = 0; i < children.length; i++) {
    let child = children[i];
    child.querySelector(".nav-link").addEventListener("click", function() {
        for (let j = 0; j < children.length; j++) {
            children[j].querySelector(".nav-link").classList.remove("active");
        }
        this.classList.add("active");
    });
}


