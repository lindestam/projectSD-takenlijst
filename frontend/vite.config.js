import { resolve } from 'path'
import { defineConfig } from 'vite'
export default defineConfig({
    build:{
        sourcemap: true,
        rollupOptions:{
            input: {
                main: resolve(__dirname, 'index.html'),
                addTask: resolve(__dirname, 'pages/addTask.html')
// to add more html pages....see FEP1 boilerplate section

            },
        },
        outDir: "../src/main/webapp/"
    },
})