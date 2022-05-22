import { useMediaQuery as useReactResponsiveMediaQuery } from 'react-responsive';
import theme from '~/src/theme';

interface IUseMediaQuery {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

/**
 * useMediaQuery hook
 * @returns {IUseMediaQuery}
 */
const useMediaQuery = (): IUseMediaQuery => {
  const { screens } = theme;

  const isMobile = useReactResponsiveMediaQuery({ maxWidth: screens.sm });
  const isTablet = useReactResponsiveMediaQuery({ minWidth: screens.sm, maxWidth: screens.md });
  const isDesktop = useReactResponsiveMediaQuery({ minWidth: screens.lg });

  return {
    isMobile,
    isTablet,
    isDesktop
  };
};

export default useMediaQuery;
