// Função para carregar a planilha
function carregarPlanilha(event) {
    const arquivo = event.target.files[0];
    if (!arquivo) return;

    const leitor = new FileReader();
    leitor.onload = function(e) {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });

        // Pega a primeira aba (sheet) da planilha
        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        // Converte os dados da planilha para um formato de tabela
        const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // Preenche a tabela com os dados
        preencherTabela(rows);
    };
    
    leitor.readAsBinaryString(arquivo);
}

// Função para preencher a tabela com os dados da planilha
function preencherTabela(rows) {
    const tbody = document.querySelector("#planilha tbody");
    tbody.innerHTML = ''; // Limpar a tabela existente

    rows.forEach((row, index) => {
        // Ignorar a primeira linha (cabeçalho)
        if (index === 0) return;

        const tr = document.createElement("tr");

        row.forEach(cell => {
            const td = document.createElement("td");
            td.contentEditable = true;
            td.textContent = cell;
            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    });
}

// Função para baixar a planilha editada
function baixarPlanilha() {
    const tabela = document.querySelector("#planilha");
    const workbook = XLSX.utils.table_to_book(tabela, { sheet: "Planilha Editada" });
    const arquivo = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });

    // Função para salvar o arquivo
    function s2ab(s) {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) {
            view[i] = s.charCodeAt(i) & 0xFF;
        }
        return buf;
    }

    const blob = new Blob([s2ab(arquivo)], { type: 'application/octet-stream' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'planilha-editada.xlsx';
    link.click();
}
