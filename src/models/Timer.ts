export class Timer {
  private time: number = 0;
  private intervalId: any;

  start() {
    this.intervalId = setInterval(() => {
      this.time++;
      this.show();
    }, 1000);
  }

  show() {
    $("#timer").text(this.time);
  }

  stop() {
    clearInterval(this.intervalId);
  }

  reset() {}
}
