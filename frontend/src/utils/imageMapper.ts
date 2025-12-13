/**
 * Available sweet images in the static folder
 */
const AVAILABLE_IMAGES = [
    'first.jpg',
    'kajukatri.jpg',
    'second.jpg',
    'third.jpg'
];

/**
 * Maps a sweet name to its corresponding image
 * Uses fuzzy matching to find the best image for a sweet based on its name
 * Falls back to a random image if no match is found
 * 
 * @param sweetName - The name of the sweet
 * @returns The path to the image
 * 
 * @example
 * getSweetImage('Kaju Katli') // returns '/static/kajukatri.jpg'
 * getSweetImage('Unknown Sweet') // returns a random image
 */
export const getSweetImage = (sweetName: string): string => {
    const normalizedName = sweetName.toLowerCase().replace(/\s+/g, '');

    const nameMap: { [key: string]: string } = {
        'kajukatri': 'kajukatri.jpg',
        'kajukatli': 'kajukatri.jpg',
        'kajukhatri': 'kajukatri.jpg',
        'kaju': 'kajukatri.jpg',
    };
    for (const [key, imageName] of Object.entries(nameMap)) {
        if (normalizedName.includes(key)) {
            return `/static/${imageName}`;
        }
    }

    return getRandomImage();
};

/**
 * Returns a random image from the available images
 * @returns The path to a random image
 */
export const getRandomImage = (): string => {
    const randomIndex = Math.floor(Math.random() * AVAILABLE_IMAGES.length);
    return `/static/${AVAILABLE_IMAGES[randomIndex]}`;
};

/**
 * Gets an image by cycling through available images based on an index
 * Useful for grid displays where you want varied but deterministic images
 * 
 * @param index - The index (will be used modulo the number of available images)
 * @returns The path to the image
 * 
 * @example
 * getImageByIndex(0) // returns first image
 * getImageByIndex(4) // wraps around to first image (4 % 4 = 0)
 */
export const getImageByIndex = (index: number): string => {
    const imageIndex = index % AVAILABLE_IMAGES.length;
    return `/static/${AVAILABLE_IMAGES[imageIndex]}`;
};
