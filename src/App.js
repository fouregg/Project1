import React from "react";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap"; // Импортируем Form из react-bootstrap
import Card from 'react-bootstrap/Card';

const apiKey = "qY4GHy6WYQEXFRfJuPLBnmc2p5cvoQwYpYNO160g";

function DogBreedSelect() {
  const [breeds, setBreeds] = useState([]);
  const [breedsImages, setBreedsImages] = useState([]);
  const [names, setNames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.thecatapi.com/v1/breeds");
        const data = await response.json();
        setBreeds(data);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchData();
  }, []);

  const onSelectChanged = async (e) => {
    const selectedName = e.target.value;

    const breedObj = breeds.find((breed) => breed.name === selectedName);
    
    const responseImg = await fetch(`https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${breedObj.id}&api_key=${apiKey}`);
    const dataImg = await responseImg.json();
    setBreedsImages(dataImg);
    
    const responseNames = await fetch(`https://randomuser.me/api/?results=${dataImg.length}`);
    const dataNames = await responseNames.json();
    setNames(dataNames.results);
  }

  console.log(names)
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <Form>
            {/* Используем Form из react-bootstrap */}
            <Form.Group controlId="breedSelect">
              {/* Группируем select */}
              <Form.Label>Выберите породу:</Form.Label>
              {/* Добавляем метку */}
              <Form.Select aria-label="Default select example" onChange={onSelectChanged}>
                <option value="">Выберите породу</option>
                {breeds.map((breed) => (
                  <option key={breed.id} value={breed.name}>
                    {breed.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </div>
      </div>
      {names.length && breedsImages.length 
        ? breedsImages.map((breed, index) => 
          (<Card key={breed.id} style={{ width: '18rem' }}>
            <Card.Img variant="top" src={breed.url} />
            <Card.Body>
              <Card.Title>
                {names[index]?.name?.first}
              </Card.Title>
            </Card.Body>
          </Card>))
        : <h3>Выберите породу для просмотра изображений</h3>
      }
    </div>
  );
}

export default DogBreedSelect;
