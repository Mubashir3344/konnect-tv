import { useEffect, useState } from "react";

// Import media assets
import football1 from "@/assets/football-1.jpg";
import football2 from "@/assets/football-2.jpg";
import football3 from "@/assets/football-3.jpg";
import movie1 from "@/assets/movie-1.jpg";
import movie2 from "@/assets/movie-2.jpg";
import movie3 from "@/assets/movie-3.jpg";
import series1 from "@/assets/series-1.jpg";
import series2 from "@/assets/series-2.jpg";
import series3 from "@/assets/series-3.jpg";

const mediaItems = [
  { src: football1, alt: "Football" },
  { src: movie1, alt: "Movie" },
  { src: series1, alt: "Series" },
  { src: football2, alt: "Football" },
  { src: movie2, alt: "Movie" },
  { src: series2, alt: "Series" },
  { src: football3, alt: "Football" },
  { src: movie3, alt: "Movie" },
  { src: series3, alt: "Series" },
];

interface FloatingItem {
  id: number;
  src: string;
  alt: string;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

const FloatingMedia = () => {
  const [items, setItems] = useState<FloatingItem[]>([]);

  useEffect(() => {
    const generated = mediaItems.map((item, index) => ({
      id: index,
      src: item.src,
      alt: item.alt,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 60 + Math.random() * 60,
      delay: index * 0.5,
      duration: 15 + Math.random() * 10,
    }));
    setItems(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute rounded-xl overflow-hidden shadow-2xl opacity-20 hover:opacity-40 transition-opacity"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            width: `${item.size}px`,
            height: `${item.size * 1.5}px`,
            animation: `float-${item.id % 3} ${item.duration}s ease-in-out infinite`,
            animationDelay: `${item.delay}s`,
          }}
        >
          <img
            src={item.src}
            alt={item.alt}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      <style>{`
        @keyframes float-0 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(3deg); }
        }
        @keyframes float-1 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(-2deg); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(2deg); }
        }
      `}</style>
    </div>
  );
};

export default FloatingMedia;
