import anime from "animejs/lib/anime";
export const sidebarAni = (handle) => {
  const w = window.innerWidth;
  const e = document.querySelector(".Sidebar");
  if (e.clientWidth === w) {
    anime({
      targets: ".Sidebar",
      width: ['100%', 0],
      duration: 200,
      easing:"linear"
    });
    document.querySelector("body").removeAttribute("style");
    handle();
  } else if (e.clientWidth === 0) {
    anime({
      targets: ".Sidebar",
      width: [e.clientWidth, '100%'],
      duration: 200,
      easing: "linear",
    });
    document.querySelector("body").setAttribute("style","overflow: hidden;")
    handle();
  }
};
