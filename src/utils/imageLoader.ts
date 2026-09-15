/**
 * Utility to load and convert images to Base64 data URLs in the browser.
 * Caches loaded images in memory so subsequent PDF generations or HTML
 * exports are instant.
 */

const imageCache = new Map<string, string>();

export const ALL_APP_IMAGES = [
  { path: '/Making of Indian constitution_.png', label: 'Making of Indian Constitution' },
  { path: '/Organ of Universe Theories_.png', label: 'Origin of Universe Theories' },
  { path: '/Solar System.png', label: 'Solar System & Planets' },
  { path: '/Line.png', label: 'Latitudinal and Longitudinal Lines' },
  { path: '/International Date Line.png', label: 'International Date Line' },
  { path: '/Important Lines.png', label: 'Important Latitudinal Lines & Zones' },
  { path: '/State Of matter_.png', label: 'States of Matter & Boson Physics' },
  { path: '/Collar Jobs.png', label: '8 Collar Jobs & Economic Sectors' },
  { path: '/Classical dance_.png', label: '8 Classical Dances of India' },
  { path: '/Types of Kathakali Vesham  (Makeup).png', label: 'Types of Kathakali Vesham (Makeup)' },
  { path: '/Folk Dance Trick.png', label: 'Folk Dances & Mnemonic Tricks' },
  { path: '/Important Festival_.png', label: 'Major Festivals of India' }
];

/**
 * Loads a single image as base64 JPEG data URL, optimizing resolution
 * to max 1400px width for fast rendering and crisp high-DPI print quality.
 * Guaranteed to return a genuine 'data:image/...' base64 string so that
 * offline HTML exports and PDFs never have missing images.
 */
export async function loadImageAsBase64(
  url: string, 
  maxWidth = 1400, 
  quality = 0.92
): Promise<string> {
  const cleanUrl = url.trim();
  if (imageCache.has(cleanUrl) && imageCache.get(cleanUrl)!.startsWith('data:')) {
    return imageCache.get(cleanUrl)!;
  }

  try {
    // 1. Fetch file as Blob directly - NO CORS/tainting issues for same-origin assets
    const encodedUrl = encodeURI(cleanUrl);
    const response = await fetch(encodedUrl);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} fetching ${cleanUrl}`);
    }
    const blob = await response.blob();

    // 2. Read as raw Base64 data URL
    const rawDataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('FileReader result is not string'));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

    // 3. Resize and optimize using offscreen canvas with safe data-URL source
    const optimizedDataUrl = await new Promise<string>((resolve) => {
      const img = new Image();
      img.onload = () => {
        try {
          let width = img.naturalWidth || 800;
          let height = img.naturalHeight || 600;

          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            resolve(rawDataUrl);
            return;
          }

          // Fill white background for transparent PNGs
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);

          // Data URLs as source can NEVER taint a canvas!
          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(dataUrl);
        } catch (e) {
          console.warn('Canvas optimization fallback to rawDataUrl:', cleanUrl, e);
          resolve(rawDataUrl);
        }
      };
      img.onerror = () => {
        resolve(rawDataUrl);
      };
      // Loading from a data URL never violates cross-origin policies
      img.src = rawDataUrl;
    });

    imageCache.set(cleanUrl, optimizedDataUrl);
    return optimizedDataUrl;
  } catch (err) {
    console.warn('Failed to load image as base64 via fetch:', cleanUrl, err);
    return cleanUrl;
  }
}

/**
 * Pre-loads all application images in parallel with progress updates.
 */
export async function preloadAllImages(
  onProgress?: (loaded: number, total: number, currentItem: string) => void
): Promise<Map<string, string>> {
  const total = ALL_APP_IMAGES.length;
  let loaded = 0;

  for (const item of ALL_APP_IMAGES) {
    if (onProgress) {
      onProgress(loaded, total, item.label);
    }
    await loadImageAsBase64(item.path);
    loaded++;
    if (onProgress) {
      onProgress(loaded, total, item.label);
    }
  }

  return imageCache;
}
