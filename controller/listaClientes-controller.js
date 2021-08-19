import { clienteService } from "../service/cliente-service.js";

const criaNovaLinha = (nome, email, id) => {
  const linhaNovoCliente = document.createElement("tr");
  const conteudo = `
      <td class="td" data-td>${nome}</td>
                  <td>${email}</td>
                  <td>
                      <ul class="tabela__botoes-controle">
                          <li><a href="../telas/edita_cliente.html?id=${id}" class="botao-simples botao-simples--editar">Editar</a></li>
                          <li><button class="botao-simples botao-simples--excluir" type="button">Excluir</button></li>
                      </ul>
                  </td> 
                  `;
  linhaNovoCliente.innerHTML = conteudo;
  linhaNovoCliente.dataset.id = id;
  return linhaNovoCliente;
};

const tabela = document.querySelector("[data-tabela]");

tabela.addEventListener("click", async (evento) => {
  let ehBotaoDeDeleta =
    evento.target.className === "botao-simples botao-simples--excluir";
  if (ehBotaoDeDeleta) {
    try {
      //Precisamos pegar o elemento mais proximo com o closest, para poder remover de fato o cliente da tabela e nao so da api
      const linhaCliente = evento.target.closest("[data-id]");
      let id = linhaCliente.dataset.id;
      await clienteService.removeCliente(id);
      linhaCliente.remove();
    } catch (erro) {
      console.log(erro);
      window.location.href = "../telas/erro.html";
    }
  }
});

//quando a promessa do listaClientes for completada, ele vai pegar os dados e exibir na tela
const render = async () => {
  try {
    const listaClientes = await clienteService.listaClientes();
    listaClientes.forEach((elemento) => {
      tabela.appendChild(
        criaNovaLinha(elemento.nome, elemento.email, elemento.id)
      );
    });
  } catch (erro) {
    console.log(erro);
    window.location.href = "../telas/erro.html";
  }
};

render();

//npx json-server --watch db.json
//browser-sync start --server --file . --host --port 5000 --startPath admin/telas/lista_cliente.html */
