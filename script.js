// Run on page load
document.addEventListener('DOMContentLoaded', function() {
    // Only activate on mobile (width <= 920px, matching your CSS)
    if (window.innerWidth <= 920) {
      const container = document.querySelector('#hexaco .pz-container');
      const image = container.querySelector('.pz-target');
      
      if (!container || !image) return; // Safety check
      
      let isZoomed = false; // Track zoom state
      let startX = 0, startY = 0; // Initial touch positions
      let translateX = 0, translateY = 0; // Current translation
      let animationId = null; // For smooth animations
      
      // Preload image to get natural dimensions
      const img = new Image();
      img.src = image.src;
      img.onload = function() {
        const naturalWidth = img.naturalWidth;
        const naturalHeight = img.naturalHeight;
        
        // Click listener on container (since image has pointer-events: none)
        container.addEventListener('click', function(e) {
          e.preventDefault(); // Prevent any default link behavior if clicked near
          
          if (!isZoomed) {
            // Get current thumbnail dimensions before changing anything
            const imageRect = image.getBoundingClientRect();
            const thumbWidth = imageRect.width;
            const thumbHeight = imageRect.height;
            
            // Lock container to thumbnail size to prevent collapse
            container.style.width = thumbWidth + 'px';
            container.style.height = thumbHeight + 'px';
            
            // Zoom in: Set image to full size and enable panning
            image.style.position = 'absolute';
            image.style.width = naturalWidth + 'px';
            image.style.height = naturalHeight + 'px';
            image.style.maxWidth = 'none';  // Override CSS max-width to allow full width
            image.style.top = '0';
            image.style.left = '0';
            image.style.transform = 'translate(0, 0)';
            translateX = 0;
            translateY = 0;
            
            // Add touch listeners for panning
            container.addEventListener('touchstart', handleTouchStart, { passive: false });
            container.addEventListener('touchmove', handleTouchMove, { passive: false });
            container.addEventListener('touchend', handleTouchEnd, { passive: false });
            
            isZoomed = true;
          } else {
            // Zoom out: Reset to original state
            image.style.position = '';
            image.style.width = '';
            image.style.height = '';
            image.style.maxWidth = '';  // Reset max-width
            image.style.top = '';
            image.style.left = '';
            image.style.transform = '';
            
            // Remove container size lock
            container.style.width = '';
            container.style.height = '';
            
            // Remove touch listeners
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchmove', handleTouchMove);
            container.removeEventListener('touchend', handleTouchEnd);
            
            isZoomed = false;
          }
        });
      };
      
      // Touch event handlers
      function handleTouchStart(e) {
        if (e.touches.length === 1) { // Only handle single touch
          const touch = e.touches[0];
          startX = touch.clientX - translateX;
          startY = touch.clientY - translateY;
        }
      }
      
      function handleTouchMove(e) {
        if (e.touches.length === 1 && isZoomed) {
          e.preventDefault(); // Prevent page scroll
          const touch = e.touches[0];
          translateX = touch.clientX - startX;
          translateY = touch.clientY - startY;
          
          // Constrain panning: Don't let the image be dragged out of bounds
          const containerRect = container.getBoundingClientRect();
          const imageRect = image.getBoundingClientRect();
          const maxTranslateX = Math.max(0, imageRect.width - containerRect.width);
          const maxTranslateY = Math.max(0, imageRect.height - containerRect.height);
          translateX = Math.max(-maxTranslateX, Math.min(0, translateX));
          translateY = Math.max(-maxTranslateY, Math.min(0, translateY));
          
          // Smooth animation
          if (animationId) cancelAnimationFrame(animationId);
          animationId = requestAnimationFrame(() => {
            image.style.transform = `translate(${translateX}px, ${translateY}px)`;
          });
        }
      }
      
      function handleTouchEnd(e) {
        // Reset for next touch
        startX = 0;
        startY = 0;
      }
    }
  });
  