# Hybrid Image Creator - Generic Implementation

## Overview
A clean, generic implementation of the Oliva, Torralba, and Schyns hybrid image algorithm. Hybrid images appear as one image from far away and another from close up by blending high and low frequencies.

## Files
- **`generic_hybrid.py`** - Main implementation with universal hybrid creation function
- **`align_image_code.py`** - Image alignment utilities (required for alignment)
- **`images/`** - Output directory for hybrid images and visualizations
- **`shrekpair/`** - Sample image pair for testing

## Algorithm Implementation

### ✅ Hybrid Image Creation
The implementation follows the Oliva, Torralba, and Schyns algorithm:

1. **High Frequency Extraction**:
   ```python
   im1_high = im1_gray - apply_gaussian_filter(im1_gray, sigma1)
   ```

2. **Low Frequency Extraction**:
   ```python
   im2_low = apply_gaussian_filter(im2_gray, sigma2)
   ```

3. **Hybrid Creation**:
   ```python
   hybrid = im1_high + im2_low
   ```

### ✅ Key Features
- **Frequency Separation**: Proper high/low frequency extraction
- **Grayscale Processing**: Converts color images to grayscale
- **Image Alignment**: Optional alignment for better results
- **Visualization**: Pyramids and frequency analysis

## Usage

### Basic Usage
```python
from generic_hybrid import create_hybrid_image

# Create hybrid image
hybrid, analysis = create_hybrid_image('image1.jpg', 'image2.jpg', 
                                     sigma1=0.5, sigma2=3.0)

# Create hybrid with alignment
hybrid, analysis = create_hybrid_image('image1.jpg', 'image2.jpg', 
                                     sigma1=0.5, sigma2=3.0, 
                                     align_images_flag=True)
```

### Advanced Usage
```python
# Full-featured hybrid creation
hybrid, analysis = create_hybrid_image(
    'high_freq_source.jpg', 
    'low_freq_source.jpg',
    sigma1=0.4,           # High frequency extraction
    sigma2=3.0,           # Low frequency extraction  
    align_images_flag=True,    # Align images
    show_pyramids=True,        # Show pyramid visualizations
    show_frequency_analysis=True,  # Show frequency analysis
    save_result=True,          # Save results
    output_dir='images'        # Output directory
)
```

### Parameters
- **`image_path1`**: Path to high frequency source image
- **`image_path2`**: Path to low frequency source image
- **`sigma1`**: Gaussian sigma for high frequency extraction (smaller = more detail)
- **`sigma2`**: Gaussian sigma for low frequency extraction (larger = more blur)
- **`align_images_flag`**: Whether to align images before blending
- **`show_pyramids`**: Whether to show pyramid visualizations
- **`show_frequency_analysis`**: Whether to show frequency analysis
- **`save_result`**: Whether to save the result
- **`output_dir`**: Directory to save results

## Key Features

### ✅ Proper Algorithm Implementation
- Follows Oliva, Torralba, and Schyns algorithm
- High frequency from one image + low frequency from another
- Proper Gaussian filtering for frequency separation

### ✅ High-Quality Results
- Automatic image resizing and matching
- Optional image alignment for better results
- Grayscale processing for optimal hybrid effects

### ✅ Universal Design
- Works with any two images
- Flexible parameter tuning
- Comprehensive visualization options

### ✅ Clean Codebase
- Single generic implementation
- Removed all specific/duplicate code
- Well-documented and modular

## Example Results
The `images/` folder contains example hybrids:
- `DerekPicture_nutmeg_hybrid_s10.4_s23.0.png` - Derek-Nutmeg hybrid
- `1_2_hybrid_s10.5_s22.5.png` - Shrek pair hybrid
- Frequency analysis visualizations
- Pyramid visualizations

## Technical Details

### Hybrid Image Theory
- **High Frequencies**: Fine details, edges, textures (visible up close)
- **Low Frequencies**: Overall shape, form, structure (visible from far away)
- **Hybrid Effect**: Combines both for distance-dependent perception

### Parameter Tuning
- **`sigma1` (High Freq)**: 
  - Small values (0.3-0.5): Extract fine details
  - Large values (1.0+): Extract broader features
- **`sigma2` (Low Freq)**:
  - Small values (1.0-2.0): Preserve some detail
  - Large values (3.0+): Strong blur effect

### Image Alignment
- Uses provided alignment code for better hybrid results
- Aligns key features (e.g., eyes, faces) between images
- Optional but recommended for best results

This implementation provides a clean, generic, and correct implementation of hybrid image creation that can handle any two images with various parameter settings.

