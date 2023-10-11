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
  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.interval = setInterval(() => {
        this.centiseconds++;
        if (this.centiseconds == 100) {
          this.centiseconds = 0;
          this.seconds++;
        }
      }, 10);
    }
  }

  stop() {
    if (this.isRunning) {
      this.isRunning = false;
      clearInterval(this.interval);
      const lapTime = { seconds: this.seconds, centiseconds: this.centiseconds };
      this.laps.push(lapTime);
      this.lapCount++;
      this.totalTime += lapTime.seconds * 100 + lapTime.centiseconds;
      this.reset();
      this.calculateAverageTime();
    }
  }

  reset() {

      this.seconds = 0;
      this.centiseconds = 0;

  }
  async clear(){
this.presentAlert();
  }

  recordLap() {
    if (this.isRunning) {

      const lapTime = { seconds: this.seconds, centiseconds: this.centiseconds };
      this.laps.push(lapTime);
      this.reset();
      this.lapCount++;
      this.calculateAverageTime();
      if (
        this.fastestLap === null ||
        lapTime.seconds < this.fastestLap.seconds ||
        (lapTime.seconds === this.fastestLap.seconds && lapTime.centiseconds < this.fastestLap.centiseconds)
      ) {
        this.fastestLap = lapTime;
      }
    }
  }

  calculateAverageTime() {
    if (this.lapCount > 0) {
      const totalMilliseconds = this.laps.reduce(
        (sum, lap) => sum + lap.seconds * 1000 + lap.centiseconds * 10,
        0
      );
      const averageMilliseconds = totalMilliseconds / this.lapCount;

      const averageSeconds = Math.floor(averageMilliseconds / 1000);
      const averageCentiseconds = Math.floor(
        (averageMilliseconds - averageSeconds * 1000) / 10
      );

      this.averageTime = {
        seconds: averageSeconds,
        centiseconds: averageCentiseconds
      };
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({


      message: 'Certeza que deseja limpar todo o treino?',
      buttons: [{
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
          this.laps = [];
          this.totalTime = 0;
          this.lapCount = 0;
          this.fastestLap = null;
          this.averageTime = null;
        },
      },],
    });

    await alert.present();
  }
}

