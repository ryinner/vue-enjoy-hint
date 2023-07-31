import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const appDir = path.resolve(__dirname);
const srcDir = path.join(appDir, 'src');
const indexFile = path.join(srcDir, 'index.ts');
const styleFile = path.join(srcDir, 'style.ts');

export default defineConfig({
    plugins: [
        vue(),
        dts()
    ],
    build: {
        lib: {
            entry: [indexFile, styleFile],
            name: 'vue-enjoy-hint',
            fileName: 'index'
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue'
                }
            }
        }
    }
});
