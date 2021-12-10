import {trigger,state,style,animate,transition,animation} from "@angular/animations";

export const vinylAnimation = trigger("vinylAnim", [
  state(
    "initial",
    style({
      zIndex: "4",
      position : "relative",

    })
  ),
  state(
    "0",
    style({
      transform: "rotate(360deg)",
      zIndex: "4",
      position : "relative",


    })
  ),
  state(
    "1",
    style({
      transform: "rotate(540deg)",
      zIndex: "4",
      position : "relative",

    })
  ),
  state(
    "2",
    style({
      transform: "rotate(720deg)",
      zIndex: "4",
      position : "relative",
      display :"none",
      opacity : "0",

    })
  ),
  transition("initial=>0", animate("3.5s cubic-bezier(0.5,0,1,1)")),
  transition("0=>1", animate("900ms")),
  transition("1=>2", animate("900ms")),
]);

export const fadeoutAnimation = trigger("overlayFadeOut", [
  state(
    "hidden",
    style({
      position: "fixed",
      display: "block",
      width: "100%",
      height: "100%",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      backgroundColor: "#eeeeee",
      zIndex: "3",
      cursor: "pointer",
    })
  ),
  state(
    "visible",
    style({
      position: "fixed",
      display: "none",
      width: "100%",
      height: "100%",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      backgroundColor: "#eeeeee",
      opacity : "0",
      zIndex: "3",
      cursor: "pointer",

    })
  ),
  transition("hidden=>visible", animate("0.9s 5s ease-out")),
]);
