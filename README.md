# regl-scatterplot

A high-performance dataset cleaning and annotation tool that combines WebGL visualization with AI-powered segmentation and embedding generation.

## Overview

This tool is designed to facilitate rapid dataset annotation and cleaning by combining:
- Replicate API for automatic object segmentation
- Jina AI for generating object embeddings
- regl-powered WebGL visualization for interactive data cleaning

## Installation

```bash
npm install regl-scatterplot
```

## Features

- **AI-Powered Processing**:
  - Automatic object segmentation using Replicate API
  - Embedding generation with Jina AI
  - Similarity-based clustering for efficient cleaning

- **Interactive Visualization**:
  - High-performance WebGL rendering using regl
  - Real-time interaction with large datasets
  - Intuitive point selection and annotation
  - Zoom and pan capabilities
  - Custom point styling

- **Dataset Management**:
  - Batch processing of images
  - Export/import annotations
  - Integration with popular dataset formats
  - Version control for annotations

## Usage

```javascript
import { createScatterplot } from 'regl-scatterplot';

const canvas = document.querySelector('#canvas');
const scatterplot = createScatterplot(canvas);

// Process and visualize dataset
scatterplot.draw({
  points: [[x1, y1], [x2, y2], ...],
  annotations: [],
  embeddings: [] // Generated by Jina
});
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](https://choosealicense.com/licenses/mit/)
