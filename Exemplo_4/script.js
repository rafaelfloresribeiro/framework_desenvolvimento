async function CEP() {
    const cepInput = document.getElementById('inputAddress')
    const cep = cepInput.value
    const cepLimpo = cep.replace(/\D/g, '')
    return cepLimpo
}

async function validCEP(cep) {
    if (cep.length !== 8) {
        return false
    }
    
    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        const dados = await resposta.json()
        
        if (dados.erro) {
            return false
        }
        return true
    } catch (error) {
        return false
    }
}

async function cepAPI(cep) {
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const dados = await resposta.json()
    
    document.getElementById('inputAddress2').value = dados.logradouro || ''
    document.getElementById('inputBairro').value = dados.bairro || ''
    document.getElementById('inputCity').value = dados.localidade || ''
    document.getElementById('inputEstado').value = dados.uf || ''
}

document.addEventListener('DOMContentLoaded', function() {
    const botaoAutoCompletar = document.querySelector('button.btn-primary')
    const botaoEnviar = document.querySelector('button.btn-success')
    
    botaoAutoCompletar.addEventListener('click', async function(event) {
        const cep = await CEP()
        
        console.log('CEP capturado:', cep)
        cepAPI(cep)
    })
    
    botaoEnviar.addEventListener('click', function(event) {
        event.preventDefault()
        const form = document.querySelector('.needs-validation')
        
        if (!form.checkValidity()) {
            event.stopPropagation()
        }
        
        form.classList.add('was-validated')
    })
})