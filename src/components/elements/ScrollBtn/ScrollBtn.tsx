import type { FunctionComponent } from 'react';
import { IoMdArrowRoundUp } from 'react-icons/io';

import { useWindowScroll } from '@mantine/hooks';
import { motion } from 'framer-motion';

import { useStyles } from './styles';

const ScrollBtn: FunctionComponent = () => {
  const { classes } = useStyles();
  const { ScrollButton, ScrollIcon } = classes;

  const [scroll, scrollTo] = useWindowScroll();

  const handleScrollToTop = () => scrollTo({ y: 0 });

  if (scroll.y === 0) return null;

  return (
    <motion.button
      type="button"
      aria-label="Scroll top"
      className={ScrollButton}
      onClick={handleScrollToTop}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      transition={{ velocity: 2 }}
    >
      <IoMdArrowRoundUp className={ScrollIcon} />
    </motion.button>
  );
};

export default ScrollBtn;
