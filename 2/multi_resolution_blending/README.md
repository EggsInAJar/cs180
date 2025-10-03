# Multi-Resolution Blending - Generic Implementation

## Overview
A clean, generic implementation of the Burt-Adelson multi-resolution blending algorithm using Gaussian and Laplacian stacks (not pyramids).

## Files
- **`generic_blender.py`** - Main implementation with universal blending function
- **`results/`** - Output directory for blended images
- **`spline/`** - Sample images for testing

## Algorithm Implementation

### ✅ Correct Implementation (Both Gaussian and Laplacian)
The implementation correctly uses **both** Gaussian and Laplacian stacks as required:

1. **Gaussian Stacks**: Created for both images and the mask
   ```python
   gaussian_stack_A = create_gaussian_stack(image_A, levels)
   gaussian_stack_B = create_gaussian_stack(image_B, levels)
   mask_stack = create_gaussian_stack(mask, levels)
   ```

2. **Laplacian Stacks**: Derived from Gaussian stacks
   ```python
   laplacian_stack_A = create_laplacian_stack(gaussian_stack_A)
   laplacian_stack_B = create_laplacian_stack(gaussian_stack_B)
   ```

3. **Blending**: Uses Laplacian stacks with Gaussian mask stack
   ```python
   blended_stack = blend_laplacian_stacks(laplacian_stack_A, laplacian_stack_B, mask_stack)
   ```

4. **Reconstruction**: From blended Laplacian stack
   ```python
   blended_image = reconstruct_from_laplacian_stack(blended_stack)
   ```

## Usage

### Basic Usage
```python
from generic_blender import blend_images

# Simple vertical blend
result = blend_images('image1.jpg', 'image2.jpg', mask_type='vertical')

# Custom blend with options
result = blend_images('image1.jpg', 'image2.jpg', 
                     mask_type='diagonal', 
                     position=0.3, 
                     levels=8,
                     show_stacks=True)
```

### Available Mask Types
- **`vertical`** - Smooth vertical seam
- **`horizontal`** - Smooth horizontal seam  
- **`diagonal`** - Diagonal gradient blend
- **`circular`** - Circular region blend
- **`diamond`** - Diamond pattern blend
- **`wave`** - Wave pattern blend

### Parameters
- **`mask_type`**: Type of blending pattern
- **`position`**: Position of seam (0.0 to 1.0) for step masks
- **`levels`**: Number of stack levels (default: 6)
- **`transition_width`**: Width of transition region (auto if None)
- **`save_result`**: Whether to save the result (default: True)
- **`show_stacks`**: Whether to visualize stacks (default: False)

## Key Features

### ✅ Proper Algorithm Implementation
- Uses **both** Gaussian and Laplacian stacks as required
- Follows Burt-Adelson algorithm correctly
- Stack-based (not pyramid-based) implementation

### ✅ High-Quality Blending
- Smooth mask transitions (cosine functions)
- No visible seams or artifacts
- Professional-quality results

### ✅ Universal Design
- Works with any two images
- Automatic image resizing and matching
- Flexible mask patterns

### ✅ Clean Codebase
- Single generic implementation
- Removed all specific/duplicate code
- Well-documented and modular

## Example Results
The `results/` folder contains example blends:
- `apple_orange_vertical_blend.png` - Classic oraple
- `1_2_diagonal_blend.png` - Car diagonal blend
- Stack visualizations when `show_stacks=True`

## Technical Details

### Stack vs Pyramid
- **Stacks**: All levels same size as original (implemented here)
- **Pyramids**: Downsampled levels (different approach)

### Smooth Masks
- Uses cosine functions for natural transitions
- 5% transition width for seamless blending
- Eliminates prominent seams

### Multi-Resolution Processing
- 6 levels by default (configurable)
- Sigma values: 1, 2, 4, 8, 16, 32...
- Full RGB color processing

This implementation provides a clean, generic, and correct implementation of multi-resolution blending that can handle any two images with various blending patterns.