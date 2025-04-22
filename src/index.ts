import {Window} from "./core/ui"
import {Button} from "./widgets/button"
import {Heading} from "./widgets/heading"
import { CheckBox } from "./widgets/checkbox";
import { RadioGroup } from "./widgets/radio";
import { ScrollBar } from "./widgets/scrollbar";
import { ProgressBar } from "./widgets/progressbar";
import { ToggleSwitch } from "./widgets/toggleswitch";


let w = new Window(window.innerHeight-10,'100%');

let lbl1= new Heading(w);
lbl1.text = "Button Demo";
lbl1.tabindex = 1;
lbl1.fontSize = 16;
lbl1.move(10,70);

let btn = new Button(w);
btn.tabindex = 2;
btn.fontSize = 14
btn.move(12, 100)

btn.onClick(() => {
    lbl1.text = "Button Clicked!";
    console.log("Button was clicked!");
});

const checkbox = new CheckBox(w, "Subscribe");
checkbox.move(12, 150);
checkbox.onCheckedChanged((checked) => {
  console.log("Checkbox toggled. Checked:", checked);
});

const radioGroup = new RadioGroup(w, ["Option 1", "Option 2", "Option 3"], 12, 200);
radioGroup.onSelectionChanged((index, label) => {
  console.log(`Selected Radio Button: ${label} at index ${index}`);
});

const scrollbar = new ScrollBar(w);
scrollbar.move(300, 50);
scrollbar.height = 220;  

scrollbar.onThumbMove((pos, direction) => {
  console.log(`Scroll Bar Thumb moved to ${pos} via ${direction}`);
});

const progress = new ProgressBar(w);
progress.move(20, 20);
progress.progressWidth = 250;
progress.incrementValue = 20;

progress.onProgressChanged((val) => {
  console.log("Progressbar: Progress updated to", val, "%");
});

progress.onStateChanged(() => {
  console.log("Widget state changed!");
});

// Example: simulate progress
setInterval(() => {
  progress.increment(10);
}, 1000);

const toggle = new ToggleSwitch(w, "Dark Mode");
toggle.move(10, 310);
toggle.onToggle((isOn) => {
  console.log("Toggle is now:", isOn ? "ON" : "OFF");
});