import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Ticket } from './ticket.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  ticketType:number;
  quantity:number;
  priority:boolean = false;
  paymentReturn:boolean = true;
  paymentQuantity:number;

  fastPaypment:boolean = true;
  advancedPayment:boolean = false;

  listTickets:Array<Ticket> = [];
  listTicketsPriority: Array<Ticket> = [];
  tableSolutions: any[] = [];

  calculationResult:any;
  errorMessage: string;

  constructor(public navCtrl: NavController) {}

  //CALCULOS:
  // Un único ticket -- DONE
  // n tickets sin prioridad 
  // n tickets con 1 de prioridad
  // n tickets con j prioridades
  calculatePayment(){
    this.listTicketsPriority = [];
    if(this.fastPaypment && this.listTickets.length > 0){
      if(this.listTickets.length > 1){
        
        if(this.checkPriority()){

          //TODO n tickets con 1 de prioridad

        } else {

           // n tickets sin prioridad 
          this.calculationResult = this.calculateTicketsWithoutPriority();

        }

      }else{
        this.calculationResult = this.calculateUniqueTicket();
      }
      
    }
    
  }

  checkPriority(): boolean {

    this.listTickets.forEach(
      (element: Ticket) => {
        if(element.priority == true){
          this.listTicketsPriority.push(element);
        }
      }
    );

    return this.listTicketsPriority.length > 0;
  }

  calculateTicketsWithoutPriority(): string{
    // Dividir la cantidad entre el length de los tickets
    // Coger la parte decimal y la parte entera
    // Dividir cada parte entre los tickets que hayan
    // Sumar los restos
    // Comprobar si el resto se puede volver a dividir por alguno
    let cantidadADividir = this.paymentQuantity / this.listTickets.length;
    let parteEntera = Math.trunc(cantidadADividir);
    let totalRemainder = 0;
    let result = '';
    this.listTickets.forEach(
      (element: Ticket) => {
        element.quantity = Math.trunc(parteEntera / element.ticketType);
        totalRemainder += (cantidadADividir % element.ticketType) * 100 / 100;
        
      }
    )
    if(totalRemainder != 0){
      let reachedEndRemainder = this.listTickets.length;
      let index = 0; 
      while(reachedEndRemainder != 0){
        totalRemainder = Math.round(totalRemainder * 100) / 100;
        let calculation = totalRemainder - this.listTickets[index].ticketType;
        if(calculation < 0){
          reachedEndRemainder -= 1;
        } else {
          this.listTickets[index].quantity += 1;
          totalRemainder = calculation;
          index = -1;
        }
        if(index != this.listTickets.length-1){
          index += 1;
        } else {
          index = 0;
        }
        
      }

    }

    for(let i = 0; i < this.listTickets.length; i++){
      result += `Debe abonar ${this.listTickets[i].quantity} tickets de ${this.listTickets[i].ticketType}€ <br/>`
    }

    return totalRemainder != 0? result += ' y ' + totalRemainder + '€ en monedas.': result;
  }

  calculateUniqueTicket(): string{

    let remainder = Math.round((this.paymentQuantity % this.listTickets[0].ticketType) * 100) / 100;
    
    if(remainder != 0){
      return this.calculationResult + ' y ' + remainder + '€ en monedas.';
    }

    return 'Tendrás que abonar ' + Math.trunc(this.paymentQuantity / this.listTickets[0].ticketType) + ' Tickets de '+ this.listTickets[0].ticketType + '€';

  }

  addTicket(){
    this.errorMessage = '';
    if(this.ticketType){

      let item:Ticket = {
        ticketType:this.ticketType,
        quantity:null,
        priority:this.priority,
        name:'Ticket'
      }
      let ticketExists = this.checkIfTicketExists(item.ticketType);
      if(!ticketExists){
        this.listTickets.push(item);
      } else {
        this.errorMessage = "Error: Ticket ya existe";
      }
      
      this.cleanInputs();
    }    

  }

  checkIfTicketExists(ticketType: number): boolean{
    let ticketFound = false;

    this.listTickets.forEach(
      (element: Ticket) => {
        if(element.ticketType == ticketType){
          ticketFound = true;
        }
      }
    );

    return ticketFound;
  }

  cleanInputs(){
    this.ticketType = null;
    this.quantity = null;
    this.priority = false;
  }

  remove(ticket:Ticket){
    var index = this.listTickets.indexOf(ticket, 0);

    if (index > -1) {
      this.listTickets.splice(index, 1);
    }

    if(this.listTickets.length == 0){
      this.calculationResult = '';
    }

  }

  assignPriority(ticket){
    var index = this.listTickets.indexOf(ticket, 0);
    
        if (index > -1) {
          this.listTickets[index].priority = true;
        }
  }

}
