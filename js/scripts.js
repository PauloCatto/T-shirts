
var camisetas = {
    'branca': {
        
        'gola_v': {
            'sem_estampa': {
                'preco_unit': 5.12,
                'foto': 'v-white.jpg' 
            },
            'com_estampa': {
                'preco_unit': 8.95,
                'foto': 'v-white-personalized.jpg' 
            }
        },
        
        'gola_normal': {
            'sem_estampa': {
                'preco_unit': 4.99,
                'foto': 'normal-white.jpg' 
            },
            'com_estampa': {
                'preco_unit': 8.77,
                'foto': 'normal-white-personalized.jpg' 
            }
        }
    },
    
    'colorida': {
        'gola_v': {
            'sem_estampa': {
                'preco_unit': 6.04,
                'foto': 'v-color.jpg' 
            },
            'com_estampa': {
                'preco_unit': 9.47,
                'foto': 'v-color-personalized.png' 
            }
        },
        
        'gola_normal': {
            'sem_estampa': {
                'preco_unit': 5.35,
                'foto': 'normal-color.jpg' 
            },
            'com_estampa': {
                'preco_unit': 9.28,
                'foto': 'normal-color-personalized.jpg' 
            }
        }
    }
}

var parametros_pesquisa = {
    "quantidade": 1000,
    "cor": "colorida",
    "gola": "gola_v",
    "qualidade": "q150",
    "estampa": "com_estampa",
    "embalagem": "unitaria"
}


$(function() {

function atualizar_orcamento(parametros) {

        $('.refresh-loader').show();

    const quantidade = parametros.quantidade;
    const preco_unit = camisetas[parametros.cor][parametros.gola][parametros.estampa].preco_unit;
    const foto = "img/" + camisetas[parametros.cor][parametros.gola][parametros.estampa].foto;

    let valor_total = quantidade * preco_unit;

        if (parametros.qualidade == 'q190') {
            valor_total *= 1.12;
        }

        if (parametros.embalagem == 'unitaria') {
            valor_total += (quantidade * 0.15);
        }

        if (quantidade >= 1000) {
            valor_total *= 0.85
        } else if (quantidade >= 500) {
            valor_total *= 0.90
        } else if (quantidade >= 100) {
            valor_total *= 0.95
        }

        window.setTimeout(function(){

            const id_gola = '#' + parametros.gola;
            $('#result_gola').html( $(id_gola).html() );
            
            const id_estampa = "option[value='" + parametros.estampa + "']";
            $('#result_estampa').html( $(id_estampa).html() );

            const id_qualidade = "#" + parametros.qualidade;
            $('#result_qualidade').html( $(id_qualidade).html());

            const id_cor = "#" + parametros.cor;
            $('#result_cor').html( $(id_cor).html() );

            const id_embalagem = "option[value='" + parametros.embalagem + "']";
            $('#result_embalagem').html( $(id_embalagem).html() );

            $('#result_quantidade').html(parametros.quantidade);
            
            $('#valor-total').html(valor_total.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2} ) );

            $('#foto-produto').attr("src", foto);

            $('.refresh-loader').hide();

        }, 1000)
}

function atualizar_campos (parametros) {

    //cor
    $('#cor').children().removeClass('selected');
    const id_cor = "#" + parametros.cor;
    $(id_cor).addClass('selected');

    //gola
    $('#gola').children().removeClass('selected');
    const id_gola = "#" + parametros.gola;
    $(id_gola).addClass('selected');

    //qualidade
    $('#qualidade').children().removeClass('selected');
    const id_qualidade = "#" + parametros.qualidade;
    $(id_qualidade).addClass('selected');

    //estampa
    $('#estampa').val(parametros.estampa);

    //embalagem
    $('#embalagem').val(parametros.embalagem);

    //quantidade
    $('#quantidade').val(parametros.quantidade);

}

function atualizar_localStorage(parametros){

    window.localStorage.setItem('quantidade', parametros.quantidade);
    window.localStorage.setItem('cor', parametros.cor);
    window.localStorage.setItem('gola', parametros.gola);
    window.localStorage.setItem('qualidade', parametros.qualidade);
    window.localStorage.setItem('estampa', parametros.estampa);
    window.localStorage.setItem('embalagem', parametros.embalagem);

}
    
$('.option-filter div').click(function(){

    $(this).parent().children("div").removeClass("selected");
    $(this).addClass("selected");

    const categoria = $(this).parent().attr('id');
    parametros_pesquisa[categoria] = $(this).attr('id');
    atualizar_localStorage(parametros_pesquisa);
    atualizar_orcamento(parametros_pesquisa);

});

$('select').change(function(){

    const parametro_select = $(this).attr('id');
    parametros_pesquisa[parametro_select] = $(this).val();
    atualizar_localStorage(parametros_pesquisa);
    atualizar_orcamento(parametros_pesquisa);

});

$('#quantidade').change(function(){

    const parametro_input = $(this).attr('id');
    parametros_pesquisa[parametro_input] = $(this).val();
    atualizar_localStorage(parametros_pesquisa);
    atualizar_orcamento(parametros_pesquisa);

})


atualizar_campos(parametros_pesquisa);
atualizar_orcamento(parametros_pesquisa);

});

if (window.localStorage['quantidade']) {
    parametros_pesquisa.quantidade = parseInt(window.localStorage['quantidade'])
}

if (window.localStorage['cor']) {
    parametros_pesquisa.cor = window.localStorage['cor']
}


if (window.localStorage['gola']) {
    parametros_pesquisa.gola = window.localStorage['gola']
}


if (window.localStorage['qualidade']) {
    parametros_pesquisa.qualidade = window.localStorage['qualidade']
}


if (window.localStorage['estampa']) {
    parametros_pesquisa.estampa = window.localStorage['estampa']
}

if (window.localStorage['embalagem']) {
    parametros_pesquisa.embalagem = window.localStorage['embalagem']
}

