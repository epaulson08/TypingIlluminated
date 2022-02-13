export class Timer {
  private time: number = 0;
  private intervalId: any = -1;

  start() {
    this.intervalId = setInterval(() => {
      this.time++;
      this.show();
    }, 1000);
  }

  show() {
    $("#timer").text(Timer.formatTime(this.time));
  }

  stop() {
    clearInterval(this.intervalId);
  }

  reset() {
    this.time = 0;
    this.show();
    this.intervalId = -1;
  }

  getTime() {
    return this.time;
  }

  static formatTime(seconds: number): string {
    let formattedTime: string = "";
    let secondsRemainder: number = seconds % 60;
    let minutes: number = (seconds - secondsRemainder) / 60;
    if (minutes < 10) {
      formattedTime += "0" + minutes;
    } else {
      formattedTime += minutes;
    }

    formattedTime += ":";

    if (secondsRemainder < 10) {
      formattedTime += "0" + secondsRemainder.toString();
    } else {
      formattedTime += secondsRemainder.toString();
    }

    return formattedTime;
  }
}
