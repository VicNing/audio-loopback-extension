import { defineConfig } from 'rollup'
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { babel } from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import pkg from './package.json' assert { type: "json" };

export default defineConfig({
  input: `src/index.ts`,
  output: [
    { file: pkg.main, name: "AudioLoopbackExtension", format: "umd", sourcemap: true },
    { file: pkg.module, format: "es", sourcemap: true, },
  ],
  watch: {
    include: "src/**",
  },
  plugins: [
    resolve({
      extensions: ['.js', '.ts'],
    }),
    commonjs(),
    babel({
      extensions: ['.js', '.ts'],
      include: [
        "src/**",
      ],

    }),
    terser(),
  ],
})
