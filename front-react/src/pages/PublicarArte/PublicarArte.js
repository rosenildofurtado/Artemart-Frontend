import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"
import { InputText } from "primereact/inputtext"
import { InputTextarea } from 'primereact/inputtextarea';
import { useState } from "react"
import { FileUpload } from 'primereact/fileupload';
import { Dropdown } from 'primereact/dropdown';
import '../HomePage/HomePage.css'
import ArteMartAPIService from "../../services/ArteMartAPIService";
import { useEffect, useRef } from "react";
import { Chips } from "primereact/chips";
import { InputNumber } from 'primereact/inputnumber';
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast'

const PublicarArte = () => {
  const [nome, setNome] = useState('');
  const [foto, setFoto] = useState(null);
  const [descricao, setDescricao] = useState('');
  const [formato, setFormato] = useState({ formato: 'JPG' });
  // Juntar em um só
  const [categoria, setCategoria] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [tematica, setTematica] = useState(null);
  const [tematicas, setTematicas] = useState([]);
  const [tags, setTags] = useState([]);
  const [preco, setPreco] = useState(0);
  const [owner, setOwner] = useState(-1);

  const uploadOptions = {
    // label: The label of button.
    // icon: The icon of button.
    className: 'hidden'
    // style:
  }

  const formatos = [
    { formato: 'JPEG' },
    { formato: 'JPG' },
    { formato: 'SVG' },
    { formato: 'PNG' },
    { formato: 'BPM' },
    { formato: 'TIFF' },
    { formato: 'GIF' },
  ]

  const arteMartAPIService = new ArteMartAPIService();
  const toast = useRef(null);

  useEffect(() => {
    if (sessionStorage.getItem('id'))
      setOwner(sessionStorage.getItem('id'))

    arteMartAPIService.getCategorias().then((res) => {
      setCategorias(res);
    });
    arteMartAPIService.getTematicas().then((res) => {
      setTematicas(res);
    });
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function publicarArteBtn(foto, nome, categoria, tematica, tags, preco, descricao, formato, owner) {
    try {
      const token = sessionStorage.getItem('token');

      var tagsArr = [];

      for (var i = 0; i < tags.length; ++i) {
        const res = await arteMartAPIService.postTag(tags[i]);
        tagsArr.push(res.id);
      }

      const res = await arteMartAPIService.postArte(foto, nome, categoria, tematica, JSON.stringify(tagsArr), preco, descricao, formato, owner, token);
      window.location.replace('/detalhar/' + res.id_url);
    }
    catch (e) {
      toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao publicar arte.', life: 3000 });
      return e.data;
    }
  }

  return (
    <div className="surface-200">
      <Toast ref={toast} />
      <Navbar />
      <div className="publicar-arte-body pt-8 pb-8 surface-200 w-8 m-auto">
        <div className="surface-0 p-8 border-round">
          <h1 className="text-center">Inserir dados da arte</h1>
          <hr className="hr-homepage"></hr>
          <ul className="list-none mt-8">
            <li className="mb-6">
              <FileUpload name="demo" uploadOptions={uploadOptions} onSelect={(e) => setFoto(e.files[0])}></FileUpload>
            </li>
            <li className="mb-6">
              <div className="field">
                <label htmlFor="nome">Título:</label>
                <InputText className="w-full" name="nome" autoFocus autoCapitalize="none"
                  placeholder="Título da arte" value={nome} onChange={(e) => setNome(e.target.value)}
                  required />
              </div>
              <div className="field">
                <label htmlFor="desc">Descrição:</label><br></br>
                <InputTextarea className="w-full h-8rem" value={descricao} onChange={(e) => setDescricao(e.target.value)}
                  autoFocus autoCapitalize="none" name="desc" placeholder="Descrição da arte" style={{ resize: 'none' }} />
              </div>
              <div className="field">
                <label htmlFor="preco">Preço:</label><br></br>
                <InputNumber name="preco" value={preco} onValueChange={(e) => setPreco(e.value)} mode="currency" currency="BRL" locale="pt-BR" />
              </div>
            </li>
            <li className="mb-6">
              <div className="formgrid grid mb-6">
                <div className="field col">
                  <label htmlFor="formato">Formato:</label><br></br>
                  <Dropdown value={formato} options={formatos} onChange={(e) => setFormato(e.value)} optionLabel="formato" />
                </div>
                <div className="field col">
                  <label htmlFor="categoria">Categoria:</label><br></br>
                  <Dropdown value={categoria} options={categorias} onChange={(e) => setCategoria(e.value)} optionLabel="nome"
                    placeholder="Categoria" />
                </div>
                <div className="field col">
                  <label htmlFor="nome">Temática:</label><br></br>
                  <Dropdown value={tematica} options={tematicas} onChange={(e) => setTematica(e.value)} optionLabel="nome"
                    placeholder="Temática" />
                </div>
              </div>
              <div className="field mb-4">
                <label htmlFor="desc">Tags</label><br></br>
                <Chips value={tags} onChange={(e) => setTags(e.value)} />
              </div>
            </li>
            <li className="text-center pt-4">
              <Button onClick={() => {
                if (categoria !== null && tematica !== null)
                  publicarArteBtn(foto, nome, categoria.id, tematica.id, tags, preco, descricao, formato.formato, owner)
                else
                  toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Escola uma categoria e uma temática.', life: 3000 });
              }}
                label='Publicar' className="p-button-rounded" aria-label="Publicar" />
            </li>
          </ul>
        </div>
      </div>

      <Footer />
    </div >
  )
}

export default PublicarArte