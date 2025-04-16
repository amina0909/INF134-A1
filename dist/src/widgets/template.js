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
import { Widget, RoleType } from "../core/ui";
var Template = /** @class */ (function (_super) {
    __extends(Template, _super);
    function Template(parent) {
        var _this = _super.call(this, parent) || this;
        _this.defaultWidth = 80;
        _this.defaultHeight = 30;
        // set defaults
        _this.height = _this.defaultHeight;
        _this.width = _this.defaultWidth;
        // set Aria role
        _this.role = RoleType.none;
        //TODO:
        // set default state!
        // render widget
        _this.render();
        return _this;
    }
    Template.prototype.render = function () {
        this._group = this.parent.window.group();
        // Set the outer svg element 
        this.outerSvg = this._group;
        // Add a transparent rect on top of text to prevent selection cursor
        this._group.rect(this.width, this.height).opacity(0).attr('id', 0);
        this.backcolor = "silver";
        // register objects that should receive event notifications.
        // for this widget, we want to know when the group or rect objects
        // receive events
        this.registerEvent(this.outerSvg);
    };
    //TODO: give the states something to do! Use these methods to control the visual appearance of your
    //widget
    Template.prototype.idleupState = function () {
        throw new Error("Method not implemented.");
    };
    Template.prototype.idledownState = function () {
        throw new Error("Method not implemented.");
    };
    Template.prototype.pressedState = function () {
        throw new Error("Method not implemented.");
    };
    Template.prototype.pressReleaseState = function () {
        throw new Error("Method not implemented.");
    };
    Template.prototype.hoverState = function () {
        throw new Error("Method not implemented.");
    };
    Template.prototype.hoverPressedState = function () {
        throw new Error("Method not implemented.");
    };
    Template.prototype.pressedoutState = function () {
        throw new Error("Method not implemented.");
    };
    Template.prototype.moveState = function () {
        throw new Error("Method not implemented.");
    };
    Template.prototype.keyupState = function () {
        throw new Error("Method not implemented.");
    };
    return Template;
}(Widget));
export { Template };
//# sourceMappingURL=template.js.map