import axios from 'axios'

const apiURL = 'http://127.0.0.1:8000'

export default class ArteMartAPIService {
  async postLogin(username, password) {
    const login = {
      username: username,
      password: password
    }

    const response = await axios.post(`${apiURL}/rest-auth/login/`, login);
    return response.data;
  }

  async getArtes() {
    const response = await axios.get(`${apiURL}/arte/`);
    return response.data;
  }

  async getArteById(id) {
    const response = await axios.get(`${apiURL}/busca/arte/` + id);
    return response.data;
  }

  async getCategoriaById(id) {
    const response = await axios.get(`${apiURL}/categoria/` + id);
    return response.data;
  }

  async getCategorias() {
    const response = await axios.get(`${apiURL}/categoria`);
    return response.data;
  }

  async getTematicas() {
    const response = await axios.get(`${apiURL}/tematica`);
    return response.data;
  }

  async getTematicaById(id) {
    const response = await axios.get(`${apiURL}/tematica/` + id);
    return response.data;
  }

  async getTagById(id) {
    const response = await axios.get(`${apiURL}/tags/` + id);
    return response.data;
  }

  async postTag(nome) {
    const response = await axios.post(`${apiURL}/tags/`, { nome: nome });
    return response.data;
  }

  async getUserById(id) {
    const response = await axios.get(`${apiURL}/users/` + id);
    return response.data;
  }

  async getPerfilInfo(token) {
    const tokenHeaderBody = 'Token ' + token;

    const headers = {
      'Authorization': tokenHeaderBody
    }

    const response = await axios.get(`${apiURL}/perfil/info/`, { headers: headers });
    return response.data;
  }

  async postLogout() {
    const response = await axios.post(`${apiURL}/rest-auth/logout/`);
    return response.data;
  }

  async postCadastro(email, username, first_name, last_name, password1, password2, is_artista) {
    try {
      const response = await axios.post(`${apiURL}/rest-auth/registration/name-registration/`, {
        email: email,
        username: username,
        first_name: first_name,
        last_name: last_name,
        password1: password1,
        password2: password2
      });

      return this.postPerfil(response.data.user, is_artista, response.data.key);
    }
    catch (e) {
      return e;
    }
  }

  async postPerfil(user, is_artista, token) {
    try {
      await axios.post(`${apiURL}/perfil/`, {
        user: user,
        is_artista: is_artista
      });

      const response = {
        id: user,
        token: token
      }

      return response;
    }
    catch (e) {
      return e;
    }
  }

  async postArte(foto, nome, categoria, tematica, tags, preco, descricao, formato, owner, token) {
    const data = new FormData();
    data.append('foto', foto);
    data.append('nome', nome);
    data.append('categoria', categoria);
    data.append('tematica', tematica);
    data.append('tags', tags);
    data.append('preco', preco);
    data.append('descricao', descricao);
    data.append('formato', formato);
    data.append('owner', owner);

    const response = await axios({ method: 'post', url: `${apiURL}/arte/`, data: data, headers: { 'Authorization': 'Token ' + token } });
    return response.data;
  }


  async editArte(nome, preco, descricao, id, token) {
    const data = new FormData();
    data.append('nome', nome);
    data.append('preco', preco);
    data.append('descricao', descricao);
    const response = await axios({ method: 'patch', url: `${apiURL}/arte/` + id + '/', data: data, headers: { 'Authorization': 'Token ' + token } });
    return response.data;
  }
}
