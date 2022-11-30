let tabela_01, tabela_02, os_meus_elementos;

function preload() 
{
  tabela_01 = loadTable("data_01.csv", "csv", "header");
  tabela_02 = loadTable("data_02.csv", "csv", "header");
}

function setup() 
{
  createCanvas (windowWidth, windowHeight);
  importData();
}

function draw() 
{
  background(255);
  drawData();
}

function importData() 
{
  os_meus_elementos = [];
  const escala = height/tabela_01.getRowCount();
  const espaco_entre = 10;
  const x = 30;
  let y = 0;
  
  //console.log (tabela_01.getRows());
  //console.log (tabela_01.getColumn("mulheres"));
  //console.log (tabela_01.getColumnCount());
  //console.log (tabela_01.getRowCount());
  
  for (let r=0; r<tabela_01.getRowCount(); r++) 
  {
    //console.log (tabela_01.getRow(r) );
    
    const year = tabela_01.getString (r, "anos");
    const men = tabela_01.getNum (r, "homens");
    const woman = tabela_01.getNum (r, "mulheres");
    //console.log (woman);
    
    const total = tabela_02.getNum (r, "total");
    //console.log (total);
    
    y += total/escala + espaco_entre;
    
    os_meus_elementos[r] = new DataElement (year, men, woman, total, x, y, escala);
  }
}


function drawData() 
{
  for (let i=0; i<os_meus_elementos.length; i++) 
  {
    os_meus_elementos[i].interactionDataElement();
    os_meus_elementos[i].drawDataElement();
  }
}


class DataElement 
{
  constructor (year_num, num_men, num_woman, total_num, x, y, escala) 
  {
    this.year = year_num;
    this.men = num_men;
    this.woman = num_woman;
    this.total = total_num;
    this.x = x;
    this.y = y;
    this.escala = escala;
    this.fundo_total = color(220);
  }
  
  interactionDataElement () 
  {
    this.distance = dist (mouseX, mouseY, this.x, this.y);
    
    if (this.distance <= (this.total/this.escala)/2 && mouseIsPressed===true)
      this.fundo_total = color(120);
    else 
      this.fundo_total = color(220);
  }
  
  drawDataElement ()
  {
    noStroke();
    fill (this.fundo_total);
    ellipse (this.x, this.y, this.total/this.escala);
    
    noFill();
    stroke (255, 0, 0);
    ellipse (this.x, this.y, this.woman/this.escala);
    
    stroke (0, 0, 255);
    ellipse (this.x, this.y, this.men/this.escala);
    
    fill(0);
    noStroke();
    textAlign (CENTER, CENTER);
    textSize (14);
    text (this.year, this.x+40, this.y);
  }
}

function windowResized() 
{
  resizeCanvas (windowWidth, windowHeight);
}