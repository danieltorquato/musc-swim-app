import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-c-treino-pisc-aluno',
  templateUrl: './c-treino-pisc-aluno.component.html',
  styleUrls: ['./c-treino-pisc-aluno.component.scss'],
})
export class CTreinoPiscAlunoComponent  implements OnInit {
  public isRunning: boolean = false;
  public seconds: number = 0;
  public centiseconds: number = 0;
  private interval: any;
  public laps: { seconds: number; centiseconds: number }[] = [];
  public totalTime: number = 0;
  public lapCount: number = 0;
  public fastestLap: { seconds: number; centiseconds: number } | null = null;
  public averageTime: { seconds: number; centiseconds: number } | null = null;
  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
      },
    },
  ];

  constructor(private alertController: AlertController) { }

  ngOnInit() {}
 
}

