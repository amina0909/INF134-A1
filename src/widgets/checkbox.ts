import { IdleUpWidgetState, PressedWidgetState, Window, Widget, RoleType, EventArgs } from "../core/ui";
import { Rect, Text, Box, Container } from "../core/ui";

class CheckBox extends Widget {
    private _box: Rect;
    private _label: Text;
    private _checked: boolean = false;
    private _onChange?: (checked: boolean) => void;
    private _checkmark: Text;
  
    constructor(parent: Window, label = "Check me") {
        super(parent);
        this.role = RoleType.checkbox;
    
        // initialize size
        this.width = 120;
        this.height = 25;
    
        this.setState(new IdleUpWidgetState());
        this.selectable = false;
    
        this.render();
        this.label = label; 
      }

      override render(): void {
        console.log("CheckBox render() called");
        const svgRoot = (this.parent as Window).window;
        this._group = svgRoot.group();
        console.log("Checkbox group created:", this._group);
      
        this._box = this._group.rect(20, 20)
          .fill("#ffffff")
          .stroke({ color: "#007BFF", width: 2 })
          .move(0, 0)
          .attr({ 'pointer-events': 'all' });
      
        this._checkmark = this._group.text("✔")
          .move(4, 1)
          .font({ size: 18, anchor: "left" })
          .fill("#56C596");
        this._checkmark.hide();
    
        this._label = this._group.text("").move(30, 15);
      
        const eventRect = this._group.rect(this.width, this.height).opacity(0);
        this.registerEvent(eventRect);
        this._box.front();
        this._label.front();
        this._checkmark.front();
        this.outerSvg = this._group;
      
        this._box.click(() => {
            console.log("Box clicked");
            this.toggle();
          });
          this._label.click(() => {
            console.log("Label clicked");
            this.toggle();
          });
      }
      
    
      override update(): void {
        this._label.text(this.label);
        console.log("Updating checkbox. Checked:", this._checked);

        if (this._checked) {
            this._box.fill("#ffffff");
            this._checkmark.show();
          } else {
            this._box.fill("#ffffff");
            this._checkmark.hide();
          }

        this._box.stroke({ color: "#A7D2CB", width: 2 }); 
        this._box.attr({ 'pointer-events': 'visiblePainted' });
        super.update();
      }

      get label(): string {
        return this._label.text();
      }
      
      set label(value: string) {
        this._label.text(value);
        this.update();
      }
    
      private toggle() {
        this._checked = !this._checked;
        console.log("Toggled! Checked is now:", this._checked);
        this.update();
        if (this._onChange) this._onChange(this._checked);
        this.raise(new EventArgs(this));
      }
    
      public onCheckedChanged(callback: (checked: boolean) => void): void {
        this._onChange = callback;
      }
    
      // Visual States
      idleupState(): void {
        this._box.stroke({ color: "#999" });
      }
      idledownState(): void {
        this._box.stroke({ color: "#ccc" });
      }
      pressedState(): void {
        //add later
      }
      hoverState(): void {
        this._box.stroke({ color: "#5EAAA8" });
      }
      hoverPressedState(): void {
        //optional
      }
      pressedoutState(): void {
        //optional
      }
      pressReleaseState(): void {
        // Optional: checkbox already toggles on click
      }
      moveState(): void {
        // Optional visual cue (e.g., scale slightly)
      }
      keyupState(): void {
        // Optional keyboard toggle
      }
    
      getRole(): RoleType {
        return RoleType.checkbox;
      }
    
      getValue(): boolean {
        return this._checked;
      }
    
      handleEvent(e: EventArgs): void {
        // Optional: handle specific event args
      }
}
    
export { CheckBox };