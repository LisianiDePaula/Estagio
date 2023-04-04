<div id=corpo_cima height=90%><table width=100% id=ggg top=10% border=0 cellspacing=1 cellpadding=1 height=100% onload="login_operador()">



<?php  

session_start();

sleep(0.1);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

date_default_timezone_set('Europe/Lisbon');

if (array_key_exists("login", $_SESSION)){

	$link = new mysqli("localhost", "root", "", "ensaio_de_moldes");

	if ($link->connect_errno) {
		echo "Failed to connect to MySQL: (" . $link->connect_errno . ") " . $link->connect_error;
		}
		
	if (!empty($_GET['data'])){
		$data = $_GET['data'];	
		$data_array=date_parse($data);
	}


	$mes = $data_array['month'];
	$ano = $data_array['year'];   
	$dia = $data_array["day"]; 

	function semana_do_ano($dia,$mes,$ano){

	$var=intval( date('z', mktime(0,0,0,$mes,$dia,$ano) ) / 7 ) + 1;

	return $var;
	}


	function nome_dia($nome_dia) 
	{  
		if($nome_dia > 7) 
			{  
			$nome_dia = $nome_dia-7;  
			}  

		switch($nome_dia) 
			{  
			case 0: return "Domingo"; break;  
			case 1: return "Segunda"; break;  
			case 2: return "Terça"; break;  
			case 3: return "Quarta"; break;  
			case 4: return "Quinta"; break;  
			case 5: return "Sexta"; break;  
			case 6: return "Sábado"; break;
			case 7: return "Domingo"; break;
			default: 
			return "Erro!"; 
			}  
	}  

	$x = date("w");

	$k = 0;
	while($k<=7){  
		${'dia0'.$k} = date("d-m-Y",mktime(0,0,0,$mes,($dia-$x)+$k,$ano)); 
		${'dia1'.$k} = date("Y-m-d",mktime(0,0,0,$mes,($dia-$x)+$k,$ano));
		${'dia_semana'.$k} = 7+$k;  
		$k++;  
	}




			$olmmm=" checked ";

		
		$bbbb=3;
		$cccc="";


		$texto='"'.date('d-m-Y',strtotime('-1 days',strtotime($data))).'"';
		
		
		
		$nothing="</td>";  

		
		$dias = array(0, 1, 2, 3, 4, 5, 6, 7); 

		$i = $dias[date("w")];


	for($j = 0; $j <= 7; $j++) {

			$data_arraya=date_parse("${'dia0'.$j}");
			
			$milu= $data_arraya["day"];
		
			//$dia_semana = nome_dia($dias[$j]);
			
			$d="";
			
			if($milu==$dia){

			$d .= "<td bgcolor=\"#EFEFEF\"  width=80% height=5%;>"; 
				$d .= "<a>";

				$diasemana_numero = date('w', strtotime("${'dia0'.$j}"));
				
				$dia_semana = nome_dia($diasemana_numero);
				
				$d .= $dia_semana . "<br><a id=dia>${'dia0'.$j}</a>    ";
				
				$d .= "</a><a width=100px id='hora' onchange=meudeus()></a>";
				$d .= "</td>"; 
				
				$mijo="${'dia0'.$j}";
				
				$mijo='"'.$mijo.'"';
				
				}
		
				$dias[$j] = $d;
			} 

	$nd = count($dias); 

	for($i = 0; $i <= $nd-1 ; $i++) 
	{ 
		$nothing.=$dias[$i]; 
		} 
	
	$texto='"'.date('d-m-Y',strtotime('+1 days',strtotime($data))).'"';
	$nothing.= "<td rowspan=2 bgcolor='#EFEFEF' width=1%></td></tr>";  
	

	for($j = 0; $j <= 6; $j++) 
		
		{ 
			$data_arraya=date_parse("${'dia1'.$j}");
			
			$milu= $data_arraya["day"];

			if($milu==$dia){
				
				$d = "<tr><td bgcolor=\"#EFEFEF\" width=90% valign='top' colspan=1 id='conteudo'>";

				$d .= "</td>";
				}
			$dias[$j] = $d;
			$d="";
		} 

	$nd = count($dias); 

	for($i = 0; $i <= $nd-1 ; $i++) 
	{ 
		$nothing.=$dias[$i]; 
	} 
	
	$nothing.= '</tr></table></div>';
	$nothing.= "<div id='tab_rejeicao' style='display:none; position: fixed; top:20%; right:30%; background:#FEFEFE; z-index:10;'>
	<table><tr><th colspan='2'>Indice defeito</th></tr>

	<tr><td>00 Arranque</td> <td>16 Material Contaminado</td></tr>
	<tr><td>01 Empeno/deformação</td> <td>17 Marcas de Fluxo</td></tr>
	<tr><td>02 Soldadura(Disco puroso)</td> <td>18 Linhas de Fecho</td></tr>
	<tr><td>03 Raiados ou estrias</td> <td>19 Afundamento (Ponto de injecção)</td></tr>
	<tr><td>04 Manchas</td> <td>20 Marcas de extratores</td></tr>
	<tr><td>05 Falta de Material</td> <td>21 Nok no teste de de rigidez</td></tr>
	<tr><td>06 Rechupes/Chupados ou Deformação Superficie</td> <td>22 Cor não conforme</td></tr>
	<tr><td>07 Válvula (NOK Teste pressão)</td> <td>23 Fissuras</td></tr>
	<tr><td>08 Partidas</td> <td>24 Bolhas</td></tr>
	<tr><td>09 Outros</td> <td>25 brilhos</td></tr>
	<tr><td>10 Riscos</td> <td>26 Casquilhos Sobreposto</td></tr>
	<tr><td>11 Fio de gito</td> <td>27 Ajuste de Parametros</td></tr>
	<tr><td>12 Navalhada</td> <td></td></tr>
	<tr><td>13 Gases</td> <td></td></tr>
	<tr><td>14 Queimados</td> <td></td></tr>
	<tr><td>15 Rebarbas</td> <td></td></tr>
	</table>
	<input type='button' class='w3-padding-0 w3-small w3-round-large' value='voltar' onclick='aparece_desaparece_tab_rej()'></div>";
	mysqli_close($link);
	echo $nothing;
}else{
	echo "";
}
?>