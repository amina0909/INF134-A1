import { Widget, RoleType, EventArgs, Window } from "../core/ui";
import { Rect } from "../core/ui";

class ProgressBar extends Widget {
  private _baseBar: Rect;
  private _fillBar: Rect;
  private _width: number = 200;
  private _height: number = 20;
  private _value: number = 0; // 0–100%
  private _onProgressChanged?: (value: number) => void;
  private _onStateChanged?: () => void;

  constructor(parent: Window) {
    super(parent);
    this.role = RoleType.none;
    this.setState(null);
    this.selectable = false;

    this.render();
  }

  override render(): void {
    const svgRoot = (this.parent as Window).window;
    this._group = svgRoot.group();

    // Base/background
    this._baseBar = this._group.rect(this._width, this._height)
      .fill("#eee")
      .stroke({ width: 1, color: "#999" });

    // Fill/progress
    this._fillBar = this._group.rect(0, this._height) // starts at 0%
      .fill("#A7D2CB");

    this.outerSvg = this._group;
    this.update();
  }

  override update(): void {
    const fillWidth = (this._value / 100) * this._width;
    this._fillBar.width(fillWidth);
    super.update();
  }

  set progressWidth(value: number) {
    this._width = value;
    this._baseBar.width(value);
    this.update();
  }

  set incrementValue(value: number) {
    this._value = Math.max(0, Math.min(100, value));
    this.update();
  }

  get incrementValue(): number {
    return this._value;
  }


  public increment(value: number) {
    const newValue = Math.min(100, this._value + value);
    if (newValue !== this._value) {
      this._value = newValue;
      this.update();

      // Notify listeners
      if (this._onProgressChanged) this._onProgressChanged(this._value);
      this.raise(new EventArgs(this)); // State change notification
      if (this._onStateChanged) this._onStateChanged();
    }
  }

  public onProgressChanged(callback: (value: number) => void) {
    this._onProgressChanged = callback;
  }

  public onStateChanged(callback: () => void) {
    this._onStateChanged = callback;
  }

  // Required stubs
  idleupState(): void {}
  idledownState(): void {}
  pressedState(): void {}
  hoverState(): void {}
  hoverPressedState(): void {}
  pressedoutState(): void {}
  pressReleaseState(): void {}
  moveState(): void {}
  keyupState(): void {}

  getRole(): RoleType {
    return RoleType.none;
  }

  getValue(): any {
    return this._value;
  }

  handleEvent(e: EventArgs): void {}
}

export { ProgressBar };