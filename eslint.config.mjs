import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
    {
        files: ['**/*.js'],  // Apply the following settings to all JavaScript files in the project
        languageOptions: {
            sourceType: 'commonjs'  // Set the source type to CommonJS (used in Node.js)
        }
    },
    {
        languageOptions: {
            globals: globals.node  // Use Node.js global variables (e.g., `require`, `module`, `process`)
        }
    },
    {
        ignores: ['node_modules/*', 'database/*', 'swagger/*']
    },
    {
        rules: {
            'semi': ['warn', 'always'],  // Enforce semicolons at the end of statements, but only show a warning
            'indent': ['error', 4, { 'SwitchCase': 1 }], // Enforce 4 spaces for indentation and 1 level for switch cases
            'quotes': ['error', 'single'], // Enforce single quotes
        }
    },
    pluginJs.configs.recommended,  // Use the recommended ESLint rules for JavaScript provided by the @eslint/js plugin
];
