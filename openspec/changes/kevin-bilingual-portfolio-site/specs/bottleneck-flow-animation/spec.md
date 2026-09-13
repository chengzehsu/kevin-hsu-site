## ADDED Requirements

### Requirement: Three-act sequence

The hero SHALL contain the BottleneckFlow animation: an SVG flow of four nodes (order intake, picking, packing, shipping) with moving order markers. When the component first enters the viewport, it SHALL play exactly once a sequence of three acts, total duration between 4 and 5 seconds: (1) markers queue before the picking node and the picking node switches to the accent colour with a bottleneck label; (2) a hypothesis card appears above the picking node; (3) the picking segment widens, the queue clears, markers pass at higher rate, and a throughput label shows 300 → 1,000 orders/day. The sequence MUST animate only `transform` and `opacity` and MUST NOT attach scroll event listeners.

#### Scenario: Plays once on entering viewport

- **WHEN** the hero enters the viewport for the first time
- **THEN** the three acts play in order and finish within 5 seconds, and scrolling away and back does not restart them

#### Scenario: Animated properties

- **WHEN** the component source is inspected
- **THEN** animated properties are limited to transforms and opacity and no `addEventListener('scroll')` is present

### Requirement: Persistent labels

Once the bottleneck label, the hypothesis card, and the throughput label have appeared, they SHALL remain visible for as long as the component is mounted, so that the final frame communicates all three acts.

#### Scenario: Final frame

- **WHEN** the sequence has finished
- **THEN** the bottleneck label, hypothesis card, and throughput label are all visible at the same time

### Requirement: Replay control

The component SHALL provide a visible replay button, labelled from the content dictionary, that resets the animation to its initial state and plays the sequence again. The button MUST be keyboard focusable and MUST have an accessible name.

#### Scenario: Replay

- **WHEN** the visitor activates the replay button after the sequence has finished
- **THEN** the animation resets and the three acts play again

### Requirement: Reduced motion fallback

When `prefers-reduced-motion: reduce` is active, the component SHALL render the final frame statically together with three short captions describing the acts, and SHALL NOT run any animation. The replay button MUST be hidden in this mode.

#### Scenario: Reduced motion

- **WHEN** the page renders under `prefers-reduced-motion: reduce`
- **THEN** the final frame and the three captions are visible immediately, nothing moves, and no replay button is rendered
