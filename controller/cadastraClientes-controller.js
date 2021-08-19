import { clienteService } from "../service/cliente-service.js";

const formulario = document.querySelector("[data-form]");

formulario.addEventListener("submit", async (evento) => {
  //Para percorrer o evento, eu posso passar ele como parâmetro, usar o target e capturar o valor dele com o value
  evento.preventDefault();
  try {
    const nome = evento.target.querySelector("[data-nome]").value;
    const email = evento.target.querySelector("[data-email]").value;

    await clienteService.criaCliente(nome, email);
    window.location.href = "../telas/cadastro_concluido.html";
  } catch (erro) {
    console.log(erro);
    window.location.href = "../telas/erro.html";
  }
});
