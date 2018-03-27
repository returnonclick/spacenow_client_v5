import { transition, style, trigger, animate, state, group } from "@angular/animations";

export let routeAnimation = trigger('routeAnimation', [
  transition('void => *', [
    style({
      opacity: 0,
    }),
    animate('400ms 150ms ease-in-out', style({
      opacity: 1,
    }))
  ]),
]);


export let fadeInAnimation = trigger('fadeInAnimation', [
  transition('void => *', [
    style({
      opacity: 0,
    }),
    animate('400ms 150ms ease-in-out', style({
      opacity: 1,
    }))
  ]),
]);

export let georgeAnimation = trigger('georgeAnimation', [

  transition('* => *', [
    style({
      transform: "translateX(0)"
    }),
    animate('7000ms ease-in-out', style({
      transform: "translateX(-100%)"
    }))
  ])
  // state('left', style({
  //   transform: "translateX(0)"
  // })),
  // state('right',   style({
  //   transform: "translateX(-100%)"
  // })),
  // transition('left => right', animate('7000ms ease-out')),
  // transition('right => left', animate('7000ms ease-in'))
]);
