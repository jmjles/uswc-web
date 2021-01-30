import anime from "animejs/lib/anime";
export const sidebarAni = (handle) => {
  const w = window.innerWidth;
  const e = document.querySelector(".Sidebar");
  if (e.clientWidth === w) {
    anime({
      targets: ".Sidebar",
      width: ["100%", 0],
      duration: 200,
      easing: "linear",
    });
    document.querySelector("body").removeAttribute("style");
    handle();
  } else if (e.clientWidth === 0) {
    anime({
      targets: ".Sidebar",
      width: [e.clientWidth, "100%"],
      duration: 200,
      easing: "linear",
    });
    document.querySelector("body").setAttribute("style", "overflow: hidden;");
    handle();
  }
};
const cashe = {};
export const fadeIn = (targets, once) => {
  const el = document.querySelector(targets);
  const op = anime.get(el, "opacity");
  if (once && cashe[targets]) {
    return null;
  } else if (once && !cashe[targets]) {
    cashe[targets] = targets;
    anime({ targets, duration: 3000, opacity: [parseInt(op), 1] });
  } else {
    anime({ targets, duration: 3000, opacity: [parseInt(op), 1] });
  }
};
export const fadeOut = (targets) => {
  const el = document.querySelector(targets);
  const op = anime.get(el, "opacity");
  if (parseInt(op) !== 1)
    anime({ targets, duration: 3000, opacity: [parseInt(op), 0] });
};
