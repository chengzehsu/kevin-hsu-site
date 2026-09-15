/** Native scroll timeline; browsers without support simply omit the indicator. */
export function ScrollProgress() {
  return <div aria-hidden="true" className="reading-progress" />;
}
