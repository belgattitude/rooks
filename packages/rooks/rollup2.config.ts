import esbuild from 'rollup-plugin-esbuild';
import dts from 'rollup-plugin-dts';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
//import json from '@rollup/plugin-json';
// import alias from '@rollup/plugin-alias';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import pkg from './package.json';

const external = [
    ...Object.keys(pkg.dependencies),
    ...Object.keys(pkg.peerDependencies || {}),
]

const plugins = [
    typescriptPaths({
        preserveExtensions: true,
        tsConfigPath: './tsconfig.json'
    }),
    /*
    alias({
        //entries: [{ find: /^node:(.+)$/, replacement: '$1' }],
        entries: [{ find: /^@\/(.+)$/, replacement: '$1' }],
    }),*/
    resolve({
        preferBuiltins: true,
    }),
    // json(),
    //commonjs(),
    esbuild({
        target: 'node14',
        format: "esm"
    }),

]

export default () => [

    {
        input: [
            './src/index.ts',
        ],
        output: {
            dir: 'dist/esm',
            format: 'esm',
        },
        preserveModules: true,
        external,
        plugins,
    },
    {
        input: './src/index.ts',
        output: {
            file: 'dist/esm/index.d.ts',
            format: 'esm',
        },
        external,
        plugins: [typescriptPaths({
            preserveExtensions: true,
            tsConfigPath: './tsconfig.json'
        }),dts()],
    },
];

