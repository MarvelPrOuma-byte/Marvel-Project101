import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";

function wrapDigitsInNode(node: Text) {
  const text = node.textContent ?? "";
  if (!/\d/.test(text)) return;

  const parent = node.parentElement;
  if (!parent) return;

  if (
    parent.closest(".digit-animator-ignore") ||
    parent.tagName === "SCRIPT" ||
    parent.tagName === "STYLE"
  ) {
    return;
  }

  const fragment = document.createDocumentFragment();
  let cursor = 0;
  const matches = Array.from(text.matchAll(/\d+/g));

  if (matches.length === 0) return;

  for (const match of matches) {
    const index = match.index ?? 0;
    const before = text.slice(cursor, index);
    const value = match[0];

    if (before) {
      fragment.appendChild(document.createTextNode(before));
    }

    const span = document.createElement("span");
    span.className = "digit-char";
    span.textContent = value;
    span.setAttribute("aria-hidden", "true");
    span.style.setProperty("--digit-delay", `${(cursor % 8) * 80}ms`);
    fragment.appendChild(span);

    cursor = index + value.length;
  }

  const tail = text.slice(cursor);
  if (tail) {
    fragment.appendChild(document.createTextNode(tail));
  }

  parent.replaceChild(fragment, node);
}

export function AnimatedDigits() {
  const location = useLocation();

  useEffect(() => {
    const root = document.body;
    if (!root) return;

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes: Text[] = [];

    while (walker.nextNode()) {
      const current = walker.currentNode as Text;
      const parent = current.parentElement;
      if (!parent) continue;
      if (
        parent.closest(".digit-animator-ignore") ||
        parent.tagName === "SCRIPT" ||
        parent.tagName === "STYLE"
      ) {
        continue;
      }
      if (current.textContent && /\d/.test(current.textContent)) {
        nodes.push(current);
      }
    }

    nodes.forEach(wrapDigitsInNode);
  }, [location.pathname]);

  return null;
}

export default AnimatedDigits;
