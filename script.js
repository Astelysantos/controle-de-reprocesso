function adicionarLinha() {
    let tabela = document.getElementById('admin-table').getElementsByTagName('tbody')[0];
    let novaLinha = tabela.insertRow();
    
    // Adiciona células editáveis
    for (let i = 0; i < 5; i++) {
        let novaCelula = novaLinha.insertCell(i);
        novaCelula.contentEditable = "true";
    }
    
    // Adiciona a célula de botões (Excluir)
    let celulaExcluir = novaLinha.insertCell(5);
    celulaExcluir.innerHTML = '<button onclick="excluirLinha(this)">Excluir</button>';
}

function excluirLinha(botao) {
    let linha = botao.parentElement.parentElement;
    linha.remove();
}

function baixarPlanilha() {
    // Obter os dados da tabela
    let tabela = document.getElementById('admin-table');
    let dados = [];

    // Percorre as linhas da tabela
    for (let i = 1; i < tabela.rows.length; i++) {
        let linha = tabela.rows[i];
        let linhaDados = [];
        
        // Percorre as colunas da linha
        for (let j = 0; j < linha.cells.length - 1; j++) {  // Ignora a última célula (botão Excluir)
            linhaDados.push(linha.cells[j].textContent);  // Pega o conteúdo de cada célula
        }
        
        dados.push(linhaDados);  // Adiciona os dados da linha ao array
    }

    // Criação da planilha com SheetJS
    let ws = XLSX.utils.aoa_to_sheet(dados);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Reprocesso");

    // Salva a planilha como arquivo Excel
    XLSX.writeFile(wb, "planilha_reprocesso_admin.xlsx");
}
