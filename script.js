async function buscarEndereco() {
    const cepInput = document.getElementById('cep');
    const cep = cepInput.value.replace(/\D/g, '');

    if (cep.length !== 8) {
        alert("Por favor, digite um CEP válido com 8 números.");
        return;
    }

    // Feedback visual
    const ids = ['rua', 'bairro', 'cidade', 'uf', 'cep_final'];
    ids.forEach(id => document.getElementById(id).innerText = "Buscando...");

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
            alert("CEP não encontrado!");
            ids.forEach(id => document.getElementById(id).innerText = "---");
            return;
        }

        // Preenchimento dos dados
        document.getElementById('rua').innerText = data.logradouro || "N/A";
        document.getElementById('bairro').innerText = data.bairro || "N/A";
        document.getElementById('cidade').innerText = data.localidade;
        document.getElementById('uf').innerText = data.uf;
        document.getElementById('cep_final').innerText = data.cep;

    } catch (error) {
        alert("Erro ao conectar com o serviço ViaCEP.");
        ids.forEach(id => document.getElementById(id).innerText = "Erro");
    }
}