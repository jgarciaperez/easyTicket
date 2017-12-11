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
  tableSolutions: any[] = [];

  calculationResult:any;
  errorMessage: string;

  constructor(public navCtrl: NavController) {}

  calculatePayment(){
    if(this.fastPaypment && this.listTickets.length > 0){

      if(this.listTickets.length > 1){
        

      }else{

        let remainder = Math.round((this.paymentQuantity % this.listTickets[0].ticketType) * 100) / 100;

        this.calculationResult = 'Tendrás que abonar ' + Math.trunc(this.paymentQuantity / this.listTickets[0].ticketType) + ' Tickets de '+ this.listTickets[0].ticketType + '€';

        if(remainder != 0){
          this.calculationResult = this.calculationResult + ' y ' + remainder + '€ en monedas.';
        }
        
      }
      
    }
    
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
