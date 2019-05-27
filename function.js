$(function(){
	var operation = "X";
	var selected_index = -1; //indice do elemento da lista
	var tblPessoa = localStorage.getItem("tblPessoa"); //dados armazenados
	tblPessoa = JSON.parse(tblPessoa);
	if(tblPessoa === null)
		tblPessoa = [];

	   function Cadastro (){
		     var pessoa = JSON.stringify({
		         nome: $("txtNome").val(),
             CPF: $("txtCpf").val(),
             idade: $("txtIdade").val(),
		         peso: $("txtPeso").val(),
		         altura: $("txtAltura").val()
		     });

          function CalcularIMC (){
						var imc = pessoa.peso/(pessoa.altura*pessoa.altura);
						alert ("O valor do seu imc é: " + imc);
          }

					tblPessoa.push(pessoa);
      		localStorage.setItem("tblPessoa", JSON.stringify(tblPessoa));
          alert("Os dados foram salvos.");
					CalcularIMC();
          return true;
      	}


    	function Excluir(){
    		tblPessoa.splice(selected_index,1);
    		localStorage.setItem("tblPessoa", JSON.stringify(tblPessoa));
    		alert("A pessoa foi excluida.");
    	}

    	function Editar(){
    		tblPessoa[selected_index] = JSON.stringify({
    		nome: $("txtNome").val(),
    		CPF: $("txtCpf").val(),
    		idade: $("txtIdade").val(),
    		peso: $("txtPeso").val(),
    		altura: $("txtAltura").val()
    		});

  		localStorage.setItem("tblPessoa",JSON.stringify(tblPessoa));
  		alert("Os dados foram alterados.");
  		return true;
  	 }

    	 function Lista() {
        $("#tblList").html("");
        $("#tblList").html(
                "<thead>" +
                "<tr>" +
                "<th>Nome</th>" +
                "<th>Cpf</th>" +
                "<th>Idade</th>" +
                "<th>Peso</th>" +
                "<th>Altura</th>" +
                "<th>Ações</th>" +
                "</tr>" +
                "</thead>" +
                "<tbody>" +
                "</tbody>"
                ); //Adicione a tabela a estrutura HTML
    		for (var i in tblPessoa) {
    			var per = JSON.parse(tblPessoa[i]);
    			$("#tblList tbody").append("<tr>" +
                    "<td>" + per.nome + "</td>" +
                    "<td>" + per.CPF + "</td>" +
                    "<td>" + per.idade + "</td>" +
                    "<td>" + per.peso + "</td>" +
                    "<td>" + per.altura + "</td>" +
                    "<td><img src='edit.png' alt='Editar" + i + "' class='btnEdit'/>&nbsp &nbsp<img src='delete.png' alt='Excluir" + i + "' class='btnDelete'/></td>" +
                    "</tr>"
                    );
    		            }
	       }
  	$("#frmPessoa").bind("submit", function(){
  		if(operation === "X")
  			return Cadastro();
  		else
  			return Editar();
  	});

  	Lista();

    $(".btnEdit").bind("click", function () {
      operation = "E";
      selected_index = parseInt($(this).attr("alt").replace("Editar", ""));
      // Converter de JSON para um formato que possa editar os dados
      var per = JSON.parse(tblPessoa[selected_index]);
      $("#txtNome").val(per.nome);
      $("#txtCpf").val(per.CPF);
      $("#txtIdade").val(per.idade);
      $("#txtPeso").val(per.peso);
      $("#txtAltura").val(per.altura);
      $("#txtCpf").attr("readonly", "readonly");
      $("#txtNome").focus();
  	});

  	  $(".btnDelete").bind("click", function () {
      //Obter o identificador do item a ser eliminado
      selected_index = parseInt($(this).attr("alt").replace("Excluir", ""));
      Excluir();
      Lista();
    });
});
