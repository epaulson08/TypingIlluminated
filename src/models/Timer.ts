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
    let formattedTime: string = this.formatTime(this.time);
    $("#timer").text(formattedTime);
  }

  stop() {
    clearInterval(this.intervalId);
  }

  reset() {}
  private formatTime(seconds: number) {
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
