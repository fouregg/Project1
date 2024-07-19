function artResponse() {
  const URL_API = "https://api.artic.edu/api/v1/artworks/search?q=cats";
  const N = 10; // кол-во карточек
  let responce = $.getJSON(URL_API, (data) => {
    console.log(data);
    for (let j = 0; j < N; j++) {
      if (typeof data.data[j] == "undefined") break;
      // GPT Получение ссылки на изображение
      const artworkId = data.data[j].id;
      const linkImg = data.data[j].api_link;
      const cardTitleText = data.data[j].title;
      console.log(artworkId); // для проверки
      console.log(cardTitleText); // для проверки
      console.log(linkImg); // для проверки
      // Создание IIIF URL - советует GPT
      const URL_IMAGE =
        data.config.iiif_url + "/" + imageId + "/full/843,/0/default.jpg";
      // row
      let row = document.createElement("div");
      $(row).addClass("row mt-5 justify-content-around");
      document.body.getElementsByClassName("container")[0].appendChild(row);
      // card
      let card = document.createElement("div");
      $(card).addClass("card"); // add css class for element
      card.style.width = "18rem"; // add style property width
      row.appendChild(card); // add element like child for element row
      // imag from GPT
      let imgElement = document.createElement("img");
      $(imgElement).addClass("card-img-top");
      card.appendChild(imgElement);
      // Установка src для изображения
      imgElement.setAttribute("src", URL_IMAGE);
      // Дополнительный запрос для получения изображения
      //$.getJSON(imageURL, function (imageData) {
      //  imgElement.setAttribute("src", imageData.data.image.url);
      // });
      // cardBody
      let cardBody = document.createElement("div");
      $(cardBody).addClass("card-body");
      card.appendChild(cardBody);
      // name - вставил из файла JSON . там указано "title"
      let cardTitle = document.createElement("h5");
      $(cardTitle).addClass("card-title");
      cardBody.appendChild(cardTitle);
      cardTitle.innerHTML = data.data[j].title; // title видит
    }
  });
}
