# Contrast report

Ratios use the WCAG 2.x sRGB relative-luminance formula. Text pairs meet 4.5:1; focus indicators and component boundaries meet 3:1. Re-run `npm run check:contrast` after changing a token.

| Use | Foreground | Background | Ratio | Result |
| --- | --- | --- | ---: | --- |
| Body text | `#14101A` | Warm off-white `#FAF8FC` | 17.78:1 | Pass |
| Body text on cards | `#14101A` | White `#FFFFFF` | 18.77:1 | Pass |
| Muted text | `#514A59` | Warm off-white `#FAF8FC` | 8.04:1 | Pass |
| Muted text on cards | `#514A59` | White `#FFFFFF` | 8.49:1 | Pass |
| Brand links and secondary button text | `#4D0A7D` | Warm off-white `#FAF8FC` | 12.02:1 | Pass |
| Brand links and secondary button text | `#4D0A7D` | White `#FFFFFF` | 12.69:1 | Pass |
| Primary button text | `#FFFFFF` | Brand purple `#4D0A7D` | 12.69:1 | Pass |
| Primary button hover text | `#FFFFFF` | Purple hover `#41086A` | 14.31:1 | Pass |
| Hero body text | `#F0EAF5` | Deep purple `#4D0A7D` | 10.75:1 | Pass |
| Hero eyebrow | `#F0DFFA` | Deep purple `#4D0A7D` | 10.05:1 | Pass |
| Input/control boundary | `#756E7B` | Warm off-white `#FAF8FC` | 4.66:1 | Pass |
| Input/control boundary | `#756E7B` | White `#FFFFFF` | 4.91:1 | Pass |
| Focus outline on light surfaces | `#4D0A7D` | Warm off-white `#FAF8FC` | 12.02:1 | Pass |
| Focus outline on deep purple | `#FFBF69` | Deep purple `#4D0A7D` | 7.80:1 | Pass |
| Selected text | `#4D0A7D` | Amber selection `#FFBF69` | 7.80:1 | Pass |
| Form errors | `#8B1E2D` | White `#FFFFFF` | 9.05:1 | Pass |
| Draft poster label | `#514A59` | Neutral grey `#D5D2D8` | 5.68:1 | Pass |

These are the active text, boundary and focus pairs in the implemented components. Amber is used only as a small focus/selection accent, not for body copy.
