
// UNISC - Universidade de Santa Cruz do Sul
// Disciplina de Sistemas Embarcados
// com Marcio Pacheco 2017.1
//
// Smart Supermarket
//
//
// Diego Cardoso               
// Felipe Turcato
// Guilherme Zaleski
//

#include <UTFT.h>
#include <UTouch.h>

UTFT GLCD(ITDB32S, 38, 39, 40, 41);
UTouch STOUCH(6, 5, 4, 3, 2);

extern uint8_t BigFont[];
extern uint8_t SmallFont[];
extern unsigned short btn_consultar[4920];
extern unsigned short btn_comprar[4680];
extern unsigned short btn_consultar_hov[6550];
extern unsigned short btn_comprar_hov[5929];
extern unsigned short btn_voltar[3861];
extern unsigned short btn_concluir[4560];
extern unsigned short header_brand[3696];

//-----------------------------//
// CABECALHOS DE FUNCOES 
//-----------------------------//
unsigned int leTecladoTelaPrincipal();
unsigned int leTecladoTelaComprar();
unsigned int leTecladoTelaConsultar();
void esperaSoltarBotao();
void telaInicio();

//-----------------------------//
// VARIAVEIS
//-----------------------------//
unsigned int tecla=255;

void setup()
{

  Serial.begin(9600);

  GLCD.InitLCD();
  GLCD.clrScr();
  GLCD.setFont(BigFont);

  STOUCH.InitTouch();
  STOUCH.setPrecision(PREC_MEDIUM);

  telaInicio();
}

void loop()
{

  if(tecla==1){
    tecla = leTecladoTelaConsultar();
  }else if(tecla==2){
    tecla = leTecladoTelaComprar();

    
  }else{
    tecla = leTecladoTelaPrincipal();
  }

}


unsigned int leTecladoTelaPrincipal(){
  int x, y;
  if (STOUCH.dataAvailable())
  {
    STOUCH.read();
    x = STOUCH.getX();
    y = STOUCH.getY();
    if ((y>=100) && (y<=150))
    {
      if ((x>=30) && (x<=150))  // Botao 1
      {
        esperaSoltarBotao();
        telaConsultar();
        return 1;
      }
      if ((x>=178) && (x<=300))  //Botao 2
      {
        esperaSoltarBotao();
        telaComprar();
        return 2;
      }
    }
  }
}

unsigned int leTecladoTelaConsultar(){
  int x, y;
  if (STOUCH.dataAvailable())
  {
    STOUCH.read();
    x = STOUCH.getX();
    y = STOUCH.getY();
    if ((y>=192))
    {
      if (x<=130)
      {
        esperaSoltarBotao();
        telaInicio();
        return 255;
      }
    }
  }
  return 1;
}

unsigned int leTecladoTelaComprar(){
  int x, y;
  if (STOUCH.dataAvailable())
  {
    STOUCH.read();
    x = STOUCH.getX();
    y = STOUCH.getY();
    if ((y>=192))
    {
      if (x<=130)
      {
        esperaSoltarBotao();
        telaInicio();
        return 255;
      }
    }
  }
  return 2;
}

void esperaSoltarBotao(){
  while (STOUCH.dataAvailable());
}

void telaInicio(){
  GLCD.fillScr(249, 249, 249);
  drawCabecalho();

  GLCD.drawBitmap(30, 100, 123, 39, btn_consultar);
  GLCD.drawBitmap(168, 100, 117, 39, btn_comprar);
}

void drawCabecalho(){
  GLCD.setColor(103, 58, 183);
  GLCD.fillRect(0, 0, 319, 40);
  GLCD.drawBitmap(5, 12, 176, 20, header_brand);
}

void limpaTela(){
  GLCD.fillScr(249, 249, 249);
}

void telaConsultar(){
  GLCD.fillScr(249, 249, 249);
  drawCabecalho();
  GLCD.setColor(255, 215, 64);
  GLCD.fillRect(0, 41, 319, 80);
  GLCD.setColor(0, 0, 0);
  GLCD.setBackColor(249, 215, 64);
  GLCD.print("Consultar", 4, 48);
  GLCD.setBackColor(249, 249, 249);
  GLCD.print("Aproxime", CENTER, 104);
  GLCD.print("o", CENTER, 122);
  GLCD.print("produto", CENTER, 140);
  GLCD.print("...", CENTER, 156);
  GLCD.drawRect(80, 96, 240, 180);
  GLCD.drawBitmap(5, 198, 99, 38, btn_voltar);
}

void telaComprar(){
  GLCD.fillScr(249, 249, 249);
  drawCabecalho();
  GLCD.setColor(255, 215, 64);
  GLCD.fillRect(0, 41, 319, 80);
  GLCD.setColor(0, 0, 0);
  GLCD.setBackColor(249, 215, 64);
  GLCD.print("Comprar", 10, 48);
  GLCD.setBackColor(249, 249, 249);
  GLCD.print("Aproxime", 10, 104);
  GLCD.print("o", 44, 122);
  GLCD.print("produto", 10, 140);
  GLCD.print("...", 40, 156);
  GLCD.drawRect(4, 96, 142, 180);
  GLCD.drawBitmap(5, 198, 99, 38, btn_voltar);

  GLCD.setFont(BigFont);
  GLCD.print("Ultimo ", 156, 94);
  GLCD.setFont(SmallFont);
  GLCD.print("Omo Multiacao", 156, 114);
  GLCD.setFont(BigFont);
  GLCD.print("Total", 156, 148);
  GLCD.setColor(244, 10, 0);
  GLCD.print("R$1000,00", 156, 170);
  GLCD.drawBitmap(200, 198, 114, 39, btn_concluir);
}

