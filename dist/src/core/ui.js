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
import { SVG, Svg, G, Container, Rect, Text, Box, Circle, Number } from '@svgdotjs/svg.js';
var RoleType;
(function (RoleType) {
    RoleType["button"] = "button";
    RoleType["group"] = "group";
    RoleType["heading"] = "heading";
    RoleType["none"] = "none";
    RoleType["scrollbar"] = "scrollbar";
    RoleType["window"] = "window";
})(RoleType || (RoleType = {}));
var IdleUpWidgetState = /** @class */ (function () {
    function IdleUpWidgetState() {
    }
    IdleUpWidgetState.prototype.onEnter = function (component) {
        if (component.parent.getState() instanceof IdleDownWidgetState) {
            component.setState(new HoverPressedWidgetState());
            component.hoverPressedState();
        }
        else {
            component.setState(new HoverWidgetState());
            component.hoverState();
        }
    };
    IdleUpWidgetState.prototype.onLeave = function (component) { };
    IdleUpWidgetState.prototype.onPress = function (component) {
        component.setState(new IdleDownWidgetState());
        component.idledownState();
    };
    IdleUpWidgetState.prototype.onRelease = function (component) { };
    IdleUpWidgetState.prototype.onMove = function (component) {
    };
    IdleUpWidgetState.prototype.onKeyup = function (component) {
        component.keyupState();
    };
    return IdleUpWidgetState;
}());
var IdleDownWidgetState = /** @class */ (function () {
    function IdleDownWidgetState() {
    }
    IdleDownWidgetState.prototype.onEnter = function (component) { };
    IdleDownWidgetState.prototype.onLeave = function (component) { };
    IdleDownWidgetState.prototype.onPress = function (component) { };
    IdleDownWidgetState.prototype.onRelease = function (component) {
        component.setState(new IdleUpWidgetState());
        component.idleupState();
    };
    IdleDownWidgetState.prototype.onMove = function (component) {
        component.moveState();
    };
    IdleDownWidgetState.prototype.onKeyup = function (component) {
    };
    return IdleDownWidgetState;
}());
var HoverWidgetState = /** @class */ (function () {
    function HoverWidgetState() {
    }
    HoverWidgetState.prototype.onEnter = function (component) {
    };
    HoverWidgetState.prototype.onLeave = function (component) {
        component.setState(new IdleUpWidgetState());
        component.idleupState();
    };
    HoverWidgetState.prototype.onPress = function (component) {
        component.setState(new PressedWidgetState());
        component.pressedState();
    };
    HoverWidgetState.prototype.onRelease = function (component) {
    };
    HoverWidgetState.prototype.onMove = function (component) { };
    HoverWidgetState.prototype.onKeyup = function (component) {
    };
    return HoverWidgetState;
}());
var HoverPressedWidgetState = /** @class */ (function () {
    function HoverPressedWidgetState() {
    }
    HoverPressedWidgetState.prototype.onEnter = function (component) { };
    HoverPressedWidgetState.prototype.onLeave = function (component) {
        component.setState(new IdleUpWidgetState());
        component.idleupState();
    };
    HoverPressedWidgetState.prototype.onPress = function (component) { };
    HoverPressedWidgetState.prototype.onRelease = function (component) {
        component.setState(new HoverWidgetState());
        component.hoverState();
    };
    HoverPressedWidgetState.prototype.onMove = function (component) { };
    HoverPressedWidgetState.prototype.onKeyup = function (component) {
    };
    return HoverPressedWidgetState;
}());
var PressedWidgetState = /** @class */ (function () {
    function PressedWidgetState() {
    }
    PressedWidgetState.prototype.onEnter = function (component) {
    };
    PressedWidgetState.prototype.onLeave = function (component) {
        component.setState(new PressedOutWidgetState());
        component.pressedoutState();
    };
    PressedWidgetState.prototype.onPress = function (component) {
    };
    PressedWidgetState.prototype.onRelease = function (component) {
        component.setState(new HoverWidgetState());
        component.pressReleaseState();
    };
    PressedWidgetState.prototype.onMove = function (component) {
        if (component.isDraggable) {
            component.setState(new DragWindowState());
            component.moveState();
        }
    };
    PressedWidgetState.prototype.onKeyup = function (component) {
    };
    return PressedWidgetState;
}());
var PressedOutWidgetState = /** @class */ (function () {
    function PressedOutWidgetState() {
    }
    PressedOutWidgetState.prototype.onEnter = function (component) {
        component.setState(new PressedWidgetState());
        component.pressedState();
    };
    PressedOutWidgetState.prototype.onLeave = function (component) { };
    PressedOutWidgetState.prototype.onPress = function (component) { };
    PressedOutWidgetState.prototype.onRelease = function (component) {
        component.setState(new IdleUpWidgetState());
        component.idleupState();
    };
    PressedOutWidgetState.prototype.onMove = function (component) {
        if (component.isDraggable) {
            component.moveState();
        }
    };
    PressedOutWidgetState.prototype.onKeyup = function (component) {
    };
    return PressedOutWidgetState;
}());
var DragWindowState = /** @class */ (function () {
    function DragWindowState() {
    }
    DragWindowState.prototype.onEnter = function (component) { };
    DragWindowState.prototype.onLeave = function (component) {
        component.setState(new PressedOutWidgetState());
        component.pressedoutState();
    };
    DragWindowState.prototype.onPress = function (component) { };
    DragWindowState.prototype.onRelease = function (component) {
        component.setState(new HoverWidgetState());
        component.hoverState();
    };
    DragWindowState.prototype.onMove = function (component) {
        component.moveState();
    };
    DragWindowState.prototype.onKeyup = function (component) { };
    return DragWindowState;
}());
var KeypressWidgetState = /** @class */ (function () {
    function KeypressWidgetState() {
    }
    KeypressWidgetState.prototype.onEnter = function (component) { };
    KeypressWidgetState.prototype.onLeave = function (component) { };
    KeypressWidgetState.prototype.onPress = function (component) { };
    KeypressWidgetState.prototype.onRelease = function (component) { };
    KeypressWidgetState.prototype.onMove = function (component) { };
    KeypressWidgetState.prototype.onKeyup = function (component) {
        component.keyupState();
    };
    return KeypressWidgetState;
}());
/**
 * A simple class for passing event arguments containing an object, event, and an optional item reference.
 */
var EventArgs = /** @class */ (function () {
    /**
     * Creates a new EventArgs instance.
     * @param obj The object associated with the event.
     * @param event (Optional) The event that occurred.
     * @param itemRef (Optional) A reference to the item associated with the event.
     */
    function EventArgs(obj, event, itemRef) {
        this._event = event;
        this._obj = obj;
        if (typeof itemRef !== 'undefined') {
            this._itemRef = itemRef;
        }
    }
    Object.defineProperty(EventArgs.prototype, "event", {
        /**
         * Gets the event associated with the EventArgs instance.
         */
        get: function () {
            return this._event;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EventArgs.prototype, "obj", {
        /**
         * Gets the object associated with the EventArgs instance.
         */
        get: function () {
            return this._obj;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EventArgs.prototype, "itemRef", {
        /**
         * Gets the item reference associated with the EventArgs instance.
         */
        get: function () {
            return this._itemRef;
        },
        enumerable: false,
        configurable: true
    });
    return EventArgs;
}());
var Component = /** @class */ (function () {
    function Component() {
        this.tabindex = 0;
        this._handlers = [];
        this.previousState = null;
        /**
         * flag true if widget needs to support a draggable state e.g., scrollbar
         */
        this.isDraggable = false;
        /* accessibility properties */
        this._role = null;
    }
    Object.defineProperty(Component.prototype, "role", {
        get: function () {
            return this._role;
        },
        /*
            Accessibility is opinionated. If role is not set, throw error.
        */
        set: function (role) {
            this._role = role;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "selectable", {
        get: function () {
            return this._isselectable;
        },
        /*
            Selectable is a flag to control whether or not a widget gets selected on a browser drag action.
            Generally, this should be set to false for widgets like a button, but true for widgets that support
            text input
        */
        set: function (val) {
            this._isselectable = val;
        },
        enumerable: false,
        configurable: true
    });
    Component.prototype.attach = function (handler) {
        this._handlers.push(handler);
    };
    Component.prototype.raise = function (event) {
        this._handlers.slice(0).forEach(function (h) { return h(event); });
    };
    Component.prototype.move = function (x, y) {
        if (this.outerSvg != null)
            this.outerSvg.move(x, y);
        this.update();
    };
    Component.prototype.getState = function () {
        return this.state;
    };
    Component.prototype.setState = function (state) {
        this.previousState = this.state;
        this.state = state;
    };
    /* override to handle graphical updates in derived widgets */
    Component.prototype.update = function () {
        if (this.role != null)
            this.outerSvg.attr({
                role: this.role,
                tabindex: this.tabindex
            });
        else
            throw new Error('Aria Role not implemented.');
    };
    return Component;
}());
var Window = /** @class */ (function (_super) {
    __extends(Window, _super);
    function Window(height, width) {
        var _this = _super.call(this) || this;
        _this.keyEvent = null;
        var body = SVG().addTo('body').size(width, height);
        var rect = body.rect(width, height).fill("white").stroke("black")
            .attr({ 'stroke-width': 3 });
        _this._window = SVG().addTo(body);
        _this.outerSvg = _this._window;
        _this.registerEvent(body);
        // set Aria role
        _this.role = RoleType.window;
        // set default state
        _this.setState(new IdleUpWidgetState());
        _this.observers = [];
        return _this;
    }
    Window.prototype.addObserver = function (observer) {
        this.observers.push(observer);
    };
    Window.prototype.removeObserver = function (observer) {
        var index = this.observers.indexOf(observer);
        if (index >= 0) {
            this.observers.splice(index, 1);
        }
    };
    Window.prototype.notifyObservers = function (state) {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer(state);
        }
    };
    Window.prototype.registerEvent = function (obj) {
        var _this = this;
        SVG(window).on('keyup', function (event) {
            _this.keyEvent = event;
            _this.state.onKeyup(_this);
        }, window);
        obj.mouseup(function (event) {
            _this.state.onRelease(_this);
        });
        obj.mousedown(function (event) {
            if (!_this.selectable) {
                // prevents draggable text selection
                event.preventDefault();
            }
            _this.state.onPress(_this);
        });
        obj.mouseover(function (event) {
        });
        obj.mouseout(function (event) {
        });
        obj.mousemove(function (event) {
            _this.state.onMove(_this);
        });
    };
    Object.defineProperty(Window.prototype, "window", {
        get: function () {
            return this._window;
        },
        enumerable: false,
        configurable: true
    });
    Window.prototype.idleupState = function () {
        this.notifyObservers(this.getState());
    };
    Window.prototype.idledownState = function () {
        this.notifyObservers(this.getState());
    };
    Window.prototype.moveState = function () {
        this.notifyObservers(this.getState());
    };
    Window.prototype.keyupState = function () {
        this.notifyObservers(new KeypressWidgetState());
    };
    //required to fulfill inheritance requirements
    //but not implemented for the window component
    Window.prototype.pressedState = function () { };
    Window.prototype.pressReleaseState = function () { };
    Window.prototype.hoverState = function () { };
    Window.prototype.hoverPressedState = function () { };
    Window.prototype.pressedoutState = function () { };
    return Window;
}(Component));
var Widget = /** @class */ (function (_super) {
    __extends(Widget, _super);
    function Widget(parent) {
        var _this = _super.call(this) || this;
        _this.parent = parent;
        _this.selectable = true;
        _this.registerWindowEvents();
        return _this;
    }
    Widget.prototype.registerWindowEvents = function () {
        var _this = this;
        this.parent.addObserver(function (state) {
            //We only want to modify widget state outside of the 
            //widget for state transitions that occur outside of
            //the widget's bounds.
            if (state instanceof IdleUpWidgetState &&
                _this.getState() instanceof PressedOutWidgetState) {
                _this.setState(new IdleUpWidgetState());
            }
            if (state instanceof IdleDownWidgetState) {
                _this.idledownState();
            }
            if (state instanceof KeypressWidgetState) {
                _this.keyupState(_this.parent.keyEvent);
            }
            if (_this.state instanceof DragWindowState) {
                _this.moveState();
            }
        });
    };
    /**
     * Registers SVG.js event handlers for the given object.
     * @param obj The object to register event handlers for.
     * @returns void.
     *
     * @description registerEvent serves as a coupling method
     * between the SVG.js library event handlers and the state
     * and observer patterns used by the toolkit. To gain access
     * to the source event data simply assign the event parameter
     * to the current object using this and the rawEvent property.
     */
    Widget.prototype.registerEvent = function (obj) {
        var _this = this;
        obj.mouseup(function (event) {
            _this.state.onRelease(_this);
        });
        obj.mousedown(function (event) {
            if (!_this.selectable) {
                // prevents draggable text selection
                event.preventDefault();
            }
            _this.state.onPress(_this);
        });
        obj.mouseover(function (event) {
            _this.state.onEnter(_this);
        });
        obj.mouseout(function (event) {
            _this.state.onLeave(_this);
        });
        obj.mousemove(function (event) {
            //mouse move events generate positional information
            //about the cursor, likely needed for widgets that track
            //cursor movement.
            _this.rawEvent = event;
            _this.state.onMove(_this);
        });
    };
    Object.defineProperty(Widget.prototype, "backcolor", {
        get: function () {
            return this._backcolor;
        },
        set: function (color) {
            this._backcolor = color;
            this.update();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "forecolor", {
        get: function () {
            return this._forecolor;
        },
        set: function (color) {
            this._forecolor = color;
        },
        enumerable: false,
        configurable: true
    });
    return Widget;
}(Component));
// local
export { Window, Widget, Component, RoleType, EventArgs };
export { IdleUpWidgetState, IdleDownWidgetState, HoverWidgetState, HoverPressedWidgetState, PressedWidgetState, PressedOutWidgetState, DragWindowState };
// from svg.js
export { SVG, Svg, G, Rect, Container, Text, Box, Circle, Number };
//# sourceMappingURL=ui.js.map