import { Component } from '@angular/core';
import { MatButtonModule, MatToolbarModule, MatProgressSpinnerModule } from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  scores = [0, 0]; // store the scores index 0 is me and index 1 is player 1
  weapons = [
    'rock',
    'paper',
    'scissors'
  ];
  playerSelected = -1;
  enemySelected = -1;
  loading = false; // were going to show a loading spinner when waiting for the enme enemy pick
  isResultShow = false;
  // theResult 0 winner
  //           1 lose
  //           2 tie
  theResult = 0;

  public pick(weapon: number): void {
     // return immediately when still loading. You dont
     // when the user to spam the button
     if (this.loading) {return; }
     this.loading = true;
     this.playerSelected = weapon;

     // create a delay to simulate enemy's turn
     setTimeout( () => {
       this.loading = false;
       // generate a number from 0 -2
       const randomNum = Math.floor(Math.random() * 3);
       this.enemySelected = randomNum;
       this.checkResult();
       this.isResultShow = true;
     }, Math.floor(Math.random() * 500) + 200);
  }

  reset(): void {
    this.scores = [0, 0];
  }

  checkResult(): void {
    const playerPick = this.playerSelected;
    const enemyPick = this.enemySelected;
    // you lose because ( 0 - 1 + 3 ) % 3  is equal to 2.
      // when you picked rock ( 0 )
      // and the enemy picked scissor ( 2 )
      // you win because ( 0 - 2 + 3) % 3 is equal to 1.
      // when you picked scissor ( 2 )
    // and the enemy picked paper ( 1 )
    // you win because ( 2 - 1 + 3 ) % 3 is equal to 1. 4 % 3 is 1.
    // Hope you get the picture.
    if (playerPick === enemyPick) {
      this.theResult = 2;
    } else if ( (playerPick - enemyPick + 3) % 3 === 1)    {
        // YOU WIN
        this.theResult = 0;
        this.scores[0] = this.scores[0] + 1;
    } else {
        // YOU LOSE
        this.theResult = 1;
          this.scores[1] = this.scores[1] + 1;
      }
    }
}
