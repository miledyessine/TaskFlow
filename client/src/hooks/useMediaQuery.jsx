import { useState, useEffect } from "react";

export function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const mediaQueryList = window.matchMedia(query);
        const documentChangeHandler = () => setMatches(mediaQueryList.matches);

        mediaQueryList.addEventListener("change", documentChangeHandler);
        documentChangeHandler(); // Initial check

        return () =>
            mediaQueryList.removeEventListener("change", documentChangeHandler);
    }, [query]);

    return matches;
}
