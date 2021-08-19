const listaClientes = () => {
  return fetch(`http://localhost:3000/profile`).then((resposta) => {
    /*fetch é um método global da interface da fetch API, a fetch API possui vários métodos que podemos utilizar, 
    a fetch é um dos métodos utilizados da interface da fetch API, então aqui por padrão a fetch já faz um get,
     e já me devolve uma promise. Não precisa instanciar mais nada, simplesmente retorno a fetch. */
    return resposta.json();
  });
};

const criaCliente = (nome, email) => {
  return fetch(`http://localhost:3000/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      /*da mesmo forma que é preciso converter de string para JSON para incluir na API, aqui precisamos converter de 
      JSON para string, para poder incluir no corpo da página*/
      nome: nome,
      email: email,
    }),
  }).then((resposta) => {
    return resposta.body;
  });
};

const removeCliente = (id) => {
  return fetch(`http://localhost:3000/profile/${id}`, {
    method: "DELETE",
  });
};

const detalhaCliente = (id) => {
  return fetch(`http://localhost:3000/profile/${id}`).then((resposta) => {
    return resposta.json();
  });
};

const atualizaCliente = (id, nome, email) => {
  return fetch(`http://localhost:3000/profile/${id}`, {
    method: "PUT", //o PUT vai fazer a substituição dos dados anteriores pelos novos dados no servidor
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      nome: nome,
      email: email,
    }),
  }).then((resposta) => {
    if (resposta.ok) {
      return resposta.json();
    }
    throw new Error("Não foi possível detalhar um cliente");
  });
};

export const clienteService = {
  listaClientes,
  criaCliente,
  removeCliente,
  detalhaCliente,
  atualizaCliente,
};

/* Código antigo trabalhando com XML
 const promise = new Promise((resolve, reject) => {
    const http = new XMLHttpRequest();

    http.open("GET", "http://localhost:3000/profile");
    //É preciso transformar a resposta do http em um objeto javascript, pra isso usei o JSON.parse recebendo a resposta http
    http.onload = () => {
      if (http.status >= 400) {
        reject(JSON.parse(http.response));
      } else {
        resolve(JSON.parse(http.response));
      }
    };
    http.send();
  });
  return promise; */
