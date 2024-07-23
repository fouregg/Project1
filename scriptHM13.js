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
<<<<<<< Updated upstream
      let dispText;
      $.getJSON(linkImg, (imgResponse) => {
        console.log(imgResponse);
        imgLinkResult = `https://www.artic.edu/iiif/2/${imgResponse.data.image_id}/full/1000,/0/default.jpg`;
=======
      let otherInfo;
      $.getJSON(linkImg, (responce) => {
        console.log(responce);
        imgLinkResult = `https://www.artic.edu/iiif/2/${responce.data.image_id}/full/1000,/0/default.jpg`;
        otherInfo = `https://api.artic.edu/api/v1/artworks?fields=id,title,artist_display,date_display,main_reference_number`;
        //const cardText = data.data[j].date_display;
        //console.log(cardText);
        // row
>>>>>>> Stashed changes
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
        // Card Title
        let cardTitle = document.createElement("h5");
        $(cardTitle).addClass("card-title");
        cardBody.appendChild(cardTitle);
        cardTitle.innerHTML = data.data[j].title;
<<<<<<< Updated upstream

        // Добавляем информацию об авторе
        let artistInfo = document.createElement("p");
        artistInfo.innerHTML = imgResponse.data.artist_display;
        cardBody.appendChild(artistInfo);
=======
        // card-text
        let cardText = document.createElement("h5");
        $(cardText).addClass("card-text");
        cardBody.appendChild(cardText);
        cardText.innerHTML = data.data[j].artist_display;
>>>>>>> Stashed changes
      });
    }
  });
}
