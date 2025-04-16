// importing local code, code we have written
import {IdleUpWidgetState, PressedWidgetState } from "../core/ui";
import {Window, Widget, RoleType, EventArgs} from "../core/ui";
// importing code from SVG.js library
import {Rect, Text, Box} from "../core/ui";

class Button extends Widget{
    private _rect: Rect;
    private _text: Text;
    private _input: string;
    private _fontSize: number;
    private _text_y: number;
    private _text_x: number;
    private defaultText: string= "Button";
    private defaultFontSize: number = 18;
    private defaultWidth: number = 80;
    private defaultHeight: number = 30;
    private _onClickCallback?: () => void;
    private _colors: string[] = ["#A7D2CB", "#056676", "#FFC93C", "#FF6F61"];
    private _colorIndex: number = 0;


    constructor(parent:Window){
        super(parent);
        // set defaults
        this.height = this.defaultHeight;
        this.width = this.defaultWidth;
        this._input = this.defaultText;
        this._fontSize = this.defaultFontSize;
        // set Aria role
        this.role = RoleType.button;
        // render widget
        this.render();
        // set default or starting state
        this.setState(new IdleUpWidgetState());
        // prevent text selection
        this.selectable = false;
    }

    set fontSize(size:number){
        this._fontSize= size;
        this.update();
    }

    get label(): string {
        return this._input;
    }
    
    set label(value: string) {
        this._input = value;
        this.update();
    }

    get size(): { width: number; height: number } {
        return { width: this.width, height: this.height };
    }
    
    set size(dimensions: { width: number; height: number }) {
        this.width = dimensions.width;
        this.height = dimensions.height;
        this._rect.size(this.width, this.height);
        this.update();
    }

    private positionText(){
        let box:Box = this._text.bbox();
        // in TS, the prepending with + performs a type conversion from string to number
        this._text_y = (+this._rect.y() + ((+this._rect.height()/2)) - (box.height/2));
        this._text.x(+this._rect.x() + 4);
        if (this._text_y > 0){
            this._text.y(this._text_y);
        }
    }

    private changeColor(): void {
        this._colorIndex = (this._colorIndex + 1) % this._colors.length;
        this._rect.fill(this._colors[this._colorIndex]);
    }
    
    render(): void {
        this._group = (this.parent as Window).window.group();
        this._rect = this._group.rect(this.width, this.height);
        this._rect.fill("#A7D2CB"); 
        this._rect.stroke({ color: "#444", width: 2 })
        this._rect.radius(6);
        this._text = this._group.text(this._input);
        // Set the outer svg element 
        this.outerSvg = this._group;
        // Add a transparent rect on top of text to 
        // prevent selection cursor and to handle mouse events
        let eventrect = this._group.rect(this.width, this.height).opacity(0).attr('id', 0);

        // register objects that should receive event notifications.
        // for this widget, we want to know when the group or rect objects
        // receive events
        this.registerEvent(eventrect);
    }

    override update(): void {
        if(this._text != null)
            this._text.font('size', this._fontSize);
            this._text.text(this._input);
            this.positionText();

        if(this._rect != null)
            this._rect.fill(this.backcolor);
        
        super.update();
    }
    
    pressReleaseState(): void {
        if (this.previousState instanceof PressedWidgetState) {
            this.changeColor();
            if (this._onClickCallback) {
                this._onClickCallback();
            }
            this.raise(new EventArgs(this));
        }
    }

    //TODO: implement the onClick event using a callback passed as a parameter
    onClick(callback: () => void): void {
        this._onClickCallback = callback;
    }

    
    //TODO: give the states something to do! Use these methods to control the visual appearance of your
    //widget
    idleupState(): void {
        this._rect.fill("#A7D2CB");
    }
    idledownState(): void {
        this._rect.fill("#B5D3C9");
    }
    pressedState(): void {
        this._rect.fill("#056676");
        this._group.scale(0.95);
    }
    hoverState(): void {
        this._rect.fill("#5EAAA8");
    }
    hoverPressedState(): void {
        this._rect.fill("#056676");
    }
    pressedoutState(): void {
        this._rect.fill("#E2E2E2");
        this._group.scale(1);
    }
    moveState(): void {
        this._group.scale(1.02);
    }
    keyupState(keyEvent?: KeyboardEvent): void {
        if (keyEvent && (keyEvent.key === "Enter" || keyEvent.key === " ")) {
            this._rect.fill("#FFD56F");
        if (this._onClickCallback) {
            this._onClickCallback();
        }
    }
    }
}

export {Button}