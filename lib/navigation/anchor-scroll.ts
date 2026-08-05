export function getHeaderOffset() {
  const header = document.querySelector<HTMLElement>(".site-header");
  return header?.offsetHeight ?? 80;
}

export function scrollToAnchor(anchorId: string, behavior: ScrollBehavior = "smooth") {
  const id = anchorId.replace(/^#/, "");
  return scrollToElementById(id, { behavior, updateHash: true });
}

export function scrollToElementById(
  id: string,
  options: { behavior?: ScrollBehavior; updateHash?: boolean } = {},
) {
  const target = document.getElementById(id);
  if (!target) return false;

  const behavior = options.behavior ?? "smooth";
  const top =
    target.getBoundingClientRect().top + window.scrollY - getHeaderOffset() - 8;

  if (options.updateHash) {
    history.pushState(null, "", `#${id}`);
  }

  window.scrollTo({ top, behavior });
  return true;
}
