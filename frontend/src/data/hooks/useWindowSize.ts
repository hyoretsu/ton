import { useState, useEffect } from 'react';

interface WindowDimensions {
    height: number | undefined;
    width: number | undefined;
}

/** Returns the window's height and width dimensions */
const useWindowSize = (): WindowDimensions => {
    // Initialize state with undefined width/height so server and client renders match
    const [windowSize, setWindowSize] = useState<WindowDimensions>({
        height: undefined,
        width: undefined,
    });

    useEffect(() => {
        const handleResize = (): void => {
            setWindowSize({
                height: window.innerHeight,
                width: window.innerWidth,
            });
        };

        // Set initial window size
        handleResize();
        // Add event listener
        window.addEventListener('resize', handleResize);
        // Remove event listener on cleanup
        return window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
};

export default useWindowSize;
