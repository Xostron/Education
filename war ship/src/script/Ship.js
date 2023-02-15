class Ship {
  imgFront = "./src/source/icon/1xh.svg";
  imgOther = "./src/source/icon/0x.svg";
  constructor(size) {
    this.size = size;
    this.ship = Array(size).fill(0);
  }
}

class shipCard {
  // img1xh = "./src/source/icon/1xh.svg";
  // img2xh = "./src/source/icon/2xh.svg";
  // img3xh = "./src/source/icon/3xh.svg";
  // img4xh = "./src/source/icon/4xh.svg";
  // img5xh = "./src/source/icon/5xh.svg";
  // img1xv = "./src/source/icon/1xv.svg"
  // img2xv = "./src/source/icon/2xv.svg"
  // img3xv = "./src/source/icon/3xv.svg"
  // img4xv = "./src/source/icon/4xv.svg"
  // img5xv = "./src/source/icon/5xv.svg"
  constructor(size, sum) {
    this.size = size;
    this.sum = sum;
    if (size > 0 && size < 6) {
      this.img = `./src/source/icon/${size}xh.svg`;
    } else {
      this.img = "./src/source/icon/1xh.svg";
    }
  }
  sub() {
    this.sum--;
    Toolbar(header, tools);
  }
  mouseDown(){
    
  }
}
