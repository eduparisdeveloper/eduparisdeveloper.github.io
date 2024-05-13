export interface Verb{
  traduccion: string,
  present: string,
  sonidoPresent: string,
  pastSimple: string,
  sonidoPastSimple: string,
  pastParticiple: string,
  sonidoParticiple: string
}

export enum estados {
	Empezar,
	Comprobar,
	Siguiente,
}
