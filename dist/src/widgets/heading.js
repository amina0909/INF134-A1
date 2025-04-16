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
import { Widget, RoleType, IdleUpWidgetState } from "../core/ui";
var Heading = /** @class */ (function (_super) {
    __extends(Heading, _super);
    function Heading(parent) {
        var _this = _super.call(this, parent) || this;
        _this.defaultText = "Heading";
        _this.defaultFontSize = 18;
        _this.defaultWidth = 80;
        _this.defaultHeight = 30;
        // set defaults
        _this.height = _this.defaultHeight;
        _this.width = _this.defaultWidth;
        _this._input = _this.defaultText;
        _this._fontSize = _this.defaultFontSize;
        /* aria */
        _this.role = RoleType.heading;
        // render widget
        _this.render();
        // set default or starting state
        _this.setState(new IdleUpWidgetState());
        // prevent text selection
        _this.selectable = false;
        _this.backcolor = "white";
        return _this;
    }
    Object.defineProperty(Heading.prototype, "text", {
        get: function () {
            return this._input;
        },
        set: function (text) {
            this._input = text;
            this.update();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Heading.prototype, "fontSize", {
        set: function (size) {
            this._fontSize = size;
            this.update();
        },
        enumerable: false,
        configurable: true
    });
    Heading.prototype.positionText = function () {
        var box = this._text.bbox();
        // in TS, the prepending with + performs a type conversion from string to number
        this._text_y = (+this._rect.y() + ((+this._rect.height() / 2)) - (box.height / 2));
        this._text.x(+this._rect.x() + 4);
        if (this._text_y > 0) {
            this._text.y(this._text_y);
        }
        // resize container rect to match fontSize
        this._rect.width(box.width);
        this._rect.height(box.height);
    };
    Heading.prototype.move = function (x, y) {
        if (this._group != null)
            this._group.move(x, y);
        this.update();
    };
    Heading.prototype.render = function () {
        this._group = this.parent.window.group();
        this._rect = this._group.rect(this.width, this.height);
        this._text = this._group.text(this._input);
        this.outerSvg = this._group;
        // register objects that should receive event notifications.
        // for this widget, we want to know when the group or rect objects
        // receive events
        this.registerEvent(this._group);
        this.registerEvent(this._rect);
    };
    Heading.prototype.update = function () {
        if (this._text != null)
            this._text.font('size', this._fontSize);
        this._text.text(this._input);
        this.positionText();
        if (this._rect != null)
            this._rect.fill(this.backcolor);
        _super.prototype.update.call(this);
    };
    Heading.prototype.idleupState = function () {
    };
    Heading.prototype.idledownState = function () {
    };
    Heading.prototype.pressedState = function () {
    };
    Heading.prototype.pressReleaseState = function () {
    };
    Heading.prototype.hoverState = function () {
    };
    Heading.prototype.hoverPressedState = function () {
    };
    Heading.prototype.pressedoutState = function () {
    };
    Heading.prototype.moveState = function () { };
    Heading.prototype.keyupState = function () { };
    return Heading;
}(Widget));
export { Heading };
//# sourceMappingURL=heading.js.map