# regl-scatterplot

A WebGL-powered scatterplot visualization tool for computer vision annotation, built with regl.

## Installation

```bash
npm install regl-scatterplot
```

## Usage

```javascript
import { createScatterplot } from 'regl-scatterplot';

const canvas = document.querySelector('#canvas');
const scatterplot = createScatterplot(canvas);

// Example: Add points for annotation
scatterplot.draw({
  points: [[x1, y1], [x2, y2], ...],
  annotations: []
});
```

## Features

- High-performance WebGL rendering using regl
- Interactive point selection and annotation
- Support for large datasets
- Zoom and pan capabilities
- Custom point styling
- Annotation export/import

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](https://choosealicense.com/licenses/mit/)
