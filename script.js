document.addEventListener("DOMContentLoaded", () => {
    const btnCalcular = document.querySelector(".buttons button:first-child");
    const resultado = document.querySelector(".resultado");
  
    btnCalcular.addEventListener("click", () => {
      const banca = parseFloat(document.getElementById("banca").value);
      const meta = parseFloat(document.getElementById("meta").value);
      const dias = parseInt(document.getElementById("dias").value);
  
      if (isNaN(banca) || isNaN(meta) || isNaN(dias) || banca <= 0 || meta <= 0 || dias <= 0) {
        alert("Preencha todos os campos corretamente.");
        return;
      }
  
      const porcentagemDiaria = ((meta / banca) ** (1 / dias)) - 1;
      const stopLossDiario = banca * porcentagemDiaria;
  
      resultado.innerHTML = `
        <p>Porcentagem Diária Necessária: ${(porcentagemDiaria * 100).toFixed(2)}%</p>
        <p>Stop Loss Diário: R$ ${stopLossDiario.toFixed(2)}</p>
      `;
  
      // Geração da tabela
      let saldo = banca;
      let tabelaHTML = `
        <table class="tabela">
          <thead>
            <tr>
              <th>Dias</th>
              <th>Saldo (R$)</th>
              <th>Necessário (R$)</th>
            </tr>
          </thead>
          <tbody>
      `;
  
      for (let i = 1; i <= dias; i++) {
        let proximo = saldo * (1 + porcentagemDiaria);
        let necessario = proximo - saldo;
  
        tabelaHTML += `
          <tr>
            <td>${i}</td>
            <td>R$ ${saldo.toFixed(2)}</td>
            <td>R$ ${necessario.toFixed(2)}</td>
          </tr>
        `;
  
        saldo = proximo;
      }
  
      tabelaHTML += `</tbody></table>`;
  
      resultado.innerHTML += tabelaHTML;
    });
  });
  