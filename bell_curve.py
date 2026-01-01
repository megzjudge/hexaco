import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import norm
from matplotlib.colors import LinearSegmentedColormap

def plot_bell_curve(value=3.39, mean=5.0, std_dev=1.5, min_x=0, max_x=10):
    # Generate x values and the bell curve (PDF)
    x = np.linspace(min_x - 1, max_x + 1, 1000)  # Extend slightly for smooth tails
    y = norm.pdf(x, mean, std_dev)  # Probability density function
    
    # Stages for labeling (based on your thresholds)
    stages = [
        (min_x, 4.0, 'Stage 1: <4.0'),
        (4.0, 5.0, 'Stage 2: 4-5'),
        (5.0, 6.0, 'Stage 3: 5-6'),
        (6.0, max_x, 'Stage 4: >=6.0')
    ]
    
    # Determine current stage for the value
    for start, end, label in stages:
        if start <= value < end:
            stage_label = label
            break
    else:
        stage_label = stages[-1][2]  # For >=6.0
    
    # Custom symmetric gradient: dark blue -> cyan -> dark blue
    # Positions: 0 (dark blue), 0.5 (cyan at center), 1 (dark blue)
    colors = ['darkblue', 'cyan', 'darkblue']
    cmap = LinearSegmentedColormap.from_list("custom_gradient", colors, N=256)
    
    # Plot setup
    plt.figure(figsize=(12, 6))
    plt.plot(x, y, 'black', linewidth=2)  # The bell curve line
    
    # Gradient fill under the curve (approximated with thin filled segments)
    num_segments = 500  # More segments = smoother gradient
    dx = (max_x - min_x) / num_segments
    for i in range(num_segments):
        seg_start = min_x + i * dx
        seg_end = seg_start + dx
        seg_mid = (seg_start + seg_end) / 2
        # Normalize position for gradient (0 at min_x, 0.5 at mean, 1 at max_x)
        norm_pos = (seg_mid - min_x) / (max_x - min_x)
        if seg_mid < mean:
            # Left side: mirror to make symmetric (e.g., 4.0 maps like 6.0 would)
            norm_pos = 1 - (seg_mid - min_x) / (mean - min_x) * 0.5
        else:
            # Right side: 0.5 to 1
            norm_pos = 0.5 + (seg_mid - mean) / (max_x - mean) * 0.5
        seg_color = cmap(norm_pos)
        
        # Find y values for this segment
        idx = (x >= seg_start) & (x < seg_end)
        plt.fill_between(x[idx], 0, y[idx], color=seg_color, alpha=0.7)
    
    # Red cut lines
    thresholds = [4.0, 5.0, 6.0]
    for t in thresholds:
        plt.axvline(t, color='red', linestyle='--', linewidth=1.5, label=f'Cut at {t}')
    
    # Mark the value
    plt.axvline(value, color='blue', linewidth=2, label=f'Value: {value} ({stage_label})')
    plt.plot(value, norm.pdf(value, mean, std_dev), 'bo', markersize=8)  # Dot on the curve
    
    # Labels and styling
    plt.xlim(min_x - 1, max_x + 1)
    plt.ylim(0, max(y) * 1.1)
    plt.xlabel('Score (0 to 10)')
    plt.ylabel('Probability Density')
    plt.title('Bell Curve Visualization with Symmetric Gradient (Cyan at 5.0 to Dark Blue at Tails)')
    plt.legend(loc='upper left')
    plt.grid(True)
    
    # Show and save the plot
    plt.savefig('bell_curve.png')  # Saves as PNG
    plt.show()

# Run the function with your specified value
plot_bell_curve(value=3.39)