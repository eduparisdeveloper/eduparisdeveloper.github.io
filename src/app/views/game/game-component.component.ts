import { Component } from '@angular/core';
import { Verb , estados} from './game.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as data from '../../../assets/verbos.json';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
  styleUrls: ['./game-component.component.scss']
})

export class GameComponent {
  //numericos
  stateGame: number = 0;
  numerolinea: number = 0;
  aciertos1: number = 0;
  aciertosFallo: number = 0;
  aciertosPista: number = 0;
  verbosSaltados: number = 0;

  //booleanos
  stateInput: boolean = true;
  finalJuego: boolean = false;


  botonAction = "";
  fallo: boolean = false;
  pista: boolean = false;
  estadoBoton: boolean = true;
  stateDisabled: boolean = true;
  fallado: boolean  = false;

//objetos
  verbos: Array<Verb> = [];
  verbo: Verb = {traduccion:"", present:"", sonidoPresent:"", pastSimple:"", sonidoPastSimple:"",  pastParticiple:"", sonidoParticiple:""};
  //campos input
  infinitivo: string = "";
  pasado: string = "";
  participio: string ="";

  claseInfinitivo: string="classJugando";
  clasePasado: string = "classJugando";
  claseParticipio: string = "classJugando";





  darPista(){
    this.infinitivo = this.verbo.present.slice(0,1);
    this.pista = true;
  }

  ngOnInit() {
    this.stateGame=1;//Sin empezar
    this.maquinaDeJuego(this.stateGame);
  }

  saltarVerbo(){
    this.verbos.splice(this.numerolinea, 1);
    if(this.verbos.length != 0){
      this.stateGame = 2;
      this.verbosSaltados++;
    }else{
      this.stateGame = 4;
    }
    this.maquinaDeJuego(this.stateGame);
  }
  habilitarCampos(){

  }
  maquinaDeJuego(state:number){
    switch(state){
      case 1:
        this.botonAction = estados[state -1];
        this.rellenarArray();
        this.stateGame = 2;
        break;

      case 2:
          this.finalJuego = false;
          this.stateInput = false;
          this.limpiarCampos();
          this.cogerVerbo();
          this.estadoBoton = false;
          this.botonAction = estados[state -1];
          this.stateGame = 3;
        break;
      case 3:
        var contador: number = 0;
        contador += this.comprobarInfinitivo();
        contador += this.comprobarPasado();
        contador += this.comprobarParticipio();
        if(contador == 3){

          if(this.pista == true){
            this.aciertosPista++;
          }
          this.botonAction = estados[state -1];;
          this.stateDisabled= false;
          this.stateGame = 2;
          this.verbos.splice(this.numerolinea, 1);
          if(this.fallo ==  false){
            this.aciertos1++;
          }else{
            this.aciertosFallo++;
          }
        }else{
          this.fallo = true;
          this.aciertosFallo++;
        }
        break;
        case 4:
          this.finalJuego = true;
          this.stateInput = true;
          this.estadoBoton = true;
          this.stateGame = 1;
          this.maquinaDeJuego(this.stateGame);
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
    this.stateDisabled = true;
    this.fallo = false;
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

  mostrarTitulo(): boolean{
    if(this.estadoBoton == true){
      return false;
    } else{
      return true;
    }
  }

  cogerVerbo(){
    if(this.verbos.length > 0){
      var numero:number = this.numeroAleatorio(this.verbos.length);
      this.numerolinea = numero;
      this.verbo = this.verbos[numero];
    }else{
      this.stateGame = 1;
      this.maquinaDeJuego(this.stateGame);
    }

  }

  numeroAleatorio(maximo: number):number{
    var numberRandom = Math.random()* (maximo-1);
    return Math.round(numberRandom * 1);
  }

  rellenarArray(){

    this.verbos = (data as any).verbos;
  }


}


