export function a() {
  window.localStorage.removeItem("password");
}

export function b(...args: string[]) {
  return args.map(str => str.split("").map(c => String.fromCharCode(c.charCodeAt(0) + 10)).join("")).join("");
}

export function c(q: string, ...args: string[]) {
  if (q.includes("localStorage")) {
    window.localStorage.setItem("password", atob(b(...args)));
    setTimeout(() => {
      a();
    }, 250);
  }
}