
import React, { useState, useEffect } from 'react';
import { Carousel } from 'primereact/carousel';
import { Button } from 'primereact/button';
import ArteMartAPIService from '../../services/ArteMartAPIService';
import './CarouselDestaques.css';
import { useNavigate } from "react-router-dom";

const CarouselDestaques = ({ header }) => {
  const [artes, setArtes] = useState([]);
  let navigate = useNavigate();
  const responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '600px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '480px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  const arteMartAPIService = new ArteMartAPIService();

  useEffect(() => {
    arteMartAPIService.getArtes().then(data => {
      arteInfo(data);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function arteInfo(data) {
    for (let i = 0; i < data.length; i++) {
      const owner = await arteMartAPIService.getUserById(data[i].owner);
      data[i].owner = owner.username;
    }

    setArtes(data);
  }
  const handleClick = (event, id) => {
    let path = "/detalhar/" + id;
    navigate(path)
  }

  const arteTemplate = (arte) => {
    return (
      <div className="product-item">
        <div className="product-item-content">
          <div className="mb-3">
            <div className='h-15rem w-15rem m-auto'
              style={{ background: `url(${arte.foto})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          </div>
          <div>
            <div title={arte.nome}><h3 className="mb-1">{arte.nome}</h3></div>
            <h5 className="mt-0 mb-3">R${arte.preco}</h5>
            <h4 className="mb-1">Por: {arte.owner}</h4>
            <div className="car-buttons mt-5">
              <Button onClick={event => handleClick(event, arte.id)} icon="pi pi-search" className="p-button-rounded mr-2" />
              <Button icon="pi pi-star-fill" className="p-button-warning p-button-rounded mr-2" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="carousel-demo w-9 m-auto mt-8 mb-8">
      <div className="card text-center">
        <Carousel value={artes} numVisible={3} numScroll={1} responsiveOptions={responsiveOptions}
          circular itemTemplate={arteTemplate} header={<h1>{header}</h1>} />
      </div>
    </div>
  );
}

export default CarouselDestaques;