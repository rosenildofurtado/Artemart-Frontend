import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"
import { InputText } from "primereact/inputtext"
import { InputTextarea } from 'primereact/inputtextarea';
import { useState } from "react"
import '../HomePage/HomePage.css'
import ArteMartAPIService from "../../services/ArteMartAPIService";
import { useEffect, useRef } from "react";
import { InputNumber } from 'primereact/inputnumber';
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast'
import { useParams } from 'react-router-dom'

const EditarArte = () => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState(0);

    const { id } = useParams();
    const [arte, setArte] = useState([]);

    const arteMartAPIService = new ArteMartAPIService();
    const toast = useRef(null);


    useEffect(() => {
        arteMartAPIService.getArteById(id).then(data => {
            setArte(data)
        });
    })


    async function EditarArteBtn(nome, preco, descricao, id, owner) {
        const token = sessionStorage.getItem('token');
        try {

            await arteMartAPIService.editArte(nome, preco, descricao, id, token, owner);
            window.location.replace('/detalhar/' + id);
        }
        catch (e) {
            toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao salvar alterações da arte.', life: 3000 });
            return e.data;
        }
    }

    return (
        <div className="surface-200">
            <Toast ref={toast} />
            <Navbar />
            <div className="publicar-arte-body pt-8 pb-8 surface-200 w-8 m-auto">
                <div className="surface-0 p-8 border-round">
                    <h1 className="text-center">Editar dados da arte</h1>
                    <hr className="hr-homepage"></hr>
                    <ul className="list-none mt-8">
                        <li className="mb-6">
                            <div className="field">

                                <img src={arte.foto} className="img-responsive" alt="Imagem da arte"></img>

                            </div>

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

                        <li className="text-center pt-4">
                            <Button onClick={() => {

                                EditarArteBtn(nome, preco, descricao, id)
                            }}
                                label='Salvar Alterações' className="p-button-rounded" aria-label="Publicar" />
                        </li>
                    </ul>
                </div>
            </div>

            <Footer />
        </div >
    )
}

export default EditarArte