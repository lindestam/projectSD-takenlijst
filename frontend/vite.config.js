import { resolve } from 'path'
import { defineConfig } from 'vite'
export default defineConfig({
    build:{
        sourcemap: true,
        rollupOptions:{
            input: {
                inloggen: resolve(__dirname, 'inloggen.html'),
                main: resolve(__dirname, 'index.html'),
                addTask: resolve(__dirname, 'addTask.html'),
                addGebruiker: resolve(__dirname, 'addGebruiker.html')
// to add more html pages....see FEP1 boilerplate section

            },
        },
        outDir: "../src/main/webapp/"
    },
})