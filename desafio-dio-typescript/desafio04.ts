/* Um desenvolvedor tentou criar um projeto que consome a base de dados de filme do TMDB para criar um organizador de filmes, mas desistiu 
// pois considerou o seu código inviável. Você consegue usar typescript para organizar esse código e a partir daí aprimorar o que foi feito?

// A ideia dessa atividade é criar um aplicativo que: 
//    - Busca filmes
//    - Apresenta uma lista com os resultados pesquisados
//    - Permite a criação de listas de filmes e a posterior adição de filmes nela

// Todas as requisições necessárias para as atividades acima já estão prontas, mas a implementação delas ficou pela metade (não vou dar tudo de graça).
// Atenção para o listener do botão login-button que devolve o sessionID do usuário
// É necessário fazer um cadastro no https://www.themoviedb.org/ e seguir a documentação do site para entender como gera uma API key https://developers.themoviedb.org/3/getting-started/introduction

var apiKey = '3f301be7381a03ad8d352314dcc3ec1d';
let apiKey;
let requestToken;
let username;
let password;
let sessionId;
let listId = '7101979';

let loginButton = document.getElementById('login-button');
let searchButton = document.getElementById('search-button');
let searchContainer = document.getElementById('search-container');

loginButton.addEventListener('click', async () => {
  await criarRequestToken();
  await logar();
  await criarSessao();
})

searchButton.addEventListener('click', async () => {
  let lista = document.getElementById("lista");
  if (lista) {
    lista.outerHTML = "";
  }
  let query = document.getElementById('search').value;
  let listaDeFilmes = await procurarFilme(query);
  let ul = document.createElement('ul');
  ul.id = "lista"
  for (const item of listaDeFilmes.results) {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(item.original_title))
    ul.appendChild(li)
  }
  console.log(listaDeFilmes);
  searchContainer.appendChild(ul);
})

function preencherSenha() {
  password = document.getElementById('senha').value;
  validateLoginButton();
}

function preencherLogin() {
  username =  document.getElementById('login').value;
  validateLoginButton();
}

function preencherApi() {
  apiKey = document.getElementById('api-key').value;
  validateLoginButton();
}

function validateLoginButton() {
  if (password && username && apiKey) {
    loginButton.disabled = false;
  } else {
    loginButton.disabled = true;
  }
}

class HttpClient {
  static async get({url, method, body = null}) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open(method, url, true);

      request.onload = () => {
        if (request.status >= 200 && request.status < 300) {
          resolve(JSON.parse(request.responseText));
        } else {
          reject({
            status: request.status,
            statusText: request.statusText
          })
        }
      }
      request.onerror = () => {
        reject({
          status: request.status,
          statusText: request.statusText
        })
      }

      if (body) {
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        body = JSON.stringify(body);
      }
      request.send(body);
    })
  }
}

async function procurarFilme(query) {
  query = encodeURI(query)
  console.log(query)
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
    method: "GET"
  })
  return result
}

async function adicionarFilme(filmeId) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey}&language=en-US`,
    method: "GET"
  })
  console.log(result);
}

async function criarRequestToken () {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
    method: "GET"
  })
  requestToken = result.request_token
}

async function logar() {
  await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
    method: "POST",
    body: {
      username: `${username}`,
      password: `${password}`,
      request_token: `${requestToken}`
    }
  })
}

async function criarSessao() {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
    method: "GET"
  })
  sessionId = result.session_id;
}

async function criarLista(nomeDaLista, descricao) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list?api_key=${apiKey}&session_id=${sessionId}`,
    method: "POST",
    body: {
      name: nomeDaLista,
      description: descricao,
      language: "pt-br"
    }
  })
  console.log(result);
}

async function adicionarFilmeNaLista(filmeId, listaId) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list/${listaId}/add_item?api_key=${apiKey}&session_id=${sessionId}`,
    method: "POST",
    body: {
      media_id: filmeId
    }
  })
  console.log(result);
}

async function pegarLista() {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}`,
    method: "GET"
  })
  console.log(result);
}

{*/
    
    
    /* <div style="display: flex;">
  <div style="display: flex; width: 300px; height: 100px; justify-content: space-between; flex-direction: column;">
      <input id="login" placeholder="Login" onchange="preencherLogin(event)">
      <input id="senha" placeholder="Senha" type="password" onchange="preencherSenha(event)">
      <input id="api-key" placeholder="Api Key" onchange="preencherApi()">
      <button id="login-button" disabled>Login</button>
  </div>
  <div id="search-container" style="margin-left: 20px">
      <input id="search" placeholder="Escreva...">
      <button id="search-button">Pesquisar Filme</button>
  </div>
</div>*/

// Inicio do meu código
// Importante: Substitua 'SUA_API_KEY' pela sua chave de API real antes de executar o código.

// Defina os tipos necessários
type RequestMethod = "GET" | "POST";

interface HttpClientOptions {
  url: string;
  method: RequestMethod;
  body?: any;
}

interface TokenResult {
  request_token: string;
}

interface SessionResult {
  session_id: string;
}

interface SearchResult {
  results: { original_title: string }[];
}

// Instância da classe HttpClient que lida com requisições HTTP
class HttpClient {
  static async get({ url, method, body = null }: HttpClientOptions) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open(method, url, true);

      request.onload = () => {
        if (request.status >= 200 && request.status < 300) {
          resolve(JSON.parse(request.responseText));
        } else {
          reject({
            status: request.status,
            statusText: request.statusText,
          });
        }
      };
      request.onerror = () => {
        reject({
          status: request.status,
          statusText: request.statusText,
        });
      };

      if (body) {
        request.setRequestHeader(
          "Content-Type",
          "application/json;charset=UTF-8"
        );
        body = JSON.stringify(body);
      }
      request.send(body);
    });
  }
}

// Chave de API do The Movie Database (TMDB)
let apiKey: string = 'SUA_API_KEY';

// Variáveis de estado
let requestToken: string | null = null;
let username: string | null = null;
let password: string | null = null;
let sessionId: string | null = null;
let listId: string = '7101979';

// Elementos do DOM
let loginButton: HTMLElement | null = document.getElementById('login-button');
let searchButton: HTMLElement | null = document.getElementById('search-button');
let searchContainer: HTMLElement | null = document.getElementById('search-container');

// Adiciona um ouvinte de eventos para o botão de login
if (loginButton) {
  loginButton.addEventListener('click', async () => {
    // Realiza as etapas necessárias para autenticação
    await criarRequestToken();
    await logar();
    await criarSessao();
  });
}

// Adiciona um ouvinte de eventos para o botão de pesquisa
if (searchButton && searchContainer) {
  searchButton.addEventListener('click', async () => {
    // Limpa a lista de filmes anterior
    let lista = document.getElementById('lista');
    if (lista) {
      lista.outerHTML = '';
    }

    // Obtém a consulta do usuário
    let query = (document.getElementById('search') as HTMLInputElement).value;

    // Realiza a pesquisa de filmes com base na consulta
    let listaDeFilmes = await procurarFilme(query);

    // Cria uma lista de resultados na interface do usuário
    let ul = document.createElement('ul');
    ul.id = 'lista';
    for (const item of listaDeFilmes.results) {
      let li = document.createElement('li');
      li.appendChild(document.createTextNode(item.original_title));
      ul.appendChild(li);
    }

    // Exibe os resultados na interface do usuário
    console.log(listaDeFilmes);
    if (searchContainer) {
      searchContainer.appendChild(ul);
    }
  });
}

// Função assíncrona para criar uma sessão no TMDB
async function criarSessao(): Promise<void> {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
    method: 'GET',
  });
  sessionId = (result as SessionResult).session_id;
}

// Função assíncrona para criar uma lista no TMDB
async function criarLista(nomeDaLista: string, descricao: string): Promise<void> {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list?api_key=${apiKey}&session_id=${sessionId}`,
    method: 'POST',
    body: {
      name: nomeDaLista,
      description: descricao,
      language: 'pt-br',
    },
  });
  console.log(result);
}

// Função assíncrona para adicionar um filme a uma lista no TMDB
async function adicionarFilmeNaLista(filmeId: number, listaId: string): Promise<void> {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list/${listaId}/add_item?api_key=${apiKey}&session_id=${sessionId}`,
    method: 'POST',
    body: {
      media_id: filmeId,
    },
  });
  console.log(result);
}

// Função assíncrona para obter detalhes de uma lista no TMDB
async function pegarLista(): Promise<void> {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}`,
    method: 'GET',
  });
  console.log(result);
}

// Função assíncrona para procurar filmes no TMDB com base em uma consulta
async function procurarFilme(query: string): Promise<SearchResult> {
  query = encodeURI(query);
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
    method: 'GET',
  });
  return result as SearchResult;
}

// Função assíncrona para obter detalhes de um filme no TMDB com base no ID
async function adicionarFilme(filmeId: number): Promise<void> {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey}&language=en-US`,
    method: 'GET',
  });
  console.log(result);
}

// Função assíncrona para criar um novo token de requisição no TMDB
async function criarRequestToken(): Promise<void> {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
    method: 'GET',
  });
  requestToken = (result as TokenResult).request_token;
}

// Função assíncrona para validar o login do usuário no TMDB
async function logar(): Promise<void> {
  await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
    method: 'POST',
    body: {
      username: `${username}`,
      password: `${password}`,
      request_token: `${requestToken}`,
    },
  });
}