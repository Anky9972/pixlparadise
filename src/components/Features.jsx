import { useAnimation, useInView, motion, delay } from 'framer-motion';
import React, { useEffect, useRef } from 'react';

function Features({ mode, darkModeColors, lightModeColors }) {
  const { background: darkBg, text: darkText, featureBg: darkFeatureBg, featureText: darkFeatureText } = darkModeColors;
  const { background: lightBg, text: lightText, featureBg: lightFeatureBg, featureText: lightFeatureText } = lightModeColors;
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };
  const variants2 = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1,delay:0.5 } },
  };

  return (
    <section
      className={`py-16 flex flex-col justify-center items-center gap-16 ${mode ? darkBg : lightBg} transition-all duration-300`}
      aria-label="Features section"
    >
      <motion.h2
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={variants}
        className="text-4xl md:text-6xl font-bold text-[#ff7f53] text-center"
      >
        Why Choose PixlParadise?
      </motion.h2>
      <div className="feature-grid w-full max-w-6xl px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        {[
          { title: 'High-Quality Images', description: 'All images are carefully selected and of the highest quality.' },
          { title: 'Easy Search and Filter', description: 'Quickly find the perfect image with our advanced search and filter options.' },
          { title: 'Free for Personal Use', description: 'Use our images for free in both personal and commercial projects.' },
          { title: 'Regularly Updated Collection', description: 'Our gallery is constantly updated with new and trending images.' },
        ].map((feature, index) => (
          <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants2}
            key={index}
            className={`feature-item w-full h-48 shadow-lg ${mode ? darkFeatureBg : lightFeatureBg} p-6 md:p-8 lg:p-4 rounded-xl flex flex-col gap-3 hover:shadow-xl transition-shadow duration-300`}
          >
            <h3 className={`text-lg md:text-xl font-bold ${mode ? darkFeatureText : lightFeatureText}`}>
              {feature.title}
            </h3>
            <p className={`text-sm md:text-base font-semibold ${mode ? darkFeatureText : lightFeatureText}`}>
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Features;
