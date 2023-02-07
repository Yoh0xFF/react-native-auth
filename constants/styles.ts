type ThemeColorKeys =
  | 'primary100'
  | 'primary500'
  | 'primary800'
  | 'error100'
  | 'error500';

type ColorsType = {
  [key in ThemeColorKeys]: string;
};

export const Colors: ColorsType = {
  primary100: '#f9beda',
  primary500: '#c30b64',
  primary800: '#610440',
  error100: '#fcdcbf',
  error500: '#f37c13',
};
