var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// importing local code, code we have written
import { IdleUpWidgetState, PressedWidgetState } from "../core/ui";
import { Widget, RoleType, EventArgs } from "../core/ui";
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button(parent) {
        var _this = _super.call(this, parent) || this;
        _this.defaultText = "Button";
        _this.defaultFontSize = 18;
        _this.defaultWidth = 80;
        _this.defaultHeight = 30;
        // set defaults
        _this.height = _this.defaultHeight;
        _this.width = _this.defaultWidth;
        _this._input = _this.defaultText;
        _this._fontSize = _this.defaultFontSize;
        // set Aria role
        _this.role = RoleType.button;
        // render widget
        _this.render();
        // set default or starting state
        _this.setState(new IdleUpWidgetState());
        // prevent text selection
        _this.selectable = false;
        return _this;
    }
    Object.defineProperty(Button.prototype, "fontSize", {
        set: function (size) {
            this._fontSize = size;
            this.update();
        },
        enumerable: false,
        configurable: true
    });
    Button.prototype.positionText = function () {
        var box = this._text.bbox();
        // in TS, the prepending with + performs a type conversion from string to number
        this._text_y = (+this._rect.y() + ((+this._rect.height() / 2)) - (box.height / 2));
        this._text.x(+this._rect.x() + 4);
        if (this._text_y > 0) {
            this._text.y(this._text_y);
        }
    };
    Button.prototype.render = function () {
        this._group = this.parent.window.group();
        this._rect = this._group.rect(this.width, this.height);
        this._rect.stroke("black");
        this._text = this._group.text(this._input);
        // Set the outer svg element 
        this.outerSvg = this._group;
        // Add a transparent rect on top of text to 
        // prevent selection cursor and to handle mouse events
        var eventrect = this._group.rect(this.width, this.height).opacity(0).attr('id', 0);
        // register objects that should receive event notifications.
        // for this widget, we want to know when the group or rect objects
        // receive events
        this.registerEvent(eventrect);
    };
    Button.prototype.update = function () {
        if (this._text != null)
            this._text.font('size', this._fontSize);
        this._text.text(this._input);
        this.positionText();
        if (this._rect != null)
            this._rect.fill(this.backcolor);
        _super.prototype.update.call(this);
    };
    Button.prototype.pressReleaseState = function () {
        if (this.previousState instanceof PressedWidgetState)
            this.raise(new EventArgs(this));
    };
    //TODO: implement the onClick event using a callback passed as a parameter
    Button.prototype.onClick = function ( /*TODO: add callback parameter*/) { };
    //TODO: give the states something to do! Use these methods to control the visual appearance of your
    //widget
    Button.prototype.idleupState = function () {
        throw new Error("Method not implemented.");
    };
    Button.prototype.idledownState = function () {
        throw new Error("Method not implemented.");
    };
    Button.prototype.pressedState = function () {
        throw new Error("Method not implemented.");
    };
    Button.prototype.hoverState = function () {
        throw new Error("Method not implemented.");
    };
    Button.prototype.hoverPressedState = function () {
        throw new Error("Method not implemented.");
    };
    Button.prototype.pressedoutState = function () {
        throw new Error("Method not implemented.");
    };
    Button.prototype.moveState = function () {
        throw new Error("Method not implemented.");
    };
    Button.prototype.keyupState = function (keyEvent) {
        throw new Error("Method not implemented.");
    };
    return Button;
}(Widget));
export { Button };
//# sourceMappingURL=button.js.map