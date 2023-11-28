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
        audio.src = "../../../assets/audios/infinitivo/"+ this.verbo.sonidoPastSimple;
      break;
      case 3:
        audio.src = "../../../assets/audios/infinitivo/" + this.verbo.sonidoParticiple;
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
    this.verbos[0]= { traduccion:"Ser/estar",                 present:"be",         sonidoPresent:"be__us_1.mp3",         pastSimple:"was/were", sonidoPastSimple:"",  pastParticiple:"been",   sonidoParticiple:""};
    this.verbos[1]= { traduccion:"Llegar a ser/ convertirse", present:"become",     sonidoPresent:"become__us_1.mp3",     pastSimple:"became",   sonidoPastSimple:"",  pastParticiple:"become", sonidoParticiple:""};
    this.verbos[2]= { traduccion:"Comenzar",                  present:"begin",      sonidoPresent:"begin__us_1.mp3",      pastSimple:"began",    sonidoPastSimple:"",  pastParticiple:"begun",  sonidoParticiple:""};
    this.verbos[3]= { traduccion:"Romper",                    present:"break",      sonidoPresent:"break__us_1.mp3",      pastSimple:"broke",    sonidoPastSimple:"",  pastParticiple:"broken", sonidoParticiple:""};
    this.verbos[4]= { traduccion:"Traer",                     present:"bring",      sonidoPresent:"bring__us_1.mp3",      pastSimple:"brought",  sonidoPastSimple:"",  pastParticiple:"brought", sonidoParticiple:""};
    this.verbos[5]= { traduccion:"Construir",                 present:"build",      sonidoPresent:"build__us_1.mp3",      pastSimple:"built",    sonidoPastSimple:"",  pastParticiple:"built", sonidoParticiple:""};
    this.verbos[6]= { traduccion:"Comprar",                   present:"buy",        sonidoPresent:"buy__us_1.mp3",        pastSimple:"bought",   sonidoPastSimple:"",  pastParticiple:"bought", sonidoParticiple:""};
    this.verbos[7]= { traduccion:"poder",                     present:"can",        sonidoPresent:"can__gb_1.mp3",        pastSimple:"could",    sonidoPastSimple:"",  pastParticiple:"been able to", sonidoParticiple:""};
    this.verbos[8]= { traduccion:"atrapar",                   present:"catch",      sonidoPresent:"catch__gb_1.mp3",      pastSimple:"caught",   sonidoPastSimple:"",  pastParticiple:"caught", sonidoParticiple:""};
    this.verbos[9]= { traduccion:"elegir",                    present:"choose",     sonidoPresent:"choose__gb_1.mp3",     pastSimple:"chose",    sonidoPastSimple:"",  pastParticiple:"chosen", sonidoParticiple:""};
    this.verbos[10]= { traduccion:"venir",                    present:"come",       sonidoPresent:"come__gb_1.mp3",       pastSimple:"came",     sonidoPastSimple:"",  pastParticiple:"come", sonidoParticiple:""};
    this.verbos[11]= { traduccion:"costar",                   present:"cost",       sonidoPresent:"cost_us_1.mp3",        pastSimple:"cost",     sonidoPastSimple:"",  pastParticiple:"cost", sonidoParticiple:""};
    this.verbos[12]= { traduccion:"cortar",                   present:"cut",        sonidoPresent:"cut__us_1.mp3",        pastSimple:"cut",      sonidoPastSimple:"",  pastParticiple:"cut", sonidoParticiple:""};
    this.verbos[13]= { traduccion:"hacer",                    present:"do",         sonidoPresent:"do__us_2.mp3",         pastSimple:"did",      sonidoPastSimple:"",  pastParticiple:"done", sonidoParticiple:""};
    this.verbos[14]= { traduccion:"sueño",                    present:"dream",      sonidoPresent:"dream__us_1.mp3",      pastSimple:"dreamt",   sonidoPastSimple:"",  pastParticiple:"dreamt", sonidoParticiple:""} ;
    this.verbos[15]= { traduccion:"beber",                    present:"drink",      sonidoPresent:"drink__us_1.mp3",      pastSimple:"drank",    sonidoPastSimple:"",  pastParticiple:"drunk", sonidoParticiple:""};
    this.verbos[16]= { traduccion:"conducir",                 present:"drive",      sonidoPresent:"drive__us_1.mp3",      pastSimple:"drove",    sonidoPastSimple:"",  pastParticiple:"driven", sonidoParticiple:""};
    this.verbos[17]= { traduccion:"comer",                    present:"eat",        sonidoPresent:"eat__us_1.mp3",        pastSimple:"ate",      sonidoPastSimple:"",  pastParticiple:"eaten", sonidoParticiple:""};
    this.verbos[18]= { traduccion:"caer",                     present:"fall",       sonidoPresent:"fall__us_1.mp3",       pastSimple:"fell",     sonidoPastSimple:"",  pastParticiple:"fllen", sonidoParticiple:""};
    this.verbos[19]= { traduccion:"sentir",                   present:"feel",       sonidoPresent:"feel_us_1.mp3",        pastSimple:"felt",     sonidoPastSimple:"",  pastParticiple:"felt", sonidoParticiple:""};
    this.verbos[20]= { traduccion:"encontrar",                present:"find",       sonidoPresent:"find__us_1.mp3",       pastSimple:"found",    sonidoPastSimple:"",  pastParticiple:"found", sonidoParticiple:""};
    this.verbos[21]= { traduccion:"volar",                    present:"fly",        sonidoPresent:"fly__us_1.mp3",        pastSimple:"flew",     sonidoPastSimple:"",  pastParticiple:"flown", sonidoParticiple:""};
    this.verbos[22]= { traduccion:"olvidar",                  present:"forget",     sonidoPresent:"forget__us_1.mp3",     pastSimple:"forgot",   sonidoPastSimple:"",  pastParticiple:"forgotten", sonidoParticiple:""};
    this.verbos[23]= { traduccion:"conseguir/obtener",        present:"get",        sonidoPresent:"get__gb_1.mp3",        pastSimple:"got",      sonidoPastSimple:"",  pastParticiple:"got",   sonidoParticiple:""};
    this.verbos[24]= { traduccion:"dar",                      present:"give",       sonidoPresent:"give__gb_1.mp3",       pastSimple:"gave",     sonidoPastSimple:"",  pastParticiple:"given", sonidoParticiple:""};
    this.verbos[25]= { traduccion:"ir",                       present:"go",         sonidoPresent:"go__gb_1.mp3",         pastSimple:"went",     sonidoPastSimple:"",  pastParticiple:"gone",  sonidoParticiple:""};
    this.verbos[26]= { traduccion:"crecer",                   present:"grow",       sonidoPresent:"grow__gb_1.mp3",       pastSimple:"grew",     sonidoPastSimple:"",  pastParticiple:"grown", sonidoParticiple:""};
    this.verbos[27]= { traduccion:"tener",                    present:"have",       sonidoPresent:"have__gb_1.mp3",       pastSimple:"had",      sonidoPastSimple:"",  pastParticiple:"had", sonidoParticiple:""};
    this.verbos[28]= { traduccion:"oir",                      present:"hear",       sonidoPresent:"hear__gb_1.mp3",       pastSimple:"heard",    sonidoPastSimple:"",  pastParticiple:"heard", sonidoParticiple:""};
    this.verbos[29]= { traduccion:"golpear",                  present:"hit",        sonidoPresent:"hit__gb_1.mp3",        pastSimple:"hit",      sonidoPastSimple:"",  pastParticiple:"hit", sonidoParticiple:""};
    this.verbos[30]= { traduccion:"guardar/mantener",         present:"keep",       sonidoPresent:"keep__gb_1.mp3",       pastSimple:"kept",     sonidoPastSimple:"",  pastParticiple:"kept", sonidoParticiple:""};
    this.verbos[31]= { traduccion:"saber/conocer",            present:"know",       sonidoPresent:"know__gb_1.mp3",       pastSimple:"knew",     sonidoPastSimple:"",  pastParticiple:"know", sonidoParticiple:""};
    this.verbos[32]= { traduccion:"colocar/poner",            present:"lay",        sonidoPresent:"lay__gb_1.mp3",        pastSimple:"laid",     sonidoPastSimple:"",  pastParticiple:"laid", sonidoParticiple:""};
    this.verbos[33]= { traduccion:"aprender",                 present:"learn",      sonidoPresent:"learn__gb_1.mp3",      pastSimple:"lernt",    sonidoPastSimple:"",  pastParticiple:"learnt", sonidoParticiple:""};
    this.verbos[34]= { traduccion:"salir/irse/dejar",         present:"leave",      sonidoPresent:"leave__gb_1.mp3",      pastSimple:"left",     sonidoPastSimple:"",  pastParticiple:"left", sonidoParticiple:""};
    this.verbos[35]= { traduccion:"Prestar",                  present:"lend",       sonidoPresent:"lend_gb_1.mp3",        pastSimple:"lent",     sonidoPastSimple:"",  pastParticiple:"lent", sonidoParticiple:""};
    this.verbos[36]= { traduccion:"Permitir",                 present:"let",        sonidoPresent:"let__gb_1.mp3",        pastSimple:"let",          sonidoPastSimple:"",  pastParticiple:"let", sonidoParticiple:""};
    this.verbos[37]= { traduccion:"Perder",                   present:"lose",       sonidoPresent:"lose__gb_1.mp3",       pastSimple:"lost",         sonidoPastSimple:"",  pastParticiple:"lost", sonidoParticiple:""} ;
    this.verbos[38]= { traduccion:"Hacer/fabricar",           present:"make",       sonidoPresent:"make__gb_1.mp3",       pastSimple:"made",         sonidoPastSimple:"",  pastParticiple:"made", sonidoParticiple:""};
    this.verbos[39]= { traduccion:"encontrarse con alguien",  present:"meet",       sonidoPresent:"meet__gb_1.mp3",       pastSimple:"met",          sonidoPastSimple:"",  pastParticiple:"met", sonidoParticiple:""};
    this.verbos[40]= { traduccion:"pagar",                    present:"pay",        sonidoPresent:"pay__gb_1.mp3",        pastSimple:"paid",         sonidoPastSimple:"",  pastParticiple:"paid", sonidoParticiple:""};
    this.verbos[41]= { traduccion:"Poner",                    present:"put",        sonidoPresent:"put__gb_1.mp3",        pastSimple:"put",          sonidoPastSimple:"",  pastParticiple:"put", sonidoParticiple:""};
    this.verbos[42]= { traduccion:"leer",                     present:"read",       sonidoPresent:"read__gb_1.mp3",       pastSimple:"read",         sonidoPastSimple:"",  pastParticiple:"read", sonidoParticiple:""};
    this.verbos[43]= { traduccion:"llamar",                   present:"ring",       sonidoPresent:"ring__gb_1.mp3",       pastSimple:"rang",         sonidoPastSimple:"",  pastParticiple:"rung", sonidoParticiple:""};
    this.verbos[44]= { traduccion:"correr",                   present:"run",        sonidoPresent:"run__gb_1.mp3",        pastSimple:"ran",          sonidoPastSimple:"",  pastParticiple:"run", sonidoParticiple:""};
    this.verbos[45]= { traduccion:"decir",                    present:"say",        sonidoPresent:"say__gb_1.mp3",        pastSimple:"said",         sonidoPastSimple:"",  pastParticiple:"said", sonidoParticiple:""};
    this.verbos[44]= { traduccion:"ver",                      present:"see",        sonidoPresent:"see__gb_1.mp3",        pastSimple:"saw",          sonidoPastSimple:"",  pastParticiple:"seen",   sonidoParticiple:""};
    this.verbos[45]= { traduccion:"vender",                   present:"sell",       sonidoPresent:"sell_gb_1.mp3",        pastSimple:"sold",         sonidoPastSimple:"",  pastParticiple:"sold", sonidoParticiple:""};
    this.verbos[46]= { traduccion:"enviar",                   present:"send",       sonidoPresent:"send__gb_1.mp3",       pastSimple:"sent",         sonidoPastSimple:"",  pastParticiple:"sent",  sonidoParticiple:""};
    this.verbos[47]= { traduccion:"cerrar la boca",           present:"shut",       sonidoPresent:"shut__gb_1.mp3",       pastSimple:"shut",         sonidoPastSimple:"",  pastParticiple:"shut", sonidoParticiple:""};
    this.verbos[48]= { traduccion:"cantar",                   present:"sing",       sonidoPresent:"sing__gb_1.mp3",       pastSimple:"sang",         sonidoPastSimple:"",  pastParticiple:"sung", sonidoParticiple:""};
    this.verbos[49]= { traduccion:"sentarse",                 present:"sit",        sonidoPresent:"sit__gb_1.mp3",        pastSimple:"sat",          sonidoPastSimple:"",  pastParticiple:"sat", sonidoParticiple:""};
    this.verbos[50]= { traduccion:"dormir",                   present:"sleep",      sonidoPresent:"sleep__gb_1.mp3",      pastSimple:"slept",        sonidoPastSimple:"",  pastParticiple:"slept", sonidoParticiple:""};
    this.verbos[51]= { traduccion:"hablar",                   present:"speak",      sonidoPresent:"speak__gb_1.mp3",      pastSimple:"spoke",        sonidoPastSimple:"",  pastParticiple:"spoken", sonidoParticiple:""};
    this.verbos[52]= { traduccion:"gastar",                   present:"spend",      sonidoPresent:"spend__gb_1.mp3",      pastSimple:"spent",        sonidoPastSimple:"",  pastParticiple:"spent", sonidoParticiple:""};
    this.verbos[53]= { traduccion:"pararse",                  present:"stand",      sonidoPresent:"stand__gb_1.mp3",      pastSimple:"stood",        sonidoPastSimple:"",  pastParticiple:"stood", sonidoParticiple:""};
    this.verbos[54]= { traduccion:"robar",                    present:"steal",      sonidoPresent:"steal__gb_1.mp3",      pastSimple:"stole",        sonidoPastSimple:"",  pastParticiple:"stolen", sonidoParticiple:""};
    this.verbos[55]= { traduccion:"nadar",                    present:"swim",       sonidoPresent:"swim__gb_1.mp3",       pastSimple:"swam",         sonidoPastSimple:"",  pastParticiple:"swum", sonidoParticiple:""};
    this.verbos[56]= { traduccion:"llevar",                   present:"take",       sonidoPresent:"take__gb_1.mp3",       pastSimple:"took",         sonidoPastSimple:"",  pastParticiple:"taken", sonidoParticiple:""};
    this.verbos[57]= { traduccion:"enseñar",                  present:"teach",      sonidoPresent:"teach__gb_1.mp3",      pastSimple:"taught",       sonidoPastSimple:"",  pastParticiple:"taught", sonidoParticiple:""};
    this.verbos[58]= { traduccion:"decir",                    present:"tell",       sonidoPresent:"tell__gb_1.mp3",       pastSimple:"told",         sonidoPastSimple:"",  pastParticiple:"told", sonidoParticiple:""} ;
    this.verbos[59]= { traduccion:"pensar",                   present:"think",      sonidoPresent:"think__gb_1.mp3",      pastSimple:"thought",      sonidoPastSimple:"",  pastParticiple:"thought", sonidoParticiple:""};
    this.verbos[60]= { traduccion:"tirar",                    present:"throw",      sonidoPresent:"throw__gb_1.mp3",      pastSimple:"threw",        sonidoPastSimple:"",  pastParticiple:"thrown", sonidoParticiple:""};
    this.verbos[61]= { traduccion:"entender",                 present:"understand", sonidoPresent:"understand_gb_1.mp3",  pastSimple:"understood",   sonidoPastSimple:"",  pastParticiple:"understood", sonidoParticiple:""};
    this.verbos[62]= { traduccion:"despertar",                present:"wake",       sonidoPresent:"wake__gb_1.mp3",       pastSimple:"woke",         sonidoPastSimple:"",  pastParticiple:"woken", sonidoParticiple:""};
    this.verbos[63]= { traduccion:"tener puesto",             present:"wear",       sonidoPresent:"wear__gb_1.mp3",       pastSimple:"wore",         sonidoPastSimple:"",  pastParticiple:"worn", sonidoParticiple:""};
    this.verbos[64]= { traduccion:"ganar",                    present:"win",        sonidoPresent:"win__gb_1.mp3",        pastSimple:"won",          sonidoPastSimple:"",  pastParticiple:"won", sonidoParticiple:""};
    this.verbos[65]= { traduccion:"escribir",                 present:"write",      sonidoPresent:"write__gb_1.mp3",      pastSimple:"wrote",        sonidoPastSimple:"",  pastParticiple:"written", sonidoParticiple:""};

  }
}
