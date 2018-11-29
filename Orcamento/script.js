(function() {

    var listaProdutos = [];
    var listaServicos = [];
    
    // salva produtos
    function salvarProdutos(){
        var produto = {};

        produto.nome = $("#nome-produto").val();
        produto.quantidade = $("#qtd-produto").val();
        produto.valorUnitario = $("#valor-unitario").val();
        produto.valorTotal = $("#valor-total").val();

        let id = $("#id-produto").val();

        if(id == undefined || id == ''){
            produto.id = new Date().getTime();
            listaProdutos.push(produto);
        } else {
            let idNumber = parseInt(id);
            let produtoExistente = findProdutoById(idNumber);

            if(produtoExistente){
                produtoExistente.nome = produto.nome;
                produtoExistente.quantidade = produto.quantidade;
                produtoExistente.valor_unitario = produto.valorUnitario;
                produtoExistente.valor_total = produto.valorTotal;
            }
        }

        renderizaProduto();

         limpar();

         calculaTotais();
        return false;
    }
    // salva servicos
    function salvarServicos(){
        var servico = {};

        servico.descricao = $("#descricao-servico").val();
        servico.valor = $("#valor-servico").val();
        let id = $("#id-servico").val();

        if(id == undefined || id == ''){
            servico.id = new Date().getTime();
            listaServicos.push(servico);
        } else {
            let idNumber = parseInt(id);
            let servicoExistente = findServicoById(idNumber);

            if(servicoExistente){
                servicoExistente.descricao = servico.descricao;
                servicoExistente.valor = servico.valor;

            }
        }
        renderizaServico();
        limparServico();

        calculaTotaisServico();
        return false;
    }

    // limpa produtos
    function limpar(){
        $("#formulario-produto input").val('');
    }

    // limpa servicos
    function limparServico(){
        $("#formulario-servicos input").val('');
    }

    // renderiza produto
    function renderizaProduto(){
        const tbody = $("#corpo-produto");

        tbody.html('');

        for(let i=0; i<listaProdutos.length; i++){

            const produto = listaProdutos[i];

            let tr = $('<tr>');

            let tdNome = $('<td>').text(produto.nome);
            let tdQuantidade = $('<td>').text(produto.quantidade);
            let tdValor = $('<td>').text(produto.valorUnitario);
            let tdValorTotal = $('<td>').text(produto.valorTotal).addClass("valor");

            let tdOpcoes = $('<td>');

            tr.append(tdNome)
                .append(tdQuantidade)
                .append(tdValor)
                .append(tdValorTotal)
                .append(tdOpcoes);

            let btnEditar = $('<button>').text('Editar');

            let btnExcluir = $('<button>').text('Excluir');

            btnEditar.click(function(){
                editarProduto(produto.id);
            });

            const fn_exc = function(){
                excluirProduto(produto.id);
            };
            btnExcluir.click(fn_exc);

            tdOpcoes.append(btnEditar).append(btnExcluir);
            tbody.append(tr);
        }
    }

    // renderiza servico
    function renderizaServico(){
        const tbody = $("#corpo-tabela-servicos");

        tbody.html('');

        for(let i=0; i<listaServicos.length; i++){

            const servico = listaServicos[i];

            let tr = $('<tr>');

            let tdDescricao = $('<td>').text(servico.descricao);
            let tdValor = $('<td>').text(servico.valor).addClass("valorServico");
            let tdOpcoes = $('<td>');

            tr.append(tdDescricao)
                .append(tdValor)
                .append(tdOpcoes);

            let btnEditar = $('<button>').text('Editar');

            let btnExcluir = $('<button>').text('Excluir');

            btnEditar.click(function(){
                editarServico(servico.id);
            });

            const fn_exc = function(){
                excluirServico(servico.id);
            };
            btnExcluir.click(fn_exc);

            tdOpcoes.append(btnEditar).append(btnExcluir);
            tbody.append(tr);
        }
    }

    // edita prod
    function editarProduto(id){
        let produto = findProdutoById(id);

         if(produto){
             $("#nome-produto").val(produto.nome);
             $("#qtd-produto").val(produto.quantidade);
             $("#valor-unitario").val(produto.valorUnitario);
             $("#valor-total").val(produto.valorTotal);
             $("#id-produto").val(produto.id);
         }else{
             alert('Não foi possível encontrar o servico');
         }
         calculaTotais();
     }

     // exclui prod
     function excluirProduto(id){
         listaProdutos = listaProdutos
             .filter(function(value){
                 return value.id != id;
             });

        renderizaProduto();
        calculaTotais();
        }

    function editarServico(id){
        let servico = findServicoById(id);

         if(servico){
             $("#descricao-servico").val(servico.descricao);
             $("#valor-servico").val(servico.valor);
             $("#id-servico").val(servico.id);
         }else{
             alert('Não foi possível encontrar o servico');
         }
         calculaTotaisServico();
     }

     function excluirServico(id){
        listaServicos = listaServicos
            .filter(function(value){
                return value.id != id;
            });
        renderizaServico();
        calculaTotaisServico();
    }

     function findProdutoById(id){
        let produtos = listaProdutos
            .filter(function(value){
                return value.id == id;
            });

        if(produtos.length == 0){
            return undefined;
        }else{
            return produtos[0];
        }

    }

    function findServicoById(id){
        let servicos = listaServicos
            .filter(function(value){
                return value.id == id;
            });

        if(servicos.length == 0){
            return undefined;
        }else{
            return servicos[0];
        }

    }

    renderizaProduto();
    renderizaServico();

    $("#formulario-produto").on("submit", function(evt){
        salvarProdutos();
        evt.stopPropagation();
        evt.preventDefault();
    });

    $('#formulario-produto input').each(function(index, element){
        element.oninvalid = function(){
            const msg = $(this).data('custom-message');
            if(msg){
                this.setCustomValidity("");
                if (!this.validity.valid) {
                    this.setCustomValidity(msg);
                }
            }
        }
    });

    $("#formulario-servicos").on("submit", function(evt){
        salvarServicos();
        evt.stopPropagation();
        evt.preventDefault();
    });

    $('#formulario-servicos input').each(function(index, element){
        element.oninvalid = function(){
            const msg = $(this).data('custom-message');
            if(msg){
                this.setCustomValidity("");
                if (!this.validity.valid) {
                    this.setCustomValidity(msg);
                }
            }
        }
    });

    // função de atualizar total produto

    $("#qtd-produto, #valor-unitario").keyup(fazerConta);

    function fazerConta() {
        var num1 = ($("#qtd-produto").val());
        var num2 = ($("#valor-unitario").val());

        if (num1 == '') {
            num1 = 0;
        }
        if (num2 == '') {
            num2 = 0;
        }

        var total = (num1 * num2);
        $("#valor-total").val(total);
    }

    ////////

    // calcula totais


    var table = $('#tabelaProduto');
    var indice = 3;
    table.find('tr').each(function(indice){
        $(this).find('td').each(function(indice){

        });
    });

    function calculaTotais(){
        var total = 0;
        $("#tabelaProduto .valor").each(function(){
            total += parseFloat($(this).text());

        })
        $("#totais").text(total);
        setTotalGeral();
    };

     function calculaTotaisServico(){
        var total = 0;
        $("#tabelaServico .valorServico").each(function(){
            total += parseFloat($(this).text());

        })
        $("#totalServico").text(total);
        setTotalGeral();
    };

    function setTotalGeral(){
        var totalProduto = parseFloat($("#totais").text());
        var totalServico = parseFloat($("#totalServico").text());
        if(!$.isNumeric(totalProduto)){
            totalProduto = 0;
        }
        if(!$.isNumeric(totalServico)){
            totalServico = 0;
        }
        $("#ttProduto").text(totalProduto);
        $("#ttServico").text(totalServico);
        $("#ttGeral").text(totalProduto + totalServico);
    }

////////////////////////////////////////////////////////////////////////////////////

    function salvarOrcamento(){
        const orcamento = {};
        orcamento.cliente = $("#nome-cliente").val();
        orcamento.cpf = $("#cpf-cliente").val();
        orcamento.totalProdutos = parseFloat($("#ttProduto").text());
        orcamento.totalServicos = parseFloat($("#ttServico").text());
        orcamento.totalGeral = parseFloat($("#ttGeral").text());
        orcamento.produtos = listaProdutos;
        orcamento.servicos = listaServicos;
        $.ajax({
            url: 'http://172.18.24.130:3000/orcamento',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(orcamento),
            processData: false,
        });
    }

    $("#envia").click(function(){
        salvarOrcamento();
    });


})();