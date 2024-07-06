import { addEventListeners } from "./details.module.js";
let categories = ["mmorpg", "shooter", "sailing", "permadeath", "superhero", "pixel"];
let gameResponses = {};
let ID = {}
let ids = []
let loading = document.getElementById("loading");

ID = JSON.parse(JSON.stringify(ids));
class GameRepository {
    async getGames(categories) {
        showLoading() 
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '3a819aa11emshc7d4ffcc97a9695p15ea99jsn0d09f2d9cc04',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };

        for (let type of categories) {
            try {
                const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${type}`, options);
                const response = await api.json();
                gameResponses[type] = response;
                console.log(response);

            } catch (error) {
                console.error(`Failed to fetch games for category ${type}:`, error);
            } finally{
                hideLoading()
            }
        }
    }
}

function showLoading() {
    loading.classList.remove("d-none");
}

function hideLoading() {
    loading.classList.add("d-none");
}


class DisplayManager {
    constructor(categories, gameResponses) {
        this.categories = categories;
        this.gameResponses = gameResponses;
    }

    async renderGames() {
        let cartoona = "";

        for (let i = 0; i < this.categories.length; i++) {
            let type = this.categories[i];
            console.log(type);

            if (this.gameResponses[type]) {
                this.gameResponses[type].forEach(game => {
                    let Title = game.title;
                    let Genre = game.genre;
                    let platform = game.platform;
                    let Desc = game.short_description;
                    let img = game.thumbnail;
                    let id = game.id;
                    ids.push(id);
                    cartoona +=
                        `<div class="col-md-3" data-id="${id}">
                            <a href="#" class="text-decoration-none text-white">
                                <div class="card w-75 shadow-lg">
                                    <img src="${img}" class="card-img-top" alt="...">
                                    <div class="card-body">
                                        <div class="d-flex justify-content-between">
                                            <h5 class="card-title">${Title}</h5>
                                            <h5 class="border h-25 border-1 border-info-subtle bg-success p-1 text-white rounded">Free</h5>
                                        </div>
                                        <p class="card-text text-secondary">${Desc}</p>
                                        <div class="d-flex justify-content-between">
                                            <span>${platform}</span>
                                            <span>${Genre}</span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>`;
                });

                document.getElementById('row').innerHTML = cartoona;

                // Add event listener after elements are rendered
                addEventListeners()
            } else {
                console.log(`No games found for category ${type}`);
            }
        }
    }

}

let display = ''
const repository = new GameRepository();
repository.getGames(categories).then(() => {
     display = new DisplayManager(categories, gameResponses);
    display.renderGames();
});




class Game extends DisplayManager {
    constructor(Name, Desc, Platform, img, Title, ids) {
        super(categories, gameResponses)
        this.Name = Name;
        this.Desc = Desc;
        this.Platform = Platform;
        this.img = img;
        this.Title = Title
        this.ids = ids
    }
}
let y = new Game("hi","hi","hi","hi","Titles", ids)
console.log(y.ids);
export {y, display}