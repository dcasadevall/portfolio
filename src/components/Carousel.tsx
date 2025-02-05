import { SmartImage, RevealFx } from "@/once-ui/components";
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
    const [textIndex, setTextIndex] = useState(0);

    // Separate timers for images and text
    useEffect(() => {
        if (images.length <= 1) return;
        const imageTimer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, autoplayInterval);

        return () => clearInterval(imageTimer);
    }, [images.length, autoplayInterval]);

    useEffect(() => {
        if (textOverlays.length <= 0) return;
        const textTimer = setInterval(() => {
            setTextIndex((prev) => (prev + 1) % textOverlays.length);
        }, textDuration);

        return () => clearInterval(textTimer);
    }, [textOverlays.length, textDuration]);

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
            {textOverlays.length > 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="text-white text-2xl">
                        <RevealFx
                            key={textIndex}
                            direction="column"
                            transition="micro-medium"
                        >
                            {textOverlays[textIndex].text}
                        </RevealFx>
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