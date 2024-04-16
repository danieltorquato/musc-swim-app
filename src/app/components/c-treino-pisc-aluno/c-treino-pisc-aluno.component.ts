import { Component, OnInit } from '@angular/core';
import { AlertController, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-c-treino-pisc-aluno',
  templateUrl: './c-treino-pisc-aluno.component.html',
  styleUrls: ['./c-treino-pisc-aluno.component.scss'],
})
export class CTreinoPiscAlunoComponent  implements OnInit {
  root: any;

  async canDismiss(data?: any, role?: string) {
    return role !== 'gesture';
  }
  constructor(private animationCtrl: AnimationController) { }
  enterAnimation = (baseEl: HTMLElement) => {
    this.root = baseEl.shadowRoot;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(this.root.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(this.root.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };
  ngOnInit() {}

}

