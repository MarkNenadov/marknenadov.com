/**
 * @jest-environment node
 */
import { execFileSync } from 'child_process';
import path from 'path';

const GLOBALS_CSS_PATH = path.join(__dirname, '..', 'globals.css');

// Tailwind's module loader hooks can't run inside Jest's sandbox, so compile in a child process
const COMPILE_SCRIPT = `
import { readFileSync } from 'fs';
import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';
const from = process.argv[1];
const { css } = await postcss([tailwindcss()]).process(readFileSync(from, 'utf8'), { from });
process.stdout.write(css);
`;

const CUSTOM_UTILITY_CLASSES = [
    'text-text-primary',
    'text-text-secondary',
    'bg-surface-primary',
    'border-border-primary',
    'text-primary-700',
    'shadow-soft-lg',
    'shadow-elegant',
    'shadow-elegant-lg',
    'animate-fade-in',
    'animate-fade-in-up',
    'animate-scale-in',
];

describe('globals.css', () => {
    let compiledCss: string;

    beforeAll(() => {
        compiledCss = execFileSync(
            'node',
            ['--input-type=module', '-e', COMPILE_SCRIPT, GLOBALS_CSS_PATH],
            { encoding: 'utf8' },
        );
    }, 60000);

    it.each(CUSTOM_UTILITY_CLASSES)('emits the custom design token class "%s"', (className) => {
        expect(compiledCss).toContain(`.${className}`);
    });
});
