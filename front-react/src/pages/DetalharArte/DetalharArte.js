import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { Button } from 'primereact/button';
import './DetalharArte.css'
import { Chips } from 'primereact/chips';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import ArteMartAPIService from '../../services/ArteMartAPIService';


const DetalharArte = () => {
  const [arte, setArte] = useState([]);
  const [preco, setPreco] = useState([]);
  const [categoria, setCategoria] = useState([]);
  const [tematica, setTematica] = useState([]);
  const [tags, setTags] = useState([]);
  const [owner, setOnwer] = useState([]);
  const { id } = useParams();

  const arteMartAPIService = new ArteMartAPIService();

  useEffect(() => {
    if (sessionStorage.getItem('id'))
      setOnwer(sessionStorage.getItem('id'))

    arteMartAPIService.getArteById(id).then(data => {
      setArte(data)
      arteInfo(data)
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function arteInfo(data) {
    setCategoria(await arteMartAPIService.getCategoriaById(data.categoria))
    setTematica(await arteMartAPIService.getTematicaById(data.tematica))

    data.tags.map((tag) => arteMartAPIService.getTagById(tag).then((res) => {
      setTags(tags => [...tags, res.nome]);
    }));

    setOnwer(await arteMartAPIService.getUserById(data.owner))
    setPreco(data.preco.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }))
  }

  async function redirectEditarArte() {
    window.location.replace('/editar/' + id);
  }
  return (
    <div>
      <Navbar />
      <div className='detalhar-body pt-8 pb-8 border-300'>
        <div className="surface-0 w-8 m-auto card border-round">
          <div className="font-medium text-3xl text-900 text-center p-4">Detalhes da arte</div>

          <ul className="list-none pl-4 pr-4 pt-0 pb-8 m-0">
            <li className="flex align-items-center py-8 px-2 border-top-1 border-300 flex-wrap">
              <img src={arte.foto} className="img-responsive" alt="Imagem da arte"></img>
            </li>

            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
              <div className="text-500 w-6 md:w-2 font-medium">Título</div>
              <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{arte.nome}</div>
            </li>

            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
              <div className="text-500 w-6 md:w-2 font-medium">Descrição</div>
              <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{arte.descricao}</div>

            </li>

            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
              <div className="text-500 w-6 md:w-2 font-medium">Tags</div>
              <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                <Chips value={tags} onChange={(e) => setTags(e.value)} readOnly />
              </div>
            </li>
            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
              <div className="text-500 w-6 md:w-2 font-medium">Artista</div>
              <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{owner.username}</div>
            </li>
            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
              <div className="text-500 w-6 md:w-2 font-medium">Formato</div>
              <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{arte.formato}</div>
            </li>

            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
              <div className="text-500 w-6 md:w-2 font-medium">Resolução</div>
              <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{arte.image_width}x{arte.image_height}</div>
            </li>

            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
              <div className="text-500 w-6 md:w-2 font-medium">Preço</div>
              <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{preco}</div>
            </li>

            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
              <div className="text-500 w-6 md:w-2 font-medium">Temática</div>
              <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{tematica.nome}</div>
            </li>

            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
              <div className="text-500 w-6 md:w-2 font-medium">Categoria</div>
              <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{categoria.nome}</div>
            </li>

            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
              <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => redirectEditarArte()} />
              </React.Fragment>
            </li>
          </ul>

        </div>
      </div>

      <Footer />
    </div>

  );

}

export default DetalharArte;