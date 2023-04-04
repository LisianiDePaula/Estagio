<?php
session_start();
?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>

<head>
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />

	<link rel="icon" href="favicon.ico">

	<title> Gestão de parâmetros máquinas</title>
	<?php
	$ci = rand(10, 1000);
	echo '<script type="text/javascript" src="js/index1.js?' . $ci . '"></script>';
	?>

	<script type="text/javascript" src="js/moment.js"></script>
	<link rel="stylesheet" href="css/w3.css">

	//em teste

</head>

<style>
	/*popup observações*/
	.obs_out_box {
		position: fixed;
		z-index: 4;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		padding-top: 20px;
	}

	.obs_box {
		background-color: white;
		margin: 10% auto;
		padding: 10px;
		width: 25%;
		border: 1px solid black;
	}

	.obs_box input[type=number],
	textarea {
		width: 100%;
		padding: 5px;
		margin: 5px 0 22px 0;
		border: none;
		border-bottom: 1px solid;
		background: #f1f1f1;
	}

	.obs_box label {
		padding: 5px;
		color: #276cad;
	}

	.obs_box input[type=button] {
		width: 48%;
		padding: 10px;
		border: none;
		background: #276cad;
	}

	.obs_box input[type=button]:hover {
		background: #12456d;
	}

	/*popup observações*/

	html {
		scroll-behavior: smooth;
	}

	body {
		font-size: 14px;
	}

	.nada {
		position: absolute;
		width: 50%;
		height: 10%;
		visibility: hidden;
	}

	.forget_me {
		display: inline-block;
		width: 48%;
		margin: 1%;
	}

	.micas legend {
		font-size: 10px;
	}

	.maquinas1 {
		position: relative;
		left: 65%;
		top: 2% ;
		height: 24 px;
		width:33%;
		font-size: 14px;
	}

	#cima {
		position: absolute;
		left: 2%;
		top: 0%;
		height: 10%;
		width: 96%;
		margin: 0;
		overflow: hidden;
	}

	#myCanvas_1 {
		position: relative;

	}

	.roomt {
		position: relative;
		left: 0;
		top: 0;
		height: 40px;
		width: 60px;
	}

	#menu_principal {
		position: absolute;
		left: 2%;
		top: 10%;
		height: 5%;
		width: 96%;
		margin: 0;
		background-color: #276cad;
		overflow: hidden;
		z-index: 3;
	}

	#corpo {
		position: absolute;
		left: 2%;
		top: 15%;
		height: 80%;
		width: 96%;
		margin: 0;
		overflow-x: hidden;
	}

	#baixo {
		position: absolute;
		left: 2%;
		top: 95%;
		height: 3%;
		width: 96%;
		margin: 0;
		background-color: #276cad;
		overflow: hidden;
	}

	#max {
		position: absolute;
		left: 0%;
		top: 0%;
		height: 100%;
		background-color: #F8FBFE;
		font-color=white;
		width: 100%;
		margin: 0;
		overflow: hidden;
	}

	#resposta {
		padding: 8px;
		display: block;
		border: none;
		border-bottom: 11px solid #808080;
		width: 100%;
	}

	input #hora {
		background: transparent;
		border: none;
		width: 100px;
	}

	.jerico_1 {
		display: none;
		position: absolute;
		left: 15%;
		top: 20%;
		height: 60%;
		width: 70%;
		background: #F8FBFE;
		z-index: 10;
	}

	img {
		z-index: 20;
	}

	tr:nth-child(even) {
		background: #FFF
	}

	tr:nth-child(odd) {
		background: #EEE
	}


	tr input {
		height: 100%;
	}

	tr:mouse-over {
		background-color: "#7BCAE1";
	}

	.jerico_1 span {
		padding-left: 1%;
		position: inline-block;

	}

	.jerico_1 input {
		padding-left: 1%;
		width: 98%;
	}

	input #amiga1 {
		font-size: 9px;
	}

	form .else1 {
		position: absolute;
		left: 2%;
		width: 60%;
		height: 98%;
		top: 1%;
	}

	form .else2 {
		position: absolute;
		left: 2%;
		width: 60%;
		height: 98%;
		top: 1%;
	}

	td input[type=checkbox] {
		text-align: left;
	}

	input[type=number]::-webkit-inner-spin-button,
	input[type=number]::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	td input[type=time] {
		font-size: 11px;
	}

	input[type=text] {
		padding: 2px;
		display: block;
		border: none;
		width: 100%;
		border-bottom: 2px solid #808080;
		color: #000099;
		font-family: Times, serif;
	}

	input[type=file] {
		padding: 2px;
		display: block;
		border: none;
		border-bottom: 2px solid #808080;
		width: 300px;
		color: #000099;
		font-family: Times, serif;
		font-size: 10 px;
	}

	/*//////////////////////////*/
	select.ionica {
		text-align: right;
		border: none;
		font-color: black;
		width: 100%;
		height: 98%;
	}

	/*//////////////////////////*/

	input.ionica {
		text-align: right;
		border: none;
		font-color: black;
		width: 100%;
		height: 98%;
	}

	input[type=text].ionica {
		text-align: left;
		border: none;
		font-color: black;
		width: 100%;
	}

	input[type=button].ionica {
		text-align: center;
		margin: 2px;
		font-size: 12px;
		height: 100%;
	}

	.resposta_rrrr {
		padding: 1px;
		display: block;
		border: none;
		border-bottom: 2px solid #808080;
		font-family: Courier New, Times, serif;
	}

	input[type=date] {
		padding: 8px;
		display: block;
		border: none;
		border-bottom: 2px solid #808080;
		width: 100%;
		color: #000099;
		font-family: Times, serif;
	}

	input[type="text"]:disabled {
		padding: 8px;
		display: block;
		border: none;
		border-bottom: none;
		width: 100%;
		color: #000099;
		font-family: Times, serif;
	}


	input[type=password] {
		padding: 8px;
		display: block;
		border: none;
		border-bottom: 2px solid #808080;
		width: 100%;
		color: #000099;
		font-family: Courier New, Times, serif;
	}

	#impressao {
		position: absolute;
		left: 25%;
		top: 25%;
		height: 60%;
		width: 50%;
	}

	textarea {
		resize: none;
		color: #000099;
		font-family: Courier New, Times, serif;
	}

	input[type=radio] {
		padding: 8px;
		width: 32px;
		font-color: black;
		margin: 2px;
	}

	input[type=checkbox] {
		padding: 8px;
		width: 32px;
		font-color: black;
	}

	input[type=radio] label {
		position: inline;
		color: black;
		font-color: black;
	}

	#menu_cima {
		position: absolute;
		height: 7%;
		width: 100%;
		top: 0%;
		left: 0;
	}

	#mozella {
		position: -webkit-sticky;
		position: sticky;
		top: 0;
		padding: 5px;
		background-color: #cae8ca;
		border: 2px solid #4CAF50;
		z-index: 2;
	}

	.resposta31 {
		position: relative;
		height: 10%;
		width: 10%;
		top: 50%;
		left: 5%;
	}

	.resposta32 {
		position: relative;
		top: 50%;
		left: 10%;
	}

	.resposta41 {
		position: relative;
		height: 10%;
		width: 10%;
		top: 50%;
		left: 45%;
	}

	.resposta42 {
		position: relative;
		top: 50%;
		left: 50%;
	}

	.morna {
		padding: 1px;
		margin: 2px;
		width: 150px;
	}

	.nove_nove {
		width: 100%;
		height: 90%;
		padding: 2px 2px;
	}

	#corpo_baixo {
		position: absolute;
		height: 90%;
		width: 100%;
		top: 10%;
		left: 0;
		overflow-x: hidden;
	}

	.bibota {
		list-style-type: none;
		margin: 0;
		padding: 0;
		overflow: hidden;
	}

	.bibota li {
		float: left;
	}

	ul {
		height: 100%;
		list-style-type: none;
		margin: 0px 1px;
		padding: 0px 1px;
		overflow: hidden;
	}


	ul li {
		display: block;
		float: left;
		color: White;
		width: 130px;
		padding: 8px 8px;
		font-size: 12px;
		height: 100%;
	}

	ul li a {
		display: block;
		color: white;
		text-align: center;
		text-decoration: none;
	}

	ul li a:hover {
		background-color: #CCCCCC;
		color: black;
	}

	table {
		width: 100%;
		font-size: 12px;
	}

	table th {
		background-color: #75B4FF;
		height: 10%;
		font-size: 12px;
		margin: 3px;
		padding: 2px;
		border: 3px;
	}

	table.bambino {
		border: 1px solid #FFFFAA;
	}

	table th,
	td {
		padding: 1px;
	}

	#entrada1 {
		position: absolute;
		left: 100px;
		top: 5px;
		width: 77%;
	}

	#entrada {
		text-align: center;
		font-size: 20px;
		color: #276cad;
		margin: 12px 15px;
	}

	#utilizador1 {
		position: absolute;
		top: 5%;
		left: 85%;
		width: 15%;
		height: 90%;
		text-align: center;
		padding: 0;
		border-collapse: collapse;
	}

	#utilizador2 {
		text-align: center;
		font-size: 10px;
		color: #276cad;
		font-variant: small-caps;
		height: 33%;
	}


	#utilizador3 {
		text-align: center;
		font-size: 10px;
		color: blue;
		font-style: italic;
		height: 33%;
	}

	#utilizador4 {
		text-align: center;
		vertical-align: middle;
		font-size: 8px;
		color: blue;
		font-style: italic;
		height: 34%;
	}

	.linha1 {
		;
		border-bottom: 5px;
	}

	.lassie1 {
		position: relative;
		left: 0%;
		top: 0%;
		width: 100%;
		height: 12% display: block;
	}

	.lassie1 {
		position: relative;
		left: 0%;
		top: 15%;
		width: 100%;
		heighttt: 33% display: block;
	}

	.lassie2 {
		position: relative;
		left: 0%;
		top: 40%;
		width: 100%;
		height: 33%;
		display: block;
	}

	div.ensaio {
		display: block;
		width: 100%;
		left: 1%;
		background-color: #FDFEFF;
		border-radius: 1px;
		padding: 5px;
		border: 1px;
		margin-top: 1px;
	}

	.join_me {
		display: inline-block;
		width: 100%;
		left: 1%;
		//background-color:#FDFEFF;
		border-bottom: 1px;
		color: blue;
		text-align: right;
		font-size: 12px;
		padding-bottom: 1px;
		border-bottom: 2px solid black;
	}

	div.ensaio_e {
		display: block;
		width: 100%;
		left: 5%;
		background-color: #FDFEFF;
		border-radius: 1px;
		padding: 1px;
		border: 1px;
		margin: 1px;
	}

	.join_me_e {
		display: inline-block;
		width: 12.5%;
		left: 1%;
		border-bottom: 1px;
		color: blue;
		text-align: center;
		font-size: 12px;
		margin: 10px;
		padding-bottom: 1px;
		border-bottom: 2px solid black;
	}

	.join_me_ee_ {
		display: inline-block;
		width: 98%;
		left: 1%;
		background-color: White;
		border-bottom: 1px;
		color: blue;
		text-align: center;
		font-size: 12px;
		margin: 0.1%;
		padding-left: 1%;
		padding-bottom: 1px;
		border-bottom: 1px solid black;
		vertical-align: top;
	}

	.join_me_ee_ span {
		align: right;

	}

	button.ensaio {
		display: inline-block;
		width: 100%;
		opacity: 0.9;
		padding: 3px;
		margin-top: 5px;
	}

	.musica {
		position: static;
		display: inline;
		width: 135px;
		opacity: 0.9;
		padding: 3px;
		margin: 5px;
	}

	input.maior {
		top: 0px;
		left: 0px;
		height: 100%;
		width: 100%;
	}

	#mali {
		position: absolute;
		left: 15%;
		top: 5%;
		height: 80%;
		width: 70%;
	}

	.jooo {
		position: absolute;
		top: 15px;
		right: 5%;
		width: 250px;
		height: 30px;
	}

	a.africa_do_sul_1 {
		position: relative;
		top: 1%;
		left: 1%;
		width: 98%;
		height: 5%;
	}

	textarea.africa_do_sul {
		position: relative;
		top: 6%;
		left: 1%;
		width: 98%;
		height: 545px;
	}

	#imagem111 {
		position: absolute;
		display: none;
		left: 0px;
		top: 0px;
		width: 900px;
		height: 700px;
		z-index: 3;
		border: 1px;
		margin: 1px;
	}

	.mju {
		position: relative;
		width: 100%;
		padding: 1%;
	}

	.contogo {
		display: block;
		position: relative;
		padding-left: 5px;
		margin-bottom: 5px;
		cursor: pointer;
		font-size: 12px;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	/* Hide the browser's default radio button */
	.contogo input {
		position: absolute;
		opacity: 50;
		cursor: pointer;
	}

	/* Create a custom radio button */
	.contudo {
		position: absolute;
		top: 0;
		left: 0;
		height: 25px;
		width: 25px;
		background-color: #eee;
		border-radius: 50%;
	}

	/* On mouse-over, add a grey background color */
	.contogo:hover input~.contudo {
		background-color: #ccc;
	}

	/* When the radio button is checked, add a blue background */
	.contogo input:checked~.contudo {
		background-color: #2196F3;
	}

	/* Create the indicator (the dot/circle - hidden when not checked) */
	.contudo :after {
		content: "";
		position: absolute;
		display: none;
	}

	/* Show the indicator (dot/circle) when checked */
	.contogo input:checked~.contudo :after {
		display: block;
	}

	/* Style the indicator (dot/circle) */
	.contogo .contudo :after {
		top: 9px;
		left: 9px;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: white;
	}
	
	.Agatha {
	position: sticky;
	left: 13%;
	top: 15%;
	width: 75%;
	margin: 0;
	overflow-x: auto;
}

	.DMP_Style{
		
	}


	@media (max-width: 1000px) {

		body {
			font-size: 10px;
		}

		input {
			width: 100%;
		}

		.maquinas {
			font-size: 12px;
			z-index: 6;
			width: 32px;
			height: 50%;
		}

		ul li {
			float: left;
			color: White;
			padding: 4px 4px;
			font-size: 10px;
		}

		table {
			width: 100%;
			font-size: 10px;
		}

		#utilizador1 {
			position: absolute;
			top: 0%;
			left: 85%;
			width: 15%;
			height: 90%;
			text-align: center;
			padding: 0;
			border-collapse: collapse;
		}

		#utilizador2 {
			text-align: center;
			font-size: 8px;
			color: #276cad;
			font-variant: small-caps;
			height: 25%;
		}

		#utilizador3 {
			text-align: center;
			font-size: 8px;
			color: blue;
			font-style: italic;
			height: 25%;
		}

		#utilizador4 {
			text-align: center;
			vertical-align: middle;
			font-size: 8px;
			color: blue;
			font-style: italic;
		}

		.micas legend {
			font-size: 7px;
		}

		.nove_nove {
			width: 99%;
			height: 90%;
		}

		#corpo_baixo {
			position: absolute;
			height: 80%;
			width: 100%;
			top: 20%;
			left: 0;
			overflow-x: hidden;
		}

		#menu_cima {
			position: absolute;
			height: 12.5%;
			width: 100%;
			top: 0%;
			left: 0;
			background-color: #cae8ca;
		}

		div.ensaio {
			display: block;
			width: 100%;
			left: 1%;
			background-color: #FDFEFF;
			border-radius: 1px;
			padding: 5px;
			border: 1px;
			margin-top: 1px;
		}

		.join_me {
			display: inline-block;
			width: 100%;
			left: 1%;
			//background-color:#FDFEFF;
			border-bottom: 1px;
			color: blue;
			text-align: right;
			font-size: 8px;
			padding-bottom: 1px;
			border-bottom: 1px solid black;
		}


	}
</style>

<body>
	<div id=max>
		<div id=cima>
			<a class="w3schools-logo" href=""><img src="img/olesa.png" height=80% alt="">
			</a>

			<table id="entrada1">
				<tr>
					<td id="entrada">Entrada</td>
				</tr>
			</table>

			<table id="utilizador1">
				<tr>
					<td id="utilizador2">Utilizador: <a id="utilizador3">Utilizador<a></td>
				</tr>
				<tr>
					<td id="utilizador4"><input class="w3-btn w3-white w3-border w3-border-blue w3-round-large w3-text-blue " type="button" value="Terminar Sessão" onclick="terminar_sessao()"></td>
				</tr>
			</table>
		</div>
		<div id=menu_principal>

		</div>
		<div id=corpo>


			<?php
			if (array_key_exists('login', $_SESSION)) {

				echo '<script type="text/javascript">
		iniciar();
		document.getElementById("entrada").innerHTML="Início";
		document.getElementById("utilizador3").innerHTML="' . $_SESSION["login"] . '";
	</script>';
			} else {
				echo '<script type="text/javascript">
		iniciar_sessao();
		document.getElementById("entrada").innerHTML="";
		document.getElementById("utilizador1").innerHTML="";
	</script>';
			}

			?>
		</div>
		<div id=baixo>
			<footer class="w3-text-white  w3-round-large" style="text-align: center">ISPT - Injecção e serigrafia de plásticos técnicos, lda</footer>

		</div>

		<div id='imagem111' class="w3-white w3-border-black "> <canvas id='quadro1000' class='quadro1000' position=relative width=900px height=600px style='background:beige' onmousemove='marca(event,"quadro1000")'></canvas>
			<input type="button" class="musica w3-btn w3-white w3-border w3-border-blue w3-round-large w3-text-blue " onclick="mudar()" value="linha">
			<input type="button" class="musica w3-btn w3-white w3-border w3-border-blue w3-round-large w3-text-blue " onclick="mudar_1()" value="seta">
			<input type="button" class="musica w3-btn w3-white w3-border w3-border-blue w3-round-large w3-text-blue " onclick="colocar_2()" value="Filtro Branco">
			<input type="button" class="musica w3-btn w3-white w3-border w3-border-blue w3-round-large w3-text-blue " onclick="colocar_1()" value="1">
			<input type="button" class="musica w3-btn w3-white w3-border w3-border-blue w3-round-large w3-text-blue " onclick="gravar_imagem()" value="Alterar imagem">
			<input type="button" class="musica w3-btn w3-white w3-border w3-border-blue w3-round-large w3-text-blue " onclick="cancelar_imagem()" value="Cancelar">

		</div>
</body>

</html>

<script type="text/javascript">
	corrigir();

	if (detectar_mobile() == true) {

		openFullscreen();

	}
	//desabilita menu de opções após clicar no botão direito
	function desabilitaMenu(e) {
		if (window.Event) {
			if (e.which == 2 || e.which == 3)
				return false;
		} else {
			event.cancelBubble = true
			event.returnValue = false;
			return false;
		}
	}

	//desabilita botão direito
	function desabilitaBotaoDireito(e) {

		if (window.Event) {
			if (e.which == 2 || e.which == 3)
				//alert(e.id);
				return false;
		} else
		if (event.button == 2 || event.button == 3) {
			alert("a");
			event.cancelBubble = true
			event.returnValue = false;
			return false;
		}
	}

	//desabilita botão direito do mouse
	if (window.Event)
		document.captureEvents(Event.MOUSEUP);
	if (document.layers)
		document.captureEvents(Event.MOUSEDOWN);

	//document.oncontextmenu = desabilitaMenu;
	//document.onmousedown = desabilitaBotaoDireito;
	//document.onmouseup = desabilitaBotaoDireito;


	//drag here
</script>