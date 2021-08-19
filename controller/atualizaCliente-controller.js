import { clienteService } from "../service/cliente-service.js";
/* Criamos um novo objeto URL que é capaz de nos dizer qual o endereço da página que estamos. 
Por meio da propriedade searchParams conseguimos acessar o método get e selecionar o id que vemos na url. */

/* Utilizando async/await temos uma função assíncrona que conseguimos ler de forma estrutural, 
trazendo benefícios de manutenção e legibilidade para nosso código. Bem como o uso do try/catch ajuda a lidar com erros. */

(async () => {
  const pegaURL = new URL(window.location);

  const id = pegaURL.searchParams.get("id");

  //percorrendo o DOM, é preciso buscar os campos para incluir o nome e email do ID do cliente nos 2 campos
  const inputNome = document.querySelector("[data-nome]");
  const inputEmail = document.querySelector("[data-email]");

  try {
    const dados = await clienteService.detalhaCliente(id);
    inputNome.value = dados.nome;
    inputEmail.value = dados.email;
  } catch (erro) {
    console.log(erro);
    window.location.href = "../telas/erro.html";
  }

  const formulario = document.querySelector("[data-form]");
  //editando o nome e email do cliente no servidor
  formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    try {
      await clienteService.atualizaCliente(
        id,
        inputNome.value,
        inputEmail.value
      );
      window.location.href = "../telas/edicao_concluida.html";
    } catch (erro) {
      console.log(erro);
      window.location.href = "../telas/erro.html";
    }
  });
})();
