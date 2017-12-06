import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Ticket } from './ticket.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  type:number;
  quantity:number;
  priority:boolean = false;
  paymentReturn:boolean = true;
  paymentQuantity:number;

  fastPaypment:boolean = true;
  advancedPayment:boolean = false;

  listTickets:Array<Ticket> = [];

  calculationResult:any;

  constructor(public navCtrl: NavController) {}

  calculatePayment(){
    if(this.fastPaypment && this.listTickets.length > 0){

      if(this.listTickets.length > 1){

        this.listTickets.forEach(element => {
          
        });

      }else{
        let resto = this.paymentQuantity % this.listTickets[0].type;

        this.calculationResult = 'Tendrás que abonar ' + Math.trunc(this.paymentQuantity / this.listTickets[0].type) + ' Tickets de '+ this.listTickets[0].type + '€';

        if(resto != 0){
          this.calculationResult = this.calculationResult + ' y ' + resto + '€ en monedas.';
        }
        
      }
      
    }
    
  }

  addTicket(){
    if(this.type){

      let item:Ticket = {
        type:this.type,
        quantity:null,
        priority:this.priority,
        name:'Ticket'
      }

      this.listTickets.push(item);
      this.cleanInputs();
    }    

    
  }

  cleanInputs(){
    this.type = null;
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
