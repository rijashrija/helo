import { useEffect } from 'react';

export function useScrollTo(id) {
  useEffect(() => {
    if (window.location.hash === `#${id}`) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [id]);
}