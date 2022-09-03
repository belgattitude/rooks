// import esbuild from "rollup-plugin-esbuild";
import dts from "rollup-plugin-dts";
import typescript2 from "rollup-plugin-typescript2";
// import terser from "rollup-plugin-terser";
import { typescriptPaths } from "rollup-plugin-typescript-paths";
import pkg from "./package.json";

const external = [
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.peerDependencies || {}),
];

const tsPathPlugin = typescriptPaths({
  preserveExtensions: true,
  tsConfigPath: "./tsconfig.json",
});

const plugins = [
  tsPathPlugin,
  typescript2({
    tsconfig: "./tsconfig.build.json",
  }),
];

export default () => [
  // ESM
  {
    input: ["./src/index.ts"],
    output: {
      dir: "dist/esm",
      format: "esm",
      sourcemap: false,
    },
    preserveModules: true,
    external,
    plugins,
  },
  // CJS
  {
    input: ["./src/index.ts"],
    output: {
      dir: "dist/cjs",
      format: "cjs",

      sourcemap: false,
    },
    preserveModules: true,
    external,
    plugins: [...plugins],
  },
  {
    input: "./src/index.ts",
    output: {
      file: "dist/types/index.d.ts",
    },
    external,
    plugins: [
      tsPathPlugin,
      dts({
        compilerOptions: {
          sourceMap: false,
        },
      }),
    ],
  },
  // UMD
  /**
    {
        input: [
            './src/index.ts',
        ],
        output: {
            file: './dist/umd/rooks.umd.js',
            format: 'umd',
            name: "rooks"
        },
        preserveModules: false,
        external,
        plugins: [tsPathPlugin,
            esbuild({
platform: 'browser',

            }),
        ],
    },*/
];
