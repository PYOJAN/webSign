class Signature {
  constructor() {
    this.dpi = window.devicePixelRatio;
    this.mouse = {
      startX: 0,
      startY: 0,
    };
  }

  setCanvas(element) {
    if (!element) throw new Error("Element is require for setCanvas");

    // Get the bounding rectangle of target
    const rect = element.target.getBoundingClientRect();

    const X = parseInt((element.clientX - rect.left) * this.dpi);
    const Y = parseInt((element.clientY - rect.top) * this.dpi);

    this.mouse = {
      startX: X,
      startY: Y,
    };
  }
}

export default Signature = new Signature();
