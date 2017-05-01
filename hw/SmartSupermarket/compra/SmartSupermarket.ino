
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

#include <MFRC522.h>
#include <SPI.h>

#define SAD 10
#define RST 5

MFRC522 nfc(SAD, RST);

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
void leituraMRFC(String operacao);
void imprimirInformacoesProduto(String operacao, String serialInput);
void esperaSoltarBotao();
void telaInicio();

//-----------------------------//
// VARIAVEIS
//-----------------------------//
unsigned int tecla=255;
String serialInput = "", Tag = "", compraId = "", precoCompra = "";

void setup()
{

  Serial.begin(9600);

  SPI.begin();

  //nfc.begin();

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
    leituraMRFC("0");
  }else if(tecla==2 || tecla==3 || tecla==4){
    tecla = leTecladoTelaComprar();   
    if (tecla==3){
      cancelarCompra();
    }else if (tecla==4){
      concluirCompra();
    }else{
      leituraMRFC("1");
    }
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
        telaConsultar(true);
        return 1;
      }
      if ((x>=178) && (x<=300))  //Botao 2
      {
        esperaSoltarBotao();
        telaComprar(true);
        return 2;
      }
    }
  }
  return 255;
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
        return 3;
      }
      if (x>=190)
      {
        esperaSoltarBotao();
        return 4;
      }
    }
  }
  return 2;
}

void esperaSoltarBotao(){
  while (STOUCH.dataAvailable());
}

void leituraMRFC(String operacao){
  /*byte status;
  byte data[MAX_LEN];
  byte serial[5];
  int i, j, pos;
  String conteudo= "";

  status = nfc.requestTag(MF1_REQIDL, data);

  if (status == MI_OK) {
    Serial.println();
    Serial.println("Tag detected.");
  
  
    status = nfc.antiCollision(data);
    memcpy(serial, data, 5);
  
   
    //Serial.println("The serial nb of the tag is:");
    for (i = 0; i < 4; i++) {
  
      Serial.print(serial[i] < 0x10 ? "0" : "");
      Serial.print(serial[i], HEX);
      conteudo.concat(String(serial[i] < 0x10 ? "0" : ""));
      conteudo.concat(String(serial[i], HEX));
    }
  
  
    nfc.selectTag(serial);
  
    nfc.haltTag();
  
    conteudo.toUpperCase();  
    */
    //Tag = conteudo; 
    Tag = "AB02D1A4";
    //GLCD.print("Tag lida: " + Tag, 10, 60);
    //Tag.replace(" ", "%20");
    //GLCD.print("Enviando... ", 10, 80);

reenvia:
    operacao += "|";
    Serial.write(operacao.c_str());
    Serial.write(Tag.c_str());
    if (operacao.equals("1|")){
      compraId = "|" + compraId;
      Serial.write(compraId.c_str());
    }
    Serial.write("#");
    long int x = 1;
    while(!Serial.available()){
      x++;
      if (x==0){
        goto reenvia;
      }
    }

    if (Serial.available()){
      serialInput = Serial.readStringUntil('#');

      imprimirInformacoesProduto(operacao, serialInput);
      serialInput = "";
    }
  //}
}

void imprimirInformacoesProduto(String operacao, String serialInput){ //0 =consultar/ 1=comprar
  if(operacao.equals("0|")){
    telaConsultar(false);
    if (serialInput.charAt(0)=='2'){ // tag nao encontrada
      serialInput = serialInput.substring(2,10);
      GLCD.setColor(0, 0, 0);
      GLCD.setBackColor(249, 249, 249);
      GLCD.print("TAG NAO ENCONTRADA!", CENTER, 104);
      GLCD.print("CADASTRE-A", CENTER, 122);
      GLCD.print("COM A UUID: ", CENTER, 140);
      GLCD.setColor(244, 10, 0);
      GLCD.print(serialInput, CENTER, 156);
    }else{
      GLCD.setColor(0, 0, 0);
      GLCD.setBackColor(249, 249, 249);

      char buf[serialInput.length()+1];
      serialInput.toCharArray(buf, serialInput.length()+1);
      char *p = buf;
      char *str;
      GLCD.setFont(BigFont);
      GLCD.print("   ID", 6, 104);
      GLCD.print(" NOME", 6, 124);
      GLCD.print("PRECO", 6, 144);
      GLCD.setFont(SmallFont);
      for (char count = 0;(str = strtok_r(p, "|", &p)) != NULL;count++){
        if (count==0) continue;
        GLCD.print(str, 98, (count*20)+86);
      }
    }
  }else{
    telaComprar(false);
    if (serialInput.charAt(0)=='2'){ // tag nao encontrada

      GLCD.setColor(0, 0, 0);
      GLCD.setBackColor(249, 249, 249);

      char buf[serialInput.length()+1];
      serialInput.toCharArray(buf, serialInput.length()+1);
      char *p = buf;
      char *str;
      GLCD.drawBitmap(200, 198, 114, 39, btn_concluir);
      for (char count = 0;(str = strtok_r(p, "|", &p)) != NULL;count++){
        if (count==0) continue;
        if (count==2){
          GLCD.print(str, 156, 114);
        }
        if (count==1){
          GLCD.setFont(SmallFont);
          GLCD.setColor(244, 10, 0);
          GLCD.print(str, 156, 128);
        }
        if (count==3){
          compraId = str;
        }
      }
      GLCD.setFont(BigFont);
      GLCD.setColor(244, 10, 0);
      GLCD.print(precoCompra, 156, 170);
      
    }else{
      char buf[serialInput.length()+1];
      serialInput.toCharArray(buf, serialInput.length()+1);
      char *p = buf;
      char *str;
      GLCD.drawBitmap(200, 198, 114, 39, btn_concluir);
      for (char count = 0;(str = strtok_r(p, "|", &p)) != NULL;count++){
        if (count==0) continue;
        if (count==1){
          GLCD.setFont(SmallFont);
          GLCD.print(str, 156, 114);
        }
        if (count==2){
          GLCD.print(str, 156, 128);
        }
        if (count==3){
          compraId = str;
        }
        if (count==4){
          GLCD.setFont(BigFont);
          GLCD.setColor(244, 10, 0);
          GLCD.print(str, 156, 170);
          precoCompra = str;
        }
      }
    }
  }
  delay(5000);
}

void cancelarCompra(){
reenviaCancelamento:
  Serial.write("4|");
  Serial.write(compraId.c_str());
  Serial.write("#");
  long int x = 1;
  while(!Serial.available()){
    x++;
    if (x==0){
      goto reenviaCancelamento;
    }
  }

  if (Serial.available()){
    serialInput = Serial.readStringUntil('#');
    serialInput = "";
    compraId = "";
    precoCompra = "";
    tecla = 255;
    telaInicio();
  }
}

void concluirCompra(){
reenviaConcluir:
  Serial.write("3|");
  Serial.write(compraId.c_str());
  Serial.write("#");
  long int x = 1;
  while(!Serial.available()){
    x++;
    if (x==0){
      goto reenviaConcluir;
    }
  }

  if (Serial.available()){
    serialInput = Serial.readStringUntil('#');
    serialInput = "";
    compraId = "";
    precoCompra = "";
    tecla = 255;
    telaInicio();
  }
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

void telaConsultar(boolean inicio){
  GLCD.fillScr(249, 249, 249);
  drawCabecalho();
  GLCD.setColor(255, 215, 64);
  GLCD.fillRect(0, 41, 319, 80);
  GLCD.setColor(0, 0, 0);
  GLCD.setBackColor(249, 215, 64);
  GLCD.print("Consultar", 4, 48);
  GLCD.setBackColor(249, 249, 249);
  if (inicio) {
    GLCD.print("Aproxime", CENTER, 104);
    GLCD.print("o", CENTER, 122);
    GLCD.print("produto", CENTER, 140);
    GLCD.print("...", CENTER, 156);
    GLCD.drawRect(80, 96, 240, 180);
  }
  GLCD.drawBitmap(5, 198, 99, 38, btn_voltar);
}

void telaComprar(boolean inicio){
  GLCD.setFont(BigFont);
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
  if (!inicio) {
    GLCD.print("Ultimo ", 156, 94);
    GLCD.setFont(BigFont);
    GLCD.print("Total", 156, 148);
  }
}

