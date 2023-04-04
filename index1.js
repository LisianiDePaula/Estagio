var contexto_1 = "nada";
var contexto_2 = "nada";
var alfa_lock = 0;
var oquefazer = -1;
var leitura_principal = "aaa";
var pagina;
var molde;
var opcao2 = "";
var opcao2_1 = "";
var opcao2_2 = "";
var novo = 0;

var opcao2_1_vs2 = "";
var opcao2_2_vs2 = "";

var alex = "";

var opcao2_vs2 = "";
var opcao3 = "";
var opcao3_vs2 = "";
var opcao4 = "";
var opcao4a = "";

var opcao4valor = "";
var opcao4valor_vs2;

//variaveis das correcções das anomalias
var def_moldes = [];
var def_ensaios = [];
var def_correcaos = [];
var def_id_defeitos = [];

var activo = 1;

var opcao4an = [];
var opcao4an_vs2 = [];

var ruim_1 = [];

var dados1 = [];
var dados2 = [];
var dados3 = [];

var imagem1 = [];

var valor_scroll = 0;

var data_fim;

var data_inicio;

function criar_molde_para_ensaio() {
	limpar_todas_as_variaveis();
	var xmlhttp = new XMLHttpRequest();
	var url = 'json/criar_molde_para_ensaio_json.php';


	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myFunction1(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

	document.getElementById('entrada').innerHTML = "Criar produto";
}

function materias_primas(iii) {
	var minha = document.getElementsByClassName('listamateriaprima');

	minha[0].style.display = "block";


	ler_materias_primas(iii);
}

function ler_materias_primas(iii) {
	var xmlhttp = new XMLHttpRequest();
	var url = 'json/Lista_materia_prima_json.php?indice=' + iii;

	if (document.getElementById('cliente').value != "") {

		url = url + "&cliente=" + document.getElementById('cliente').value;
	}


	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myFunctionapresentarmateriasprimas(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

}

function myFunctionapresentarmateriasprimas(response) {
	var str = response;

	var minha = document.getElementsByClassName('listamateriaprima');

	minha[0].innerHTML = str;
}

function editar_materia_prima(iii) {

	var xmlhttp = new XMLHttpRequest();
	var url = 'json/editar_geral_materia_prima_json.php?materia_prima=' + iii;

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myFunction_editar_de_materias_primas(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function gravar_editar_materia_prima(iii) {
	var form = new FormData();
	form.append('numero', iii);
	form.append('materia_prima', document.getElementById('materia_prima').value);
	form.append('familia', document.getElementById('familia').value);
	form.append('qtd_materia_prima', document.getElementById('qtd_materia_prima').value);
	form.append('fabricante', document.getElementById('fabricante').value);
	form.append('tempo_estufagem', document.getElementById('tempo_estufagem').value);
	form.append('temperatua_estufagem', document.getElementById('temperatua_estufagem').value);

	var request = new XMLHttpRequest();
	request.open('post', 'json/gravar_editar_materia_prima_json.php');
	request.send(form);

	Lista_de_matéria_prima(-1);
}

function myFunction_editar_de_materias_primas(response) {
	var $str = response;

	document.getElementById('editar_materia_prima').innerHTML = $str;
	document.getElementById('pr').style.visibility = "hidden";

	document.getElementById('pr').style.position = 'absolute';
	document.getElementById('pr').style.top = '5%';
	//document.getElementById('pr').style.height='430px';
	document.getElementById('pr').style.left = '10%';
	document.getElementById('pr').style.width = '80%';
	//document.getElementById('pr').style.overflow='hidden';
}

function editar_cliente(iii) {

	var xmlhttp = new XMLHttpRequest();
	var url = 'json/editar_geral_cliente_json.php?cliente=' + iii;

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myFunction_editar_cliente(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function myFunction_editar_cliente(response) {
	var $str = response;

	document.getElementById('editar_cliente').innerHTML = $str;
	document.getElementById('pr').style.visibility = "hidden";
	document.getElementById('pr').style.position = 'absolute';
	document.getElementById('pr').style.top = '5%';
	//document.getElementById('pr').style.height='430px';
	document.getElementById('pr').style.left = '10%';
	document.getElementById('pr').style.width = '80%';
	//document.getElementById('pr').style.overflow='hidden';
}

function gravar_editar_clientes(iii) {
	var form = new FormData();
	form.append('numero', iii);
	form.append('cliente', document.getElementById('cliente').value);
	form.append('origem', document.getElementById('origem').value);

	var request = new XMLHttpRequest();
	request.open('post', 'json/gravar_editar_clientes_json.php');
	request.send(form);

	lista_de_clientes();
}

function gravar_nova_materia_prima() {
	//teste

	var form = new FormData();
	//form.append('numero', iii);
	form.append('materia_prima', document.getElementById('materia_prima').value);
	form.append('familia', document.getElementById('familia').value);
	form.append('qtd_materia_prima', document.getElementById('qtd_materia_prima').value);
	form.append('fabricante', document.getElementById('fabricante').value);
	form.append('tempo_estufagem', document.getElementById('tempo_estufagem').value);
	form.append('temperatua_estufagem', document.getElementById('temperatua_estufagem').value);

	var request = new XMLHttpRequest();
	request.open('post', 'json/gravar_nova_materia_prima_json.php');
	request.send(form);

	Lista_de_matéria_prima(-1);
}

function adicionar_materia_prima() {
	var xmlhttp = new XMLHttpRequest();
	var url = 'json/gravar_noval_materia_prima_json.php';

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myFunction_criar_nova_materia_prima(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function myFunction_criar_nova_materia_prima(response) {
	var $str = response;

	document.getElementById('corpo').innerHTML = $str;
}

function adicionar_novo_cliente() {
	var xmlhttp = new XMLHttpRequest();
	var url = 'json/criar_novo_cliente_json.php';

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myFunction_criar_novo_cliente(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function myFunction_criar_novo_cliente(response) {
	var $str = response;

	document.getElementById('corpo').innerHTML = $str;
}

function gravar_novo_cliente() {
	var form = new FormData();

	form.append('cliente', document.getElementById('cliente').value);
	form.append('origem', document.getElementById('origem').value);

	var request = new XMLHttpRequest();
	request.open('post', 'json/gravar_novo_clientes_json.php');
	request.send(form);

	lista_de_clientes();
}

function lista_de_clientes() {
	var xmlhttp = new XMLHttpRequest();
	var url = 'json/Lista_geral_clientes_json.php';

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myFunction_lista_de_clientes(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

	document.getElementById('entrada').innerHTML = "Lista de Clientes";
}

function myFunction_lista_de_clientes(response) {
	var $str = response;

	document.getElementById('corpo').innerHTML = $str;
}

function Lista_de_matéria_prima(i) {
	var xmlhttp = new XMLHttpRequest();
	var url = 'json/Lista_geral_materia_prima_json.php';

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myFunction_lista_de_materias_primas(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function componentes(i) {
	var xmlhttp = new XMLHttpRequest();
	var url = 'json/Lista_geral_materia_prima_json.php';


	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myFunction_lista_de_componentes(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function myFunction_lista_de_componentes(response) {
	var $str = response;

	document.getElementById('corpo').innerHTML = $str;
}

function myFunction_lista_de_materias_primas(response) {
	var $str = response;

	document.getElementById('corpo').innerHTML = $str;
}

function escolher_materia_prima(iii, indice) {

	var minha = document.getElementsByClassName('listamateriaprima');

	minha[0].style.display = "none";

	if (indice == 1) {
		document.getElementById('materia_prima').value = iii;
	}

	if (indice == 2) {
		document.getElementById('materia_prima1').value = iii;
	}

	if (indice == 3) {
		document.getElementById('materia_prima2').value = iii;
	}

}

function myFunction1(response) {
	var str = response;

	document.getElementById('corpo').innerHTML = str;

	document.getElementById('entrada').innerHTML = "Criar Produto";

	corrigir();
}

function corrigir() {

	//openFullscreen();
	ecra1 = screen.height * 0.95 | 0;
	pos = 56;

	mio1 = document.getElementsByClassName('linha1');
	var ala = mio1.length;

	inicial = screen.height * 0.01;

	for (i = 0; i < ala; i++) {
		alfa = 1.4;


		var ty = myLocalizacao(mio1[i].innerHTML, "moma");

		if (ty == -1) {

		} else {
			alfa = 5;

		}

		var ty = myLocalizacao(mio1[i].innerHTML, "moma1");

		if (ty == -1) {

		} else {
			alfa = 8.1;

		}

		var ty = myLocalizacao(mio1[i].innerHTML, "05linhas");

		if (ty == -1) {

		} else {
			alfa = 0.4;
		}

		var ty = myLocalizacao(mio1[i].innerHTML, "1linhas");

		if (ty == -1) {

		} else {
			alfa = 1.5;
		}

		var ty = myLocalizacao(mio1[i].innerHTML, "2linhas");

		if (ty == -1) {

		} else {
			alfa = 2;
		}

		var ty = myLocalizacao(mio1[i].innerHTML, "3linhas");

		if (ty == -1) {

		} else {
			alfa = 3.2;
		}

		var ty = myLocalizacao(mio1[i].innerHTML, "4linhas");

		if (ty == -1) {

		} else {
			alfa = 4;
		}

		var ty = myLocalizacao(mio1[i].innerHTML, "5linhas");

		if (ty == -1) {

		} else {
			alfa = 7.5;
		}

		var ty = myLocalizacao(mio1[i].innerHTML, "7linhas");

		if (ty == -1) {

		} else {
			alfa = 9.8;
		}

		var ty = myLocalizacao(mio1[i].innerHTML, "tabela");

		if (ty == -1) {

		} else {
			alfa = document.getElementById("tabela1").rows.length;
		}

		var ty = myLocalizacao(mio1[i].innerHTML, "10linhas");

		if (ty == -1) {

		} else {
			alfa = 8.8;
		}

		var ty = myLocalizacao(mio1[i].innerHTML, "12linhas");

		if (ty == -1) {

		} else {
			alfa = 12;
		}

		passo = 1.2;
		mio1[i].style.position = 'absolute';
		mio1[i].style.top = inicial + 'px';
		if (mio1[i].hidden == true) {
			mio1[i].style.height = "0px";
			passo = 0;
		} else {
			mio1[i].style.height = 1.2 * pos * alfa + 'px';
		}

		mio1[i].style.width = '99.5%';
		mio1[i].style.left = '0%';
		//mio1[i].style.backgroundColor='blue';
		mio1[i].style.textAlign = "left";
		inicial = inicial + passo * pos * alfa + 5;
	}

	respostaoo = document.getElementsByClassName('respostaoo');
	ala = respostaoo.length;

	for (i = 0; i < ala; i++) {
		respostaoo[i].style.position = 'absolute';
		respostaoo[i].style.top = '30px';
		respostaoo[i].style.height = '200px';
		respostaoo[i].style.left = '0%';
		respostaoo[i].style.width = '100%';
		respostaoo[i].style.overflow = 'hidden';
	}

	pergunta_n1 = document.getElementsByClassName('pergunta_n1');
	ala = pergunta_n1.length;

	for (i = 0; i < ala; i++) {
		pergunta_n1[i].style.position = 'absolute';
		pergunta_n1[i].style.top = '0px';
		pergunta_n1[i].style.height = '100px';
		pergunta_n1[i].style.left = '0%';
		pergunta_n1[i].style.width = '100%';
		pergunta_n1[i].style.overflow = 'hidden';
	}

	respostaoo1 = document.getElementsByClassName('respostaoo1');
	ala1 = respostaoo1.length;

	for (i = 0; i < ala1; i++) {
		respostaoo1[i].style.position = 'absolute';
		respostaoo1[i].style.top = '260px';
		respostaoo1[i].style.height = '200px';
		respostaoo1[i].style.left = '0%';
		respostaoo1[i].style.width = '100%';
		respostaoo1[i].style.overflow = 'hidden';
	}

	pergunta_n2 = document.getElementsByClassName('pergunta_n2');
	ala1 = pergunta_n2.length;

	for (i = 0; i < ala1; i++) {
		pergunta_n2[i].style.position = 'absolute';
		pergunta_n2[i].style.top = '230px';
		pergunta_n2[i].style.height = '100px';
		pergunta_n2[i].style.left = '0%';
		pergunta_n2[i].style.width = '100%';
		pergunta_n2[i].style.overflow = 'hidden';
	}

	respostaoo2 = document.getElementsByClassName('respostaoo2');
	ala2 = respostaoo2.length;

	for (i = 0; i < ala2; i++) {
		respostaoo2[i].style.position = 'absolute';
		respostaoo2[i].style.top = '490px';
		respostaoo2[i].style.height = '200px';
		respostaoo2[i].style.left = '0%';
		respostaoo2[i].style.width = '100%';
		respostaoo2[i].style.overflow = 'hidden';
	}

	pergunta_n3 = document.getElementsByClassName('pergunta_n3');
	ala1 = pergunta_n3.length;

	for (i = 0; i < ala1; i++) {
		pergunta_n3[i].style.position = 'absolute';
		pergunta_n3[i].style.top = '460px';
		pergunta_n3[i].style.height = '100px';
		pergunta_n3[i].style.left = '0%';
		pergunta_n3[i].style.width = '100%';
		pergunta_n3[i].style.overflow = 'hidden';
	}

	respostaoo3 = document.getElementsByClassName('respostaoo3');
	ala3 = respostaoo3.length;

	for (i = 0; i < ala3; i++) {
		respostaoo3[i].style.position = 'absolute';
		respostaoo3[i].style.top = '720px';
		respostaoo3[i].style.height = '50px';
		respostaoo3[i].style.left = '0%';
		respostaoo3[i].style.width = '50%';
		respostaoo3[i].style.overflow = 'hidden';
	}

	micas = document.getElementsByClassName('micas');
	ala = micas.length;

	for (i = 0; i < ala; i++) {
		micas[i].style.position = 'absolute';
		micas[i].style.top = '0%';
		micas[i].style.height = '100%';
		fault = i * 33.33;
		micas[i].style.left = fault + "%";
		micas[i].style.width = '33%';
		micas[i].style.overflow = 'hidden';
		micas[i].style.border = '2px solid #4CAF50';
	}

	moma = document.getElementsByClassName('moma');
	ala = moma.length;

	for (i = 0; i < ala; i++) {
		moma[i].style.position = 'relative';
		moma[i].style.height = '100px';
		moma[i].style.left = '0%';
		moma[i].style.width = '100%';
		moma[i].style.overflow = 'hidden';
	}

	moma1 = document.getElementsByClassName('moma1');
	ala = moma1.length;

	for (i = 0; i < ala; i++) {
		moma1[i].style.position = 'relative';
		moma1[i].style.height = '100px';
		moma1[i].style.left = '0%';
		moma1[i].style.width = '100%';
		moma1[i].style.overflow = 'hidden';
	}


	mfmaria = document.getElementsByClassName('mfmaria');
	ala = mfmaria.length;

	for (i = 0; i < ala; i++) {
		mfmaria[i].style.position = 'absolute';
		mfmaria[i].style.top = '710px';
		mfmaria[i].style.height = '12px';
		mfmaria[i].style.left = '0%';
		mfmaria[i].style.caption = '0%';
		mfmaria[i].style.overflow = 'hidden';
	}

	mfmaria1 = document.getElementsByClassName('mfmaria1');
	ala = mfmaria1.length;

	for (i = 0; i < ala; i++) {
		mfmaria1[i].style.position = 'absolute';
		mfmaria1[i].style.top = '710px';
		mfmaria1[i].style.height = '12px';
		mfmaria1[i].style.left = '50%';
		mfmaria1[i].style.caption = '0%';
		mfmaria1[i].style.overflow = 'hidden';
	}

	mfmaria2 = document.getElementsByClassName('mfmaria2');
	ala = mfmaria2.length;

	for (i = 0; i < ala; i++) {
		mfmaria2[i].style.position = 'absolute';
		mfmaria2[i].style.top = '710px';
		mfmaria2[i].style.height = '12px';
		mfmaria2[i].style.left = '7%';
	}

	mfmaria3 = document.getElementsByClassName('mfmaria3');
	ala = mfmaria3.length;

	for (i = 0; i < ala; i++) {
		mfmaria3[i].style.position = 'absolute';
		mfmaria3[i].style.top = '710px';
		mfmaria3[i].style.height = '12px';
		mfmaria3[i].style.left = '57%';
	}
	malhacao = document.getElementsByClassName('malhacao');
	ala = malhacao.length;

	for (i = 0; i < ala; i++) {
		malhacao[i].style.position = 'absolute';
		malhacao[i].style.top = '60px';
		malhacao[i].style.height = '430px';
		malhacao[i].style.left = '62%';
		malhacao[i].style.width = '37%';
	}

	mio2 = document.getElementsByClassName('pergunta');
	ala = mio2.length;

	for (i = 0; i < ala; i++) {
		mio2[i].style.position = 'absolute';
		mio2[i].style.top = '1px';
		mio2[i].style.height = '18px';
		mio2[i].style.width = '100%';
		mio2[i].style.left = '2%';
		mio2[i].style.textAlign = "left";
		mio2[i].style.verticalAlign = "middle";
	}

	mio2_mjj = document.getElementsByClassName('pergunta__1');
	ala = mio2_mjj.length;

	for (i = 0; i < ala; i++) {
		mio2_mjj[i].style.position = 'absolute';
		mio2_mjj[i].style.top = '22px';
		mio2_mjj[i].style.height = '14px';
		mio2_mjj[i].style.fontSize = '12px';
		mio2_mjj[i].style.color = 'blue';
		mio2_mjj[i].style.width = '100%';
		mio2_mjj[i].style.left = '2%';
		mio2_mjj[i].style.textAlign = "left";
		mio2_mjj[i].style.verticalAlign = "middle";
	}

	mio2_mjji = document.getElementsByClassName('pergunta__2');
	ala = mio2_mjji.length;

	for (i = 0; i < ala; i++) {
		mio2_mjji[i].style.position = 'absolute';
		mio2_mjji[i].style.top = '22px';
		mio2_mjji[i].style.height = '14px';
		mio2_mjji[i].style.fontSize = '12px';
		mio2_mjji[i].style.color = 'blue';
		mio2_mjji[i].style.width = '100%';
		mio2_mjji[i].style.left = '74%';
		mio2_mjji[i].style.textAlign = "left";
		mio2_mjji[i].style.verticalAlign = "middle";
	}

	mio2_mjj = document.getElementsByClassName('pergunta___1');
	ala = mio2_mjj.length;

	for (i = 0; i < ala; i++) {
		mio2_mjj[i].style.position = 'absolute';
		mio2_mjj[i].style.top = '22px';
		mio2_mjj[i].style.height = '14px';
		mio2_mjj[i].style.fontSize = '12px';
		mio2_mjj[i].style.color = 'blue';
		mio2_mjj[i].style.width = '100%';
		mio2_mjj[i].style.left = '2%';
		mio2_mjj[i].style.textAlign = "left";
		mio2_mjj[i].style.verticalAlign = "middle";
	}

	mio2_mjji = document.getElementsByClassName('pergunta___2');
	ala = mio2_mjji.length;

	for (i = 0; i < ala; i++) {
		mio2_mjji[i].style.position = 'absolute';
		mio2_mjji[i].style.top = '22px';
		mio2_mjji[i].style.height = '14px';
		mio2_mjji[i].style.fontSize = '12px';
		mio2_mjji[i].style.color = 'blue';
		mio2_mjji[i].style.width = '100%';
		mio2_mjji[i].style.left = '59%';
		mio2_mjji[i].style.textAlign = "left";
		mio2_mjji[i].style.verticalAlign = "middle";
	}

	mio2_mjji = document.getElementsByClassName('pergunta___3');
	ala = mio2_mjji.length;

	for (i = 0; i < ala; i++) {
		mio2_mjji[i].style.position = 'absolute';
		mio2_mjji[i].style.top = '22px';
		mio2_mjji[i].style.height = '14px';
		mio2_mjji[i].style.fontSize = '12px';
		mio2_mjji[i].style.color = 'blue';
		mio2_mjji[i].style.width = '100%';
		mio2_mjji[i].style.left = '80%';
		mio2_mjji[i].style.textAlign = "left";
		mio2_mjji[i].style.verticalAlign = "middle";
	}

	maquinas = document.getElementsByClassName('maquinas');
	ala = maquinas.length;

	for (i = 0; i < ala; i++) {
		if (maquinas[i].tagName == "TEXTAREA") {
			beta = 11;
		} else {
			beta = 1;
		}
		maquinas[i].style.position = 'inline';
		maquinas[i].style.top = '0px';
		maquinas[i].style.height = '70%';
		maquinas[i].style.width = '20%';
		maquinas[i].style.right = '2%';
		maquinas[i].style.paddings = "1px";
		maquinas[i].style.fontSize == "11px";
	}

	mio3ass = document.getElementsByClassName('resposta11');
	ala = mio3ass.length;

	for (i = 0; i < ala; i++) {
		if (mio3ass[i].tagName == "TEXTAREA") {
			beta = 11;
		} else {
			beta = 1;
		}
		mio3ass[i].style.position = 'absolute';
		mio3ass[i].style.top = '50px';
		mio3ass[i].style.height = 32 * beta * 1.3 + 'px';
		mio3ass[i].style.width = '70%';
		mio3ass[i].style.left = '2%';
	}

	resposta111 = document.getElementsByClassName('resposta111');
	ala = resposta111.length;

	for (i = 0; i < ala; i++) {
		if (resposta111[i].tagName == "TEXTAREA") {
			beta = 11;
		} else {
			beta = 1;
		}
		resposta111[i].style.position = 'absolute';
		resposta111[i].style.top = '50px';
		resposta111[i].style.height = 32 * beta * 1.3 + 'px';
		resposta111[i].style.width = '24%';
		resposta111[i].style.left = '74%';
	}

	mio3ass = document.getElementsByClassName('resposta2');
	ala = mio3ass.length;

	for (i = 0; i < ala; i++) {
		if (mio3ass[i].tagName == "TEXTAREA") {
			beta = 11;
		} else {
			beta = 1;
		}
		mio3ass[i].style.position = 'absolute';
		mio3ass[i].style.bottom = '2px';
		mio3ass[i].style.height = 32 * beta * 1.3 + 'px';
		mio3ass[i].style.width = '22%';
		mio3ass[i].style.left = '80%';
	}

	mio3ass = document.getElementsByClassName('resposta3');
	ala = mio3ass.length;

	for (i = 0; i < ala; i++) {
		if (mio3ass[i].tagName == "TEXTAREA") {
			beta = 11;
		} else {
			beta = 1;
		}
		mio3ass[i].style.position = 'absolute';
		mio3ass[i].style.bottom = '2px';
		//mio3ass[i].style.height=32*beta*1.3+'px';
		mio3ass[i].style.width = '8%';
		mio3ass[i].style.left = '90%';
	}

	mioensaio = document.getElementsByClassName('ensaio');
	ala = mioensaio.length;

	for (i = 0; i < ala; i++) {
		//mioensaio[i].dragElement;
		//mioensaio[i].cursor='move';

	}

	mio3 = document.getElementsByClassName('resposta');
	ala = mio3.length;

	for (i = 0; i < ala; i++) {
		if (mio3[i].tagName == "TEXTAREA") {
			beta = 11;
		} else {
			beta = 1;
		}
		mio3[i].style.position = 'absolute';
		mio3[i].style.top = '50px';
		mio3[i].style.height = 32 * beta * 1.3 + 'px';
		mio3[i].style.width = '96%';
		mio3[i].style.left = '2%';
	}

	/////////////////////

	mio3 = document.getElementsByClassName('resposta_rrrr');
	ala = mio3.length;

	for (i = 0; i < ala; i++) {
		beta = 1;
		mio3[i].style.position = 'absolute';
		mio3[i].style.top = '1px';
		mio3[i].style.height = 32 * beta * 1.2 + 'px';
		mio3[i].style.width = '125px';
		mio3[i].style.left = '0%';
		mio3[i].style.top = '0%';
	}

	//////////////////////

	mio3eee = document.getElementsByClassName('resposta_rrrrr');
	ala = mio3eee.length;

	for (i = 0; i < ala; i++) {
		beta = 1;
		mio3eee[i].style.position = 'relative';
		mio3eee[i].style.top = '1px';
		mio3eee[i].style.height = 32 * beta * 1.2 + 'px';
		mio3eee[i].style.width = '125px';
		mio3eee[i].style.left = '200px';
		mio3eee[i].style.top = '0px';
	}

	//////////////////////

	mio3eeeeee = document.getElementsByClassName('pergunta_rrrrr');
	ala = mio3eeeeee.length;

	for (i = 0; i < ala; i++) {
		beta = 1;
		mio3eeeeee[i].style.position = 'relative';
		mio3eeeeee[i].style.top = '1px';
		mio3eeeeee[i].style.height = 32 * beta * 1.2 + 'px';
		mio3eeeeee[i].style.width = '175px';
		mio3eeeeee[i].style.left = '0px';
		mio3eeeeee[i].style.top = '0px';
	}

	//////////////////////

	mio3_mk = document.getElementsByClassName('resposta__1');
	ala = mio3_mk.length;

	for (i = 0; i < ala; i++) {
		if (mio3_mk[i].tagName == "TEXTAREA") {
			beta = 11;
		} else {
			beta = 1;
		}
		mio3_mk[i].style.position = 'absolute';
		mio3_mk[i].style.top = '50px';
		mio3_mk[i].style.height = 32 * beta * 1.3 + 'px';
		mio3_mk[i].style.width = '70%';
		mio3_mk[i].style.left = '2%';
	}

	mio3_mk = document.getElementsByClassName('resposta___1');
	ala = mio3_mk.length;

	for (i = 0; i < ala; i++) {
		if (mio3_mk[i].tagName == "TEXTAREA") {
			beta = 11;
		} else {
			beta = 1;
		}
		mio3_mk[i].style.position = 'absolute';
		mio3_mk[i].style.top = '50px';
		mio3_mk[i].style.height = 32 * beta * 1.3 + 'px';
		mio3_mk[i].style.width = '56%';
		mio3_mk[i].style.left = '2%';
	}

	mio3_mka = document.getElementsByClassName('resposta__2');
	ala = mio3_mka.length;

	for (i = 0; i < ala; i++) {
		if (mio3_mka[i].tagName == "TEXTAREA") {
			beta = 11;
		} else {
			beta = 1;
		}
		mio3_mka[i].style.position = 'absolute';
		mio3_mka[i].style.top = '50px';
		mio3_mka[i].style.height = 32 * beta * 1.3 + 'px';
		mio3_mka[i].style.width = '26%';
		mio3_mka[i].style.left = '73%';
	}

	mio3_mka = document.getElementsByClassName('resposta___2');
	ala = mio3_mka.length;

	for (i = 0; i < ala; i++) {
		if (mio3_mka[i].tagName == "TEXTAREA") {
			beta = 11;
		} else {
			beta = 1;
		}
		mio3_mka[i].style.position = 'absolute';
		mio3_mka[i].style.top = '50px';
		mio3_mka[i].style.height = 32 * beta * 1.3 + 'px';
		mio3_mka[i].style.width = '20%';
		mio3_mka[i].style.left = '59%';
	}

	mio3_mka = document.getElementsByClassName('resposta___3');
	ala = mio3_mka.length;

	for (i = 0; i < ala; i++) {
		if (mio3_mka[i].tagName == "TEXTAREA") {
			beta = 11;
		} else {
			beta = 1;
		}
		mio3_mka[i].style.position = 'absolute';
		mio3_mka[i].style.top = '50px';
		mio3_mka[i].style.height = 32 * beta * 1.3 + 'px';
		mio3_mka[i].style.width = '19%';
		mio3_mka[i].style.left = '80%';
	}


	mio4 = document.getElementsByClassName('pergunta1');
	ala = mio4.length;

	for (i = 0; i < ala; i++) {
		mio4[i].style.position = 'absolute';
		mio4[i].style.top = '5%';
		mio4[i].style.height = '90%';
		mio4[i].style.width = '46%';
		mio4[i].style.left = '2%';
		mio4[i].style.verticalAlign = "middle";
	}

	mio4vvv = document.getElementsByClassName('listamateriaprima');
	ala = mio4vvv.length;

	for (i = 0; i < ala; i++) {
		mio4vvv[i].style.position = 'fixed';
		mio4vvv[i].style.top = '15%';
		mio4vvv[i].style.height = '80%';
		mio4vvv[i].style.width = '90%';
		mio4vvv[i].style.left = '5%';
		mio4vvv[i].style.verticalAlign = "middle";
		mio4vvv[i].style.backgroundColor = "#F0F0F0";
		mio4vvv[i].style.display = "none";
	}

	mio4aa = document.getElementsByClassName('amiga1');
	ala = mio4aa.length;

	for (i = 0; i < ala; i++) {
		mio4aa[i].style.position = 'absolute';
		mio4aa[i].style.top = '1%';
		mio4aa[i].style.height = '50%';
		mio4aa[i].style.width = '25%';
		mio4aa[i].style.left = '25%';
		mio4aa[i].style.verticalAlign = "middle";
		mio4aa[i].style.font = "italic 8px";
		mio4aa[i].style.marginLeft = "auto";
		mio4aa[i].style.marginright = "auto";
		mio4aa[i].style.margintop = "auto";
	}

	mio5 = document.getElementsByClassName('resposta1');
	ala = mio5.length;

	for (i = 0; i < ala; i++) {
		mio5[i].style.position = 'absolute';
		mio5[i].style.top = '1%';
		mio5[i].style.height = '98%';
		mio5[i].style.width = '46%';
		mio5[i].style.left = '52%';
		mio5[i].style.verticalAlign = "middle";
	}

	mio6 = document.getElementsByClassName('a0');
	ala = mio6.length;

	for (i = 0; i < ala; i++) {
		mio6[i].style.position = 'absolute';
		mio6[i].style.top = '33%';
		mio6[i].style.height = '20%';

		mio6[i].style.left = '2%';
		mio6[i].style.verticalAlign = "middle";
	}

	mio7 = document.getElementsByClassName('a1');
	ala = mio7.length;

	for (i = 0; i < ala; i++) {
		mio7[i].style.position = 'absolute';
		mio7[i].style.top = '33%';
		mio7[i].style.height = '20%';

		mio7[i].style.left = '13%';
		mio7[i].style.verticalAlign = "middle";
	}

	mio8 = document.getElementsByClassName('a2');
	ala = mio8.length;

	for (i = 0; i < ala; i++) {
		mio8[i].style.position = 'absolute';
		mio8[i].style.top = '33%';
		mio8[i].style.height = '33%';

		mio8[i].style.left = '24%';
		mio8[i].style.verticalAlign = "middle";
	}

	mio80 = document.getElementsByClassName('a3');
	ala = mio80.length;

	for (i = 0; i < ala; i++) {
		mio80[i].style.position = 'absolute';
		mio80[i].style.top = '33%';
		mio80[i].style.height = '40%';
		mio80[i].style.width = '15%';

		mio80[i].style.left = '39%';
		mio80[i].style.verticalAlign = "middle";
	}

	mio9 = document.getElementsByClassName('a4');
	ala = mio9.length;

	for (i = 0; i < ala; i++) {
		mio9[i].style.position = 'absolute';
		mio9[i].style.top = '5%';
		mio9[i].style.height = '65px';
		mio9[i].style.left = '55%';
		mio9[i].style.width = '43%';
		mio9[i].style.verticalAlign = "middle";
		//mio9[i].style.overflowX = "scroll";
		mio9[i].style.scrollHeight = "15px";
		mio9[i].style.scrollWidth = "15px";
		mio9[i].style.paddings = "30px";
		mio9[i].style.align = "left";
	}

	mio9a = document.getElementsByClassName('a5');
	ala = mio9a.length;

	for (i = 0; i < ala; i++) {
		mio9a[i].style.position = 'absolute';
		mio9a[i].style.top = '20%';
		mio9a[i].style.height = '70%';

		mio9a[i].style.left = '78%';
		mio9a[i].style.width = '21%';
		mio9a[i].style.verticalAlign = "middle";
		mio9a[i].style.align = 'left';
	}

	mio9a1 = document.getElementsByClassName('a6');
	ala = mio9a1.length;

	for (i = 0; i < ala; i++) {
		mio9a1[i].style.position = 'inline';

		mio9a1[i].style.width = '165px';
		mio9a1[i].style.height = '35px';

	}

	mio10 = document.getElementsByClassName('resp1');
	ala = mio10.length;

	for (i = 0; i < ala; i++) {
		mio10[i].style.position = 'absolute';
		mio10[i].style.top = '50%';
		mio10[i].style.height = '20%';

		mio10[i].style.left = '2%';
		//mio10[i].style.width='%';

	}

	mio11 = document.getElementsByClassName('resp2');
	ala = mio11.length;

	for (i = 0; i < ala; i++) {
		mio11[i].style.position = 'absolute';
		mio11[i].style.top = '50%';
		mio11[i].style.height = '20%';

		mio11[i].style.left = '52%';
		//mio10[i].style.width='%';   	
	}


	mio12 = document.getElementsByClassName('res1');
	ala = mio12.length;

	for (i = 0; i < ala; i++) {
		mio12[i].style.position = 'absolute';
		mio12[i].style.top = '50%';
		mio12[i].style.height = '20%';

		mio12[i].style.left = '2%';
		//mio10[i].style.width='%';

	}

	mio13 = document.getElementsByClassName('res2');
	ala = mio13.length;

	for (i = 0; i < ala; i++) {
		mio13[i].style.position = 'absolute';
		mio13[i].style.top = '55%';
		mio13[i].style.height = '20%';

		mio13[i].style.left = '35%';
	}

	mio14 = document.getElementsByClassName('res3');
	ala = mio14.length;

	for (i = 0; i < ala; i++) {
		mio14[i].style.position = 'absolute';
		mio14[i].style.top = '50%';
		mio14[i].style.height = '20%';

		mio14[i].style.left = '70%';
	}

	mio14a = document.getElementsByClassName('res4');
	ala = mio14a.length;

	for (i = 0; i < ala; i++) {
		mio14a[i].style.position = 'absolute';
		mio14a[i].style.top = '10%';
		mio14a[i].style.height = '90%';

		mio14a[i].style.left = '95%';
	}

	mio15 = document.getElementsByClassName('minor');
	ala = mio15.length;

	for (i = 0; i < ala; i++) {
		mio15[i].style.position = 'absolute';
		mio15[i].style.top = '2%';
		//mio15[i].style.height='96%';

		mio15[i].style.left = '2%';
		mio15[i].style.width = '96%';
		mio15[i].style.verticalAlign = 'middle';
		mio15[i].style.border = 'none';
	}

	mio16 = document.getElementsByClassName('interior_imagem');
	ala = mio16.length;
	for (i = 0; i < ala; i++) {
		mio16[i].style.position = 'absolute';
		mio16[i].style.top = '60px';
		mio16[i].style.height = '550px';

		mio16[i].style.left = '2%';
		mio16[i].style.width = '60%';
		mio16[i].style.verticalAlign = 'middle';
		mio16[i].style.border = '1px';
	}

	mio17 = document.getElementsByClassName('ghi');
	ala = mio17.length;

	for (i = 0; i < ala; i++) {
		mio17[i].style.position = 'absolute';
		mio17[i].style.top = '30px';
		mio17[i].style.height = '490px';

		mio17[i].style.left = '2%';
		mio17[i].style.width = '96%';
		mio17[i].style.verticalAlign = 'middle';
		mio17[i].style.border = '1px cyan';
	}

	mio175 = document.getElementsByClassName('quadro');
	ala = mio175.length;

	for (i = 0; i < ala; i++) {
		mio175[i].style.position = 'absolute';
		mio175[i].style.top = '60px';
		mio175[i].style.height = '490px';

		mio175[i].style.left = '2%';
		mio175[i].style.width = '96%';
		mio175[i].style.verticalAlign = 'middle';
		mio175[i].style.border = '1px cyan';
	}


	//botão tipo file em anomalias
	mio18 = document.getElementsByClassName('ghii');
	ala = mio18.length;

	for (i = 0; i < ala; i++) {
		mio18[i].style.position = 'absolute';
		mio18[i].style.top = '615px';
		mio18[i].style.height = '30px';

		mio18[i].style.left = '2%';
		mio18[i].style.width = '96%';
		mio18[i].style.verticalAlign = 'middle';

	}

	//configura a div da primeira descrição
	mio19 = document.getElementsByClassName('ghiii');
	ala = mio19.length;

	for (i = 0; i < ala; i++) {
		mio19[i].style.position = 'absolute';
		mio19[i].style.top = '60px';
		mio19[i].style.height = '300px';

		mio19[i].style.left = '63%';
		mio19[i].style.width = '35%';
		mio19[i].style.verticalAlign = 'middle';
	}

	//configura a div da segunda descrição
	mio20 = document.getElementsByClassName('ghiiii');
	ala = mio20.length;

	for (i = 0; i < ala; i++) {
		mio20[i].style.position = 'absolute';
		mio20[i].style.top = '365px';
		mio20[i].style.height = '245px';

		mio20[i].style.left = '63%';
		mio20[i].style.width = '35%';
		mio20[i].style.verticalAlign = 'middle';
	}

	mio21 = document.getElementsByClassName('fog');
	ala = mio21.length;

	for (i = 0; i < ala; i++) {
		mio21[i].style.position = 'absolute';
		mio21[i].style.top = '35px';
		mio21[i].style.height = '210px';

		mio21[i].style.left = '0%';
		mio21[i].style.width = '100%';
		mio21[i].style.verticalAlign = 'middle';
	}

	mio22 = document.getElementsByClassName('fog1');
	ala = mio22.length;

	for (i = 0; i < ala; i++) {
		mio22[i].style.position = 'absolute';
		mio22[i].style.top = '35px';
		mio22[i].style.height = '265px';

		mio22[i].style.left = '0%';
		mio22[i].style.width = '100%';
		mio22[i].style.verticalAlign = 'middle';
	}
}

function isNumber(val) {
	//return typeof val === "number"
	val = parseInt(val);

	if (isNaN(val)) { return false } else { return val }
}

function configurar1(ggg) {
	alex = ""; //teste 1

	if (isNumber(ggg) != false) {
		for (i = 1; i < ggg; i++) {
			var jor = i + 1;
			alex += "<div class=linha1 border=1px><table class='minor'><tr><td align=center>Matéria prima nº " + jor + "</td></tr></table></div>";
			alex += "<div class=linha1><a class='pergunta'>Nome da Materia prima</a><input disabled type=text class='resposta' id='inja" + i + "'></div>";
			alex += "<div class=linha1><a class='pergunta'>Tempo real de injecção:</a><input disabled type=text class='resposta' id='injb" + i + "'></div>";
			alex += "<div class=linha1><a class='pergunta'>Numero de zonas na câmara</a><input disabled type=text class='resposta' id='injc" + i + "'></div>";
			alex += "<div class=linha1><table name=2linhas style='position:absolute; left:2%;width:96%; border:1px;'><tr><td rowspan=2>Temperatura dos camara:</td><td>Bico</td><td >zona 1</td><td >zona 2</td><td >zona 3</td><td >zona 4</td><td >zona 5</td><td >zona 6</td><td >zona 7</td><td >zona 8</td><td >zona 9</td><td >zona 10</td><td >zona 11</td><td >zona 12</td><tr><td width='7%'  ><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "moinho01'></td><td width='7%'  ><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "moinho02'></td><td width='7%'  ><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "moinho03'></td><td width='7%'  ><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "moinho04'></td><td width='7%'  ><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "moinho05'></td><td width='7%'  ><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "moinho06'></td><td width='7%'  ><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "moinho07'></td><td width='7%'  ><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "moinho08'></td><td width='7%'  ><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "moinho09'></td><td width='7%'  ><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "moinho10'></td><td width='7%'  ><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "moinho11'></td><td width='7%'  ><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "moinho12'></td><td width='7%'  ><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "moinho13'></td></table></div>";
			alex += "<div class=linha1><a class='pergunta'>Numero de zonas da primeira injecção</a><input disabled type=text class='resposta' id='injd" + i + "'></div>";
			alex += "<div class=linha1><table name=4linhas style='position: absolute; width: 96%; left:2%; '><tr><td></td><td style='7%'>Zona 1</td><td style='7%'>Zona 2</td><td style='7%'>Zona 3</td><td style='7%'>Zona 4</td><td style='7%'>Zona 5</td><td style='7%'>Zona 6</td><td style='7%'>Zona 7</td><td style='7%'>Zona 8</td><td style='7%'>Zona 9</td><td style='7%'>Zona 10</td><td style='7%'>Zona 11</td><td style='7%'>Zona 12</td></tr><tr><td>Velocidade</td><td><input disabled type=text style='position: relative; width: 100%' value='' id='carinho01-" + i + "'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='carinho02-" + i + "'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='carinho03-" + i + "'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='carinho04-" + i + "'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='carinho05-" + i + "'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='carinho06-" + i + "'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='carinho07-" + i + "'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='carinho08-" + i + "'></td><td><input disabled type=text style='position: relative; width: 100%' value=''id='carinho09-" + i + "'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='carinho10-" + i + "'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='carinho11-" + i + "'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='carinho12-" + i + "'></td></tr>	<tr><td>Pressão</td><td><input disabled type=text style='position: relative; width: 100%' value='' id='carinho13-" + i + "'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='carinho14-" + i + "'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='carinho15-" + i + "'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='carinho16-" + i + "'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='carinho17-" + i + "'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='carinho18-" + i + "'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='carinho19-" + i + "'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='carinho20-" + i + "'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='carinho21-" + i + "'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='carinho22-" + i + "'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='carinho23-" + i + "'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='carinho24-" + i + "'></td></tr>	<tr><td>Cota</td><td><input disabled type=text style='position: relative; width: 100%' value='' id='carinho25-" + i + "'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='carinho26-" + i + "'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='carinho27-" + i + "'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='carinho28-" + i + "'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='carinho29-" + i + "'></td><td><input disabled type=text style='position: relative; width: 100%' value=''  id='carinho30-" + i + "'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='carinho31-" + i + "'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='carinho32-" + i + "'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='carinho33-" + i + "'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='carinho34-" + i + "'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='carinho35-" + i + "'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='carinho36-" + i + "'></td></tr>	</table></div>";
			alex += "<div class=linha1><a class='pergunta'>Numero de zonas da segunda pressão</a><input disabled type=text class='resposta' id='inje" + i + "'></div>";
			alex += "<div class=linha1><table name=4linhas style='position: absolute; width: 96%; left:2%; '><tr><td></td><td style='7%'>Zona 1</td><td style='7%'>Zona 2</td><td style='7%'>Zona 3</td><td style='7%'>Zona 4</td><td style='7%'>Zona 5</td><td style='7%'>Zona 6</td><td style='7%'>Zona 7</td><td style='7%'>Zona 8</td><td style='7%'>Zona 9</td><td style='7%'>Zona 10</td><td style='7%'>Zona 11</td><td style='7%'>Zona 12</td></tr><tr><td>Velocidade</td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "carinho01'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "carinho02'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "carinho03'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "carinho04'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "carinho05'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "carinho06'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "carinho07'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "carinho08'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "carinho09'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "carinho10'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "carinho11'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "carinho12'></td></tr>	<tr><td>Pressão</td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "carinho13'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "carinho14'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "carinho15'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "carinho16'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "carinho17'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "carinho18'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "carinho19'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "carinho20'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "carinho21'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "carinho22'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "carinho23'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "carinho24'></td></tr>	<tr><td>Tempo</td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "carinho25'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "carinho26'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "carinho27'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "carinho28'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "carinho29'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "carinho30'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "carinho31'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "carinho32'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "carinho33'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "carinho34'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "carinho35'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "carinho36'></td></tr>	</table></div>";
			alex += "<div class=linha1><a class='pergunta'>Numero de zonas da segunda pressão</a><input disabled type=text class='resposta' id='injf" + i + "'></div>";
			alex += "<div class=linha1><table name=4linhas style='position: absolute; width: 96%; left:2%; '><tr><td></td><td style='7%'>Zona 1</td><td style='7%'>Zona 2</td><td style='7%'>Zona 3</td><td style='7%'>Zona 4</td><td style='7%'>Zona 5</td><td style='7%'>Zona 6</td><td style='7%'>Zona 7</td><td style='7%'>Zona 8</td><td style='7%'>Zona 9</td><td style='7%'>Zona 10</td><td style='7%'>Zona 11</td><td style='7%'>Zona 12</td></tr><tr><td>Velocidade</td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "cinho01'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "cinho02'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "cinho03'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "cinho04'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "cinho05'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "cinho06'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "cinho07'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "cinho08'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "cinho09'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "cinho10'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "cinho11'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "cinho12'></td></tr>	<tr><td>Pressão</td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "cinho13'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "cinho14'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "cinho15'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "cinho16'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "cinho17'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "cinho18'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "cinho19'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "cinho20'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "cinho21'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "cinho22'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "cinho23'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "cinho24'></td></tr>	<tr><td>Tempo</td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "cinho25'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "cinho26'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "cinho27'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "cinho28'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "cinho29'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "cinho30'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "cinho31'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "cinho32'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "cinho33'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "cinho34'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "cinho35'></td><td><input disabled type=text style='position: relative; width: 100%' value='' id='" + i + "cinho36'></td></tr>	</table></div>";
			alex += "<div class=linha1><a class='pergunta'>Dosagem</a><input disabled type=text class='resposta' id='injg" + i + "'></div>";
		}
	}
	//le_json_da_injecao(para006);
	if (oquefazer != -1) {
		corrigir_opcao(2, molde);
	}
}

function configurar(ggg, aaaa) {
	alex = "";


	if (isNumber(ggg) != false) {

		// Criar as várias matérias primas

		for (i = 1; i < ggg; i++) {
			var jor = i + 1;
			alex += "<div class=linha1 border=1px><table class='minor'><tr><td align=center>Matéria prima nº " + jor + "</td></tr></table></div>";
			alex += "<div class=linha1><a class='pergunta'>Nome da Materia prima</a><input type=text class='resposta' id='inja" + i + "'></div>";
			alex += "<div class=linha1><a class='pergunta'>Tempo real de injecção:</a><input type=text class='resposta' id='injb" + i + "'></div>";
			alex += "<div class=linha1><a class='pergunta'>Numero de zonas na câmara</a><input type=text class='resposta' id='injc" + i + "'></div>";
			alex += "<div class=linha1><table name=2linhas style='position:absolute; left:2%;width:96%; border:1px;'><tr><td rowspan=2>Temperatura dos camara:</td><td>Bico</td><td >zona 1</td><td >zona 2</td><td >zona 3</td><td >zona 4</td><td >zona 5</td><td >zona 6</td><td >zona 7</td><td >zona 8</td><td >zona 9</td><td >zona 10</td><td >zona 11</td><td >zona 12</td><tr><td width='7%'  ><input type=text style='position: relative; width: 100%' value='' id='" + i + "moinho01'></td><td width='7%'  ><input type=text style='position: relative; width: 100%' value='' id='" + i + "moinho02'></td><td width='7%'  ><input type=text style='position: relative; width: 100%' value='' id='" + i + "moinho03'></td><td width='7%'  ><input type=text style='position: relative; width: 100%' value='' id='" + i + "moinho04'></td><td width='7%'  ><input type=text style='position: relative; width: 100%' value='' id='" + i + "moinho05'></td><td width='7%'  ><input type=text style='position: relative; width: 100%' value='' id='" + i + "moinho06'></td><td width='7%'  ><input type=text style='position: relative; width: 100%' value='' id='" + i + "moinho07'></td><td width='7%'  ><input type=text style='position: relative; width: 100%' value='' id='" + i + "moinho08'></td><td width='7%'  ><input type=text style='position: relative; width: 100%' value='' id='" + i + "moinho09'></td><td width='7%'  ><input type=text style='position: relative; width: 100%' value='' id='" + i + "moinho10'></td><td width='7%'  ><input type=text style='position: relative; width: 100%' value='' id='" + i + "moinho11'></td><td width='7%'  ><input type=text style='position: relative; width: 100%' value='' id='" + i + "moinho12'></td><td width='7%'  ><input type=text style='position: relative; width: 100%' value='' id='" + i + "moinho13'></td></table></div>";
			alex += "<div class=linha1><a class='pergunta'>Numero de zonas da primeira injecção</a><input type=text class='resposta' id='injd" + i + "'></div>";
			alex += "<div class=linha1><table name=4linhas style='position: absolute; width: 96%; left:2%; '><tr><td></td><td style='7%'>Zona 1</td><td style='7%'>Zona 2</td><td style='7%'>Zona 3</td><td style='7%'>Zona 4</td><td style='7%'>Zona 5</td><td style='7%'>Zona 6</td><td style='7%'>Zona 7</td><td style='7%'>Zona 8</td><td style='7%'>Zona 9</td><td style='7%'>Zona 10</td><td style='7%'>Zona 11</td><td style='7%'>Zona 12</td></tr><tr><td>Velocidade</td><td><input type=text style='position: relative; width: 100%' value='' id='carinho01-" + i + "'></td><td><input type=text style='position: relative; width: 100%' value='' id='carinho02-" + i + "'></td><td><input type=text style='position: relative; width: 100%' value='' id='carinho03-" + i + "'></td><td><input type=text style='position: relative; width: 100%' value='' id='carinho04-" + i + "'></td><td><input type=text style='position: relative; width: 100%' value='' id='carinho05-" + i + "'></td><td><input type=text style='position: relative; width: 100%' value='' id='carinho06-" + i + "'></td><td><input type=text style='position: relative; width: 100%' value='' id='carinho07-" + i + "'></td><td><input type=text style='position: relative; width: 100%' value='' id='carinho08-" + i + "'></td><td><input type=text style='position: relative; width: 100%' value=''id='carinho09-" + i + "'></td><td><input type=text style='position: relative; width: 100%' value='' id='carinho10-" + i + "'></td><td><input type=text style='position: relative; width: 100%' value='' id='carinho11-" + i + "'></td><td><input type=text style='position: relative; width: 100%' value='' id='carinho12-" + i + "'></td></tr>	<tr><td>Pressão</td><td><input type=text style='position: relative; width: 100%' value='' id='carinho13-" + i + "'></td><td><input type=text style='position: relative; width: 100%' value='' id='carinho14-" + i + "'></td><td><input type=text style='position: relative; width: 100%' value='' id='carinho15-" + i + "'></td><td><input type=text style='position: relative; width: 100%' value='' id='carinho16-" + i + "'></td><td><input type=text style='position: relative; width: 100%' value='' id='carinho17-" + i + "'></td><td><input type=text style='position: relative; width: 100%' value='' id='carinho18-" + i + "'></td><td><input type=text style='position: relative; width: 100%' value='' id='carinho19-" + i + "'></td><td><input type=text style='position: relative; width: 100%' value='' id='carinho20-" + i + "'></td><td><input type=text style='position: relative; width: 100%' value='' id='carinho21-" + i + "'></td><td><input type=text style='position: relative; width: 100%' value='' id='carinho22-" + i + "'></td><td><input type=text style='position: relative; width: 100%' value='' id='carinho23-" + i + "'></td><td><input type=text style='position: relative; width: 100%' value='' id='carinho24-" + i + "'></td></tr>	<tr><td>Cota</td><td><input type=text style='position: relative; width: 100%' value='' id='carinho25-" + i + "'></td><td><input type=text style='position: relative; width: 100%' value='' id='carinho26-" + i + "'></td><td><input type=text style='position: relative; width: 100%' value='' id='carinho27-" + i + "'></td><td><input type=text style='position: relative; width: 100%' value='' id='carinho28-" + i + "'></td><td><input type=text style='position: relative; width: 100%' value='' id='carinho29-" + i + "'></td><td><input type=text style='position: relative; width: 100%' value=''  id='carinho30-" + i + "'></td><td><input type=text style='position: relative; width: 100%' value='' id='carinho31-" + i + "'></td><td><input type=text style='position: relative; width: 100%' value='' id='carinho32-" + i + "'></td><td><input type=text style='position: relative; width: 100%' value='' id='carinho33-" + i + "'></td><td><input type=text style='position: relative; width: 100%' value='' id='carinho34-" + i + "'></td><td><input type=text style='position: relative; width: 100%' value='' id='carinho35-" + i + "'></td><td><input type=text style='position: relative; width: 100%' value='' id='carinho36-" + i + "'></td></tr>	</table></div>";
			alex += "<div class=linha1><a class='pergunta'>Numero de zonas da segunda pressão</a><input type=text class='resposta' id='inje" + i + "'></div>";
			alex += "<div class=linha1><table name=4linhas style='position: absolute; width: 96%; left:2%; '><tr><td></td><td style='7%'>Zona 1</td><td style='7%'>Zona 2</td><td style='7%'>Zona 3</td><td style='7%'>Zona 4</td><td style='7%'>Zona 5</td><td style='7%'>Zona 6</td><td style='7%'>Zona 7</td><td style='7%'>Zona 8</td><td style='7%'>Zona 9</td><td style='7%'>Zona 10</td><td style='7%'>Zona 11</td><td style='7%'>Zona 12</td></tr><tr><td>Velocidade</td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "carinho01'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "carinho02'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "carinho03'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "carinho04'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "carinho05'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "carinho06'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "carinho07'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "carinho08'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "carinho09'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "carinho10'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "carinho11'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "carinho12'></td></tr>	<tr><td>Pressão</td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "carinho13'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "carinho14'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "carinho15'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "carinho16'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "carinho17'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "carinho18'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "carinho19'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "carinho20'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "carinho21'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "carinho22'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "carinho23'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "carinho24'></td></tr>	<tr><td>Tempo</td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "carinho25'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "carinho26'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "carinho27'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "carinho28'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "carinho29'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "carinho30'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "carinho31'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "carinho32'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "carinho33'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "carinho34'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "carinho35'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "carinho36'></td></tr>	</table></div>";
			alex += "<div class=linha1><a class='pergunta'>Numero de zonas da segunda pressão</a><input type=text class='resposta' id='injf" + i + "'></div>";
			alex += "<div class=linha1><table name=4linhas style='position: absolute; width: 96%; left:2%; '><tr><td></td><td style='7%'>Zona 1</td><td style='7%'>Zona 2</td><td style='7%'>Zona 3</td><td style='7%'>Zona 4</td><td style='7%'>Zona 5</td><td style='7%'>Zona 6</td><td style='7%'>Zona 7</td><td style='7%'>Zona 8</td><td style='7%'>Zona 9</td><td style='7%'>Zona 10</td><td style='7%'>Zona 11</td><td style='7%'>Zona 12</td></tr><tr><td>Velocidade</td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "cinho01'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "cinho02'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "cinho03'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "cinho04'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "cinho05'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "cinho06'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "cinho07'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "cinho08'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "cinho09'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "cinho10'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "cinho11'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "cinho12'></td></tr>	<tr><td>Pressão</td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "cinho13'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "cinho14'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "cinho15'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "cinho16'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "cinho17'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "cinho18'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "cinho19'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "cinho20'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "cinho21'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "cinho22'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "cinho23'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "cinho24'></td></tr>	<tr><td>Tempo</td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "cinho25'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "cinho26'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "cinho27'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "cinho28'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "cinho29'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "cinho30'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "cinho31'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "cinho32'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "cinho33'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "cinho34'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "cinho35'></td><td><input type=text style='position: relative; width: 100%' value='' id='" + i + "cinho36'></td></tr>	</table></div>";
			alex += "<div class=linha1><a class='pergunta'>Dosagem</a><input type=text class='resposta' id='injg" + i + "'></div>";
		}
	}

	if (aaaa == 1 && oquefazer != -1) {
		corrigir_opcao(2, molde);
	}
}

function lerdados() {
	ler_variaveis_do_servidor_2(molde);
}

function ler_variaveis_do_servidor_2(iii) {
	aaa = "?molde=" + iii;

	var url = 'json/ler_variaveis_do_ultimo_ensaio_json.php' + aaa;

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myFunctionsfdsagfhdsg(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function myFunctionsfdsagfhdsg(response) {
	var teste = JSON.parse(response);
	para001 = teste.dados[0].para001;

	para002 = teste.dados[0].para002;
	para003 = teste.dados[0].para003;

	para004 = teste.dados[0].para004;
	para005 = teste.dados[0].para005;
	para006 = teste.dados[0].para006;

	para007 = teste.dados[0].para007;
	para008 = teste.dados[0].para008;
	para009 = teste.dados[0].para009;
	para010 = teste.dados[0].para010;
	para011 = teste.dados[0].para011;
	para012 = teste.dados[0].para012;
	para013 = teste.dados[0].para013;
	para014 = teste.dados[0].para014;
	para015 = teste.dados[0].para015;
	para016 = teste.dados[0].para016;
	para017 = teste.dados[0].para017;
	para018 = teste.dados[0].para018;
	para019 = teste.dados[0].para019;

	corrigir_opcao(2, molde);

}

function numero_pecas(iii) {

	aaa = "?aaa=" + molde;
	var url = 'json/inserir_numero_de_pecas_json.php?ensaio=' + iii;

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myFunctionnumerodepecas(xmlhttp.responseText, iii);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

}

function myFunctionnumerodepecas(response, iii) {
	document.getElementById('corpo').innerHTML = response;

	document.getElementById('entrada').innerHTML = "Dados gerais do ensaio nº " + iii;

	setTimeout(muda1, 10);
	setTimeout(muda2, 10);
	setTimeout(muda3, 10);
	setTimeout(muda4, 10);
}

function imprimir_numero_de_injeccoes(iii) {
	window.open('../json/imprimir_numero_injeccoes_json.php?ensaio=' + iii, '_blank');
}

function gravar_numero_de_injeccoes(iii) {
	var form = new FormData();
	form.append('id_ensaio', iii);
	form.append('hora_inicio', document.getElementById('aa00').value);
	form.append('hora_fim', document.getElementById('aa01').value);
	form.append('quantidade', document.getElementById('aa02').value);
	form.append('consumo_total', document.getElementById('aa03').value);
	form.append('consumo_2', document.getElementById('aa031').value);
	form.append('consumo_3', document.getElementById('aa032').value);
	form.append('sucata', document.getElementById('aa04').value);
	form.append('imagem', quadro.toDataURL('image/jpeg'));
	form.append('imagem1', quadro1.toDataURL('image/jpeg'));
	form.append('imagem2', quadro2.toDataURL('image/jpeg'));
	form.append('imagem3', quadro3.toDataURL('image/jpeg'));

	var request = new XMLHttpRequest();
	request.open('post', 'json/gravar_numero_injeccoes_json.php');
	request.send(form);

	entrada();
}

function anomalias_do_molde(molde) {
	aaa = "?aaa=" + molde;
	var url = 'json/ler_anomalias_do_molde_json_2.php' + aaa;

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myFunctiomercas(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function myFunctiomercas(response) {
	var dados = JSON.parse(response);

	var tigh = dados.dados.length;

	opcao4an_vs2.splice(0, opcao4an_vs2.length);


	opcao4valor_vs2 = "";

	for (i = 0; i < tigh; i++) {


		switch (dados.dados[i].analise[0]) {

			case '1':
				var valur1 = " onchange='motes(" + dados.dados[i].id_molde + "," + dados.dados[i].ensaio + "," + dados.dados[i].id_item + ")' checked name='gender" + i + "'";
				var valur2 = " onchange='motes(" + dados.dados[i].id_molde + "," + dados.dados[i].ensaio + "," + dados.dados[i].id_item + ")' name='gender" + i + "'";
				var valur3 = " onchange='motes(" + dados.dados[i].id_molde + "," + dados.dados[i].ensaio + "," + dados.dados[i].id_item + ")' name='gender" + i + "'";
				break;
			case '2':
				var valur1 = " onchange='motes(" + dados.dados[i].id_molde + "," + dados.dados[i].ensaio + "," + dados.dados[i].id_item + ")' name='gender" + i + "'";
				var valur2 = " onchange='motes(" + dados.dados[i].id_molde + "," + dados.dados[i].ensaio + "," + dados.dados[i].id_item + ")' checked name='gender" + i + "'";
				var valur3 = " onchange='motes(" + dados.dados[i].id_molde + "," + dados.dados[i].ensaio + "," + dados.dados[i].id_item + ")' name='gender" + i + "'";
				break;
			default:
				var valur1 = " onchange='motes(" + dados.dados[i].id_molde + "," + dados.dados[i].ensaio + "," + dados.dados[i].id_item + ")' name='gender" + i + "'";
				var valur2 = " onchange='motes(" + dados.dados[i].id_molde + "," + dados.dados[i].ensaio + "," + dados.dados[i].id_item + ")' name='gender" + i + "'";
				var valur3 = " onchange='motes(" + dados.dados[i].id_molde + "," + dados.dados[i].ensaio + "," + dados.dados[i].id_item + ")' checked name='gender" + i + "'";
				break;
		}

		var mass = '"mass' + i + '"';
		//var masso2='id="m2a'+i+'">'+ maria + String.fromCharCode(13)+dados.dados[i].analise[1];
		var masso1 = dados.dados[i].caracterisca;
		var masso3 = 'id="para' + i + '" value="' + dados.dados[i].titulo + '" ';
		var img_src = ' src="' + dados.dados[i].imagem + '"';
		var mol = "";

		ruim_1.push("th"); // em trabalho

		if (!dados.dados[i].detalhe) {
			dados.dados[i].detalhe = "";
		}

		opcao4an_vs2.push("<div class=linha1><a class=pergunta name=12linhas>Descrição:</a><input type=text class='resposta' " + masso3 + " readonly><div class=interior_imagem><a class=pergunta>Imagem:</a><img class=ghi id=mass" + i + img_src + " style='border:1px solid #000000;'></div><div  class=nada></div><div class=ghiii><a class=pergunta name=1linhas>Descrição do problema:</a><textarea class=fog1  value=''  readonly>" + masso1 + "</textarea></div><div class=ghiiii><div  " + mol + " width=100%> <a>Resultado da verificação:</a><br><form><input type='radio' value='OK' " + valur1 + "> OK<br> <input type='radio'  value='NOK' " + valur2 + " > NOK<br><input type='radio'  value='Não verificado' " + valur3 + " > Não verificado<br></form><a>Comentários</a><br><textarea height=220px width=220px top=0 id='movidick" + dados.dados[i].id_item + "' onkeyup='motes(" + dados.dados[i].id_molde + "," + dados.dados[i].ensaio + "," + dados.dados[i].id_item + ")'>" + dados.dados[i].analise[1] + "</textarea></div></div></div>");

		//Aqui faz-se o registo das variáveis no servidor


		gravar_dados_correcao(dados.dados[i].id_molde, dados.dados[i].ensaio, dados.dados[i].id_item, dados.dados[i].analise[0], dados.dados[i].analise[1]);


	}

	opcao4valor_vs2 = "";

	opcao4an_vs2.forEach(function (item, index, array) {
		opcao4valor_vs2 += item;

	});
}

function gravar_dados_correcao(id_molde, ensaio, id_item, analise, detalhe) {

	if (!analise) {
		analise = -1;
	}

	if (!detalhe) {
		detalhe = "";
	}

	var form = new FormData();
	form.append('id_molde', id_molde);
	form.append('ensaio', ensaio);
	form.append('id_item', id_item);
	form.append('analise', analise);
	form.append('detalhe', detalhe);
	var request = new XMLHttpRequest();
	request.open('post', 'json/gravar_vista_de_anomalia_json.php');
	request.send(form);
}

function selecao_uuu(iuy) {
	var miau = 0;


	return miau;
}

function motes(molde, ensaio, indexi) {

	var alfa = 'movidick' + indexi;

	var something = document.getElementById(alfa).value; //valor da textarea a alterar

	alfa = 'gender' + indexi;

	var seleccaoo = myVerifica(alfa);

	gravar_dados_correcao(molde, ensaio, indexi, seleccaoo, something);
}



function resgisto_de_novo_ensaio(molde1) {
	alfa_lock = 0;
	oquefazer = 0;
	novo = 1;
	molde = molde1;
	corrigir_opcao(1, molde, 'novo');
}

function corrigir_opcao(opcao, molde1, registo) {

	xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			leitura_principal = muda_menu1(xmlhttp.responseText);
			maldita1(opcao, molde, registo);
		}
	}

	xmlhttp.open("GET", "json/menu_criar_editar_ensaio_json.php?molde=" + molde + "&opcao=" + oquefazer, true);

	xmlhttp.send();

}

// aqui passa o editar produção e criar nova produção//				
function maldita1(opcao, molde1, registo) {

	switch (opcao) {
		case 1:
			// esta opção cria uma nova produção //
			if (registo == 'editar') {
				lama = "?of=" + molde1 + "&opcao=" + 3 + "&edicao=" + registo;

				//alert(lama);
			} else {
				lama = "?molde=" + molde1;
				alfa_lock = 0;
			}

			var url = 'json/criar_nova_ordem_fabrico.php' + lama;

			var xmlhttp = new XMLHttpRequest();

			xmlhttp.onreadystatechange = function () {

				if (this.readyState == 4 && this.status == 200) {

					myFuncion_Criar_OF(xmlhttp.responseText);
				}
			}
			xmlhttp.open("GET", url, true);
			xmlhttp.send();

			document.getElementById('entrada').innerHTML = "Criar Ordem de fabrico";

			activo = 1;
			break;
		case 2:

			lama = "?of=" + molde1 + "&opcao=" + 3;

			var url = 'json/editar_parametros.php' + lama;

			var xmlhttp = new XMLHttpRequest();

			xmlhttp.onreadystatechange = function () {

				if (this.readyState == 4 && this.status == 200) {
					myFuncion_verificar_parametros(xmlhttp.responseText);
				}
			}
			xmlhttp.open("GET", url, true);
			xmlhttp.send();

			//document.getElementById('entrada').innerHTML="Setup - Parâmetros do produto  nº "+sonic02;
			activo = 2;
			break;
		case 3:

			// ao clicar no butão é necesssário deselecionar as outras opções

			lama = "?of=" + molde1 + "&opcao=" + 3;

			var url = 'json/editar_parametros_1.php' + lama;

			var xmlhttp = new XMLHttpRequest();

			xmlhttp.onreadystatechange = function () {

				if (this.readyState == 4 && this.status == 200) {
					myFuncion_verificar_parametros_1(xmlhttp.responseText);
				}
			}
			xmlhttp.open("GET", url, true);
			xmlhttp.send();

			//document.getElementById('entrada').innerHTML="Setup - Adicionar verificação do produto nº "+sonic02;
			activo = 3;
			break;
		case 4:
			// ao clicar no butão é necesssário deselecionar as outras opções

			lama = "?of=" + molde1 + "&opcao=" + 3 + "&indice=" + registo;


			var url = 'json/editar_parametros_2.php' + lama;

			var xmlhttp = new XMLHttpRequest();

			xmlhttp.onreadystatechange = function () {

				if (this.readyState == 4 && this.status == 200) {
					myFuncion_verificar_parametros_1(xmlhttp.responseText);
				}
			}
			xmlhttp.open("GET", url, true);
			xmlhttp.send();

			activo = 4;
			break;

		case 5:
			var xmlhttp = new XMLHttpRequest();
			var url = 'json/fotos_parametros_injeccao_json.php?of=' + molde1;


			xmlhttp.onreadystatechange = function () {

				if (this.readyState == 4 && this.status == 200) {
					myFuncion_verificar_parametros_2(xmlhttp.responseText);
				}
			}
			xmlhttp.open("GET", url, true);
			xmlhttp.send();

			break;
		case 6:
			// esta opção cria uma nova produção //
			if (registo == 'editar') {
				lama = "?of=" + molde1 + "&opcao=" + 3 + "&edicao=" + registo;

				//alert(lama);
			} else {
				lama = "?molde=" + molde1;
			}

			var url = 'json/criar_nova_producao.php' + lama;

			var xmlhttp = new XMLHttpRequest();

			xmlhttp.onreadystatechange = function () {

				if (this.readyState == 4 && this.status == 200) {
					myFuncion_verificar_dados_producao(xmlhttp.responseText);
				}
			}
			xmlhttp.open("GET", url, true);
			xmlhttp.send();

			activo = 1;
			break;

		default:
			alert('Algo está errado');
	}
	corrigir();
}

function myFuncion_verificar_parametros(response) {
	document.getElementById('corpo').innerHTML = leitura_principal + response;

	try {
		document.getElementsByName('id_selecao')[1].checked = 'true';
	} catch (err) { }

	corrigir();
}

function myFuncion_verificar_parametros_2(response) {
	document.getElementById('corpo').innerHTML = leitura_principal + response;
	//document.getElementsByName('id_selecao')[0].checked='false';

	try {
		document.getElementsByName('id_selecao')[3].checked = 'true';
	} catch (err) { }
	corrigir();
}


function myFuncion_verificar_parametros_1(response) {
	document.getElementById('corpo').innerHTML = leitura_principal + response;
	//document.getElementsByName('id_selecao')[0].checked='false';
	document.getElementsByName('id_selecao')[2].checked = 'true';
	corrigir();
}


function myFuncion_Editar_OF(response) {
	document.getElementById('corpo').innerHTML = response;

	document.getElementById('entrada').innerHTML = "Criar Ordem de fabrico";


	calcular_OF();
	corrigir();

	document.getElementById('corpo').scrollTop = valor_scroll;
}


function myFuncion_Criar_OF(response) {
	document.getElementById('corpo').innerHTML = leitura_principal + response;

	try {
		document.getElementsByName('id_selecao')[0].checked = 'true';
	} catch (err) { }

	document.getElementById('entrada').innerHTML = "Criar Ordem de fabrico";
	corrigir();
}

function myFuncion_verificar_dados_producao(response) {
	document.getElementById('corpo').innerHTML = leitura_principal + response;
	try {
		document.getElementsByName('id_selecao')[0].checked = 'true';
	} catch (err) { }//document.getElementById('entrada').innerHTML="Setup - Dados gerais do produto nº "+document.getElementById('dadosgersis2222').value;
	corrigir();
}

function auxliar_modular_1() {

	switch (novo) {
		case 1:
			document.getElementById('entrada').innerHTML = "rrrrr nº " + sonic02;
			break;
		case 2:
			document.getElementById('entrada').innerHTML = "Verificações de Setup do produto nº " + sonic02;
			break;
		case 3:
			document.getElementById('entrada').innerHTML = "Ver Setup do produto nº " + sonic02;
			break;
		case 4:
			document.getElementById('entrada').innerHTML = "Imprimir ensaio do molde nº " + sonic02;
			break;
		default:
			novo = 0;
			break;
	}

	try {
		if (document.getElementById('dadosgersis1').value != "") {
			sonic01 = document.getElementById('dadosgersis1').value;
		}
	} catch (err) { }

	try {
		document.getElementById('dadosgersis1').value = sonic01;
	} catch (err) { }

	try {
		if (document.getElementById('dadosgersis2').value != "") {
			sonic02 = document.getElementById('dadosgersis2').value;
		}
	} catch (err) { }

	try {
		document.getElementById('dadosgersis2').value = sonic02;
	} catch (err) { }

	try {
		if (document.getElementById('dadosgersis3').value != "") {
			sonic03 = document.getElementById('dadosgersis3').value;
		}
	} catch (err) { }

	try {
		document.getElementById('dadosgersis3').value = sonic03;
	} catch (err) { }

	try {
		if (document.getElementById('dadosgersis4').value != "") {
			sonic04 = document.getElementById('dadosgersis4').value;
		}
	} catch (err) { }

	try {
		document.getElementById('dadosgersis4').value = sonic04;
	} catch (err) { }

	try {
		if (document.getElementById('dadosgersis5').value != "") {
			sonic05 = document.getElementById('dadosgersis5').value;
		}
	} catch (err) { }

	try {
		document.getElementById('dadosgersis5').value = sonic05;
	} catch (err) { }

	try {
		if (document.getElementById('dadosgersis6').value != "") {
			sonic06 = document.getElementById('dadosgersis6').value;
		}
	} catch (err) { }

	try {
		document.getElementById('dadosgersis6').value = sonic06;
	} catch (err) { }

	try {
		if (document.getElementById('dadosgersis7').value != "") {
			sonic07 = document.getElementById('dadosgersis7').value;
		}
	} catch (err) { }

	try {
		document.getElementById('dadosgersis7').value = sonic07;
	} catch (err) { }

	try {
		if (document.getElementById('dadosgersis8').value != "") {
			sonic08 = document.getElementById('dadosgersis8').value;
		}
	} catch (err) { }

	try {
		document.getElementById('dadosgersis8').value = sonic08;
	} catch (err) { }

	try {
		if (document.getElementById('dadosgersis9').value != "") {
			sonic09 = document.getElementById('dadosgersis9').value;
		}
	} catch (err) { }

	try {
		document.getElementById('dadosgersis9').value = sonic09;
	} catch (err) { }

	try {
		if (document.getElementById('dadosgersis10').value != "") {
			sonic10 = document.getElementById('dadosgersis10').value;
		}
	} catch (err) { }

	try {
		document.getElementById('dadosgersis10').value = sonic10;
	} catch (err) { }

	try {
		if (document.getElementById('dadosgersis11').value != "") {
			sonic11 = document.getElementById('dadosgersis11').value;
		}
	} catch (err) { }

	try {
		document.getElementById('dadosgersis11').value = sonic11;
	} catch (err) { }

	try {
		if (document.getElementById('dadosgersis12').value != "") {
			sonic12 = document.getElementById('dadosgersis12').value;
		}
	} catch (err) { }

	try {
		document.getElementById('dadosgersis12').value = sonic12;
	} catch (err) { }


	//controla os dados parâmetros
	try {
		if (document.getElementById('dadosgersis13').value != "") {
			sonic13 = document.getElementById('dadosgersis13').value;
		}
	} catch (err) { }

	try {
		document.getElementById('dadosgersis13').value = sonic13;
	} catch (err) { }


	// controla em dados gerais 'comentários
	try {
		if (document.getElementById('dadosgersis15').value != "") {
			sonic15 = document.getElementById('dadosgersis15').value;
		}
	} catch (err) { }

	try {
		document.getElementById('dadosgersis15').value = sonic15;
	} catch (err) { }

	//controla a data inicio
	try {
		if (document.getElementById('dadosgersis16').value != "") {
			sonic16 = document.getElementById('dadosgersis16').value;
		}
	} catch (err) { }

	try {
		document.getElementById('dadosgersis16').value = sonic16;
	} catch (err) { }

	try {
		if (document.getElementById('dadosgersis17').value != "") {
			sonic17 = document.getElementById('dadosgersis17').value;
		}
	} catch (err) { }

	try {
		document.getElementById('dadosgersis17').value = sonic17;
	} catch (err) { }


	// controla em dados gerais 'o molde trabalhou em automático
	try {
		if (myVerifica('opera0')) {
			sonic14 = myVerifica('opera0');
		}
	} catch (err) { }

	try {
		myCheck('opera0', sonic14)
	} catch (err) { }


	//controla os dados gerais 'a peça encheu de forma equilibrada?
	try {
		if (myVerifica('opera1')) {
			sonic15 = myVerifica('opera1');
		}
	} catch (err) { }

	try {
		myCheck('opera1', sonic15)
	} catch (err) { }


	//controla em dados gerais 'molde trabalhou com referigeração?
	try {
		if (myVerifica('opera2')) {
			sonic16 = myVerifica('opera2');
		}
	} catch (err) { }

	try {
		myCheck('opera2', sonic16)
	} catch (err) { }


	// em teste 
	try {
		if (document.getElementById('para01').value != "") {
			para001 = document.getElementById('para01').value;
		}
	} catch (err) { }

	try {
		document.getElementById('para01').value = para001;
	} catch (err) { }

	try {
		if (document.getElementById('para02').value != "") {
			para002 = document.getElementById('para02').value;
		}
	} catch (err) { }

	try {
		document.getElementById('para02').value = para002;
	} catch (err) { }

	try {
		if (document.getElementById('para03').value != "") {

			para003 = document.getElementById('para03').value;

		}
	} catch (err) { }

	try {
		document.getElementById('para03').value = para003;
	} catch (err) { }

	try {
		if (document.getElementById('para04').value != "") {
			para004 = document.getElementById('para04').value;
		}
	} catch (err) { }

	try {
		document.getElementById('para04').value = para004;
	} catch (err) { }

	try {
		if (document.getElementById('para05').value != "") {
			para005 = document.getElementById('para05').value;
		}
	} catch (err) { }

	try {
		document.getElementById('para05').value = para005;
	} catch (err) { }

	try {
		if (document.getElementById('para07').value != "") {
			para007 = document.getElementById('para07').value;
		}
	} catch (err) { }

	try {
		document.getElementById('para07').value = para007;
	} catch (err) { }

	try {
		if (document.getElementById('para08').value != "") {
			para008 = document.getElementById('para08').value;
		}
	} catch (err) { }

	try {
		document.getElementById('para08').value = para008;
	} catch (err) { }

	try {
		if (document.getElementById('para09').value != "") {
			para009 = document.getElementById('para09').value;
		}
	} catch (err) { }

	try {
		document.getElementById('para09').value = para009;
	} catch (err) { }

	try {
		if (document.getElementById('para11').value != "") {
			para011 = document.getElementById('para11').value;
		}
	} catch (err) { }

	try {
		document.getElementById('para11').value = para011;
	} catch (err) { }

	try {
		if (document.getElementById('para12').value != "") {
			para012 = document.getElementById('para12').value;
		}

	} catch (err) { }

	try {
		document.getElementById('para12').value = para012;
	} catch (err) { }


	try {
		if (document.getElementById('para14').value != "") {
			para014 = document.getElementById('para14').value;
		}
	} catch (err) { }

	try {
		document.getElementById('para14').value = para014;
	} catch (err) { }

	try {
		if (document.getElementById('para15').value != "") {
			para015 = document.getElementById('para15').value;
		}
	} catch (err) { }

	try {
		document.getElementById('para15').value = para015;
	} catch (err) { }
}

function le_json_da_injecao(response) {
	try {
		var teste = JSON.parse(response);


		var tigh = teste.injeccao.length;

		for (i = 0; i < tigh; i++) {
			var ttt = "inja" + i;
			document.getElementById(ttt).value = teste.injeccao[i].inja;

			ttt = "injb" + i;
			document.getElementById(ttt).value = teste.injeccao[i].injb;

			ttt = "injc" + i;
			document.getElementById(ttt).value = teste.injeccao[i].injc;

			ttt = "injd" + i;
			document.getElementById(ttt).value = teste.injeccao[i].injd;

			ttt = "inje" + i;
			document.getElementById(ttt).value = teste.injeccao[i].inje;

			ttt = "injf" + i;
			document.getElementById(ttt).value = teste.injeccao[i].injf;

			ttt = "injg" + i;
			document.getElementById(ttt).value = teste.injeccao[i].injg;

			ttt = i + "moinho01";
			document.getElementById(ttt).value = teste.injeccao[i].moinho01;

			ttt = i + "moinho02";
			document.getElementById(ttt).value = teste.injeccao[i].moinho02;

			ttt = i + "moinho03";
			document.getElementById(ttt).value = teste.injeccao[i].moinho03;

			ttt = i + "moinho04";
			document.getElementById(ttt).value = teste.injeccao[i].moinho04;

			ttt = i + "moinho05";
			document.getElementById(ttt).value = teste.injeccao[i].moinho05;

			ttt = i + "moinho06";
			document.getElementById(ttt).value = teste.injeccao[i].moinho06;

			ttt = i + "moinho07";
			document.getElementById(ttt).value = teste.injeccao[i].moinho07;

			ttt = i + "moinho08";
			document.getElementById(ttt).value = teste.injeccao[i].moinho08;

			ttt = i + "moinho09";
			document.getElementById(ttt).value = teste.injeccao[i].moinho09;

			ttt = i + "moinho10";
			document.getElementById(ttt).value = teste.injeccao[i].moinho10;

			ttt = i + "moinho11";
			document.getElementById(ttt).value = teste.injeccao[i].moinho11;

			ttt = i + "moinho12";
			document.getElementById(ttt).value = teste.injeccao[i].moinho12;

			ttt = i + "moinho13";
			document.getElementById(ttt).value = teste.injeccao[i].moinho13;

			ttt = "carinho01-" + i;
			document.getElementById(ttt).value = teste.injeccao[i].carinho01;

			ttt = "carinho02-" + i;

			document.getElementById(ttt).value = teste.injeccao[i].carinho02;

			ttt = "carinho03-" + i;
			document.getElementById(ttt).value = teste.injeccao[i].carinho03;

			ttt = "carinho04-" + i;
			document.getElementById(ttt).value = teste.injeccao[i].carinho04;

			ttt = "carinho05-" + i;
			document.getElementById(ttt).value = teste.injeccao[i].carinho05;

			ttt = "carinho06-" + i;
			document.getElementById(ttt).value = teste.injeccao[i].carinho06;

			ttt = "carinho07-" + i;
			document.getElementById(ttt).value = teste.injeccao[i].carinho07;

			ttt = "carinho08-" + i;
			document.getElementById(ttt).value = teste.injeccao[i].carinho08;

			ttt = "carinho09-" + i;
			document.getElementById(ttt).value = teste.injeccao[i].carinho09;

			ttt = "carinho10-" + i;
			document.getElementById(ttt).value = teste.injeccao[i].carinho10;

			ttt = "carinho11-" + i;
			document.getElementById(ttt).value = teste.injeccao[i].carinho11;

			ttt = "carinho12-" + i;
			document.getElementById(ttt).value = teste.injeccao[i].carinho12;

			ttt = "carinho13-" + i;
			document.getElementById(ttt).value = teste.injeccao[i].carinho13;

			ttt = "carinho14-" + i;
			document.getElementById(ttt).value = teste.injeccao[i].carinho14;

			ttt = "carinho15-" + i;
			document.getElementById(ttt).value = teste.injeccao[i].carinho15;

			ttt = "carinho16-" + i;
			document.getElementById(ttt).value = teste.injeccao[i].carinho16;

			ttt = "carinho17-" + i;
			document.getElementById(ttt).value = teste.injeccao[i].carinho17;

			ttt = "carinho18-" + i;
			document.getElementById(ttt).value = teste.injeccao[i].carinho18;

			ttt = "carinho19-" + i;
			document.getElementById(ttt).value = teste.injeccao[i].carinho19;

			ttt = "carinho20-" + i;
			document.getElementById(ttt).value = teste.injeccao[i].carinho20;

			ttt = "carinho21-" + i;
			document.getElementById(ttt).value = teste.injeccao[i].carinho21;

			ttt = "carinho22-" + i;
			document.getElementById(ttt).value = teste.injeccao[i].carinho22;

			ttt = "carinho23-" + i;
			document.getElementById(ttt).value = teste.injeccao[i].carinho23;

			ttt = "carinho24-" + i;
			document.getElementById(ttt).value = teste.injeccao[i].carinho24;

			ttt = "carinho25-" + i;
			document.getElementById(ttt).value = teste.injeccao[i].carinho25;

			ttt = "carinho26-" + i;
			document.getElementById(ttt).value = teste.injeccao[i].carinho26;

			ttt = "carinho27-" + i;
			document.getElementById(ttt).value = teste.injeccao[i].carinho27;

			ttt = "carinho28-" + i;
			document.getElementById(ttt).value = teste.injeccao[i].carinho28;

			ttt = "carinho29-" + i;
			document.getElementById(ttt).value = teste.injeccao[i].carinho29;

			ttt = "carinho30-" + i;
			document.getElementById(ttt).value = teste.injeccao[i].carinho30;

			ttt = "carinho31-" + i;
			document.getElementById(ttt).value = teste.injeccao[i].carinho31;

			ttt = "carinho32-" + i;
			document.getElementById(ttt).value = teste.injeccao[i].carinho32;

			ttt = "carinho33-" + i;
			document.getElementById(ttt).value = teste.injeccao[i].carinho33;

			ttt = "carinho34-" + i;
			document.getElementById(ttt).value = teste.injeccao[i].carinho34;

			ttt = "carinho35-" + i;
			document.getElementById(ttt).value = teste.injeccao[i].carinho35;

			ttt = "carinho36-" + i;
			document.getElementById(ttt).value = teste.injeccao[i].carinho36;

			ttt = i + "carinho01";
			document.getElementById(ttt).value = teste.injeccao[i].carinho01a;

			ttt = i + "carinho02";
			document.getElementById(ttt).value = teste.injeccao[i].carinho02a;

			ttt = i + "carinho03";
			document.getElementById(ttt).value = teste.injeccao[i].carinho03a;

			ttt = i + "carinho04";
			document.getElementById(ttt).value = teste.injeccao[i].carinho04a;

			ttt = i + "carinho05";
			document.getElementById(ttt).value = teste.injeccao[i].carinho05a;

			ttt = i + "carinho06";
			document.getElementById(ttt).value = teste.injeccao[i].carinho06a;

			ttt = i + "carinho07";
			document.getElementById(ttt).value = teste.injeccao[i].carinho07a;

			ttt = i + "carinho08";
			document.getElementById(ttt).value = teste.injeccao[i].carinho08a;

			ttt = i + "carinho09";
			document.getElementById(ttt).value = teste.injeccao[i].carinho09a;

			ttt = i + "carinho10";
			document.getElementById(ttt).value = teste.injeccao[i].carinho10a;

			ttt = i + "carinho11";
			document.getElementById(ttt).value = teste.injeccao[i].carinho11a;

			ttt = i + "carinho12";
			document.getElementById(ttt).value = teste.injeccao[i].carinho12a;

			ttt = i + "carinho13";
			document.getElementById(ttt).value = teste.injeccao[i].carinho13a;

			ttt = i + "carinho14";
			document.getElementById(ttt).value = teste.injeccao[i].carinho14a;

			ttt = i + "carinho15";
			document.getElementById(ttt).value = teste.injeccao[i].carinho15a;

			ttt = i + "carinho16";
			document.getElementById(ttt).value = teste.injeccao[i].carinho16a;

			ttt = i + "carinho17";
			document.getElementById(ttt).value = teste.injeccao[i].carinho17a;

			ttt = i + "carinho18";
			document.getElementById(ttt).value = teste.injeccao[i].carinho18a;

			ttt = i + "carinho19";
			document.getElementById(ttt).value = teste.injeccao[i].carinho19a;

			ttt = i + "carinho20";
			document.getElementById(ttt).value = teste.injeccao[i].carinho20a;

			ttt = i + "carinho21";
			document.getElementById(ttt).value = teste.injeccao[i].carinho21a;

			ttt = i + "carinho22";
			document.getElementById(ttt).value = teste.injeccao[i].carinho22a;

			ttt = i + "carinho23";
			document.getElementById(ttt).value = teste.injeccao[i].carinho23a;

			ttt = i + "carinho24";
			document.getElementById(ttt).value = teste.injeccao[i].carinho24a;

			ttt = i + "carinho25";
			document.getElementById(ttt).value = teste.injeccao[i].carinho25a;

			ttt = i + "carinho26";
			document.getElementById(ttt).value = teste.injeccao[i].carinho26a;

			ttt = i + "carinho27";
			document.getElementById(ttt).value = teste.injeccao[i].carinho27a;

			ttt = i + "carinho28";
			document.getElementById(ttt).value = teste.injeccao[i].carinho28a;

			ttt = i + "carinho29";
			document.getElementById(ttt).value = teste.injeccao[i].carinho29a;

			ttt = i + "carinho30";
			document.getElementById(ttt).value = teste.injeccao[i].carinho30a;

			ttt = i + "carinho31";
			document.getElementById(ttt).value = teste.injeccao[i].carinho31a;

			ttt = i + "carinho32";
			document.getElementById(ttt).value = teste.injeccao[i].carinho32a;

			ttt = i + "carinho33";
			document.getElementById(ttt).value = teste.injeccao[i].carinho33a;

			ttt = i + "carinho34";
			document.getElementById(ttt).value = teste.injeccao[i].carinho34a;

			ttt = i + "carinho35";
			document.getElementById(ttt).value = teste.injeccao[i].carinho35a;

			ttt = i + "carinho36";
			document.getElementById(ttt).value = teste.injeccao[i].carinho36a;

			ttt = i + "cinho01";
			document.getElementById(ttt).value = teste.injeccao[i].cinho01a;

			ttt = i + "cinho02";
			document.getElementById(ttt).value = teste.injeccao[i].cinho02a;

			ttt = i + "cinho03";
			document.getElementById(ttt).value = teste.injeccao[i].cinho03a;

			ttt = i + "cinho04";
			document.getElementById(ttt).value = teste.injeccao[i].cinho04a;

			ttt = i + "cinho05";
			document.getElementById(ttt).value = teste.injeccao[i].cinho05a;

			ttt = i + "cinho06";
			document.getElementById(ttt).value = teste.injeccao[i].cinho06a;

			ttt = i + "cinho07";
			document.getElementById(ttt).value = teste.injeccao[i].cinho07a;

			ttt = i + "cinho08";
			document.getElementById(ttt).value = teste.injeccao[i].cinho08a;

			ttt = i + "cinho09";
			document.getElementById(ttt).value = teste.injeccao[i].cinho09a;

			ttt = i + "cinho10";
			document.getElementById(ttt).value = teste.injeccao[i].cinho10a;

			ttt = i + "cinho11";
			document.getElementById(ttt).value = teste.injeccao[i].cinho11a;

			ttt = i + "cinho12";
			document.getElementById(ttt).value = teste.injeccao[i].cinho12a;

			ttt = i + "cinho13";
			document.getElementById(ttt).value = teste.injeccao[i].cinho13a;

			ttt = i + "cinho14";
			document.getElementById(ttt).value = teste.injeccao[i].cinho14a;

			ttt = i + "cinho15";
			document.getElementById(ttt).value = teste.injeccao[i].cinho15a;

			ttt = i + "cinho16";
			document.getElementById(ttt).value = teste.injeccao[i].cinho16a;

			ttt = i + "cinho17";
			document.getElementById(ttt).value = teste.injeccao[i].cinho17a;

			ttt = i + "cinho18";
			document.getElementById(ttt).value = teste.injeccao[i].cinho18a;

			ttt = i + "cinho19";
			document.getElementById(ttt).value = teste.injeccao[i].cinho19a;

			ttt = i + "cinho20";
			document.getElementById(ttt).value = teste.injeccao[i].cinho20a;

			ttt = i + "cinho21";
			document.getElementById(ttt).value = teste.injeccao[i].cinho21a;

			ttt = i + "cinho22";
			document.getElementById(ttt).value = teste.injeccao[i].cinho22a;

			ttt = i + "cinho23";
			document.getElementById(ttt).value = teste.injeccao[i].cinho23a;

			ttt = i + "cinho24";
			document.getElementById(ttt).value = teste.injeccao[i].cinho24a;

			ttt = i + "cinho25";
			document.getElementById(ttt).value = teste.injeccao[i].cinho25a;

			ttt = i + "cinho26";
			document.getElementById(ttt).value = teste.injeccao[i].cinho26a;

			ttt = i + "cinho27";
			document.getElementById(ttt).value = teste.injeccao[i].cinho27a;

			ttt = i + "cinho28";
			document.getElementById(ttt).value = teste.injeccao[i].cinho28a;

			ttt = i + "cinho29";
			document.getElementById(ttt).value = teste.injeccao[i].cinho29a;

			ttt = i + "cinho30";
			document.getElementById(ttt).value = teste.injeccao[i].cinho30a;

			ttt = i + "cinho31";
			document.getElementById(ttt).value = teste.injeccao[i].cinho31a;

			ttt = i + "cinho32";
			document.getElementById(ttt).value = teste.injeccao[i].cinho32a;

			ttt = i + "cinho33";
			document.getElementById(ttt).value = teste.injeccao[i].cinho33a;

			ttt = i + "cinho34";
			document.getElementById(ttt).value = teste.injeccao[i].cinho34a;

			ttt = i + "cinho35";
			document.getElementById(ttt).value = teste.injeccao[i].cinho35a;

			ttt = i + "cinho36";
			document.getElementById(ttt).value = teste.injeccao[i].cinho36a;

		}

	} catch (err) { }

}

function le_json_da_squenciais(response) {
	try {
		var teste = JSON.parse(response);

		for (i = 1; i < 97; i++) {
			var j = i;
			if (i < 100) {
				j = "0" + i;
			}
			if (i < 10) {
				j = "00" + i;
			}
			var ttt = "calma" + j;
			document.getElementById(ttt).value = teste.sequenciais[i - 1].calma;
		}
	} catch (err) { }
}

function cria_json_squenciais() {
	try {
		var batra = '{"sequenciais":[';
		var ttt, j, i;

		for (i = 1; i < 97; i++) {
			j = i;

			if (i < 100) {
				j = "0" + i;
			}

			if (i < 10) {
				j = "00" + i;
			}

			batra += "{";
			ttt = "calma" + j;
			if (i < 96) {
				batra += '"calma":"' + document.getElementById(ttt).value + '"},';
			} else {
				batra += '"calma":"' + document.getElementById(ttt).value + '"}';
			}
		}
		batra += "]}";
		return batra;
	} catch (eer) { }
}

function le_json_da_canais_quentes(response) {
	try {
		var teste = JSON.parse(response);

		for (i = 1; i < 121; i++) {
			var j = i;
			if (i < 100) {
				j = "0" + i;
			}
			if (i < 10) {
				j = "00" + i;
			}
			var ttt = "calmar" + j;
			document.getElementById(ttt).value = teste.canal_quentes[i - 1].calmar;
		}
	} catch (err) { }
}

function cria_json_canais_quentes() {
	try {
		var batra = '{"canal_quentes":[';
		var ttt, j, i;

		for (i = 1; i < 121; i++) {
			j = i;
			if (i < 100) {
				j = "0" + i;
			}
			if (i < 10) {
				j = "00" + i;
			}
			batra += "{";
			ttt = "calmar" + j;
			if (i < 120) {
				batra += '"calmar":"' + document.getElementById(ttt).value + '"},';
			} else {
				batra += '"calmar":"' + document.getElementById(ttt).value + '"}';
			}
		}
		batra += "]}";
		return batra;
	} catch (eer) { }
}

function cria_json_injeccao() {
	try {
		var ggg = document.getElementById("para03").value;
		var vatra = '{"injeccao":[';
		var ttt, ttty, y, i, j;

		if (isNumber(ggg) != false) {

		} else {
			ggg = 1;
		}

		for (i = 0; i < ggg; i++) {
			vatra += "{";
			ttt = "inja" + i;
			vatra += '"inja":"' + document.getElementById(ttt).value + '",';
			ttt = "injb" + i;
			vatra += '"injb":"' + document.getElementById(ttt).value + '",';
			ttt = "injc" + i;
			vatra += '"injc":"' + document.getElementById(ttt).value + '",';
			ttt = "injd" + i;
			vatra += '"injd":"' + document.getElementById(ttt).value + '",';
			ttt = "inje" + i;
			vatra += '"inje":"' + document.getElementById(ttt).value + '",';
			ttt = "injf" + i;
			vatra += '"injf":"' + document.getElementById(ttt).value + '",';

			for (j = 1; j < 14; j++) {
				if (j < 10) {
					y = "0" + j;
				} else {
					y = j;
				}
				ttt = "moinho" + y;
				ttty = i + ttt;
				vatra += '"' + ttt + '":"' + document.getElementById(ttty).value + '",';
			}

			for (j = 1; j < 37; j++) {
				if (j < 10) {
					y = "0" + j;
				} else {
					y = j;
				}

				ttt = "carinho" + y;
				ttty = ttt + "-" + i;
				vatra += '"' + ttt + '":"' + document.getElementById(ttty).value + '",';
			}

			for (j = 1; j < 37; j++) {
				if (j < 10) {
					y = "0" + j;
				} else {
					y = j;
				}

				ttt = "carinho" + y;
				ttty = i + ttt;
				vatra += '"' + ttt + 'a":"' + document.getElementById(ttty).value + '",';
			}

			for (j = 1; j < 37; j++) {
				if (j < 10) {
					y = "0" + j;
				} else {
					y = j;
				}

				ttt = "cinho" + y;

				ttty = i + ttt;

				vatra += '"' + ttt + 'a":"' + document.getElementById(ttty).value + '",';
			}

			ttt = "injg" + i;
			vatra += '"injg":"' + document.getElementById(ttt).value + '"';

			if (i == ggg - 1) {
				vatra += "}";
			} else {
				vatra += "},";
			}
		}
		vatra += "]}";

		return vatra;
	} catch (eer) { }
}

// num butao radio verifica qual a opção selecionada mais um
function myVerifica(maria) {
	var x = document.getElementsByName(maria);
	var i;
	var op = -1;
	for (i = 0; i < x.length; i++) {
		if (x[i].checked == true) {
			op = i;
		}
	}

	return op + 1;
}


function myVerifica_1(maria) {
	var x = document.getElementsByName(maria);
	var i;
	var op = -1;
	for (i = 0; i < x.length; i++) {
		if (x[i].checked == true) {
			op = x[i].value;
		}
	}

	return op;
}

// faz cheched ao butão radio com indice manuel-1
function myCheck(maria, manuel) {
	var x = document.getElementsByName(maria);

	manuel = manuel - 1;

	try {
		x[manuel].checked = true;
	} catch (err) { }

}

//localizar uma palavra numa variável
function myLocalizacao(variavel, iola) {
	var str = variavel;
	var pos = str.search(iola);
	return pos;
}


function gravar_molde() {

	var a = document.getElementById('id_molde').value;
	var b = document.getElementById('designacao_peca').value;
	var c = document.getElementById('cliente').value;
	var d = document.getElementById('desenhador').value;
	var e = document.getElementById('fabricante').value;
	var f = document.getElementById('materia_prima').value;
	var f1 = document.getElementById('materia_prima1').value;
	var f2 = document.getElementById('materia_prima2').value;
	var g = document.getElementById('qnt_mp').value;
	var h = document.getElementById('especificacoes').value;
	var i = document.getElementById('observacoes').value;

	if (a != "" || b != "") {
		var url = 'json/gravar_novo_json.php?numero_molde=' + encodeURIComponent(a) + '&designacao_peca=' + encodeURIComponent(b) + '&cliente=' + encodeURIComponent(c) + '&desenhador=' + encodeURIComponent(d) + '&fabricante=' + encodeURIComponent(e) + '&materia_prima2=' + encodeURIComponent(f2) + '&materia_prima1=' + encodeURIComponent(f1) + '&materia_prima=' + encodeURIComponent(f) + '&qnt_mp=' + encodeURIComponent(g) + '&especificacoes=' + encodeURIComponent(h) + '&observacoes=' + encodeURIComponent(i);
		var xmlhttp = new XMLHttpRequest();

		xmlhttp.onreadystatechange = function () {

			if (this.readyState == 4 && this.status == 200) {
				myFunction2(xmlhttp.responseText);
			}
		}
		xmlhttp.open("GET", url, true);
		xmlhttp.send();
	} else {
		alert("Something is wrong");
	}
}

function myFunction2(response) {
	var str = response;

	document.getElementById('corpo').innerHTML = str;

	corrigir();
}

function recuperar_anomalias() {
	var gt = 0;
	opcao4an.forEach(function (item, index, array) {
		var masso2 = "m1a" + index;
		document.getElementById(masso2).value = dados1[index];
		var masso1 = "m2a" + index;
		document.getElementById(masso1).value = dados2[index];
		var masso3 = "imass" + index;
		document.getElementById(masso3).innerHTML = imagem1[index];

		var masso4 = "mass" + index;
		if (imagem1[index]) {
			document.getElementById(masso4).src = imagem1[index];

		}
		var masso5 = "para" + index;
		document.getElementById(masso5).value = dados3[index];

		gt++;
	});
}

function criar_nova_anomalia_ver() {

	var numero_elementos = opcao4an.length;

	var mass = '"mass' + numero_elementos + '"';
	var masso2 = 'id="m2a' + numero_elementos + '" onchange="moo2(' + numero_elementos + ')"';
	var masso1 = 'id="m1a' + numero_elementos + '" onchange="moo1(' + numero_elementos + ')"';
	var masso3 = 'id="para' + numero_elementos + '" onchange="moo3(' + numero_elementos + ')"';
	var masso4 = 'id="imass' + numero_elementos + '" onchange="moo4(' + numero_elementos + ')"';

	opcao4an.push("<div class=linha1><a class=pergunta name=12linhas>Descrição:</a><input type=text class='resposta' " + masso3 + "><div class=interior_imagem><a class=pergunta>Imagem:</a><img class=ghi id=mass" + numero_elementos + " style='border:1px solid #000000;'></div><input type=file class='ghii w3-btn w3-white w3-border w3-border-blue w3-round-large w3-text-black' onchange='openFile(event," + mass + ")'><div " + masso4 + " class=nada></div><div class=ghiii><a class=pergunta name=12linhas>Descrição:</a><textarea class=fog1 " + masso1 + " value=''  ></textarea></div><div class=ghiiii><a class=pergunta name=12linhas>Descrição:</a><textarea class=fog " + masso2 + " value=''></textarea></div></div>");


	dados1.push("");
	dados2.push("");
	dados3.push("");
	imagem1.push("");

	opcao4valor = "";

	opcao4an.forEach(function (item, index, array) {
		opcao4valor += item;
	});

	ver_comentar_ensaio(4, molde);
}

function criar_nova_anomalia() {
	var numero_elementos = opcao4an.length;

	var mass = '"mass' + numero_elementos + '"';
	var masso2 = 'id="m2a' + numero_elementos + '" onchange="moo2(' + numero_elementos + ')"';
	var masso1 = 'id="m1a' + numero_elementos + '" onchange="moo1(' + numero_elementos + ')"';
	var masso3 = 'id="para' + numero_elementos + '" onchange="moo3(' + numero_elementos + ')"';
	var masso4 = 'id="imass' + numero_elementos + '" onchange="moo4(' + numero_elementos + ')"';

	opcao4an.push("<div class=linha1><a class=pergunta name=12linhas>Descrição:</a><input type=text class='resposta' " + masso3 + "><div class=interior_imagem><a class=pergunta>Imagem:</a><img class=ghi id=mass" + numero_elementos + " style='border:1px solid #000000;'></div><input type=file class='ghii w3-btn w3-white w3-border w3-border-blue w3-round-large w3-text-black' onchange='openFile(event," + mass + ")'><div " + masso4 + " class=nada></div><div class=ghiii><a class=pergunta name=12linhas>Descrição:</a><textarea class=fog1 " + masso1 + " value=''  ></textarea></div><div class=ghiiii><a class=pergunta name=12linhas>Descrição:</a><textarea class=fog " + masso2 + " value=''></textarea></div></div>");
	dados1.push("");
	dados2.push("");
	dados3.push("");
	imagem1.push("");

	opcao4valor = "";

	opcao4an.forEach(function (item, index, array) {
		opcao4valor += item;
	});

	corrigir_opcao(5, molde);
}

function criar_nova_anomalia_2() {
	var numero_elementos = opcao4an.length;

	var mass = '"mass' + numero_elementos + '"';
	var masso2 = 'id="m2a' + numero_elementos + '" onchange="moo2(' + numero_elementos + ')"';
	var masso1 = 'id="m1a' + numero_elementos + '" onchange="moo1(' + numero_elementos + ')"';
	var masso3 = 'id="para' + numero_elementos + '" onchange="moo3(' + numero_elementos + ')"';
	var masso4 = 'id="imass' + numero_elementos + '" onchange="moo4(' + numero_elementos + ')"';

	opcao4an.push("<div class=linha1><a class=pergunta name=12linhas>Descrição:</a><input type=text class='resposta' " + masso3 + "><div class=interior_imagem><a class=pergunta>Imagem:</a><img class=ghi id=mass" + numero_elementos + " style='border:1px solid #000000;'></div><input type=file class='ghii w3-btn w3-white w3-border w3-border-blue w3-round-large w3-text-black' onchange='openFile(event," + mass + ")'><div " + masso4 + " class=nada></div><div class=ghiii><a class=pergunta name=12linhas>Descrição:</a><textarea class=fog1 " + masso1 + " value=''  ></textarea></div><div class=ghiiii><a class=pergunta name=12linhas>Descrição:</a><textarea class=fog " + masso2 + " value=''></textarea></div></div>");

	dados1.push(" ");
	dados2.push(" ");
	dados3.push(" ");
	imagem1.push("");

	opcao4valor = "";

	opcao4an.forEach(function (item, index, array) {
		opcao4valor += item;
	});

	corrigir_opcao(4, molde);
}

function moo1(idex) {
	var valor1 = "m1a" + idex;
	var valor2 = "imass" + idex;
	dados1[idex] = document.getElementById(valor1).value;

	moo4(idex);
}

function moo2(idex) {
	var valor1 = "m2a" + idex;
	var valor2 = "imass" + idex;
	dados2[idex] = document.getElementById(valor1).value;

	moo4(idex);
}

function moo3(idex) {
	var valor1 = "para" + idex;
	dados3[idex] = document.getElementById(valor1).value;
	moo4(idex);
}

function moo4(idex) {
	var valor1 = "imass" + idex;
	//imagem1[idex]= document.getElementById(valor1).innerHTML;
}

function Lista_de_molde_por_cliente(aaa) {

	aaa = decodeURI(aaa);

	limpar_todas_as_variaveis();
	var xmlhttp = new XMLHttpRequest();
	var url = 'json/Lista_moldes_por_cliente_json.php?cliente=' + encodeURI(aaa);

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			apresentar_lista_de_moldes_activos(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

	document.getElementById('entrada').innerHTML = "Lista de moldes do Cliente '" + aaa + "'";
}

function Lista_de_molde_em_curso(aaa) {
	//esta função também faz inactivos, para isso aaa=-1
	limpar_todas_as_variaveis();
	var xmlhttp = new XMLHttpRequest();
	var url = 'json/Lista_moldes_activos_json.php?aaa=' + aaa;
	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			apresentar_lista_de_moldes_activos(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

	if (aaa == 1) {
		document.getElementById('entrada').innerHTML = "Lista de produtos";
	} else {
		document.getElementById('entrada').innerHTML = "Lista de molde finalizados";
	}
}

function apresentar_lista_de_moldes_activos(response) {
	var str = response;
	document.getElementById('corpo').innerHTML = str;
	document.getElementById('corpo').scrollTop = 0;

	corrigir();
}

function limpar_todas_as_variaveis() {

	opcao4an.splice(0, opcao4an.length);
	//opcao4an_vs2.splice(0,opcao4an_vs2.length);
	dados1.splice(0, dados1.length);
	dados2.splice(0, dados2.length);
	dados3.splice(0, dados3.length);
	imagem1.splice(0, imagem1.length);

	opcao4valor = "";
	//opcao4valor_vs2="";

	sonic01 = "";
	sonic02 = "";
	sonic03 = "";
	sonic04 = "";
	sonic05 = "";
	sonic06 = "";
	sonic07 = "";
	sonic08 = "";
	sonic09 = "";
	sonic10 = "";
	sonic11 = "";
	sonic12 = "";
	sonic13 = "";
	sonic14 = "";
	sonic15 = "";
	sonic16 = "";
	sonic17 = "";

	para001 = "";
	para002 = "";
	para003 = "";
	para004 = "";
	para005 = "";
	para006 = "";
	para007 = "";
	para008 = "";
	para009 = "";
	para010 = "";
	para011 = "";
	para012 = "";
	para013 = "";
	para014 = "";
	para015 = "";
	para016 = "";
	para017 = "";
	para018 = "";
	para019 = "";

}

function alterar_molde(molde) {

	proteger();

	setTimeout(iniciar, 3000);

	var a = document.getElementById('id_molde').value;
	var b = document.getElementById('designacao_peca').value;
	var c = document.getElementById('cliente').value;
	var d = document.getElementById('desenhador').value;
	var e = document.getElementById('fabricante').value;
	var f = document.getElementById('materia_prima').value;
	var g = document.getElementById('qnt_mp').value;
	var h = document.getElementById('especificacoes').value;
	var i = document.getElementById('observacoes').value;
	if (document.getElementsByName('opera3')[0].checked == true) {
		j = 1;
	} else {
		j = -1;
	}

	var url = 'json/alterar_novo_json.php?activo=' + encodeURIComponent(j) + '&molde=' + encodeURIComponent(molde) + '&numero_molde=' + encodeURIComponent(a) + '&designacao_peca=' + encodeURIComponent(b) + '&cliente=' + encodeURIComponent(c) + '&desenhador=' + encodeURIComponent(d) + '&fabricante=' + encodeURIComponent(e) + '&materia_prima=' + encodeURIComponent(f) + '&qnt_mp=' + encodeURIComponent(g) + '&especificacoes=' + encodeURIComponent(h) + '&observacoes=' + encodeURIComponent(i);

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myFunction298(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function alterar_molde1(molde) {
	var form = new FormData();
	form.append('molde', molde);
	form.append('numero_molde', document.getElementById('id_molde').value);
	form.append('designacao_peca', document.getElementById('designacao_peca').value);
	form.append('cliente', document.getElementById('cliente').value);
	form.append('desenhador', document.getElementById('desenhador').value);
	form.append('cavidades', document.getElementById('cavidades').value);

	//
	form.append('referencias', document.getElementById('referencias').value);

	jurassic = myVerifica('jurassic');

	form.append('jurassic', jurassic);

	//

	peso_cavidades = "";

	peso_injeccao = '{"';

	cars = document.getElementsByName('paula77');

	for (; cars[i];) {
		if (cars[i].value == "") { cars[i].value = 'n.a.'; }
		if (i != 0) {
			peso_injeccao += '","';
		}
		peso_injeccao += i + '":"' + maisoumenos(cars[i].value);
		i++;
	}

	peso_injeccao += '"}';

	form.append('Peso_injecao', btoa(peso_injeccao));

	form.append('maquina_injeccao_1', document.getElementById('maquina_injeccao_1').value);
	form.append('maquina_injeccao_2', document.getElementById('maquina_injeccao_2').value);
	form.append('maquina_injeccao_3', document.getElementById('maquina_injeccao_3').value);
	form.append('maquina_injeccao_4', document.getElementById('maquina_injeccao_4').value);
	form.append('maquina_injeccao_5', document.getElementById('maquina_injeccao_5').value);

	form.append('materia_prima', document.getElementById('materia_prima').value);
	form.append('materia_prima_2', document.getElementById('materia_prima1').value);
	form.append('materia_prima_3', document.getElementById('materia_prima2').value);
	form.append('materia_prima_4', document.getElementById('materia_prima3').value);
	form.append('materia_prima_5', document.getElementById('materia_prima4').value);

	form.append('materia_prima_r1', document.getElementById('materia_prima_r1').value);
	form.append('materia_prima_2_r1', document.getElementById('materia_prima1_r1').value);
	form.append('materia_prima_3_r1', document.getElementById('materia_prima2_r1').value);
	form.append('materia_prima_4_r1', document.getElementById('materia_prima3_r1').value);
	form.append('materia_prima_5_r1', document.getElementById('materia_prima4_r1').value);

	form.append('componente_1', document.getElementById('componente1').value);
	form.append('componente_2', document.getElementById('componente2').value);
	form.append('componente_3', document.getElementById('componente3').value);

	form.append('componente_1_r1', document.getElementById('componente1_r1').value);
	form.append('componente_2_r1', document.getElementById('componente2_r1').value);
	form.append('componente_3_r1', document.getElementById('componente3_r1').value);

	form.append('componente_1_r11', document.getElementById('componente1_r11').value);
	form.append('componente_2_r11', document.getElementById('componente2_r11').value);
	form.append('componente_3_r11', document.getElementById('componente3_r11').value);

	//embalagem
	form.append('Embalagem_1', document.getElementById('Embalagem_1').value);
	form.append('Embalagem_2', document.getElementById('Embalagem_2').value);
	form.append('Embalagem_3', document.getElementById('Embalagem_3').value);
	form.append('Embalagem_4', document.getElementById('Embalagem_4').value);
	form.append('Embalagem_5', document.getElementById('Embalagem_5').value);

	form.append('Embalagem_1_1', document.getElementById('Embalagem_1_1').value);
	form.append('Embalagem_2_1', document.getElementById('Embalagem_2_1').value);
	form.append('Embalagem_3_1', document.getElementById('Embalagem_3_1').value);
	form.append('Embalagem_4_1', document.getElementById('Embalagem_4_1').value);
	form.append('Embalagem_5_1', document.getElementById('Embalagem_5_1').value);

	//embalagem
	form.append('Corante_1', document.getElementById('Corante_1').value);
	form.append('Corante_2', document.getElementById('Corante_2').value);
	form.append('Corante_3', document.getElementById('Corante_3').value);
	form.append('Corante_4', document.getElementById('Corante_4').value);
	form.append('Corante_5', document.getElementById('Corante_5').value);

	form.append('Corante_1_1', document.getElementById('Corante_1_1').value);
	form.append('Corante_2_1', document.getElementById('Corante_2_1').value);
	form.append('Corante_3_1', document.getElementById('Corante_3_1').value);
	form.append('Corante_4_1', document.getElementById('Corante_4_1').value);
	form.append('Corante_5_1', document.getElementById('Corante_5_1').value);

	form.append('tempo_ciclo_standar', document.getElementById('tempo_ciclo_standar').value);
	form.append('destino', document.getElementById('destino').value);
	form.append('ficha_produto', document.getElementById('numero_ficha_produto').value);

	//form.append('qnt_mp', document.getElementById('qnt_mp').value);
	form.append('observacoes', document.getElementById('observacoes').value);

	form.append('imagem', quadro.toDataURL('image/jpeg'));

	var request = new XMLHttpRequest();
	request.open('post', 'json/alterar_novo_1_json.php');
	request.send(form);

	document.getElementById('corpo').innerHTML = "Molde alterado com sucesso";
}

function myFunction298(response) {
	var str = response;

	document.getElementById('corpo').innerHTML = str;

	corrigir();
}

function gravar_ensaio_de_molde_1111() {

	proteger();


	auxliar_modular_1();

	if (activo == 2) {
		para010 = cria_json_canais_quentes();
		para006 = cria_json_injeccao();
		para013 = cria_json_squenciais();
	}

	var form = new FormData();
	form.append('id_molde', molde);

	form.append('sonic01', sonic01);
	form.append('sonic02', sonic02);
	form.append('sonic03', sonic03);
	form.append('sonic04', sonic04);
	form.append('sonic05', sonic05);
	form.append('sonic06', sonic06);
	form.append('sonic07', sonic07);
	form.append('sonic08', sonic08);
	form.append('sonic09', sonic09);

	form.append('sonic10', sonic10);
	form.append('sonic11', sonic11);
	form.append('sonic12', sonic12);

	//parâmetros
	form.append('sonic13', sonic13);
	form.append('sonic14', sonic14);
	form.append('sonic15', sonic15);
	form.append('sonic16', sonic16);
	form.append('sonic17', sonic17);

	form.append('para001', para001);
	form.append('para002', para002);
	form.append('para003', para003);
	form.append('para004', para004);
	form.append('para005', para005);
	form.append('para006', para006);
	form.append('para007', para007);
	form.append('para008', para008);
	form.append('para009', para009);

	form.append('para010', para010);
	form.append('para011', para011);
	form.append('para012', para012);
	form.append('para013', para013);
	form.append('para014', para014);
	form.append('para015', para015);
	form.append('para016', para016);
	form.append('para017', para017);
	form.append('para018', para018);
	form.append('para019', para019);

	var request = new XMLHttpRequest();
	request.open('post', 'json/gravar_novo_ensaio_json.php');
	request.send(form);

	document.getElementById('corpo').innerHTML = "Gravado com sucesso!!!";

}



function gravar_anomalias(id_registo) {
	var nitens = opcao4an.length;

	for (i = 1; i <= nitens; i++) {
		var a = dados1[i - 1];
		var b = dados2[i - 1];
		var c = dados3[i - 1];
		var d = imagem1[i - 1];
		var e = id_registo;
		gravar_anomalia_uma_a_um(a, b, c, d, e);
	}
	document.getElementById('corpo').innerHTML = "Esperar";
	limpar_todas_as_variaveis();
}

function gravar_anomalia_uma_a_um(a, b, c, d, e) {
	var form = new FormData();
	form.append('registo', e);
	form.append('texto1', a);
	form.append('texto2', b);
	form.append('texto3', c);
	form.append('imagem1', d);
	var request = new XMLHttpRequest();
	request.open('post', 'json/gravar_novo_ensaio_com_anomalias_json.php');
	request.send(form);
}

function lista_parametros(aaa) {

	limpar_todas_as_variaveis();

	aaa = "?aaa=" + aaa;
	var url = 'json/Lista_de_parametros_json.php' + aaa;

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myFunction_lista_parametros(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function myFunction_lista_parametros(response) {
	var str = response;
	document.getElementById('corpo').innerHTML = str;
	document.getElementById('entrada').innerHTML = "Lista de parâmetros";
}

function altera_of(aaa, o_f) {

	xxxxx = document.getElementById(aaa);

	alfa_lock = o_f;

	if (xxxxx.checked == true) {
		alterar_automatico_OF('activa', '0');

	} else {
		alterar_automatico_OF('activa', '1');
	}
}


function lista_ordem_fabrico(aaa, bbb) {
	limpar_todas_as_variaveis();

	if (bbb) {
		xxxxx = document.getElementById("swiss");

		if (xxxxx.checked == true) {
			bbb = "&bbb=nao";

		} else {
			bbb = "&bbb=sim";
		}
	}


	aaa = "?aaa=" + aaa;
	var url = 'json/Lista_de_ordem_de_fabrico_json.php' + aaa + bbb;

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myFunction_ordem_fabrico(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

}

function myFunction_ordem_fabrico(response) {
	var str = response;
	document.getElementById('corpo').innerHTML = str;
	document.getElementById('entrada').innerHTML = "Lista de ordem de fabrico";
}


function ver_relatorio(iii) {
	novo = 3;
	limpar_todas_as_variaveis();
	molde = iii;
	ver_comentar_ensaio(1, molde);  // lê menu do ver ensaio

	ler_variaveis_do_servidor(iii);
	ler_anomalias_do_servidor(iii); //anomalias do molde
	ler_anomalias_do_servidor_2(iii); //anomalias do ensaio
	ler_anomalias_do_molde(iii);
}

function gravar_sessao_de_molde(iii) {
	var form = new FormData();
	form.append('id_ensaio', iii);

	var request = new XMLHttpRequest();
	request.open('post', 'json/nova_sessao_id_ensaio.php');
	request.send(form);
}

//função ler os ensaios
function leitura_spa(opcao, molde) {

	xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			leitura_principal = muda_menu(xmlhttp.responseText);
			maldita(opcao, molde);
		}
	}

	xmlhttp.open("GET", "json/menu_ler_ensaios_menu.php?molde=" + molde, true);


	xmlhttp.send();

	return leitura_principal;
}

function muda_menu(response) {
	oquefazer = -1;
	return response;

}

function muda_menu1(response) {
	leitura_principal = response;
	return response;

}

//ver os ensaios
function ver_comentar_ensaio(opcao, molde1) {

	var numero_molde;

	leitura_principal = leitura_spa(opcao, molde1);
}

function maldita(opcao, molde1) {

	if (leitura_principal != "") {
		switch (opcao) {
			case 1:
				if (activo == 2) {
					para010 = cria_json_canais_quentes();
					para006 = cria_json_injeccao();
					para013 = cria_json_squenciais();
				}
				auxliar_modular_1();
				try {
					var comers = "nmolde" + molde1;
					var miupinho = "dadosgersis2";
					try {
						numero_molde = document.getElementById(comers).innerHTML;
					} catch (ee) { numero_molde = sonic02 }
				} catch (err) { };

				document.getElementById('corpo').innerHTML = leitura_principal + opcao1_vs2; // opção 1 é para mudar
				document.getElementById(miupinho).value = numero_molde;
				sonic02 = numero_molde;
				document.getElementsByName('id_selecao')[0].checked = 'true';
				auxliar_modular_1();
				activo = 1;
				break;
			case 2:
				auxliar_modular_1();

				configurar1(para003);

				document.getElementById('corpo').innerHTML = leitura_principal + opcao2_vs2 + opcao2_1_vs2 + alex + opcao2_2_vs2; // opção 2 é para mudar

				le_json_da_injecao(para006);
				le_json_da_canais_quentes(para010); //teste 1
				le_json_da_squenciais(para013);

				document.getElementsByName('id_selecao')[1].checked = 'true';
				auxliar_modular_1();
				activo = 2;
				break;
			case 3:
				if (activo == 2) {
					para010 = cria_json_canais_quentes();
					para006 = cria_json_injeccao();
					para013 = cria_json_squenciais();
				}
				auxliar_modular_1();
				document.getElementById('corpo').innerHTML = leitura_principal + opcao3_vs2; //o opção 3 é para mudar
				document.getElementsByName('id_selecao')[2].checked = 'true';
				auxliar_modular_1();
				alterar_simbolo();
				activo = 3;
				break;
			case 4:

				if (activo == 2) {
					para010 = cria_json_canais_quentes();
					para006 = cria_json_injeccao();
					para013 = cria_json_squenciais();
				}
				auxliar_modular_1();
				document.getElementById('corpo').innerHTML = leitura_principal + opcao4valor + opcao4a;
				recuperar_anomalias();
				document.getElementsByName('id_selecao')[4].checked = 'true';
				auxliar_modular_1();
				activo = 4;
				break;
			case 5:

				if (activo == 2) {
					para010 = cria_json_canais_quentes();
					para006 = cria_json_injeccao();
					para013 = cria_json_squenciais();
				}
				//auxliar_modular_1();
				document.getElementById('corpo').innerHTML = leitura_principal + opcao4valor_vs2 + opcao4a;
				//recuperar_anomalias_do_molde();
				document.getElementsByName('id_selecao')[3].checked = 'true';
				activo = 5;
				break;
			default:
				alert('Algo está errado');
		}
		leitura_principal = ""
		corrigir();
	}

}

function ler_variaveis_do_servidor(iii) {
	aaa = "?aaa=" + iii;

	var url = 'json/ler_variaveis_dos_ensaios_json.php' + aaa;

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myFunction29447418(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function myFunction29447418(response) {
	var teste = JSON.parse(response);
	var ensaio = teste.dados[0].id_ensaio;
	var id_molde = teste.dados[0].id_molde;
	var indice = teste.dados[0].indice;
	var data_ensaio = teste.dados[0].data_ensaio;

	para001 = teste.dados[0].para001;
	para002 = teste.dados[0].para002;
	para003 = teste.dados[0].para003;
	para004 = teste.dados[0].para004;
	para005 = teste.dados[0].para005;
	para006 = teste.dados[0].para006;

	para007 = teste.dados[0].para007;
	para008 = teste.dados[0].para008;
	para009 = teste.dados[0].para009;
	para010 = teste.dados[0].para010;

	para011 = teste.dados[0].para011;
	para012 = teste.dados[0].para012;
	para013 = teste.dados[0].para013;
	para014 = teste.dados[0].para014;
	para015 = teste.dados[0].para015;
	para016 = teste.dados[0].para016;
	para017 = teste.dados[0].para017;
	para018 = teste.dados[0].para018;
	para019 = teste.dados[0].para019;

	sonic01 = teste.dados[0].sonic01;
	sonic02 = teste.dados[0].sonic02;
	sonic03 = teste.dados[0].sonic03;
	sonic04 = teste.dados[0].sonic04;
	sonic05 = teste.dados[0].sonic05;
	sonic06 = teste.dados[0].sonic06;
	sonic07 = teste.dados[0].sonic07;
	sonic08 = teste.dados[0].sonic08;
	sonic09 = teste.dados[0].sonic09;
	sonic10 = teste.dados[0].sonic10;

	sonic11 = teste.dados[0].sonic11;
	sonic12 = teste.dados[0].sonic12;
	sonic13 = teste.dados[0].sonic13;  // parametros
	sonic14 = teste.dados[0].sonic14;
	sonic15 = teste.dados[0].sonic15;
	sonic16 = teste.dados[0].sonic16;
	sonic17 = teste.dados[0].sonic17;

	soni00 = teste.dados[0].soni00;
	soni01 = teste.dados[0].soni01;
	soni02 = teste.dados[0].soni02;
	soni03 = teste.dados[0].soni03;
	soni04 = teste.dados[0].soni04;
	soni05 = teste.dados[0].soni05;
	soni06 = teste.dados[0].soni06;
	soni07 = teste.dados[0].soni07;
	soni08 = teste.dados[0].soni08;
	soni09 = teste.dados[0].soni09;

	soni10 = teste.dados[0].soni10;
	soni11 = teste.dados[0].soni11;
	soni12 = teste.dados[0].soni12;
	soni13 = teste.dados[0].soni13;
	soni14 = teste.dados[0].soni14;
	soni15 = teste.dados[0].soni15;
	soni16 = teste.dados[0].soni16;
	soni17 = teste.dados[0].soni17;
	soni18 = teste.dados[0].soni18;
	soni19 = teste.dados[0].soni19;

	soni20 = teste.dados[0].soni20;
	soni21 = teste.dados[0].soni21;
	soni22 = teste.dados[0].soni22;
	soni23 = teste.dados[0].soni23;
	soni24 = teste.dados[0].soni24;
	soni25 = teste.dados[0].soni25;
	soni26 = teste.dados[0].soni26;
	soni27 = teste.dados[0].soni27;
	soni28 = teste.dados[0].soni28;
	soni29 = teste.dados[0].soni29;

	soni30 = teste.dados[0].soni30;
	soni31 = teste.dados[0].soni31;
	soni32 = teste.dados[0].soni32;
	soni33 = teste.dados[0].soni33;
	soni34 = teste.dados[0].soni34;
	soni35 = teste.dados[0].soni35;
	soni36 = teste.dados[0].soni36;
	soni37 = teste.dados[0].soni37;
	soni38 = teste.dados[0].soni38;
	soni39 = teste.dados[0].soni39;

	soni40 = teste.dados[0].soni40;
	soni41 = teste.dados[0].soni41;
	soni42 = teste.dados[0].soni42;
	soni43 = teste.dados[0].soni43;
	soni44 = teste.dados[0].soni44;
	soni45 = teste.dados[0].soni45;
	soni46 = teste.dados[0].soni46;
	soni47 = teste.dados[0].soni47;
	soni48 = teste.dados[0].soni48;
	soni49 = teste.dados[0].soni49;

	soni50 = teste.dados[0].soni50;
	soni51 = teste.dados[0].soni51;
	soni52 = teste.dados[0].soni52;
	soni53 = teste.dados[0].soni53;
	soni54 = teste.dados[0].soni54;
	soni55 = teste.dados[0].soni55;
	soni56 = teste.dados[0].soni56;
	soni57 = teste.dados[0].soni57;
	soni58 = teste.dados[0].soni58;
	soni59 = teste.dados[0].soni59;

	soni60 = teste.dados[0].soni60;
	soni61 = teste.dados[0].soni61;
	soni62 = teste.dados[0].soni62;
	soni63 = teste.dados[0].soni63;
	soni64 = teste.dados[0].soni64;
	soni65 = teste.dados[0].soni65;
	soni66 = teste.dados[0].soni66;
	soni67 = teste.dados[0].soni67;
	soni68 = teste.dados[0].soni68;
	soni69 = teste.dados[0].soni69;

	soni70 = teste.dados[0].soni70;
	soni71 = teste.dados[0].soni71;
	soni72 = teste.dados[0].soni72;
	soni73 = teste.dados[0].soni73;
	soni74 = teste.dados[0].soni74;
	soni75 = teste.dados[0].soni75;

	auxliar_modular_1();
}

function ler_anomalias_do_servidor_2(iii) {
	aaa = "?aaa=" + iii;
	var url = 'json/ler_variaveis_dos_ensaios_anomalias_json.php' + aaa;


	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myFunction29dd447418_2(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function myFunction29dd447418_2(response) {
	var teste = JSON.parse(response);

	var tigh = teste.dados.length;

	for (i = 0; i < tigh; i++) {

		var mass = '"mass' + i + '"';
		var masso2 = 'id="m2a' + i + '" onchange="moo2(' + i + ')"';
		var masso1 = 'id="m1a' + i + '" onchange="moo1(' + i + ')"';
		var masso3 = 'id="para' + i + '" onchange="moo3(' + i + ')"';
		var masso4 = 'id="imass' + i + '" onchange="moo4(' + i + ')"';

		opcao4an.push("<div class=linha1><a class=pergunta name=12linhas>Descrição:</a><input type=text class='resposta' " + masso3 + "><div class=interior_imagem><a class=pergunta>Imagem:</a><img class=ghi id=mass" + i + " style='border:1px solid #000000;'></div><input type=file class='ghii w3-btn w3-white w3-border w3-border-blue w3-round-large w3-text-black' onchange='openFile(event," + mass + ")'><div " + masso4 + " class=nada></div><div class=ghiii><a class=pergunta name=12linhas>Descrição:</a><textarea class=fog1 " + masso1 + " value=''  ></textarea></div><div class=ghiiii><a class=pergunta name=12linhas>Descrição:</a><textarea class=fog " + masso2 + " value=''></textarea></div></div>");

		dados3.push(teste.dados[i].designacao);
		dados1.push(teste.dados[i].descricao);
		dados2.push(teste.dados[i].correcao);
		imagem1.push(teste.dados[i].imagem);
	}

	opcao4valor = "";

	opcao4an.forEach(function (item, index, array) {
		opcao4valor += item;
	});

}

function ler_anomalias_do_servidor(iii) {
	aaa = "?aaa=" + iii;
	var url = 'json/ler_anomalias_do_molde_json_2.php' + aaa;

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myFunctionmaroscas(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function myFunctionmaroscas(response) {

	var dados = JSON.parse(response);

	var tigh = dados.dados.length;

	opcao4an_vs2.splice(0, opcao4an_vs2.length);
	opcao4valor_vs2 = "";

	for (i = 0; i < tigh; i++) {

		switch (dados.dados[i].analise[0]) {

			case '1':
				var maria = "OK";
				break;
			case '2':
				var maria = "NOK";
				break;
			default:
				var maria = "Não verificado";
				break;
		}

		var mass = '"mass' + i + '"';
		var masso2 = 'id="m2a' + i + '">' + maria + String.fromCharCode(13) + dados.dados[i].analise[1];
		var masso1 = dados.dados[i].caracterisca;
		var masso3 = 'id="para' + i + '" value="' + dados.dados[i].titulo + '" ';
		var img_src = ' src="' + dados.dados[i].imagem + '"';

		opcao4an_vs2.push("<div class=linha1><a class=pergunta name=12linhas>Descrição:</a><input type=text class='resposta' " + masso3 + " readonly><div class=interior_imagem><a class=pergunta>Imagem:</a><img class=ghi id=mass" + i + img_src + " style='border:1px solid #000000;'></div><div  class=nada></div><div class=ghiii><a class=pergunta name=12linhas>Descrição do problema:</a><textarea class=fog1  value=''  readonly>" + masso1 + "</textarea></div><div class=ghiiii><a class=pergunta name=12linhas>Resultado da verificação:</a><textarea class=fog  readonly " + masso2 + " </textarea></div></div>");

	}

	opcao4valor_vs2 = "";

	opcao4an_vs2.forEach(function (item, index, array) {
		opcao4valor_vs2 += item;


	});
}

function ler_anomalias_do_molde(iii) {
	aaa = "?aaa=" + iii;
	var url = 'json/ler_variaveis_dos_ensaios_anomalias_json.php' + aaa;

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myFunction29dd447418(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function myFunction29dd447418(response) {

	var teste = JSON.parse(response);

	var tigh = teste.dados.length;

	for (i = 0; i < tigh; i++) {
		var mass = '"mass' + i + '"';
		var masso2 = 'id="m2a' + i + '"';
		var masso1 = 'id="m1a' + i + '"';
		var masso3 = 'id="para' + i + '"';
		var masso4 = 'id="imass' + i + '"';

		opcao4an.push("<div class=linha1><a class=pergunta name=12linhas>Descrição:</a><input disabled type=text class='resposta' " + masso3 + "><div class=interior_imagem><a class=pergunta>Imagem:</a><img class=ghi id=mass" + i + " style='border:1px solid #000000;'></div><div " + masso4 + " class=nada></div><div class=ghiii><a class=pergunta name=12linhas>Descrição:</a><textarea class=fog1 " + masso1 + " value='' disabled ></textarea></div><div class=ghiiii><a class=pergunta name=12linhas>Descrição:</a><textarea class=fog " + masso2 + " value='' disabled ></textarea></div></div>");

		dados3.push(teste.dados[i].designacao);
		dados1.push(teste.dados[i].descricao);
		dados2.push(teste.dados[i].correcao);
		imagem1.push(teste.dados[i].imagem);
	}

	opcao4valor = "";

	opcao4an.forEach(function (item, index, array) {
		opcao4valor += item;
	});
}

function quadrado(id, valor, x, y, valor1, valor2) {
	id.setLineWidth(0.3);

	id.line(0 + x, 0 + y, 4 + x, 0 + y);
	id.line(4 + x, 0 + y, 4 + x, 4 + y);
	id.line(4 + x, 4 + y, 0 + x, 4 + y);
	id.line(0 + x, 4 + y, 0 + x, 0 + y);

	id.setLineWidth(0.8);
	if (valor == 1) {

		id.line(1 + x, 1 + y, 3 + x, 3 + y);
		id.line(1 + x, 3 + y, 3 + x, 1 + y);
		id.text(valor1, 10 + x, 3 + y);
	} else {
		id.text(valor2, 10 + x, 3 + y);
	}
	id.setLineWidth(0.3);
}

function quadrado1(id, valor, x, y, valor1, valor2) {
	id.setLineWidth(0.3);

	id.line(0 + x, 0 + y, 4 + x, 0 + y);
	id.line(4 + x, 0 + y, 4 + x, 4 + y);
	id.line(4 + x, 4 + y, 0 + x, 4 + y);
	id.line(0 + x, 4 + y, 0 + x, 0 + y);

	id.setLineWidth(0.8);
	if (valor == 1) {
		id.setDrawColor(0, 0, 0);
		id.line(1 + x, 1 + y, 3 + x, 3 + y);
		id.line(1 + x, 3 + y, 3 + x, 1 + y);
		id.text(valor1, 7 + x, 3 + y);
	} else {
		id.setDrawColor(255, 0, 0);
		id.line(1 + x, 1 + y, 3 + x, 3 + y);
		id.line(1 + x, 3 + y, 3 + x, 1 + y);
		id.setTextColor(255, 0, 0);
		id.text(valor2, 7 + x, 3 + y);
		id.setDrawColor(0, 0, 0);
		id.setTextColor(0, 0, 0);
	}
	id.setLineWidth(0.3);
}

function convertImageToCanvas(image) {
	var d = document.createElement('img');

	d.src = image.src;

	var c = document.getElementById('canvas');

	var ctx = c.getContext("2d");

	ctx.drawImage(d, 0, 0, 900, 600);

	image.src = ctx.toDataURL("image/png");
}

var openFile1 = function (event, guida) {
	var input = event.target;

	var residuo = guida.slice(4);

	var reader = new FileReader();
	reader.onload = function () {
		var dataURL = reader.result;

		var output = document.getElementById(guida);
		output.src = dataURL;

		var imgi = new Image();

		imgi.src = dataURL;

		imagem1[residuo] = output.src;
	};
	reader.readAsDataURL(input.files[0]);

	setTimeout(muda1, 100);
	setTimeout(muda2, 100);
	setTimeout(muda3, 100);
	setTimeout(muda4, 100);
};

function muda4() {

	var c = document.getElementById("quadro3");

	var ctx = c.getContext("2d");

	var output = document.getElementById('screama3');

	var comprimento = output.width;

	var altura = output.height;

	if (comprimento < altura) {
		ctx.beginPath();
		ctx.translate(0, 0);
		ctx.rotate(90 * Math.PI / 180);


		ctx.translate(0, -900);
		ctx.drawImage(output, 0, 0, 900, 600);
		ctx.rotate(-90 * Math.PI / 180);
		ctx.translate(-900, 0);

		ctx.translate(0, 0);

		ctx.stroke();
	} else {
		ctx.drawImage(output, 0, 0, 900, 600)
	}
}

function muda3() {

	var c = document.getElementById("quadro2");

	var ctx = c.getContext("2d");

	var output = document.getElementById('screama2');

	var comprimento = output.width;

	var altura = output.height;

	if (comprimento < altura) {
		ctx.beginPath();
		ctx.translate(0, 0);
		ctx.rotate(90 * Math.PI / 180);


		ctx.translate(0, -600);
		ctx.drawImage(output, 0, 0, 900, 600);
		ctx.rotate(-90 * Math.PI / 180);
		ctx.translate(-900, 0);

		ctx.translate(0, 0);

		ctx.stroke();
	} else {
		ctx.drawImage(output, 0, 0, 900, 600)
	}
}

function muda2() {

	var c = document.getElementById("quadro1");

	var ctx = c.getContext("2d");

	var output = document.getElementById('screama1');

	var comprimento = output.width;

	var altura = output.height;

	if (comprimento < altura) {
		ctx.beginPath();
		ctx.translate(0, 0);
		ctx.rotate(90 * Math.PI / 180);


		ctx.translate(0, -900);
		ctx.drawImage(output, 0, 0, 900, 600);
		ctx.rotate(-90 * Math.PI / 180);
		ctx.translate(-600, 0);

		ctx.translate(0, 0);

		ctx.stroke();
	} else {
		ctx.drawImage(output, 0, 0, 900, 600)
	}
}



function alterar_ensaio_de_molde(id_ensaio) {

	proteger();

	alarido('menu_principal');

	auxliar_modular_1();

	if (activo == 2) {
		para006 = cria_json_injeccao();

		para010 = cria_json_canais_quentes();

		para013 = cria_json_squenciais();
	}

	var form = new FormData();
	form.append('id_molde', molde);
	form.append('id_registo', id_ensaio);

	form.append('sonic01', sonic01);
	form.append('sonic02', sonic02);
	form.append('sonic03', sonic03);
	form.append('sonic04', sonic04);
	form.append('sonic05', sonic05);
	form.append('sonic06', sonic06);
	form.append('sonic07', sonic07);
	form.append('sonic08', sonic08);
	form.append('sonic09', sonic09);
	form.append('sonic10', sonic10);
	form.append('sonic11', sonic11);
	form.append('sonic12', sonic12);
	form.append('sonic13', sonic13);
	form.append('sonic14', sonic14);
	form.append('sonic15', sonic15);
	form.append('sonic16', sonic16);
	form.append('sonic17', sonic17);

	form.append('soni00', soni00);
	form.append('soni01', soni01);
	form.append('soni02', soni02);
	form.append('soni03', soni03);
	form.append('soni04', soni04);
	form.append('soni05', soni05);
	form.append('soni06', soni06);
	form.append('soni07', soni07);
	form.append('soni08', soni08);
	form.append('soni09', soni09);
	form.append('soni10', soni10);
	form.append('soni11', soni11);
	form.append('soni12', soni12);
	form.append('soni13', soni13);
	form.append('soni14', soni14);
	form.append('soni15', soni15);
	form.append('soni16', soni16);
	form.append('soni17', soni17);
	form.append('soni18', soni18);
	form.append('soni19', soni19);
	form.append('soni20', soni20);
	form.append('soni21', soni21);
	form.append('soni22', soni22);
	form.append('soni23', soni23);
	form.append('soni24', soni24);
	form.append('soni25', soni25);
	form.append('soni26', soni26);
	form.append('soni27', soni27);
	form.append('soni28', soni28);
	form.append('soni29', soni29);
	form.append('soni30', soni30);
	form.append('soni31', soni31);
	form.append('soni32', soni32);
	form.append('soni33', soni33);
	form.append('soni34', soni34);
	form.append('soni35', soni35);
	form.append('soni36', soni36);
	form.append('soni37', soni37);
	form.append('soni38', soni38);
	form.append('soni39', soni39);
	form.append('soni40', soni40);
	form.append('soni41', soni41);
	form.append('soni42', soni42);
	form.append('soni43', soni43);
	form.append('soni44', soni44);
	form.append('soni45', soni45);
	form.append('soni46', soni46);
	form.append('soni47', soni47);
	form.append('soni48', soni48);
	form.append('soni49', soni49);
	form.append('soni50', soni50);
	form.append('soni51', soni51);
	form.append('soni52', soni52);
	form.append('soni53', soni53);
	form.append('soni54', soni54);
	form.append('soni55', soni55);
	form.append('soni56', soni56);
	form.append('soni57', soni57);
	form.append('soni58', soni58);
	form.append('soni59', soni59);
	form.append('soni60', soni60);
	form.append('soni61', soni61);
	form.append('soni62', soni62);
	form.append('soni63', soni63);
	form.append('soni64', soni64);
	form.append('soni65', soni65);
	form.append('soni66', soni66);
	form.append('soni67', soni67);
	form.append('soni68', soni68);
	form.append('soni69', soni69);
	form.append('soni70', soni70);
	form.append('soni71', soni71);
	form.append('soni72', soni72);
	form.append('soni73', soni73);
	form.append('soni74', soni74);
	form.append('soni75', soni75);

	form.append('para001', para001);
	form.append('para002', para002);
	form.append('para003', para003);
	form.append('para004', para004);
	form.append('para005', para005);
	form.append('para006', para006);
	form.append('para007', para007);
	form.append('para008', para008);
	form.append('para009', para009);
	form.append('para010', para010);
	form.append('para011', para011);
	form.append('para012', para012);
	form.append('para013', para013);
	form.append('para014', para014);
	form.append('para015', para015);
	form.append('para016', para016);
	form.append('para017', para017);
	form.append('para018', para018);
	form.append('para019', para019);

	var request = new XMLHttpRequest();
	request.open('post', 'json/alterar_ensaio_json.php');
	request.send(form);

	document.getElementById('corpo').innerHTML = "Gravado com sucesso!!!";

	alterar_anomalias(id_ensaio);

	setTimeout(iniciar, 500);
}

function alterar_anomalias(id_registo) {
	//apagar todos os registo com indice id_registo
	var form1 = new FormData();
	form1.append('registo', id_registo);

	var request = new XMLHttpRequest();
	request.open('post', 'json/alterar_novo_ensaio_com_anomalias_json.php');
	request.send(form1);

	var nitens = opcao4an.length;

	for (i = 1; i <= nitens; i++) {
		var a = dados1[i - 1];
		var b = dados2[i - 1];
		var c = dados3[i - 1];
		var d = imagem1[i - 1];
		var e = id_registo;

		gravar_anomalia_uma_a_um(a, b, c, d, e);

		for (j = 1; j < 10000000; j++) {
			j = j;
		}
	}

	document.getElementById('corpo').innerHTML = "Gravado com sucesso";
}



function nova_pagina(pdf, sss) {

	pdf.setFont('arial');
	pdf.setFontType('normal');

	pdf.addImage(imgData, 'png', 20, 10, 60, 20);

	pdf.setLineWidth(0.5);
	pdf.line(20, 287, 200, 287);
	//pdf.line(20, 270, 200, 270);
	pdf.line(20, 287, 20, 30);
	pdf.line(200, 287, 200, 30);
	pdf.line(20, 30, 200, 30);

	pdf.setFontSize(16);
	pdf.setTextColor(143, 116, 90);
	pdf.text('Relatório de ensaio', 110, 26);
	pdf.setTextColor(0, 0, 0);

	pdf.setLineWidth(0.3);

	var lines13 = pdf.setFont('courier')
		.setFontSize(8)
		.setFontType('italic')
		.splitTextToSize("I4 PP1 - 1", 100)
	pdf.text(25, 290, lines13);

	pagina++;

	var lines13 = pdf.setFont('courier')
		.setFontSize(8)
		.setFontType('italic')
		.splitTextToSize("Pagina nº " + pagina, 100)
	pdf.text(179, 290, lines13);


	var lines13 = pdf.setFont('courier')
		.setFontSize(8)
		.setFontType('italic')
		.splitTextToSize("Página nº" + sss, 100)
	pdf.text(25, 290, lines13);

}

function imprimir_relatorio_geral(iii) {
	novo = 4;
	limpar_todas_as_variaveis();
	ler_variaveis_do_servidor(iii);
	ler_anomalias_do_servidor(iii);

	aaa = "?aaa=" + iii;
	var url = 'json/paginas_a_imprimir_json.php' + aaa;

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myFunction29741877(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function myFunction29741877(response) {
	var str = response;
	document.getElementById('corpo').innerHTML = str;
}

function alarido(rrr) {
	var allChildNodes = document.getElementById(rrr).getElementsByTagName('*');
	for (var i = 0; i < allChildNodes.length; i++) {
		//allChildNodes[i].onclick=return false;
	}
}

function iniciar() {
	var url = 'json/menu_iniciar_json.php';

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myFunctionsdsd29741dd877(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

}

function myFunctionsdsd29741dd877(response) {

	document.getElementById('menu_principal').innerHTML = response;

	entrada();
}

function proteger() {
	var url = 'json/menu_pausa_json.php';

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myFunctionsdsd2dsds9741dd877(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function myFunctionsdsd2dsds9741dd877(response) {

	document.getElementById('menu_principal').innerHTML = response;
}

function iniciar_sessao() {

	var url = 'json/iniciar_sessao_json.php';

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myFunctionsdsd741dd877(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function myFunctionsdsd741dd877(response) {
	var str = response;

	document.getElementById('corpo').innerHTML = str;
}

function Validar_login() {
	var user = document.getElementById('ab').value;
	var password1 = document.getElementById('cd').value;

	var form111 = new FormData();
	form111.append('user', user);
	form111.append('password', password1);

	var request = new XMLHttpRequest();
	request.open('post', 'json/validar_sessao_json.php');

	request.send(form111);

	setTimeout(function () { location.reload() }, 100);
}

function lista_utilizadores() {

	var url = 'json/Lista_utilizadores_json.php';

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myFunction29dff7418(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function myFunction29dff7418(response) {
	var str = response;
	document.getElementById('corpo').innerHTML = str;
}

function criar_nova_conta() {

	var url = 'json/criar_novo_utilizadore_json.php';

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myFunction29dfdddf7418(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function myFunction29dfdddf7418(response) {
	var str = response;
	document.getElementById('corpo').innerHTML = str;
}

//////////////////////////////////////////
function mapa_1_1(data) {
	var url = 'json/imprimir_etiquetas_diario.php?data=' + data;

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myEntrada_1(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function myEntrada_1_1(cromium) {
	document.getElementById('entrada').innerHTML = "Etiquetas";
	document.getElementById('corpo').innerHTML = cromium;

	try {
		document.getElementById('corpo_baixo').scrollTop = valor_scroll;
	}
	catch (err) {

	}

	if (boneco1 != "") {
		document.location = boneco1;
		boneco1 = "";
	}
}

/////////////////////////////////////////   


function mapa_1(data) {
	var url = 'json/calendario_diario.php?data=' + data;

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myEntrada_1(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function myEntrada_1(cromium) {
	document.getElementById('entrada').innerHTML = "Mapa Diário";


	try {
		document.getElementById('corpo_baixo').scrollTop = valor_scroll;
	}
	catch (err) {

	}

	if (boneco1 != "") {
		document.location = boneco1;
		boneco1 = "";
	}

	document.getElementById('corpo').innerHTML = cromium;
}

function mapa(data) {
	var url = 'json/calendario.php?data=' + data;

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myEntrada(xmlhttp.responseText, data);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function Diario() {
	var url = 'json/calendario_diario.php';

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myDiarioEntrada(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function myDiarioEntrada(cromium) {


	document.getElementById('corpo').innerHTML = cromium;
}



function entrada() {
	var url = 'json/calendario.php';

	var xmlhttp = new XMLHttpRequest();

	data = "";

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myEntrada(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function myEntrada(cromium) {
	document.getElementById('entrada').innerHTML = "Mapa Semanal";
	document.getElementById('corpo').innerHTML = cromium;
}

function editar_utilizador(iii) {

	var aaa = '?user=' + iii;

	var url = 'json/editar_utilizadore_json.php' + aaa;

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myFunctionfffdf7418(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function myFunctionfffdf7418(response) {
	var str = response;
	document.getElementById('corpo').innerHTML = str;
}

function privilegios_utilizador(iii) {
	var aaa = '?user=' + iii;

	var url = 'json/privilegios_user_json.php' + aaa;

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myFunctionfffdf7418(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function gravar_usuario() {
	var form1 = new FormData();
	form1.append('user', document.getElementById("ab").value);
	form1.append('password', document.getElementById("cd").value);
	form1.append('observacoes', document.getElementById("ef").value);

	var request = new XMLHttpRequest();
	request.open('post', 'json/guardar_novo_usuario_json.php');
	request.send(form1);

	criar_nova_conta();
}

function Alterar_usuario(iii) {
	var form1 = new FormData();
	form1.append('id', iii);
	form1.append('user', document.getElementById("ab").value);
	form1.append('observacoes', document.getElementById("cd").value);

	var request = new XMLHttpRequest();
	request.open('post', 'json/guardar_alteracoes_usuario_json.php');
	request.send(form1);

	lista_utilizadores();
}

function documentos(iii) {
	var aaa = '?molde=' + iii;

	var url = 'json/documentos_json.php' + aaa;

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myFunctsdsdsd(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

	document.getElementById('entrada').innerHTML = "Documentos do molde nº. " + iii;
}

function myFunctsdsdsd(response) {
	var str = response;
	document.getElementById('corpo').innerHTML = str;
}

var dt_documento;
var tipo_documento;
var nome_documento;

var openFile_documento = function (event) {
	var input = event.target;

	var reader = new FileReader();

	reader.onload = function () {
		dt_documento = reader.result;
	};

	reader.readAsDataURL(input.files[0]);

	tipo_documento = input.files[0].type;

	nome_documento = input.files[0].name;
};

function gravar_documento(iii) {
	proteger();
	if (dt_documento != "") {
		var form2 = new FormData();
		form2.append('documento', dt_documento);
		form2.append('molde', iii);
		form2.append('descricao', document.getElementById("txt_doc").value);
		form2.append('nome_documento', nome_documento);

		var request = new XMLHttpRequest();
		request.open('post', 'json/guardar_novo_documento_json.php');
		request.send(form2);

		setTimeout(function () { iniciar(); documentos(iii); }, 3000);
	}
}

function downloadURI(uri, name) {
	var link = document.createElement("a");
	link.download = name;
	link.href = uri;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	delete link;
}

function download_ficheiro(xxx, yyy) {
	var micose = "?molde=" + xxx + "&indice=" + yyy;

	var url = 'json/fazer_download_de_ficheiro_json.php' + micose;

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myFunctionfdsfsfde7418(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function myFunctionfdsfsfde7418(response) {
	var teste2 = JSON.parse(response);

	var nome_documento = teste2.dados[0].nome_ficheiro;
	var ficheiro = teste2.dados[0].ficheiro;

	downloadURI(ficheiro, nome_documento);
}

//grava as anomalias do molde //works


function bigImg(x) {
	x.style.transform = "scale(6, 6)";
	x.style.zIndex = "1";
}

function normalImg(x) {
	x.style.transform = "scale(1, 1)";
	x.style.zIndex = "0";
}

var openFile = function (event, guida) {
	var input = event.target;

	var reader = new FileReader();
	reader.onload = function () {
		var dataURL = reader.result;


		var output = document.getElementById(guida);
		output.src = dataURL;

		var imgi = new Image();

		imgi.src = dataURL;

	};
	reader.readAsDataURL(input.files[0]);

	guida1 = '"' + guida + '"';

	setTimeout(muda11, 100);

};

function muda11() {

	var output = document.getElementsByClassName('ghi');

	maxim = output.length;

	var c = document.getElementsByClassName('quadro');

	for (maximo = 0; maximo < maxim; maximo++) {


		var ctx = c[maximo].getContext("2d");

		var comprimento = output[maximo].width;

		var altura = output[maximo].height;


		if (comprimento < altura) {
			ctx.beginPath();
			ctx.translate(0, 0);
			ctx.rotate(90 * Math.PI / 180);


			ctx.translate(0, -900);
			ctx.drawImage(output[maximo], 0, 0, 900, 600);
			ctx.rotate(-90 * Math.PI / 180);
			ctx.translate(-900, 0);

			ctx.translate(0, 0);

			ctx.stroke();

		} else {
			ctx.drawImage(output[maximo], 0, 0, 900, 600)
		}

		imagem1[maximo] = c[maximo].toDataURL('image/jpeg')

	}
}



function alterar_simbolo() {

	if (myVerifica('oper00')) {
		document.getElementsByName('img99')[0].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper01')) {
		document.getElementsByName('img99')[1].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper02')) {
		document.getElementsByName('img99')[2].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper03')) {
		document.getElementsByName('img99')[3].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper04')) {
		document.getElementsByName('img99')[4].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper05')) {
		document.getElementsByName('img99')[5].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper06')) {
		document.getElementsByName('img99')[6].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper07')) {
		document.getElementsByName('img99')[7].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper08')) {
		document.getElementsByName('img99')[8].src = 'img/selecaosim.png';
	}


	if (myVerifica('oper75')) {
		document.getElementsByName('img99')[9].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper09')) {
		document.getElementsByName('img99')[10].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper10')) {
		document.getElementsByName('img99')[11].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper11')) {
		document.getElementsByName('img99')[12].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper12')) {
		document.getElementsByName('img99')[13].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper13')) {
		document.getElementsByName('img99')[14].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper14')) {
		document.getElementsByName('img99')[15].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper15')) {
		document.getElementsByName('img99')[16].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper16')) {
		document.getElementsByName('img99')[17].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper17')) {
		document.getElementsByName('img99')[18].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper18')) {
		document.getElementsByName('img99')[19].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper19')) {
		document.getElementsByName('img99')[20].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper20')) {
		document.getElementsByName('img99')[21].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper21')) {
		document.getElementsByName('img99')[22].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper22')) {
		document.getElementsByName('img99')[23].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper23')) {
		document.getElementsByName('img99')[24].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper24')) {
		document.getElementsByName('img99')[25].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper25')) {
		document.getElementsByName('img99')[26].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper26')) {
		document.getElementsByName('img99')[27].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper27')) {
		document.getElementsByName('img99')[28].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper28')) {
		document.getElementsByName('img99')[29].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper29')) {
		document.getElementsByName('img99')[30].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper30')) {
		document.getElementsByName('img99')[31].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper31')) {
		document.getElementsByName('img99')[32].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper32')) {
		document.getElementsByName('img99')[33].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper33')) {
		document.getElementsByName('img99')[34].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper34')) {
		document.getElementsByName('img99')[35].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper35')) {
		document.getElementsByName('img99')[36].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper36')) {
		document.getElementsByName('img99')[37].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper37')) {
		document.getElementsByName('img99')[38].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper38')) {
		document.getElementsByName('img99')[39].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper39')) {
		document.getElementsByName('img99')[40].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper40')) {
		document.getElementsByName('img99')[41].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper41')) {
		document.getElementsByName('img99')[42].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper42')) {
		document.getElementsByName('img99')[43].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper43')) {
		document.getElementsByName('img99')[44].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper44')) {
		document.getElementsByName('img99')[45].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper45')) {
		document.getElementsByName('img99')[46].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper46')) {
		document.getElementsByName('img99')[47].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper47')) {
		document.getElementsByName('img99')[48].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper48')) {
		document.getElementsByName('img99')[49].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper49')) {
		document.getElementsByName('img99')[50].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper50')) {
		document.getElementsByName('img99')[51].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper51')) {
		document.getElementsByName('img99')[52].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper52')) {
		document.getElementsByName('img99')[53].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper53')) {
		document.getElementsByName('img99')[54].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper54')) {
		document.getElementsByName('img99')[55].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper55')) {
		document.getElementsByName('img99')[56].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper56')) {
		document.getElementsByName('img99')[57].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper57')) {
		document.getElementsByName('img99')[58].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper58')) {
		document.getElementsByName('img99')[59].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper59')) {
		document.getElementsByName('img99')[60].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper60')) {
		document.getElementsByName('img99')[61].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper61')) {
		document.getElementsByName('img99')[62].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper62')) {
		document.getElementsByName('img99')[63].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper63')) {
		document.getElementsByName('img99')[64].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper64')) {
		document.getElementsByName('img99')[65].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper65')) {
		document.getElementsByName('img99')[66].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper66')) {
		document.getElementsByName('img99')[67].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper67')) {
		document.getElementsByName('img99')[68].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper68')) {
		document.getElementsByName('img99')[69].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper69')) {
		document.getElementsByName('img99')[70].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper70')) {
		document.getElementsByName('img99')[71].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper71')) {
		document.getElementsByName('img99')[72].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper72')) {
		document.getElementsByName('img99')[73].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper73')) {
		document.getElementsByName('img99')[74].src = 'img/selecaosim.png';
	}

	if (myVerifica('oper74')) {
		document.getElementsByName('img99')[75].src = 'img/selecaosim.png';
	}
}

function criar_pdf_geral(iii) {

	var citios = "?ensaio=" + iii;

	var myselection = document.getElementsByName('vehicle_job');
	var i;

	for (i = 0; i < myselection.length; i++) {
		if (myselection[i].checked == true) {

			switch (i) {
				case 0:
					citios = citios + "&a=1&aa=1&aaa=1";
					break;
				case 1:
					citios = citios + "&b=1";
					break;
				case 2:
					citios = citios + "&c=1";
					break;
				case 3:
					citios = citios + "&d=1";
					break;
				case 4:
					citios = citios + "&e=1";
					break;
				case 5:
					citios = citios + "&f=1";
					break;
				case 6:
					citios = citios + "&OEE=1";//OEE
					break;
			}
		}
	}

	window.open('../json/relatorio_de_ensaio_com_fpdf_json.php' + citios, '_blank');
}

function terminar_sessao() {
	var form2 = new FormData();
	form2.append('sessao', dt_documento);


	var request = new XMLHttpRequest();
	request.open('post', 'json/terminar_sessao_json.php');
	request.send(form2);

	setTimeout(function () { location.reload() }, 100);
}

function relatorio_geral_de_ensaios() {
	var url = 'json/relatorio_geral_json.php';

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myFunctionfffojhuu418(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function myFunctionfffojhuu418(response) {
	var str = response;
	document.getElementById('corpo').innerHTML = str;
}

function criar_relatorio_geral() {
	var lama = "?data_min=" + document.getElementById('data_inicio').value;
	var kama = "&data_max=" + document.getElementById('data_fim').value;



	window.open('../json/relatorio_geral_com_fpdf_json.php' + lama + kama, '_blank');

}

function myFuntionadaldkladlmamdjsad18(response) {

	var pdf = new jsPDF('p', 'mm', 'a4');

	pdf.setFont('arial');
	pdf.setFontType('normal');

	pdf.addImage(imgData, 'png', 20, 10, 60, 20);

	pdf.setLineWidth(0.5);
	pdf.line(20, 287, 200, 287);
	pdf.line(20, 287, 20, 30);
	pdf.line(200, 287, 200, 30);
	pdf.line(20, 30, 200, 30);

	var vitoria = "Relatório geral dos ensaios";
	var vitoria1 = "Data início= " + document.getElementById('data_inicio').value + "  Data Fim= " + document.getElementById('data_fim').value;

	pdf.setFontSize(16);
	pdf.setTextColor(143, 116, 90);
	pdf.text(vitoria, 90, 20);
	pdf.setFontSize(12);
	pdf.setTextColor(0, 0, 0);
	pdf.text(vitoria1, 90, 26);
	pdf.setTextColor(0, 0, 0);

	var a = 1;
	var dif_horas;
	var soma_horas = "0:00";

	var html_new = "";
	var colunas = "";
	var colunas1 = "";
	var colunas2 = "";
	var colunas3 = "";

	var teste = JSON.parse(response);

	var tigh = teste.dados.length;

	var aux_maquina = "";
	var aux_fabricante = "";

	var pos = 30;

	for (i = 0; i < tigh; i++) {
		maquina = teste.dados[i].maquina;
		fabricante = teste.dados[i].fabricante;

		horas = subtrair_horas(teste.dados[i].hora_inicio, teste.dados[i].hora_fim);

		if (fabricante != aux_fabricante) {
			if (colunas1 != "") {
				pos += 6;
				pdf.setFontSize(10);
				pdf.text(colunas1, 25, pos);
				pdf.text("." + colunas2, 102, pos);
				pdf.text(colunas3, 172, pos);
			}

			pos += 8;
			pdf.setFontSize(12);
			pdf.text(fabricante, 22, pos);
			pos += 6;
			pdf.text("Máquina", 25, pos);
			pdf.text("Nº de enssaios", 102, pos);
			pdf.text("Nº de horas", 172, pos);

			if (aux_maquina != maquina) {
				a = 1;
				soma_horas = "0:00";
				soma_horas = somar_horas(soma_horas, horas);

				colunas1 = maquina;
				colunas2 = a;
				colunas3 = soma_horas;
			} else {
				a += 1;
			}
		} else {
			if (aux_maquina != maquina) {

				pos += 6;
				pdf.setFontSize(10);
				pdf.text(aux_maquina, 25, pos);
				pdf.text(" " + a, 102, pos);
				pdf.text(soma_horas, 172, pos);

				a = 1;
				soma_horas = "0:00";
				soma_horas = somar_horas(soma_horas, horas);
				colunas1 = maquina;
				colunas2 = a;
				colunas3 = soma_horas;
			} else {
				a += 1;
				soma_horas = somar_horas(soma_horas, horas);

				colunas1 = maquina;
				colunas2 = a;
				colunas3 = soma_horas;

			}
		}
		aux_fabricante = fabricante;
		aux_maquina = maquina;
	}

	pos += 6;
	pdf.setFontSize(10);
	pdf.text(colunas1, 25, pos);
	pdf.text(" " + colunas2, 102, pos);
	pdf.text(colunas3, 172, pos);

	var aux_maquina = "";
	var aux_fabricante = "";

	pos += 12;

	pdf.setFontSize(12);
	pdf.text("Relatório detalhado dos ensaios", 22, pos);

	for (i = 0; i < tigh; i++) {
		maquina = teste.dados[i].maquina;
		fabricante = teste.dados[i].fabricante;
		data_ensaio = teste.dados[i].data_ensaio;
		hora_inicio = teste.dados[i].hora_inicio;
		numero_molde = teste.dados[i].numero_molde;

		hora_fim = teste.dados[i].hora_fim;

		empresa = teste.dados[i].empresa;

		horas = subtrair_horas(teste.dados[i].hora_inicio, teste.dados[i].hora_fim);


		if (fabricante != aux_fabricante) {
			pos += 8;

			if (pos > 275) {
				pdf.addPage();
				pos = 30;
			}

			pdf.setFontSize(12);
			pdf.text(fabricante, 25, pos);

			pos += 6;
			pdf.setFontSize(12);
			pdf.text("Data", 25, pos);
			pdf.text("Empresa", 48, pos);
			pdf.text("Máquina", 78, pos);
			pdf.text("Molde nº", 108, pos);
			pdf.text("Início", 138, pos);
			pdf.text("Fim", 158, pos);
			pdf.text("Horas", 178, pos);

			pdf.line(20, pos + 1, 200, pos + 1);

			pos += 6;
			pdf.setFontSize(10);
			pdf.text(data_ensaio, 25, pos);
			pdf.text(empresa, 48, pos);
			pdf.text(maquina, 78, pos);
			pdf.text(numero_molde, 108, pos);
			pdf.text(hora_inicio, 138, pos);
			pdf.text(hora_fim, 158, pos);
			pdf.text(horas, 178, pos);

			pdf.setLineWidth(0.1);
			pdf.line(20, pos + 1, 200, pos + 1);

		} else {

			if (pos > 281) {
				pdf.addPage();
				pos = 35;
				//nova_pagina(pdf);
				pdf.setFontSize(12);
				pdf.text("Data", 25, pos);
				pdf.text("Empresa", 48, pos);
				pdf.text("Máquina", 78, pos);
				pdf.text("Molde nº", 108, pos);
				pdf.text("Início", 138, pos);
				pdf.text("Fim", 158, pos);
				pdf.text("Horas", 178, pos);

				pdf.line(20, pos + 1, 200, pos + 1);

				pdf.setFont('arial');
				pdf.setFontType('normal');

				pdf.addImage(imgData, 'png', 20, 10, 60, 20);

				pdf.setLineWidth(0.5);
				pdf.line(20, 287, 200, 287);
				//pdf.line(20, 270, 200, 270);
				pdf.line(20, 287, 20, 30);
				pdf.line(200, 287, 200, 30);
				pdf.line(20, 30, 200, 30);


				var vitoria = "Relatório geral dos ensaios";
				var vitoria1 = "Data início= " + document.getElementById('data_inicio').value + "  Data Fim= " + document.getElementById('data_fim').value;

				pdf.setFontSize(16);
				pdf.setTextColor(143, 116, 90);
				pdf.text(vitoria, 90, 20);
				pdf.setFontSize(12);
				pdf.setTextColor(0, 0, 0);
				pdf.text(vitoria1, 90, 26);
				pdf.setTextColor(0, 0, 0);
			}

			pos += 6;

			pdf.setFontSize(10);
			pdf.text(data_ensaio, 25, pos);
			pdf.text(empresa, 48, pos);
			pdf.text(maquina, 78, pos);
			pdf.text(numero_molde, 108, pos);
			pdf.text(hora_inicio, 138, pos);
			pdf.text(hora_fim, 158, pos);
			pdf.text(horas, 178, pos);

			pdf.setLineWidth(0.1);
			pdf.line(20, pos + 1, 200, pos + 1);

		}

		aux_fabricante = fabricante;
		aux_maquina = maquina;

	}

	var string = pdf.output('datauristring');

	ficheiro = "relatorio_geral.pdf";

	downloadURI(string, ficheiro);

}

function fotos_dos_parametros(iii) {

	document.getElementById("bf2").disabled = true;
	document.getElementById("bf1").disabled = false;

	memorizar_novos_parâmetros(iii);

	if (contexto_1 == "nada") {
		var xmlhttp = new XMLHttpRequest();

		teste = 'maquina=' + maquina + '&molde=' + iii + '&materia_prima=' + encodeURIComponent(materia_prima);

		var url = 'json/fotos_parametros_maquina_setup_fotos_json.php?' + teste;

		xmlhttp.onreadystatechange = function () {

			if (this.readyState == 4 && this.status == 200) {
				apresentar_parametros_fotos(xmlhttp.responseText);
			}
		}
		xmlhttp.open("GET", url, true);
		xmlhttp.send();
	} else {
		document.getElementById('corpo_baixo').innerHTML = contexto_1;
		repor_registos();
		setTimeout(muda11, 100);

	}
}

function apresentar_parametros_fotos(response) {

	document.getElementById('corpo_baixo').innerHTML = response;

	contexto_1 = response;

	setTimeout(muda11, 300);
}


function reescrever_variavel() {

	contexto_1 = document.getElementById('corpo_baixo').innerHTML;

	ler_registos();

}


function criar_novos_parametros(indexi) {
	var contexto_1 = "nada";
	var contexto_2 = "nada";



	var url = 'json/menu_criar_parametros_json.php?molde=' + indexi;

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myparametros(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}


function myparametros(response) {

	maia = JSON.parse(response);

	document.getElementById('corpo').innerHTML = maia[1];

	document.getElementById('entrada').innerHTML = "Criar novos parâmetros da peça: " + maia[0];

	corrigir();
}

var maquina = "";
var materia_prima = "";

function muda_muita_coisa(indexi) {

	// É necessário fazer com que a máquina esteja escolhida e a matéria prima também

	maquina = myVerifica_1("gender");
	materia_prima = myVerifica_1("gender1");


	if (maquina != -1 && materia_prima != -1) {
		contexto_1 = "nada";

		contexto_2 = "nada";

		criar_novos_parametros_2(indexi);

		document.getElementById("bf1").disabled = false;

		document.getElementById("bf2").disabled = false;
	}
}



function criar_novos_parametros_2(indexi) {

	document.getElementById("bf2").disabled = false;
	document.getElementById("bf1").disabled = true;

	if (contexto_2 == "nada") {
		var url = 'json/criar_novos_parametros_json.php?molde=' + indexi + "&materia_prima=" + materia_prima + "&maquina=" + maquina;

		var xmlhttp = new XMLHttpRequest();

		xmlhttp.onreadystatechange = function () {

			if (this.readyState == 4 && this.status == 200) {
				myparametros_2(xmlhttp.responseText);
			}
		}
		xmlhttp.open("GET", url, true);
		xmlhttp.send();
	} else {
		document.getElementById('corpo_baixo').innerHTML = contexto_2;

		setTimeout(carregar_valores(indexi), 100);

		corrigir();

	}
}


function myparametros_2(response) {
	contexto_2 = response;
	document.getElementById('corpo_baixo').innerHTML = response;

	corrigir();

	document.getElementById('mp1').value = materia_prima;
	document.getElementById('mq1').value = maquina;

}


function ver_relatorio_geral() {

	var lama = "?data_min=" + document.getElementById('data_inicio').value;
	var kama = "&data_max=" + document.getElementById('data_fim').value;


	var url = 'json/relatorio_geral_no_pc_json.php' + lama + kama;


	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myFunmamdjsad18(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function myFunmamdjsad18(response) {
	var a = 1;
	var dif_horas;
	var soma_horas = "0:00";

	var html_new = "";
	var colunas = "";

	var teste = JSON.parse(response);

	var tigh = teste.dados.length;

	var aux_maquina = "";
	var aux_fabricante = "";


	//resumo de horas por empresa

	html_new += "<table class='w3-table-all w3-centered w3-bordered' width=100%><tr><th>Relatório geral dos ensaios  ->  Data início= " + document.getElementById('data_inicio').value + "  Data Fim= " + document.getElementById('data_fim').value + "</th></tr>";


	for (i = 0; i < tigh; i++) {
		maquina = teste.dados[i].maquina;
		fabricante = teste.dados[i].fabricante;

		horas = subtrair_horas(teste.dados[i].hora_inicio, teste.dados[i].hora_fim);


		if (fabricante != aux_fabricante) {
			html_new += colunas + "</table><br><table class='w3-table-all w3-centered w3-bordered' width=100%><tr><th colspan=3>" + fabricante + "</th></tr><tr><td>Máquina</td><td>Nº de ensaios</td><td>Nº de horas</td></tr>";

			if (aux_maquina != maquina) {
				a = 1;
				soma_horas = "0:00";
				soma_horas = somar_horas(soma_horas, horas);
				colunas = "<tr><td colspan=1>" + maquina + "</td><td>" + a + "</td><td>" + soma_horas + "</td></tr>";


			} else {
				a += 1;
			}
		} else {
			if (aux_maquina != maquina) {

				html_new += "<tr><td colspan=1>" + aux_maquina + "</td><td>" + a + "</td><td>" + soma_horas + "</td></tr>";
				a = 1;
				soma_horas = "0:00";
				soma_horas = somar_horas(soma_horas, horas);
				colunas = "<tr><td colspan=1>" + maquina + "</td><td>" + a + "</td><td>" + soma_horas + "</td></tr>";

			} else {
				a += 1;
				soma_horas = somar_horas(soma_horas, horas);
				colunas = "<tr><td colspan=1>" + maquina + "</td><td>" + a + "</td><td>" + soma_horas + "</td></tr>";
			}
		}

		aux_fabricante = fabricante;
		aux_maquina = maquina;
	}

	html_new += colunas + "</table>";

	// listagem de detalhe

	var aux_maquina = "";
	var aux_fabricante = "";

	html_new += "<br><br><table class='w3-table-all w3-centered w3-bordered' width=100%><tr><th>Relatório detalhado dos ensaios  ->  Data início= " + document.getElementById('data_inicio').value + "  Data Fim= " + document.getElementById('data_fim').value + "</th></tr>";

	for (i = 0; i < tigh; i++) {
		maquina = teste.dados[i].maquina;
		fabricante = teste.dados[i].fabricante;
		data_ensaio = teste.dados[i].data_ensaio;
		hora_inicio = teste.dados[i].hora_inicio;
		numero_molde = teste.dados[i].numero_molde;

		hora_fim = teste.dados[i].hora_fim;

		empresa = teste.dados[i].empresa;

		horas = subtrair_horas(teste.dados[i].hora_inicio, teste.dados[i].hora_fim);


		if (fabricante != aux_fabricante) {
			html_new += "</table><br><table class='w3-table-all w3-centered w3-bordered' width=100%><tr><th colspan=7>" + fabricante + "</th></tr><tr><td>Data ensaio</td><td>Empresa onde se realizou o ensaio</td><td>Máquina</td><td>Nº do molde</td><td>Hora inicio</td><td>Hora fim</td><td>Nº de horas</td></tr>";

			html_new += "<tr><td>" + data_ensaio + "</td><td>" + empresa + "</td><td colspan=1>" + maquina + "</td><td colspan=1>" + numero_molde + "</td><td>" + hora_inicio + "</td><td>" + hora_fim + "</td><td>" + horas + "</td></tr>";

		} else {
			html_new += "<tr><td>" + data_ensaio + "</td><td>" + empresa + "</td><td colspan=1>" + maquina + "</td><td colspan=1>" + numero_molde + "</td><td>" + hora_inicio + "</td><td>" + hora_fim + "</td><td>" + horas + "</td></tr>";
		}

		aux_fabricante = fabricante;
		aux_maquina = maquina;

	}

	html_new += "</table>";

	document.getElementById('corpo').innerHTML = html_new;

}



function somar_horas(hora1, hora2) {
	var horas = 0;
	var minutos = 0;


	a = hora1.split(":");
	b = hora2.split(":");

	horas = parseInt(a[0]) + parseInt(b[0]);

	minutos = parseInt(a[1]) + parseInt(b[1]);


	if (minutos > 59) {
		horas = horas + 1;
		minutos = minutos - 60;
	}

	if (minutos < 10) {
		satra = "0" + minutos;
	} else {
		satra = minutos;
	}


	return horas + ":" + satra;
}

function subtrair_horas(hora_inicio, hora_fim) {
	var horas = 0;
	var minutos = 0;

	hora1 = hora_inicio.split(":");

	hora2 = hora_fim.split(":");

	horas = parseInt(hora2[0]) - parseInt(hora1[0]);

	minutos = parseInt(hora2[1]) - parseInt(hora1[1]);


	if (minutos < 0) {
		horas = horas - 1;
		minutos = minutos + 60;
	}

	if (horas == 0 && minutos == 0) {
		horas = 2;
	}

	if (minutos < 10) {
		satra = "0" + minutos;
	} else {
		satra = minutos;
	}


	return horas + ":" + satra;
}



function imprimir_caracteriscas_molde(iii) {
	window.open('../json/molde_com_fpdf_json.php?molde=' + iii, '_blank');
}

var points = new Array();

function carregar_valores(iii) {

	var minha = document.getElementsByName('paula');

	var fLen = minha.length;

	for (i = 0; i < fLen; i++) {
		minha[i].value = points[i];
	}

	document.getElementById('notas').value = points[fLen];

	maquina = myVerifica_1("gender");

	materia_prima = myVerifica_1("gender1");

	document.getElementById('mp1').value = materia_prima;
	document.getElementById('mq1').value = maquina;

	document.getElementById('cota_almofada').value = points[fLen + 1];

	odeio1 = JSON.parse(points[fLen + 2]);

	for (x in odeio1) {

		if (odeio1[x] == '1') {
			document.getElementsByName(x)[0].checked = true;
		}
		if (odeio1[x] == '2') {
			document.getElementsByName(x)[1].checked = true;
		}
	}

	odeio2 = JSON.parse(points[fLen + 3]);

	for (x in odeio2) {
		document.getElementsByName('carborador')[x].value = odeio2[x];
	}

	odeio2 = JSON.parse(points[fLen + 4]);

	for (x in odeio2) {
		document.getElementsByName('sequencial')[x].value = odeio2[x];
	}
}

function memorizar_novos_parâmetros(iii) {

	var n = points.length;
	points.splice(0, n);

	var minha = document.getElementsByName('paula');

	var fLen = minha.length;

	for (i = 0; i < fLen; i++) {
		points.push(minha[i].value);
	}

	var numero_molde = maisoumenos(iii);

	var notas = document.getElementById('notas').value;

	points.push(notas);

	var almofada = document.getElementById('cota_almofada').value;

	points.push(almofada);

	valor01 = myVerifica('m1');
	valor02 = myVerifica('m2');
	valor03 = myVerifica('m3');
	valor04 = myVerifica('m4');
	valor05 = myVerifica('m5');
	valor06 = myVerifica('m6');
	valor07 = myVerifica('m7');
	valor08 = myVerifica('m8');
	valor09 = myVerifica('m9');
	valor10 = myVerifica('m10');
	valor11 = myVerifica('m11');
	valor12 = myVerifica('m12');
	valor13 = myVerifica('m13');
	valor14 = myVerifica('m14');
	valor15 = myVerifica('m15');
	valor16 = myVerifica('m16');
	valor17 = myVerifica('m17');
	valor18 = myVerifica('m18');
	valor19 = myVerifica('m19');

	var msg = '{"m1":"' + valor01 + '","m2":"' + valor02 + '","m3":"' + valor03 + '","m4":"' + valor04 + '","m5":"' + valor05 + '","m6":"' + valor06 + '","m7":"' + valor07 + '","m8":"' + valor08 + '","m9":"' + valor09 + '","m10":"' + valor10 + '","m11":"' + valor11 + '","m12":"' + valor12 + '","m13":"' + valor13 + '","m14":"' + valor14 + '","m15":"' + valor15 + '","m16":"' + valor16 + '","m17":"' + valor17 + '","m18":"' + valor18 + '","m19":"' + valor19 + '"}';

	points.push(msg);

	var minha = document.getElementsByName('carborador');

	var carboradores = "{";

	for (i = 0; i < 120; i++) {
		flash = i;
		zona = '"' + flash + '"';
		carboradores += zona + ':"' + minha[i].value + '"';
		if (i != 119) {
			carboradores += ",";
		}
	}

	carboradores += "}";

	points.push(carboradores);


	var minha = document.getElementsByName('sequencial');
	var sequenciais = "{";

	for (i = 0; i < 96; i++) {

		flash = i;

		zona = '"' + flash + '"';

		sequenciais += zona + ':"' + minha[i].value + '"';

		if (i != 95) {
			sequenciais += ",";
		}
	}

	sequenciais += "}";

	points.push(sequenciais);

}

function Gravar_novos_parâmetros(iii) {

	var minha = document.getElementsByName('paula');

	var minhar = document.getElementsByName('paulads');

	var form = new FormData();
	form.append('numero_molde', maisoumenos(iii));

	form.append('maquina', maisoumenos(minha[0].value));

	form.append('tonelagem', maisoumenos(minha[1].value));

	form.append('materia_prima', maisoumenos(minha[2].value));

	form.append('segunda_materia', maisoumenos(minha[3].value));

	form.append('terceira_materia', "");

	form.append('tempo_arrefecimento', maisoumenos(minha[4].value));

	form.append('tempo_injecao', maisoumenos(minha[6].value));

	form.append('tempo_ciclo', maisoumenos(minha[5].value));

	form.append('notas', maisoumenos(document.getElementById('notas').value));

	form.append('almofada', maisoumenos(document.getElementById('cota_almofada').value));

	valor01 = myVerifica('m1');
	valor02 = myVerifica('m2');
	valor03 = myVerifica('m3');
	valor04 = myVerifica('m4');
	valor05 = myVerifica('m5');
	valor06 = myVerifica('m6');
	valor07 = myVerifica('m7');
	valor08 = myVerifica('m8');
	valor09 = myVerifica('m9');
	valor10 = myVerifica('m10');
	valor11 = myVerifica('m11');
	valor12 = myVerifica('m12');
	valor13 = myVerifica('m13');
	valor14 = myVerifica('m14');
	valor15 = myVerifica('m15');
	valor16 = myVerifica('m16');
	valor17 = myVerifica('m17');
	valor18 = myVerifica('m18');
	valor19 = myVerifica('m19');

	msg = '{"zona1":"' + valor01 + '","zona2":"' + valor02 + '","zona3":"' + valor03 + '","zona4":"' + valor04 + '","zona5":"' + valor05 + '","zona6":"' + valor06 + '","zona7":"' + valor07 + '","zona8":"' + valor08 + '","zona9":"' + valor09 + '","zona10":"' + valor10 + '","zona11":"' + valor11 + '","zona12":"' + valor12 + '","zona13":"' + valor13 + '","zona14":"' + valor14 + '","zona15":"' + valor15 + '","zona16":"' + valor16 + '","zona17":"' + valor17 + '","zona18":"' + valor18 + '","zona19":"' + valor19 + '"}';

	form.append('controlar_zonas', btoa(msg));

	camara = "{";

	for (i = 7; i < 20; i++) {

		flash = i - 7;

		zona = '"zona' + flash + '"';

		camara += zona + ':"' + maisoumenos(minha[i].value) + '"';

		if (i != 19) {
			camara += ",";
		}
	}

	camara += "}";

	form.append('camara', btoa(camara));

	injecao = "{";

	for (i = 20; i < 56; i++) {
		flash = i - 20;
		zona = '"zona' + flash + '"';
		injecao += zona + ':"' + maisoumenos(minha[i].value) + '"';
		if (i != 55) {
			injecao += ",";
		}
	}

	injecao += "}";

	form.append('injecao', btoa(injecao));

	segunda_pressao = "{";

	for (i = 56; i < 92; i++) {
		flash = i - 56;
		zona = '"zona' + flash + '"';
		segunda_pressao += zona + ':"' + maisoumenos(minha[i].value) + '"';
		if (i != 91) {
			segunda_pressao += ",";
		}
	}

	segunda_pressao += "}";

	form.append('segunda_pressao', btoa(segunda_pressao));

	dosagem = "{";

	for (i = 92; i < 128; i++) {
		flash = i - 92;
		zona = '"zona' + flash + '"';
		dosagem += zona + ':"' + maisoumenos(minha[i].value) + '"';
		if (i != 127) {
			dosagem += ",";
		}
	}

	dosagem += "}";

	form.append('dosagem', btoa(dosagem));

	descompressao = "{";

	for (i = 128; i < 164; i++) {
		flash = i - 128;
		zona = '"zona' + flash + '"';
		descompressao += zona + ':"' + maisoumenos(minha[i].value) + '"';
		if (i != 163) {
			descompressao += ",";
		}
	}

	descompressao += "}";

	form.append('descompressao', btoa(descompressao));

	form.append('parte_fixa', maisoumenos(minha[164].value));

	form.append('parte_movel', maisoumenos(minha[165].value));

	var minha = document.getElementsByName('carborador');
	carboradores = "{";

	for (i = 0; i < 120; i++) {
		flash = i;
		zona = '"zona' + flash + '"';
		carboradores += zona + ':"' + maisoumenos(minha[i].value) + '"';
		if (i != 119) {
			carboradores += ",";
		}
	}

	carboradores += "}";

	form.append('carboradores', btoa(carboradores));

	var minha = document.getElementsByName('sequencial');
	sequenciais = "{";

	for (i = 0; i < 96; i++) {

		flash = i;

		zona = '"zona' + flash + '"';

		sequenciais += zona + ':"' + maisoumenos(minha[i].value) + '"';

		if (i != 95) {
			sequenciais += ",";
		}
	}

	sequenciais += "}";

	form.append('sequenciais', btoa(sequenciais));

	var request = new XMLHttpRequest();
	request.open('post', '/json/gravar_novo_parametros_de_injecao_json.php');
	request.send(form);

	lista_parametros(iii);
}

function duplicar_parametros(molde, indice) {
	opcao = 2;
	paramatros = "?molde=" + molde + "&indice=" + indice + "&opcao=" + opcao + "&duplicar=true";

	var url = 'json/duplicar_parametros.php' + paramatros;


	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myFuncion_editar_parametros(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

}

function editar_parametros(molde, indice, opcao) {

	lama = "?molde=" + molde + "&indice=" + indice + "&opcao=" + opcao;

	var url = 'json/editar_parametros.php' + lama;


	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myFuncion_editar_parametros(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

}

function myFuncion_editar_parametros(response) {
	var str = response;
	document.getElementById('corpo').innerHTML = str;

	corrigir();
}

function alterar_parametros_gravar(variavel, valor) {

	variavel = maisoumenos(variavel);

	valor = maisoumenos(valor);


	msg = variavel;
	if (variavel == "Tcamara") {
		var minha = document.getElementsByName('Tcamara');
		msg = "{";

		for (i = 0; i < 13; i++) {

			flash = i;

			zona = '"zona' + flash + '"';

			try {
				msg += zona + ':"' + maisoumenos(minha[i].value) + '"';
			}
			catch (err) {
				msg += zona + ':""';
			}

			if (i != 12) {
				msg += ",";
			}

		}

		msg += "}";

		msg = btoa(msg);
	}

	if (variavel == "injecao") {
		var minha = document.getElementsByName('injecao');
		msg = "{";

		for (i = 0; i < 36; i++) {

			flash = i;

			zona = '"zona' + flash + '"';

			msg += zona + ':"' + maisoumenos(minha[i].value) + '"';


			if (i != 35) {
				msg += ",";
			}

		}

		msg += "}";

		msg = btoa(msg);
	}

	if (variavel == "segundapressao") {
		var minha = document.getElementsByName('segundapressao');
		msg = "{";

		for (i = 0; i < 36; i++) {

			flash = i;

			zona = '"zona' + flash + '"';

			msg += zona + ':"' + maisoumenos(minha[i].value) + '"';


			if (i != 35) {
				msg += ",";
			}

		}

		msg += "}";

		msg = btoa(msg);
	}

	if (variavel == "dosagem") {
		var minha = document.getElementsByName('dosagem');
		msg = "{";

		for (i = 0; i < 36; i++) {

			flash = i;

			zona = '"zona' + flash + '"';

			msg += zona + ':"' + maisoumenos(minha[i].value) + '"';


			if (i != 35) {
				msg += ",";
			}

		}

		msg += "}";

		msg = btoa(msg);
	}

	if (variavel == "descompressao") {
		var minha = document.getElementsByName('descompressao');
		msg = "{";

		for (i = 0; i < 36; i++) {

			flash = i;

			zona = '"zona' + flash + '"';

			msg += zona + ':"' + maisoumenos(minha[i].value) + '"';


			if (i != 35) {
				msg += ",";
			}

		}

		msg += "}";

		msg = btoa(msg);
	}

	if (variavel == "carboradores") {
		var minha = document.getElementsByName('carboradores');
		msg = "{";

		for (i = 0; i < 120; i++) {

			flash = i;

			zona = '"zona' + flash + '"';

			msg += zona + ':"' + maisoumenos(minha[i].value) + '"';


			if (i != 119) {
				msg += ",";
			}

		}

		msg += "}";

		msg = btoa(msg);
	}

	if (variavel == "sequenciais") {
		var minha = document.getElementsByName('sequenciais');
		msg = "{";

		for (i = 0; i < 96; i++) {

			flash = i;

			zona = '"zona' + flash + '"';

			msg += zona + ':"' + maisoumenos(minha[i].value) + '"';


			if (i != 95) {
				msg += ",";
			}

		}

		msg += "}";

		msg = btoa(msg);
	}

	if (variavel == "Maquina") {
		msg = valor;
	}

	if (variavel == "tonelagem") {
		msg = valor;
	}

	if (variavel == "materia_prima_1") {
		msg = valor;
	}

	if (variavel == "materia_prima_2") {
		msg = valor;
	}

	if (variavel == "materia_prima_3") {
		msg = valor;
	}

	if (variavel == "Tarr") {
		msg = valor;
	}

	if (variavel == "Tciclo") {
		msg = valor;
	}

	if (variavel == "Tinj") {
		msg = valor;
	}

	if (variavel == "agua1") {
		msg = valor;
	}

	if (variavel == "agua2") {
		msg = valor;
	}

	if (variavel == "almofada") {
		msg = valor;
	}

	if (variavel == "controlar") {
		msg = faz_como_verificar();
	}


	var form = new FormData();
	form.append('parametro', variavel);
	form.append('valor', msg);

	var request = new XMLHttpRequest();
	request.open('post', '/json/alterar_parametros_de_injecao_json.php');
	request.send(form);
}

function faz_como_verificar() {
	valor01 = myVerifica('m1');
	valor02 = myVerifica('m2');
	valor03 = myVerifica('m3');
	valor04 = myVerifica('m4');
	valor05 = myVerifica('m5');
	valor06 = myVerifica('m6');
	valor07 = myVerifica('m7');
	valor08 = myVerifica('m8');
	valor09 = myVerifica('m9');
	valor10 = myVerifica('m10');
	valor11 = myVerifica('m11');
	valor12 = myVerifica('m12');
	valor13 = myVerifica('m13');
	valor14 = myVerifica('m14');
	valor15 = myVerifica('m15');
	valor16 = myVerifica('m16');
	valor17 = myVerifica('m17');
	valor18 = myVerifica('m18');
	valor19 = myVerifica('m19');

	msg = '{"zona1":"' + valor01 + '","zona2":"' + valor02 + '","zona3":"' + valor03 + '","zona4":"' + valor04 + '","zona5":"' + valor05 + '","zona6":"' + valor06 + '","zona7":"' + valor07 + '","zona8":"' + valor08 + '","zona9":"' + valor09 + '","zona10":"' + valor10 + '","zona11":"' + valor11 + '","zona12":"' + valor12 + '","zona13":"' + valor13 + '","zona14":"' + valor14 + '","zona15":"' + valor15 + '","zona16":"' + valor16 + '","zona17":"' + valor17 + '","zona18":"' + valor18 + '","zona19":"' + valor19 + '","observacoes":"' + "a" + '"}';

	return btoa(msg);
}

function grava_verificacao() {
	valor01 = myVerifica('m1');
	valor02 = myVerifica('m2');
	valor03 = myVerifica('m3');
	valor04 = myVerifica('m4');
	valor05 = myVerifica('m5');
	valor06 = myVerifica('m6');
	valor07 = myVerifica('m7');
	valor08 = myVerifica('m8');
	valor09 = myVerifica('m9');
	valor10 = myVerifica('m10');
	valor11 = myVerifica('m11');
	valor12 = myVerifica('m12');
	valor13 = myVerifica('m13');
	valor14 = myVerifica('m14');
	valor15 = myVerifica('m15');
	valor16 = myVerifica('m16');
	valor17 = myVerifica('m17');
	valor18 = myVerifica('m18');
	valor19 = myVerifica('m19');

	nasa = encodeURI(maisoumenos(document.getElementById('notasaa').value));

	msg = '{"zona1":"' + valor01 + '","zona2":"' + valor02 + '","zona3":"' + valor03 + '","zona4":"' + valor04 + '","zona5":"' + valor05 + '","zona6":"' + valor06 + '","zona7":"' + valor07 + '","zona8":"' + valor08 + '","zona9":"' + valor09 + '","zona10":"' + valor10 + '","zona11":"' + valor11 + '","zona12":"' + valor12 + '","zona13":"' + valor13 + '","zona14":"' + valor14 + '","zona15":"' + valor15 + '","zona16":"' + valor16 + '","zona17":"' + valor17 + '","zona18":"' + valor18 + '","zona19":"' + valor19 + '","observacoes":"' + nasa + '"}';

	alterar_automatico_1('verificacoes', btoa(msg));
}





function detectar_mobile() {
	if (navigator.userAgent.match(/Android/i)
		|| navigator.userAgent.match(/webOS/i)
		|| navigator.userAgent.match(/iPhone/i)
		|| navigator.userAgent.match(/iPad/i)
		|| navigator.userAgent.match(/iPod/i)
		|| navigator.userAgent.match(/BlackBerry/i)
		|| navigator.userAgent.match(/Windows Phone/i)
	) {
		return true;
	}
	else {
		return false;
	}
}

function openFullscreen() {
	var elem = document.getElementById("max");
	if (elem.requestFullscreen) {
		try {
			elem.requestFullscreen();
		}
		catch (error) {
			console.error(error);
		}
	} else if (elem.mozRequestFullScreen) { /* Firefox */
		elem.mozRequestFullScreen();
	} else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
		elem.webkitRequestFullscreen();
	} else if (elem.msRequestFullscreen) { /* IE/Edge */
		elem.msRequestFullscreen();
	}
}

function muda_mat_prima(tiaanita) {
	document.getElementById('dadosgersis8').value = tiaanita;

	alterar_automatico('dadosgersis8', tiaanita);

	alterar_automatico_OF('dadosgersis8', tiaanita);
}

function maisoumenos(lerda) {
	try {
		lerda = lerda.replace("±", "&plusmn");
	} catch (err) { }

	try {
		lerda = lerda.replace("+-", "&plusmn");
	} catch { }

	try {
		lerda = lerda.replace("-+", "&plusmn");
	} catch { }

	try {
		lerda = lerda.replace("ã", "&atilde");
	} catch { }

	try {
		lerda = lerda.replace("á", "&aacute");
	} catch { }

	try {
		lerda = lerda.replace("à", "&agrave");
	} catch { }

	try {
		lerda = lerda.replace("â", "&acirc");
	} catch { }

	try {
		lerda = lerda.replace("é", "&eacute");
	} catch { }

	try {
		lerda = lerda.replace("è", "&egrave");
	} catch { }

	try {
		lerda = lerda.replace("ê", "&ecirc");
	} catch { }

	try {
		lerda = lerda.replace("í", "&iacute");
	} catch { }

	try {
		lerda = lerda.replace("ì", "&igrave");
	} catch { }

	try {
		lerda = lerda.replace("î", "&icirc");
	} catch { }

	try {
		lerda = lerda.replace("õ", "&otilde");
	} catch { }

	try {
		lerda = lerda.replace("ó", "&oacute");
	} catch { }

	try {
		lerda = lerda.replace("ò", "&ograve");
	} catch { }

	try {
		lerda = lerda.replace("ô", "&ocirc");
	} catch { }

	try {
		lerda = lerda.replace("ú", "&uacute");
	} catch { }

	try {
		lerda = lerda.replace("ù", "&ugrave");
	} catch { }

	try {
		lerda = lerda.replace("û", "&ucirc");
	} catch { }

	try {
		lerda = lerda.replace("Ã", "&Atilde");
	} catch { }

	try {
		lerda = lerda.replace("Á", "&Aacute");
	} catch { }

	try {
		lerda = lerda.replace("À", "&Agrave");
	} catch { }

	try {
		lerda = lerda.replace("Â", "&Acirc");
	} catch { }

	try {
		lerda = lerda.replace("É", "&Eacute");
	} catch { }

	try {
		lerda = lerda.replace("È", "&Egrave");
	} catch { }

	try {
		lerda = lerda.replace("Ê", "&Ecirc");
	} catch { }

	try {
		lerda = lerda.replace("Í", "&Iacute");
	} catch { }

	try {
		lerda = lerda.replace("Ì", "&Igrave");
	} catch { }

	try {
		lerda = lerda.replace("Î", "&Icirc");
	} catch { }

	try {
		lerda = lerda.replace("Õ", "&Otilde");
	} catch { }

	try {
		lerda = lerda.replace("Ó", "&Oacute");
	} catch { }

	try {
		lerda = lerda.replace("Ò", "&Ograve");
	} catch { }

	try {
		lerda = lerda.replace("Ô", "&Ocirc");
	} catch { }

	try {
		lerda = lerda.replace("Ú", "&Uacute");
	} catch { }

	try {
		lerda = lerda.replace("Ù", "&Ugrave");
	} catch { }

	try {
		lerda = lerda.replace("Û", "&Ucirc");
	} catch { }

	try {
		lerda = lerda.replace("ç", "&ccedil");
	} catch { }

	return lerda;
}

function mudar_para_modo_rapido() {

	v01 = myVerifica('vehicle1') + 1;

	var form = new FormData();
	form.append('v01', v01);

	var request = new XMLHttpRequest();
	request.open('post', '/json/muda_programacao_rapida_json.php');
	request.send(form);

	entrada();
}

function muda_privilegios(valor) {

	v01 = myVerifica('m1');
	v02 = myVerifica('m2');
	v03 = myVerifica('m3');
	v04 = myVerifica('m4');
	v05 = myVerifica('m5');
	v06 = myVerifica('m6');
	v07 = myVerifica('m7');
	v08 = myVerifica('m8');
	v09 = myVerifica('m9');
	v10 = myVerifica('m10');
	v11 = myVerifica('m11');
	v12 = myVerifica('m12');
	v13 = myVerifica('m13');
	v14 = myVerifica('m14');
	v15 = myVerifica('m15');
	v16 = myVerifica('m16');
	v17 = myVerifica('m17');
	v18 = myVerifica('m18');
	v19 = myVerifica('m19');

	msg = '{"1":"' + v01 + '","2":"' + v02 + '","3":"' + v03 + '","4":"' + v04 + '","5":"' + v05 + '","6":"' + v06 + '","7":"' + v07 + '","8":"' + v08 + '","9":"' + v09 + '","10":"' + v10 + '","11":"' + v11 + '","12":"' + v12 + '","15":"' + v15 + '","16":"' + v16 + '","17":"' + v17 + '","18":"' + v18 + '","19":"' + v19 + '","13":"' + v13 + '","14":"' + v14 + '"}';

	var form = new FormData();
	form.append('user', valor);
	form.append('criterio', "privilegios");
	form.append('valor', btoa(msg));

	var request = new XMLHttpRequest();
	request.open('post', '/json/alterar_user_json.php');
	request.send(form);
}

function lista_indices(variavel) {

	var url = 'json/indices_json.php';


	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myIndices(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function myIndices(valor) {
	document.getElementById('entrada').innerHTML = "Máquinas";
	document.getElementById('corpo').innerHTML = valor;

	corrigir();
}


function maquinas_1(variavel) {

	var url = 'json/maquinas_json.php';


	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myMaquinas(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function myMaquinas(valor) {
	document.getElementById('entrada').innerHTML = "Máquinas";
	document.getElementById('corpo').innerHTML = valor;

	corrigir();
}

function lista_de_maquinas() {
	document.getElementById('entrada').innerHTML = "Lista de Máquinas";

	var xmlhttp = new XMLHttpRequest();
	var url = 'json/lista_de_maquinas_json.php';
	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			apresentar_lista_maquinas(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function apresentar_lista_maquinas(variavel) {
	document.getElementById('corpo_baixo').innerHTML = variavel;

	corrigir();
}

function criar_nova_maquina() {
	document.getElementById('entrada').innerHTML = "Criar nova máquina";

	var xmlhttp = new XMLHttpRequest();
	var url = 'json/criar_maquina_json.php';
	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			apresentar_lista_maquinas(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

}

function gravar_maquina() {

	valor01 = document.getElementById('id_referencia_maquina').value;
	valor02 = document.getElementById('designacao_maquina').value;
	valor03 = document.getElementById('distancia_entre_colunas').value;
	valor04 = document.getElementById('dimensao_dos_pratos_da_maquina').value;
	valor05 = document.getElementById('capacidade_de_injeccao').value;
	valor06 = document.getElementById('Forca_fecho').value;
	valor07 = maisoumenos(document.getElementById('observacoes').value);


	msg = '{"0":"' + valor01 + '","1":"' + valor02 + '","2":"' + valor03 + '","3":"' + valor04 + '","4":"' + valor05 + '","5":"' + valor06 + '","6":"' + valor07 + '"}';


	var form = new FormData();
	form.append('dados', msg);

	var request = new XMLHttpRequest();
	request.open('post', '/json/gravar_novo_maquina_de_injecao_json.php');
	request.send(form);

	document.getElementById('corpo_baixo').innerHTML = "Máquina criada com sucesso!!!";
}

function arranque_maquina(iii) {
	document.getElementById('entrada').innerHTML = "Lista de Máquinas";
	var xmlhttp = new XMLHttpRequest();
	var url = 'json/arranque_maquina_fotos_json.php?maquina=' + iii;
	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			apresentar_arranque_maquina_fotos(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function apresentar_arranque_maquina_fotos(response) {
	document.getElementById('entrada').innerHTML = "Procedimento de arranque";
	document.getElementById('corpo_baixo').innerHTML = response;

	setTimeout(muda11, 100);

}



function add_procedimento() {
	mgr = document.getElementById('corpo_baixo').innerHTML

	nut = document.getElementsByClassName('quadro');

	ler_registos();

	ala = nut.length;

	mgr += "<table border-bottom=2px><tr><td rowspan=2 width=50%><canvas class='quadro' position=relative width=900px height=600px style='background:beige' name=7linhas ></canvas><img hidden class=ghi id=mass" + ala + " src=''  position=relative >";
	mgr += "";
	mgr += "</td><td><a position=relative>Operação:</a><br><input class=namibia type=text position=relative>";
	mgr += "</td></tr><tr><td> <a position=relative>Descrição:</a><br><input class=africa_do_sul type=text position=relative>";

	mass = '"mass' + ala + '"';

	mgr += "</td ></tr><tr><td><input type=file class='ghii w3-btn w3-white w3-border w3-border-blue w3-round-large w3-text-black' onchange='openFile(event," + mass + ")'></td><td><a position=relative>Ordem:</a><br><input class=mozambique type=text position=relative></td></tr><table><br>";

	document.getElementById('corpo_baixo').innerHTML = mgr;

	repor_registos();

	setTimeout(muda11, 100);
}

var namibia;
var mozambique;
var africa_do_sul;

function ler_registos() {


	nut = document.getElementsByClassName("quadro");

	try {
		msg = "{";

		for (i = 0; i < nut.length; i++) {

			flash = i;

			zona = '"' + flash + '"';

			msg += zona + ':"' + document.getElementsByClassName("namibia")[i].value + '"';


			if (i != nut.length - 1) {
				msg += ",";
			}

		}

		msg += "}";

		namibia = msg;

	} catch { }


	////other

	try {
		msg = "{";

		for (i = 0; i < nut.length; i++) {

			flash = i;

			zona = '"' + flash + '"';

			msg += zona + ':"' + document.getElementsByClassName("africa_do_sul")[i].value + '"';


			if (i != nut.length - 1) {
				msg += ",";
			}

		}

		msg += "}";

		africa_do_sul = msg;
	} catch { }

	//outras
	try {
		msg = "{";

		for (i = 0; i < nut.length; i++) {

			flash = i;

			zona = '"' + flash + '"';

			msg += zona + ':"' + document.getElementsByClassName("mozambique")[i].value + '"';


			if (i != nut.length - 1) {
				msg += ",";
			}

		}

		msg += "}";


		mozambique = msg;
	} catch { }
}


function repor_registos() {

	try {
		odeio1 = JSON.parse(mozambique);
	} catch { }

	try {
		odeio2 = JSON.parse(africa_do_sul);
	} catch { }

	try {
		odeio3 = JSON.parse(namibia);
	} catch { }

	nut = document.getElementsByClassName("quadro");

	for (i = 0; i < nut.length; i++) {

		try {
			if (odeio1[i]) {
				document.getElementsByClassName("mozambique")[i].value = odeio1[i];
			}
		} catch { }
		try {
			if (odeio2[i]) {
				document.getElementsByClassName("africa_do_sul")[i].value = odeio2[i];
			}
		} catch { }

		try {
			if (odeio3[i]) {
				document.getElementsByClassName("namibia")[i].value = odeio3[i];
			}
		} catch { }
	}
}

function grava_fotos_parametros(iii) {

	nut = document.getElementsByClassName("quadro");

	for (i = 0; i < nut.length; i++) {

		msf = nut[i].id;

		msf = Number(msf.substr(6, msf.length)) + 1;

		var form = new FormData();
		form.append('maquina', maquina);
		form.append('materia_prima', materia_prima);
		form.append('molde', iii);
		form.append('legenda', document.getElementsByClassName("namibia")[i].value);
		form.append('descricao', document.getElementsByClassName("africa_do_sul")[i].value);
		form.append('indice', msf);
		form.append('imagem', nut[i].toDataURL('image/jpeg'));

		var request = new XMLHttpRequest();
		request.open('post', '/json/gravar_parametros_com_fotos_por_maquina_json.php');
		request.send(form);
	}

	document.getElementById('corpo_baixo').innerHTML = "Procedimento criado com sucesso!!!";

}

function grava_procedimento(iii) {
	var aa = document.getElementsByClassName('quadro');

	nut = document.getElementsByClassName("quadro");

	for (i = 0; i < nut.length; i++) {

		var form = new FormData();
		form.append('maravilha', i + 1);
		form.append('maquina', iii);

		form.append('operacao', document.getElementsByClassName("namibia")[i].value);
		form.append('descricao', document.getElementsByClassName("africa_do_sul")[i].value);
		form.append('ordem', document.getElementsByClassName("mozambique")[i].value);
		form.append('imagem', aa[i].toDataURL('image/jpeg'));

		var request = new XMLHttpRequest();
		request.open('post', '/json/gravar_novo_procedimento_de_arranque_maquina_de_injecao_json.php');
		request.send(form);
	}

	document.getElementById('corpo_baixo').innerHTML = "Procedimento criado com sucesso!!!";

}

function imprimir_procedimento(iii) {
	window.open('../json/imprimir_numero_injeccoes_json.php?maquina=' + iii, '_blank');
}

function editar_maquina(iii) {

	document.getElementById('entrada').innerHTML = "Editar máquina";

	var xmlhttp = new XMLHttpRequest();
	var url = 'json/editar_maquina_json.php?maquina=' + iii;
	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			apresentar_lista_maquinas(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function alterar_maquina(iii) {

	valor01 = document.getElementById('id_referencia_maquina').value;
	valor02 = document.getElementById('designacao_maquina').value;
	valor03 = document.getElementById('distancia_entre_colunas').value;
	valor04 = document.getElementById('dimensao_dos_pratos_da_maquina').value;
	valor05 = document.getElementById('capacidade_de_injeccao').value;
	valor06 = document.getElementById('Forca_fecho').value;
	tempo_medio = document.getElementById('tempo_medio').value;

	valor07 = maisoumenos(maisoumenos(document.getElementById('observacoes').value));

	while (valor07 != maisoumenos(valor07)) {
		valor07 = maisoumenos(valor07);
	}

	msg = '{"0":"' + valor01 + '","1":"' + valor02 + '","2":"' + valor03 + '","3":"' + valor04 + '","4":"' + valor05 + '","5":"' + valor06 + '","6":"' + valor07 + '"}';

	var form = new FormData();
	form.append('id_equipamento', iii);
	form.append('tempo_medio', tempo_medio);
	form.append('dados', msg);

	var request = new XMLHttpRequest();
	request.open('post', '/json/alterar_maquina_de_injecao_json.php');
	request.send(form);

	document.getElementById('corpo_baixo').innerHTML = "Linha alterada com sucesso!!!";

}

function add_nova_foto() {
	mgr = document.getElementById('corpo_baixo').innerHTML;
	nut = document.getElementsByClassName('quadro');

	ujl = nut.length + 1;

	ler_registos();

	ala = 1000 + ujl;

	merda = '"quadro' + ala + '"';

	mgr += "<table class='bambino'><tr><td rowspan=2 width=70%><canvas hidden id=quadro" + ala + " class='quadro' position=relative width=900px height=600px style='background:beige' name=7linhas onmousemove='marca(event," + merda + ")'></canvas><img width=100% class=ghi id=mass" + ala + " src=''  position=relative onchange='reescrever_variavel()' >";
	mgr += "";
	mgr += "</td><td><a position=relative>Legenda:</a><br><input value='' class=namibia type=text position=relative onchange='reescrever_variavel()'>";


	mgr += "</td></tr><tr><td rowspan=3> <a class='africa_do_sul_1'>Descrição:</a><br><textarea class='africa_do_sul' style=' overflow: hidden;' onchange='reescrever_variavel()'></textarea>";

	mass = '"mass' + ala + '"';

	mgr += "</td ></tr><tr><td><input type=file class='ghii w3-btn w3-white w3-border w3-border-blue w3-round-large w3-text-black' onchange='openFile(event," + mass + ")' ></td></tr><table>";


	document.getElementById('corpo_baixo').innerHTML = mgr;

	repor_registos();

	//marca(event,"quadro"+ala);

	setTimeout(muda11, 50);

}


var tilt = 1;

var aaa, bbb, ccc, ddd;

var foise = 1;

function mudar() {
	foise = 2;
}

function mudar_1() {
	foise = 1;
}

function colocar_1() {
	foise = 3;
}

function colocar_2() {
	foise = 4;
}

var marca = function (event, salta) {

	var saltaa = document.getElementById(salta);
	var c = document.getElementById(salta);
	var ctx = c.getContext("2d");

	var rect = saltaa.getBoundingClientRect();

	saltaa.onmousemove = function (evt) {

	}

	saltaa.onmousedown = function (evt) {

		ctx.moveTo(evt.clientX, evt.clientY);
		aaa = evt.clientX - rect.left;
		bbb = evt.clientY - rect.top;
	}

	saltaa.onmouseup = function (evt) {
		ccc = evt.clientX - rect.left;
		ddd = evt.clientY - rect.top;

		var layer = (ccc - aaa) * (ccc - aaa) + (ddd - bbb) * (ddd - bbb);

		layer = Math.sqrt(layer);

		if (foise == 4) {
			if (layer < 1) {
				filtro_branco();
			}
		}

		if (foise == 3) {
			if (layer < 10) {
				drawArrow2(tilt, ccc, ddd);
			}
		}

		if (foise == 2) {
			if (layer > 10) {
				drawArrow1(saltaa, ccc, ddd, aaa, bbb);
			}
		}

		if (foise == 1) {
			if (layer > 50) {
				drawArrow(saltaa, ccc, ddd, aaa, bbb);
			}
		}
	}

	//As outras funçoes  
	function restiore1() {

		foise = 3;

	}

	function filtro_branco() {
		ctx.beginPath();
		ctx.globalAlpha = 0.1;
		ctx.rect(0, 0, 900, 600);
		ctx.fillStyle = "white";
		ctx.fill();
		ctx.globalAlpha = 1;
	}

	function drawArrow2(tilt1, fromx, fromy) {

		switch (tilt1) {
			case 1:
				spider = 5;
				break;
			case 10:
				spider = 10;
				break;
			case 100:
				spider = 15;
				break;
		}

		tilt = tilt + 1;

		mixi = "" + tilt1;
		var gradient = ctx.createLinearGradient(0, 0, c.width, 0);
		gradient.addColorStop("0.0", "#333333");
		gradient.addColorStop("0.5", "#333366");
		gradient.addColorStop("1", "#000033");
		// Fill with gradient
		ctx.fillStyle = gradient;
		ctx.font = "20px Georgia";
		ctx.fillText(mixi, fromx, fromy);

		ctx.lineWidth = 2;
		ctx.strokeStyle = "#48FB0D";
		ctx.beginPath();
		ctx.arc(fromx + spider, fromy - 5, 20, 0, 2 * Math.PI);
		ctx.stroke();
	}

	function drawArrow1(eee, fromx, fromy, tox, toy) {
		var headlen = 10;
		var angle = Math.atan2(toy - fromy, tox - fromx);
		ctx.globalAlpha = 0.4;
		//starting path of the arrow from the start square to the end square and drawing the stroke
		ctx.beginPath();
		ctx.moveTo(fromx, fromy);
		ctx.lineTo(tox, toy, 0.5);
		ctx.strokeStyle = "#24E0FB";
		ctx.lineWidth = 15;
		ctx.stroke();

		//starting a new path from the head of the arrow to one of the sides of the point
		ctx.beginPath();
		ctx.moveTo(tox, toy);
		ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 7), toy - headlen * Math.sin(angle - Math.PI / 7), 0.5);

		//path from the side point of the arrow, to the other side point
		ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 7), toy - headlen * Math.sin(angle + Math.PI / 7), 0.5);

		//path from the side point back to the tip of the arrow, and then again to the opposite side point
		ctx.lineTo(tox, toy, 0.5);
		ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 7), toy - headlen * Math.sin(angle - Math.PI / 7), 0.5);
		ctx.globalAlpha = 1;
		//draws the paths created above 
	}


	function drawArrow(eee, fromx, fromy, tox, toy) {

		var headlen = 10;
		var angle = Math.atan2(toy - fromy, tox - fromx);
		ctx.globalAlpha = 0.8;
		//starting path of the arrow from the start square to the end square and drawing the stroke
		ctx.beginPath();
		ctx.moveTo(fromx, fromy);
		ctx.lineTo(tox, toy);
		ctx.strokeStyle = "#48FB0D";
		ctx.lineWidth = 2;
		ctx.stroke();

		//starting a new path from the head of the arrow to one of the sides of the point
		ctx.beginPath();
		ctx.moveTo(tox, toy);
		ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 7), toy - headlen * Math.sin(angle - Math.PI / 7));

		//path from the side point of the arrow, to the other side point
		ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 7), toy - headlen * Math.sin(angle + Math.PI / 7));

		//path from the side point back to the tip of the arrow, and then again to the opposite side point
		ctx.lineTo(tox, toy);
		ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 7), toy - headlen * Math.sin(angle - Math.PI / 7));

		//draws the paths created above
		ctx.strokeStyle = "#48FB0D";
		ctx.lineWidth = 2;
		ctx.stroke();
		ctx.fillStyle = "#48FB0D";
		ctx.fill();
		ctx.globalAlpha = 1;
	}
}

var sigute;
var malhosa;

function alterar_imagem(ontario, milhosa) {

	sigute = ontario;
	malhosa = milhosa;

	var c = document.getElementById('quadro1000');
	var ctx = c.getContext("2d");

	var output = document.getElementById(ontario);

	ctx.drawImage(output, 0, 0, 900, 600);

	d = document.getElementById("imagem111");
	d.style.display = "block";
}

function cancelar_imagem() {
	document.getElementById('imagem111').style.display = "none";
}


function gravar_imagem() {

	tilt = 0;

	var c = document.getElementById(sigute);

	var ctx = c.getContext("2d");

	var output = document.getElementById('quadro1000');

	ctx.drawImage(output, 0, 0, 900, 600);

	document.getElementById(malhosa).src = output.toDataURL('image/jpeg');

	contexto_1 = document.getElementById('corpo_baixo').innerHTML;

	d = document.getElementById("imagem111");
	d.style.display = "none";
}


function muda1() {

	var c = document.getElementById('quadro');
	var ctx = c.getContext("2d");

	var output = document.getElementById('screama');

	var comprimento = output.width;

	var altura = output.height;


	if (comprimento < altura) {


		ctx.beginPath();
		ctx.translate(0, 0);
		ctx.rotate(90 * Math.PI / 180);


		ctx.translate(0, -900);
		ctx.drawImage(output, 0, 0, 900, 600);
		ctx.rotate(-90 * Math.PI / 180);
		ctx.translate(-900, 0);

		ctx.translate(0, 0);

		ctx.stroke();
	} else {
		ctx.drawImage(output, 0, 0, 900, 600)
	}
}

function nova_producao(event, iii, nova) {


	try {
		valor_scroll = document.getElementById('corpo_baixo').scrollTop;
	} catch (err) {

	}

	var form = new FormData();
	form.append('numero', iii);
	form.append('nova', nova);


	var request = new XMLHttpRequest();
	request.open('post', 'json/grava_nova_producao_seguinte_json.php');
	request.send(form);


	ddd = document.getElementById("date_ir").value;

	mapa(ddd);
}

function chatere(event, tinoco, mimi) {

	if (event.keyCode != 13 && event.keyCode) {
		event.keyCode = 0;
		document.getElementById(tinoco).value = "";
	}
}

function muda_quadro(event, tinoco, mimi) {

	if (event.keyCode == 13) {
		document.getElementById(tinoco).disabled = true;
		document.getElementById(tinoco).disabled = false;

		fruits = tinoco.split(mimi);

		switch (fruits[0]) {
			case "a":
				text = "b" + mimi;
				break;
			case "b":
				text = "c" + mimi;
				break;
			case "c":
				text = "cc" + mimi;

				break;
			case "cc":
				text = "ccc" + mimi;
				break;
			case "ccc":
				text = "cccc" + mimi;
				break;
			case "cccc":
				text = "d" + mimi;
				break;
			case "d":
				text = "ga-" + mimi;
				break;
			case "ga-":
				text = "rearranque-" + mimi;
				break;
			case "rearranque-":
				text = "g" + mimi;
				break;
			case "g":
				text = "i" + mimi;
				break;
			case "h":
				text = "i" + mimi;
				break;
			case "i":
				text = "j" + mimi;
				break;
			case "j":
				text = "k" + mimi;
				break;
			case "k":
				text = "l" + mimi;
				break;
			case "l":
				text = "m" + mimi;
				break;
			case "m":
				text = "o" + mimi;
				break;
			case "n":
				text = "o" + mimi;
				break;
			case "o":
				text = "p" + mimi;
				break;
			case "p":
				text = "q" + mimi;
				break;
			case "q":
				text = "r" + mimi;
				break;
			case "r":
				text = "s" + mimi;
				break;
			case "s":
				text = "u" + mimi;
				break;
			case "t":
				text = "w" + mimi;
				break;
			case "u":
				text = "v" + mimi;
				break;
			case "v":
				text = "w" + mimi;
				break;
			case "w":
				text = "x" + mimi;
				break;
			case "x":
				text = "y" + mimi;
				break;
			case "y":
				text = "z" + mimi;
				break;
			case "z":
				text = "z" + mimi;
				break;

			default:
				text = "I have never heard of that fruit...";
		}

		try {
			document.getElementById(text).select();
		} catch { };

	}
}



var turno;
var of_vigente;

function acrescenta_rejeicao(nnn, aaa, bbb) {

	if (bbb != "") {
		var form = new FormData();
		form.append('peca', aaa);
		form.append('descricao', bbb);
		form.append('observacoes', "");
		form.append('imagem', "");

		var request = new XMLHttpRequest();
		request.open('post', 'json/grava_nova_rejeicao_json.php');
		request.send(form);

		registo_rejeicao(turno, of_vigente, '0');
	}
}





function acrescenta_paragem(ofa, turno, valor1, nowo, codigo_peca, inicio, fim) {
	var form = new FormData();
	form.append('of', ofa);
	form.append('turno', turno);
	form.append('valor', valor1);
	form.append('indice', nowo);
	form.append('codigo_peca', codigo_peca);
	form.append('inicio', inicio);
	form.append('fim', fim);

	var request = new XMLHttpRequest();
	request.open('post', 'json/grava_nova_paragem_json.php');
	request.send(form);

	registo_paragem(turno, ofa, '0');
}

function grava_paragens(ofa, valor, nnn, sinal, turno) {
	var form = new FormData();
	form.append('of', ofa);
	form.append('turno', turno);
	form.append('indice', nnn);

	if (sinal == 1) {
		form.append('inicio', valor);
	} else {
		form.append('fim', valor);
	}

	var request = new XMLHttpRequest();
	request.open('post', 'json/grava_nova_paragem_json.php');
	request.send(form);
}

function calcular_OF() {

	erro = 0;
	try {
		a = document.getElementById('e1').value; //quantidade de peças
		b = document.getElementById('b1').value;  //peça
		c = document.getElementById('dadosgersis13').value;  //setup
		d = document.getElementById('dadosgersis12').value; //máquina
		e = document.getElementById('dadosgersis8').value; //máquina
	} catch (err) {
		erro = 1;
	}

	if (erro == 0) {

		var xmlhttp = new XMLHttpRequest();

		var url = 'json/calcular_horas_materia_prima_json.php?pecas=' + encodeURIComponent(a) + "&peca=" + encodeURIComponent(b) + "&setup=" + encodeURIComponent(c) + "&maquina=" + encodeURIComponent(d) + "&mat_prima=" + encodeURIComponent(e);

		xmlhttp.onreadystatechange = function () {

			if (this.readyState == 4 && this.status == 200) {
				myFunction_horas_materia_prima(xmlhttp.responseText);
			}
		}
		xmlhttp.open("GET", url, true);
		xmlhttp.send();
	}
}


function myFunction_horas_materia_prima(response) {


	try {
		tempo = JSON.parse(response);

		document.getElementById('dadosgersis11').value = tempo.tempo;
		alterar_automatico_OF('dadosgersis11', tempo.tempo)

		document.getElementById('mat_prima').value = tempo.peso;
		alterar_automatico_OF('mat_prima', tempo.peso)

		document.getElementById('pecas_hora').value = tempo.pecas_hora;


	} catch (err) {
		//alert(response);
	}
}



function editar_OF(event, nnn, nova) {

	alfa_lock = nnn;

	lama = "?of=" + nnn + "&opcao=" + 3 + "&edicao='editar'" + "&nova_fab=" + nova;

	//alert(lama);

	var url = 'json/criar_nova_ordem_fabrico.php' + lama;

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myFuncion_Editar_OF(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

	document.getElementById('entrada').innerHTML = "Editar Ordem de fabrico";

	//corrigir();


}

function editar_relatorio(event, iii) {
	if (event.button == 0) {

		alfa_lock = iii;

		oquefazer = 1;

		leitura_principal = "";
		novo = 2;

		molde = iii;

		leitura_principal = corrigir_opcao(6, molde, 'editar');
	}
}

function alterar_automatico_OF(aaa, valor) {
	var form23 = new FormData();
	form23.append('id_ensaio', alfa_lock);
	form23.append('valor', valor);
	form23.append('campo', aaa);

	var request_2 = new XMLHttpRequest();
	request_2.open('post', 'json/alterar_O_F_um_a_um_json.php');
	request_2.send(form23);
}

function muda_setup(iii) {
	document.getElementById('dadosgersis13').value = iii;

	alterar_automatico('dadosgersis13', iii);

	alterar_automatico_OF('dadosgersis13', iii);

	calcular_OF();

	corrigir();
}

function muda_maquina(valteria, codigo_peca) {
	document.getElementById('dadosgersis12').value = valteria;

	alterar_automatico('dadosgersis12', valteria);

	alterar_automatico_OF('dadosgersis12', valteria);

	alexio = codigo_peca;

	document.getElementById('dadosgersis13').value = "";

	var url = 'json/ler_setup_por_maquina_json.php?codigo=' + alexio + "&maquina=" + valteria;

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myLerSetupPorMaquina(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

}



function myLerSetupPorMaquina(response) {

	document.getElementById('zulmira').innerHTML = response;

	corrigir();
}


function gravar_ordem_de_fabrico() {

	proteger();

	auxliar_modular_1();

	var form = new FormData();
	form.append('id_molde', molde);

	form.append('sonic01', document.getElementById('a1').value);
	form.append('sonic02', document.getElementById('b1').value);
	form.append('sonic03', document.getElementById('c1').value);
	form.append('sonic04', document.getElementById('d1').value);
	form.append('sonic05', sonic05);
	form.append('sonic06', sonic06);
	form.append('sonic07', sonic07);
	form.append('sonic08', sonic08);
	form.append('sonic09', sonic09);

	form.append('sonic10', document.getElementById('mat_prima').value);
	form.append('sonic11', sonic11);
	form.append('sonic12', sonic12);

	//parâmetros
	form.append('sonic13', sonic13);
	form.append('sonic14', sonic14);
	form.append('sonic15', sonic15);
	form.append('sonic16', sonic16);
	form.append('sonic17', sonic17);

	form.append('Num_pecas', document.getElementById('e1').value);


	var request = new XMLHttpRequest();
	request.open('post', 'json/gravar_nova_ordem_fabrico_json.php');
	request.send(form);

	setTimeout(iniciar, 500);

	document.getElementById('corpo').innerHTML = "Gravado com sucesso!!!";
}


function gravar_ensaio_de_molde(aaa, ofa) {

	var form = new FormData();
	form.append('id_molde', aaa);
	form.append('id_OF', ofa);

	form.append('sonic01', document.getElementById('a1').value);  //empresa
	form.append('sonic02', document.getElementById('b1').value);  //código peça
	form.append('sonic03', "");  // data produção
	//form.append('sonic04', "00:00");  // Hora inicio
	//form.append('sonic05', "24:00");  // Hora fim
	form.append('sonic08', document.getElementById('dadosgersis8').value);  // Matéria prima

	form.append('sonic11', "");  // não sei o que é
	form.append('sonic12', document.getElementById('dadosgersis12').value);  // máquina
	form.append('sonic13', document.getElementById('dadosgersis13').value);  // parametros

	//parâmetros
	form.append('sonic14', 1);  //opção 1
	form.append('sonic15', 1);  //opção 2
	form.append('sonic16', 1);  //opção 3


	var request = new XMLHttpRequest();
	request.open('post', 'json/gravar_novo_ensaio_json.php');
	request.send(form);

	//document.getElementById('corpo').innerHTML="Gravado com sucesso!!!";

	editar_OF(event, ofa);
}

function nova_producao_1(event, iii, nova) {

	valor_scroll = document.getElementById('corpo').scrollTop;

	var form = new FormData();
	form.append('numero', iii);
	form.append('nova', nova);
	var request = new XMLHttpRequest();
	request.open('post', 'json/grava_nova_producao_seguinte_json.php');
	request.send(form);

	editar_OF(event, nova);
}


function alterar_automatico_1(aaa, valor) {

	if (alfa_lock != '0') {

		var form23 = new FormData();
		form23.append('id_ensaio', alfa_lock);
		form23.append('valor', valor);
		form23.append('campo', aaa);

		var request_2 = new XMLHttpRequest();
		request_2.open('post', 'json/grava_verificacao_json.php');
		request_2.send(form23);

	}

	corrigir_opcao(6, alfa_lock, "editar");

	document.getElementById('corpo').scrollTop = "true";
}

function alterar_automatico(aaa, valor) {

	if (alfa_lock != '0') {
		var form23 = new FormData();
		form23.append('id_ensaio', alfa_lock);
		form23.append('valor', valor);
		form23.append('campo', aaa);

		var request_2 = new XMLHttpRequest();
		request_2.open('post', 'json/alterar_ensaio_um_a_um_json.php');
		request_2.send(form23);
	}
}

function alterar_automatico_2(ofa, aaa, valor, alfa_lock_1) {

	valor_scroll = document.getElementById('corpo').scrollTop;

	if (alfa_lock_1 != '0') {
		var form23 = new FormData();
		form23.append('id_ensaio', alfa_lock_1);
		form23.append('valor', valor);
		form23.append('campo', aaa);

		var request_2 = new XMLHttpRequest();
		request_2.open('post', 'json/alterar_ensaio_um_a_um_json.php');
		request_2.send(form23);
	}

	editar_OF(event, ofa);
}

function apagar_producao(iii) {

	valor_scroll = document.getElementById('corpo').scrollTop;

	var form = new FormData();
	form.append('numero', iii);

	var request = new XMLHttpRequest();
	request.open('post', 'json/apaga_producao_json.php');
	request.send(form);

	ddd = document.getElementById("date_ir").value;

	mapa(ddd);
}

function apagar_producao_1(iii, ofa) {


	var form = new FormData();
	form.append('numero', iii);

	var request = new XMLHttpRequest();
	request.open('post', 'json/apaga_producao_json.php');
	request.send(form);

	valor_scroll = document.getElementById('corpo').scrollTop;

	editar_OF(event, ofa);
}

function gravar_molde1() {
	var form = new FormData();
	form.append('numero_molde', document.getElementById('id_molde').value);
	form.append('designacao_peca', document.getElementById('designacao_peca').value);

	form.append('tempo_ciclo_standar', document.getElementById('tempo_ciclo_standar').value);

	form.append('numero_ficha_produto', document.getElementById('numero_ficha_produto').value);

	form.append('destino', document.getElementById('destino').value);

	/////////////
	form.append('referencias', document.getElementById('referencias').value);


	//////////////

	form.append('cliente', document.getElementById('cliente').value);
	form.append('desenhador', document.getElementById('desenhador').value);
	form.append('cavidades', document.getElementById('cavidades').value);

	form.append('maquina_1', document.getElementById('maquina_injeccao_1').value);
	form.append('maquina_2', document.getElementById('maquina_injeccao_2').value);
	form.append('maquina_3', document.getElementById('maquina_injeccao_3').value);
	form.append('maquina_4', document.getElementById('maquina_injeccao_4').value);
	form.append('maquina_5', document.getElementById('maquina_injeccao_5').value);

	//peso referência

	peso_injeccao = '{"';

	cars = document.getElementsByName('paula77');

	for (; cars[i];) {
		if (cars[i].value == "") { cars[i].value = 'n.a.'; }
		if (i != 0) {
			peso_injeccao += '","';
		}
		peso_injeccao += i + '":"' + maisoumenos(cars[i].value);
		i++;
	}

	peso_injeccao += '"}';

	form.append('Peso_injecao', btoa(peso_injeccao));

	//matéria prima
	form.append('materia_prima', document.getElementById('materia_prima').value);
	form.append('materia_prima_2', document.getElementById('materia_prima1').value);
	form.append('materia_prima_3', document.getElementById('materia_prima2').value);
	form.append('materia_prima_4', document.getElementById('materia_prima3').value);
	form.append('materia_prima_5', document.getElementById('materia_prima4').value);

	form.append('materia_prima_r1', document.getElementById('materia_prima_r1').value);
	form.append('materia_prima_2_r1', document.getElementById('materia_prima1_r1').value);
	form.append('materia_prima_3_r1', document.getElementById('materia_prima2_r1').value);
	form.append('materia_prima_4_r1', document.getElementById('materia_prima3_r1').value);
	form.append('materia_prima_5_r1', document.getElementById('materia_prima4_r1').value);

	//corante
	form.append('corante_1', document.getElementById('corante_1').value);
	form.append('corante_2', document.getElementById('corante_2').value);
	form.append('corante_3', document.getElementById('corante_3').value);
	form.append('corante_4', document.getElementById('corante_4').value);
	form.append('corante_5', document.getElementById('corante_5').value);

	form.append('corante_1_1', document.getElementById('corante_1_1').value);
	form.append('corante_2_1', document.getElementById('corante_2_1').value);
	form.append('corante_3_1', document.getElementById('corante_3_1').value);
	form.append('corante_4_1', document.getElementById('corante_4_1').value);
	form.append('corante_5_1', document.getElementById('corante_5_1').value);

	//embalagem
	form.append('Embalagem_1', document.getElementById('Embalagem_1').value);
	form.append('Embalagem_2', document.getElementById('Embalagem_2').value);
	form.append('Embalagem_3', document.getElementById('Embalagem_3').value);
	form.append('Embalagem_4', document.getElementById('Embalagem_4').value);
	form.append('Embalagem_5', document.getElementById('Embalagem_5').value);

	form.append('Embalagem_1_1', document.getElementById('Embalagem_1_1').value);
	form.append('Embalagem_2_1', document.getElementById('Embalagem_2_1').value);
	form.append('Embalagem_3_1', document.getElementById('Embalagem_3_1').value);
	form.append('Embalagem_4_1', document.getElementById('Embalagem_4_1').value);
	form.append('Embalagem_5_1', document.getElementById('Embalagem_5_1').value);


	form.append('componente_1', document.getElementById('componente1').value);
	form.append('componente_2', document.getElementById('componente2').value);
	form.append('componente_3', document.getElementById('componente3').value);

	form.append('componente_1_r1', document.getElementById('componente1_r1').value);
	form.append('componente_2_r1', document.getElementById('componente2_r1').value);
	form.append('componente_3_r1', document.getElementById('componente3_r1').value);

	form.append('componente_1_r11', document.getElementById('componente1_r11').value);
	form.append('componente_2_r11', document.getElementById('componente2_r11').value);
	form.append('componente_3_r11', document.getElementById('componente3_r11').value);


	form.append('observacoes', document.getElementById('observacoes').value);
	form.append('imagem', quadro.toDataURL('image/jpeg'));

	var request = new XMLHttpRequest();
	request.open('post', 'json/gravar_novo_1_json.php');
	request.send(form);

	document.getElementById('corpo').innerHTML = "Molde criado com sucesso";
}

function editar_molde_para_ensaio(n) {
	limpar_todas_as_variaveis();
	var xmlhttp = new XMLHttpRequest();
	var url = 'json/editar_molde_para_ensaio_json.php?molde=' + n;

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myFunction1editar(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

	document.getElementById('entrada').innerHTML = "Editar molde nº. " + sonic02;
}

function myFunction1editar(response) {
	var str = response;

	document.getElementById('corpo').innerHTML = str;

	document.getElementById('entrada').innerHTML = "Editar molde nº. " + document.getElementById('id_molde').value;

	corrigir();

	//passar imagem para o canvas

	muda1();
}

boneco1 = "";


function milagre() {

	registo_paragem(turno, ofa, '0');
}

function ver_verificacoes(event, aaa) {
	var xmlhttp = new XMLHttpRequest();

	producao = aaa;

	var url = 'json/Lista_de_verificacoes_ensaios_realizados_json.php?producao=' + aaa;

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myFunction_de_verificacoes(xmlhttp.responseText, aaa);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function myFunction_de_verificacoes(response, aaa) {
	var str = response;

	document.getElementById('entrada').innerHTML = "Lista de verificaçoes da peça " + aaa;

	document.getElementById('corpo').innerHTML = str;
}


function indices(iii, miudo) {
	var xmlhttp = new XMLHttpRequest();

	if (miudo) {
		milagre = "&subway=" + miudo;
	} else {

		milagre = "";
	}

	var url = 'json/calcula_indices_of_json.php?ordem_fabrico=' + iii + milagre;

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myFunction_mostra_indices(xmlhttp.responseText, iii);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function myFunction_mostra_indices(response, iii) {
	document.getElementById('entrada').innerHTML = "Análise de indices da ordem fabrico nº " + iii;

	document.getElementById('corpo').innerHTML = response;
}


function imprimir_mapa_diario(aaa) {
	window.open('../json/imprimir_mapa_diario_json.php?dat=' + aaa, '_blank');
}

function checklist(iii, adicionar) {

	var xmlhttp = new XMLHttpRequest();

	maquina = myVerifica_returned("mitico");

	var url = 'json/checklist_ferramentas.php?molde=' + iii + "&adicionar=" + adicionar + "&maquina=" + maquina;


	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myFunction_lista_checklist(xmlhttp.responseText, iii);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function mudaalgumacoisa(iii) {

	// É necessário fazer com que a máquina esteja escolhida e a matéria prima também

	maquina = myVerifica_returned("mitico");

	var xmlhttp = new XMLHttpRequest();

	var url = 'json/checklist_ferramentas.php?molde=' + iii + "&maquina=" + maquina;

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myFunction_lista_checklist(xmlhttp.responseText, iii);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function myFunction_lista_checklist(response, iii) {
	document.getElementById('entrada').innerHTML = "Check List para a montagem do molde nº " + iii;

	document.getElementById('corpo').innerHTML = response;
}

function gravar_ferramenta(molde) {

	maquina = myVerifica_returned("mitico");

	if (maquina) {
		var form = new FormData();
		form.append('molde', molde);

		bicho = "number" + molde;
		bicho1 = "ferramenta" + molde;

		form.append('ferramenta', document.getElementById(bicho).value);
		form.append('observacoes', document.getElementById(bicho1).value);
		form.append('maquina', maquina);


		var request = new XMLHttpRequest();
		request.open('post', 'json/grava_nova_ferramenta_json.php');
		request.send(form);

		checklist(molde, "sim");
	}

}

function Remover_ferramenta(molde, indice_ferramenta) {

	maquina = myVerifica_returned("mitico");

	if (maquina) {
		var form = new FormData();
		form.append('molde', molde);
		form.append('indice', indice_ferramenta);
		form.append('maquina', maquina);

		var request = new XMLHttpRequest();
		request.open('post', 'json/remove_nova_ferramenta_json.php');
		request.send(form);

		checklist(molde, "não");
	}
}

function analise_indice_diarios(data) {

	var xmlhttp = new XMLHttpRequest();

	var url = 'json/calcula_indices_diarios_json.php?data=' + data;

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myFunction_mostra_indices_diarios(xmlhttp.responseText, data);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}


function myFunction_mostra_indices_diarios(response, data) {
	document.getElementById('entrada').innerHTML = "Indices diários: " + data;

	document.getElementById('corpo').innerHTML = response;
}

function registo_rejeicao(aaa, bbb, ccc, boneco) {

	try {
		valor_scroll = document.getElementById('corpo_baixo').scrollTop;
	} catch (e) {
	}

	boneco1 = "#" + boneco;

	var xmlhttp = new XMLHttpRequest();

	of_vigente = bbb;
	turno = aaa;

	if (ccc != 0) {
		aaa = aaa + "&adicionar=1";
	}

	var url = 'json/registo_de_defeitos_json.php?of=' + bbb + "&turno=" + aaa;

	xmlhttp.onreadystatechange = function () {


		if (this.readyState == 4 && this.status == 200) {
			myFunctiondefeitos(xmlhttp.responseText, bbb);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

}

function myFunctiondefeitos(response, bbb) {
	var str = response;

	document.getElementById('entrada').innerHTML = "Registo de rejeição da produção nº " + bbb;

	document.getElementById('corpo').innerHTML = str;
}

function registo_paragem(aaa, bbb, ccc, boneco) {

	boneco1 = "#" + boneco;

	var xmlhttp = new XMLHttpRequest();

	of_vigente = bbb;
	turno = aaa;

	if (ccc != 0) {
		aaa = aaa + "&adicionar=1";
	}

	var url = 'json/registo_de_paragens_maquina_json.php?of=' + bbb + "&turno=" + aaa;

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myFunction_de_paragem(xmlhttp.responseText, bbb);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function myFunction_de_paragem(response, bbb) {
	var str = response;

	document.getElementById('entrada').innerHTML = "Registo de paragem nº " + bbb;

	document.getElementById('corpo').innerHTML = str;
}

function Planeamento(aaa) {
	var xmlhttp = new XMLHttpRequest();

	var url = 'planeamento.php';

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myFunction_mostra_planeamento(xmlhttp.responseText, aaa);
		}
	}

	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

/*function Planeamento(aaa){
	var xmlhttp = new XMLHttpRequest();
	
	var url='json/planeamento_semanal_maquina_json.php?machine='+aaa;
	
	xmlhttp.onreadystatechange=function(){
	
	if (this.readyState == 4 && this.status == 200) {
		  myFunction_mostra_planeamento(xmlhttp.responseText,aaa);
		  }
		  }
		
	xmlhttp.open("GET", url, true);
	xmlhttp.send();	
	}*/

function myFunction_mostra_planeamento(response, aaa) {

	var str = response;

	document.getElementById('entrada').innerHTML = "Planeamento de encomentas  " + aaa;

	document.getElementById('corpo').innerHTML = str;

	document.getElementById('corpo_baixo').scrollTop = valor_scroll;
}


function muda_maquina_planeamento(eee, fff) {
	var form = new FormData();
	form.append('nencomenda', eee);
	form.append('maquina', fff);

	var request = new XMLHttpRequest();
	request.open('post', 'json/da_maquina_a_encomenda_json.php');
	request.send(form);

	valor_scroll = document.getElementById('corpo_baixo').scrollTop;

	Planeamento(-1);
}

function muda_quantidade_encomenda(eee, aaa) {
	var form = new FormData();
	form.append('quantidade', aaa);  // quantidade
	form.append('nencomenda', eee);  // registo da encomenda

	var request = new XMLHttpRequest();
	request.open('post', 'json/da_maquina_a_encomenda_json.php');
	request.send(form);

	valor_scroll = document.getElementById('corpo_baixo').scrollTop;

	Planeamento(-1);
}

function adiciona_encomenda(asd) {

	var form = new FormData();
	form.append('molde', asd);

	var request = new XMLHttpRequest();
	request.open('post', 'json/nova_encomenda_json.php');
	request.send(form);

	Planeamento(-1);
}

function criar_of_a_partir_de_encomenda(produto, maquina, qnt) {

	if (qnt > 0 && maquina != "") {
		var form = new FormData();
		form.append('produto', produto);
		form.append('maquina', maquina);
		form.append('qnt', qnt);

		var request = new XMLHttpRequest();
		request.open('post', 'json/grava_of_maquina_produto.php');
		request.send(form);
	}

	valor_scroll = document.getElementById('corpo_baixo').scrollTop;

	Planeamento(-1);
}

function apagar_encomenda(encomenda) {
	var form = new FormData();
	form.append('encomenda', encomenda);

	var request = new XMLHttpRequest();
	request.open('post', 'json/apaga_encomenda_json.php');
	request.send(form);

	valor_scroll = document.getElementById('corpo_baixo').scrollTop;

	Planeamento(-1);
}

function mudar_estado(aaa, bbb) {
	var form = new FormData();
	form.append('produto', aaa);
	form.append('smed', bbb);

	//É necessário apanhar valor da máquina seleccionada
	cinico = myVerifica_returned('maquina');

	var request = new XMLHttpRequest();
	request.open('post', 'json/altera_encomenda_json.php');
	request.send(form);

	valor_scroll = document.getElementById('corpo_baixo').scrollTop;

	if (!cinico) {
		cinico = -1;
	}

	Planeamento(-1);
}

function imprimir_parametros(maquinax, moldex, parametrosx) {
	citios = "?moldex=" + moldex + "&maquinax=" + maquinax + "&parametrosx=" + parametrosx + "&b=1";

	window.open('../json/relatorio_de_ensaio_com_fpdf_json_1.php' + citios, '_blank');
}

var bicho;

function optar_valor(optar_valor) {

	as = document.getElementById(optar_valor);

	semantica = optar_valor.slice(1, 5);

	if (as.checked == true && as.value != 1) {
		semantica = -1;
	}
	bicho = semantica;

	Planeamento(semantica);
}

function myVerifica_returned(maria) {
	var x = document.getElementsByName(maria);

	var i;
	var op = "";
	for (i = 0; i < x.length; i++) {
		if (x[i].checked == true) {
			return x[i].value;
		}
	}

	return op;
}


encomenda_1 = 0;

function dragStart(event, aaa) {
	event.dataTransfer.setData("Text", event.target.id);
	encomenda_1 = aaa;

	//alert(event.target.id);
}

function allowDrop(event) {
	event.preventDefault();
}

function drop_1(event, aa, periodos) {
	event.preventDefault();
	var data = event.dataTransfer.getData("Text");

	mixe = document.getElementById(data).id;

	registo_de_time_line(event.target.id, mixe);

	//re-iniciar o planeamento



}

function registo_de_time_line(aaa, periodos, horas) {

	periodos = periodos.replace("--", "-"); // isto não interessa, é necessário separálos

	tempo = document.getElementById(periodos).innerHTML;



	var form = new FormData();
	form.append('encomenda', encomenda_1);
	form.append('periodos', periodos);
	form.append('data_inicio', aaa);
	form.append('tempo', tempo);

	//alert(periodos + " - " + aaa + " - " + tempo);

	var request = new XMLHttpRequest();
	request.open('post', 'json/grava_time_line_json.php');
	request.send(form);

	Planeamento(bicho);
}

function criar_nova_imagem(molde) {

	var numero_elementos1 = opcao4an.length;
	var numero_elementos = 0;

	//o numero de elementos passa aa ser o ultimo valor + 1

	if (numero_elementos1 == 0) {
		numero_elementos = 0;
	} else {
		var array = opcao4an[numero_elementos1 - 1].split('_');
		numero_elementos = parseInt(array[1]) + 1;
	}

	var mass = '"mass' + numero_elementos + '"';

	var masso3 = 'id="para' + numero_elementos + '" onchange="moo3(' + numero_elementos + ')"';

	var masso31 = 'id="paraa' + numero_elementos + '"';

	var mas = 'id="opt' + numero_elementos + '"';

	var nas = 'id="tpt' + numero_elementos + '"';

	//inserir mais uma coluna
	opcao4an.push("<div class=linha1 id=_" + numero_elementos + "_><a class=pergunta name=12linhas>Descrição:</a><input type=text class='resposta' " + masso3 + "><div class=interior_imagem><a class=pergunta>Imagem:</a><canvas class='quadro' width=900px height=600 style='background:beige' name=7linhas></canvas><img hidden class=ghi id=mass" + numero_elementos + " style='border:1px solid #000000;'></div><div class='malhacao'><input type=checkbox class=mfmaria " + mas + "><label class=mfmaria2>Imprimir</label ><input type=checkbox class=mfmaria1 " + nas + "><label class=mfmaria3>Problema fechado</label><a class=pergunta>Descrição do problema:</a><textarea class=respostaoo " + masso31 + "></textarea></div><input type=file class='ghii w3-btn w3-white w3-border w3-border-blue w3-round-large w3-text-black' onchange='openFile(event," + mass + ")'></div>");

	dados3.push("");

	dados2.push("");

	imagem1.push("");

	setTimeout(muda11, 100);

	corrigir_imagens(molde);

}

function report_picture(iii) {

	var opcao4_imagem = "<div class=linha1><a class='pergunta1'>Nova Imagem:</a><input id='criar_nova_anomalia' onclick='criar_nova_imagem(" + iii + ")' value='Nova Anomalia' type=button class='resposta1 w3-btn w3-white w3-border w3-border-blue w3-round-large w3-text-black'></div><div class=linha1></div>";

	document.getElementById('corpo').innerHTML = opcao4_imagem;

	corrigir();

	document.getElementById('entrada').innerHTML = "Anomalias do Molde nº " + iii;

	ler_anomalias_do_molde(iii);
}

function ler_anomalias_do_molde(iii) {

	var aaa = '?molde=' + iii;

	var url = 'json/ler_anomalias_do_molde_json.php' + aaa;

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myFunction_ler_as_anomalias(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function myFunction_ler_as_anomalias(response) {
	var molde;

	if (response != '{"dados":[]}') {

		var teste = JSON.parse(response);

		var tigh = teste.dados.length;


		for (i = 0; i < tigh; i++) {
			var numero_elementos = teste.dados[i].id_item;

			var mass = '"mass' + numero_elementos + '"';

			var masso3 = 'id="para' + numero_elementos + '" onchange="moo3(' + numero_elementos + ')"';

			var masso31 = 'id="paraa' + numero_elementos + '"';

			var virusgripal = "";

			if (teste.dados[i].impressao == 1) {
				virusgripal = "checked";
			}

			var mas = 'id="opt' + numero_elementos + '"' + virusgripal;

			var virusgripal2 = "";

			if (teste.dados[i].correcao == 1) {
				virusgripal2 = "checked";
			}

			var nas = 'id="tpt' + numero_elementos + '"' + virusgripal2;

			var figura = teste.dados[i].id_molde + ',' + teste.dados[i].id_anomalia + ",this";

			opcao4an.push("<div class=linha1 id=_" + numero_elementos + "_><a class=pergunta name=12linhas>Descrição:</a><input type=text class='resposta' value='" + teste.dados[i].titulo + "' " + masso3 + "><div class=interior_imagem><a class=pergunta>Imagem:</a><canvas class='quadro' width=900px height=600 style='background:beige'></canvas><img hidden class=ghi src='" + teste.dados[i].imagem + "' id=mass" + numero_elementos + " style='border:1px solid #000000;'></div><div class='malhacao'><input type=checkbox class=mfmaria " + mas + " onchange=grava_alteracao_anomalia('impressao'," + figura + ")><label class=mfmaria2>Imprimir</label ><input type=checkbox class=mfmaria1 " + nas + " onchange=grava_alteracao_anomalia('correcao'," + figura + ")><label class=mfmaria3>Problema fechado</label ><a class=pergunta_n1>Descrição do problema:</a><textarea class=respostaoo onchange=grava_alteracao_anomalia('caracterisca'," + figura + ") " + masso31 + " >" + teste.dados[i].caracterisca + "</textarea><a class=pergunta_n2>Resolução</a><textarea class=respostaoo1 onchange=grava_alteracao_anomalia('carrecao'," + figura + ") " + masso31 + " >" + teste.dados[i].carrecao + "</textarea><a class=pergunta_n3>Observações</a><textarea onchange=grava_alteracao_anomalia('observacoes'," + figura + ") class=respostaoo2 " + masso31 + " >" + teste.dados[i].observacoes + "</textarea></div><div class=respostaoo3><input type=file class='w3-btn w3-white w3-border w3-border-blue w3-round-large w3-text-black' onchange='openFile(event," + mass + ")'></div></div>");

			molde = teste.dados[i].id_molde;
		}

		//cria o butão para nova anomalia

		setTimeout(muda11, 100);


		corrigir_imagens(molde);
	}
}


function corrigir_imagens(iii) {

	var opcao4_imagem = "<div class=linha1><a class='pergunta1'>Nova Imagem:</a><input id='criar_nova_anomalia' onclick='criar_nova_imagem(" + iii + ")' value='Nova Anomalia' type=button class='resposta1 w3-btn w3-white w3-border w3-border-blue w3-round-large w3-text-black'></div><div class=linha1></div>";

	var leitura_principal = "<div class=linha1><input type=button class='a4 w3-btn w3-white w3-border w3-border-blue w3-round-large w3-text-black' id='id_molde' value='Guardar' onclick='gravar_anomalias(" + iii + ")'></div>";


	opcao4valor = "";

	opcao4an.forEach(function (item, index, array) {
		opcao4valor += item;
	});


	document.getElementById('corpo').innerHTML = leitura_principal + opcao4valor + opcao4_imagem;

	recuperar_imagens();

	corrigir();
}

function recuperar_imagens() {
	var gt = 0;
	opcao4an.forEach(function (item, index, array) {

		var masso4 = "mass" + index;
		if (imagem1[index]) {
			document.getElementById(masso4).src = imagem1[index];
		}

		if (dados2[index]) {
			var masso3 = "paraa" + index;
			document.getElementById(masso3).value = dados2[index];
		}

		if (dados3[index]) {
			var masso5 = "para" + index;
			document.getElementById(masso5).value = dados3[index];
		}

		gt++;
	});
}

function gravar_anomalias(iii) {

	var nitens = opcao4an.length;

	for (i = 1; i <= nitens; i++) {

		var array = opcao4an[i - 1].split('_');

		var zero = i - 1;

		var aa = document.getElementsByClassName('quadro');

		a = aa[zero].toDataURL('image/jpeg');

		var vich1 = "para" + zero;

		b = document.getElementById(vich1).value;

		var vich2 = "paraa" + zero;

		c = document.getElementById(vich2).value;

		var ason = "opt" + zero;

		var d = document.getElementById(ason).checked;

		if (d == true) {
			d = 1;
		} else {
			d = 0;
		}

		var asonn = "tpt" + zero;

		var e = document.getElementById(asonn).checked;

		if (e == true) {
			e = 1;
		} else {
			e = 0;
		}

		gravar_as_anomalias(iii, a, b, c, d, e, zero);
	}

	document.getElementById('corpo').innerHTML = "Gravado com sucesso";

	limpar_todas_as_variaveis();


	report_picture(iii);
}

function gravar_as_anomalias(iii, a, b, c, d, e, nitens) {
	var form = new FormData();
	form.append('registo', iii);
	form.append('imagem', a);
	form.append('descricao', b);
	form.append('detalhe', c);
	form.append('imprimir', d);
	form.append('corrigido', e);
	form.append('item3', nitens);
	var request = new XMLHttpRequest();
	request.open('post', 'json/gravar_anomalias_do_molde_json.php');
	request.send(form);
}

function grava_alteracao_anomalia(alteracao, molde, id_anomalia, conteudo) {

	conteudo1 = conteudo.value;

	if (alteracao == "impressao" || alteracao == "correcao") {
		if (conteudo.checked == true) {
			conteudo1 = 1;
		} else {
			conteudo1 = 0;
		}
	}

	var form = new FormData();
	form.append('alteracao', alteracao);
	form.append('id_molde', molde);
	form.append('id_anomalia', id_anomalia);
	form.append('conteudo', conteudo1);
	var request = new XMLHttpRequest();
	request.open('post', 'json/alterar_anomalias_do_molde_json.php');
	request.send(form);
}


function color_next() {
	aaa = document.getElementById('flor1').value;
	baa = document.getElementById('flor2').value;
	caa = document.getElementById('flor3').value;

	classicos = "&n_molde=" + aaa;

	classicos = classicos + "&molde=" + baa;

	classicos = classicos + "&peca=" + caa;

	var xmlhttp = new XMLHttpRequest();
	var url = 'json/Lista_moldes_activos_json.php?aaa=1' + classicos;

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			apresentar_lista_de_moldes_activos(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

	document.getElementById('entrada').innerHTML = "Lista de produtos";
}


function lista_geral_de_producoes(opcao) {

	dat1 = "&dat1=" + document.getElementById("data_inicio").value;
	dat2 = "&dat2=" + document.getElementById("data_fim").value;

	/////////////////////////////////////////////////////////////////////////
	if (opcao == 1) {
		aaa = -1;
		aaa = "?aaa=" + aaa;
		//var url='json/Lista_de_ensaios_todos_json.php'+aaa+dat1+dat2;
		var url = 'json/rendimento_operador.php?' + dat1 + dat2;

		//var url1=encodeURI('json/Lista_de_ensaios_todos_excel_json.php');
		var url1 = encodeURI('json/rendimento_operador_excel_json.php');

		document.getElementById('excel').action = url1;

		document.getElementById('excel1').value = -1;

		document.getElementById('excel2').value = document.getElementById("data_inicio").value;

		document.getElementById('excel3').value = document.getElementById("data_fim").value;
	}

	/////////////////////////////////////////////////////////////////////////////////

	if (opcao == 2) {
		aaa = -1;
		aaa = "?aaa=" + aaa;
		//var url='json/Lista_de_ensaios_maquina_json.php'+aaa+dat1+dat2;
		var url = 'json/Lista_de_ensaios_rejeicao_json.php' + aaa + dat1 + dat2;

		var url1 = encodeURI('json/Lista_de_ensaios_rejeicao_excel_json.php');
		//var url1=encodeURI('indicadores_producao.php'+aaa+dat1+dat2);

		document.getElementById('excel').action = url1;

		document.getElementById('excel1').value = -1;

		document.getElementById('excel2').value = document.getElementById("data_inicio").value;

		document.getElementById('excel3').value = document.getElementById("data_fim").value;
	}

	///////////////////////////////////////////////////////////////////////////////////////////

	if (opcao == 3) {
		aaa = -1;
		aaa = "?aaa=" + aaa;
		var url = 'json/Lista_de_ensaios_produtos_json.php' + aaa + dat1 + dat2;

		var url1 = encodeURI('json/Lista_de_ensaios_produtos_excel_json.php');

		document.getElementById('excel').action = url1;

		document.getElementById('excel1').value = -1;

		document.getElementById('excel2').value = document.getElementById("data_inicio").value;

		document.getElementById('excel3').value = document.getElementById("data_fim").value;
	}

	///////////////////////////////////////////////////////////////////////////////////////////
	//Produção OF
	if (opcao == 4) {
		aaa = -1;
		aaa = "?aaa=" + aaa;
		var url = 'json/Lista_de_ensaios_of_json.php' + aaa + dat1 + dat2;

		var url1 = encodeURI('json/Lista_de_ensaios_of_excel_json.php');

		document.getElementById('excel').action = url1;

		document.getElementById('excel1').value = -1;

		document.getElementById('excel2').value = document.getElementById("data_inicio").value;

		document.getElementById('excel3').value = document.getElementById("data_fim").value;
	}

	///////////////////////////////////////////////////////////////////////////////////////////

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myFunction_LLL(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}


function lista_ensaio(aaa) {

	limpar_todas_as_variaveis();

	aaa = "?aaa=" + aaa;
	var url = 'json/Lista_de_ensaios_realizados_json.php' + aaa;

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myFunction297418(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}


function myFunction297418(response) {
	var str = response;
	document.getElementById('corpo').innerHTML = str;
	document.getElementById('entrada').innerHTML = "Lista de produções";
}


function myFunction_LLL(response) {
	document.getElementById('corpo_baixo').innerHTML = response;
}

function ver_quantidade(cod, id, peca) {

	aaa = "?aaa=" + cod;

	burra = "&campo=" + id.substr(0, 1);

	var url = 'json/ver_qnt_pecas_json.php' + aaa + burra + "&peca=" + peca;

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myresultadoqntpecas(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function myresultadoqntpecas(response) {


	try {
		var gh = JSON.parse(response);

		document.getElementById(gh.a3).value = gh.a1;
	} catch (err) {
	}
}

function numero_etiquetas(aaaa, bbbb) {

	mir = bbbb.substr(0, 1) + 2 + aaaa;

	modal = bbbb.substr(0, 1);

	qnt = document.getElementById(bbbb).value;

	mir1 = document.getElementById(mir).value;

	var form = new FormData();
	form.append('ord_tra', aaaa);
	form.append('qnt', qnt);
	form.append('peca', mir1);
	form.append('campo', modal);

	var request = new XMLHttpRequest();
	request.open('post', 'json/alterar_etiquetas_por_produto_json.php');
	request.send(form);
}

escolha = "";

function imprimir_etiqueta_interna(miau) {

	vb1 = "a1-" + miau;
	vb2 = "a2" + miau;
	vb4 = "a4-" + miau;
	vb5 = "a5-" + miau;
	vb6 = "a6-" + miau;

	vb11 = document.getElementById(vb1).value;
	vb21 = document.getElementById(vb2).value;
	vb41 = document.getElementById(vb4).value;
	vb51 = document.getElementById(vb5).value;
	vb61 = document.getElementById(vb6).value;

	iii = "ensaio=" + miau;

	iii += "&qnt=" + vb51;

	iii += "&tipo_etiqueta=" + vb11;

	iii += "&escolha=" + escolha;

	iii += "&produto=" + vb21;

	iii += "&n_etiquetas=" + vb61;

	iii += "&data=" + vb41;

	window.open('../json/etiqueta.php?' + iii, '_blank');

}

function imprimir_etiqueta_exide(miau) {

	vb1 = "b1-" + miau;
	vb2 = "b2" + miau;
	vb4 = "b4-" + miau;
	vb5 = "b5-" + miau;
	vb6 = "b6-" + miau;

	vb11 = document.getElementById(vb1).value;
	vb21 = document.getElementById(vb2).value;
	vb41 = document.getElementById(vb4).value;
	vb51 = document.getElementById(vb5).value;
	vb61 = document.getElementById(vb6).value;
	dat_OF = document.getElementById("data_OF").value;

	iii = "ensaio=" + miau;

	iii += "&qnt=" + vb51;

	iii += "&tipo_etiqueta=" + vb11;

	iii += "&data=" + vb41;

	iii += "&pais=" + myVerifica('pais');

	iii += "&produto=" + vb21;

	iii += "&encomenda=" + vb61;

	iii += "&data_OF=" + dat_OF;

	window.open('../json/etiqueta_grande_exide.php?' + iii, '_blank');

}

function imprimir_etiqueta_smp(miau) {
	vb1 = "b1-" + miau;
	vb2 = "b2" + miau;
	vb4 = "b4-" + miau;
	vb5 = "b5-" + miau;
	vb6 = "b6-" + miau;

	vb11 = document.getElementById(vb1).value;
	vb21 = document.getElementById(vb2).value;
	vb41 = document.getElementById(vb4).value;
	vb51 = document.getElementById(vb5).value;
	vb61 = document.getElementById(vb6).value;
	dat_OF = document.getElementById("data_OF").value;
	iii = "ensaio=" + miau;

	iii += "&qnt=" + vb51;

	iii += "&tipo_etiqueta=" + vb11;

	iii += "&produto=" + vb21;

	iii += "&data=" + vb41;

	iii += "&pais=" + myVerifica('pais');

	iii += "&n_etiquetas=" + vb61;

	iii += "&data_OF=" + dat_OF;

	window.open('../json/etiqueta_grande_smp.php?' + iii, '_blank');
}

function pesquisar_of(valor) {
	ano_OF = document.getElementById('data_OF').value;
	len_OF = valor.length;
	if (ano_OF < 2022) {
		ano_OF = "";
	} else if (len_OF < 4) {
		numero_de_zeros = 4 - len_OF;
		ano_OF = ano_OF * (10 ** numero_de_zeros);
	}

	var url = 'json/imprimir_etiquetas_por_of.php?of=' + ano_OF + valor;

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myofEtiquetas(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

}

function myofEtiquetas(response) {
	document.getElementById('entrada').innerHTML = "Mapa Etiquetas";

	document.getElementById('corpo_baixo').innerHTML = response;

}

function Imprimir_etiquetas() {
	var url = 'json/imprimir_etiquetas_diario.php';

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myDiarioEtiquetas(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function myDiarioEtiquetas(cromium) {
	document.getElementById('entrada').innerHTML = "Mapa Etiquetas";

	document.getElementById('corpo').innerHTML = cromium;

}

function consultar_lotes() {
	var url = 'json/colsultar_lotes.php';

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myConsultar_lotes(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function myConsultar_lotes(cromium) {
	document.getElementById('entrada').innerHTML = "Consultar Lotes";

	document.getElementById('corpo').innerHTML = cromium;

}

function regista_lote(of,ordem_trab, id) {
	result = checkar_artigo(id);
	mx = document.getElementById(id).value;
	dat = document.getElementById("dat-"+id).value;

	id_span = "s" + id;
	artigo = document.getElementById(id_span).innerHTML;
	//alert(ordem_trab+", "+of+", "+mx+", "+artigo+", "+dat+", "+result);
	var form = new FormData();
	form.append('ord_tra', ordem_trab);
	form.append('of', of);
	form.append('lote', mx);
	form.append('peca', artigo);
	form.append('dat_lt', dat);
	form.append('id', result);

	var request = new XMLHttpRequest();
	request.open('post', 'json/introduzir_alterar_lotes_json.php');
	request.send(form);
}

function habilita_entrada_lote(id_dat){
	id_el = id_dat.split("-")[1];
	input_OF_etiquetas = document.getElementById(id_el);
	input_OF_etiquetas.disabled = false;
}

function checkar_artigo(id) {
	if (id.includes("lotmatprima")) {
		result = "lotmatprima";
	}else if(id.includes("corante0")){
		result = "corante0";
	}else if(id.includes("componentes0")){
		result = "componentes0";
	}else if(id.includes("componentes1")){
		result = "componentes1";
	}else{
		result = null;
	}
	return result;
}

function regista_lote_component(of,mimi, id, component) {
	dat = document.getElementById("dat-"+id).value;
	mx = document.getElementById(id).value;

	my = component;
	var form = new FormData();
	form.append('ord_tra', mimi);
	form.append('of', of);
	form.append('lote', mx);
	form.append('peca', my);
	form.append('dat_lt', dat);
	form.append('id', id);

	var request = new XMLHttpRequest();
	request.open('post', 'json/introduzir_alterar_lotes_json.php');
	request.send(form);

}

function lotes_mm(jitt) {

	cada = 'lotes' + jitt;

	document.getElementById(cada).style.display = 'block';

}

function apagar_lote(jitt) {

	cada = 'lotes' + jitt;

	document.getElementById(cada).style.display = 'none';
}

function smed_mm(jitt) {

	cada = 'smed' + jitt;

	document.getElementById(cada).style.display = 'block';
}

function apagar_smed(jitt) {

	cada = 'smed' + jitt;

	document.getElementById(cada).style.display = 'none';
}

function pesquisar_lotes(valor) {
	ano_of = document.getElementsByTagName("select");
	ano_of = ano_of[0].value;
	len_of = valor.length;
	if (ano_of < 2022) {
		ano_of = "";
	} else if (len_of < 4) {
		numero_de_zeros = 4 - len_of;
		ano_of = ano_of * (10 ** numero_de_zeros);
	}

	var url = 'json/colsultar_lotes_1.php?of=' + ano_of + valor;

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myConsultar_lotes_1(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function myConsultar_lotes_1(cromium) {

	document.getElementById('corpo_baixo').innerHTML = cromium;

}


function add_rejei(val, val1, id_of, turno) {
	asid = "aaa" + val1 + "bbb" + val;

	valorid = document.getElementById(asid).value;

	valorid++;

	document.getElementById(asid).value = valorid;

	gravar_rejeicao(val1, id_of, val, valorid, turno);

	setTimeout(remove_background, 3000);

	remove_background();

}

function remove_background(){
	ELs = document.getElementsByClassName('obs_out_box');
	for (let index = 0; index < ELs.length; index++) {
			ELs[index].style.display="none";
	}
}

function add_rejei_1(val, val1, id_of, turno) {
	asid = "aaa" + val1 + "bbb" + val;

	valorid = document.getElementById(asid).value;

	document.getElementById(asid).value = valorid;

	gravar_rejeicao(val1, id_of, val, valorid, turno);
	
	

}

function gravar_rejeicao(val1, id_of, val, valorid, turno) {

	var currentTime = new Date();

	var horasxxx = currentTime.getHours();

	var minutosxxx = currentTime.getMinutes();

	var dayxxx = currentTime.getDay();

	var monthxxx = currentTime.getMonth();

	var yearxxx = currentTime.getUTCFullYear();


	var dataxxx = yearxxx + "-" + monthxxx + "-" + dayxxx;

	asid = 'codigo' + val1;

	var codigo_peca = document.getElementById(asid).innerHTML;

	grava_altera_rejeicoes(val1, val, valorid, turno, codigo_peca);

	analise_producao(val1, turno);

}

function get_data() {
	var currentTime = new Date();

	var d = addZero(currentTime.getDate());
	var m = addZero(currentTime.getMonth() + 1);
	var y = currentTime.getFullYear();

	return d + "-" + m + "-" + y;

}

function get_data_menos_um() {
	var currentTime = new Date();

	currentTime = currentTime.addDays(-1);

	var d = addZero(currentTime.getDate());
	var m = addZero(currentTime.getMonth() + 1);
	var y = currentTime.getFullYear();

	return d + "-" + m + "-" + y;

}

Date.prototype.addDays = function (days) {
	let date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
}

function get_horas() {
	var currentTime = new Date();

	var h = addZero(currentTime.getHours());
	var m = addZero(currentTime.getMinutes());

	return h + ":" + m;

}

function addZero(i) {
	if (i < 10) { i = "0" + i }
	return i;
}

function get_turno(h, m) {
	var currentTime = new Date();

	var h = currentTime.getHours();

	if (h >= 0 && h < 8) {
		turno = 3;
	}

	if (h >= 8 && h < 16) {
		turno = 1;
	}

	if (h >= 16 && h < 24) {
		turno = 2;
	}

	return turno;
}

function grava_altera_rejeicoes(aaa, indice, valor, turno, codigo_peca) {
	var form = new FormData();
	form.append('of', aaa);
	form.append('indice', indice);
	form.append('valor', valor);
	form.append('turno', turno);
	form.append('codigo_peca', codigo_peca);

	//alert(codigo_peca);

	var request = new XMLHttpRequest();
	request.open('post', 'json/regista_nova_rejeicao_json.php');
	request.send(form);
}

function analise_time_line(data) {

	turno = get_turno();

	if (turno == 3) {
		data = get_data_menos_um();
	} else {
		data = get_data();
	}

	var url = 'json/time_line.php?data=' + data;


	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			myDiarioEntrada(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

	novo_dia(data);

	try {
		dias = document.getElementById('dia').innerHTML;
	} catch (rr) { }

	meudeus();

	analise_producao_1();


}
function set_grupo(ot, nome) {
	id = nome.slice(-2) + "-" + ot;
	elments = document.getElementsByName(nome);
	val = document.getElementById(id).value;
	for (let i = 0; i < elments.length; i++) {
		const element = elments[i];
		element.value = val;
	}
}
function regista_producao(ot, nome) {
	//ot = numero da produção
	//alert(ot);
	if (nome != null) {
		set_grupo(ot, nome);
	}

	a1 = "a" + ot;

	a2 = "a";
	ai = '{"' + a2 + '":"' + document.getElementById(a1).value + '",';

	a1 = "b" + ot;
	a2 = "b";
	ai += '"' + a2 + '":"' + document.getElementById(a1).value + '",';

	a1 = "c" + ot;
	a2 = "c";
	ai += '"' + a2 + '":"' + document.getElementById(a1).value + '",';

	a1 = "cc" + ot;
	a2 = "cc";
	ai += '"' + a2 + '":"' + document.getElementById(a1).value + '",';

	a1 = "d" + ot;
	a2 = "d";
	ai += '"' + a2 + '":"' + document.getElementById(a1).value + '",';

	datinha = "";
	datinha1 = "";
	datinha2 = "";

	if (document.getElementById(a1).value >= "08:15" && document.getElementById(a1).value < '16:00') {
		datinha = document.getElementById(a1).value;
	}

	if (document.getElementById(a1).value >= "16:00" && document.getElementById(a1).value < '23:59') {
		datinha1 = document.getElementById(a1).value;
	}

	if (document.getElementById(a1).value >= "00:00" && document.getElementById(a1).value < '08:15') {
		datinha2 = document.getElementById(a1).value;
	}

	a1 = "ga-" + ot;
	a2 = "ga-";
	if (datinha != "") {
		document.getElementById(a1).value = datinha;
	}

	ai += '"' + a2 + '":"' + document.getElementById(a1).value + '",';

	a1 = "rearranque-" + ot;
	a2 = "rearranque-";
	ai += '"' + a2 + '":"' + document.getElementById(a1).value + '",';

	a1 = "g" + ot;
	a2 = "g";
	ai += '"' + a2 + '":"' + document.getElementById(a1).value + '",';

	a1 = "i" + ot;
	a2 = "i";
	ai += '"' + a2 + '":"' + document.getElementById(a1).value + '",';
	vigar0 = document.getElementById(a1).value;


	a1 = "j" + ot;
	a2 = "j";
	ai += '"' + a2 + '":"' + document.getElementById(a1).value + '",';
	vigar1 = document.getElementById(a1).value;


	/////////////////////
	a1 = "h" + ot;
	a2 = "h";
	vigar = Number(vigar1) + Number(vigar0);

	ai += '"' + a2 + '":"' + vigar + '",';
	/////////////////////

	a1 = "gb-" + ot;
	a2 = "gb-";

	if (datinha1 != "") {
		document.getElementById(a1).value = datinha1;
	}

	ai += '"' + a2 + '":"' + document.getElementById(a1).value + '",';

	/*a1="l"+ot;
	a2="l";
	ai+='"'+a2+'":"'+document.getElementById(a1).value +'",';*/


	a1 = "m" + ot;
	a2 = "m";
	ai += '"' + a2 + '":"' + document.getElementById(a1).value + '",';


	a1 = "o" + ot;
	a2 = "o";
	ai += '"' + a2 + '":"' + document.getElementById(a1).value + '",';
	vigar0 = document.getElementById(a1).value;

	a1 = "p" + ot;
	a2 = "p";
	ai += '"' + a2 + '":"' + document.getElementById(a1).value + '",';
	vigar1 = document.getElementById(a1).value;

	vigar = Number(vigar1) + Number(vigar0);

	a1 = "n" + ot;
	a2 = "n";
	//document.getElementById(a1).value=vigar;
	ai += '"' + a2 + '":"' + vigar + '",';

	a1 = "gc-" + ot;
	a2 = "gc-";

	if (datinha2 != "") {
		document.getElementById(a1).value = datinha2;
	}

	ai += '"' + a2 + '":"' + document.getElementById(a1).value + '",';

	/*a1="r"+ot;
	a2="r";
	ai+='"'+a2+'":"'+document.getElementById(a1).value +'",';*/

	a1 = "s" + ot;
	a2 = "s";
	ai += '"' + a2 + '":"' + document.getElementById(a1).value + '",';


	a1 = "v" + ot;
	a2 = "v";
	ai += '"' + a2 + '":"' + document.getElementById(a1).value + '",';
	vigar1 = document.getElementById(a1).value;

	a1 = "u" + ot;
	a2 = "u";
	ai += '"' + a2 + '":"' + document.getElementById(a1).value + '",';
	vigar0 = document.getElementById(a1).value;

	vigar = Number(vigar1) + Number(vigar0);

	a1 = "t" + ot;
	a2 = "t";
	ai += '"' + a2 + '":"' + vigar + '",';
	//document.getElementById(a1).value=vigar;

	a1 = "ccc" + ot;
	a2 = "ccc";
	ai += '"' + a2 + '":"' + document.getElementById(a1).value + '",';

	a1 = "cccc" + ot;
	a2 = "cccc";
	ai += '"' + a2 + '":"' + document.getElementById(a1).value + '",';

	//inpt2
	//numero orperador 2
	num_op2 = "num_op2_a", "num_op2_b", "num_op2_c";
	for (let i = 0; i < num_op2_t.length; i++) {
		a1 = num_op2_t[i] + "-" + ot;
		a2 = num_op2_t[i];
		ai += '"' + a2 + '":"' + document.getElementById(a1).value + '",';

	}
	//peças boas 2
	/*pb2 = "num_op2_a-","num_op2_b-","num_op2_c-";
	for (let i = 0; i < num_op2_t.length; i++) {
		a1=num_op2_t[i]+ot;
		a2=num_op2_t[i];
		ai+='"'+a2+'":"'+document.getElementById(a1).value +'",';
		
	}*/
	//peças rejeitadas 2
	/*pr2 = "num_op2_a-","num_op2_b-","num_op2_c-";
	for (let i = 0; i < num_op2_t.length; i++) {
		a1=num_op2_t[i]+ot;
		a2=num_op2_t[i];
		ai+='"'+a2+'":"'+document.getElementById(a1).value +'",';
		
	}*/

	//////////////////////////////

	a1 = "x" + ot;
	a2 = "x";
	ai += '"' + a2 + '":"00",';

	a1 = "y" + ot;
	a2 = "y";
	ai += '"' + a2 + '":"00",';

	a1 = "z" + ot;
	a2 = "z";
	ai += '"' + a2 + '":"00"}';

	//document.getElementById('entrada').innerHTML=ai;
	//alert(ai);
	var form = new FormData();
	form.append('numero', ot);
	form.append('dados', ai);
	form.append('observacoes', " ");

	var request = new XMLHttpRequest();
	request.open('post', 'json/grava_producao_diaria_json.php');
	request.send(form);
}

function analise_producao(ot, turno) {
	xxx1 = 'contigo' + ot;
	ccc = myVerifica(xxx1);

	misk = get_turno();

	if (ccc == 1 && misk == turno) {

		magic = "operador" + ot;

		operador = document.getElementById(magic).value;

		sogra = "numero_pecas" + ot;

		pecas_fabricadas = document.getElementById(sogra).value;

		horas = get_horas();
		//horas=Date.now();

		xxx2 = 'aaa' + ot + 'bbb';

		asid = 'of' + ot;

		var ofi = document.getElementById(asid).name;

		rejeicao = soma_name(xxx2);

		var form = new FormData();

		form.append('operador', operador);
		form.append('pecas_fabricadas', pecas_fabricadas);

		form.append('id_tra', ot);
		form.append('estado', ccc);
		form.append('turno', turno);
		form.append('rejeicao', rejeicao);
		form.append('horas', horas);

		form.append('of', ofi);

		var request = new XMLHttpRequest();
		request.open('post', 'json/estado_do_time_line_json.php');
		request.send(form);
	}

	muda_estado_de_ordem_trabalho(ot);
}

function soma_name(xxx2) {

	var x = document.getElementsByName(xxx2);
	var i;
	var op = 0;
	for (i = 0; i < x.length; i++) {
		op += parseInt(x[i].value);
	}

	return op;
}

function valida_novo_codigo() {

	antigo = document.getElementById('antigo').value;;
	novo = document.getElementById('novo').value;

	var form = new FormData();

	form.append('antigo', antigo);
	form.append('novo', novo);

	var request = new XMLHttpRequest();
	request.open('post', 'json/correccao_codigo.php');
	request.send(form);
}


/////////////////////////////////////////    
function novo_dia(data) {

	turno = get_turno();

	if (turno == 3) {
		data = get_data_menos_um();
	} else {
		data = get_data();
	}

	fogaca = "";
	var url = 'json/time_line.php?data=' + data;

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {

			mynova_data(xmlhttp.responseText, data);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function mynova_data(cromium, data) {

	turno = get_turno();

	if (turno == 3) {
		data = get_data_menos_um();
	} else {
		data = get_data();
	}

	document.getElementById('corpo').innerHTML = cromium;

	regenerar_time_line(data);

	MostrarCrono();
}

function regenerar_time_line(data1) {
	fogaca = 0;
	var turno = get_cookie_value("turno") + 1;
	if (turno == "") {
		turno = get_turno();
	}


	var dia = get_data();

	var dia_menos_um = get_data_menos_um();


	verdade = 2;


	if (dia == data1 && turno != 3) {

		verdade = 1;
	} else {
		verdade = 2;

		if (turno == 3 && data1 == dia_menos_um) {
			verdade = 1;
		}
	}


	var url = 'json/time_line_1.php?data=' + data1 + "&turno=" + turno + "&verdade=" + verdade;

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {

			mynova_data_1(xmlhttp.responseText);

		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

}

function mynova_data_1(cromium) {
	document.getElementById('entrada').innerHTML = "Linha do tempo";
	try {


		document.getElementById('conteudo').innerHTML = cromium;
	} catch (err) { }
	tornar_invisivel();
}

function mudar_turno(data1, turno) {
	fogaca = 0;

	var dia = get_data();

	var dia_menos_um = get_data_menos_um();

	verdade = 2;

	turno1 = get_turno();


	if (dia == data1 && turno != 3 && turno == turno1) {
		verdade = 1;
	} else {
		verdade = 2;

		if (turno == 3 && data1 == dia_menos_um) {
			verdade = 1;
		}
	}

	var url = 'json/time_line_1.php?data=' + data1 + "&turno=" + turno + "&verdade=" + verdade;

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			mynova_data_1(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

var hora1;


function MostrarCrono() {
	hora = get_horas();



	if (hora == "16:00" && hora1 != "16:00") {
		hora1 = hora;
		data = get_data();
		analise_time_line(data);
	}

	if (hora == "08:15" && hora1 != "08:15") {

		data = get_data();

		hora1 = hora;

		passar_para_dia_seguinte();

		analise_time_line(data);
	}

	if (hora == "00:00" && hora1 != "00:00") {


		hora1 = hora;

		data = get_data_menos_um();
		analise_time_line(data);
	}

	if (hora != hora1) {
		try {
			dias = document.getElementById('dia').innerHTML;
		} catch (err) { }

		hora1 = hora;

	}


	analise_producao_1();

	try {
		const myTimeout = setTimeout(MostrarCrono, 10000);
		document.getElementById('hora').innerHTML = hora;
	} catch (err) {
		try {
			clearTimeout(myTimeout);
		} catch (err1) { }
	}

}


function analise_producao_1() {  //ordem de trabalho

	ghgh = document.getElementsByName('ordens_trabalho');

	ala = ghgh.length;

	for (i = 0; i < ala; i++) {

		xxx = ghgh[i].innerHTML;

		magic = "operador" + xxx;

		magic_1 = "tempo_ciclo" + xxx;


		operador = document.getElementById(magic).value;

		tempo_ciclo_xxx = document.getElementById(magic_1).value;


		xxx1 = 'contigo' + xxx;
		ccc = myVerifica(xxx1);  // verifica qual a opção que a máquina está

		if (ccc == 1) {
			turno = get_turno();

			horas = get_horas();

			xxx2 = 'aaa' + xxx + 'bbb';

			asid = 'of' + xxx;

			var ofi = document.getElementById(asid).name;

			rejeicao = soma_name(xxx2);

			sogra = "numero_pecas" + xxx;

			pecas_fabricadas = document.getElementById(sogra).value;

			if (pecas_fabricadas != "") {
				var form = new FormData();

				form.append('id_tra', xxx); //certo
				form.append('estado', ccc);  //certo
				form.append('turno', turno); //certo
				form.append('rejeicao', rejeicao); //certo
				form.append('horas', horas);  //certo
				form.append('of', ofi);  //certo
				form.append('operador', operador);
				form.append('pecas_fabricadas', pecas_fabricadas);

				var request = new XMLHttpRequest();
				request.open('post', 'json/estado_do_time_line_json.php');
				request.send(form);
			}

			asid1 = 'numero_cavidades' + xxx;

			var cavidades = document.getElementById(asid1).value;

			var form = new FormData();

			form.append('id_tra', xxx); //certo
			form.append('estado', ccc);  //certo
			form.append('turno', turno); //certo
			form.append('horas', horas);  //certo
			form.append('of', ofi);  //certo
			form.append('tempo_ciclo', tempo_ciclo_xxx);
			form.append('cavidades', cavidades);

			var request = new XMLHttpRequest();
			request.open('post', 'json/grava_paragem_json.php');
			request.send(form);

		} else { // regista paragens de máquina

			if (ccc != 0) {
				horas = get_horas();
				turno = get_turno();

				asid = 'of' + xxx;

				var ofi = document.getElementById(asid).name;

				asid1 = 'numero_cavidades' + xxx;

				var cavidades = document.getElementById(asid1).value;


				var form = new FormData();

				form.append('id_tra', xxx); //certo
				form.append('estado', ccc);  //certo
				form.append('turno', turno); //certo
				form.append('horas', horas);  //certo
				form.append('of', ofi);  //certo
				form.append('tempo_ciclo', tempo_ciclo_xxx);
				form.append('cavidades', cavidades);

				var request = new XMLHttpRequest();
				request.open('post', 'json/grava_paragem_json.php');
				request.send(form);
			}

		}
	}

	meudeus();
}

function meudeus() {
	//corrige produção

	turno = get_turno();

	if (turno == 3) {
		data = get_data_menos_um();
	} else {
		data = get_data();
	}

	var url = 'json/horas_pecas.php?data=' + data + "&turno=" + turno;

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			corrige_data_pecas(xmlhttp.responseText);
		}
	}

	xmlhttp.open("GET", url, true);
	xmlhttp.send();

	// fim de correcção de produção	
}

function corrige_data_pecas(response) {


	try {
		var teste = JSON.parse(response);
		var tigh = teste.dados.length;
	} catch (err) { }

	for (i = 0; i < tigh; i++) {

		try {
			xxx2 = 'aaa' + teste.dados[i].ord_tra + 'bbb';

			rejeicao = soma_name(xxx2);

			numeropecas = "numero_pecas" + teste.dados[i].ord_tra;

			numero_cavidades = "numero_cavidades" + teste.dados[i].ord_tra;

			document.getElementById(numeropecas).value = teste.dados[i].pecas * document.getElementById(numero_cavidades).value - rejeicao; //estimativa de produção

		} catch (err) { }

		try {
			horas_trabalho = "horas_trabalho" + teste.dados[i].ord_tra;
			document.getElementById(horas_trabalho).value = teste.dados[i].horas;
		} catch (err) { }
	}
}

function muda_estado_de_ordem_trabalho(xxx) {
	xxx1 = 'contigo' + xxx;
	ccc = myVerifica(xxx1);

	var form = new FormData();

	form.append('id_tra', xxx); //certo
	form.append('estado', ccc); //certo

	var request = new XMLHttpRequest();
	request.open('post', 'json/muda_estado_da_ordem_trabalho.php');
	request.send(form);
}

function get_time_as_inicio() {
	data_inicio = Date.now()
}

function get_time_as_fim(ot) {
	data_fim = Date.now();

	tempo_decorrido = data_fim - data_inicio;

	id_elemt_tc = "tempo_ciclo" + ot;

	document.getElementById(id_elemt_tc).value = parseInt(tempo_decorrido / 1000 + 0.5); //calcula o tempo de trabalho da maquina em segundos e define como tempo de ciclo

	data_fim = 0;
	data_inicio = 0;
}

function passar_para_dia_seguinte() {

	data_menos_um = get_data_menos_um();
	data = get_data();

	var form = new FormData();
	form.append('data_menos_um', data_menos_um); //certo
	form.append('data_1', data); //certo
	var request = new XMLHttpRequest();
	request.open('post', 'json/passagem_turno.php');
	request.send(form);

	data = get_data();

	analise_time_line(data);

}


var visibilidade = [];

function selecao_a_ver() {

	var x = document.getElementsByName('fiusa');

	visibilidade.length = 0;

	var i;
	var op = "";
	for (i = 0; i < x.length; i++) {
		visibilidade.push(x[i].checked);
	}
	document.cookie = "posto_trabalho=" + encodeURIComponent(visibilidade);
	//alert(document.cookie);
	//alert(visibilidade);
}

function tornar_invisivel() {
	cookie_val = get_cookie_value("posto_trabalho");

	if (cookie_val != "") {
		str_arr_cookie = cookie_val.split(",");
		for (i = 0; i < str_arr_cookie.length; i++) {
			if (str_arr_cookie[i] == "true")
				visibilidade[i] = 1;
			else
				visibilidade[i] = 0;
		}


		ordem_cristo = document.getElementsByName('ordem_de_cristo');/*document.cookie = "posto_trabalho="+ encodeURIComponent(jjjnothing);*/

		jj = ordem_cristo.length;

		jjj = "";

		for (i = 0; i < jj; i++) {

			if (visibilidade[i] == false) {

				ordem_cristo[i].style.visibility = 'hidden';

			} else {
				jjj = jjj + "<div  class='ensaio w3-white w3-border w3-border-black w3-round-large w3-text-black' name='ordem_de_cristo'>" + ordem_cristo[i].innerHTML + "</div>";;
			}
		}
		nothing = "<div  class='ensaio' >";

		nothing += "<table><tr><td width='50%'>";

		nothing += "<input  class='mju w3-btn w3-white w3-border w3-border-black w3-text-black' type=button value='Selecionar' onclick=tornar_invisivel()>";

		nothing += "</td><td width='50%'>";

		nothing += "<input  class='mju w3-btn w3-white w3-border w3-border-black w3-text-black' type=button value='Sair de selecção' onclick=sair_selecao()>";

		nothing += "</td></tr></table>";

		nothing += "</div>";

		document.getElementById('conteudo').innerHTML = jjj + nothing;
	}
}

function sair_selecao() {
	document.cookie = "posto_trabalho=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	analise_time_line(1);
}

function existe_posto_trab() {
	resposta = decodeURIComponent(document.cookie);
	resposta = resposta.indexOf("posto_trabalho=");
	if (resposta >= 0) {
		return true;
	} else {
		return false;
	}
}

function get_cookie_value(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			conteudo_cookie = c.substring(name.length, c.length);
			return conteudo_cookie;
		}
	}
	return "";
}

function habilita_entrada_OF() {//2022  função criada pelo Bruno
	input_OF_etiquetas = document.getElementById('data_inicio');
	input_OF_etiquetas.disabled = false;
}

function confirmar_mudanca_etiqueta(ordem_fabrico1, ordem_trab, num_etiqueta) {
	id_bt_etiqueta = "etiqueta_" + num_etiqueta + "-" + ordem_trab;
	button_etiqueta = document.getElementById(id_bt_etiqueta);


	//verifica se o botão está azul
	if (button_etiqueta.className.includes("blue")) {
		borda_azul = true;
	} else {
		borda_azul = false;
	}
	///////////////////////////////
	mensagem = "quantas peças estão atualmente na embalagem?";
	pecas_feitas_etiqueta = prompt(mensagem);
	/*
	if(pecas_feitas_etiqueta != null){
		pecas_feitas_etiqueta = Number(pecas_feitas_etiqueta);
		if (borda_azul && pecas_feitas_etiqueta != 0)
			muda_etiqueta(ordem_fabrico1,ordem_trab,num_etiqueta,pecas_feitas_etiqueta);
		else if (!borda_azul && pecas_feitas_etiqueta == 0)
			muda_etiqueta(ordem_fabrico1,ordem_trab,num_etiqueta,pecas_feitas_etiqueta);
	}*/
	if (pecas_feitas_etiqueta != null) {
		pecas_feitas_etiqueta = Number(pecas_feitas_etiqueta);
		if (borda_azul && pecas_feitas_etiqueta <= 0)
			alert("valor invalido");
		else
			muda_etiqueta(ordem_fabrico1, ordem_trab, num_etiqueta, pecas_feitas_etiqueta);
	}

}

function muda_etiqueta(ordem_fabrico1, ordem_trab, num_etiqueta, pecas_feitas_etiqueta) {

	xxxxx = "operador" + ordem_trab;
	operador = document.getElementById(xxxxx).value;


	//qt_pecas_etiqueta = button_etiqueta.value.split(":")[1];

	//retira espaçoes em branco
	//try{ qt_pecas_etiqueta = qt_pecas_etiqueta.trim();}
	//catch{ enable_trim();}

	turno = get_turno();


	//if(pecas_feitas_etiqueta == qt_pecas_etiqueta){
	var form = new FormData();
	form.append('ordem_fabrico', ordem_fabrico1);
	form.append('ordem_trabalho', ordem_trab);
	form.append('indice_etiqueta', num_etiqueta);
	form.append('operador', operador);
	form.append('turno', turno);
	form.append('pecas_etiquta', pecas_feitas_etiqueta);

	var request = new XMLHttpRequest();
	request.open('post', 'json/validar_etiqueta.php');
	request.send(form);

	corrigir_etiquetas(ordem_fabrico1, ordem_trab, pecas_feitas_etiqueta);
}


function corrigir_etiquetas(ord_fabrico, ordem_trab) {

	var url = 'json/ler_etiquetas.php?of=' + ord_fabrico + "&ot=" + ordem_trab;

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			corrige_ler_etiquetas(xmlhttp.responseText, ord_fabrico);
		}
	}

	xmlhttp.open("GET", url, true);
	xmlhttp.send(); 
}

function corrige_ler_etiquetas(response, ord_fabrico) {
	ghghgh = "itiquetas" + ord_fabrico;


	document.getElementById(ghghgh).innerHTML = response;
}


function myummd(tid) {
	//document.getElementById(tid).disabled=true;
	document.getElementById(tid).disabled = false;

}

function gravar_anotações_time_line(id_anotacoes, ot) {
	el_anotacao = document.getElementById(id_anotacoes);
	anotacoes = el_anotacao.value;
	if (confirm("Deseja gravar as anotações?") == true) {
		var form = new FormData();
		form.append("anotacoes", anotacoes);
		form.append("ordem_trabalho", ot);
		var request = new XMLHttpRequest();
		request.open('post', 'json/gravar_anotacoes_time_line.php');
		request.send(form);
	} else {
		var url = 'json/reload_anotacao.php?ot=' + ot;
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				el_anotacao.value = xmlhttp.response;
			}
		}
		xmlhttp.open("GET", url);
		xmlhttp.send();
	}
}

function aparece_desaparece_tab_rej() {

	display_rej = document.getElementById("tab_rejeicao");
	estado_display_rej = display_rej.style.display;
	if (estado_display_rej == "none") {
		display_rej.style.display = "block";
	} else {
		display_rej.style.display = "none";
	}
	document.getElementById("tab_rejeicao") = display_rej;
}

function enable_trim() {
	//cria função trim()
	if (!String.prototype.trim) {
		String.prototype.trim = function () {
			return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
		};
	}
}


function lista_maquinas_OEE() {
	var url = "json/OEE.php";
	xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById('corpo_baixo').innerHTML = xmlhttp.responseText;
		}
	}

	xmlhttp.open("GET", url);
	xmlhttp.send();
}

function imprimir_OEE(maq) {
	alert("Por Elaborar");
}

function cria_iframe_indicadores() {
	dat1 = "&dat1=" + document.getElementById("data_inicio").value;
	dat2 = "&dat2=" + document.getElementById("data_fim").value;
	aaa = -1;
	aaa = "?aaa=" + aaa;

	var iframe_graf = document.getElementById("iframe_graf");
	const div_atual = document.getElementById("corpo_baixo");
	if (!iframe_graf)
		iframe_graf = document.createElement("iframe");

	iframe_graf.width = "100%"; iframe_graf.height = "99%";
	iframe_graf.id = "iframe_graf";
	iframe_graf.src = "indicadores_producao.php" + aaa + dat1 + dat2;
	div_atual.innerHTML = "";
	div_atual.appendChild(iframe_graf);
	//Document.body.insertAfter(iframe_graf, div_atual);

}

function rsps_get(url) {
	resp = false;
	xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			resp = xmlhttp.responseText;
		}
	}

	xmlhttp.open("GET", url);
	xmlhttp.send();

	if (resp) {
		return resp;
	} else {
		return false;
	}
}

function add_obs(turno, ot) {

	const div_atual = document.getElementById("corpo");
	background_obs = document.createElement("div");
	div_obs = document.createElement("div");
	url = "json/consulta_popup_obs.php?turno=" + turno + "&ot=" + ot;
	resp = rsps_get(url);
	if (resp) {
		txt_inpt_val = JSON.parse(resp);
		observacoes = txt_inpt_val.observações;
	} else {
		observacoes = txt_inpt_val = "";
	}



	content = '<label>Peças vindas de armazem:</label><br><input type="number" name="obs_entrada" value="' + txt_inpt_val.pecas_armazem + '"><br>' +
		'<label>Peças enviadas para qualidade:</label><br><input type="number" name="obs_entrada" value="' + txt_inpt_val.enviadas_qualiade + '"><br>' +
		'<label>Peças vindas da qualidade:</label><br><input type="number" name="obs_entrada" value="' + txt_inpt_val.vindas_qualidade + '"><br>' +
		'<textarea placeholder="Observações" name="obs_entrada" >' + observacoes + '</textarea><br>' +
		'<input type="button" value="Confirmar" onclick="gravar_obs(\'obs_entrada\',' + turno + ',' + ot + ')">' +
		'<input type="button" value="Voltar" onclick="fecha_obs()">';
	div_obs.innerHTML = content;

	background_obs.classList.add("obs_out_box");
	div_obs.classList.add("obs_box");
	background_obs.style.backgroundColor = "rgba(0, 0, 0, 0.75)";

	//fecha popup ao clicar fora
	window.onclick = function (event) {
		if (event.target == background_obs) {
			background_obs.remove();
		}
	}
	//

	background_obs.appendChild(div_obs);//filiar a div obs a div_bg_obs
	div_atual.appendChild(background_obs);// colocar o div_bg_obs na tela
}

function fecha_obs() {
	modal = document.getElementsByClassName("obs_out_box");
	for (let i = 0; i < modal.length; i++) {
		modal[i].remove();
	}
}



/*function criar_popup_obs(turno,ot) {
	const div_atual = document.getElementById("corpo");
	div_atual.appendChild();// colocar o div_bg_obs na tela
}*/

function verificar_turno(nome) {

	arr_nome = nome.split("-");
	ot = arr_nome[1];
	elmts = document.getElementsByName(nome);
	confir_turno(elmts);

	for (let i = 0; i < elmts.length; i++) {
		input_nome = ot + "-inpt-" + i;
		entradas = document.getElementsByName(input_nome);
		//const element = elmts[i];
		if (elmts[i].checked) {
			document.cookie = "turno=" + i;
		}

		estado = !elmts[i].checked;
		for (let index = 0; index < entradas.length; index++) {
			const el = entradas[index];
			el.disabled = estado;
		}
	}

}

function confir_turno(el) {

	for (let i = 0; i < el.length; i++) {
		if (el[i].checked) {
			id = i;
		}
	}

	horario_atual = get_horas();
	switch (id) {
		case 0:
			h1 = "08:15";
			h2 = "16:15";
			t = "A";
			break;
		case 1:
			h1 = "16:15";
			h2 = "00:15";
			t = "B";
			break;
		case 2:
			h1 = "00:15";
			h2 = "08:15";
			t = "C";
			break;
	}

	if (!(horario_atual <= h2 && horario_atual >= h1)) {
		resp = confirm("Mudar para turno " + t + "?");
		if (resp) {
			el[id].checked = resp;
		} else {
			if (get_cookie_value("turno") != "") {
				turno = get_cookie_value("turno");
			} else {
				turno = get_turno() - 1;
			}
			el[turno].checked = true;
		}
	}

}
//turno = get_cookie_value("turno");
/*unction gravar_obs(name,turno,ot) {
	observacoes = document.getElementsByName(name);
	campos = ["pecas_armazem","enviadas_qualiade","vindas_qualidade","observações"];
	form = new FormData();
	for (let i = 0; i < observacoes.length; i++) {
		inpt_content = observacoes[i].value;
		form.append(campos[i],inpt_content);
	}
	form.append('turno',turno);
	form.append('ot',ot);

	var request = new XMLHttpRequest();
	request.open('post', 'json/gravar_popup_obs.php');
	request.send(form);
	
}*/

function gravar_obs(name, turno, ot) {
	observacoes = document.getElementsByName(name);
	campos = ["pecas_armazem", "enviadas_qualiade", "vindas_qualidade", "observações"];
	form = new FormData();
	form.append('pecas_armazem', observacoes[0].value);
	form.append('enviadas_qualiade', observacoes[1].value);
	form.append('vindas_qualidade', observacoes[2].value);
	form.append('observações', observacoes[3].value);
	form.append('turno', turno);
	form.append('ot', ot);

	var request = new XMLHttpRequest();
	request.open('POST', 'json/gravar_popup_obs.php');
	request.send(form);

}

function gravar_input_prod(name, turno, ot) {
	input_prod = document.getElementsByName(name);
	campos = ["operador", "pecas_boas", "tempo_cilco", "cont_maq"];
	form = new FormData();
	for (let i = 0; i < input_prod.length; i++) {
		form.append(campos[i], input_prod[i].value);
	}
	form.append('turno', turno);
	form.append('ot', ot);
	//request.open('POST', 'json/gravar_popup_obs.php');
	//request.send(form);

	for (let index = 0; index < array.length; index++) {
		const element = array[index];

	}
}

function TabelaRejeicao(id_el) {

	display = document.getElementById(id_el);
	estado_display = display.style.display;
	if (estado_display == "none") {
		display.style.display = "block";
	} else {
		display.style.display = "none";
	}
	//document.getElementById(id_el) = display;

	window.onclick = function (event) {
		//alert(event.target);
		if (event.target == display) {
			display.style.display = "none";
		}
	}
}
///////  tentar usar esta função para gravar informações de paragens, mas já tem essa tabela pronta em alguma página, where????////

function GravaParagens1(ofa, valor, nnn, sinal, turno) {
	var form = new FormData();
	form.append('of', ofa);
	form.append('turno', turno);
	form.append('indice', nnn);

	if (sinal == 1) {
		form.append('inicio', valor);
	} else {
		form.append('fim', valor);
	}

	var request = new XMLHttpRequest();
	request.open('post', 'json/grava_nova_paragem_json.php');
	request.send(form);
}
