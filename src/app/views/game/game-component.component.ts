import { Component } from '@angular/core';
import { Verb } from './game.model';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  standalone: true,
  imports: [FormsModule],
  styleUrls: ['./game-component.component.scss']
})
export class GameComponent {
  botonAction: string = "Empezar";
  stateGame: number = 0;
  numerolinea: number = 0;
  verbos: Verb[] = [];
  verbo: Verb = {traduccion:"", present:"", sonidoPresent:"", pastSimple:"", sonidoPastSimple:"",  pastParticiple:"", sonidoParticiple:""};
  infinitivo: string = "";
  pasado: string = "";
  participio: string ="";
  claseInfinitivo: string="classJugando";
  clasePasado: string = "classJugando";
  claseParticipio: string = "classJugando";
  stateDisabled: boolean = true;


  ngOnInit() {
    this.rellenarArray();
    this.stateGame=1;//Sin empezar
    this.maquinaDeJuego(this.stateGame);
  }

  maquinaDeJuego(state:number){
    switch(state){
      case 1:
        this.botonAction = "Empezar"
        this.stateGame = 2;
        break;
      case 2:
          this.cambiarEstilo(2);
          this.cogerVerbo();
          this.botonAction = "Comprobar";
          this.stateGame = 3;
        break;
      case 3:
        var contador: number = 0;
        contador += this.comprobarInfinitivo();
        contador += this.comprobarPasado();
        contador += this.comprobarParticipio();
        if(contador == 3){
          this.botonAction = "Siguiente";
          this.stateDisabled= false;
          this.stateGame = 2;
          this.verbos.splice(this.numerolinea, 1);
          console.log(this.verbos);
        }else{
          console.log("Alguno esta mal");
        }

        break;
    }
  }

  comprobar(){
    this.maquinaDeJuego(this.stateGame);
  }

  limpiarCampos(){
    this.infinitivo = "";
    this.pasado = "";
    this.participio = "";
    this.claseInfinitivo = "classJugando";
    this.clasePasado = "classJugando";
    this.claseParticipio = "classJugando";
  }
  cambiarEstilo(numero: number):string{
    if(numero == 1){
      return "classCorrecto"
    }else {
      return "classError";
    }
  }
  comprobarInfinitivo(): number{
    if(this.infinitivo.toLowerCase() == this.verbo.present){
      this.claseInfinitivo = this.cambiarEstilo(1);
      return 1;
    }else{
      this.claseInfinitivo = this.cambiarEstilo(0);
      return 0;
    }
  }

  comprobarPasado(): number{
    if( this.pasado.toLowerCase() == this.verbo.pastSimple){
      this.clasePasado = this.cambiarEstilo(1);
      return 1;
    }else{
      this.clasePasado = this.cambiarEstilo(0);
      return 0;
    }
  }

  reproducir(caso: number){
    const audio = new Audio();
    switch(caso){
      case 1:
        console.log(this.verbo.sonidoPresent);
        audio.src = "../../../assets/audios/infinitivo/"+ this.verbo.sonidoPresent;
      break;
      case 2:
        audio.src = "../../../assets/audios/pasado/"+ this.verbo.sonidoPastSimple;
      break;
      case 3:
        audio.src = "../../../assets/audios/participio/" + this.verbo.sonidoParticiple;
      break;
    }
    audio.load();
    audio.play();
  }

  comprobarParticipio(): number{
    if( this.participio.toLowerCase() == this.verbo.pastParticiple){
      this.claseParticipio = this.cambiarEstilo(1);
      return 1;
    }else{
      this.claseParticipio = this.cambiarEstilo(0);
      return 0;
    }
  }


  cogerVerbo(){
    var numero:number = this.numeroAleatorio(this.verbos.length);
    this.numerolinea = numero;
    this.verbo = this.verbos[numero];
  }

  numeroAleatorio(maximo: number):number{
    var numberRandom = Math.random()* (maximo-1);
    return Math.round(numberRandom * 1);
  }
  rellenarArray(){
    this.verbos[0]= { traduccion:"Ser/estar",                 present:"be",         sonidoPresent:"be__us_1.mp3",         pastSimple:"was/were",     sonidoPastSimple:"",                      pastParticiple:"been",   sonidoParticiple:""};
    this.verbos[1]= { traduccion:"Llegar a ser/ convertirse", present:"become",     sonidoPresent:"become__us_1.mp3",     pastSimple:"became",       sonidoPastSimple:"became__gb_1.mp3",      pastParticiple:"become", sonidoParticiple:""};
    this.verbos[2]= { traduccion:"Comenzar",                  present:"begin",      sonidoPresent:"begin__us_1.mp3",      pastSimple:"began",        sonidoPastSimple:"began__gb_1.mp3",       pastParticiple:"begun",  sonidoParticiple:""};
    this.verbos[3]= { traduccion:"Romper",                    present:"break",      sonidoPresent:"break__us_1.mp3",      pastSimple:"broke",        sonidoPastSimple:"broken__gb_1.mp3",      pastParticiple:"broken", sonidoParticiple:""};
    this.verbos[4]= { traduccion:"Traer",                     present:"bring",      sonidoPresent:"bring__us_1.mp3",      pastSimple:"brought",      sonidoPastSimple:"brought__gb_1.mp3",     pastParticiple:"brought", sonidoParticiple:""};
    this.verbos[5]= { traduccion:"Construir",                 present:"build",      sonidoPresent:"build__us_1.mp3",      pastSimple:"built",        sonidoPastSimple:"built__gb_1.mp3",       pastParticiple:"built", sonidoParticiple:""};
    this.verbos[6]= { traduccion:"Comprar",                   present:"buy",        sonidoPresent:"buy__us_1.mp3",        pastSimple:"bought",       sonidoPastSimple:"bought_gb_1.mp3",       pastParticiple:"bought", sonidoParticiple:""};
    this.verbos[7]= { traduccion:"poder",                     present:"can",        sonidoPresent:"can__gb_1.mp3",        pastSimple:"could",        sonidoPastSimple:"could__gb_1.mp3",       pastParticiple:"been able to", sonidoParticiple:""};
    this.verbos[8]= { traduccion:"atrapar",                   present:"catch",      sonidoPresent:"catch__gb_1.mp3",      pastSimple:"caught",       sonidoPastSimple:"caught__gb_1.mp3",      pastParticiple:"caught", sonidoParticiple:""};
    this.verbos[9]= { traduccion:"elegir",                    present:"choose",     sonidoPresent:"choose__gb_1.mp3",     pastSimple:"chose",        sonidoPastSimple:"chose__gb_1.mp3",       pastParticiple:"chosen", sonidoParticiple:""};
    this.verbos[10]= { traduccion:"venir",                    present:"come",       sonidoPresent:"come__gb_1.mp3",       pastSimple:"came",         sonidoPastSimple:"came__gb_1.mp3",        pastParticiple:"come", sonidoParticiple:""};
    this.verbos[11]= { traduccion:"costar",                   present:"cost",       sonidoPresent:"cost_us_1.mp3",        pastSimple:"cost",         sonidoPastSimple:"cost__gb_1.mp3",        pastParticiple:"cost", sonidoParticiple:""};
    this.verbos[12]= { traduccion:"cortar",                   present:"cut",        sonidoPresent:"cut__us_1.mp3",        pastSimple:"cut",          sonidoPastSimple:"cut__gb_1.mp3",         pastParticiple:"cut", sonidoParticiple:""};
    this.verbos[13]= { traduccion:"hacer",                    present:"do",         sonidoPresent:"do__us_2.mp3",         pastSimple:"did",          sonidoPastSimple:"did__gb_1.mp3",         pastParticiple:"done", sonidoParticiple:""};
    this.verbos[14]= { traduccion:"sueño",                    present:"dream",      sonidoPresent:"dream__us_1.mp3",      pastSimple:"dreamt",       sonidoPastSimple:"dreamt__gb_1.mp3",      pastParticiple:"dreamt", sonidoParticiple:""} ;
    this.verbos[15]= { traduccion:"beber",                    present:"drink",      sonidoPresent:"drink__us_1.mp3",      pastSimple:"drank",        sonidoPastSimple:"drank__gb_1.mp3",       pastParticiple:"drunk", sonidoParticiple:""};
    this.verbos[16]= { traduccion:"conducir",                 present:"drive",      sonidoPresent:"drive__us_1.mp3",      pastSimple:"drove",        sonidoPastSimple:"drove__gb_1.mp3",       pastParticiple:"driven", sonidoParticiple:""};
    this.verbos[17]= { traduccion:"comer",                    present:"eat",        sonidoPresent:"eat__us_1.mp3",        pastSimple:"ate",          sonidoPastSimple:"ate__gb_1.mp3",         pastParticiple:"eaten", sonidoParticiple:""};
    this.verbos[18]= { traduccion:"caer",                     present:"fall",       sonidoPresent:"fall__us_1.mp3",       pastSimple:"fell",         sonidoPastSimple:"fell__gb_1.mp3",        pastParticiple:"fllen", sonidoParticiple:""};
    this.verbos[19]= { traduccion:"sentir",                   present:"feel",       sonidoPresent:"feel_us_1.mp3",        pastSimple:"felt",         sonidoPastSimple:"felt__gb_1.mp3",        pastParticiple:"felt", sonidoParticiple:""};
    this.verbos[20]= { traduccion:"encontrar",                present:"find",       sonidoPresent:"find__us_1.mp3",       pastSimple:"found",        sonidoPastSimple:"found__gb_1.mp3",       pastParticiple:"found", sonidoParticiple:""};
    this.verbos[21]= { traduccion:"volar",                    present:"fly",        sonidoPresent:"fly__us_1.mp3",        pastSimple:"flew",         sonidoPastSimple:"flew__gb_1.mp3",        pastParticiple:"flown", sonidoParticiple:""};
    this.verbos[22]= { traduccion:"olvidar",                  present:"forget",     sonidoPresent:"forget__us_1.mp3",     pastSimple:"forgot",       sonidoPastSimple:"forgot__gb_1.mp3",      pastParticiple:"forgotten", sonidoParticiple:""};
    this.verbos[23]= { traduccion:"conseguir/obtener",        present:"get",        sonidoPresent:"get__gb_1.mp3",        pastSimple:"got",          sonidoPastSimple:"got__gb_1.mp3",         pastParticiple:"got",   sonidoParticiple:""};
    this.verbos[24]= { traduccion:"dar",                      present:"give",       sonidoPresent:"give__gb_1.mp3",       pastSimple:"gave",         sonidoPastSimple:"gave__gb_1.mp3",        pastParticiple:"given", sonidoParticiple:""};
    this.verbos[25]= { traduccion:"ir",                       present:"go",         sonidoPresent:"go__gb_1.mp3",         pastSimple:"went",         sonidoPastSimple:"went__gb_1.mp3",        pastParticiple:"gone",  sonidoParticiple:""};
    this.verbos[26]= { traduccion:"crecer",                   present:"grow",       sonidoPresent:"grow__gb_1.mp3",       pastSimple:"grew",         sonidoPastSimple:"grew__gb_1.mp3",        pastParticiple:"grown", sonidoParticiple:""};
    this.verbos[27]= { traduccion:"tener",                    present:"have",       sonidoPresent:"have__gb_1.mp3",       pastSimple:"had",          sonidoPastSimple:"had__gb_1.mp3",         pastParticiple:"had", sonidoParticiple:""};
    this.verbos[28]= { traduccion:"oir",                      present:"hear",       sonidoPresent:"hear__gb_1.mp3",       pastSimple:"heard",        sonidoPastSimple:"heard__gb_1.mp3",       pastParticiple:"heard", sonidoParticiple:""};
    this.verbos[29]= { traduccion:"golpear",                  present:"hit",        sonidoPresent:"hit__gb_1.mp3",        pastSimple:"hit",          sonidoPastSimple:"hit__gb_1.mp3",         pastParticiple:"hit", sonidoParticiple:""};
    this.verbos[30]= { traduccion:"guardar/mantener",         present:"keep",       sonidoPresent:"keep__gb_1.mp3",       pastSimple:"kept",         sonidoPastSimple:"kept__gb_1.mp3",        pastParticiple:"kept", sonidoParticiple:""};
    this.verbos[31]= { traduccion:"saber/conocer",            present:"know",       sonidoPresent:"know__gb_1.mp3",       pastSimple:"knew",         sonidoPastSimple:"knew__gb_1.mp3",        pastParticiple:"know", sonidoParticiple:""};
    this.verbos[32]= { traduccion:"colocar/poner",            present:"lay",        sonidoPresent:"lay__gb_1.mp3",        pastSimple:"laid",         sonidoPastSimple:"laid__gb_1.mp3",        pastParticiple:"laid", sonidoParticiple:""};
    this.verbos[33]= { traduccion:"aprender",                 present:"learn",      sonidoPresent:"learn__gb_1.mp3",      pastSimple:"learnt",       sonidoPastSimple:"learnt__gb_1.mp3",      pastParticiple:"learnt", sonidoParticiple:""};
    this.verbos[34]= { traduccion:"salir/irse/dejar",         present:"leave",      sonidoPresent:"leave__gb_1.mp3",      pastSimple:"left",         sonidoPastSimple:"left__gb_1.mp3",        pastParticiple:"left", sonidoParticiple:""};
    this.verbos[35]= { traduccion:"Prestar",                  present:"lend",       sonidoPresent:"lend_gb_1.mp3",        pastSimple:"lent",         sonidoPastSimple:"lent_gb_2.mp3",         pastParticiple:"lent", sonidoParticiple:""};
    this.verbos[36]= { traduccion:"Permitir",                 present:"let",        sonidoPresent:"let__gb_1.mp3",        pastSimple:"let",          sonidoPastSimple:"let__gb_1.mp3",         pastParticiple:"let", sonidoParticiple:""};
    this.verbos[37]= { traduccion:"Perder",                   present:"lose",       sonidoPresent:"lose__gb_1.mp3",       pastSimple:"lost",         sonidoPastSimple:"lost__gb_1.mp3",        pastParticiple:"lost", sonidoParticiple:""} ;
    this.verbos[38]= { traduccion:"Hacer/fabricar",           present:"make",       sonidoPresent:"make__gb_1.mp3",       pastSimple:"made",         sonidoPastSimple:"made__gb_1.mp3",        pastParticiple:"made", sonidoParticiple:""};
    this.verbos[39]= { traduccion:"encontrarse con alguien",  present:"meet",       sonidoPresent:"meet__gb_1.mp3",       pastSimple:"met",          sonidoPastSimple:"met__gb_2.mp3",         pastParticiple:"met", sonidoParticiple:""};
    this.verbos[40]= { traduccion:"pagar",                    present:"pay",        sonidoPresent:"pay__gb_1.mp3",        pastSimple:"paid",         sonidoPastSimple:"paid__gb_1.mp3",        pastParticiple:"paid", sonidoParticiple:""};
    this.verbos[41]= { traduccion:"Poner",                    present:"put",        sonidoPresent:"put__gb_1.mp3",        pastSimple:"put",          sonidoPastSimple:"put__gb_1.mp3",         pastParticiple:"put", sonidoParticiple:""};
    this.verbos[42]= { traduccion:"leer",                     present:"read",       sonidoPresent:"read__gb_1.mp3",       pastSimple:"read",         sonidoPastSimple:"read__gb_3.mp3",        pastParticiple:"read", sonidoParticiple:""};
    this.verbos[43]= { traduccion:"llamar",                   present:"ring",       sonidoPresent:"ring__gb_1.mp3",       pastSimple:"rang",         sonidoPastSimple:"rang__gb_1.mp3",        pastParticiple:"rung", sonidoParticiple:""};
    this.verbos[44]= { traduccion:"correr",                   present:"run",        sonidoPresent:"run__gb_1.mp3",        pastSimple:"ran",          sonidoPastSimple:"ran__gb_1.mp3",         pastParticiple:"run", sonidoParticiple:""};
    this.verbos[45]= { traduccion:"decir",                    present:"say",        sonidoPresent:"say__gb_1.mp3",        pastSimple:"said",         sonidoPastSimple:"said__gb_1.mp3",        pastParticiple:"said", sonidoParticiple:""};
    this.verbos[44]= { traduccion:"ver",                      present:"see",        sonidoPresent:"see__gb_1.mp3",        pastSimple:"saw",          sonidoPastSimple:"saw__gb_1.mp3",         pastParticiple:"seen",   sonidoParticiple:""};
    this.verbos[45]= { traduccion:"vender",                   present:"sell",       sonidoPresent:"sell_gb_1.mp3",        pastSimple:"sold",         sonidoPastSimple:"sold__gb_1.mp3",        pastParticiple:"sold", sonidoParticiple:""};
    this.verbos[46]= { traduccion:"enviar",                   present:"send",       sonidoPresent:"send__gb_1.mp3",       pastSimple:"sent",         sonidoPastSimple:"sent__gb_1.mp3",        pastParticiple:"sent",  sonidoParticiple:""};
    this.verbos[47]= { traduccion:"cerrar la boca",           present:"shut",       sonidoPresent:"shut__gb_1.mp3",       pastSimple:"shut",         sonidoPastSimple:"shut__gb_1.mp3",        pastParticiple:"shut", sonidoParticiple:""};
    this.verbos[48]= { traduccion:"cantar",                   present:"sing",       sonidoPresent:"sing__gb_1.mp3",       pastSimple:"sang",         sonidoPastSimple:"sang__gb_1.mp3",        pastParticiple:"sung", sonidoParticiple:""};
    this.verbos[49]= { traduccion:"sentarse",                 present:"sit",        sonidoPresent:"sit__gb_1.mp3",        pastSimple:"sat",          sonidoPastSimple:"sat__gb_1.mp3",         pastParticiple:"sat", sonidoParticiple:""};
    this.verbos[50]= { traduccion:"dormir",                   present:"sleep",      sonidoPresent:"sleep__gb_1.mp3",      pastSimple:"slept",        sonidoPastSimple:"slept__gb_1.mp3",       pastParticiple:"slept", sonidoParticiple:""};
    this.verbos[51]= { traduccion:"hablar",                   present:"speak",      sonidoPresent:"speak__gb_1.mp3",      pastSimple:"spoke",        sonidoPastSimple:"spoke__gb_1.mp3",       pastParticiple:"spoken", sonidoParticiple:""};
    this.verbos[52]= { traduccion:"gastar",                   present:"spend",      sonidoPresent:"spend__gb_1.mp3",      pastSimple:"spent",        sonidoPastSimple:"spent__gb_1.mp3",       pastParticiple:"spent", sonidoParticiple:""};
    this.verbos[53]= { traduccion:"pararse",                  present:"stand",      sonidoPresent:"stand__gb_1.mp3",      pastSimple:"stood",        sonidoPastSimple:"stood__gb_1.mp3",       pastParticiple:"stood", sonidoParticiple:"stood__gb_1.mp3"};
    this.verbos[54]= { traduccion:"robar",                    present:"steal",      sonidoPresent:"steal__gb_1.mp3",      pastSimple:"stole",        sonidoPastSimple:"stole__gb_1.mp3",       pastParticiple:"stolen", sonidoParticiple:""};
    this.verbos[55]= { traduccion:"nadar",                    present:"swim",       sonidoPresent:"swim__gb_1.mp3",       pastSimple:"swam",         sonidoPastSimple:"swam__gb_1.mp3",        pastParticiple:"swum", sonidoParticiple:""};
    this.verbos[56]= { traduccion:"llevar",                   present:"take",       sonidoPresent:"take__gb_1.mp3",       pastSimple:"took",         sonidoPastSimple:"took__gb_1.mp3",        pastParticiple:"taken", sonidoParticiple:""};
    this.verbos[57]= { traduccion:"enseñar",                  present:"teach",      sonidoPresent:"teach__gb_1.mp3",      pastSimple:"taught",       sonidoPastSimple:"taught__gb_1.mp3",      pastParticiple:"taught", sonidoParticiple:"taught__gb_1.mp3"};
    this.verbos[58]= { traduccion:"decir",                    present:"tell",       sonidoPresent:"tell__gb_1.mp3",       pastSimple:"told",         sonidoPastSimple:"told__gb_1.mp3",        pastParticiple:"told", sonidoParticiple:"told__gb_1.mp3"} ;
    this.verbos[59]= { traduccion:"pensar",                   present:"think",      sonidoPresent:"think__gb_1.mp3",      pastSimple:"thought",      sonidoPastSimple:"thought__gb_1.mp3",     pastParticiple:"thought", sonidoParticiple:"thought__gb_1.mp3"};
    this.verbos[60]= { traduccion:"tirar",                    present:"throw",      sonidoPresent:"throw__gb_1.mp3",      pastSimple:"threw",        sonidoPastSimple:"threw__gb_1.mp3",       pastParticiple:"thrown", sonidoParticiple:""};
    this.verbos[61]= { traduccion:"entender",                 present:"understand", sonidoPresent:"understand_gb_1.mp3",  pastSimple:"understood",   sonidoPastSimple:"understood__gb_1.mp3",  pastParticiple:"understood", sonidoParticiple:"understood__gb_1.mp3"};
    this.verbos[62]= { traduccion:"despertar",                present:"wake",       sonidoPresent:"wake__gb_1.mp3",       pastSimple:"woke",         sonidoPastSimple:"woke__gb_1.mp3",        pastParticiple:"woken", sonidoParticiple:""};
    this.verbos[63]= { traduccion:"tener puesto",             present:"wear",       sonidoPresent:"wear__gb_1.mp3",       pastSimple:"wore",         sonidoPastSimple:"wore__gb_1.mp3",        pastParticiple:"worn", sonidoParticiple:""};
    this.verbos[64]= { traduccion:"ganar",                    present:"win",        sonidoPresent:"win__gb_1.mp3",        pastSimple:"won",          sonidoPastSimple:"won__gb_1.mp3",         pastParticiple:"won", sonidoParticiple:""};
    this.verbos[65]= { traduccion:"escribir",                 present:"write",      sonidoPresent:"write__gb_1.mp3",      pastSimple:"wrote",        sonidoPastSimple:"wrote__gb_1.mp3",       pastParticiple:"written", sonidoParticiple:""};

  }
}
