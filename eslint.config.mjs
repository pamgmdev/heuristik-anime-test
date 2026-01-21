// eslint.config.mjs
import stylistic from '@stylistic/eslint-plugin';
import vueParser from 'vue-eslint-parser';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.{js,ts,vue}'],
    plugins: {
      '@stylistic': stylistic
    },
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        sourceType: 'module',
      },
    },
    rules: {
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/brace-style': ['error', 'allman', { 'allowSingleLine': false }],
      '@stylistic/space-before-function-paren': ['error', 'never'],
      '@stylistic/indent': ['error', 4],
      'curly': ['error', 'all'],

      // --- REGLA DE ALINEACIÓN ---
      '@stylistic/key-spacing': ['error', { 
        'align': 'colon',    // Alinea los dos puntos ":"
        'beforeColon': true, // Espacio antes (opcional, según tu ejemplo)
        'afterColon': true   // Espacio después
      }],
      // ---------------------------
    }
  }
];