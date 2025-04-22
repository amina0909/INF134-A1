import { Widget, RoleType, EventArgs, Window } from "../core/ui";
import { Rect, Polygon, G } from "../core/ui";

class ScrollBar extends Widget {
  private _track: Rect;
  private _thumb: Rect;
  private _upButton: Polygon;
  private _downButton: Polygon;
  private _onMove?: (position: number, direction: "up" | "down" | "jump") => void;

  private _trackHeight: number = 200;
  private _thumbHeight: number = 30;
  private _step: number = 10;

  constructor(parent: Window) {
    super(parent);
    this.role = RoleType.scrollbar;
    this.setState(null); // optional, unless you want interactive states
    this.selectable = false;

    this.render();
  }

  override render(): void {
    const svgRoot = (this.parent as Window).window;
    this._group = svgRoot.group();

    // Track
    this._track = this._group.rect(20, this._trackHeight)
      .fill("#f0f0f0")
      .stroke({ width: 2, color: "#ccc" })
      .move(0, 20); // leaves room for up button

    // Thumb
    this._thumb = this._group.rect(20, this._thumbHeight)
      .fill("#A7D2CB")
      .move(0, 20); // starts at top of track

    // Up Button (triangle)
    this._upButton = this._group.polygon("10,0 20,15 0,15")
      .fill("#A7D2CB")
      .move(0, 0);

    // Down Button (triangle)
    this._downButton = this._group.polygon("0,0 20,0 10,15")
      .fill("#A7D2CB")
      .move(0, this._trackHeight + 25); // below track

    // Handle up/down clicks
    this._upButton.click(() => this.moveThumb("up"));
    this._downButton.click(() => this.moveThumb("down"));

    // Clicking the track moves the thumb
    this._track.click((event: MouseEvent) => {
      const clickY = event.offsetY;
      this.jumpTo(clickY);
    });

    this.outerSvg = this._group;
  }

  // Moves the thumb in a given direction
  private moveThumb(direction: "up" | "down") {
    let currentY = this._thumb.y();
    if (direction === "up") {
      currentY = Math.max(this._track.y(), currentY - this._step);
    } else {
      const maxY = this._track.y() + this._trackHeight - this._thumbHeight;
      currentY = Math.min(maxY, currentY + this._step);
    }
    this._thumb.y(currentY);
    if (this._onMove) this._onMove(currentY, direction);
  }

  private jumpTo(y: number) {
    const trackTop = this._track.y();
    const maxY = trackTop + this._trackHeight - this._thumbHeight;
    const newY = Math.min(maxY, Math.max(trackTop, y - this._thumbHeight / 2));
    this._thumb.y(newY);
    if (this._onMove) this._onMove(newY, "jump");
  }

  // Exposed property to set height
  set scrollHeight(value: number) {
    this._trackHeight = value;
    this._track.height(value);
    this._downButton.move(0, value + 20);
  }

  get scrollHeight(): number {
    return this._trackHeight;
  }

  // Exposed getter for thumb position
  get thumbPosition(): number {
    return this._thumb.y();
  }

  // Register move event handler
  public onThumbMove(callback: (position: number, direction: "up" | "down" | "jump") => void) {
    this._onMove = callback;
  }

  // Required empty overrides (not used here)
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
    return RoleType.scrollbar;
  }
  getValue(): any {
    return this.thumbPosition;
  }
  handleEvent(e: EventArgs): void {}
}

export { ScrollBar };