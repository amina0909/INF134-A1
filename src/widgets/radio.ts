import { Window, Widget, RoleType, EventArgs, IdleUpWidgetState } from "../core/ui";
import { Rect, Text, Circle } from "../core/ui";

class RadioButton extends Widget {
  private _circle: Circle;
  private _dot: Circle;
  private _label: Text;
  private _checked: boolean = false;
  private _onClick?: () => void;

  constructor(parent: Window, label: string) {
    super(parent);
    this.role = RoleType.button;
    this.width = 200;
    this.height = 30;

    this.setState(new IdleUpWidgetState());
    this.selectable = false;

    this.render();
    this.label = label;
  }

  override render(): void {
    const svgRoot = (this.parent as Window).window;
    this._group = svgRoot.group();

    this._circle = this._group.circle(16).stroke({ width: 2, color: "#A7D2CB" }).fill("#fff").move(0, 0);
    this._dot = this._group.circle(16).fill("#A7D2CB").center(0, 8).hide();
    this._label = this._group.text("").move(25, 15).font({ size: 19 });

    this.outerSvg = this._group;

    this._circle.click(() => this.toggle());
    this._label.click(() => this.toggle());
  }

  private toggle() {
    if (this._onClick) this._onClick();
  }

  public check() {
    this._checked = true;
    this._dot.show();
    this.update();
  }

  public uncheck() {
    this._checked = false;
    this._dot.hide();
    this.update();
  }

  public isChecked(): boolean {
    return this._checked;
  }

  public onClicked(callback: () => void) {
    this._onClick = callback;
  }

  public set label(value: string) {
    this._label.text(value);
    this.update();
  }

  public get label(): string {
    return this._label.text();
  }

  // Required overrides
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
    return RoleType.button;
  }
  getValue(): any {
    return this._checked;
  }
  handleEvent(e: EventArgs): void {}
}

class RadioGroup {
    private _buttons: RadioButton[] = [];
    private _selectedIndex: number = -1;
    private _onChange?: (index: number, label: string) => void;
  
    constructor(parent: Window, labels: string[], startX: number, startY: number) {
      labels.forEach((label, i) => {
        const btn = new RadioButton(parent, label);
        btn.move(startX, startY + i * 35); // vertical spacing
        btn.onClicked(() => this.select(i));
        this._buttons.push(btn);
      });
    }
  
    private select(index: number) {
      if (this._selectedIndex !== -1) {
        this._buttons[this._selectedIndex].uncheck();
      }
      this._selectedIndex = index;
      this._buttons[index].check();
  
      if (this._onChange) {
        this._onChange(index, this._buttons[index].label);
      }
    }
  
    public onSelectionChanged(callback: (index: number, label: string) => void) {
      this._onChange = callback;
    }
}

export { RadioGroup, RadioButton };
