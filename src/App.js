import React from "react";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Form, Row, Col, Navbar, Container, Nav } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./App.css"; // Импортируйте свои стили

const apiKey = "qY4GHy6WYQEXFRfJuPLBnmc2p5cvoQwYpYNO160g";

// ОПРЕДЕЛЯЯЕМ КОМПОНЕНТ, который отвечает за выбор породы и вывод панели и картинок
// и прописываем его СОСТОЯНИЯ useState
function DogBreedSelect() {
  const [breeds, setBreeds] = useState([]); // breeds - Массив,
  // который будет хранить информацию о всех доступных породах собак.
  console.log("breeds = ", breeds);
  const [breedsImages, setBreedsImages] = useState([]); // breedsImages - массив, который
  // будет хранить адреса всех ихображений
  const [names, setNames] = useState([]); // names - массив имён картинок
  // NEW !! Добавляем новое состояние для описания породы:
  const [breedDescription, setBreedDescription] = useState("");
  // NEW! вводим массив, который будет хранить выбранное имя кошки и состояние
  const [selectedName, setSelectedName] = useState(null); // Состояние для хранения выбранного имени
  const [siteDescription, setSiteDescription] = useState(""); // ...............
  const [showModal, setShowModal] = useState(false); // это состояние для видимости модального окна

  //  ОПРЕДЕЛЯЕМ ФУНКЦИЮ ПОЛУЧЕНИЯ ДАННЫХ (useEffect):ДЛЯ ЗАГРУЗКИ ИЗОБРАЖЕНИЙ ИЗ API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Создаём  ОБЪЕКТ "responce"( к которого есть СВОЙСТВА и МЕТОДЫ ), который представляет собой HTTP-ответ на запрос,
        // выполненный с помощью функции fetch
        const response = await fetch("https://api.thecatapi.com/v1/breeds");
        console.log("response=", response);
        console.log("response.URL=", response.url); // response.URL url - метод
        console.log("response.JSON=", response.json); // json - метод, который возвращает промис,
        // объект, полученный из JSON-ответа.
        const data = await response.json(); // Преобразуем ответ в JSON формат
        console.log("data=", data);
        setBreeds(data); //Об новляем   состояние массива  breeds полученными данными
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };
    fetchData(); //  Вызываем fetchData для загрузки данных о породах собак.
  }, []);
  // ОБРАБАТЫВАЕМ СОБЫТИЕ ИЗМЕНЕНИЯ ВЫБОРА ПОРОДЫ КОШЕК - определяем фукнцию "oneSelectChange"
  const onSelectChanged = async (e) => {
    // 'e' — это объект события, переданный в функцию.
    const selectedName = e.target.value; // Получаем выбранное имя породы из СОБЫТИЯ e.target.value
    // e.target - это ЭЛЕМЕНТ, который вызвал событие. Далее -поиск объекта породы по именианном случае <select>.
    // e.target.value - это ЗНАЧЕНИЕ выбранного <option> в <select>.
    if (selectedName === "Choose cat's breed") {
      return;
    }
    console.log("selectedName=", selectedName);
    // ПОИСК ОБЪЕКТОВ ПОРОД ПО ИМЕНИ
    // breeds — это МАССИВ ОБЪЕКТОВ пород, который был получен из API ранее.
    // find — это МЕТОД массива, который ищет первый элемент, удовлетворяющий условию.
    // breed.name === selectedName — это условие, которое проверяет, совпадает ли имя породы с выбранным именем.
    const breedObj = breeds.find((breed) => breed.name === selectedName);
    console.log("breedObj.description=", breedObj.description);
    console.log("breedObj.id=", breedObj.id);
    console.log("breedObj=", breedObj);
    // по ID породы запрашиваем картинки по выбранной  из API
    const responseImg = await fetch(
      `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${breedObj.id}&api_key=${apiKey}`
    );
    console.log("responseImg=", responseImg);
    const dataImg = await responseImg.json(); // данные JSON объектов - картинок
    console.log("dataImg=", dataImg);
    setBreedsImages(dataImg); // это функция, которая обновляет состояние breedsImages с полученными изображениями.
    const responseNames = await fetch(
      `https://randomuser.me/api/?results=${dataImg.length}`
    );
    console.log("responseNames=", responseNames);
    const dataNames = await responseNames.json();
    console.log("dataNames=", dataNames);
    setNames(dataNames.results); // — это функция, которая обновляет состояние МАССИВА names  полученными именами.
    console.log("dataNames.results=", dataNames.results);
    console.log("SelectedName before setSelectedName=", selectedName);
    // NEW! Сбрасываем выбранное имя при выборе новой породы
    // setSelectedName(null);
    // NEW!! Обновляем состояние breedDescription в функции onSelectChanged:
    setBreedDescription(breedObj.description); // Обновляем описание породы
    setSelectedName(null);
    console.log("SelectedName after setSelectedName=", selectedName);
  };
  // setSelectedName(null);
  // NEW! ВВОДИМ НОВУЮ ФУНКЦИЮ - ОБРАБАТЫВАЕМ СОБЫТИЕ ИЗМЕНЕНИЯ ВЫБОРА ИМЕНИ КОШКИ- определяем фукнцию "onNameSelectChanged"
  const onNameSelectChanged = (e) => {
    const selectedName = e.target.value;
    if (selectedName === "Choose cat's name (it's fantacy name)") {
      return;
    }
    const selectedIndex = names.findIndex(
      (name) => name.name.first === selectedName
    );
    setSelectedName({ name: selectedName, index: selectedIndex });
    console.log("selectedName=", selectedName, "selectedIndex=", selectedIndex);
  };
  //!!! Ниже -  обработчик handleHomeClick для отображения модального окна CATS:
  const handleHomeClick = () => {
    setSiteDescription(
      "Добро пожаловать на наш сайт о кошках! Здесь вы можете узнать о различных породах кошек, их особенностях и посмотреть фотографии. Просто выберите породу и затем фото. Надеюсь, вы получите удовольствие от пользования сайтом. С наилучшими пожеланиями, разработчик сайта - Заверяев Денис "
    );
    setShowModal(true);
  };

  console.log("names=", names);
  return (
    <div className="container">
      <Navbar
        className="navbar-primary"
        style={{ minHeight: "40px", height: "40px" }}
        bg="primary"
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Brand href="#home" onClick={handleHomeClick}>
            CATS
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Описание сайта</Modal.Title>
        </Modal.Header>
        <Modal.Body>{siteDescription}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Убрать
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="row">
        <div className="col-md-6">
          <Form>
            {/* Используем Form из react-bootstrap */}
            <Form.Group controlId="breedSelect">
              {/* Группируем select */}
              <Form.Label className="text-center">Выберите породу:</Form.Label>
              {/* Добавляем метку */}
              <Form.Select
                aria-label="Default select example"
                onChange={onSelectChanged} // обработчик событий, по выбору вызывает фукнцию onSelectChanged
                // которая передаётся в качестве аргумента
                // onSelectChanged  используем  для  обновления  состояния
                // компонента  с  новым  выбранным  значением.
                // Далее : {breeds.map((breed) => ( ... ))} :  Использует  метод  map  для  перебора
                //  массива  breeds,  содержащего  данные  о  породах  собак.
                // breeds:  Массив  данных  о  породах.
                //  map  генерирует  элемент  option  для  каждой  породы  в  массиве  breeds.
                // В  итоге  код  создает  выпадающий  список  с  названиями  пород  собак  из  массива  breeds.  Когда  пользователь  выбирает  породу,
                // вызывается  функция  onSelectChanged  с  выбранным  значением  (названием  породы).
              >
                {/* <option value="">Выберите породу</option>*/}
                <option>Choose cat's breed</option>
                {breeds.map((breed) => (
                  <option key={breed.id} value={breed.name}>
                    {breed.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </div>
        <div className="col-md-6">
          <Form>
            <Form.Group controlId="nameSelect">
              <Form.Label className="text-center">
                Выберите фото (фантазийные имена):
              </Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={onNameSelectChanged}
              >
                <option>Choose cat's name (it's fantacy name)</option>
                {names.map((name) => (
                  <option key={name.name.first} value={name.name.first}>
                    {name.name.first}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </div>
      </div>
      <Row className="g-5 mt-1">
        {/* {names.length && breedsImages.length ? ( ... ) : ( ... )}:  Условный  оператор  рендеринга.
         *  names.length && breedsImages.length:  Проверяет,  есть  ли  в  массивах  names  и  breedsImages  хотя  бы  один  элемент.
         *  Если  условие  истинно  (оба  массива  не  пустые),  то  отображается  код  внутри  первых  скобок  ( ... ).
         *  Если  условие  ложно  (хотя  бы  один  массив  пустой),  то  отображается  код  внутри  вторых  скобок  ( ... ).Добавляем метку */}
        {selectedName ? ( // Если выбрано конкретное имя
          <Col xs={12}>
            <Card className="w-100 h-100">
              <Card.Img
                variant="top"
                src={breedsImages[selectedName.index].url}
              />
              <Card.Body>
                <Card.Title className="large-title">
                  {selectedName.name}
                </Card.Title>
                <Card.Text className="large-text">{breedDescription}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ) : (
          breedsImages.length > 0 && // Если выбрана порода
          breedsImages.map((breed, index) => (
            <Col xs={12} sm={6} lg={4} key={breed.id}>
              <Card className="w-100 h-100"
                // onClick={() => handleCardClick(index)}
              >
                <Card.Img variant="top" src={breed.url} />
                <Card.Body>
                  <Card.Title>{names[index]?.name?.first}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
}

export default DogBreedSelect;
