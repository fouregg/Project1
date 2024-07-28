function artResponse() {
  const URL_API = "https://api.artic.edu/api/v1/artworks/search?q=cats";
  const N = 10; // кол-во карточек
  let response = $.getJSON(URL_API, (data) => {
    console.log(response);
    console.log(data);
    for (let j = 0; j < N; j++) {
      if (typeof data.data[j] == "undefined") break;
      // Получение ссылки на изображение
      const artworkId = data.data[j].id;
      const linkImg = data.data[j].api_link;
      const cardTitleText = data.data[j].title;
      console.log(`ID изображения artworkId: ${artworkId}`);
      console.log(`Link Image: ${linkImg}`);
      console.log(`Title : ${cardTitleText}`);
      // получение данных по каждой картинке, второй запрос
      let imgLinkResult;
      $.getJSON(linkImg, (imgResponse) => {
        console.log(imgResponse);
        imgLinkResult = `https://www.artic.edu/iiif/2/${imgResponse.data.image_id}/full/1000,/0/default.jpg`;

        let row = document.createElement("div");
        $(row).addClass("row mt-5 justify-content-around");
        document.body.getElementsByClassName("container")[0].appendChild(row);
        // card
        let card = document.createElement("div");
        $(card).addClass("card"); // add css class for element
        card.style.width = "25rem"; // add style property width
        row.appendChild(card); // add element like child for element row

        // image
        let imgElement = document.createElement("img");
        $(imgElement).addClass("card-img-top");
        card.appendChild(imgElement);

        // Установка src для изображения
        imgElement.setAttribute("src", imgLinkResult);
        // cardBody
        let cardBody = document.createElement("div");
        $(cardBody).addClass("card-body");
        card.appendChild(cardBody);
        // Card Title Название картины
        let cardTitle = document.createElement("h5");
        $(cardTitle).addClass("card-title");
        cardBody.appendChild(cardTitle);
        cardTitle.innerHTML = data.data[j].title;
        // Добавляем информацию о годе написания картины
        let dateEndInfo = document.createElement("h6");
        dateEndInfo.innerHTML = imgResponse.data.date_end;
        cardBody.appendChild(dateEndInfo);
        // Добавляем информацию об авторе
        let artistInfo = document.createElement("h6");
        artistInfo.innerText = imgResponse.data.artist_display;
        cardBody.appendChild(artistInfo);
        // Добавляем кнопку
        let buttonElement = document.createElement("button");
        $(buttonElement).addClass("btn btn-primary");
        buttonElement.innerHTML = "Description";
        cardBody.appendChild(buttonElement);

        // Добавляем обработчки для кнопкипапапапааааааааааааааааааааааааа

        buttonElement.addEventListener("click", () => {
          console.log("Кнопка была нажата!");
          const allCards = document.querySelectorAll(".card");
          allCards.forEach((card) => card.classList.add("not_visible"));

          // Создаем новый div для отображения информации
          let descriptionDiv = document.createElement("div");
          descriptionDiv.classList.add("descriptionDiv");
          //descriptionDiv.classList.add("descriptionDiv", "visible");
          // Добавляем классы// Добавляем класс
          descriptionDiv.innerHTML = `
            <img src="${imgLinkResult}" style="width: 100%;">
            <h1>${data.data[j].title}</h1>
            <h2>Год написания: ${imgResponse.data.date_end}</h2>
            <h2>Художник: ${imgResponse.data.artist_display}</h2>
            <p>${imgResponse.data.description || "No description available"}</p>
          `;
          console.log("Adding descriptionDiv:", descriptionDiv);
          // Добавляем описание в контейнер
          const container = document.querySelector(".container");
          container.appendChild(descriptionDiv);
        });
      });
    }
  });
}
// прописывает функция ввода и поиска, которая ищет картинки по введённому наименованию

function search_fn() {
  console.log("Test");
  console.log(document.getElementById("searchInput").value);
  let string = document.getElementById("searchInput").value.toLowerCase();
  console.log(string);
  let massive = document.body.getElementsByClassName("card");
  for (let card of massive) {
    let fullName = card.querySelector(".card-title").innerText.toLowerCase();
    if (!fullName.includes(string)) card.classList.add("not_visible");
  }
}
// прописыываем функцию сброса, которая по кнопке reset возвращаем все карточки на место
// осуществляется поиск карточек с крассом not_vivible и удаления этого свойства
function reset_fn() {
  const cards = document.querySelectorAll(".card.not_visible");
  cards.forEach((card) => {
    card.classList.remove("not_visible");
    //card.classList.add("not_visible");
  });
  // Добавляем класс not_visible к элементам с классом descriptionDiv
  let descriptionDivs = document.querySelectorAll(".descriptionDiv");
  console.log(`Found ${descriptionDivs.length} descriptionDiv elements`);
  descriptionDivs.forEach((div) => {
    console.log("Removing descriptionDiv:", div);
    //div.remove();
    div.classList.add("not_visible");
    //div.classList.add("not_visible");
  });
}
