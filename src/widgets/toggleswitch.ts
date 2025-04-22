import { Widget, RoleType, EventArgs, Window } from "../core/ui";
import { Rect, Circle, Text } from "../core/ui";
import { IdleUpWidgetState } from "../core/ui";

class ToggleSwitch extends Widget {
  private _track: Rect;
  private _knob: Circle;
  private _label: Text;
  private _isOn: boolean = false;
  private _onToggle?: (checked: boolean) => void;

  constructor(parent: Window, label = "Toggle") {
    super(parent);
    this.role = RoleType.none; // optional role
    this.selectable = false;
    this.setState(new IdleUpWidgetState());
    this.buildUI(label);
  }

  private buildUI(label: string){
    const svgRoot = (this.parent as Window).window;
    this._group = svgRoot.group();

    // Background track
    this._track = this._group.rect(50, 25)
      .radius(12.5)
      .fill("#ccc")
      .stroke({ color: "#aaa", width: 1 })
      .move(0, 0);

    // Knob
    this._knob = this._group.circle(20)
      .fill("#fff")
      .move(2, 2); // initially on the left

    // Label
    this._label = this._group.text(label)
      .move(60, 5)
      .font({ size: 14 });

    // Event handling
    const eventRect = this._group.rect(120, 30).opacity(0);
    this.registerEvent(eventRect);
    eventRect.front();

    this._track.click(() => this.toggle());
    this._knob.click(() => this.toggle());
    this._label.click(() => this.toggle());

    this.outerSvg = this._group;
  }

  private toggle(): void {
    this._isOn = !this._isOn;
    console.log("Toggled. New state:", this._isOn); 

    if (this._isOn) {
      this._track.fill("#A7D2CB");
      this._knob.move(28, 2); // move knob to right
    } else {
      this._track.fill("#ccc");
      this._knob.move(2, 2); // move knob to left
    }

    if (this._onToggle) this._onToggle(this._isOn);
    this.raise(new EventArgs(this));
  }

  public onToggle(callback: (checked: boolean) => void): void {
    this._onToggle = callback;
  }

  // Empty overrides for required Widget methods
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
    return this._isOn;
  }
  handleEvent(e: EventArgs): void {}
}

export { ToggleSwitch };