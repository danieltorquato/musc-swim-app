import { SafePipe } from './safe.pipe';
import { DomSanitizer } from '@angular/platform-browser';
describe('SafePipe', () => {
  it('create an instance', () => {
    const pipe = new SafePipe(DomSanitizer);
    expect(pipe).toBeTruthy();
  });
});
