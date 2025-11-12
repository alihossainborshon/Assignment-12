// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export const GallerySection = ({ images }) => {
  const animation = () => ({
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.8, ease: "easeOut" },
  });

  return (
    <section className="py-10">
      <div className="grid grid-cols-2 md:grid-cols-6 grid-rows-2 gap-6 auto-rows-[150px]">
        {images.slice(0, 7).map((img, i) => (
          <motion.img
            key={i}
            src={img}
            alt={`Tour spot ${i + 1}`}
            className={`w-full h-full object-cover rounded-xl shadow-md cursor-pointer
              ${i === 0 ? "col-span-2" : ""}
              ${i === 1 ? "row-span-2" : ""}
              ${i === 2 ? "col-span-2" : ""}
              ${i === 3 ? "row-span-2" : ""}
              ${i === 4 ? "col-span-2" : ""}
              ${i === 5 ? "col-span-2" : ""}
            `}
            {...animation(0.2 * i)}
            whileHover={{ scale: 1.1 }}
          />
        ))}
      </div>
    </section>
  );
};
