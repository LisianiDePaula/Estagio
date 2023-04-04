
<!DOCTYPE HTML>
<html>
<header><title>test</title></header>
<body>
<div id = "topo">
</div>

<?php

$link = new mysqli("localhost", "root", "", "ensaio_de_moldes");

if ($link->connect_errno) {
echo "Failed to connect to MySQL: (" . $link->connect_errno . ") " . $link->connect_error;
};



//echo "<div>pesquisar OF: <input type = "."number"."></div>";

require "vendor/autoload.php";
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

/*
//importar banco
$reader = new \PhpOffice\PhpSpreadsheet\Reader\Xlsx();
$spreadsheetDB = $reader->load("DEC_MAT.xlsx");
$worksheet = $spreadsheetDB->getActiveSheet();

for ($i=2;$i<=283;$i++){
	$num_molde = $worksheet->getCellByColumnAndRow( 1, $i)->getValue();
	$des = $worksheet->getCellByColumnAndRow( 2, $i)->getValue();
	$mp = $worksheet->getCellByColumnAndRow( 4, $i)->getValue();
	$fornecedor = $worksheet->getCellByColumnAndRow( 6, $i)->getValue();
	if ($mp != ""){
		$sql = "INSERT INTO dec_mat (num_molde, des, OF , mp, lmp, fornecedor, Lcasquilhos) VALUES ('$num_molde', '$des', '-','$mp', '-','$fornecedor','-')";
		$link->query($sql);
	}
}*/

$spreadsheet = new Spreadsheet();

echo "
<meta charset="."UTF-8".">
<style>
table {
	width: 100%;
}

tr:nth-child(even) {
  background-color: #F0F0F0;
}
tr {
	border-style: solid;
	text-align: center;
}
h4 {
	font-size: 12pt;
	background-color: #9BCDFF;
}
h2{
	font-size: 14pt;
	text-align: center;
}
td
{
	font-size: 10pt;
}
</style>
<H2>Declaração de Material Plástico</H2>";





?>


<table>

<?php
$gc = $_GET['GC'];
$GCdata = $_GET['GCdata'];
$GCd_arr = explode("/",$GCdata);
$GCano = $GCd_arr[2];

$sql = "SELECT * FROM `dec_mat` WHERE num_molde IN (".$_GET['numMolde'].") ORDER BY `num_molde` ASC;";
$bdlink = $link->query($sql);
$tabela = array();
for($i = 0; $i< $bdlink->num_rows;$i++)
{$tabela[$i] = $bdlink->fetch_assoc();}

/*
if($bdlink->num_rows > 0){
	while ($consulta = $bdlink->fetch_assoc())
		{$tabela[$i] = $consulta;
		$i++;}}*/



$sheet = $spreadsheet->getActiveSheet()->fromArray($tabela, null, 'A4');
echo "
<tr>
	<th><H4>COD</H4></th>
	<th><H4>Designação</H4></th>
	<th><H4>OF</H4></th>
	<th><H4>Matéria Prima</H4></th>
	<th><H4>Lote Matéria Prima</H4></th>
	<th><H4>Fornecedor</H4></th>
	<th><H4>Lote dos Casquilho</H4></th>
</tr>";


//imprime tabela
$bdlink = $link->query($sql);
$indexID = 1;
while ($consulta = $bdlink->fetch_assoc()){
echo "<tr><td>".$consulta["num_molde"]."</td>"."<td>".$consulta["des"]."</td>"."<td><id = 'idOF_".$indexID."' type='text' value='".$consulta["OF"]."'onchange = 'writerTeste(this.value)' disabled></td>"."<td>".$consulta["mp"]."</td>"."<td>".
$consulta["lmp"]."</td>"."<td>".$consulta["fornecedor"]."</td>"."<td>".$consulta["Lcasquilhos"]."</td></tr>";
$indexID++;}

//acrecentando imagem no titulo
$drawing = new \PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
$drawing->setPath('img/dmp_img.png'); 
$drawing->setCoordinates('A1');
//$drawing->setWidth(10);
$drawing->setHeight(45);

$drawing->setWorksheet($spreadsheet->getActiveSheet());
$spreadsheet->getActiveSheet()->getRowDimension('1')->setRowHeight(35);


//titulo

$sheet->mergeCells('A1:B1');
$sheet->mergeCells('C1:E1');
$sheet->setCellValue('C1', 'Declaração de Material Plástico');
$sheet->mergeCells('F1:G1');
$sheet->setCellValue('F1', "$gc/$GCano");
$sheet->setCellValue('A2', 'confirmamos que o lote do produto (OF) enviados correspondem aos seguintes lotes de matéria-prima');
$sheet->mergeCells('A2:G2');
$sheet->getStyle('C1')->getAlignment()->setVertical(\PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER);
$sheet->getStyle('C1')->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
$sheet->getStyle('C1')->getFont()->setSize(16);
$spreadsheet->getActiveSheet()->setTitle('tab');

//aparecer bordas
$sheet->setPrintGridlines(true);

//linha cabeçalho
$headerTab = array ("COD", "Designação", "OF", "Matéria-Prima", "Lote Máteria-Prima", "Fornecedores", "Lote dos Casquilhos");
$sheet->fromArray($headerTab,NULL, 'A3');
$sheet->getStyle('A3:G3')->getFont()->setSize(12);
$sheet->getStyle('A3:G3')->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)->getStartColor()->setARGB('9BCDFF');
$sheet->getStyle('A3:G3')->getAlignment()->setVertical(\PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER);
$sheet->getStyle('A3:G3')->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
$sheet->getRowDimension('3')->setRowHeight(22);


//cofigurações corpo tabela
$spreadsheet->getDefaultStyle()->getFont()->setSize(10);
$spreadsheet->getDefaultStyle()->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
$spreadsheet->getDefaultStyle()->getAlignment()->setWrapText(true);

$sheet->getRowDimension(24)->setRowHeight(15);



//lagura das colunas
$sheet->getColumnDimension('A')->setWidth(8);
$sheet->getColumnDimension('B')->setWidth(25);
$sheet->getColumnDimension('C')->setWidth(10);
$sheet->getColumnDimension('D')->setWidth(25);
$sheet->getColumnDimension('E')->setWidth(26);
$sheet->getColumnDimension('F')->setWidth(20);
$sheet->getColumnDimension('G')->setWidth(25);




//cofigurações página
$sheet->getPageMargins()->setTop(0.3);
$sheet->getPageMargins()->setRight(0.3);
$sheet->getPageMargins()->setLeft(0.3);
$sheet->getPageMargins()->setBottom(0.3);
$sheet->getPageSetup()->setHorizontalCentered(true);
$sheet->getPageSetup()->setFitToWidth(true);

//rodapé
$sheet->mergeCells('A24:C24');
$sheet->setCellValue('A24', 'Paula Viera');
$sheet->mergeCells('D24:G24');
$sheet->setCellValue('D24', "Data:          $GCdata");
$sheet->getStyle('A24:G24')->getBorders()->getTop()->setBorderStyle(\PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM);


//salvar
$writer = new Xlsx($spreadsheet);
$writer->save("tab.xlsx");



/*
for ($row = 0;$row < count($tabela); $row++) {
	echo "<tr>";
	for ($col = 0;$col < count($tabela[$row]); $col++){
		echo "<td>". $tabela[$row][$col]."</td>";
	}
	echo "</tr>";
}*/

//header('Content-Disposition: attachment;filename="tab.xls"');



?>

</table>
<!---->
<a href = "tab.xlsx"download><input type = "button" value = "exportar"></a><br>
</script>
</body>
</html>