export interface Theme {
  primary: string;
  secondary: string;
  tertiary: string;
  mainColor: string;
  section?: string;
}

export const themes: Record<string, Theme> = {
  emergency: {
    primary: '#200105',
    secondary: '#3C1B21',
    tertiary: '#200105',
    section : '#523B40',
    mainColor: 'linear-gradient(135deg,#26020A 0%,#280303 50%,#200105 100%)',
  },
  administration: {
  primary: '#010520',
secondary: '#4E1171',
section: '#FFFFFF/10',
tertiary: '#250A45',
mainColor: 'linear-gradient(180deg, #010520 0%, #4E1171 100%)',
  },
insurance: {
  primary: '#01201A',
  secondary: '#07292C',
  tertiary: '#0A7062',
  section: '#193222',
  mainColor: 'linear-gradient(180deg, #01201A 0%, #07292C 60%, #0A7062 100%)',
},
};

