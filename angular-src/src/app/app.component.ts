import { ViewChild, ElementRef, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('collapsible') collapsible: ElementRef;
  @ViewChild('btncollapse') btncollapse: ElementRef;

  title = '[MEAN] Production Status Tracking Lite';
  height=0;

  togCollapse(){
    this.btncollapse.nativeElement.innerHTML = this.height ? 'Open Configuration': 'Close Configuration';
    this.height = this.height ? 0 : this.collapsible.nativeElement.scrollHeight;
  }
}

