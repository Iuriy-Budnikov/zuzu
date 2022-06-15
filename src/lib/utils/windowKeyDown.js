/** Dispatch event on keydown  */
export function windowKeyDown(node) {
  const handleKeyDown = (event) => {
    node.dispatchEvent(new CustomEvent('window_key_down', { detail: { event } }));
  };

  document.addEventListener('keydown', handleKeyDown, true);

  return {
    destroy() {
      document.removeEventListener('keydown', handleKeyDown, true);
    }
  };
}
