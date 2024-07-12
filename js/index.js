const format = (data) => {
    return {
        dia: {
            numerico: dayjs(data).format('DD'),
            semana: {
                curto: dayjs(data).format('ddd'),
                longo: dayjs(data).format('dddd'),
            }
        },
        mes: dayjs(data).format('MMMM'),
        hora: dayjs(data).format('HH:mm')
    }
}

format(new Date('2024-04-01'))

// AO TENTAR ATRIBUIR OUTRO VALOR A UMA CONSTANTE IRÁ APRECER P SEGUINTE ERRO (TypeError: Assignment to constant variable)

let atividades = [
    {
        nome: "Almoço",
        data: new Date("2024-07-09 12:00"),
        finalizada: false
    },

    {
        nome: "Academia",
        data: new Date("2024-07-08 18:00"),
        finalizada: true
    },

    {
        nome: "Janta",
        data: new Date("2024-07-08 22:00"),
        finalizada: true
    }
]


const criarAtividade = (atividade) => {
    let input = `
    <input 
    onchange="concluirAtt(event)"
    value="${atividade.data}"
    type="checkbox"
    `;

    if (atividade.finalizada == true) {
        input += 'checked';
    };

    input += '>';

    const formatar = format(atividade.data);

    return `
    <div class="card-bg">
        ${input}
        <div> 
            <svg class="active" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-toggle-on" viewBox="0 0 16 16">
            <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8"/>
            </svg>

            <svg class="inactive" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-toggle-off" viewBox="0 0 16 16">
            <path d="M11 4a4 4 0 0 1 0 8H8a5 5 0 0 0 2-4 5 5 0 0 0-2-4zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8M0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5"/>
            </svg>
            
            <span>${atividade.nome}</span>
        </div>



        <time class="short">
            ${formatar.dia.semana.curto}.
            ${formatar.dia.numerico} <br>
            ${formatar.hora}
        </time>
        
        <time class="fulltime">
            ${formatar.dia.semana.longo},
            dia ${formatar.dia.numerico} 
            de ${formatar.mes}
            às ${formatar.hora}h
        </time>    
    </div>`
}

const atualizarLista = () => {

    const section = document.querySelector('section');
    section.innerHTML = '';

    // VERIFICAR SE A LISTA ESTÁ VAZIA (CONDICINAL)
    if (atividades.length == 0) {
        section.innerHTML = `<h4>A lista está vazia!</h4>`;
        return;
    }
    for (let atividade of atividades) {
        section.innerHTML += criarAtividade(atividade);
    }
}

atualizarLista();

const salvarAtividade = (event) => {
    event.preventDefault();
    const dadosDoFormulario = new FormData(event.target)

    const nome = dadosDoFormulario.get('atividade');
    const dia = dadosDoFormulario.get('dia');
    const hora = dadosDoFormulario.get('hora');
    const data = `${dia} ${hora}`;

    const novaAtividade = {
        // QUANDO O NOME DA VARIÁVEL É O MESMO NOME DO OBJETO, PODE COLOCAR APENAS O NOME DIRETO
        nome: nome,
        data: data,
        finalizada: false
    }

    const attExiste = atividades.find((atividade) => {
        return atividade.data == novaAtividade.data
    })

    if (attExiste) {
        return alert('Dia/Hora não disponível!')
    }

    // INSERIR O CONTEUDO JÁ EXISTENTE
    atividades = [novaAtividade, ...atividades]
    atualizarLista();
    console.log(atividades);
}

const criarDiasSelect = () => {
    const dias = [
        "2024-02-28",
        "2024-02-29",
        "2024-03-01",
        "2024-03-02",
        "2024-03-03",
        "2024-03-04",
    ]

    let diasSelect = '';

    for (let dia of dias) {

        const formatar = format(dia)
        const diaFormat = `
        ${formatar.dia.numerico}
         de ${formatar.mes}`
        diasSelect += `<option value="${dia}">${diaFormat}</option>`
    }

    document.querySelector('select[name=dia]').innerHTML = diasSelect
}

criarDiasSelect();

const criarHorasSelect = () => {
    let horasLivres = ''

    for (let i = 6; i < 23; i++) {
        const hora = String(i).padStart(2, '0')
        horasLivres += `<option value="${hora}:00">${hora}:00</option>`
        horasLivres += `<option value="${hora}:30">${hora}:30</option>`
    }

    document
        .querySelector('select[name="hora"]')
        .innerHTML = horasLivres
}

criarHorasSelect();

const concluirAtt = (event) => {
    const input = event.target
    const dataInput = input.value

    const atividade = atividades.find((atividade) => {
        return atividade.data == dataInput
    });

    if (!atividade) {
        return
    }

    atividade.finalizada = !atividade.finalizada
}

// alert("Testando");