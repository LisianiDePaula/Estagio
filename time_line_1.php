<?php

session_start();

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

date_default_timezone_set('Europe/Lisbon');

if (array_key_exists("login", $_SESSION)) {

	$link = new mysqli("localhost", "root", "", "ensaio_de_moldes");

	if ($link->connect_errno) {
		echo "Failed to connect to MySQL: (" . $link->connect_errno . ") " . $link->connect_error;
	}

	if (!empty($_GET['data'])) {
		$data = $_GET['data'];
	}

	if (!empty($_GET['turno'])) {
		$turno = $_GET['turno'];
	}

	if (!empty($_GET['verdade'])) {
		$verdade = $_GET['verdade'];
	}

	$nothing = "";
	$box_obs = ""; //Modal Box observações 

	$data = date('Y-m-d', strtotime($data));

	$data1 = date('Y-m-d');

	$numero_peças = 0;

	$nhnh = "";

	if ($verdade == 2) {
		$nhnh = " disabled ";
	}

	$consulta1 = "SELECT * FROM `relatorio` WHERE `sonic03`='$data' ORDER BY `sonic12`";

	$result1 = mysqli_query($link, $consulta1);

	while ($rs1 = mysqli_fetch_array($result1)) {

		$consulta2 = "SELECT `relatorio`.`sonic12` as maquina, `relatorio`.`id_ensaio` as of,`relatorio`.`id_OF`, `relatorio`.`sonic02`,`relatorio`.`sonic08` , moldes.designacao_peca as designacao, moldes.id_molde as molde_id FROM `relatorio`, moldes WHERE relatorio.id_ensaio='" . $rs1['id_ensaio'] . "' AND relatorio.id_molde=moldes.id_molde";


		$result2 = mysqli_query($link, $consulta2);

		$nothing .= "<div  class='ensaio w3-white w3-border w3-border-black w3-round-large w3-text-black' name='ordem_de_cristo'>";

		$nothing .= '<table>
						<tr>
							<th width="100%" >Selecionar posto de trabalho</th>
							<th colspan=3><input name=fiusa type="checkbox" onchange=selecao_a_ver()></th>
						</tr>
					</table>';

		$nothing .= '<table>
						<tr><th>Máquina de Injecção nº</th></tr>
							<table width=70%>
								<tr>
									<td width="100%" >
									<strong><input  class="mju w3-btn  w3-white w3-border w3-border-black w3-round-large w3-text-black" type=button value="Troca de Turno (Click para selecionar)" onclick=TabelaRejeicao("TrocaTurno-")></strong>
									</td>
								</tr>
							</table>
					</table>';
//////Começando a separar a divi "Maquina" para deixar visivel as informções relacionadas a ordem de fabrico e demias do mesmo trecho! Este é o ponto de start//////
		$nothing .= '<div id="TrocaTurno-" style="background-color: rgba(0, 0, 0, 0.75);  display:none" class="obs_out_box">';
		$nothing .= "<table class='w3-centered w3-border-left font-size=9px' width=90%>";

		while ($rs2 = mysqli_fetch_array($result2)) {

			$sql_gh = "SELECT `registo` FROM `registo_producao` WHERE `id`='" . $rs2['of'] . "'";

			$result2_fg = mysqli_query($link, $sql_gh);

			$operador1 = "";
			$operador2 = "";
			$operador3 = "";

			while ($rs23 = mysqli_fetch_array($result2_fg)) {
				$valor_cat = $rs23['registo'];

				$controlar1 = json_decode($valor_cat, TRUE);

				$operador1 = $controlar1['g'];
				$operador2 = $controlar1['m'];
				$operador3 = $controlar1['s'];
			}

			$ord_trabalho = $rs2['of'];

			$sql_mmm = "SELECT `tempo_ciclo_real` FROM `registo_paragens` WHERE `id_tra`=" . $rs2['of'] . " and `indice`=(SELECT max(`indice`) FROM `registo_paragens` WHERE `id_tra`=" . $rs2['of'] . ")";

			$result2_mmm = mysqli_query($link, $sql_mmm);

			$tempo_ciclo_11 = 0;
			while ($rs231 = mysqli_fetch_array($result2_mmm)) {
				$tempo_ciclo_11 = $rs231['tempo_ciclo_real'];
			}

			$name = 'name=turno' . $rs2['of'];

			$codigo = 'id=codigo' . $rs2['of'];

			$ordem_fabrico = 'id=of' . $rs2['of'];

			$maquina = $rs2['maquina'];

			switch ($turno) {
				case 1:
					$operador = $operador1;
					break;

				case 2:
					$operador = $operador2;
					break;

				case 3:
					$operador = $operador3;
					break;

				default:
					$operador = "---";
					break;
			}

			if ($turno == 1) {
				$tttt = " Checked ";
			} else {
				$tttt = " disabled ";
			}

			$bico = 'http://localhost:8080/json/numero_cavidades.php?molde=' . $rs2['molde_id'];
			// pelos arquivos estarem em porta diferente, foi add ":8080" 
			$fp = file_get_contents($bico);


			//$controlar1=json_decode($fp,TRUE);


			$data_1 = date('d-m-Y', strtotime($data));

			$brbr = " onchange=mudar_turno('$data_1',1) ";

			$nothing .= '<tr><th colspan=21>Máquina de Injecção nº <a>' . $maquina . '</a></th></tr>';

			///////////////
			$rejeição = array(); //rejeição
			$nothing .= '<tr>'; //cabeçalho 
			$nothing .= '<td colspan=2></td>';
			#$nothing .= '<td>Nº de operador</td>';
			#$nothing .= '<td>Peças boas</td>';
			#$nothing .= '<td>Rejeição</td>';
			$nothing .= '<td>Tempo de ciclo</td>';
			$nothing .= '<td>Contagem da máquina</td>';
			$nothing .= '<td>Observações</td>';
			//$nothing.='<td>Peças qualidade</td>';
			//$nothing.='<td>Peças armazem</td>';
			$nothing .= '</tr>';

			$arr_turnos = array("Turno A", "Turno B", "Turno C");
			for ($i = 0; $i < count($arr_turnos); $i++) {
				$_turno = $i + 1;

				//checkar turno & habilitar inputs
				if ($_turno == $turno) {
					$checkar = "checked";
					$habilitar = "";
				} else {
					$checkar = "";
					$habilitar = "disabled";
				}
/////////////////////////////

				$id_div_obs = "id = 'div_obs_$ord_trabalho-$_turno'";
				if (!isset($rejeição[$i])) {
					$rejeição[$i] = 0;
				}

				$nothing .= '<tr>'; 
/////////////////entradas Turnos
				$nothing .= '<td colspan=2><input type="radio" ' . $checkar . ' name="turno-' . $ord_trabalho . '" onchange="verificar_turno(this.name)">' . $arr_turnos[$i] . '</td>'; 
/////////////////radio button turno
				/* comentado para não mostrar mais as informações: nº Operador; Peças boas e Rejeição///////
				$nothing .= '<td><input ' . $habilitar . ' class="w3-center ionica" placeholder="Operador" name="' . $ord_trabalho . '-inpt-' . $i . '" onkeypress="gravar_input_prod(this.name, ' . $_turno . ', ' . $ord_trabalho . '.)"></td>';
/////////////////input numero operador

				$nothing .= '<td><input ' . $habilitar . ' class="w3-center ionica" type="number" placeholder="000" name="' . $ord_trabalho . '-inpt-' . $i . '"></td>'; 
/////////////////input Peças boas
				
				$nothing .= '<td><input type="button" value="' . $rejeição[$i] . '" style="border:none; width:100%; background-color: transparent"></td>'; 
//////////////////Rejeição
				*/
				$nothing .= '<td><input ' . $habilitar . ' class="w3-center ionica" type="number" placeholder="0" name="' . $ord_trabalho . '-inpt-' . $i . '"></td>'; 
//////////////////input Tempo de ciclo

				$nothing .= '<td><input ' . $habilitar . ' class="w3-center ionica" type="number" placeholder="0" name="' . $ord_trabalho . '-inpt-' . $i . '"></td>'; 
//////////////////input Contagem da máquina

				$nothing .= '<td><input ' . $habilitar . ' type="button" value="adicionar obs." id="obs-' . $i . '" style="width: 100%; height: 100%;" 
					onclick="add_obs(' . $_turno . ',' . $ord_trabalho . ', \'div_obs_\')" name="' . $ord_trabalho . '-inpt-' . $i . '"></td>'; 
///////////////////input Observações


				//$nothing.='<td><textarea id="obs-'.$i.'" style="width: 100%; height: 18px; border: none"></textarea></td>';//input Observações
				//$nothing.='<td><input type="button" value="-" style="border:none; cursor:pointer; width:100%; background-color: transparent"></td>';//peças qualidade
				//$nothing.='<td><input type="button" value="0" style="border:none; cursor:pointer; width:100%; background-color: transparent"></td>';//peças armazem
				//$nothing.='<td></td>';
				/*$nothing.='<td colspan=6></td> 
				<td colspan=5>Turno A</td><td colspan=5>Turno B</td><td colspan=5>Turno C</td>';*/
				$nothing .= '</tr>';
				/*$nothing.="<div style='display:block; position: fixed; top:20%; right:30%; background:#FEFEFE; z-index:10;'>
				</div>";*/
			}


			$brbr = " onchange=mudar_turno('$data_1',3) ";
			$ordem_fabrico1 = $rs2['id_OF'];
			$cod_peca = $rs2['sonic02'];
			$materia_prima = $rs2['sonic08'];
			$des_peca = $rs2['designacao'];

			/*/////////////////////  Acumulado
			$consulta_acumulado = "SELECT SUM(`Pecas_boas`) as acumulado FROM `registo_producao` WHERE OF = $ordem_fabrico1";
			$sql_acumulado = mysqli_query($link,$consulta_acumulado);
			$result_acumulado = mysqli_fetch_assoc($sql_acumulado);*/

			//////////////////////  Numero de peças a produzir
			$consulta_num_pecas = "SELECT `Num_pecas`, `producao_minima` FROM `ordem_fabrico` WHERE `id_ensaio` = $ordem_fabrico1";
			$sql_num_pecas = mysqli_query($link, $consulta_num_pecas);
			$result_num_pecas = mysqli_fetch_assoc($sql_num_pecas);
			////////////////////
//////////////////Finalizar a div do modal aqui!!!!!!!!
			$nothing .= '<table>
								<table width=100%>
										<tr>
											<td>
											<strong><input  class="mju w3-btn  w3-white w3-border w3-border-black w3-round-large w3-text-black" type=button 	value=" Confirmar seleção!" onclick=sair_selecao()></strong>
											</td>
										</tr>
								</table>
							</table>
				</table>';
			$nothing .= '</div>';
////////////Informações que sairam do modal "maquinas"///// 			
			$nothing .= '
			<table width=100%><tr><td>Ordem de fabrico:<br> <a ' . $ordem_fabrico . ' name=' . $ordem_fabrico1 . '> ' . ltrim(substr($ordem_fabrico1, -4), 0) . '</a></td>
					<td>Código Peça:<br><a ' . $codigo . '>' . $cod_peca . '</a></td>
					<td>Matéria Prima:<br><a>' . $materia_prima . '</a></td>
					<td>Peça:<br> <a >' . $des_peca . '</a></td>
					
					<td><label>Quantidade a produzir||Produção Minima)</label><br>' . $result_num_pecas["Num_pecas"] . "||" . $result_num_pecas["producao_minima"] . '</td>

					<td>id trabalho: <br><a name="ordens_trabalho" id=horas_' . $ord_trabalho . '>' . $ord_trabalho . '</a></td>
					</tr>
			</table>';
///////////////$rs1['id_ensaio']$rs2['of']

//////////////INICIO TRABALHO ESTADOS DE PARAGENS ////// (Se tudo der errado, dar crtl+Z até aqui!)/////			
			//tabela registro de paragens
			//cabeçalho
			$nothing .= '<tr><form>';
			$brbr = " onchange=analise_producao(" . $rs2['of'] . "," . $turno . ") ";
			$bbbb = $rs2['of'];

			$resultado_final = 0;

			$sql_1 = "SELECT * FROM `registo_paragens` WHERE `id_tra`='$bbbb' and `indice`=(SELECT MAX(`indice`) FROM registo_paragens WHERE `id_tra`='$bbbb')";

			//$sql_1 = "SELECT `estado_maquina` FROM `time_line` WHERE `id_tra`='$bbbb'";
			$resultbbbb = mysqli_query($link, $sql_1);

			while ($rsccc = mysqli_fetch_array($resultbbbb)) {
				$resultado_final = $rsccc['paragem'];
			}

			$tttt = "";
			if ($resultado_final == 1) {
				$tttt = " checked ";
			}

			$name = 'name=contigo' . $rs2['of'];
			$nothing .= '</tr></table></form>';
/////////////Start table "Estado de paragens"////////////////////////////////////////////////////////
			$brbr=" onchange=analise_producao(".$rs2['of'].",".$turno.") ";
					
			$bbbb=$rs2['of'];
					
			$resultado_final=0;
					
			$sql_1 = "SELECT * FROM `registo_paragens` WHERE `id_tra`='$bbbb' and `indice`=(SELECT MAX(`indice`) FROM registo_paragens WHERE `id_tra`='$bbbb')";
					
			//$sql_1 = "SELECT `estado_maquina` FROM `time_line` WHERE `id_tra`='$bbbb'";
					
			$resultbbbb= mysqli_query($link, $sql_1);
					
				while($rsccc = mysqli_fetch_array($resultbbbb)){
					$resultado_final=$rsccc['paragem'];	
					}
				$tttt="";	
					if($resultado_final==1){
						$tttt=" checked ";
					}
			$name='name=contigo'.$rs2['of'];

			$nothing .= '<table><tr><th>Registro de paragens</th></tr>					
							<table width=100%>
									<tr>
										 <td>
										 <strong><input  class="mju w3-btn  w3-white w3-border w3-border-black w3-round-large w3-text-black" 			type=button value="Adicionar Paragem ( Última paragem: ' . $bbbb . ' )" onclick="TabelaRejeicao(\'Paragens-' . $bbbb . '\')"></			strong>
										  </td>
									  </tr>
							</table>
						</table>';

/////////$rs1['id_ensaio']$rs2['of']
		$nothing .= '<div id="Paragens-' . $bbbb . '" style="background-color: rgba(0, 0, 0, 0.75);  display:none" class="obs_out_box">';

		$nothing.='<table>
						<th colspan=21>Motivo da Paragem</th>';
		//tabela registro de paragens

		$nothing.='<tr><form>';
////////tentando transformar a table ckec em select/// ponto de START
		$nothing.='<td><label class="contogo">Em produção<input '.$nhnh.$tttt.$brbr.$name.' class="contigo" type=radio value=1><span class="contugo"></span></label>';

		$nothing.='</td>';
		$nothing.='<td ><label class="contogo">Fim Produção<input '.$nhnh.$tttt.$brbr.$name.' class="contigo" type=radio value=2><span class="contugo"></span></label>';

		$tttt="";	
		if($resultado_final==3){
			$tttt=" checked ";
		}
		$nothing.='</td>';
		$nothing.='<td ><label class="contogo">Avaria Máquina<input '.$nhnh.$tttt.$brbr.$name.' class="contigo" type=radio value=3><span 		class="contugo"></span></label>';

		$tttt="";	
		if($resultado_final==4){
			$tttt=" checked ";
		}
		$nothing.='</td>';
		$nothing.='<td ><label class="contogo">Avaria Molde<input '.$nhnh.$tttt.$brbr.$name.' class="contigo" type=radio value=4><span 		class="contugo"></span></label>';

		$tttt="";	
		if($resultado_final==5){
			$tttt=" checked ";
		}
		$nothing.='</td>';
		$nothing.='<td ><label class="contogo">Avaria Robôt<input '.$nhnh.$tttt.$brbr.$name.' class="contigo" type=radio value=5><span 		class="contugo"></span></label>';

		$tttt="";	
		if($resultado_final==6){
			$tttt=" checked ";
		}
		$nothing.='</td>';
		/////////Ajuste parâmetros
		$nothing.='<td ><label class="contogo">Ajuste parâmetros<input '.$nhnh.$tttt.$brbr.$name.' class="contigo" type=radio value=6><span 		class="contugo"></span></label>';

		$tttt="";	
		if($resultado_final==7){
			$tttt=" checked ";
		}
		$nothing.='</td>';

		///////Mudança molde
		$nothing.='<td ><label class="contogo">Mudança molde<input '.$nhnh.$tttt.$brbr.$name.' class="contigo" type=radio value=7><span 		class="contugo"></span></label>';
		$nothing.='</td>';
		$tttt="";	
		if($resultado_final==8){
			$tttt=" checked ";
		}
		$nothing.='</td>';

		$nothing.='<td ><label class="contogo">Outras Paragens<input '.$nhnh.$tttt.$brbr.$name.' class="contigo" type=radio value=7><span 		class="contugo"></span></label></td>';
		$tttt="";	
		if($resultado_final==9){
			$tttt=" checked ";
		}
		$nothing.='</td>';

			//cabeçalho
		$nothing.='<table>';	
						$nothing.='<tr>';
							$nothing.='<th>Incio da paragem</th>';
							$nothing.='<th>Fim da paragem</th>';
						$nothing.='</tr>';
		//			
						$nothing.='<tr>';
							$nothing.='<td><input type="datetime-local" class=""><input type="button" value=" Confirmar " onclick=()></td>';
							$nothing.='<td><input type="datetime-local" class=""><input type="button" value=" Confirmar " onclick=()></td>';
						$nothing.='</tr>';
						
		$nothing.='</table>';

		$nothing .= '<table>
						<table width=100%>
							<tr>
								<td>
									<strong><input  class="mju w3-btn  w3-white w3-border w3-border-black w3-round-large w3-text-black" type=button 	value=" Confirmar seleção!" onclick=sair_selecao()></strong>
								</td>
								</tr>
						</table>
					</table>';


		$nothing.='</table></form>';
		$nothing.='</div>';



/*$inserirParagem .= "INSERT INTO tabela (coluna1, coluna2, coluna3)
								VALUES (valor1, valor2, valor3)";
*/
/*$inserirParagem .= "INSERT INTO `registo_paragens`(`of`,`id_OF`, `indice`, `inicio`, `fim`, `descicao`)
								    VALUES ('$of','$id_OF','$indice','$inicio','$fim','$valor')";
$consulta1= "UPDATE `registo_paragens` SET $onchange WHERE `of`='$of' and `turno`='$turno' and `indice`='$indice'";	

$indice = ['indice'];

$nothing .= '<div id="Paragens-' . $bbbb . '" style="background-color: rgba(0, 0, 0, 0.75);  display:none" class="obs_out_box">';
$nothing .= '<table class="obs_box w3-white w3-border w3-border-black w3-round-large w3-text-black">';
$nothing .= '<tr>
				<th >Adicionar Paragem</th>
				<th >Data Inicio da paragem</th>			
				<th >Data Fim da paragem</th>
			</tr>
			<tr>	
				<td>
					<select id="MotivosParagens"> 
						<option placeholder="Selecione a opção">Selecione a opção</option>
						<option value="1">Fim de Produção  						 </option>
						<option value="2">Avaria Maquina   						 </option>
						<option value="3">Avaria Molde	   						 </option>
						<option value="4">Avaria Robot	   						 </option>
						<option value="5">Alteração Setup (ajustes de parametros)</option>
						<option value="6">Outros     	   						 </option>
						<option value="7">Outros     	   						 </option>
					</select>
				</td>
				<td><input type="datetime-local"></td>	
				<td><input type="datetime-local"></td>	
			</tr>
			<tr>
				<td>
					<strong><input  class="mju w3-btn w3-white w3-border w3-border-black w3-round-large w3-text-black" type=button		
					value="Gravar" onclick=""()></strong>
				</td>
			</tr>';
$nothing .= '</table>';
$nothing .= '</div>';*/
///////////////////////////////////////////////////	
///////////End table "Estado de paragnes"//////////////
////////////buttons OK and nok///////
			$diplay_button_OK = "SELECT COALESCE(SUM(`pecas_boas`),0) AS pb, COALESCE(SUM(`rejeicao`),0) AS Rejeicao FROM `registro_producao` WHERE `ordem_fabrico`= $ordem_fabrico1";

			$sql_pecas_boas = mysqli_query($link, $diplay_button_OK);
			$result_num_pecas = mysqli_fetch_assoc($sql_pecas_boas);
			//var_dump($result_num_pecas); (para imprimir na tela o conteudo da array)
			$nothing .= '<table>
							<tr><th>Liberar Peças</th></tr>					
								<table width=100%>
									<tr>
										<td width="50%" >
										<strong><input  class="mju w3-btn  w3-green w3-border w3-border-black w3-round-large w3-text-black" type=button value="OK: ' . $result_num_pecas['pb'] . '" onclick=tornar_invisivel()></strong>
										</td>
										<td width="50%">
										<strong><input class="mju w3-btn w3-red w3-border w3-border-black w3-round-large w3-text-black" type=button value="NOK: '  . $result_num_pecas['Rejeicao'] . '" onclick=TabelaRejeicao("Invisible-' . $ordem_fabrico1 . '")></strong>
										</td>
									</tr>
								</table>
						</table>';
////////////ponto de inicio para ocultar esta tabela e tornar visivel no button "NOK"	
			$nothing .= '<div id="Invisible-' . $ordem_fabrico1 . '" style="background-color: rgba(0, 0, 0, 0.75);  display:none" class="obs_out_box" >';
			$nothing .= '<table class="Agatha w3-btn w3-white w3-border w3-border-black w3-round-large w3-text-black">';
			$nothing .= '<th colspan= 20 class="w3-border w3-border-black"> Tipo de rajeição da peça <br> (A tabela fechara automaticamente após selecionar)</th>';
			$travassos = $rs2['of'];

/////////////tipologia rejeição
			$id_rej = array(
				"Arranque",
				"Empeno/deformação",
				"Soldadura(Disco puroso)",
				"Raiados/estrias",
				"Manchas",
				"Falta de Material",
				"Deformação Superficie",
				"Válvula (NOK Teste pressão)",
				"Partidas",
				"Outros",
				"Riscos",
				"Fio de gito",
				"Navalhada",
				"Gases",
				"Queimados",
				"Rebarbas",
				"Material Contaminado",
				"Marcas de Fluxo",
				"Linhas de Fecho",
				"Afundamento (Ponto de injecção)",
				"Marcas de extratores",
				"Nok teste de rigidez",
				"Cor não conforme",
				"Fissuras",
				"Bolhas",
				"Brilhos",
				"Casquilhos Sobreposto",
				"Ajuste de Parametros"
			);
////////////ponto de partida para mudança!Se tudo der errado, dar Ctrl+Z até aqui///////
			$nothing .= '<tr>';
			for ($i = 0; $i < 8; $i++) 
			{
				if ($i != 2 && $i != 7) {
					$nothing .= '<td><input class="mju w3-btn w3-white w3-border w3-border-black w3-text-black" type=button value="' . $id_rej[$i] . '" onclick=add_rejei(' . $i . ',' . $travassos . ',"",' . $turno . ')></td>';
				}
			}
			$nothing .= '</tr>';
//////////////Fazer com que essa informação seja mostrada no botão acima
			$somid = 'aaa' . $travassos . 'bbb';
			for($i= 0; $i <8; $i++){
				$sql = "SELECT * FROM `registo_rejeicoes` WHERE `of`=" . $rs2['of'] . " AND `indice`=$i" . " AND `turno`=$turno ";
				$resultsql = mysqli_query($link, $sql);
				$valor1 = 0;
				while ($rs3 = mysqli_fetch_array($resultsql)) {
				$valor1 = $rs3['qnt'];
				}
					if ($i != 2 && $i != 7) {	
					$nothing .= '<td><input  class="ionica" name=' . $somid . ' type=number value=' . $valor1 . ' id=' . $somid . $i.' onchange=add_rejei_1('.	$i.','. $travassos . ',"",' . $turno . ')>';
				}
			}
/////////////////termina coluna "8" ////////////
			$nothing .= '<tr>';
			for ($i = 8; $i < 14; $i++) {
				if ($i != 2 && $i != 7) {
					$nothing .= '<td><input class="mju w3-btn w3-white w3-border w3-border-black w3-text-black" type=button value="' . $id_rej[$i] . '" onclick=add_rejei(' . $i . ',' . $travassos . ',"",' . $turno . ')></td>';
				}
			}
			$nothing .= '</tr>';

			for($i= 8; $i <14; $i++){
				$sql = "SELECT * FROM `registo_rejeicoes` WHERE `of`=" . $rs2['of'] . " AND `indice`=$i" . " AND `turno`=$turno ";
				$resultsql = mysqli_query($link, $sql);
				while ($rs3 = mysqli_fetch_array($resultsql)) {
				$valor1 = $rs3['qnt'];
				}
					if ($i != 2 && $i != 7) {	
					$nothing .= '<td><input  class="ionica" name=' . $somid . ' type=number value=' . $valor1 . ' id=' . $somid . $i.' onchange=add_rejei_1('.	$i.','. $travassos . ',"",' . $turno . ')>';
				}
			}
////////////////termina coluna "14" ////////////
			$nothing .= '<tr>';
			for ($i = 14; $i < 20; $i++) {
				if ($i != 2 && $i != 7) {
					$nothing .= '<td><input class="mju w3-btn w3-white w3-border w3-border-black w3-text-black" type=button value="' . $id_rej[$i] . '" onclick=add_rejei(' . $i . ',' . $travassos . ',"",' . $turno . ')></td>';
				}
			}
			$nothing .= '</tr>';
			for($i= 14; $i <20; $i++){
				$sql = "SELECT * FROM `registo_rejeicoes` WHERE `of`=" . $rs2['of'] . " AND `indice`=$i" . " AND `turno`=$turno ";
				$resultsql = mysqli_query($link, $sql);
				while ($rs3 = mysqli_fetch_array($resultsql)) {
				$valor1 = $rs3['qnt'];
				}
					if ($i != 2 && $i != 7) {	
					$nothing .= '<td><input  class="ionica" name=' . $somid . ' type=number value=' . $valor1 . ' id=' . $somid . $i.' onchange=add_rejei_1('.	$i.','. $travassos . ',"",' . $turno . ')>';
				}
			}
	////////// este código fou substituido por laços de loop////
				/*  
			$sql = "SELECT * FROM `registo_rejeicoes` WHERE `of`=" . $rs2['of'] . " AND `indice`=14" . " AND `turno`=$turno ";
			$resultsql = mysqli_query($link, $sql);
			$valor1 = 0;
			while ($rs3 = mysqli_fetch_array($resultsql)) {
				$valor1 = $rs3['qnt'];
			}
			$nothing .= '</td><td><input  class="ionica" name=' . $somid . ' type=number value=' . $valor1 . ' id=' . $somid . '14 onchange=add_rejei_1(14,' . $travassos . ',"",' . $turno . ')>';

			$sql = "SELECT * FROM `registo_rejeicoes` WHERE `of`=" . $rs2['of'] . " AND `indice`=15" . " AND `turno`=$turno ";
			$resultsql = mysqli_query($link, $sql);
			$valor1 = 0;
			while ($rs3 = mysqli_fetch_array($resultsql)) {
				$valor1 = $rs3['qnt'];
			}
			$nothing .= '</td><td><input  class="ionica" name=' . $somid . ' type=number value=' . $valor1 . ' id=' . $somid . '15 onchange=add_rejei_1(15,' . $travassos . ',"",' . $turno . ')>';

			$sql = "SELECT * FROM `registo_rejeicoes` WHERE `of`=" . $rs2['of'] . " AND `indice`=16" . " AND `turno`=$turno ";
			$resultsql = mysqli_query($link, $sql);
			$valor1 = 0;
			while ($rs3 = mysqli_fetch_array($resultsql)) {
				$valor1 = $rs3['qnt'];
			}
			$nothing .= '</td><td><input  class="ionica" name=' . $somid . ' type=number value=' . $valor1 . ' id=' . $somid . '16 onchange=add_rejei_1(16,' . $travassos . ',"",' . $turno . ')>';

			$sql = "SELECT * FROM `registo_rejeicoes` WHERE `of`=" . $rs2['of'] . " AND `indice`=17" . " AND `turno`=$turno ";
			$resultsql = mysqli_query($link, $sql);
			$valor1 = 0;
			while ($rs3 = mysqli_fetch_array($resultsql)) {
				$valor1 = $rs3['qnt'];
			}
			$nothing .= '</td><td><input  class="ionica" name=' . $somid . ' type=number value=' . $valor1 . ' id=' . $somid . '17 onchange=add_rejei_1(17,' . $travassos . ',"",' . $turno . ')>';

			$sql = "SELECT * FROM `registo_rejeicoes` WHERE `of`=" . $rs2['of'] . " AND `indice`=18" . " AND `turno`=$turno ";
			$resultsql = mysqli_query($link, $sql);
			$valor1 = 0;
			while ($rs3 = mysqli_fetch_array($resultsql)) {
				$valor1 = $rs3['qnt'];
			}
			$nothing .= '</td><td><input  class="ionica" name=' . $somid . ' type=number value=' . $valor1 . ' id=' . $somid . '18 onchange=add_rejei_1(18,' . $travassos . ',"",' . $turno . ')>';

			$sql = "SELECT * FROM `registo_rejeicoes` WHERE `of`=" . $rs2['of'] . " AND `indice`=19" . " AND `turno`=$turno ";
			$resultsql = mysqli_query($link, $sql);
			$valor1 = 0;
			while ($rs3 = mysqli_fetch_array($resultsql)) {
				$valor1 = $rs3['qnt'];
			}
			$nothing .= '</td><td><input  class="ionica" name=' . $somid . ' type=number value=' . $valor1 . ' id=' . $somid . '19 onchange=add_rejei_1(19,' . $travassos . ',"",' . $turno . ')>';
			*/
////////////termina coluna "19"//////////
			$nothing .= '<tr>';
			for ($i = 20; $i < 26; $i++) {
				if ($i != 2 && $i != 7) {
					$nothing .= '<td><input class="mju w3-btn w3-white w3-border w3-border-black w3-text-black" type=button value="' . $id_rej[$i] . '" onclick=add_rejei(' . $i . ',' . $travassos . ',"",' . $turno . ')></td>';
				}
			}
			$nothing .= '</tr>';

			for($i= 20; $i <26; $i++){
				$sql = "SELECT * FROM `registo_rejeicoes` WHERE `of`=" . $rs2['of'] . " AND `indice`=$i" . " AND `turno`=$turno ";
				$resultsql = mysqli_query($link, $sql);
				while ($rs3 = mysqli_fetch_array($resultsql)) {
				$valor1 = $rs3['qnt'];
				}
					if ($i != 2 && $i != 7) {	
					$nothing .= '<td><input  class="ionica" name=' . $somid . ' type=number value=' . $valor1 . ' id=' . $somid . $i.' onchange=add_rejei_1('.	$i.','. $travassos . ',"",' . $turno . ')>';
				}
			}
/////////////////////termina coluna "25"
			/*
			$sql = "SELECT * FROM `registo_rejeicoes` WHERE `of`=" . $rs2['of'] . " AND `indice`=20" . " AND `turno`=$turno ";
			$resultsql = mysqli_query($link, $sql);
			$valor1 = 0;
			while ($rs3 = mysqli_fetch_array($resultsql)) {
				$valor1 = $rs3['qnt'];
			}
			$nothing .= '</td><td><input  class="ionica" name=' . $somid . ' type=number value=' . $valor1 . ' id=' . $somid . '20 onchange=add_rejei_1(20,' . $travassos . ',"",' . $turno . ')>';
			#$nothing.='</td></tr>';

			$sql = "SELECT * FROM `registo_rejeicoes` WHERE `of`=" . $rs2['of'] . " AND `indice`=21 " . " AND `turno`=$turno ";
			$resultsql = mysqli_query($link, $sql);
			$valor1 = 0;
			while ($rs3 = mysqli_fetch_array($resultsql)) {
				$valor1 = $rs3['qnt'];
			}
			$nothing .= '<td><input  class="ionica" name=' . $somid . ' type=number value=' . $valor1 . ' id=' . $somid . '21 onchange=add_rejei_1(21,' . $travassos . ',"",' . $turno . ')>';

			$sql = "SELECT * FROM `registo_rejeicoes` WHERE `of`=" . $rs2['of'] . " AND `indice`=22" . " AND `turno`=$turno ";
			$resultsql = mysqli_query($link, $sql);
			$valor1 = 0;
			while ($rs3 = mysqli_fetch_array($resultsql)) {
				$valor1 = $rs3['qnt'];
			}
			$nothing .= '</td><td><input  class="ionica" name=' . $somid . ' type=number value=' . $valor1 . ' id=' . $somid . '22 onchange=add_rejei_1(22,' . $travassos . ',"",' . $turno . ')>';

			$sql = "SELECT * FROM `registo_rejeicoes` WHERE `of`=" . $rs2['of'] . " AND `indice`=23" . " AND `turno`=$turno ";
			$resultsql = mysqli_query($link, $sql);
			$valor1 = 0;
			while ($rs3 = mysqli_fetch_array($resultsql)) {
				$valor1 = $rs3['qnt'];
			}
			$nothing .= '</td><td><input  class="ionica" name=' . $somid . ' type=number value=' . $valor1 . ' id=' . $somid . '23 onchange=add_rejei_1(23,' . $travassos . ',"",' . $turno . ')>';

			$sql = "SELECT * FROM `registo_rejeicoes` WHERE `of`=" . $rs2['of'] . " AND `indice`=24" . " AND `turno`=$turno ";
			$resultsql = mysqli_query($link, $sql);
			$valor1 = 0;
			while ($rs3 = mysqli_fetch_array($resultsql)) {
				$valor1 = $rs3['qnt'];
			}
			$nothing .= '</td><td><input  class="ionica" name=' . $somid . ' type=number value=' . $valor1 . ' id=' . $somid . '24 onchange=add_rejei_1(24,' . $travassos . ',"",' . $turno . ')>';

			$sql = "SELECT * FROM `registo_rejeicoes` WHERE `of`=" . $rs2['of'] . " AND `indice`=25" . " AND `turno`=$turno ";
			$resultsql = mysqli_query($link, $sql);
			$valor1 = 0;
			while ($rs3 = mysqli_fetch_array($resultsql)) {
				$valor1 = $rs3['qnt'];
			}
			$nothing .= '</td><td><input  class="ionica" name=' . $somid . ' type=number value=' . $valor1 . ' id=' . $somid . '25 onchange=add_rejei_1(25,' . $travassos . ',"",' . $turno . ')>';
			*/
////////////FINALIZA COLUNA "25"////////////
			
						$nothing .= '<tr>';
			for ($i = 26; $i < 28; $i++) {
				if ($i != 2 && $i != 7) {
					$nothing .= '<td><input class="mju w3-btn w3-white w3-border w3-border-black w3-text-black" type=button value="' . $id_rej[$i] . '" onclick=add_rejei(' . $i . ',' . $travassos . ',"",' . $turno . ')></td>';
				}
			}
			$nothing .= '</tr>';

			for($i= 26; $i <28; $i++){
				$sql = "SELECT * FROM `registo_rejeicoes` WHERE `of`=" . $rs2['of'] . " AND `indice`=$i" . " AND `turno`=$turno ";
				$resultsql = mysqli_query($link, $sql);
				while ($rs3 = mysqli_fetch_array($resultsql)) {
				$valor1 = $rs3['qnt'];
				}
					if ($i != 2 && $i != 7) {	
					$nothing .= '<td><input  class="ionica" name=' . $somid . ' type=number value=' . $valor1 . ' id=' . $somid . $i.' onchange=add_rejei_1('.	$i.','. $travassos . ',"",' . $turno . ')>';
				}
			}
			
			/*
			$nothing .= '<tr>';
			for ($i = 26; $i < 28 ; $i++) {
				if ($i != 2 && $i != 7) {
					$nothing .= '<td><input class="mju w3-btn w3-white w3-border w3-border-black w3-text-black" type=button value="' . $id_rej[$i] . '" onclick=add_rejei(' . $i . ',' . $travassos . ',"",' . $turno . ')></td>';
				}
			}
			$nothing .= '</tr>';

			$sql = "SELECT * FROM `registo_rejeicoes` WHERE `of`=" . $rs2['of'] . " AND `indice`=26" . " AND `turno`=$turno ";
			$resultsql = mysqli_query($link, $sql);
			$valor1 = 0;
			while ($rs3 = mysqli_fetch_array($resultsql)) {
				$valor1 = $rs3['qnt'];
			}
			$nothing .= '</td><td><input  class="ionica" name=' . $somid . ' type=number value=' . $valor1 . ' id=' . $somid . '26 onchange=add_rejei_1(26,' . $travassos . ',"",' . $turno . ')>';

			$sql = "SELECT * FROM `registo_rejeicoes` WHERE `of`=" . $rs2['of'] . " AND `indice`=27" . " AND `turno`=$turno ";
			$resultsql = mysqli_query($link, $sql);
			$valor1 = 0;
			while ($rs3 = mysqli_fetch_array($resultsql)) {
				$valor1 = $rs3['qnt'];
			}
			$nothing .= '</td><td><input  class="ionica" name=' . $somid . ' type=number value=' . $valor1 . ' id=' . $somid . '27 onchange=add_rejei_1(27,' . $travassos . ',"",' . $turno . ')>';
			$nothing .= '</td></tr>';
			*/
			$nothing .= '</table>';
			$nothing .= '</div>';
			$nothing .= '</tr>';
			$nothing .= '<table>';

/////////// SELECIONAR POSTO DE TRABALHO //////////			
			/*$nothing .= '<td width="100%" >Selecionar posto de trabalho</td>
				   <td colspan=3><input name=fiusa type="checkbox" onchange=selecao_a_ver()></td>';
				*/
			$nothing .= '</tr></table>';
			$nothing .= '</div>';
			#$nothing.='<tr><td colspan=21>Embalagens</td></tr>';
			#$sql = "SELECT * FROM `contagem_itiquetas` WHERE `Ordem_fabrico`='$ordem_fabrico1' AND (`ord_trabalho`='$ord_trabalho' OR `ord_trabalho`='')";
			$resultsql1 = mysqli_query($link, $sql);

			$zorxia = 0;
		}
	}
	$nothing .= "</div>";

	$nothing .= "<div  class='ensaio' >";

	$nothing .= "<table><tr><td width='50%'>";

	$nothing .= "<input  class='mju w3-btn w3-white w3-border w3-border-black w3-text-black' type=button value='Selecionar' onclick=tornar_invisivel()>";

	$nothing .= "</td><td width='50%'>";

	$nothing .= "<input  class='mju w3-btn w3-white w3-border w3-border-black w3-text-black' type=button value='Sair de selecção' onclick=sair_selecao()>";

	$nothing .= "</td></tr></table>";

	$nothing .= "</div>";

	echo $nothing;
} else {
	echo "";
}

