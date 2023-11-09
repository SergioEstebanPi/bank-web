import * as moment from 'moment';

export class Formater {

  public static FORMATO_FECHA = "YYYY-MM-DD";
  public static FORMATO_FECHA_HORA = "YYYY-MM-DD HH:MM:SS";
  now:Date;
  monthAgo:Date;

  constructor(){
    this.now = new Date();
    this.monthAgo = new Date(this.now.getFullYear(),
      this.now.getMonth() - 1,
      this.now.getDate(),
      this.now.getHours());
  }

  fechaIniMothAgo(){
    return moment(this.monthAgo, Formater.FORMATO_FECHA).toISOString()
  }

  fechaFinNow(){
    return moment(this.now, Formater.FORMATO_FECHA).toISOString()
  }

  formaterFecha(fecha:Date){
    return (moment(fecha)).format(Formater.FORMATO_FECHA).toString();
  }

  formatearFechaHora(fecha:Date) {
    return (moment(fecha).format(Formater.FORMATO_FECHA_HORA).toString());
  }
}