import { Window } from "./core/ui";
import { Button } from "./widgets/button";
import { Heading } from "./widgets/heading";
var w = new Window(window.innerHeight - 10, '100%');
var lbl1 = new Heading(w);
lbl1.text = "Button Demo";
lbl1.tabindex = 1;
lbl1.fontSize = 16;
lbl1.move(10, 20);
var btn = new Button(w);
btn.tabindex = 2;
btn.fontSize = 14;
btn.move(12, 50);
//# sourceMappingURL=index.js.map