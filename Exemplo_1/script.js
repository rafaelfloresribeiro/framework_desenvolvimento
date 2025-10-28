async function CEP() {
    const cepInput = document.getElementById('inputAddress')
    const cep = cepInput.value
    const cepLimpo = cep.replace(/\D/g, '')
}

async function cepAPI() {
    const cepInput = document.getElementById('inputAddress')
    const cep = cepInput.value.replace(/\D/g, '')
    
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const dados = await resposta.json()
    
    document.getElementById('inputAddress2').value = dados.logradouro || ''
    document.getElementById('inputBairro').value = dados.bairro || ''
    document.getElementById('inputCity').value = dados.localidade || ''
    document.getElementById('inputEstado').value = dados.uf || ''
}

document.addEventListener('DOMContentLoaded', function() {
    const botao = document.querySelector('button.btn-primary')
    
    botao.addEventListener('click', function(event) {
        const cep = CEP()
        
        console.log('CEP capturado:', cep)
        cepAPI(cep)
    })
})