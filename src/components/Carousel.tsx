import { SmartImage } from "@/once-ui/components";
import { useState, useEffect } from "react";

interface CarouselImage {
    src: string;
    alt: string;
    onTimeUpdate?: (event: React.SyntheticEvent<HTMLVideoElement>) => void;
}

interface CarouselProps {
    images: CarouselImage[];
    sizes?: string;
    autoplayInterval?: number;  // Time in ms between transitions
    textDuration?: number;      // Time in ms to show text
    textOverlays?: { text: string; position?: string }[];
}

export const Carousel: React.FC<CarouselProps> = ({
    images,
    sizes,
    autoplayInterval = 3000,  // Default 3s for images
    textDuration = 5000,       // Default 5s for text
    textOverlays = []
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showText, setShowText] = useState(true);

    useEffect(() => {
        if (images.length <= 1) return;

        // Reset text visibility when image changes
        setShowText(true);

        // Hide text after specified duration
        const textTimer = setTimeout(() => {
            setShowText(false);
        }, textDuration);

        // Change image after autoplayInterval
        const imageTimer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, autoplayInterval);

        return () => {
            clearTimeout(textTimer);
            clearInterval(imageTimer);
        };
    }, [currentIndex, images.length, autoplayInterval, textDuration]);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const renderMedia = (image: CarouselImage) => {
        if (image.src.endsWith('.mp4')) {
            return (
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    onTimeUpdate={image.onTimeUpdate}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                >
                    <source src={image.src} type="video/mp4" />
                </video>
            );
        }

        return (
            <SmartImage
                src={image.src}
                alt={image.alt}
                sizes={sizes}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
        );
    };

    return (
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: '12px', overflow: 'hidden' }}>
            {images.length > 0 && renderMedia(images[currentIndex])}
            {showText && textOverlays && textOverlays[currentIndex] && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-2xl">
                        {textOverlays[currentIndex].text}
                    </div>
                </div>
            )}

            {images.length > 1 && (
                <>
                    <button
                        onClick={handlePrev}
                        style={{
                            position: 'absolute',
                            left: '1rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'rgba(0,0,0,0.5)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            cursor: 'pointer',
                        }}
                    >
                        ←
                    </button>
                    <button
                        onClick={handleNext}
                        style={{
                            position: 'absolute',
                            right: '1rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'rgba(0,0,0,0.5)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            cursor: 'pointer',
                        }}
                    >
                        →
                    </button>
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '1rem',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            display: 'flex',
                            gap: '0.5rem',
                        }}
                    >
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    background: index === currentIndex ? 'white' : 'rgba(255,255,255,0.5)',
                                    border: 'none',
                                    padding: 0,
                                    cursor: 'pointer',
                                }}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}; 