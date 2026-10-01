import astro from 'eslint-plugin-astro';

export default [
  ...astro.configs['flat/recommended'],
  { ignores: ['dist/**', 'node_modules/**'] },
];
